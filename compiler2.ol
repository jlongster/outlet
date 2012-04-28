
(require (reader "./reader")
         (ast "./ast")
         (js "./backends/js"))

(define (self-evaluating? exp)
  (or (number? exp)
      (string? exp)
      (boolean? exp)
      (null? exp)))

(define (alternating-map func lst)
  (let loop ((lst lst)
             (acc '()))
    (if (or (null? lst)
            (null? (cdr lst)))
        acc
        (loop (cddr lst)
              (cons (car lst)
                    (cons (func (cadr lst))
                          acc))))))

(define (opt arg def)
  (if (null? arg) def (car arg)))

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
                         (alternating-map (lambda (e) (expand e))
                                          (ast.node-data node))))
   ((eq? (ast.first* node) 'lambda)
    (ast.copy-node
     node
     (cons (cadr (node-data node))
           (map (lambda (e) (expand e))
                (cddr (node-data node))))))
   ((macro? (ast.first* node))
    (expand (sourcify
             ((macro-function (ast.first* node)) (desourcify node))
             (ast.node-lineno node)
             (ast.node-colno node))))
   (else (ast.copy-node node
                        (map expand (ast.node-data node))))))

(define %macros {})

(define (macro-function name)
  (dict-ref %macros name))

(define (install-macro name f)
  (dict-put! %macros name f))

(define (macro? name)
  (and (symbol? name)
       (dict-ref %macros name)
       #t))

;; can't use these until we have a compiler
(define macro-generator #f)

;; (define (make-macro pattern body)
;;   (let ((x (gensym)))
;;     ;; compile the macro into native code and use the host's native
;;     ;; eval to eval it into a function. we don't use outlet's eval
;;     ;; because that would create a circular dependency.
;;     ((%raw "eval")
;;      (__compiler.compile
;;       `(lambda (,x)
;;          (let ,(destructure pattern `(cdr ,x) '())
;;            ,@body))
;;       (macro-generator.make-fresh)))))

;; (define (destructure pattern access bindings)
;;   (cond
;;    ((null? pattern) bindings)
;;    ((eq? (car pattern) '.) (cons (list (cadr pattern) access)
;;                                 bindings))
;;    (else
;;     (cons (list (car pattern) `(car ,access))
;;           (destructure (cdr pattern) `(cdr ,access)
;;                        bindings)))))

;; (install-macro 'define-macro
;;                (lambda (form)
;;                  (let ((sig (cadr form)))
;;                    (let ((name (car sig))
;;                          (pattern (cdr sig))
;;                          (body (cddr form)))
;;                      ;; install it during expand-time
;;                      (install-macro name (make-macro pattern body))
;;                      #f))))

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

(define (compile-object node generator . quoted?)
  (let ((exp (ast.node-data node))
        (quoted? (opt quoted? #f)))
    (cond
     ((symbol? exp) (generator.write-symbol exp))
     ((number? exp) (generator.write-number exp))
     ((boolean? exp) (generator.write-boolean exp))
     ((null? exp) (generator.write-empty-list exp))
     ((ast.list? node)
      (compile (apply-node 'list node quoted?) generator))
     ((ast.dict? node)
      (compile (apply-node 'dict node quoted?) generator))
     ((ast.vector? node)
      (compile (apply-node 'vector node quoted?) generator))
     (else
      (throw (str "compile-object: unknown type: " exp))))))

(define (compile node generator . expr?)
  (define (%compile node . expr?)
    (compile node generator (opt expr? #f)))

  (cond
   ((self-evaluating? (ast.node-data node))
    (compile-object node generator))
   ((ast.vector? node)
    (compile-object node generator))
   ((ast.dict? node)
    (compile-object node generator))
   ((ast.list? node)
    (if (== (ast.first* node) 'quote)
        (compile-object (cadr (ast.node-data node)) generator #t)
        (begin
          (if (not (or (symbol? (ast.first* node))
                       (list? (ast.first* node))))
              (throw (str "operator is not a procedure: " (ast.first* node))))
          (generator.write-func-call (ast.first node)
                                     (cdr (ast.node-data node))
                                     #t
                                     %compile))))))

(define (compile-program src generator)
  (if (not macro-generator)
      (set! macro-generator generator))

  (let ((exp (if (string? src) (reader.read src) src)))

    (if (and (ast.type? exp 'LIST)
             (== (ast.first* exp) 'begin))
        ;; parse top-level forms individually
        (for-each (lambda (e)
                    (compile (expand e) generator))
                  (cdr (ast.node-data exp)))
        (compile (expand exp) generator))
    (generator.get-code)))

(set! module.exports {:compile compile-program})

(println (compile-program "(foo 2)" (js)))
