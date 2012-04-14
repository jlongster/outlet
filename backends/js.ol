
(require (fs "fs"))

(define (should-return? form)
  (not (and (list? form)
            (or (eq? (car form) 'throw)
                (eq? (car form) 'set!)
                (eq? (car form) 'set)))))

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

  (define (terminate-expr expr?)
    ;; this is important; if it's not an expression, terminate the
    ;; statement so that js doesn't combine two function calls on
    ;; separate lines into one call
    (if (not expr?)
        (write ";" #t)))

  (define (write-number obj top?)
    (write obj)
    (terminate-expr (not top?)))

  (define (write-boolean obj top?)
    (if obj
        (write "true")
        (write "false"))
    (terminate-expr (not top?)))

  (define (write-empty-list obj top?)
    ;; this is defined as a variable in the runtime to encapsulate the
    ;; list data structure implementation
    (write "_emptylst")
    (terminate-expr (not top?)))

  (define (write-string obj top?)
    (let ((str obj))
      (set! str (str.replace (RegExp "\\\\" "g") "\\\\"))
      (set! str (str.replace (RegExp "\n" "g") "\\n"))
      (set! str (str.replace (RegExp "\r" "g") "\\r"))
      (set! str (str.replace (RegExp "\t" "g") "\\t"))
      (set! str (str.replace (RegExp "\"" "g") "\\\""))
      (write (+ "\"" str "\""))
      (terminate-expr (not top?))))

  (define (write-symbol obj top?)
    (write (+ "\"\\uFDD1" (obj.substring 1) "\""))
    (terminate-expr (not top?)))

  (define (write-term obj top?)
    (let ((obj (if (== obj 'var)
                   '_var_
                   obj)))

      (define name (obj.substring 1))
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
      
      (terminate-expr (not top?))))

  (define (write-set lval rval parse)
    (write "var ")
    (write-set! lval rval parse))

  (define (write-set! lval rval parse)
    (write-term lval)
    (write " = ")
    (parse rval #t)
    ;; since we parsed rval as an expression (passed #t to parse),
    ;; need to manually terminate it
    (write ";" #t))

  (define (write-if pred tru expr? parse . fal)
    (write "(function() {")

    (write "if(")
    (parse pred #t)
    (write ") {")
    (if (should-return? tru)
        (write "return "))
    (parse tru)
    (write "}")

    (if (not (null? fal))
        (begin
          (write " else {")
          (if (should-return? (car fal))
              (write "return "))
          (parse (car fal))
          (write "}")))

    (write "})()" #t)
    (terminate-expr expr?))

  (define (write-lambda args body expr? parse)
    (cond
     ((list? args)
      (define comma (inline-writer ","))
      (define capture-name #f)

      (define (write-args args)
        (if (not (null? args))
            (begin
              (if (eq? (car args) '.)
                  (set! capture-name (cadr args))
                  (begin
                    (comma)
                    (write-term (car args))
                    (write-args (cdr args)))))))

      (write "(function(")
      (write-args args)
      (write "){" #t)

      (if capture-name
          (begin
            (write "var ")
            (write-term capture-name)
            (write " = ")
            (write-term 'vector->list)
            (write "(Array.prototype.slice.call(arguments, ")
            ;; only slice args from where the dot started
            (write (- (length args) 2))
            (write "));" #t))))
     ((symbol? args)
      (write "(function() {" #t)
      (write "var ")
      (write-term args)
      (write " = ")
      (write-term 'vector->list)
      (write "(Array.prototype.slice.call(arguments));" #t))
     ((null? args)
      (write "(function() {")))

    (let ((i 0)
          (len (length body)))
      (for-each (lambda (form)
                  ;; return the last form (if it's not a throw or a set)
                  (if (and (eq? i (- len 1))
                           (should-return? form))
                      (write "return "))

                  (parse form)
                  (set! i (+ i 1)))
                body))
    (write "})")
    (terminate-expr expr?))

  (define (write-func-call func args expr? parse)
    ;; write the calling function, which can be a symbol, a lambda, or a
    ;; call to another function
    (if (symbol? func)
        (write-term func)
        (if (eq? (car func) 'lambda)
            (begin
              ;; need to wrap an anon function in parens so it's
              ;; valid syntax
              (write "(")
              (parse func #t)
              (write ")"))
            (parse func #t)))

    ;; write the arguments
    (write "(")
    (let ((comma (inline-writer ",")))
      (for-each (lambda (arg)
                  (comma)
                  (parse arg #t))
                args))
    (write ")")

    (terminate-expr expr?))

  (define (write-raw-code code)
    (write code))

  (define (write-op op vals expr? parse)
    (write "(")
    (let ((op-writer (inline-writer
                      (str " " op " "))))
      (for-each (lambda (arg)
                  (op-writer)
                  (parse arg #t))
                vals))
    (write ")")
    (terminate-expr expr?))

  (define (make-op-writer str)
    (lambda (vals expr? parse)
      (write-op str vals expr? parse)))

  (define (write-require args expr? parse)
    (for-each (lambda (el)
                (write "var ")
                (write-term (car el))
                (write " = require(")
                (write-string (cadr el))
                (write ");"))
              args))

  {:write-runtime write-runtime
   :write-number write-number
   :write-string write-string
   :write-boolean write-boolean
   :write-term write-term
   :write-symbol write-symbol
   :write-empty-list write-empty-list
   :write-set write-set
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
