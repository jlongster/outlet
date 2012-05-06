
(define (vec-getter i)
  (lambda (vec)
    (vector-ref vec i)))

(define unique-obj (list #f))

(define (make-node type data lineno colno)
  [unique-obj type data lineno colno])

(define (copy-node node data)
  (make-node (node-type node)
             data
             (node-lineno node)
             (node-colno node)))

(define node-type (vec-getter 1))
(define node-data (vec-getter 2))
(define node-lineno (vec-getter 3))
(define node-colno (vec-getter 4))

(define (assert-node node)
  (if (not (and (vector? node)
                (== (vector-ref node 0) unique-obj)))
      (begin
        (pp node)
        (throw (Error (str "not a node"))))))

(define (assert-type node type)
  (if (not (== (node-type node) type))
      (throw (Error (str "expected node type " type ": " node)))))

(define (is-type? node type)
  (assert-node node)
  (== (node-type node) type))

(define (is-atom? node) (or (is-type? node 'ATOM)
                            (and (is-type? node 'LIST)
                                 (null? (node-data node)))))

(define (is-list? node) (and (is-type? node 'LIST)
                             (not (null? (node-data node)))))
(define (is-vector? node) (is-type? node 'VECTOR))
(define (is-dict? node) (is-type? node 'DICT))

(define (is-empty-list? node)
  (and (is-type? node 'LIST)
       (null? (node-data node))))

(define (make-atom type parent)
  (make-node 'ATOM type
             (node-lineno parent)
             (node-colno parent)))

(define (make-list . children)
  (make-list* children))

(define (make-list* children)
  (let ((first (car children)))
    (make-node 'LIST children
               (node-lineno first)
               (node-colno first))))

(define (make-empty-list parent)
  (make-node 'LIST '()
             (node-lineno parent)
             (node-colno parent)))

(define (prepend node lst)
  (make-node 'LIST
             (cons node (node-data lst))
             (node-lineno node)
             (node-colno node)))

(define (map-children func lst)
  (make-node 'LIST
             (map func (node-data lst))
             (node-lineno lst)
             (node-colno lst)))

(define (first node)
  (car (node-data node)))

(define (first* node)
  (node-data (car (node-data node))))

(set! module.exports {:make-node make-node
                      :copy-node copy-node
                      :node-type node-type
                      :node-data node-data
                      :node-lineno node-lineno
                      :node-colno node-colno
                      :type? is-type?
                      :atom? is-atom?
                      :list? is-list?
                      :vector? is-vector?
                      :dict? is-dict?
                      :empty-list? is-empty-list?

                      :make-list make-list
                      :make-list* make-list*
                      :make-empty-list make-empty-list
                      :make-atom make-atom
                      :prepend prepend
                      :map-children map-children
                      :first first
                      :first* first*})
