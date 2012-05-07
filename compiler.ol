
(require (reader "./reader")
         (ast "./ast")
         (js "./backends/js")

         ;; remove this
         (fs "fs"))

(define (self-evaluating? exp)
  (or (number? exp)
      (string? exp)
      (boolean? exp)
      (null? exp)
      (key? exp)))

(define (alternating-map func lst . former?)
  (let loop ((lst lst)
             (acc '()))
    (if (or (null? lst)
            (null? (cdr lst)))
        acc
        (loop (cddr lst)
              (cons (if (not (null? former?))
                        (func (car lst))
                        (car lst))
                    (cons (if (null? former?)
                              (func (cadr lst))
                              (cadr lst))
                          acc))))))

(define (opt arg def)
  (if (null? arg) def (car arg)))

(define (assert cnd msg)
  (if (not cnd)
      (throw msg)))

;; macros

(define (expand node)
  (cond
   ((ast.atom? node) node)
   ((ast.vector? node) (ast.copy-node
                        node
                        (map (lambda (e) (expand e))
                             (ast.node-data node))))
   ((ast.dict? node) (ast.copy-node
                      node
                      (map (lambda (e) (expand e))
                           (ast.node-data node))))
   ((or (== (ast.first* node) 'quote)
        (== (ast.first* node) 'quasiquote))
    node)
   ((== (ast.first* node) 'lambda)
    (ast.copy-node
     node
     (cons (ast.first node)
           (cons (cadr (ast.node-data node))
                 (map (lambda (e) (expand e))
                      (cddr (ast.node-data node)))))))
   ((macro? (ast.first* node))
    (let ((res ((macro-function (ast.first* node)) (desourcify node))))
      (expand (sourcify
               res
               (ast.node-lineno node)
               (ast.node-colno node)))))
   (else (ast.copy-node node
                        (map expand (ast.node-data node))))))

(define %macros {})

(define (macro-function name)
  (dict-ref %macros name))

(define (install-macro name f)
  (dict-put! %macros name f))

(define (macro? name)
  (and (symbol? name)
       (dict-ref %macros (symbol->key name))
       #t))

(define macro-generator #f)

(define (make-macro pattern body)
  (let ((x (gensym)))
    ;; compile the macro into native code and use the host's native
    ;; eval to eval it into a function. we don't use outlet's eval
    ;; because that would create a circular dependency.
    (let ((s `(lambda (,x)
                (apply (lambda ,pattern ,@body)
                       (cdr ,x))))
          (p (compile-program s (macro-generator.make-fresh))))
      ((%raw "eval") p))))

(define (sourcify exp lineno colno)
  (cond
   ((or (self-evaluating? exp)
        (symbol? exp))
    (ast.make-node 'ATOM exp lineno colno))
   ((vector? exp)
    (ast.make-node 'VECTOR
                   (map (lambda (e) (sourcify e lineno colno))
                        (vector->list exp))
                   lineno colno))
   ((dict? exp)
    (ast.make-node 'DICT
                   (map (lambda (e) (sourcify e lineno colno))
                        (dict->list exp))
                   lineno colno))
   (else
    (ast.make-node 'LIST (map (lambda (e) (sourcify e lineno colno))
                              exp)
                   lineno colno))))

(define (desourcify node)
  (cond
   ((ast.atom? node) (ast.node-data node))
   ((ast.vector? node) (list->vector (map desourcify (ast.node-data node))))
   ((ast.dict? node) (apply dict (map desourcify (ast.node-data node))))
   ((ast.list? node) (map desourcify (ast.node-data node)))
   (else
    (throw (str "unknown node type: " node)))))

;; system macros

(install-macro
 'define-macro
 (lambda (form)
   (let ((sig (cadr form)))
     (let ((name (car sig))
           (pattern (cdr sig))
           (body (cddr form)))
       ;; install it during expand-time
       (install-macro name (make-macro pattern body))
       #f))))

(install-macro
 'begin
 (lambda (form)
   `((lambda () ,@(cdr form)))))

(install-macro
 'cond
 (lambda (form)
   (if (null? (cdr form))
       #f
       (let ((forms (cdr form)))
         (let ((f (car forms)))
           (if (eq? (car f) 'else)
               `(begin ,@(cdr f))
               `(if ,(car f)
                    (begin ,@(cdr f))
                    (cond ,@(cdr forms)))))))))

;; TODO: clean this up, make it more efficient
(install-macro
 'let
 (lambda (form)
   (define (replace expr old sym)
     (cond
      ((symbol? expr) (if (== expr old)
                          sym
                          expr))
      ((literal? expr) expr)
      ((dict? expr) (dict-map (lambda (e) (replace e old sym))
                              expr))
      ((vector? expr) (vector-map (lambda (e) (replace e old sym))
                                  expr))
      ((list? expr) (map (lambda (e) (replace e old sym))
                         expr))))

   (define (generate-defs syms exprs)
     (reverse
      (let loop ((lst syms)
                 (forms exprs)
                 (vars {})
                 (acc '()))
        (if (null? lst)
            acc
            (let ((sym (car lst))
                  (name (car (car forms)))
                  (code (cadar forms)))
              (loop (cdr lst)
                    (cdr forms)
                    (dict-merge vars (dict name sym))
                    (cons `(define ,(car lst)
                             ,(fold (lambda (el acc)
                                      (replace acc (key->symbol el) (dict-ref vars el)))
                                    code
                                    (keys vars)))
                          acc)))))))
   
   (define (tco exprs exit)
     (define (if? expr)
       (and (list? expr)
            (== (car expr) 'if)))

     (define (let? expr)
       (and (list? expr)
            (== (car expr) 'let)))
     
     (define (begin? expr)
       (and (list? expr)
            (== (car expr) 'begin)))
     
     (define (tco? expr)
       (and (list? expr)
            (== (car expr) exit)))

     (define (process-if expr transform)
       (if (null? (cdddr expr))
           `(if ,(cadr expr)
                ,(transform (caddr expr)))
           `(if ,(cadr expr)
                ,(transform (caddr expr))
                ,(transform (car (cdddr expr))))))
     
     (let ((rexprs (reverse exprs)))
       (let ((bottom (car rexprs)))
         (cond
          ((if? bottom)
           (reverse
            (cons (process-if bottom
                              (lambda (expr)
                                (cond
                                 ((begin? expr) (tco expr exit))
                                 ((let? expr) (tco expr exit))
                                 (else 
                                  (car (tco (list expr) exit))))))
                  (cdr rexprs))))
          ((let? bottom)
           (reverse
            (cons (tco bottom exit)
                  (cdr rexprs))))
          (else
           (if (tco? bottom)
               (reverse
                (cons `(vector "__tco_call" (lambda () ,bottom))
                      (cdr rexprs)))
               exprs))))))

   (define (tco-call? name expr)
     (define (_tco? expr)
       (and (list? expr)
            (= (car expr) 'vector)
            (= (cadr expr) "__tco_call")
            (let ((lamb (caddr expr)))
              (let ((body (caddr lamb)))
                ;; test the name of the loop call and make sure its the
                ;; same one
                (= (car body) name)))))
     
     (if (list? expr)
         (or (_tco? expr)
             (fold (lambda (el acc)
                     (or acc
                         (tco-call? name el)))
                   #f
                   expr))
         #f))
   
   (let ((name (if (symbol? (cadr form))
                   (cadr form)
                   (gensym)))
         (forms (if (symbol? (cadr form))
                    (caddr form)
                    (cadr form))))
     (assert (or (null? forms)
                 (and (list? forms)
                      (list? (car forms))))
             (str "invalid let: " form))
     (let ((syms (map (lambda (el) (gensym)) forms))
           (body (if (symbol? (cadr form))
                       (cdddr form)
                       (cddr form))))
       (let ((tco-ed (tco body name)))
         `((lambda ()
             (define (,name ,@(map car forms))
               ,@tco-ed)
             ;; todo, bug here. splicing in
             ;; var-defs and then putting (,name
             ;; ,@vars) after it didn't work
             ,@(list-append
                (generate-defs syms forms)
                (if (tco-call? name tco-ed)
                    `((trampoline (,name ,@syms)))
                    `((,name ,@syms)))))))))))

;; eval is a little tricky. it must be a macro so that it happens in
;; the right context. it also depends on two builtins which represent
;; the current compiler and generator.
(install-macro
 'eval
 (lambda (form)
   `((%raw "eval")
     (__compiler.compile-program
      ,(cadr form)
      (__generator)))))

;; natives
;;
;; natives are like macros for generating source code. it allows the
;; generator to customize how certain forms look in the final output.
;; these could have been macros that expand into basic forms, but we
;; want readable output. natives are responsible for integrity checking
;; of the form.

(define _natives_ {})

(define (native-function name)
  (dict-ref _natives_ name))

(define (install-native name func validator)
  (dict-put! _natives_
             name
             (lambda (node gen expr? compile*)
               (validator node)
               ((dict-ref gen func) (cdr (ast.node-data node)) expr? compile*))))

(define (native? name)
  (and (symbol? name)
       (not (== (dict-ref _natives_ (symbol->key name))
                undefined))))

(define (verify-not-single node)
  (assert (> (length (ast.node-data node)) 1)
          (str "form requires at least one operand:"
               (inspect (desourcify node)))))

(install-native :and 'write-and verify-not-single)
(install-native :or 'write-or verify-not-single)
(install-native :+ 'write-add verify-not-single)
(install-native :- 'write-subtract verify-not-single)
(install-native :* 'write-multiply verify-not-single)
(install-native :/ 'write-divide verify-not-single)
(install-native :> 'write-gt verify-not-single)
(install-native :< 'write-lt verify-not-single)
(install-native :<= 'write-lteq verify-not-single)
(install-native :>= 'write-gteq verify-not-single)
(install-native :>> 'write-rshift verify-not-single)
(install-native :<< 'write-lshift verify-not-single)
(install-native :bitwise-or 'write-bitwise-or verify-not-single)
(install-native :bitwise-and 'write-bitwise-and verify-not-single)
(install-native :% 'write-mod verify-not-single)

(install-native :require 'write-require
                (lambda (node)
                  (verify-not-single node)
                  (for-each
                   (lambda (el)
                     (assert (and (ast.list? el)
                                  (eq? (length (ast.node-data el)) 2))
                             (str "require needs a list of "
                                            "2 element lists: "
                                            (inspect (desourcify el)))))
                   (cdr (ast.node-data node)))))

;; compiler

;; take a node that has a list of children and make a node that
;; applies the children to the function `func-name`
(define (apply-node func-name node . quoted?)
  (let ((quoted? (opt quoted? #f)))
    (ast.prepend
     (ast.make-atom func-name node)
     (if quoted?
         (ast.map-children
          (lambda (e)
            (ast.make-list (ast.make-atom 'quote node) e))
          node)
         node))))

;; same as apply-node, but respect unquoting
(define (apply-w/unquote func-name node)
  (ast.prepend
   (ast.make-atom func-name node)
   (ast.map-children
    (lambda (e)
      (if (and (ast.list? e)
               (== (ast.first* e) 'unquote))
          (cadr (ast.node-data e))
          (if (and (ast.list? e)
                   (== (ast.first* e) 'key))
              (ast.make-list (ast.make-atom 'quasiquote node)
                             (cadr (ast.node-data e)))
              (ast.make-list (ast.make-atom 'quasiquote node) e))))
    node)))

(define (split-splices lst func-name)
  (define (make-splice lst)
    (if (or (self-evaluating? lst)
            (symbol? lst))
        (apply-w/unquote func-name (ast.make-list* (list lst)))
        (apply-w/unquote func-name (ast.make-list* lst))))
  
  (let loop ((nodes lst)
             (slices '())
             (acc '()))
    (if (null? nodes)
        (reverse
         (if (null? acc)
             slices
             (cons (make-splice (reverse acc))
                   slices)))
        (let ((node (car nodes)))
          (if (and (ast.list? node)
                   (== (ast.first* node) 'unquote-splicing))
              (let ((el (cadr (ast.node-data node))))
                (loop (cdr nodes)
                      (cons el
                            (if (null? acc)
                                slices
                                (cons (make-splice (reverse acc))
                                      slices)))
                      '()))
              (loop (cdr nodes)
                    slices
                    (cons node acc)))))))

(define (quasiquote-split append-name func-name node)
  (let ((slices (split-splices (ast.node-data node) func-name)))
    (if (== (length slices) 1)
        (car slices)
        (apply-node append-name (ast.make-list* slices)))))

(define (compile-object node generator quoted? expr?)
  (let ((exp (ast.node-data node)))
    (cond
     ((key? exp) (generator.write-key exp expr?))
     ((symbol? exp) (generator.write-symbol exp expr?))
     ((number? exp) (generator.write-number exp expr?))
     ((boolean? exp) (generator.write-boolean exp expr?))
     ((string? exp) (generator.write-string exp expr?))
     ((ast.dict? node)
      (compile (apply-node 'dict node quoted?) generator expr?))
     ((ast.vector? node)
      (compile (apply-node 'vector node quoted?) generator expr?))
     ;; TODO: why doesn't ast.empty-list? work
     ((null? exp) (generator.write-empty-list exp expr?))
     ((ast.list? node)
      (compile (apply-node 'list node quoted?) generator expr?))
     (else
      (throw (str "compile-object: unknown type: " exp))))))

(define (compile-quasi node generator expr?)
  (cond
   ((ast.list? node)
    (compile (quasiquote-split 'list-append 'list node) generator expr?))
   ((ast.vector? node)
    (compile (quasiquote-split 'vector-concat 'vector node) generator expr?))
   ((ast.dict? node)
    (compile (quasiquote-split 'dict-merge 'dict node) generator expr?))
   (else
    (compile-object node generator #t expr?))))

(define (compile-reference node generator . expr?)
  (generator.write-term node (opt expr? #f)))

(define (compile-if node generator expr? compile*)
  (let ((nodes (ast.node-data node))
        (cnd (cadr nodes))
        (tru (caddr nodes))
        (alt (if (null? (cdddr nodes))
                 #f
                 (car (cdddr nodes)))))
    (generator.write-if cnd tru alt expr? compile*)))

(define (compile-lambda node generator expr? compile*)
  (generator.write-lambda node expr? compile*))

(define (compile-set! node generator compile*)
  (generator.write-set! (cadr (ast.node-data node))
                        (caddr (ast.node-data node))
                        compile*))

(define (compile-define node generator compile*)
  (let ((target (cadr (ast.node-data node))))
    (if (ast.list? target)
        (let ((name (ast.first target))
              (args (cdr (ast.node-data target)))
              (body (cddr (ast.node-data node))))
          (generator.write-define name
                                  ;; convert the function into a lambda
                                  (ast.make-list*
                                   (cons (ast.make-node-w/extra 'ATOM 'lambda
                                                                (ast.node-data name)
                                                                (ast.node-lineno name)
                                                                (ast.node-colno name))
                                         (cons (if (null? args)
                                                   (ast.make-empty-list name)
                                                   (ast.make-list* args))
                                               body)))
                                  compile*))
        (generator.write-define target
                                (caddr (ast.node-data node))
                                compile*))))

(define (compile node generator . expr?)
  (define (compile* node . expr?)
    (compile node generator (opt expr? #f)))

  (let ((expr? (opt expr? #f)))
    (cond
     ((self-evaluating? (ast.node-data node))
      (compile-object node generator #f expr?))
     ((symbol? (ast.node-data node))
      (compile-reference node generator expr?))
     ((ast.vector? node)
      (compile-object node generator #f expr?))
     ((ast.dict? node)
      (compile-object node generator #f expr?))
     ((ast.list? node)
      (let ((sym (ast.first* node)))
        (cond
         ((== sym 'quote)
          (compile-object (cadr (ast.node-data node)) generator #t expr?))
         ((== sym 'quasiquote)
          (compile-quasi (cadr (ast.node-data node)) generator expr?))
         ((== sym 'if) (compile-if node generator expr? compile*))
         ((== sym 'lambda) (compile-lambda node generator expr? compile*))
         ((== sym 'set!) (compile-set! node generator compile*))
         ((== sym 'define) (compile-define node generator compile*))
         ((== sym '%raw)
          (generator.write-raw-code (cadr (ast.node-data node))))
         ((native? sym)
          ((native-function sym) node generator expr? compile*))
         (else
          (if (not (or (symbol? (ast.first* node))
                       (list? (ast.first* node))))
              (throw (str "operator is not a procedure: " (ast.first* node))))
          (generator.write-func-call (ast.first node)
                                     (cdr (ast.node-data node))
                                     expr?
                                     compile*))))))))

(define %optimize-mode 0)

(define (compile-program src generator)
  (if (not macro-generator)
      (set! macro-generator generator))

  (let ((exp (if (string? src)
                 (reader.read src)
                 (sourcify src 0 0))))
    (if (and (ast.type? exp 'LIST)
             (== (ast.first* exp) 'begin))
         ;; parse top-level forms individually
        (for-each (lambda (e)
                    (compile (expand e) generator))
                  (cdr (ast.node-data exp)))
        (compile (expand exp) generator))
    (generator.get-code)))

(set! module.exports {:read (lambda (e) (desourcify (reader.read e)))
                      :expand expand
                      :compile compile
                      :compile-program compile-program
                      :desourcify desourcify
                      :sourcify sourcify
                      :pp pp
                      :set-macro-generator
                      (lambda (g)
                        (if (not macro-generator)
                            (set! macro-generator g)))
                      :set-optimizations
                      (lambda (n)
                        (set! %optimize-mode n))})
