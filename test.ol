(require (fs "fs")
         (compiler "./compiler")
         (util "util")
         (js "./backends/js")
         (trace "./trace"))

(if (< process.argv.length 3)
    (throw "must pass a filename"))

(let ((src (fs.readFileSync (string-append "tests/"
                                           (vector-ref process.argv 2))
                            "utf-8"))
      (gen (js)))

  ;; new runtime
  (gen.write-raw-code (fs.readFileSync "r.js" "utf-8"))
  (gen.write-raw-code (fs.readFileSync "runtime-eval.js" "utf-8"))
  ;;(gen.write-runtime "js")
  (compiler.set-macro-generator gen)

  (let ((f (compiler.expand (read src))))
    ;;(pp f)
    (compiler.parse f gen)
    ;;((%raw "eval") (gen.get-code))
    (display (gen.get-code))
    ))
