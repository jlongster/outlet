(require (fs "fs")
         (compiler "./compiler")
         (util "util")
         (js "./backends/js"))

(if (< process.argv.length 3)
    (throw "must pass a filename"))

(let ((src (fs.readFileSync (string-append "tests/"
                                           (vector-ref process.argv 2))
                            "utf-8"))
      (gen (js)))
  (gen.write-runtime "js")

  (let ((f (compiler.expand (compiler.read src))))
    (if (list? f)
        ;; probably should make lambda generate code that doesn't put "return"
        ;; if the last statement is a set!
        (let ((lmb (car f)))
          (if (not (eq? (car lmb) 'lambda))
              (throw "WAT")
              (for-each (lambda (form) (compiler.parse form gen))
                        (cddr lmb))))
        (compiler.parse f gen))
    (eval (gen.get-code))))
