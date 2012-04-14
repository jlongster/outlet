;; tests core functions and semantics

(define-macro (%test hook src val . args)
  `(let ((comp ,(if (null? args) '= (car args)))
         (res (,hook ,src)))
     (if (not (comp res ,val))
         (throw (str "FAILURE with " (inspect ',hook) ": "
                     (util.inspect ,src)
                     " got "
                     (util.inspect res)
                     " but expected "
                     (util.inspect ,val))))))

(define-macro (test-read src val . args)
  `(%test read ,src ,val ,@args))

(define-macro (test-eval src val . args)
  `(%test eval ',src ,val ,@args))

(define-macro (test-assert src)
  `(%test eval ',src #t (lambda (res val)
                          (not (eq? res #f)))))


;; functions

(define (foo x y z) (+ x y z))
(test-eval (foo 1 2 3) 6)

(define (bar t) (* (foo 1 2 3) t))
(test-eval (bar 5.123) 30.738)

(test-eval ((lambda (x)
               (bar (+ x 2))) 5)
           42)

(define foo (lambda (x y z) (+ x y z)))
(test-eval (foo 1 2 3) 6)

;; strings

(test-eval (str "one" "two") "onetwo")
(test-eval (str "one" 2 'three #f) "one2three#f")
(test-eval (str '(1 2 3) "one" ) "(1 2 3)one")
(test-eval (str [1 2 3] "one" ) "[1 2 3]one")

(test-eval (string->symbol "foo") 'foo)
(test-eval (string->symbol "foo-?!><%=") 'foo-?!><%=)
(test-eval (symbol->string 'bar) "bar")
(test-eval (symbol->string 'bar-?!><%=) "bar-?!><%=")

;; set!

(test-eval ((lambda (x)
               (set! x 10)
               (* x x)) 5)
           100)

;; math

(test-eval (+ 1 2) 3)
(test-eval (- 1 2) -1)
(test-eval (* 3 4) 12)
(test-eval (/ 10 4) 2.5)
(test-eval (% 12 10) 2)
(test-eval (< 1 2) #t)
(test-eval (< 5 4) #f)
(test-eval (> 2 1) #t)
(test-eval (> 4 5) #f)

;; lists

(test-eval (list 1 2 3) '(1 2 3))

(test-eval (cons 1 '()) (list 1))
(test-eval (car (cons 2 (cons 3 '()))) 2)
(test-eval (cdr (cons 2 (cons 3 '()))) '(3))

(define foo '((1 2 3) (4 5 6) (7 8 9) 10))
(test-eval (cadr foo) '(4 5 6))
(test-eval (cddr foo) '((7 8 9) 10))
(test-eval (cdar foo) '(2 3))
(test-eval (caddr foo) '(7 8 9))
(test-eval (cdddr foo) '(10))
(test-eval (cadar foo) 2)
(test-eval (cddar foo) '(3))
(test-eval (caadr foo) 4)
(test-eval (cdadr foo) '(5 6))

(test-eval (list-ref '(x y z) 2) 'z)
(test-eval (length '(x y z)) 3)
(test-eval (list-append '(1 2) '(3 4)) '(1 2 3 4))
(test-eval (list-find '(x y z) 'z) '(z))
(test-eval (list-find '(x y z) 'w) #f)
(test-eval (list-find '((1 2) (3 4)) '(3 4)) #f)
(test-eval (list-find '((1 2) (3 4)) 4 cadr) '((3 4)))
(test-eval (reverse '(x y z)) '(z y x))
(test-eval (vector->list [1 2 3]) '(1 2 3))
(test-eval (vector->list [1 2 [1 2]]) '(1 2 [1 2]))

(test-eval (map (lambda (el) (+ el 1)) '(1 2 3)) '(2 3 4))
(test-eval (fold (lambda (el acc) (+ el acc)) 0
                 '(5 6 7))
           18)

(define last #f)
(for-each (lambda (el)
            (set! last el))
          '(one two three))
(test-eval last 'three)

(define foo (lambda args args))
(test-eval (foo 1 2 3) '(1 2 3))

;; vectors

(test-eval (make-vector 5 1) [1 1 1 1 1])
(test-eval (vector 1 'one "one" {:one 1}) [1 'one "one" {:one 1}])
(test-eval (vector-ref [1 'one "one"] 2) "one")

(define vec [1 2 3 4])
(vector-put! vec 3 3)
(test-eval vec [1 2 3 3])

(test-eval (vector-concat [1 2] [3 4]) [1 2 3 4])
(test-eval (vector-slice [1 2 3 4] 1) [2 3 4])
(test-eval (vector-slice [1 2 3 4] 1 2) [2 3])

(define vec [1 2 3 4])
(vector-push! vec 5)
(test-eval vec [1 2 3 4 5])

(test-eval (vector-find '[x y z] 'z) 2)
(test-eval (vector-length [1 2 3]) 3)
(test-eval (list->vector '(1 2 3)) [1 2 3])
(test-eval (vector-map (lambda (el) (+ el 1)) [1 2 3 4]) [2 3 4 5])
(test-eval (vector-fold (lambda (el acc) (+ el acc)) 0
                        [1 2 3])
           6)

(define last #f)
(vector-for-each (lambda (el)
                   (set! last el))
                 [4 5 6])
(test-eval last 6)

;; dicts

(test-eval (dict :one 1 :two 2) {:one 1 :two 2})
(test-eval (dict-ref {:one 1 :two 2} :one) 1)

(define dct {:foo "bar" :baz "bizz"})
(dict-put! dct :mumble "nimble")
(test-eval dct {:foo "bar" :baz "bizz" :mumble "nimble"})
(test-eval (dict-map (lambda (el) (+ el 1))
                     {:foo 1 :bar 2})
           {:foo 2 :bar 3})

(test-eval (dict-merge {:one 1 :two 2} {:three 3 :four 4})
           {:one 1 :two 2 :three 3 :four 4})

(test-assert (let ((vec (dict->vector {:one 1 :two 2})))
               ;; can't guarantee order
               (and (vector-find vec 'one)
                    (vector-find vec 1)
                    (vector-find vec 'two)
                    (vector-find vec 2))))

(test-assert (let ((lst (dict->list {:one 1 :two 2})))
               ;; can't guarantee order
               (and (list-find lst 'one)
                    (list-find lst 1)
                    (list-find lst 'two)
                    (list-find lst 2))))

(let ((k (keys {:foo 1 :bar 2})))
  (test-assert (list-find k 'foo))
  (test-assert (list-find k 'bar)))

(let ((v (vals {:foo 1 :bar 2})))
  (test-assert (list-find v 1))
  (test-assert (list-find v 2)))

(let ((dct (zip '(foo bar baz) '(1 2 3))))
  (test-eval (dict-ref dct 'foo) 1)
  (test-eval (dict-ref dct 'bar) 2))

;; not

(test-eval (not #f) #t)
(test-eval (not 0) #f)
(test-eval (not "foo") #f)

;; equality

(test-assert (== 3 3))
(test-assert (= 3 3))
(test-assert (== "foo" "foo"))
(test-assert (= "foo" "foo"))
(test-assert (== #t #t))
(test-assert (= #t #t))
(test-assert (== 'foo 'foo))
(test-assert (= 'foo 'foo))
(test-assert (== '() '()))
(test-assert (= '() '()))

(define foo '(1 2 3))
(test-assert (== foo foo))
(test-eval (== '(1 2 3) '(1 2 3)) #f)
(test-assert (= '(1 2 3) '(1 2 3)))

(define foo [1 2 3])
(test-assert (== foo foo))
(test-eval (== [1 2 3] [1 2 3]) #f)
(test-assert (= [1 2 3] [1 2 3]))

(define foo {:one 1})
(test-assert (== foo foo))
(test-eval (== {:one 1} {:one 1}) #f)
(test-assert (= {:one 1} {:one 1}))

;; ;; types

(define-macro (ensure-type val truthy)
  (cons 'begin
        (map (lambda (func)
               `(test-eval (,func ,val)
                           ,(eq? func truthy)))
             '(boolean?
               number?
               symbol?
               string?
               list?
               vector?
               dict?))))

(ensure-type 5 number?)
(ensure-type #t boolean?)
(ensure-type 'foo symbol?)
(ensure-type "foo" string?)
(ensure-type '(1 2 3) list?)
(ensure-type [1 2 3] vector?)
(ensure-type {:one 1} dict?)

;; if

(test-eval (if #t 1 2) 1)
(test-eval (if #f 1 2) 2)
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

;; misc

;; test code following an `if`
(define (func)
  (if #t "yes" "no")
  (+ 1 2))
(test-eval (func) 3)

;; test set! as last expression
(define (faz)
  (let ((x 1))
    (+ 2 3)
    (set! x 3)))
(test-eval (faz) undefined)

;; test define as last expression (this won't be valid in the future)
(define (buz)
  (+ 2 3)
  (define a 4))
(test-eval (buz) undefined)

;; test a few edge cases
(test-eval (not (list? 0)) #t)

;; let

;; vars should be able to reference each other within a let
(let ((x 0)
      (y (+ x 1)))
  (test-eval y 1))

;; functions can reference vars too and order matters
(define foo 5)
(let ((baz foo)
      (bar (lambda () (* baz 5))))
  (test-eval (bar) 25))

;; vars can also reference themselves
(define foo 5)
(let ((foo foo)
      (bar (+ foo 1)))
  (test-eval foo 5)
  (test-eval bar 6)
  (set! foo 6)
  (test-eval foo 6))
(test-eval foo 5)
