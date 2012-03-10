Outlet is a programming language. It is Lisp-like in nature and compiles to both javascript and lua.

See http://jlongster.com/2012/01/04/outlet-my-lisp-to-javascript-experiment.html.

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

The compiler is stable and a full runtime is available (see runtime.ol). I am currently working on a register-based virtual machine for Outlet which will solely act as a debugger. It will allow Outlet code to be paused, resumed, and inspected, making an in-browser stepping debugger possible.

The compiler is written 100% in Outlet except for the javascript runtime, so it is completely bootstrapped.

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

Todo
----

* Named lets: this lets you do looping with (let loop ((var val)) ... (loop))
* `letrec`: allows you to references other variables within the same `let`
* `eval` is not implemented in the new rewrite
* `define-macro` is implemented, but it evalutes the macros in the wrong context. Currently it simply transforms into a `install-expander` expression which makes it available for code which is evaluated. The macro needs to be available for the current source code, not for evaluated code one level above.
* raw code: provide a way to output raw javascript, possibly something like (%js "return obj.props[val]"). this is just temporary until Outlet evolves more.
* Build system: make it easier to compile multi-file programs
* Tools: make it easy to use Outlet on the web or on the CLI

That's all for now. I will work on other things too but this is what's on my mind.
