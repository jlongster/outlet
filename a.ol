
(let ((x 5)
      (y (+ x 1))
      (z (lambda () (foo x y))))
  (+ x y (z)))

