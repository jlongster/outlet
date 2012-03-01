;; Tests for the runtime

(define-macro (%test hook src val . args)
  `(let ((comp ,(if (null? args) '= (car args)))
         (res (,hook ,src)))
     (if (not (comp res ,val))
         (throw (str "FAILURE with " (inspect ',hook) ": "
                     (inspect ,src)
                     " got "
                     (inspect res)
                     " but expected "
                     (inspect ,val))))))


(define-macro (test-read src val . args)
  `(%test read ,src ,val ,@args))

(define-macro (test-eval src val . args)
  `(%test eval ',src ,val ,@args))

(define-macro (test-assert src)
  `(%test eval ',src #t (lambda (res val)
                          (not (eq? res #f)))))

;; strings

(test-eval (str "one" "two") "onetwo")
(test-eval (str "one" 2 'three #f) "one2three#f")
(test-eval (str '(1 2 3) "one" ) "(1 2 3)one")
(test-eval (str [1 2 3] "one" ) "[1 2 3]one")

(test-eval (string->symbol "foo") 'foo)
(test-eval (string->symbol "foo-?!><%=") 'foo-?!><%=)
(test-eval (symbol->string 'bar) "bar")
(test-eval (symbol->string 'bar-?!><%=) "bar-?!><%=")

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
(test-eval (reverse '(x y z)) '(z y x))
(test-eval (vector->list [1 2 3]) '(1 2 3))
(test-eval (vector->list [1 2 [1 2]]) '(1 2 [1 2]))

(test-eval (map (lambda (el) (+ el 1))'(1 2 3)) '(2 3 4))
(test-eval (fold (lambda (el acc) (+ el acc)) 0
                 '(5 6 7))
           18)

(define last #f)
(for-each (lambda (el)
            (set! last el))
          '(one two three))
(test-eval last 'three)

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

;; types

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
