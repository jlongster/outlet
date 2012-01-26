(require (util "util")
         (fs "fs")
         (reader "./parser")
         (ast "./ast")
         (grammar "./grammar")
         (js "./compiler-js"))

;; util

(define current-generator false)

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

(define (install-builtin-macros)
  (let ((src (fs.readFileSync "macros.ol" "utf-8")))
    (parse (read src) (create-generator))))

(define (read src)
  (reader grammar src (ast.node ast.ROOT)))

(define (set-generator gen)
  (set! current-generator gen))

(define (create-generator)
  (current-generator.create_generator))

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
  (set! current-generator generator)
  (install-builtin-macros)
  (parse (read src) generator)
  (generator.get_code))

(define (expand node generator)
  (let ((name (vector-ref node.children 0)))
    (let ((func (get-macro name.data.str)))
      (let ((args (vector-map sourcify (node.children.slice 1))))
        (let ((src (func.apply null args)))
          (let ((res (nodify src)))
            ;; maintain node links
            (if res (set! res.link node.link))
            res))))))

(define (sourcify node)
  (cond
   ((eq? node.type ast.NUMBER) (parseFloat node.data))
   ((eq? node.type ast.TERM) node.data)
   ((eq? node.type ast.STRING) node.data)
   ((eq? node.type ast.BOOLEAN) node.data)
   ((eq? node.type ast.LIST) (vector-to-list (vector-map sourcify node.children)))
   ((eq? node.type ast.VECTOR) (vector-map sourcify node.children))
   ((eq? node.type ast.MAP) (hash-map-map sourcify
                                          (hash-map.apply null node.children)))))

(define (nodify obj)
  (cond
   ((number? obj) (ast.node ast.NUMBER obj))
   ((symbol? obj) (ast.node ast.TERM obj))
   ((string? obj) (ast.node ast.STRING obj))
   ((boolean? obj) (ast.node ast.BOOLEAN obj))
   ((list? obj) (ast.node ast.LIST null (vector-map nodify (list-to-vector obj))))
   ((null? obj) (ast.node ast.LIST))
   ((vector? obj) (ast.node ast.VECTOR null (vector-map nodify obj)))
   ((map? obj) (ast.node ast.MAP null (hash-map-to-vec (hash-map-map nodify obj))))
   (else null)))

;; helpers

(define (define-to-lambda node)
  ;; extract the body
  (let ((target (vector-ref node.children 1)))
    (let ((args (target.children.slice 1))
          (body (node.children.slice 2)))
      ;; make a lambda node
      (ast.node ast.LIST null
                (vector-concat
                 (vector (ast.node ast.TERM (make-symbol "lambda"))
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
            (vector (ast.node ast.TERM (make-symbol "set"))
                    (ast.node ast.TERM name)
                    expr)))

;; macros

(define macros (hash-map))

(define (install-macro name func)
  ;; yeah, we're relying on js hash semantics, and these function
  ;; names are all inconsistent
  (vector-set! macros name func))

(define (get-macro name)
  (vector-ref macros name))

(define (macro? node)
  (if (and (eq? node.type ast.LIST)
           (not (null? node.children)))
      (let ((name (vector-ref node.children 0)))
        (if (eq? name.type ast.TERM)
            (object-ref macros name.data.str)))))

(define (parse-macro node generator)
  (let ((gen (generator.create_generator))
        (func-info (vector-ref node.children 1)))

    ;; parse the macro node with a new generator so we can get the raw
    ;; generated code
    (parse (define-to-lambda node) gen)

    (let ((name (vector-ref func-info.children 0)))
      ;; this eval is literally the javascript eval on the host
      ;; environment, so we are getting the macro function fo' real.
      ;; we have to put it in an array for some reason
      (let ((func (vector-ref
                   (eval (string-append "[" (gen.get_code) "]")) 0)))
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

(install-parser ast.BOOLEAN
                (lambda (node parse generator)
                  (generator.write-boolean node)))

(install-parser
 ast.LIST
 (lambda (node parse generator)

   (assert (not (null? node.children))
           "invalid form: empty list")
   
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

    ((equal? term "lambda")
     ;; do some ast structure verification, should look like:
     ;; (lambda (term1 term2 ...) expr ...)     
     (define args (vector-ref node.children 1))
     
     (if (eq? args.type ast.LIST)
         (vector-for-each (lambda (n) (assert-type n ast.TERM))
                          args.children)
         (if (not (eq? args.type ast.TERM))
             (throw "lambda must have a list of arguments or a binding term")))

     (generator.write-lambda node parse))

    ((equal? term "define")
     (generator.write-set (define-to-setlambda node) parse))

    ((equal? term "define-macro")
     (parse-macro node generator))

    ((or (equal? term "quote")
         (equal? term "quasiquote"))
     (let ((n (vector-ref node.children 1)))
       (let ((type (object-ref n "type")))
         (cond
          ((eq? type ast.LIST)
           (generator.write-list
            (vector-ref node.children 1)
            parse
            (if (equal? term "quote")
                "quote"
                "quasi")))

          ((eq? type ast.VECTOR)
           (generator.write-vector
            (vector-ref node.children 1)
            parse
            (if (equal? term "quote")
                "quote"
                "quasi")))

          ((eq? type ast.MAP)
           ;; (define (unquote-keys i)
           ;;   (if (< i n.children.length)
           ;;       (let ((key (vector-ref n.children i)))
           ;;         (assert-type key ast.LIST)
           ;;         (let ((keyname (vector-ref key.children 1)))
           ;;           (assert-type keyname ast.TERM)
           ;;           (vector-set! n.children i keyname)
           ;;           (unquote-keys (+ i 2))))))
           ;; (unquote-keys 0)
           (generator.write-map n parse 
                                (if (equal? term "quote")
                                    "quote"
                                    "quasi")))
          
          ((eq? type ast.TERM)
           (generator.write-symbol n))

          (else
           (parse n))))))

    ((equal? term "list")
     (generator.write-list
                (ast.node ast.LIST
                          null
                          (node.children.slice 1))
                parse))

    ((generator.has-hook term)
     (generator.run-hook term node parse))

    (else (generator.write-func-call node parse)))))

(install-parser ast.VECTOR
                (lambda (node parse generator)
                  (generator.write-vector node parse)))

(install-parser ast.MAP
                (lambda (node parse generator)
                  (generator.write-map node parse)))

(install-parser ast.ROOT
                (lambda (node parse)
                  (vector-for-each (lambda (n) (parse n))
                                   node.children)))

(set! module.exports (hash-map))
(set! module.exports.read read)
(set! module.exports.parse parse)
(set! module.exports.compile compile)
(set! module.exports.install_builtin_macros install-builtin-macros)

(set! module.exports.set-generator set-generator)
(set! module.exports.create_generator create-generator)
(set! module.exports.nodify nodify)
(set! module.exports.sourcify sourcify)

