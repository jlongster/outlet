
ifeq ($(BOOT),1)
	NODE_MAKE = node make.js _boot
else
	NODE_MAKE = node make.js
endif

all: compiler

parser.js: parser.ol
	$(NODE_MAKE) _current_runtime parser.ol > parser2.js && mv parser2.js parser.js

grammar.js: grammar.ol
	$(NODE_MAKE) _current_runtime grammar.ol > grammar2.js && mv grammar2.js grammar.js

compiler.js: compiler.ol
	$(NODE_MAKE) _current_runtime compiler.ol > compiler2.js && mv compiler2.js compiler.js

backends/js.js: backends/js.ol
	$(NODE_MAKE) _current_runtime backends/js.ol > backends/js2.js && mv backends/js2.js backends/js.js

test.js: test.ol
	$(NODE_MAKE) _current_runtime _with_eval test.ol > test2.js && mv test2.js test.js

runtime.js: runtime.ol
	$(NODE_MAKE) _no_runtime runtime.ol > runtime2.js && mv runtime2.js runtime.js

compiler: runtime.js compiler.js parser.js grammar.js backends/js.js test.js

test: compiler
	node test syntax.ol
	node test core.ol
