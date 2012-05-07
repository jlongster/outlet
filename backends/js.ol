
(require (fs "fs")
         (ast "../ast"))

(define (should-return? form)
  (not (and (ast.list? form)
            (or (== (ast.first* form) 'throw)
                (== (ast.first* form) 'set!)
                (== (ast.first* form) 'define)))))

(define (generator)
  (define code [])

  (define (make-fresh)
    (generator))

  (define (write src . eol)
    (code.push (+ src (if (null? eol) "" "\n"))))

  (define (write-runtime target . root)
    (let ((root (if (null? root)
                    (str __dirname "/..")
                    (car root))))
      (if (not (equal? target "no-runtime"))
          (begin
            (if (not (equal? target "js-onlyeval"))
                (write (fs.readFileSync (str root "/runtime.js") "utf-8") #t))
            (if (not (equal? target "js-noeval"))
                (begin
                  (write (str "var __compiler = require('"
                              root "/compiler');") #t)
                  (write (str "var __generator = require('"
                              root "/backends/js');") #t)
                  (write "var read = __compiler.read;" #t)))))))

  (define (inline-writer str)
    (let ((first #t))
      (lambda ()
        (if first
            (set! first #f)
            (write str)))))

  (define (terminate-expr expr? . node)
    (let ((node (if (null? node) #f (car node))))
      ;; this is important; if it's not an expression, terminate the
      ;; statement so that js doesn't combine two function calls on
      ;; separate lines into one call
      (if (not expr?)
          (begin
            (write (str "; "
                        "// Line " (ast.node-lineno node)
                        " Column " (ast.node-colno node))
                   #t)))))

  (define (write-number obj expr?)
    (write obj)
    (terminate-expr expr?))

  (define (write-boolean obj expr?)
    (if obj
        (write "true")
        (write "false"))
    (terminate-expr expr?))

  (define (write-empty-list obj expr?)
    ;; this is defined as a variable in the runtime to encapsulate the
    ;; list data structure implementation
    (write "_emptylst")
    (terminate-expr expr?))

  (define (write-string obj expr?)
    (let ((str obj))
      (set! str (str.replace (RegExp "\\\\" "g") "\\\\"))
      (set! str (str.replace (RegExp "\n" "g") "\\n"))
      (set! str (str.replace (RegExp "\r" "g") "\\r"))
      (set! str (str.replace (RegExp "\t" "g") "\\t"))
      (set! str (str.replace (RegExp "\"" "g") "\\\""))
      (write (+ "\"" str "\""))
      (terminate-expr expr?)))

  (define (write-symbol obj expr?)
    (write (+ "\"\\uFDD1" (obj.substring 1) "\""))
    (terminate-expr expr?))

  (define (write-key obj expr?)
    (write (+ "\"\\uFDD0" (obj.substring 1) "\""))
    (terminate-expr expr?))

  (define (write-term node expr?)
    (let ((exp (ast.node-data node))
          (exp (cond
                ((== exp 'var) '_var_)
                ((== exp 'in) '_in_)
                (else exp))))

      (define name (exp.substring 1))
      (define parts (name.split "."))

      (let ((name (vector-ref parts 0)))
        (set! name (name.replace (RegExp "-" "g") "_dash_"))
        (set! name (name.replace (RegExp "\\?" "g") "_p_"))
        (set! name (name.replace (RegExp "\\!" "g") "_excl_"))
        (set! name (name.replace (RegExp ">" "g") "_gt_"))
        (set! name (name.replace (RegExp "<" "g") "_lt_"))
        (set! name (name.replace (RegExp "%" "g") "_per_"))
        (set! name (name.replace (RegExp "=" "g") "_eq_"))
        (set! name (name.replace (RegExp "\\/" "g") "_slash_"))
        (set! name (name.replace (RegExp "\\*" "g") "_star_"))
        (set! name (name.replace (RegExp "\\+" "g") "_plus_"))
        (write name))

      ;; Convert dots to brackets:
      ;; foo.bar -> foo["bar"]
      ;; foo.bar.baz -> foo["bar"]["baz"]
      (vector-for-each
       (lambda (part)
         (write (str "[\"" part "\"]")))
       (vector-slice parts 1))

      (terminate-expr expr?)))

  (define (write-define lval rval compile)
    (write "var ")
    (write-set! lval rval compile))

  (define (write-set! lval rval compile)
    (write-term lval #t)
    (write " = ")
    (compile rval #t)
    ;; since we parsed rval as an expression (passed #t to compile),
    ;; need to manually terminate it
    (write ";" #t))

  (define (write-if cnd tru alt expr? compile)
    (write "(function() {")

    (write "if(")
    (compile cnd #t)
    (write ") {")
    (if (should-return? tru)
        (write "return "))
    (compile tru)
    (write "}")

    (if alt
        (begin
          (write " else {")
          (if (should-return? alt)
              (write "return "))
          (compile alt)
          (write "}")))

    (write "})()" #t)
    (terminate-expr expr?))

  (define (write-lambda node expr? compile)
    (define name (car (ast.node-data node)))
    (define args (cadr (ast.node-data node)))
    (define body (cddr (ast.node-data node)))

    (cond
     ((ast.list? args)
      (define comma (inline-writer ","))
      (define capture-name #f)
      (define opt-args #f)
      (define arg-min (length (ast.node-data args)))
      (define arg-max arg-min)

      (define (write-args args i)
        (if (not (null? args))
            (let ((arg (ast.node-data (car args))))
              (cond
               ((== arg '.)
                (set! capture-name (cadr args))
                (set! arg-min i)
                (set! arg-max #f))
               ((== arg '&)
                (set! opt-args (cdr args))
                (set! arg-min i)
                (set! arg-max (- arg-max 1)))
               (else
                 (comma)
                 (write-term (car args) #t)
                 (write-args (cdr args) (+ i 1)))))))

      (write "(function(")
      (write-args (ast.node-data args) 0)
      (write "){" #t)

      ;; check number of arguments
      (write (str "if(arguments.length < " arg-min ") {") #t)
      (write (str "throw Error(\""
                  (or (ast.node-extra name) "lambda")
                  ": not enough arguments\")")
             #t)
      (write "}" #t)

      (if arg-max
          (begin
            (write (str "else if(arguments.length > "
                        arg-max
                        ") {")
                   #t)
            (write (str "throw Error(\""
                        (or (ast.node-extra name) "lambda")
                        ": too many arguments\");")
                   #t)
            (write "}" #t)))
      
      (cond
       (capture-name
        (write "var ")
        (write-term capture-name #t)
        (write " = ")
        (write-term (ast.make-atom 'vector->list capture-name) #t)
        (write (str "(Array.prototype.slice.call(arguments, " arg-min "));")
               #t))
       (opt-args
        (fold (lambda (arg i)
                (write "var ")
                (write-term arg #t)
                (write (str " = arguments[" i "] || false;") #t)
                (+ i 1))
              arg-min
              opt-args))))
      
     ((symbol? (ast.node-data args))
      (write "(function() {" #t)
      (write "var ")
      (write-term args #t)
      (write " = ")
      (write-term (ast.make-atom 'vector->list args) #t)
      (write "(Array.prototype.slice.call(arguments));" #t))
     ((null? (ast.node-data args))
      (write "(function() {")))

    (let ((i 0)
          (len (length body)))
      (for-each (lambda (form)
                  ;; return the last form (if it's not a throw or a set)
                  (if (and (== i (- len 1))
                           (should-return? form))
                      (write "return "))

                  (compile form)
                  (set! i (+ i 1)))
                body))
    (write "})")
    (terminate-expr expr?))

  (define (write-func-call func args expr? compile)
    ;; write the calling function, which can be a symbol, a lambda, or a
    ;; call to another function
    (if (and (ast.list? func)
             (== (ast.first* func) 'lambda))
        (begin
          ;; need to wrap an anon function in parens so it's
          ;; valid syntax
          (write "(")
          (compile func #t)
          (write ")"))
        (compile func #t))

    ;; write the arguments
    (write "(")
    (let ((comma (inline-writer ",")))
      (for-each (lambda (arg)
                  (comma)
                  (compile arg #t))
                args))
    (write ")")

    (terminate-expr expr? func))

  (define (write-raw-code node)
    (write (ast.node-data node)))

  (define (write-op op vals expr? compile)
    (write "(")
    (let ((op-writer (inline-writer
                      (str " " op " "))))
      (for-each (lambda (arg)
                  (op-writer)
                  (compile arg #t))
                vals))
    (write ")")
    (terminate-expr expr?))

  (define (make-op-writer str)
    (lambda (vals expr? compile)
      (write-op str vals expr? compile)))

  (define (write-require args expr? compile)
    (for-each (lambda (el)
                (write "var ")
                (write-term (ast.first el) #t)
                (write " = require(")
                (write-string (ast.node-data
                               (cadr (ast.node-data el))) #t)
                (write ");"))
              args))

  {:write-runtime write-runtime
   :write-number write-number
   :write-string write-string
   :write-boolean write-boolean
   :write-term write-term
   :write-symbol write-symbol
   :write-key write-key
   :write-empty-list write-empty-list
   :write-define write-define
   :write-set! write-set!
   :write-if write-if
   :write-lambda write-lambda
   :write-func-call write-func-call
   :write-raw-code write-raw-code

   ;; specials
   :write-require write-require
   :write-and (make-op-writer "&&")
   :write-or (make-op-writer "||")
   :write-add (make-op-writer "+")
   :write-subtract (make-op-writer "-")
   :write-multiply (make-op-writer "*")
   :write-divide (make-op-writer "/")
   :write-gt (make-op-writer ">")
   :write-lt (make-op-writer "<")
   :write-gteq (make-op-writer ">=")
   :write-lteq (make-op-writer "<=")
   :write-mod (make-op-writer "%")
   :write-rshift (make-op-writer ">>")
   :write-lshift (make-op-writer "<<")
   :write-bitwise-or (make-op-writer "|")
   :write-bitwise-and (make-op-writer "&")

   :make-fresh make-fresh
   :get-code (lambda () (code.join ""))})

(set! module.exports generator)
