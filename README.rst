Outlet is a programming language. It is Lisp-like in nature and compiles to javascript (lua support is in the works).

See https://jlongster.com/Outlet--My-Lisp-to-Javascript-Experiment.

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

Current Status
--------------

Outlet is no longer being actively hacked on. It is used to test out new ideas here and there, but it is not actively maintained.

I plan on writing a "post-mortem" of my experience, though this isn't necessarily dead, just frozen. I'll most likely come back and hack on cool ideas. It's just not something you should use, unless you want to play with compilers.

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

Notes
-----

The compiler is stable and a full runtime is available (see runtime.ol). It is written 100% in Outlet.

I was working on a virtual machine to run Outlet code that is compiled to special assembly instructions. It works great, but it is slow. The project is outlet-machine: https://github.com/jlongster/outlet-machine.

Using
-----

To get started:

::

    # Download Outlet and add the `bin` directory to the path
    git clone git@github.com:jlongster/outlet.git
    export PATH="`pwd`/bin:$PATH"

    # Compile a file (saves it to file.js, the original filename with a js ext)
    ol file.ol

    # Compile a file and print to stdout
    ol -c file.ol

    # Evalute an expression
    ol -e '(define a 4)'

   # Compile an expression and print to stdout
    ol -c -e '(define a 4)'

To use the javascript API:

::

    var compiler = require('./compiler');
    var js = require('./backends/js');
    compiler.compile('(define foo 5)', js()); // returns javascript source

See the tests in `tests` for examples.

If you want to work on the compiler, Outlet comes with a Makefile. To compile your changes and run all tests:

::

    make         # Compile the compiler with itself
    make BOOT=1  # Compile the compiler with the last known working version
    make test    # Run tests
