
(define-expander (trace-source form e)
  (define (trace-expander src e)
    (lambda (x e1)
      (if (and (list? x)
               (subexpression? x src))
          `(trace-form ,(e (list 'quote x) e)
                       (lambda () ,(e x e1)))
          (e x e1))))

  (define (subexpression? form src)
    (or (equal? form src)
        (and (list? src)
             (or (subexpression? form (car src))
                 (subexpression? form (cdr src))))))
  
  (let ((e1 (trace-expander (cadr form) e)))
    (e1 (cadr form) e1)))

(define level 0)
(define (trace-form src k)
  (print-trace level src)
  (set! level (+ level 1))
  (let ((value (k)))
    (set! level (- level 1))
    (print-trace level value)
    value))

(define (print-trace level obj)
  (define (pad n)
    (vector-for-each (lambda (_) (display "|"))
                     (make-vector (* n 4))))

  (pad level)
  (if (list? obj)
      (pretty obj)
      (display (inspect obj)))
  (display "\n"))

(trace-source (let ((i (+ 4 5)))
                (+ i (* 2 (/ 3 4)))))

