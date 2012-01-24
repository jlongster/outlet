(require (ast "./ast"))

(define (grammar all any capture char not-char optional Y eof terminator before after)
  (define (repeated rule)
    (Y (lambda (seq)
         (any (all rule seq) rule))))

  (define space-char " \n\t\r")
  (define space (repeated (char space-char)))

  (define comment (all (optional space)
                       (char ";")
                       (repeated (not-char "\n"))
                       space))

  (define number
    (capture (all (optional (char "-"))
                  (repeated (char "1234567890"))
                  (optional (all (char ".")
                                 (repeated (char "1234567890")))))
             (lambda (text state)
               (ast.node ast.NUMBER text))))

  (define boolean
    (capture (any (all (char "#") (char "f"))
                  (all (char "#") (char "t")))
             (lambda (text state)
               (ast.node ast.BOOLEAN (if (equal? text "#f")
                                         false
                                         true)))))
  
  (define string
    (let ((capt
           (lambda (rule)
             (capture rule
                      (lambda (buf state) (+ state buf)))))
          (capt_node
           (lambda (rule)
             (capture rule
                      (lambda (str state)
                        (ast.node ast.STRING state)))))
          (capt_special
           (lambda (rule)
             (capture rule
                      (lambda (str state)
                        (+ state
                           (cond
                            ((equal? str "\\n") "\n")
                            ((equal? str "\\t") "\t")
                            ((equal? str "\\r") "\r")
                            (else (str.charAt 1))))))))
          (init
           (lambda (rule)
             (before rule (lambda (state) "")))))
      
      (define content
        (any (capt_special (all (char "\\") (not-char "")))
             (capt (not-char "\""))))
      
      (init (all (char "\"")
                 (capt_node (optional (repeated content)))
                 (char "\"")))))
  
  (define term
    (capture (repeated (any (not-char (+ "()[]'" space-char))))
             (lambda (buf s)
               (ast.node ast.TERM (make-symbol buf)))))

  (define (elements lst)
    (define (quoting rule)
      (define (capt buf node)
        (let ((special
               (cond
                ((equal? (buf.substring 0 2) ",@") "unquote-splicing")
                ((equal? (buf.charAt 0) ",") "unquote")
                ((equal? (buf.charAt 0) "'") "quote")
                ((equal? (buf.charAt 0) "`") "quasiquote"))))
          (let ((q (ast.node ast.TERM (make-symbol special))))
            (ast.node ast.LIST null (vector q node)))))
      
      (Y (lambda (q)
           (capture (all (any (char "'")
                              (char "`")
                              (all (char ",") (char "@"))
                              (char ","))
                         (any q rule))
                    capt))))
 
    (let ((rule (any lst number string boolean term)))
      (any (quoting rule)
           rule)))

  (define lst
    (Y (lambda (lst)
         (all (any (before (char "(")
                           (lambda (state)
                             (ast.node ast.LIST)))
                   (before (char "[")
                           (lambda (state)
                             (ast.node ast.VECTOR))))
              (optional
               (repeated
                (any space
                     comment
                     (after (elements lst)
                            (lambda (parent child)
                              (ast.add_child parent child))))))
              (any (char ")") (char "]"))))))

  (repeated
   (any space
        comment
        (after (elements lst)
               (lambda (root child)
                 (ast.node ast.ROOT
                           null
                           (root.children.concat (vector child))))))))

;; (define (grammar all any capture char not-char optional Y eof terminator before after)
;;   (define (repeated rule)
;;     (Y (lambda (seq)
;;          (any (all rule seq) rule))))

;;   (capture (repeated (any (not-char "()' \t\n\r")))
;;              (lambda (buf s)
;;                (ast.node ast.TERM (make-symbol buf)))))


(set! module.exports grammar)
