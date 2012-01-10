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

(define (Y gen)
  ((lambda (f) (f f))
   (lambda (f)
     (gen
      (lambda args
        (let ((ff (f f)))
          (ff.apply null args)))))))

(define a
  (Y (lambda (f)
       (lambda (i)
         (if (< i 10)
             (let ((x 0))
               (console.log i)
               (f (+ i 1))))))))
