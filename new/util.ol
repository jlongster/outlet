(define (symbol->term sym)
  {:str sym.str
   :term #t})

(define (term->symbol term)
  {:str term.str
   :symbol #t})

(define (term? sym)
  sym.term)

(set! module.exports {:symbol->term symbol->term
                      :term? term?})
