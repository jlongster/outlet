
(require (fs "fs"))

(let ((src (fs.readFileSync "runtime.ol" "utf-8"))
      (src (read src)))
  (for-each (lambda (f)
              (if (== (car f) 'define)
                  (pp (if (list? (cadr f))
                          (car (cadr f))
                          (cadr f)))))
            (cdr src)))
