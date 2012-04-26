
(require (fs "fs"))

(define chars-whitespace " \n\t\r")
(define chars-special "(){}[],@'`:")
(define chars-delim (str chars-whitespace chars-special ";"))

(define (in str char)
  (number? (vector-find str char)))

(define (read src)
  (define index 0)
  (define len (vector-length src))

  (define (current)
    (if (finished)
        ""
        (vector-ref src index)))

  (define (previous)
    (vector-ref src (- index 1)))
  
  (define (forward)
    (set! index (+ index 1)))

  (define (back)
    (set! index (- index 1)))
  
  (define (finished)
    (>= index len))

  (define (skip-whitespace)
    (let loop ()
      (if (in chars-whitespace (current))
          (begin
            (forward)
            (loop)))))

  (define (parse-string)
    (let loop ((s ""))
      (forward)
      (cond
       ((== (current) "\\")
        (forward)
        (loop
         (str s (let ((c (current)))
                  (cond
                   ((== c "n") "\n")
                   ((== c "t") "\t")
                   ((== c "r") "\r")
                   (else c))))))
       ((== (current) "\"") s)
       (else (loop (str s (current)))))))

  (define (parse-token s)
    (cond
     ((s.match (RegExp "^[-+]?[0-9]+$")) (make-token 'INTEGER s))
     ((s.match (RegExp "^[-+]?[0-9]+\\.[0-9]*$")) (make-token 'FLOAT s))
     ((s.match (RegExp "^[-+]?0x"))
      (let ((m (s.match (RegExp "0x([0-9a-fA-F]+)$")))
            (prefix (if (== (vector-ref s 0) "-") "-" "")))
        (if m
            (make-token 'HEX (str prefix (vector-ref m 1)))
            (throw (str "invalid hex value: " s)))))
     ((or (== s "#f") (== s "#t")) (make-token 'BOOLEAN s))
     (else (make-token 'SYMBOL s))))

  (define (parse-comment)
    (let loop ((s ""))
      (forward)
      (if (or (finished)
              (== (current) "\n"))
          (make-token 'COMMENT s)
          (loop (str s (current))))))
  
  ;; tokens

  ;; create a unique reference to disambiguate internal objects in the
  ;; reader
  (define unique-obj (list #t))
  
  (define (make-token type data)
    (list unique-obj type data))

  (define token-type cadr)
  (define token-data caddr)

  (define (token? tok)
    (and (list? tok)
         (== (car tok) unique-obj)))
  
  (define (get-token)
    (skip-whitespace)
    (let ((c (current)))
      (cond
       ((in chars-special c)
        (forward)
        (make-token 'SPECIAL c))
       ((== c "\"")
        (let ((s (parse-string)))
          (forward)
          (make-token 'STRING s)))
       ((== c ";")
        (parse-comment))
       ((== c "") #f)
       ((finished) #f)
       (else
        (let loop ((s ""))
          (if (or (in chars-delim (current))
                  (finished))
              (begin
                (parse-token s))
              (begin
                (forward)
                (loop (str s (previous))))))))))

  ;; parser

  (define (token->exp token)
    (let ((type (token-type token))
          (data (token-data token)))
      (cond
       ((== type 'STRING) data)
       ((== type 'SYMBOL) (string->symbol data))
       ((== type 'BOOLEAN) (if (== data "#f") #f #t))
       ((== type 'INTEGER) (parseInt data))
       ((== type 'FLOAT) (parseFloat data))
       ((== type 'HEX) (parseInt data 16))
       (else
        (throw (str "cannot convert token to exp: " token))))))
  
  (define (special? t chars)
    (and (token? t)
         (== (token-type t) 'SPECIAL)
         (in chars (token-data t))))

  (define (compound-start? t)
    (or (special? t "(")
        (special? t "[")
        (special? t "{")))

  (define (compound-end? t)
    (or (special? t ")")
        (special? t "]")
        (special? t "}")))

  (define (end? t)
    (and (token? t)
         (== (token-type t) 'END)))

  (define (read-exp)    
    (let ((token (get-token)))
      (cond
       ((not token)
        (make-token 'END #f))

       ((compound-end? token)
        ;; we simply return the token so the list/vector/dict loop
        ;; knows when to end
        token)
       
       ((compound-start? token)
        (let loop ((lst '())
                   (exp (read-exp)))
          (if (or (end? exp)
                  (compound-end? exp))
              (begin
                ;; the loop will only break when it hits the end of
                ;; file or an end delimiter, so we check the current
                ;; character and move forward
                (define in-list? (special? token "("))
                (define in-vector? (special? token "["))
                (define in-dict? (special? token "{"))
                
                (cond
                 ((and in-list? (special? exp ")")) (reverse lst))
                 ((and in-vector? (special? exp "]")) (list->vector (reverse lst)))
                 ((and in-dict? (special? exp "}"))
                  (let ((i 0))
                    (apply dict
                           (map
                            (lambda (el)
                              ;; unquote the keys. this is bad and I
                              ;; have no idea why we need to do it here
                              ;; but its leftover from the previous
                              ;; reader. will fix son.
                              (set! i (+ i 1))
                              (if (eq? (% (- i 1) 2) 0)
                                  (if (and (list? el)
                                           (eq? (car el) 'quote))
                                      (cadr el)
                                      el)
                                  el))
                            (reverse lst)))))
                 (else
                  (throw (str "unterminated "
                              (cond
                               (list? "list")
                               (vector? "vector")
                               (dict? "dict")))))))
              (begin
                (loop (cons exp lst) (read-exp))))))
       
       ((or (special? token "'")
            (special? token ":"))
        (list 'quote (read-exp)))

       ((special? token "`")
        (list 'quasiquote (read-exp)))

       ((special? token ",")
        (let ((next (current)))
          (if (== next "@")
              (begin
                (forward)
                (list 'unquote-splicing (read-exp)))
              (begin
                (list 'unquote (read-exp))))))

       (else
        (if (== (token-type token) 'COMMENT)
            (read-exp)
            (token->exp token))))))

  (let loop ((e* '())
             (e (read-exp)))
    (if (end? e)
        (if (== (length e*) 1)
            (car e*)
            (cons 'begin (reverse e*)))
        (loop (cons e e*) (read-exp)))))

(set! module.exports {:read read})
