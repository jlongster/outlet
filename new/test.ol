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
    (compiler.parse f gen)
    (eval (gen.get-code))))
