
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
  (== (%raw "typeof obj") "number"))

(define (string? obj)
  (and (== (%raw "typeof obj") "string")
       (not (== (%raw "obj[0]") (%raw "\"\\uFDD1\"")))))

(define (symbol? obj)
  (and (== (%raw "typeof obj") "string")
       (== (%raw "obj[0]") (%raw "\"\\uFDD1\""))))

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
       (not (eq? obj.length (%raw "undefined")))
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

(define (function? obj)
  (eq? (%raw "typeof obj") "function"))

(define (literal? x)
  (or (number? x)
      (string? x)
      (boolean? x)
      (null? x)))

;; strings

(define str
  (lambda args
    (fold (lambda (el acc)
            (+ acc
               (if (string? el) el (inspect el))))
          ""
          args)))

(define (string->symbol str)
  (let ((s str))
    ;; (set! s (s.replace (RegExp "-" "g") "_dash_"))
    ;; (set! s (s.replace (RegExp "\\?" "g") "_p_"))
    ;; (set! s (s.replace (RegExp "\\!" "g") "_excl_"))
    ;; (set! s (s.replace (RegExp ">" "g") "_gt_"))
    ;; (set! s (s.replace (RegExp "<" "g") "_lt_"))
    ;; (set! s (s.replace (RegExp "%" "g") "_per_"))
    ;; (set! s (s.replace (RegExp "=" "g") "_eq_"))
    ;; raw code so that the compiler doesn't see this as a symbol
    (+ (%raw "\"\\uFDD1\"") s)))

(define (symbol->string sym)
  (let ((s (sym.substring 1)))
    ;; (set! s (s.replace (RegExp "_dash_" "g") "-"))
    ;; (set! s (s.replace (RegExp "_p_" "g") "?"))
    ;; (set! s (s.replace (RegExp "_excl_" "g") "!"))
    ;; (set! s (s.replace (RegExp "_gt_" "g") ">"))
    ;; (set! s (s.replace (RegExp "_lt_" "g") "<"))
    ;; (set! s (s.replace (RegExp "_per_" "g") "%"))
    ;; (set! s (s.replace (RegExp "_eq_" "g") "="))
    s))

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

(define (list-append . lsts)
  (define l* (if (null? lsts) '() lsts))
  (if (null? l*)
      '()
      (if (null? (cdr l*))
          (car l*)
          (_list-append (car l*)
                        (apply list-append (cdr l*))))))

(define (_list-append lst1 lst2)
  (let loop ((lst lst1))
    (if (null? lst)
        lst2
        (cons (car lst)
              (loop (cdr lst))))))

(define (list-find lst val . rst)
  (let ((access (if (null? rst) (lambda (x) x) (car rst))))
    (let loop ((lst lst))
      (if (null? lst)
          #f
          (if (== (access (car lst)) val)
              lst
              (loop (cdr lst)))))))

(define (map func lst)
  (if (null? lst)
      '()
      (cons (func (car lst))
            (map func (cdr lst)))))

(define (for-each func lst)
  (let loop ((lst lst))
    (if (not (null? lst))
        (begin
          (func (car lst))
          (loop (cdr lst))))))

(define (fold func acc lst)
  (if (null? lst)
      acc
      (fold func
            (func (car lst) acc)
            (cdr lst))))

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
  (%raw "dct[k.substring(1)] = v"))

(define (dict-ref dct k)
  (%raw "dct[k.substring(1)]"))

(define (dict-map func dct)
  (define res {})
  (let loop ((lst (keys dct)))
    (if (not (null? lst))
        (let ((k (car lst)))
          (dict-put! res k
                     (func (dict-ref dct k)))
          (loop (cdr lst)))))
  res)

(define (dict-merge dct1 dct2)
  (let ((res {}))
    (map (lambda (k) (dict-put! res k (dict-ref dct1 k)))
         (keys dct1))
    (map (lambda (k) (dict-put! res k (dict-ref dct2 k)))
         (keys dct2))
    res))

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
          (loop (cdr ks) (cdr vs)))))
  res)

;; not

(define (not obj)
  (and (%raw "typeof obj !== 'number'")
       (%raw "!obj")))

;; equality

(define (== obj1 obj2)
  (%raw "obj1 === obj2"))

(define (= obj1 obj2)
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
    (if (not (= obj1.length obj2.length))
        #f
        (let loop ((i 0))
          (if (< i obj1.length)
              (if (= (vector-ref obj1 i)
                     (vector-ref obj2 i))
                  (loop (+ i 1))
                  #f)
              #t))))
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

(define eq? ==)
(define equal? =)

;; output

(define (print msg)
  (util.print msg))

(define (println msg)
  (util.puts msg))

(define (pp obj)
  (println (inspect obj)))

(define (%inspect-non-sequence obj)
  ;;(console.log "%inspect-non-sequence: " obj)
  (cond
   ((number? obj) (+ "" obj))
   ((string? obj)
    (set! obj (obj.replace (RegExp "\\\\" "g") "\\\\"))
    (set! obj (obj.replace (RegExp "\n" "g") "\\n"))
    (set! obj (obj.replace (RegExp "\r" "g") "\\r"))
    (set! obj (obj.replace (RegExp "\t" "g") "\\t"))
    (set! obj (obj.replace (RegExp "\"" "g") "\\\""))
    (+ "\"" obj "\""))
   ((symbol? obj) (symbol->string obj))
   ((boolean? obj) (if obj "#t" "#f"))
   ((null? obj) "()")
   ((function? obj) "<function>")
   (else (+ "<unknown " obj ">"))))

(define (%recur-protect obj arg func halt . rest)
  (let ((parents (if (null? rest) '() (car rest))))
    (if (list-find parents obj)
        halt
        (func obj arg (lambda (el arg)
                        (%recur-protect el arg func halt
                                        (cons obj parents)))))))

(define (%space obj)
  ;;(console.log "%space: " (util.inspect obj))
  (%recur-protect
   obj
   #f
   (lambda (obj arg recur)
     (cond
      ((list? obj)
       ;; length of obj plus 1 equals the number of spaces and
       ;; parantheses for a list
       (+ (length obj)
          1
          (fold (lambda (el acc)
                  (+ acc (recur el #f)))
                0
                obj)))
      ((dict? obj)
       (recur (dict->list obj) #f))
      ((vector? obj)
       (recur (vector->list obj) #f))
      (else
       (vector-length (%inspect-non-sequence obj)))))
   (vector-length "<circular>")))

(define (inspect obj . rest)
  ;;(console.log "inspect: " obj)
  (let ((no-newlines (if (null? rest) #f (car rest))))
    (%recur-protect
     obj
     1
     (lambda (obj i recur)
       (define buffer "")
       (define (get-buffer) buffer)

       (define (disp s)
         (set! buffer (+ buffer s)))

       (define (pad n)
         (vector-for-each (lambda (_) (disp " "))
                          (make-vector n)))

       (cond
        ((list? obj)
         (let ((sp (> (%space obj) 30))
               (first #t))
           (disp "(")
           (for-each
            (lambda (el)
              (if (not first)
                  (if (and sp (not no-newlines))
                      (begin (disp "\n")
                             (pad i))
                      (disp " ")))
              (disp (recur el (+ i 1)))
              (set! first #f))
            obj)
           (disp ")")
           (get-buffer)))
        ((vector? obj)
         (let ((sp (> (%space obj) 30))
               (first #t))
           (disp "[")
           (vector-for-each (lambda (el)
                              (if (not first)
                                  (if (and sp (not no-newlines))
                                      (begin (disp "\n")
                                             (pad i))
                                      (disp " ")))                            
                              (disp (recur el (+ i 1)))
                              (set! first #f))
                            obj)
           (disp "]")
           (get-buffer)))
        ((dict? obj)
         (let ((sp (> (%space obj) 30))
               (first #t))
           (disp "{")
           (for-each (lambda (k)
                       (if (not first)
                           (if (and sp (not no-newlines))
                               (begin (disp "\n")
                                      (pad i))
                               (disp " ")))
                       (disp ":")
                       (disp (recur k i))
                       (disp " ")
                       (disp (recur (dict-ref obj k)
                                    (+ i 3 (vector-length
                                            (symbol->string k)))))
                       (set! first #f))
                     (keys obj))
           (disp "}")
           (get-buffer)))
        (else
         (%inspect-non-sequence obj))))
     "<circular>")))


;; misc

(define (apply func args)
  ((%raw "func.apply")
   (%raw "null")
   (list->vector args)))

(define (trampoline-result? value)
  (and (vector? value)
       (= (vector-ref value 0) "__tco_call")))

(define (trampoline value)
  (%raw "while(trampoline_dash_result_p_(value)) { value = value[1](); }")
  value)

;; TODO: this needs better randomization
(define (gensym)
  (string->symbol (+ "o" (Math.floor (* (Math.random) 10000000)))))
