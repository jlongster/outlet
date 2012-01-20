Outlet is a programming language. It is Lisp-like in nature and compiles to both javascript and lua.

See http://jlongster.com/2012/01/04/outlet-my-lisp-to-javascript-experiment.html.

Example
-------

::

    (define foo 5)

    (define (bar x)
      (+ x 1))

    (define (buz x y)
      (let ((z 5))
        (+ x y z)))

    (define (fib n)
      (if (= n 0)
          n
          (+ n (fib (- n 1)))))

    (define (Y func)
      ((lambda (f) (f f))
       (lambda (f)
         (func f))))

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

Using
-----

To get started:

::

    var outlet = require('./outlet');
    outlet.compile('(define foo 5)'); // returns javascript source

outlet.compile takes a target language as the argument, but only 'js' is supported right now. Lua will be supported soon.

See example.ol for example Outlet code.

More sophisticated build tools will come soon. If you want to work on the compiler, Outlet comes with a Makefile. To compile your changes:

::

    make test

That will recompile the compiler with itself and run all tests. If the compilation
fails, you may need to `git checkout` the compiler js sources again since it may be half-compiled or compiled with the bugs. You always need a working Outlet compiler to compile the compiler. This setup is helpful if you are fixing tricky bugs that exist in all previous versions of the compiler.

If it works better, you can checkout a stable version of the compiler in the directory `boot` and run:

::

    make BOOT=1 test

That will compile the sources with the bootstrapped compiler in the `boot` directory. This is helpful if you are simply focusing on extending the language features.

Status
------

Outlet is new and undergoing major rewrites weekly. The compiler is mostly bootstrapped so as the language advances the compiler will naturally be rewritten to take advantage of the new features. The early stages of the compiler is intentionally hack-ish since it will be rewritten in proper Outlet over time.

Todo
----

* Named lets: this lets you do looping with (let loop ((var val)) ... (loop))
* `letrec`: allows you to references other variables within the same `let`
* `eval`: the current implementation of `eval` seems to work pretty well. The scoping of an `eval` inside a macro doesn't work as expected. Top-level defines should introduce variables into a global macro scope, but it's scoped within the macro right now. This semantic is standard in Scheme. It might be worth simply introducing another form for defining macro-level variables.
* % syntax: provide a syntax that bypasses all macro expansion and other transformations; (%eval ...) is guaranteed to call javascript's "eval"
* raw code: provide a way to output raw javascript, possibly something like (%js "return obj.props[val]"). this is just temporary until Outlet evolves more.
* Macros: the current macro system is completely a hack to get `define-macro` style macros to use within the Outlet compiler. The future macro system is yet to be determined, but it will be something more powerful, along the lines of EPS or `define-syntax`.
* Build system: make it easier to compile multi-file programs
* Tools: make it easy to use Outlet on the web or on the CLI

That's all for now. I will work on other things too but this is what's on my mind.
