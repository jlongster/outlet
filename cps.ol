
(define (atom? exp)
  (or (number? exp)
      (string? exp)
      (boolean? exp)
      (null? exp)
      (symbol? exp)))

(define (cps-quote data)
  (lambda (k)
    (k `(quote ,data))))

(define (cps-set! var form)
  (lambda (k)
    ((cps form)
     (lambda (a)
       `(begin
          (set! ,var ,a)
          ,(k ''void))))))

(define (cps-define var/func body)
  (if (list? var/func)
      (lambda (k)
        ((cps `(lambda ,(cdr var/func) ,@body))
         (lambda (a)
           `(begin
              (define ,(car var/func) ,a)
              ,(k ''void)))))
      (lambda (k)
        ((cps (car body))
         (lambda (a)
           `(begin
              (define ,var/func ,a)
              ,(k ''void)))))))

(define (cps-if bool form1 form2)
  (lambda (k)
    ((cps bool)
     (lambda (b)
       `(if ,b
            ,((cps form1) k)
            ,(if (== form2 #f)
                 (k ''void)
                 ((cps form2) k)))))))

(define (cps-begin e)
  (if (list? e)
      (if (list? (cdr e))
          (let ((v (gensym)))
            (lambda (k)
              ((cps (car e))
               (lambda (a)
                 ;; force the order of evaluation so that set!'s
                 ;; happen appropriately by wrapping the next cps in a
                 ;; lambda
                 `((lambda (,v)
                     ,((cps-begin (cdr e))
                       (lambda (v) (k v))))
                   ,a)))))
          (cps (car e)))
      (cps '())))

(define (cps-application e)
  (lambda (k)
    (if (list-find primitives (car e))
        ((cps-terms (cdr e))
         (lambda (t)
           (k `(,(car e) ,@t))))
        ((cps-terms e)
         (lambda (t)
           (let ((d (gensym)))
             `(cps-jump (lambda () (,(car t) (lambda (,d) ,(k d)) ,@(cdr t))))))))))

(define (cps-terms e)
  (if (list? e)
      (lambda (k)
        ((cps (car e))
         (lambda (a)
           ((cps-terms (cdr e))
            (lambda (as)
              (k (cons a as)))))))
      (lambda (k) (k '()))))

(define (cps-abstraction vars body)
  (lambda (k)
    (k (let ((c (gensym)))
         `(lambda (,c ,@vars)
            ,((cps (cons 'begin body))
              (lambda (a) `(cps-jump (lambda () (,c ,a))))))))))

;; (define (cps-call/cc catcher)
;;   (lambda (k)
;;     (let ((c (k )))
;;       )
    
;;     (let ((c (car (cadr catcher)))
;;           (body (cddr catcher)))
;;       `(lambda (,c)
;;          ,((cps 'begin body)
;;            (lambda (a) `(cps-jump (lambda () (k r)))))
;;          ))))

(define primitives
  '(and or
    + - * / % > < <= >= >> <<
    bitwise-or bitwise-and
    type
    number?
    string?
    symbol?
    key?
    boolean?
    null?
    list?
    vector?
    dict?
    function?
    literal?
    str
    symbol->key
    key->symbol
    string->key
    key->string
    string->symbol
    symbol->string
    _emptylst
    list
    cons
    car
    cdr
    cadr
    cddr
    cdar
    caddr
    cdddr
    cadar
    cddar
    caadr
    cdadr
    list-ref
    length
    list-append
    _list-append
    list-find
    map
    for-each
    fold
    reverse
    vector->list
    make-vector
    vector
    vector-ref
    vector-put!
    vector-concat
    vector-slice
    vector-push!
    vector-find
    vector-length
    list->vector
    vector-map
    vector-for-each
    vector-fold
    dict
    dict-put!
    dict-ref
    dict-map
    dict-merge
    dict->vector
    dict->list
    keys
    vals
    zip
    not
    ==
    =
    eq?
    equal?
    print
    println
    pp
    %inspect-non-sequence
    %recur-protect
    %space
    inspect
    apply
    trampoline-result?
    trampoline
    %gensym-base
    gensym-fresh
    gensym
    cps-trampoline
    cps-jump
    cps-halt

    RegExp
    s.match
    fs.readFileSync
    throw
    parseInt
    parseFloat))

(define (cps e)
  (if (or (atom? e)
          (dict? e)
          (vector? e))
      (lambda (k) (k e))
      (case (car e)
        ((require) (lambda (k) `(begin ,e ,(k ''void))))
        ((throw) (lambda (k) `(begin ,e ,(k ''void))))
        ((quote) (cps-quote (cadr e)))
        ;;((call/cc (cps-call/cc (cadr e))))
        ((if) (cps-if (cadr e)
                      (caddr e)
                      (if (null? (cdddr e))
                          #f
                          (car (cdddr e)))))
        ((begin) (cps-begin (cdr e)))
        ((set!) (cps-set! (cadr e) (caddr e)))
        ((define) (cps-define (cadr e) (cddr e)))
        ((lambda) (cps-abstraction (cadr e) (cddr e)))
        (else (cps-application e)))))

(set! module.exports {:cps cps})
