;; extra

;; (install-expander 'trace-applications
;;                   (lambda (x e)
;;                     (let ((e1 (lambda (x e2)
;;                                 (if (application? x)
;;                                     `(trace-form ',x
;;                                                  (lambda ()
;;                                                    ,(map (lambda (x) (e2 x e2)) x)))
;;                                     (e x e2)))))
;;                       (e1 (cadr x) e1))))
