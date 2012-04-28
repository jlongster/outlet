
(require (fs "fs")
         (ast "./ast"))

(define chars-whitespace " \n\t\r")
(define chars-special "(){}[],@'`:")
(define chars-delim (str chars-whitespace chars-special ";"))

(define (in str char)
  (number? (vector-find str char)))

(define (vec-getter i)
  (lambda (vec)
    (vector-ref vec i)))

(define (read src)
  (define index 0)
  (define len (vector-length src))
  (define lineno 0)
  (define colno 0)

  (define (current)
    (if (finished)
        ""
        (vector-ref src index)))

  (define (previous)
    (vector-ref src (- index 1)))
  
  (define (forward)
    (set! index (+ index 1))
    
    (if (== (previous) "\n")
        (begin
          (set! lineno (+ lineno 1))
          (set! colno 0))
        (set! colno (+ colno 1))))

  (define (back)
    (set! index (- index 1))
    
    (if (== (current) "\n")
        (set! lineno (- lineno 1))))
  
  (define (finished)
    (>= index len))

  (define (skip-whitespace)
    (let loop ()
      (if (in chars-whitespace (current))
          (begin
            (forward)
            (loop)))))

  (define (parse-string lineno colno)
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
       ((== (current) "\"") (make-token 'STRING s lineno colno))
       (else (loop (str s (current)))))))

  (define (parse-token s lineno colno)
    (cond
     ((s.match (RegExp "^[-+]?[0-9]+$")) (make-token 'INTEGER s lineno colno))
     ((s.match (RegExp "^[-+]?[0-9]+\\.[0-9]*$")) (make-token 'FLOAT s lineno colno))
     ((s.match (RegExp "^[-+]?0x"))
      (let ((m (s.match (RegExp "0x([0-9a-fA-F]+)$")))
            (prefix (if (== (vector-ref s 0) "-") "-" "")))
        (if m
            (make-token 'HEX (str prefix (vector-ref m 1)) lineno colno)
            (throw (str "invalid hex value: " s)))))
     ((or (== s "#f") (== s "#t")) (make-token 'BOOLEAN s lineno colno))
     (else (make-token 'SYMBOL s lineno colno))))

  (define (parse-comment lineno colno)
    (let loop ((s ""))
      (forward)
      (if (or (finished)
              (== (current) "\n"))
          (make-token 'COMMENT s lineno colno)
          (loop (str s (current))))))
  
  ;; tokens

  ;; create a unique reference to disambiguate internal objects in the
  ;; reader
  (define unique-obj (list #t))
  
  (define (make-token type data lineno colno)
    [unique-obj type data lineno colno])

  (define token-type (vec-getter 1))
  (define token-data (vec-getter 2))
  (define token-lineno (vec-getter 3))
  (define token-colno (vec-getter 4))

  (define (token? tok)
    (and (vector? tok)
         (== (vector-ref tok 0) unique-obj)))
  
  (define (get-token)
    (skip-whitespace)
    (let ((c (current))
          (lineno lineno)
          (colno colno))
      (cond
       ((in chars-special c)
        (forward)
        (make-token 'SPECIAL c lineno colno))
       ((== c "\"")
        (let ((s (parse-string lineno colno)))
          (forward)
          s))
       ((== c ";")
        (parse-comment lineno colno))
       ((== c "") #f)
       ((finished) #f)
       (else
        (let loop ((s ""))
          (if (or (in chars-delim (current))
                  (finished))
              (parse-token s lineno colno)
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
                 ((and in-list? (special? exp ")")) (ast.make-node 'LIST (reverse lst)
                                                                   (token-lineno token)
                                                                   (token-colno token)))
                 ((and in-vector? (special? exp "]")) (ast.make-node 'VECTOR (reverse lst)
                                                                     (token-lineno token)
                                                                     (token-colno token)))
                 ((and in-dict? (special? exp "}")) (ast.make-node 'DICT (reverse lst)
                                                                   (token-lineno token)
                                                                   (token-colno token)))
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
        (ast.make-node
         'LIST
         (list (ast.make-node 'ATOM 'quote
                              (token-lineno token)
                              (token-colno token))
               (read-exp))
         (token-lineno token)
         (token-colno token)))

       ((special? token "`")
        (ast.make-node
         'LIST
         (list (ast.make-node 'ATOM 'quasiquote
                              (token-lineno token)
                              (token-colno token))
               (read-exp))
         (token-lineno token)
         (token-colno token)))

       ((special? token ",")
        (let ((next (current)))
          (if (== next "@")
              (begin
                (forward)
                (ast.make-node
                 'LIST
                 (list (ast.make-node 'ATOM 'unquote-splicing
                                      (token-lineno token)
                                      (token-colno token))
                       (read-exp))
                 (token-lineno token)
                 (token-colno token)))
              (begin
                (ast.make-node
                 'LIST
                 (list (ast.make-node 'ATOM 'unquote
                                      (token-lineno token)
                                      (token-colno token))
                       (read-exp))
                 (token-lineno token)
                 (token-colno token))))))

       (else
        (if (== (token-type token) 'COMMENT)
            (read-exp)
            (ast.make-node 'ATOM
                           (token->exp token)
                           (token-lineno token)
                           (token-colno token)))))))

  (let loop ((e* '())
             (e (read-exp)))
    (if (end? e)
        (if (== (length e*) 1)
            (car e*)
            (ast.make-node 'LIST
                           (cons (ast.make-node 'ATOM 'begin 0 1)
                                 (reverse e*))
                           0 0))
        (loop (cons e e*) (read-exp)))))

(set! module.exports {:read read})
