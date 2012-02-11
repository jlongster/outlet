
NODE_MAKE = node make.js

all: compiler

parser.js: parser.ol
	$(NODE_MAKE) parser.ol > parser2.js && mv parser2.js parser.js

grammar.js: grammar.ol
	$(NODE_MAKE) grammar.ol > grammar2.js && mv grammar2.js grammar.js

compiler.js: compiler.ol
	$(NODE_MAKE) compiler.ol > compiler2.js && mv compiler2.js compiler.js

backends/js.js: backends/js.ol
	$(NODE_MAKE) backends/js.ol > backends/js2.js && mv backends/js2.js backends/js.js

test.js: test.ol
	$(NODE_MAKE) test.ol > test2.js && mv test2.js test.js

compiler: compiler.js parser.js grammar.js backends/js.js test.js

test: compiler
	node test basic.ol
