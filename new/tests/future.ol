
;; test code following an `if`
(define (func)
  (if #t
      (display "yes")
      (display "no"))

  (+ 1 2))

;; test set! as last expression
(define (faz)
  (let ((x 1))
    (+ 2 3)
    (set! x 3)))

;; test define as last expression (this won't be valid in the future)
(define (buz)
  (+ 2 3)
  (define a 4))
