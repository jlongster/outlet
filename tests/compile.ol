
(define-macro (%test hook src val . args)
  `(let ((comp (if (null? ',args) equal? (car ',args)))
         (res (,hook ,src)))
     (if (not (comp res ,val))
         (throw (string-append "FAILURE with " (->string ',hook) ": "
                               (if (eq? (car ',src) 'quote)
                                   (->string ',(car (cdr src)))
                                   (->string ',src))
                               " got "
                               (->string res)
                               " but expected "
                               (->string ,val))))))


(define-macro (test-read src val . args)
  `(%test read ,src ,val ,@args))

(define-macro (test-eval src val . args)
  `(%test eval_outlet ',src ,val ,@args))

;; integers
(test-read "4.0" 4)
(test-read "4.0" 4)
;;(test-read "-5.5" 5)

;; strings
(test-read "\"foo\"" "foo")
(test-read "\"bar\\\"buz\"" "bar\"buz")
(test-read "\"bar\\nbuz\"" "bar\nbuz")
(test-eval "bar\nbuz" "bar
buz")

;; booleans
;; (test-read "#t" #t)
;; (test-read "#f" #f)
;; (test-eval #t (not #f))
;; (test-eval #f (not #t))
;; (test-eval #f (and #t #f))

;; symbols
(test-read "foo" 'foo)
(test-read "bar-buz?!" 'bar-buz?!)
(test-eval 'foo 'foo)

;; lists
(test-read "(1 2 3 4)" '(1 2 3 4))
(test-read "(foo 2 3 4)" '(foo 2 3 4))

(define four 4)
(test-eval '(1 2 "three" four) (list 1 2 "three" 'four))
(test-eval (list 1 2 3 four) (list 1 2 3 4))

;; functions
(define (foo x y z) (+ x y z))
(test-eval (foo 1 2 3) 6)

(define (bar t) (* (foo 1 2 3) t))
(test-eval (bar 5) 30)

(test-eval ((lambda (x)
               (bar (+ x 2))) 5)
           42)

;; set!
(test-eval ((lambda (x)
               (set! x 10)
               (* x x)) 5)
           100)

;; if
(test-eval (if true 1 2) 1)
(test-eval (if false 1 2) 2)
(test-eval (if true
                (begin
                  (define a 5)
                  (* a 2)))
           10)

;; cond
(define x 3)
(test-eval (cond
             ((eq? x 0) 'zero)
             ((eq? x 1) 'one)
             ((eq? x 2) 'two)
             ((eq? x 3) 'three))
           'three)

(test-eval (cond
            ((eq? x 0) 'zero)
            ((eq? x 1) 'one)
            ((eq? x 2) 'two)
            (else 'none))
           'none)

