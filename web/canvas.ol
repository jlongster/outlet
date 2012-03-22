(set-register-contents!
 current-machine
 'exp
 '(begin
    (define (render)
      (define (rand-int)
        (* (rand) 150))
      
      (define (render-rand x y width height)
        (render-box "green" x y width height)
        (break))

      (render-clear)
      (render-box "blue" 300 300 50 50)
      (render-rand (rand-int) (rand-int) (rand-int) (rand-int))
      
      (next)
      (render))
    (render)))
(current-machine.start)
