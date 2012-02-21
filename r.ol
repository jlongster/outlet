
(require (util "util"))

;; types

(define (type obj)
  (cond
   ((number? obj) 'number)
   ((boolean? obj) 'boolean)
   ((string? obj) 'string)
   ((null? obj) 'null)
   ((list? obj) 'list)
   ((vector? obj) 'vector)
   ((dict? obj) 'dict)))

(define (number? obj)
  (eq? (%raw "typeof obj") "number"))

(define (string? obj)
  (eq? (%raw "typeof obj") "string"))

(define (symbol? obj)
  (and (%raw "!!obj")
       (%raw "obj.str !== undefined")
       (%raw "obj.symbol !== undefined")))

(define (boolean? obj)
  (or (eq? obj (%raw "true"))
      (eq? obj (%raw "false"))))

(define (null? obj)
  (and (%raw "!!obj")
       (not (eq? obj.length (%raw "undefined")))
       (eq? obj.length 1)
       (eq? (vector-ref obj 0) (%raw "null"))))

(define (list? obj)
  (and (%raw "!!obj")
       (not (eq? obj.list (%raw "undefined")))))

(define (vector? obj)
  (and (not (list? obj))
       (not (null? obj))
       (%raw "!!obj")
       (eq? (%raw "typeof obj") "object")
       (not (eq? obj.length (%raw "undefined")))))

(define (dict? obj)
  (and (not (symbol? obj))
       (%raw "!!obj")
       (eq? (%raw "typeof obj") "object")
       (eq? obj.length (%raw "undefined"))))

(define (literal? x)
  (or (number? x)
      (string? x)
      (boolean? x)
      (null? x)))

;; strings

(define str
  (lambda args
    (fold (lambda (el acc)
            (+ acc (inspect el)))
          ""
          args)))

(define (string->symbol str)
  (let ((s str))
    (set! s (s.replace (RegExp "\\\\" "g") "\\\\"))
    (set! s (s.replace (RegExp "\n" "g") "\\n"))
    (set! s (s.replace (RegExp "\r" "g") "\\r"))
    (set! s (s.replace (RegExp "\t" "g") "\\t"))
    (set! s (s.replace (RegExp "\"" "g") "\\\""))
    ;; raw code so that the compiler doesn't see this as a symbol
    (%raw "{str:s, symbol:true}")))

(define (symbol->string sym) sym.str)

;; lists

;; this is a special value to represent an empty list. this will most
;; likely change in the future.
(define _emptylst (%raw "[null]"))

(define list (lambda args args))

(define (cons obj lst)
  (let ((res (%raw "[obj, lst]")))
    (%raw "res.list = true;")
    res))

(define (car lst)
  (%raw "lst[0]"))

(define (cdr lst)
  (%raw "lst[1]"))

(define (cadr lst) (car (cdr lst)))
(define (cddr lst) (cdr (cdr lst)))
(define (cdar lst) (cdr (car lst)))
(define (caddr lst) (car (cdr (cdr lst))))
(define (cdddr lst) (cdr (cdr (cdr lst))))
(define (cadar lst) (car (cdr (car lst))))
(define (cddar lst) (cdr (cdr (car lst))))
(define (caadr lst) (car (car (cdr lst))))
(define (cdadr lst) (cdr (car (cdr lst))))

(define (list-ref lst i)
  (let loop ((lst lst)
             (i i))
    (cond
     ((null? lst) #f)
     ((eq? i 0) (car lst))
     (else (loop (cdr lst) (- i 1))))))

(define (length lst)
  (fold (lambda (el acc) (+ acc 1))
        0
        lst))

(define (list-append lst1 lst2)
  (let loop ((lst lst1))
    (if (null? lst)
         lst2
         (cons (car lst)
               (loop (cdr lst))))))

(define (list-find lst val)
  (let loop ((lst lst))
    (if (null? lst)
        #f
        (if (eq? (car lst) val)
            lst
            (loop (cdr lst))))))

(define (reverse lst)
  (if (null? lst)
      '()
      (list-append (reverse (cdr lst))
                   (list (car lst)))))

;; this function is called on any function that captures rest
;; parameters, so avoid dependencies
(define (vector->list vec)
  (let loop ((i 0))
    (if (< i (%raw "vec.length"))
        (cons (vector-ref vec i)
              (loop (+ i 1)))
        (%raw "_emptylst"))))

;; todo: remove me later
(define vector-to-list vector->list)

;; vectors

(define (make-vector count val)
  (let ((v (%raw "new Array(count)")))
    (let loop ((i 0))
      (if (< i count)
          (begin
            (vector-put! v i val)
            (loop (+ i 1)))
          v))))

(define (vector)
  (%raw "Array.prototype.slice.call(arguments)"))

(define (vector-ref vec i)
  (%raw "vec[i]"))

(define (vector-put! vec i obj)
  (%raw "vec[i] = obj"))

(define (vector-concat vec1 vec2)
  (%raw "vec1.concat(vec2)"))

(define (vector-slice vec start end)
  (%raw "vec.slice(start, end)"))

(define (vector-push! vec obj)
  (%raw "vec.push(obj)"))

(define (vector-find vec val)
  (let loop ((i 0))
    (if (< i (%raw "vec.length"))
        (if (eq? (vector-ref vec i) val)
            i
            (loop (+ i 1)))
        #f)))

(define (vector-length vec) vec.length)

(define (list->vector lst)
  (define res (%raw "[]"))
  (for-each (lambda (el)
              (res.push el))
            lst)
  res)

(define (vector-map func vec)
  (define res (%raw "[]"))
  (let loop ((i 0))
    (if (< i vec.length)
        (begin
          (res.push (func (vector-ref vec i)))
          (loop (+ i 1)))))
  res)

(define (vector-for-each func vec)
  (let loop ((i 0))
    (if (< i vec.length)
        (begin
          (func (vector-ref vec i))
          (loop (+ i 1))))))

(define (vector-fold func acc vec)
  (let loop ((i 0)
             (acc acc))
    (if (< i (vector-length vec))
        (loop (+ i 1)
              (func (vector-ref vec i) acc))
        acc)))

;; dicts

(define dict
  (lambda args
    (define res (%raw "{}"))
    (let loop ((lst args))
      (if (not (null? lst))
          (let ((key (car lst))
                (val (cadr lst)))
            (dict-put! res key val)
            (loop (cddr lst)))))
    res))

(define (dict-put! dct k v)
  (%raw "dct[k.str] = v"))

(define (dict-ref dct k)
  (%raw "dct[k.str]"))

(define (dict-map func dct)
  (define res {})
  (let loop ((lst (keys dct)))
    (if (not (null? lst))
        (let ((k (car lst)))
          (dict-put! res k
                     (func (dict-ref dct k)))
          (loop (cdr lst)))))
  res)

(define (dict->vector dct)
  (define res [])
  (let loop ((lst (keys dct)))
    (if (not (null? lst))
        (begin
          (vector-push! res (car lst))
          (vector-push! res (dict-ref dct (car lst)))
          (loop (cdr lst)))))
  res)

(define (dict->list dct)
  (vector->list (dict->vector dct)))

(define (keys dct)
  (let ((res '()))
    (%raw "for(var k in dct) {
       res = cons(string_dash__gt_symbol(k), res);
    }")
    res))

(define (vals dct)
  (map (lambda (k) (dict-ref dct k))
       (keys dct)))

(define (zip keys vals)
  (define res {})
  (let loop ((ks keys)
             (vs vals))
    (if (not (null? ks))
        (begin
          (dict-put! res (car ks) (car vs))
          (loop (cdr ks) (cdr ks)))))
  res)

;; not

(define (not obj)
  (and (%raw "typeof v !== 'number'")
       (%raw "!obj")))

;; equality

(define (eq? obj1 obj2)
  (if (and (symbol? obj1) (symbol? obj2))
      (%raw "obj1.str === obj2.str")
      (%raw "obj1 === obj2")))

(define (equal? obj1 obj2)
  (cond
   ((and (list? obj1)
         (list? obj2))
    (let loop ((lst1 obj1)
               (lst2 obj2))
      (define n1 (null? lst1))
      (define n2 (null? lst2))

      (cond
       ((and n1 n2) #t)
       ((or n1 n2) #f)
       (else
        (if (equal? (car lst1) (car lst2))
            (loop (cdr lst1) (cdr lst2))
            #f)))))
   ((and (vector? obj1)
         (vector? obj2))
    (let loop ((i 0))
      (cond
       ((and (< i obj1.length)
             (< i obj2.length))
        #t)
       ((or (< i obj1.length)
            (< i obj2.length))
        #f)
       (else
        (if (equal? (vector-ref obj1 i)
                    (vector-ref obj2 i))
            (loop (+ i 1))
            #f)))))
   ((and (dict? obj1)
         (dict? obj2))
    (let ((keys1 (keys obj1))
          (keys2 (keys obj2)))
      (and (eq? (length keys1)
                (length keys2))
           (let loop ((lst keys1))
             (if (null? lst)
                 #t
                 (if (equal? (dict-ref obj1 (car lst))
                             (dict-ref obj2 (car lst)))
                     (loop (cdr lst))
                     #f))))))
   (else
    (eq? obj1 obj2))))

;; output

(define (display msg)
  (console.log msg))

(define (pp obj)
  (display (str (inspect obj) "\n")))

(define (inspect obj . rest)
  (define (space obj)
    (cond
     ((or (literal? obj)
          (symbol? obj)) (vector-length (inspect obj)))
     ((list? obj)
      ;; length of obj plus 1 equals the number of spaces and
      ;; parantheses for a list
      (+ (length obj)
         1
         (fold (lambda (el acc)
                 (+ acc (space el)))
               0
               obj)))
     ((dict? obj)
      (space (dict->list obj)))
     ((vector? obj)
      (space (vector->list obj)))))

  (let ((i (if (null? rest) 1 (car rest))))
    (define buffer "")
    (define (get-buffer) buffer)
    
    (define (disp str)
      (set! buffer (+ buffer str)))

    (define (pad n)
      (vector-for-each (lambda (_) (disp " "))
                       (make-vector n)))
    
    (cond
     ((number? obj) (+ "" obj))
     ((string? obj) obj)
     ((symbol? obj) (symbol->string obj))
     ((boolean? obj) (if obj "#t" "#f"))
     ((null? obj) "()")
     ((list? obj)
      (let ((node (car obj))
            (childr (cdr obj))
            (sp (> (space obj) 30)))
        (disp "(")
        (disp (inspect node (+ i 1)))
        (for-each (lambda (item)
                    (if sp
                        (begin (disp "\n")
                               (pad i))
                        (disp " "))
                    (disp (inspect item (+ i 1))))
                  childr)
        (disp ")")
        (get-buffer)))
     ((vector? obj)
      (let ((first (vector-ref obj 0))
            (rest (vector-slice obj 1))
            (sp (> (space obj) 30)))
        (disp "[")
        (disp (inspect first (+ i 1)))
        (vector-for-each (lambda (item)
                           (if sp
                               (begin (disp "\n")
                                      (pad i))
                               (disp " "))
                           (disp (inspect item (+ i 1))))
                         rest)
        (disp "]")
        (get-buffer)))
     ((dict? obj)
      (disp "{")
      (let ((lst (dict->list obj))
            (sp (> (space obj) 30)))
        (let loop ((lst lst)
                   (first #t))
          (if (not (null? lst))
              (let ((key (car lst))
                    (val (cadr lst)))
                (if (not first)
                    (if sp
                        (begin (disp "\n")
                               (pad i))
                        (disp " ")))
                (disp ":")
                (disp (inspect key i))
                (disp " ")
                (disp (inspect val (+ i 1 (vector-length
                                           (symbol->string key)))))
                (loop (cddr lst) #f)))))
      (disp "}")
      (get-buffer)))))

;; sequences

(define (map func lst)
  (if (null? lst)
      '()
      (cons (func (car lst))
            (map func (cdr lst)))))

(define (for-each func lst)
  (if (not (null? lst))
      (begin
        (func (car lst))
        (for-each func (cdr lst)))))

(define (fold func acc lst)
  (if (null? lst)
      acc
      (fold func
            (func (car lst) acc)
            (cdr lst))))

;; gensym (need to randomize)

(define _gensym 0)
(define (gensym)
  (set! _gensym (+ _gensym 1))
  (string->symbol (+ "o" _gensym)))
