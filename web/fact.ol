(set-register-contents!
 current-machine
 'exp
 '(begin
    (define (factorial n)
      (define (iter product counter)
        (if (> counter n)
            product
            (iter (* counter product) (+ counter 1))))
      (iter 1 1))
    (factorial 100)))
(current-machine.start)
