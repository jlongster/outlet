(require (vm "./vm"))

(define width 400)
(define height 400)

(define ctx #f)

(define (render-clear)
  (set! ctx.fillStyle "black")
  (ctx.fillRect 0 0 width height))

(define (render-box color x y width height)
  (set! ctx.fillStyle color)
  (ctx.fillRect x y width height))

(define profile-start 0)
(define profile-avg 0)
(define profile-count 0)

(define (timer-start)
  (define d (%raw "new Date()"))
  (set! profile-start (d.getTime)))

(define (timer-end)
  (define d (%raw "new Date()"))
  (define t (- (d.getTime) profile-start))

  (set! profile-count (+ profile-count 1))
  (set! profile-avg (/ (+ (* profile-avg (- profile-count 1)) t)
                       profile-count))

  (console.log "timer:" t "avg:" profile-avg))

(document.addEventListener
 "DOMContentLoaded"
 (lambda ()
   (let ((canvas (document.getElementById "canvas")))
     (set! canvas.width width)
     (set! canvas.height height)
     (set! ctx (canvas.getContext "2d")))

   (vm.install-primitives {:render-clear render-clear
                           :render-box render-box
                           :rand Math.random
                           :timer-start timer-start
                           :timer-end timer-end})
   ;;(vm.stepping-mode)
   (vm.run
    '(begin
       (define (rand-int)
         (* (rand) 150))
       
       (define (render-rand x y width height)
         (break)
         (render-box "green" x y width height))

       (define (render-n n i)
         ;;(break)
         (if (< i n)
             (begin
               (render-rand (rand-int)
                            (rand-int)
                            (rand-int)
                            (rand-int))
               (render-n n (+ i 1)))))

       (define (render)
         ;;(timer-start)
         (render-clear)
         (render-n 50 0)
         ;;(timer-end)

         (next)
         (render))
       (render)))))
