(require (fs "fs")
         (compiler "./compiler")
         (util "util")
         (js "./backends/js")
         (trace "./trace"))

(if (< process.argv.length 3)
    (throw "must pass a filename"))

(define (initial-expander form e)
  (cond
   ((symbol? form) form)
   ((compiler.literal? form) form)
   ((vector? form) form)
   ((dict? form) form)
   ((compiler.expander? (car form))
    ((compiler.expander-function (car form)) form e))
   (else
    (map (lambda (subform) (e subform e)) form))))

(define (expand-nth form n)
  (let ((i 0))
    (let ((e1 (lambda (x e2)
                (if (not (< i n))
                    x
                    (begin
                      (if (and (list? x)
                               (compiler.expander? (car x))
                               (not (eq? (car x) 'lambda)))
                          (set! i (+ i 1)))
                      (initial-expander x e2))))))
      (e1 form e1))))

(let ((src (fs.readFileSync (string-append "tests/"
                                           (vector-ref process.argv 2))
                            "utf-8"))
      (gen (js)))

  ;;(gen.write-runtime "js")
  (compiler.set-macro-generator gen)
  
  (let ((f (expand-nth (read src) 1000)))
    ;;(compiler.pretty f)
    (compiler.parse f gen)
    (eval (gen.get-code))))
