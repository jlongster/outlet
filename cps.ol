
(define (atom? exp)
  (or (number? exp)
      (string? exp)
      (boolean? exp)
      (null? exp)
      (symbol? exp)))

;; cps

(define (cps-quote data)
  (lambda (k env)
    (k `(quote ,data) env)))

(define (cps-set! var form)
  (lambda (k env)
    ((cps form)
     (lambda (a env)
       (k `(set_variable ,env ,var ,a) env))
     env)))

(define (cps-define var/func body)
  (if (list? var/func)
      (lambda (k env)
        ((cps `(lambda ,(cdr var/func) ,@body))
         (lambda (a env)
           (k `(define_variable ,env ',(car var/func) ,a)
              env))
         env))
      (lambda (k env)
        ((cps (car body))
         (lambda (a env)
           (k `(define_variable ,env ',var/func ,a)
              env))
         env))))

(define (cps-if bool form1 form2)
  (lambda (k env)
    ((cps bool)
     (lambda (b env)
       `(if ,b
            ,((cps form1) k env)
            ,(if (== form2 #f)
                 (k ''void env)
                 ((cps form2) k env))))
     env)))

(define (cps-begin e)
  (if (list? e)
      (if (list? (cdr e))
          (let ((voidd (gensym)))
            (lambda (k env)
              ((cps (car e))
               (lambda (a env)
                 `((make-continuation
                    (lambda (,voidd)
                      ,((cps-begin (cdr e))
                        (lambda (b env) (k b env))
                        env)))
                   ,a))
               env)))
          (cps (car e)))
      (cps '())))

(define (cps-application e)
  (lambda (k env)
    (if (list-find primitives (car e))
        ((cps-terms (cdr e))
         (lambda (t env)
           (k `(,(car e) ,@t) env))
         env)
        ((cps-terms e)
         (lambda (t env)
           (let ((d (gensym)))
             `(,(car t)
               (make-continuation (lambda (,d) ,(k d env)))
               ,@(cdr t))))
         env))))

(define (cps-terms e)
  (if (list? e)
      (lambda (k env)
        ((cps (car e))
         (lambda (a env)
           ((cps-terms (cdr e))
            (lambda (as env)
              (k (cons a as) env))
            env))
         env))
      (lambda (k env) (k '() env))))

(define (cps-abstraction vars body)
  (lambda (k env)
    (k (let ((c (gensym))
             (env2 `(quote ,(gensym)))
             (args (gensym)))
         `(make-continuation
           ;; optimization: just capture args in arguments?
           (lambda (,c ,@vars)
             (extend_environment ,env2 ,env ',(list->vector vars) arguments)
             ,((cps (cons 'begin body))
               (lambda (a) `(,c ,a))
               env2))))
       env)))

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

(define (hoist exp)
  (define ks '())
  (define (append-ks! k)
    (let ((name (gensym)))
      (set! ks (cons [k name] ks))
      name))

  (define (%hoist exp)
    (if (or (atom? exp)
            (vector? exp)
            (dict? exp))
        exp
        (if (== (car exp) 'make-continuation)
            (append-ks! (%hoist (cadr exp)))
            (map %hoist exp))))

  (let ((res (%hoist exp)))
    `(begin
       ,@(map (lambda (k)
                `(define ,(vector-ref k 1) ,(vector-ref k 0)))
              ks)
       ,res)))

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
  (cond
   ((symbol? e)
    (lambda (k env)
      (if (list-find primitives e)
          (k e env)
          (k `(lookup_variable ,env ',e) env))))

   ((or (atom? e)
        (dict? e)
        (vector? e))
    (lambda (k env) (k e env)))

   (else
    (case (car e)
      ((require) (lambda (k env) `(begin ,e ,(k ''void env))))
      ((throw) (lambda (k env) `(begin ,e ,(k ''void env))))
      ((quote) (cps-quote (cadr e)))
      ((if) (cps-if (cadr e)
                    (caddr e)
                    (if (null? (cdddr e))
                        #f
                        (car (cdddr e)))))
      ((begin) (cps-begin (cdr e)))
      ((set!) (cps-set! (cadr e) (caddr e)))
      ((define) (cps-define (cadr e) (cddr e)))
      ((lambda) (cps-abstraction (cadr e) (cddr e)))
      (else (cps-application e))))))

(set! module.exports {:cps (lambda (src)
                             (hoist
                              ((cps src) cps-halt ''initial)))})

