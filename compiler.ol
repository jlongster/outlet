(require (reader "./parser")
         (util "util")
         (ast "./ast")
         (grammar "./grammar"))

;; util

(define (assert v msg)
  (if (not v)
      (throw msg)))

(define (assert_type node type msg)
  (assert (= node.type type)
          (string-append "invalid type, expected "
                         type
                         ": "
                         (inspect node))))

;; main functions

(define parsers '())

(define (read src)
  (reader grammar src (ast.node ast.ROOT)))

(define (parse node generator)
  ;; check to see if it's a macro
  (if (macro? node)
      (parse (expand node generator)
             generator)
      (let ((parser (vector-ref parsers node.type)))
        (assert parser (string-append "No parser for node type:"
                                      node.type))
        (parser node
                (lambda (node) (parse node generator))
                generator))))

(define (compile src generator)
  (parse (read src) generator)  
  (generator.get-code))

(define (expand node generator)
  (let ((name (vector-ref node.children 0)))
    (let ((func (get-macro name.data.str)))
      (nodify (func.apply null (map sourcify
                                    (node.children.slice 1)))))))

(define (sourcify node)
  (cond
   ((eq? node.type ast.NUMBER) (parseInt node.data))
   ((eq? node.type ast.TERM) node.data)
   ((eq? node.type ast.STRING) (string-append "\"" node.data "\""))
   ((eq? node.type ast.LIST) (map sourcify node.children))))

(define (nodify obj)
  (cond
   ((number? obj) (ast.node ast.NUMBER obj))
   ((symbol? obj) (ast.node ast.TERM obj))
   ((string? obj) (ast.node ast.STRING obj))
   ((pair? obj) (ast.node ast.LIST null (map nodify obj)))))

;; helpers

(define (define-to-lambda node)
  ;; extract the body
  (let ((target (vector-ref node.children 1)))
    (let ((args (target.children.slice 1))
          (body (node.children.slice 2)))
      ;; make a lambda node
      (ast.node ast.LIST null
                (vector-concat
                 (list (ast.node ast.TERM (make-symbol "lambda"))
                       (ast.node ast.LIST null args))
                 body)))))

(define (define-to-setlambda node)
  ;; define is the same as a set! with an expression, except that the
  ;; variable doesn't have to exist. Convert it into this: 
  ;; (set TERM EXPR)
  ;;
  ;; Example: (define (foo x y) (+ x y)) ->
  ;; (set foo (lambda (x y) (+ x y)))

  (define target (vector-ref node.children 1))
  (define name null)
  (define expr null)

  (if (eq? target.type ast.LIST)
      ;; function definition
      ;; extract the name and cut it off
      (begin
        (set! name (object-ref (vector-ref target.children 0) "data"))
        (set! expr (define-to-lambda node)))
      ;; variable declaration
      (let ((_expr (vector-ref node.children 2)))
        (set! name target.data)
        (set! expr _expr)))

  (ast.node ast.LIST null
            (list (ast.node ast.TERM (make-symbol "set"))
                  (ast.node ast.TERM name)
                  expr)))

;; macros

(define macros (object))

(define (install-macro name func)
  ;; yeah, we're relying on js hash semantics, and these function
  ;; names are all inconsistent
  (vector-set! macros name func))

(define (get-macro name)
  (vector-ref macros name))

(define (macro? node)
  (if (eq? node.type ast.LIST)
      (let ((name (vector-ref node.children 0)))
        (object-ref macros name.data.str))))

(define (parse-macro node generator)
  (let ((gen (generator.create-generator))
        (func-info (vector-ref node.children 1)))

    ;; parse the macro node with a new generator so we can get the raw
    ;; generated code
    (parse (define-to-lambda node) gen)

    (let ((name (vector-ref func-info.children 0)))
      ;; this eval is literally the javascript eval on the host
      ;; environment, so we are getting the macro function fo' real.
      ;; we have to put it in an array for some reason
      (let ((func (vector-ref
                   (eval (string-append "[" (gen.get-code) "]")) 0)))
        (install-macro name.data.str func)))))

;; parser

(define (install-parser type parser)
  (vector-set! parsers type parser))

(install-parser ast.NUMBER
                (lambda (node parse generator)
                  (generator.write-number node)))

(install-parser ast.STRING
                (lambda (node parse generator)
                  (generator.write-string node)))

(install-parser ast.TERM
                (lambda (node parse generator)
                  (generator.write-term node)))

(install-parser
 ast.LIST
 (lambda (node parse generator)
   (define first (vector-ref node.children 0))

   (assert (or (eq? first.type ast.TERM)
               (eq? first.type ast.LIST))
           (string-append "operator is not a procedure: "
                          (inspect first)))

   (define term (and first.data first.data.str))

   (cond
    ((equal? term "set!")
     (assert-type (vector-ref node.children 1) ast.TERM)
     (generator.write-set-excl node parse))

    ((equal? term "let")
     ;; transform a let into an inline lambda
     
     ;; (let ((foo 5)
     ;;       (bar (do-something)))
     ;;   body ...) ->
     
     ;; ((lambda (foo bar)
     ;;    body ...) 5 (do-something))

     (let ((vars (vector-ref node.children 1))
           (body (node.children.splice 2)))
       (assert-type vars ast.LIST)

       (define (vars-to-nodes vars names exprs)
         (if (null? vars)
             (list names exprs)
             (let ((_var (car vars)))
               (assert-type _var ast.LIST)

               (let ((name (vector-ref _var.children 0))
                     (expr (vector-ref _var.children 1)))
                 (assert-type name ast.TERM)

                 (vars-to-nodes (cdr vars)
                                (names.concat (list name))
                                (exprs.concat (list expr)))))))

       (let ((nodes (vars-to-nodes vars.children '() '())))
         (let ((lambda-header (list (ast.node ast.TERM (make-symbol "lambda"))
                                    (ast.node ast.LIST null (vector-ref nodes 0)))))
           (let ((lambda-node (ast.node ast.LIST
                              null
                              (lambda-header.concat body))))
             (generator.write-func-call
              (ast.node ast.LIST
                        null
                        (vector-concat (vector lambda-node) (vector-ref nodes 1)))
              parse))))))

    ((equal? term "lambda")
     ;; do some ast structure verification, should look like:
     ;; (lambda (term1 term2 ...) expr ...)     
     (define args (vector-ref node.children 1))

     (if (eq? args.type ast.LIST)
         (for-each (lambda (n) (assert-type n ast.TERM))
                   args.children)
         (if (eq? args.type ast.TERM)
             (throw "lambda must have a list of arguments or a binding term")))

     (generator.write-lambda node parse))

    ((equal? term "define")
     (generator.write-set (define-to-setlambda node) parse))

    ((equal? term "define-macro") (parse-macro node generator))

    ((equal? term "quote")
     (generator.write-array
                (vector-ref node.children 1)
                parse
                true))

    ((equal? term "list")
     (generator.write-array
                (ast.node ast.LIST
                          null
                          (node.children.slice 1))
                parse))

    ((equal? term "begin")
     (let ((body (node.children.slice 1)))
       (let ((lamb (ast.node ast.LIST null
                             (vector-concat
                              (list (ast.node ast.TERM (make-symbol "lambda"))
                                    (ast.node ast.LIST null '()))
                              body))))
         (parse (ast.node ast.LIST null (list lamb))))))

    ((equal? term "cond")
     (define (transform i)
       (if (or (> i node.children.length)
               (eq? i node.children.length))
           null
           (let ((n (vector-ref node.children i)))
             (let ((condition (vector-ref n.children 0))
                   (res (ast.node ast.LIST
                                  null
                                  (vector-concat
                                   (list (ast.node ast.TERM (make-symbol "begin")))
                                   (n.children.slice 1)))))
               (if (and (eq? condition.type ast.TERM)
                        (equal? condition.data "else"))
                   res
                   (ast.add_child
                    (ast.node ast.LIST
                              null
                              (list (ast.node ast.TERM (make-symbol "if"))
                                    condition
                                    res))
                    (transform (+ i 1))))))))
     (parse (transform 1)))

    ((generator.has-hook term)
     (generator.run-hook term node parse))

    (else (generator.write-func-call node parse)))))

(install-parser ast.ROOT
                (lambda (node parse)
                  (for-each (lambda (n) (parse n))
                            node.children)))

(set! module.exports (object))
(set! module.exports.read read)
(set! module.exports.parse parse)
(set! module.exports.compile compile)
