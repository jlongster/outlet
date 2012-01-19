(require (ast "./ast"))

(define (grammar all any capture char not-char optional Y eof terminator before after)
  (define (repeated rule)
    (Y (lambda (seq)
         (any (all rule seq) rule))))

  (define space-char " \t\n\r")
  (define space (repeated (char space-char)))

  (define comment (all (optional space)
                       (char ";")
                       (repeated (not-char "\n"))
                       space))

  (define number
    (capture (all (optional (char "-"))
                  (repeated (char "1234567890")))
             (lambda (text state)
               (ast.node ast.NUMBER text))))

  (define string
    (let ((capt
           (lambda (rule)
             (capture rule
                      (lambda (buf state) (+ state buf)))))
          (capt_special
           (lambda (rule char)
             (capture rule
                      (lambda (str state)
                        (+ state char)))))
          (capt_node
           (lambda (rule)
             (capture rule
                      (lambda (str state)
                        (ast.node ast.STRING state)))))
          (init
           (lambda (rule)
             (before rule (lambda (state) "")))))
      
      (define content
        (any (capt_special (all (char "\\") (char "n")) "\n")
             (all (char "\\") (capt (not-char "")))
             (capt (not-char "\""))))
      
      (init (all (char "\"")
                 (capt_node (optional (repeated content)))
                 (char "\"")))))
  
  (define term
    (capture (repeated (any (not-char (+ "()'" space-char))))
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
            (ast.node ast.LIST null (list q node)))))
      
      (Y (lambda (q)
           (capture (all (any (char "'")
                              (char "`")
                              (all (char ",") (char "@"))
                              (char ","))
                         (any q rule))
                    capt))))
 
    (let ((rule (any lst number string term)))
      (any (quoting rule)
           rule)))

  (define lst
    (Y (lambda (lst)
         (before
          (all (char "(")
               (optional
                (repeated
                 (any space
                      comment
                      (after (elements lst)
                             (lambda (parent child)
                               (ast.add_child parent child))))))
               (char ")"))
          (lambda (state)
            (ast.node ast.LIST))))))

  (repeated
   (any space
        comment
        (after (elements lst)
               (lambda (root child)
                 (ast.node ast.ROOT
                           null
                           (root.children.concat (list child))))))))

(set! module.exports grammar)
