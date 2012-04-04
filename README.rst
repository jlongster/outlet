Outlet is a programming language. It is Lisp-like in nature and compiles to both javascript and lua.

See http://jlongster.com/2012/01/04/outlet-my-lisp-to-javascript-experiment.html.

Features
--------

* Object literals: ``{:one 1 :two 2}``, ``[1 2 3 4 5]``
* A pretty printer: ``pp``
* Tail-recursive named lets:

::

     (let loop ()
       (if (eq? (read-input) 'quit)
         (loop)))

* Expansion Passing Style and define-macro style macros
* Javascript code generator
* Several other things, it's hackable!

Example
-------

::

    (define foo 5)

    (define (bar x)
      (+ x 1))

    (define (me)
        (+ x 1))

    (define (buz x y)
      (let ((z 5))
        (+ x y z)))

    (define (fib n)
      (if (= n 0)
          n
          (+ n (fib (- n 1)))))

    (define obj {:foo 1 :bar 2})       ; maps
    (define vec [1 2 3 4])             ; vectors

    (define (baz one two . three)      ; rest parameters
      (pp three))

    (baz "a" "b" "c" "d" "e" "f")

    (pp (eval_outlet '(baz 1 2 3 4)))  ; eval

    (define (print-n n)
      (cond
       ((> n 0) (display "positive"))
       ((< n 0) (display "negative"))
       ((= n 0) (display "0"))
       (else (display "wait, what?")))) ; cond

    (define-macro (when cond . body)    ; macros
      `(if ,cond
           (begin
             ,@body)))

Status
------

The compiler is stable and a full runtime is available (see runtime.ol). It is written 100% in Outlet.

I was working on a virtual machine to run Outlet code that is compiled to special assembly instructions. It works great, but it is slow. The project is outlet-machine: https://github.com/jlongster/outlet-machine.

Using
-----

To get started:

::

    var compiler = require('./compiler');
    var js = require('./backends/js');
    compiler.compile('(define foo 5)', js()); // returns javascript source

This is a rough interface, and will improve when build tools are worked on.

See the tests in `tests` for examples.

More sophisticated build tools will come soon. If you want to work on the compiler, Outlet comes with a Makefile. To compile your changes and run all tests:

::

    make test
