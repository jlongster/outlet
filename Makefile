
ifeq ($(BOOT),1)
	NODE_MAKE = node make.js _boot
else
	NODE_MAKE = node make.js
endif

all: test

parser.js: parser.ol
	$(NODE_MAKE) parser.ol > parser2.js && mv parser2.js parser.js

grammar.js: grammar.ol
	$(NODE_MAKE) grammar.ol > grammar2.js && mv grammar2.js grammar.js

compiler.js: compiler.ol
	$(NODE_MAKE) compiler.ol > compiler2.js && mv compiler2.js compiler.js

compiler: compiler.js parser.js grammar.js compiler-js.js runtime.js

test: compiler
	node test.js
