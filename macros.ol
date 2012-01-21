;; builtin macros that implement advanced features of the language in
;; terms of the simple building blocks. evaluated in context of the
;; compiler.

(define-macro (begin . body)
  `((lambda () ,@body)))

(define-macro (let forms . body)
  `((lambda ,(map car forms)
      ,@body)
    ,@(map (lambda (form)
             (car (cdr form)))
           forms)))

(define-macro (eval-outlet form)
  ;; make generator, compile the code and eval it. this
  ;; is a macro so the eval happens in the right context
  `(let ((gen (create-generator)))
     (parse (nodify ,form) gen)
     (eval (gen.get_code))))

(define-macro (cond . forms)
  (if (null? forms)
      '#f
      (let ((form (car forms)))
        (if (eq? (car form) 'else)
            `(begin ,@(cdr form))
            `(if ,(car form)
                 (begin ,@(cdr form))
                 (cond ,@(cdr forms)))))))
