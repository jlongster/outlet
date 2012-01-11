;; (define foo 5)

;; (define (bar x)
;;   (+ x 1))

;; (define (buz x)
;;   (let ((y x)
;;         (add_1 (if (< x 0)
;;                    (lambda (n) (- n 1))
;;                    (lambda (n) (+ n 1)))))
;;     (add_1 y)))

;; (define (fib n)
;;   (if (= n 0)
;;       n
;;       (+ n (fib (- n 1)))))

;; (define (Y func)
;;   ((lambda (f) (f f))
;;    (lambda (f)
;;      (func f))))

;; (for-each
;;  (lambda (x) (print x))
;;  '(1 2 3 4))

(define (print-n n)
  (cond
   ((> n 0) (display "positive"))
   ((< n 0) (display "negative"))
   ((= n 0) (display "0"))
   (else (display "wait, what?"))))
