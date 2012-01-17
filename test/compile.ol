
;; integers
(test-eval "3" 3)
(test-eval "4.0" 4.0)
(test-eval "-5.5" 5.5)

;; strings
(test-eval "foo" "foo")
(test-eval "bar\"buz" (string-append "bar" "\"" "buz"))
(test-eval "bar\tbuz" "bar	buz")

;; booleans
(test-eval #t #t)
(test-eval #t (not #f))
(test-eval #f (not #t))
(test-eval #f (and #t #f))

;; symbols
(test-eval 'foo 'foo)
(test-eval 'bar-buz?! 'bar-buz?!)

;; lists
(define four 4)
(test-eval '(1 2 "three" four) (list 1 2 "three" 'four))
(test-eval (list 1 2 four) (list 1 2 4))

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
