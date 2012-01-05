(define foo 5)

(define (bar x)
  (+ x 1))

(define (buz x y)
  (let ((z 5))
    (+ x y z)))

(define (fib n)
  (if (= n 0)
      n
      (+ n (fib (- n 1)))))

(define (Y func)
  ((lambda (f) (f f))
   (lambda (f)
     (func f))))

(define (array-join arr del)
  (arr.join del))
