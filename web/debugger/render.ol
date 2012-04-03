
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

(document.addEventListener
 "DOMContentLoaded"
 (lambda ()
   (let ((canvas (document.getElementById "canvas")))
     (set! canvas.width width)
     (set! canvas.height height)
     (set! ctx (canvas.getContext "2d")))

   (vm.install-primitives {:render-clear render-clear
                           :render-box render-box
                           :rand Math.random})
   ;;(vm.stepping-mode)
   (vm.run
    '(begin
       (define (render)
         (define (rand-int)
           (* (rand) 150))
         
         (define (render-rand x y width height)
           (render-box "green" x y width height))

         (define (render-n n i)
           (break)
           (if (< i n)
               (begin
                 (render-rand (rand-int)
                              (rand-int)
                              (rand-int)
                              (rand-int))
                 (render-n n (+ i 1)))))
         
         (render-clear)
         (render-n 50 0)

         (next)
         (render))
       (render)))))
