
(require (compiler "./compiler"))

(compiler.install-expander
 'trace-source
 (lambda (form e)
   (define (trace-expander src e)
     (lambda (x e1)
       (if (and (list? x)
                (subexpression? x src))
           `(trace.trace-form ,(e (list 'quote x) e)
                              (lambda () ,(e x e1)))
           (e x e1))))

   (define (subexpression? form src)
     (or (equal? form src)
         (and (list? src)
              (or (subexpression? form (car src))
                  (subexpression? form (cdr src))))))
   
   (let ((e1 (trace-expander (cadr form) e)))
     (e1 (cadr form) e1))))

(define level 0)
(define (trace-form src k)
  
  (compiler.new-string)
  (pr (string-append (pad level "-")
                     (compiler.pretty src)
                     "\n"))

  (set! level (+ level 1))
  (let ((value (k)))
    (set! level (- level 1))
    
    (compiler.new-string)
    (pr (string-append (pad level ">")
                       "RESULT: "
                       (compiler.pretty value)
                       "\n"))
    
    value))

(define (pad n s)
  (let ((v (vector-map (lambda (_) s)
                       (make-vector (* n 2)))))
    (let ((s (v.join "")))
      (if (> n 0)
          (string-append s " ")
          s))))

(define pr #f)
(set! pr display)

(define (set-prompt func)
  (set! pr func))

(set! module.exports {:trace-form trace-form
                      :set-prompt set-prompt})
