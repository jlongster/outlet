(define foo 5)

(define (bar x)
  (+ x 1))

(define (buz x)
  (let ((y x)
        (add_1 (if (< x 0)
                   (lambda (n) (- n 1))
                   (lambda (n) (+ n 1)))))
    (add_1 y)))

(define (fib n)
  (if (= n 0)
      n
      (+ n (fib (- n 1)))))

(define (Y func)
  ((lambda (f) (f f))
   (lambda (f)
     (func f))))

(for-each
 (lambda (x) (print x))
 '(1 2 3 4))

(define (print-n n)
  (cond
   ((> n 0) (display "positive"))
   ((< n 0) (display "negative"))
   ((= n 0) (display "0"))
   (else (display "wait, what?"))))

;; macros

(define-macro (helper form)
  `(,(car form) (< ,(car (cdr form)) 5)
       (+ ,(car (cdr form))
          ,(car (cdr (cdr form))))))

(define (bar n)
  (pp n))

(define (foo)
  (helper (if 1 2)))

;; ->
;; var bar = function(n){
;; return pp(n);}
;;
;; var foo = function(){
;; return (function() {if((1<5)) { return (1+2)}})()
;; }

;; rest parameters

(define (baz one two . three)
  (pp three))

(baz "a" "b" "c" "d" "e" "f")

;; ->
;; var baz = function(one,two){
;; var three = Array.prototype.slice.call(arguments, 2);
;; return pp(three);}
;;
;; baz("a","b","c","d"); -> ["c", "d"]

(define-macro (begin . body)
  `((lambda () ,@body)))

(define (hello)
  (if (> 1 2)
      (pp "hello")
      (begin
        (pp "something")
        (pp "is")
        (pp "working"))))
