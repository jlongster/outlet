(require (util "util")
         (fs "fs")
         (reader "./parser")
         (grammar "./grammar")
         (js "./backends/js"))

;; runtime

(define (application? form)
  (and (list? form)
       (not (expander? (car form)))))

(define (opt arg def)
  (if (null? arg) def (car arg)))

(define (assert cnd msg)
  (if (not cnd)
      (throw msg)))

;; expanders

(define _expanders_ {})

(define (expander-function name)
  (dict-ref _expanders_ name))

(define (install-expander name func)
  (dict-put! _expanders_ name func))

(define (expander? name)
  (and (symbol? name)
       (not (eq? (dict-ref _expanders_ name)
                 undefined))))

(define (expand form)
  (initial-expander form initial-expander))

(define (expand-once form)
  (initial-expander form (lambda (x e) x)))

(define (expand-nth form n)
  (let ((i 0))
    (let ((e1 (lambda (x e2)
                (if (not (< i n))
                    x
                    (begin
                      (if (and (list? x)
                               (expander? (car x))
                               (not (eq? (car x) 'lambda)))
                          (set! i (+ i 1)))
                      (initial-expander x e2))))))
      (e1 form e1))))

(define (initial-expander form e)
  (cond
   ((symbol? form) form)
   ((literal? form) form)
   ((vector? form) (vector-map (lambda (el) (e el e))
                               form))
   ((dict? form) (dict-map (lambda (el) (e el e))
                           form))
   ((expander? (car form))
    ((expander-function (car form)) form e))
   (else
    (map (lambda (subform) (e subform e)) form))))

(install-expander 'define-expander
                  (lambda (form e)
                    (let ((sig (cadr form)))
                      (let ((name (car sig))
                            (arg-names (cdr sig))
                            (body (cddr form)))
                        (install-expander name (make-expander arg-names body))
                        #t))))

(define (make-expander arg-names body)
  (assert (eq? (length arg-names) 2)
          "define-expander functions must take two arguments")
  ;; see notes in make-macro, does the same thing
  (eval
   (compile
    `(lambda ,arg-names
       ,@body)
    (macro-generator.make-fresh))))

;; define-macro implementation on top of expanders

(install-expander 'define-macro
                  (lambda (form e)
                    (let ((sig (cadr form)))
                      (let ((name (car sig))
                            (pattern (cdr sig))
                            (body (cddr form)))
                        ;; install it during expand-time
                        (install-macro name pattern body)
                        #t))))


(define macro-generator #f)

(define (install-macro name pattern body)
  (install-expander name (make-macro pattern body)))

(define (make-macro pattern body)
  (let ((x (gensym))
        (e (gensym)))
    ;; compile the macro into native code and use the host's native
    ;; eval to eval it into a function. we don't use outlet's eval
    ;; because that only works outside the compiler (see comments on
    ;; `eval`).
    (let ((src
           `(lambda (,x ,e)
              (,e (let ,(destructure pattern `(cdr ,x) '())
                    ,@body)
                  ,e))))
      ((%raw "eval") (compile src (macro-generator.make-fresh))))))

(define (destructure pattern access bindings)
  (cond
   ((null? pattern) bindings)
   ((eq? (car pattern) '.) (cons (list (cadr pattern) access)
                                bindings))
   (else
    (cons (list (car pattern) `(car ,access))
          (destructure (cdr pattern) `(cdr ,access)
                       bindings)))))

;; system macros

(install-expander
 'lambda
 (lambda (form e)
   `(lambda ,(car (cdr form))
      ,@(map (lambda (subform) (e subform e)) (cdr (cdr form))))))

(install-expander 'cond
                  (lambda (form e)
                    (if (null? (cdr form))
                        #f
                        (let ((forms (cdr form)))
                          (let ((f (car forms)))
                            (if (eq? (car f) 'else)
                                (e `(begin ,@(cdr f)) e)
                                (e `(if ,(car f)
                                        (begin ,@(cdr f))
                                        (cond ,@(cdr forms))) e)))))))

(install-expander 'begin
                  (lambda (form e)
                    (e `((lambda () ,@(cdr form))) e)))

(install-expander 'define
                  (lambda (form e)
                    (let ((sig (cadr form)))
                      (cond
                       ((list? sig)
                        (e `(set ,(car sig) (lambda ,(cdr sig)
                                              ,@(cddr form))) e))
                       ((symbol? sig)
                        (e `(set ,sig ,(caddr form)) e))
                       (else
                        (throw (str "define requires a list"
                                              " or symbol to operate on: "
                                              (inspect form))))))))

(install-expander
 'let
 (lambda (form e)
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
                                      (replace acc el (dict-ref vars el)))
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
         (e `((lambda ()
                (define (,name ,@(map car forms))
                  ,@tco-ed)
                ;; todo, bug here. splicing in
                ;; var-defs and then putting (,name
                ;; ,@vars) after it didn't work
                ,@(list-append
                   (generate-defs syms forms)
                   (if (tco-call? name tco-ed)
                       `((trampoline (,name ,@syms)))
                       `((,name ,@syms))))))
            e))))))

;; quoting

(install-expander 'quote
                  (lambda (form e)
                    (let ((src (cadr form)))
                      ;; convert quoted lists into a list function
                      ;; call with quoted subelements. literals strip
                      ;; out the quote, and symbols keep the quote.
                      ;; the parser implements the low-level `quote`
                      ;; form.
                      (let ((q (lambda (el) (e (list 'quote el) e))))
                        (cond
                         ((symbol? src) (list 'quote src))
                         ((literal? src) src)
                         ((vector? src) (vector-map q src))
                         ((dict? src) (dict-map q src))
                         ((list? src) (cons 'list (map q src)))
                         (else
                          (throw (str "invalid type of expression: "
                                                (inspect src)))))))))

(install-expander 'quasiquote
                  (lambda (form e)
                    (let ((src (cadr form)))
                      (cond
                       ((symbol? src) (list 'quote src))
                       ((literal? src) src)
                       ((vector? src) `(list->vector
                                        ,(unquote-splice-expand (vector->list src) e)))
                       ((dict? src)
                        ;; dicts only support the `unquote` form in
                        ;; the value position. `unquote-splicing`
                        ;; isn't supported because of flaws in
                        ;; the reader (need to convert it to use real
                        ;; AST instead of native javascript types)
                        (dict-map (lambda (el)
                                    (if (and (list? el)
                                             (eq? (car src) 'unquote))
                                        (e (cadr el) e)
                                        (e (list 'quasiquote el) e)))
                                  src))
                       ((list? src)
                        ;; lists with `unquote` in car return the cadr
                        ;; as an unquoted & expanded expression
                        (if (eq? (car src) 'unquote)
                            (e (cadr src) e)
                            ;; other lists need to be searched for the
                            ;; `unquote-splicing` form, and quote
                            ;; everything else
                            (unquote-splice-expand src e)))
                       (else
                        (throw (str "invalid type of expression: "
                                              (inspect src))))))))

;; handle the `unquote-splicing` form within a `quasiquote` form. only
;; works with lists
(define (unquote-splice-expand lst e)
  (define (list-push lst item)
    (if (null? item)
        lst
        (cons (cons 'list (reverse item))
              lst)))

  (define (quote-splice lst lst-acc acc)
    ;; search for the `unquote-splicing` form in a list and cut the
    ;; list into sublists around these forms. unquote the cadr in the
    ;; `unquote-splicing` form and quote everything else. return a
    ;; list of lists.
    (if (null? lst)
        (list-push lst-acc acc)
        (let ((el (car lst)))
          (if (and (list? el)
                   (eq? (car el) 'unquote-splicing))
              ;; force the splice element into a list
              (let ((src (cond
                          ((literal? (cadr el)) (list 'list (cadr el)))
                          ((vector? (cadr el))
                           (list 'vector->list (cadr el)))
                          ((dict? (cadr el))
                           (pp el)
                           (throw "cannot splice dict"))
                          (else
                           ;; big hack! we only work with lists, so if
                           ;; it's a vector force it into a list. do
                           ;; this at runtime since it might be a variable
                           (let ((v (gensym)))
                             `(let ((,v ,(cadr el)))
                                (if (vector? ,v)
                                    (vector->list ,v)
                                    ,v)))))))
                (quote-splice (cdr lst)
                              (cons (e src e)
                                    (list-push lst-acc acc))
                              '()))
              (quote-splice (cdr lst)
                            lst-acc
                            (cons (e (list 'quasiquote el) e)
                                  acc))))))
  ;; cut the list into sublists and return a form that melds them back
  ;; together
  (let ((res (quote-splice lst '() '())))
    (if (eq? (length res) 1)
        (car res)
        (cons 'list-append (reverse res)))))

;; eval
;;
;; eval is a little tricky. it must be a macro that expands into the
;; host's native eval so that it happens in the right context. it also
;; depends on two builtins which represent the current compiler and
;; generator.

(install-expander 'eval
                  (lambda (form e)
                    `(eval
                      (__compiler.compile ,(e (cadr form) e) (__generator)))))

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
             (lambda (form gen expr? parse)
               (validator form)
               ((dict-ref gen func) (cdr form) expr? parse))))

(define (native? name)
  (and (symbol? name)
       (not (eq? (dict-ref _natives_ name))
            undefined)))

(define (verify-not-single form)
  (assert (> (length form) 1)
          (str "form requires at least one operand:"
                         (inspect form))))

(install-native 'and 'write-and verify-not-single)
(install-native 'or 'write-or verify-not-single)
(install-native '+ 'write-add verify-not-single)
(install-native '- 'write-subtract verify-not-single)
(install-native '* 'write-multiply verify-not-single)
(install-native '/ 'write-divide verify-not-single)
(install-native '> 'write-gt verify-not-single)
(install-native '< 'write-lt verify-not-single)
(install-native '<= 'write-lteq verify-not-single)
(install-native '>= 'write-gteq verify-not-single)
(install-native '>> 'write-rshift verify-not-single)
(install-native '<< 'write-lshift verify-not-single)
(install-native 'bitwise-or 'write-bitwise-or verify-not-single)
(install-native 'bitwise-and 'write-bitwise-and verify-not-single)
(install-native '% 'write-mod verify-not-single)

(install-native 'require 'write-require
                (lambda (form)
                  (verify-not-single form)
                  (for-each
                   (lambda (el)
                     (assert (and (list? el)
                                  (eq? (length el) 2))
                             (str "require needs a list of "
                                            "2 element lists: "
                                            (inspect el))))
                   (cdr form))))

;; compiler

(define (parse form generator . expr?)
  (let ((expr? (opt expr? #f))
        (%parse (lambda (form . expr?)
                  (parse form generator (opt expr? #f)))))

    (define (parse-literal form)
      ;; a literal is an self-evaluating expression like a number
      ;; e.g. 3, #t, "foo"
      ;; symbols in this context are terms, i.e. written unquoted
      (cond
       ((number? form) (generator.write-number form (not expr?)))
       ((string? form) (generator.write-string form (not expr?)))
       ((boolean? form) (generator.write-boolean form (not expr?)))
       ((null? form) (generator.write-empty-list form (not expr?)))
       (else
        (throw (str "Invalid literal: " (inspect form))))))

    (define (parse-set form)
      ;; `set` and `set!`; set introduces a new form in the environment
      ;; and set! modifies an existing one
      (assert (not expr?)
              (str "set{!} cannot be an expression: "
                             (inspect form)))
      (assert (symbol? (cadr form))
              "set{!} expects a symbol to operate on")

      ((if (eq? (car form) 'set)
           generator.write-set
           generator.write-set!)
       (cadr form) (caddr form) %parse))

    (define (parse-if form)
      ;; `if` allows branching in code based on the truthiness of an
      ;; expression
      (assert (> (length form) 2)
              (str "`if` has no branches: "
                             (inspect form)))
      (generator.write-if (cadr form) (caddr form) expr? %parse
                          (if (null? (cdddr form)) #f (car (cdddr form)))))

    (define (parse-lambda form)
      ;; `lambda` creates an anonymous function
      (assert (or (null? (cadr form))
                  (list? (cadr form))
                  (symbol? (cadr form)))
              "lambda expects a list or symbol for arguments")
      (let ((args (cadr form)))
        (generator.write-lambda args
                           (cddr form)
                           expr?
                           %parse)))

    (define (parse-func-call form)
      ;; form is a list representing a function call to the first
      ;; element of the list
      (let ((func (car form)))
        (assert (or (symbol? func)
                    (list? func))
                (str "operator is not a procedure: "
                               (inspect form)))
        (generator.write-func-call func
                                   (cdr form) expr? %parse)))

    (define (parse-quoted form)
      ;; a `quote` form only makes a difference with symbols. literals
      ;; are all parsed the same, but symbols don't convert into
      ;; terms. higher-level forms like lists should not be here;
      ;; macro expansion should handle how those are quoted.
      (let ((src (cadr form)))
        (cond
         ((symbol? src) (generator.write-symbol src (not expr?)))
         ((literal? src) (parse-literal src))
         (else
          (throw (str "unexpected type of object in quote, "
                                "literal expected: "
                                (inspect form)))))))

    (define (parse-list form)
      (let ((first (car form)))
        (cond
         ((eq? first 'if) (parse-if form))
         ((eq? first 'lambda) (parse-lambda form))
         ((eq? first 'quote) (parse-quoted form))
         ((or (eq? first 'set!)
              (eq? first 'set)) (parse-set form))
         ((eq? first '%raw)
          (assert (string? (cadr form)) "%raw expects a string")
          (generator.write-raw-code (cadr form)))
         ((native? first)
          ((native-function first) form generator expr? %parse))
         (else (parse-func-call form)))))

    (define (parse-vector vec)
      (parse-list (cons 'vector (vector->list vec))))

    (define (parse-dict dict)
      (let ((lst (dict->list dict))
            (i 0))
        (let ((qlst (map (lambda (el)
                           ;; quote the keys (this is hacky, will
                           ;; replace when proper looping is
                           ;; supported)

                           (set! i (+ i 1))
                           (if (eq? (% (- i 1) 2) 0)
                               (list 'quote el)
                               el))
                         lst)))
          (parse-list (cons 'dict qlst)))))

    (cond
     ((symbol? form) (generator.write-term form (not expr?)))
     ((literal? form) (parse-literal form))
     ((list? form) (parse-list form))
     ((vector? form) (parse-vector form))
     ((dict? form) (parse-dict form))
     (else
      (throw (str "Unkown thing: " form))))))

(define (read src)
  (reader grammar src []))

(define (compile src generator)
  ;; eval needs a code generator
  (if (not macro-generator)
      (set! macro-generator generator))

  (let ((forms (if (string? src) (read src) src)))
    (if (eq? (car forms) 'begin)
        ;; parse top-level forms individually
        (for-each (lambda (form)
                    (parse (expand form) generator))
                  (cdr forms))
        (parse (expand forms) generator))
    (generator.get-code)))

(set! module.exports {:read read
                      :expand expand
                      :parse parse
                      :compile compile
                      :install-expander install-expander
                      :expand-once expand-once
                      :expand-nth expand-nth
                      :pp pp

                      :set-macro-generator
                      (lambda (g)
                        (if (not macro-generator)
                            (set! macro-generator g)))})
