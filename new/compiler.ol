(require (sys-util "util")
         (fs "fs")
         (reader "./parser")
         (grammar "./grammar")
         (js "./backends/js"))

;; runtime

(define _gensym 0)
(define (gensym)
  (set! _gensym (+ _gensym 1))
  (string->symbol (+ "o" _gensym)))

(define (literal? x)
  (or (number? x)
      (string? x)
      (boolean? x)
      (null? x)))

(define (application? form)
  (and (list? form)
       (not (expander? (car form)))))

(define (ref obj name)
  (object-ref obj (symbol->string name)))

(define put! vector-set!)

(define (opt arg def)
  (if (null? arg) def (car arg)))

(define (pretty lst . i)
  (define (pad n)
    (vector-for-each (lambda (_) (display " "))
                     (make-vector (* n 2))))

  (let ((i (if (null? i) 0 (car i))))
    (pad i)
    (cond
     ((null? lst) (display "()"))
     ((list? lst)
      (let ((node (car lst))
            (childr (cdr lst)))
        (display "(")
        (if (list? node)
            (pretty node (+ i 1))
            (display (->string node)))
        (for-each (lambda (item)
                    (display "\n")
                    (pad i)
                    (pretty item (+ i 1)))
                  childr)
        (display ")")))
     (else (display (->string lst))))))

(define (symbol->string sym)
  sym.str)

(define (assert cnd msg)
  (if (not cnd)
      (throw msg)))

;; expanders

(define _expanders_ {})

(define (expander-function name)
  (ref _expanders_ name))

(define (install-expander name func)
  (put! _expanders_ (symbol->string name) func))

(define (expander? name)
  (not (eq? (ref _expanders_ name)
            undefined)))

(define (expand form)
  (initial-expander form initial-expander))

(define (expand-once form)
  (initial-expander form (lambda (x e) x)))

(define (initial-expander form e)
  (cond
   ((symbol? form) form)
   ((literal? form) form)
   ((vector? form) form)
   ((dict? form) form)
   ((expander? (car form))
    ((expander-function (car form)) form e))
   (else (map (lambda (subform) (e subform e)) form))))

;; define-macro implementation on top of expanders

(install-expander 'define-macro
                  (lambda (form e)
                    (let ((sig (cadr form)))
                      (let ((keyword (car sig))
                            (pattern (cdr sig))
                            (body (cddr form)))
                        (e `(install-expander ',keyword
                                              ,(make-macro pattern body))
                           e)))))

(define (make-macro pattern body)
  (let ((x (gensym))
        (e (gensym)))
    `(lambda (,x ,e)
       (,e (let ,(destructure pattern `(cdr ,x) '())
             ,@body)
           ,e))))

(define (destructure pattern access bindings)
  (cond
   ((null? pattern) bindings)
   ((eq? (car pattern) '.) (cons (list (cadr pattern) access) bindings))
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
                                `(begin ,@(map (lambda (s) (e s e)) (cdr f)))
                                (begin
                                  `(if ,(e (car f) e)
                                       (begin ,@(map (lambda (s) (e s e)) (cdr f)))
                                       ,(e `(cond ,@(cdr forms)) e)))))))))

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
                        (throw (string-append "define requires a list"
                                              " or symbol to operate on")))))))

(install-expander 'let
                  (lambda (form e)
                    (let ((forms (cadr form))
                          (body (cddr form)))
                      (e `((lambda ,(map car forms)
                             ,@body)
                           ,@(map cadr forms)) e))))

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
                          (throw (string-append "invalid type of expression: "
                                                (inspect src)))))))))

(install-expander 'quasiquote
                  (lambda (form e)
                    (let ((src (cadr form)))
                      (cond
                       ((symbol? src) (list 'quote src))
                       ((literal? src) src)
                       ((vector? src) `(list-to-vector
                                        ,(unquote-splice-expand (vector-to-list src) e)))
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
                        (throw (string-append "invalid type of expression: "
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
                           (list 'vector-to-list (cadr el)))
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
                                    (vector-to-list ,v)
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

;; natives
;; natives are like macros for generating source code. it allows the
;; generator to customize how certain forms look in the final output.
;; these could have been macros that expand into basic forms, but we
;; want readable output. natives are responsible for integrity checking
;; of the form.

(define _natives_ {})

(define (native-function name)
  (ref _natives_ name))

(define (install-native name func)
  (put! _natives_ (symbol->string name) func))

(define (native? name)
  (not (eq? (ref _natives_ name))
       undefined))

(install-native 'and
                (lambda (form gen expr? parse)
                  (assert (> (length form) 1)
                          "`and` requires at least one operand")
                  (gen.write-and (cdr form) expr? parse)))

(install-native 'or
                (lambda (form gen expr? parse)
                  (assert (> (length form) 1)
                          "`or` requires at least one operand")
                  (gen.write-or (cdr form) expr? parse)))

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
        (throw (string-append "Invalid literal: " (inspect form))))))

    (define (parse-set form)
      ;; `set` and `set!`; set introduces a new form in the environment
      ;; and set! modifies an existing one
      (assert (not expr?)
              (string-append "set{!} cannot be an expression: "
                             (->string form)))
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
              (string-append "`if` has no branches: "
                             (inspect form)))
      (generator.write-if (cadr form) (caddr form) expr? %parse
                          (if (null? (cdddr form)) #f (cadddr form))))

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
                (string-append "operator is not a procedure: "
                               (->string func)))
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
          (throw (string-append "unexpected type of object in quote, "
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
         ((native? first)
          ((native-function first) form generator expr? %parse))
         (else (parse-func-call form)))))

    (define (parse-vector vec)
      (parse-list (cons 'vector (vector-to-list vec))))

    (define (parse-dict dict)
      (let ((lst (dict-to-list dict))
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
     ((symbol? form) (generator.write-term form))
     ((literal? form) (parse-literal form))
     ((list? form) (parse-list form))
     ((vector? form) (parse-vector form))
     ((dict? form) (parse-dict form))
     (else
      (throw (string-append "Unkown thing: " form))))))

(define (read src)
  (reader grammar src '[]))

(define (compile src generator)
  (let ((r (read src)))
    (let ((f (expand r)))
      ;; todo, figure when runtime should be written
      (generator.write-runtime "js")
      (compiler.parse f gen)
      (generator.get-code))))

(set! module.exports {:read read
                      :expand expand
                      :parse parse
                      :compile compile})


