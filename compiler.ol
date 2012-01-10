
(require (reader "./ext/Parser")
         (util "util")
         (ast "./ast")
         (grammar "./grammar"))

;; util

(define (assert v msg)
  (if (not v)
      (throw msg)))

(define (assert_type node type msg)
  (assert (= (node-type node) type)
          (string-append "invalid type, expected "
                         type
                         ": "
                         (inspect node))))

;; main functions

(define (read src)
  (reader grammar src))

(define (parse node generator)
  (let ((parser (vector-ref parsers (node-type node))))
    (assert parser (string-append "No parser for node type:"
                                  (node-type node)))
    (parser node
            (lambda (node) (parse node generator))
            generator)))

