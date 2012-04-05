(require (fs "fs")
         (compiler "./compiler")
         (boot "./boot/compiler")
         (util "util")
         (js "./backends/js"))

(if (< process.argv.length 3)
    (throw "must pass a filename"))

(let ((filename (vector-ref process.argv 2)))
  (let ((src (fs.readFileSync (str "tests/" filename)
                              "utf-8"))
        (gen (js))

        ;; if we're testing syntax, use the last version of the stable
        ;; compiler to compile the source code. the code will import the
        ;; current compiler and using `read` will compare the results
        (comp (if (= filename "syntax.ol")
                  boot
                  compiler))

        ;; just kidding, always use the current compiler
        (comp compiler))
      
    ;; if dumping to an external file, need to write the runtime
    ;;(gen.write-runtime "js")

    (comp.set-macro-generator gen)

    (let ((f (comp.expand (comp.read src))))
      ;;(pp f)
      (comp.parse f gen)
      ((%raw "eval") (gen.get-code))
      ;;(println (gen.get-code))
      )))
