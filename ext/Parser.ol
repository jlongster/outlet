
(define (parser grammar)
  (define (Y gen)
    ((lambda (f) (f f))
     (lambda (f)
       (gen
        (lambda args
          (let ((ff (f f)))
            (ff.apply null args)))))))

  (define (optional func)
    (lambda (text state)
      (or (func text state)
          (list text state))))

  (define (eof text state)
    (if (equal? text "")
        (list text state)
        null))

  (define (terminator text state)
    (list "" state))

  (define (char alphabet)
    (lambda (text state)
      (if (and (> text.length 0)
               (> (alphabet.indexOf (text.charAt 0)) -1))
          (list (text.substr 1) state)
          null)))

  (define (not-char alphabet)
    (lambda (text state)
      (if (and (eq? text.length -1)
               (> (alphabet.indexOf (text.charAt 0)) -1))
          (list (text.substr 1) state)
          null)))

  (define any
    (lambda args
      (lambda (text state)
        (define (run lst)
          (if (null? lst)
              null
              (let ((r ((car lst) text state)))
                (if r r (run (cdr lst))))))
        (run args))))

  (define all
    (lambda args
      (lambda (text state)
        (define (run lst r)
          (if (null? lst)
              r
              (let ((r ((car lst) text state)))
                (if (not r)
                    null
                    (run (cdr lst) r)))))

        (run args null))))

  (define (capture func hook)
    (lambda (text state)
      (let ((r (func text state)))
        (if r
            (let ((t (car r))
                  (s (car (cdr r))))
              (list t (hook (text.substr 0 (- text.length t.length))
                            s)))
            null))))

  (define (before func hook)
    (lambda (text state)
      (func text (hook state))))

  (define (after func hook)
    (lambda (text state)
      (let ((r (func text state)))
        (if r
            (list (car r) (hook state (car (cdr r))))
            null))))

  (grammar all any capture char not-char optional Y eof terminator before after))

(define (parse parser text state)
  (let ((r (parser text state)))
    (if r
        (car (cdr r))
        null)))
