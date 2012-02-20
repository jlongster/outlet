
(define (type obj)
  )

(define (number? obj)
  (eq? (type obj) 'number))

(define _gensym 0)
(define (gensym)
  (set! _gensym (+ _gensym 1))
  (string->symbol (+ "o" _gensym)))
