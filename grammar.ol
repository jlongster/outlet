
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

  (define number-int/float
    (capture (all (optional (char "-"))
                  (repeated (char "1234567890"))
                  (optional (all (char ".")
                                 (repeated (char "1234567890")))))
             (lambda (text state)
               (parseFloat text))))
  
  (define number-hex
    (capture (all (char "0")
                  (char "x")
                  (repeated (char "1234567890abcdefABCDEF")))
             (lambda (text state)
               (parseInt (text.slice 2) 16))))

  (define number
    (any number-hex number-int/float))

  (define boolean
    (capture (any (all (char "#") (char "f"))
                  (all (char "#") (char "t")))
             (lambda (text state)
               (if (equal? text "#f")
                   false
                   true))))
  
  (define string
    (let ((capt
           (lambda (rule)
             (capture rule
                      (lambda (buf state) (+ state buf)))))
          (capt_node
           (lambda (rule)
             (capture rule
                      (lambda (str state) state))))
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

  (define raw_term
    (capture (repeated (any (not-char (+ "{}()[]'" space-char))))
             (lambda (buf s)
               (string->symbol buf))))
 
  (define raw_keyword
    (capture (all (char ":") raw_term)
             (lambda (buf node)
               (list 'quote node))))

  (define term
    (any raw_keyword raw_term))

  (define (elements lst)
    (define (quoting rule)
      (define (capt buf node)
        (let ((special
               (cond
                ((equal? (buf.substring 0 2) ",@") "unquote-splicing")
                ((equal? (buf.charAt 0) ",") "unquote")
                ((equal? (buf.charAt 0) "'") "quote")
                ((equal? (buf.charAt 0) "`") "quasiquote"))))
          (list (string->symbol special) node)))
      
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
         (all (any (before (char "{")
                           (lambda (state)
                             []))
                   (before (char "(")
                           (lambda (state)
                             []))
                   (before (char "[")
                           (lambda (state)
                             [])))
              (optional
               (repeated
                (any space
                     comment
                     (after (elements lst)
                            (lambda (parent child)
                              (vector-concat parent [child]))))))
              (any (after (char "}")
                           (lambda (state _)
                             (let ((i 0))
                               (dict.apply
                                null
                                (vector-map
                                 (lambda (el)
                                   ;; unquote the keys. this is bad
                                   ;; because the reader is now
                                   ;; parsing the data, but since
                                   ;; we don't have an AST we have
                                   ;; to do it here. this will be
                                   ;; fixed.

                                   (set! i (+ i 1))
                                   (if (eq? (% (- i 1) 2) 0)
                                       (if (and (list? el)
                                                (eq? (car el) 'quote))
                                           (cadr el)
                                           el)
                                       el))
                                 state)))))
                   (after (char ")")
                           (lambda (state _)
                              (vector->list state)))
                   (char "]"))))))
  (after
   (repeated
    (any space
         comment
         (after (elements (any lst))
                (lambda (root child)
                  (root.concat (vector child))))))
   (lambda (_ root)
     (let ((lst (vector->list root)))
       (if (eq? (length lst) 1)
           (car lst)
           (cons 'begin lst))))))

(set! module.exports grammar)
