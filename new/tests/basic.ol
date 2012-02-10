;; These tests hit only the basic forms in Outlet and don't use any
;; macros, which is useful is something fundamental is broken and hard
;; to debug in the context of macros.
;;
;; Any basic forms like `let`, `cond`, and `begin` are avoided since
;; they are implemented as macros.

(define (test-read src expected)
  (if (not (equal? (read src) expected))
      (throw (string-append "FAILURE: got "
                            (->string (read src))
                            " but expected "
                            (->string expected)))))

(define (test-eval val expected)
  (if (not (equal? val expected))
      (throw (string-append "FAILURE: got "
                            (->string val)
                            " but expected "
                            (->string expected)))))


;; integers
(test-read "4.0" 4)
(test-read "4.0" 4)
(test-read "-5.5" -5.5)

;; strings
(test-read "\"foo\"" "foo")
(test-read "\"bar\\\"buz\"" "bar\"buz")
(test-read "\"bar\\nbuz\"" "bar\nbuz")
(test-eval "bar\nbuz" "bar
buz")

;; booleans
(test-read "#t" #t)
(test-read "#f" #f)
(test-eval (not #t) #f)
(test-eval (not #f) #t)
(test-eval (and #f #t) #f)
;; (test-eval (or #f #t) #t)

;; symbols
(test-read "foo" 'foo)
(test-read "bar-buz?!" 'bar-buz?!)
(test-eval 'foo 'foo)
;; (test-eval :key 'key)
;; (test-eval :key-word 'key-word)

;; lists
(define foo 4)
(test-read "(1 2 3 4)" '(1 2 3 4))
(test-read "(foo 2 3 4)" '(foo 2 3 4))
(test-eval (list 1 2 3 foo) (list 1 2 3 4))

;; vectors
;; (define foo 4)
;; (test-read "[1 2 3]" '[1 2 3])
;; (test-eval [1 2 3] (vector 1 2 3))
;; (test-eval [1 2 3 foo] (vector 1 2 3 4))
;; (test-eval (vector 1 2 3 foo) (vector 1 2 3 4))

;; maps
;; (define foo 4)
;; (define bar {:one 1 :two 2})
;; (test-read "{:biz foo :bazzle bar}" (hash-map :biz 'foo :bazzle 'bar))
;; (test-eval {:five 5 :six 6} (hash-map :five 5 :six 6))
;; (test-eval '{:foo foo :bar bar} {:foo 'foo :bar 'bar})
;; (test-eval {:foo foo} {:foo 4})
;; (test-eval `{:three 3 ,@bar} {:one 1 :two 2 :three 3})

;; quoting/splicing for lists and vectors
(define foo 4)
(define foo-lst '(4 5))
;;(define foo-vec [4 5])
(test-eval '3 3)
(test-eval `3 3)
(test-eval '(1 2 3) (list 1 2 3))
(test-eval `(1 2 3 ,4) (list 1 2 3 4))
(test-eval `(1 2 3 ,foo) '(1 2 3 4))
(test-eval '(1 2 3 foo) (list 1 2 3 'foo))
(test-eval `(1 2 3 foo) '(1 2 3 foo))
(test-eval `(1 2 3 ,@'(4 5)) '(1 2 3 4 5))
(test-eval `(1 2 3 ,@foo-lst) '(1 2 3 4 5))

;; (test-eval '[1 2 3] (vector 1 2 3))
;; (test-eval `[1 2 3 ,4] (vector 1 2 3 4))
;; (test-eval `[1 2 3 ,foo] (vector 1 2 3 4))
;; (test-eval `[1 2 3 foo] (vector 1 2 3 'foo))
;; (test-eval '[1 2 3 foo] (vector 1 2 3 'foo))
;; (test-eval `[1 2 3 ,@[4 5]] (vector 1 2 3 4 5))
;; (test-eval `[1 2 3 ,@foo-vec] (vector 1 2 3 4 5))


