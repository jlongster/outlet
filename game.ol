
(define first-run #t)
(define subsystems '())

(define (add-system system)
  (set! subsystems (cons system subsystems)))

(define (init)
  (for-each (lambda (sys)
              (system-init sys))
            subsystems))

(define (update)
  (for-each (lambda (sys)
              (system-update sys))
            subsystems))

(define (heartbeat)
  (if first_run
      (begin
        (init)
        (set! first-run #f)))

  (update)
  (prerender)
  (render)
  (postrender)

  (request-animation-frame heartbeat))

