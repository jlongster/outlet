
;; todo: convert all text and state structures to vectors instead of lists

(define (parser grammar)
  (define (Y gen)
    ((lambda (f) (f f))
     (lambda (f)
       (gen
        (lambda args
          (let ((ff (f f)))
            (ff.apply null (list->vector args))))))))

  (define (optional func)
    (lambda (text state)
      (or (func text state)
          (vector text state))))

  (define (eof text state)
    (if (equal? text "")
        (vector text state)
        null))

  (define (terminator text state)
    (vector "" state))

  (define (char alphabet)
    (lambda (text state)
      (if (and (> text.length 0)
               (> (alphabet.indexOf (text.charAt 0)) -1))
          (vector (text.substr 1) state)
          null)))

  (define (not-char alphabet)
    (lambda (text state)
      (if (and (> text.length 0)
               (eq? (alphabet.indexOf (text.charAt 0)) -1))
          (vector (text.substr 1) state)
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
              (let ((r ((car lst) (vector-ref r 0) (vector-ref r 1))))
                (if (not r)
                    null
                    (run (cdr lst) r)))))

        (run args (vector text state)))))

  (define (capture func hook)
    (lambda (text state)
      (let ((r (func text state)))
        (if r
            (let ((t (vector-ref r 0))
                  (s (vector-ref r 1)))
              (vector t (hook (text.substr 0 (- text.length t.length))
                              s)))
            null))))

  (define (before func hook)
    (lambda (text state)
      (func text (hook state))))

  (define (after func hook)
    (lambda (text state)
      (let ((r (func text state)))
        (if r
            (vector (vector-ref r 0)
                    (hook state (vector-ref r 1)))
            null))))

  (grammar all any capture char not-char optional Y eof terminator before after))

(define (parse grammar text state)
  (let ((r ((parser grammar) text state)))
    (if r
        (vector-ref r 1)
        null)))

(set! module.exports parse)
