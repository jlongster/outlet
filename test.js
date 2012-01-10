var outlet = require('./outlet');
var compiler = require('./compiler');
var ast = require('./ast');
var util = require('util');


var src = require('fs').readFileSync('grammar.ol', 'utf-8');

util.puts(compiler.compile(src, require('./compiler-js')()));

//ast.pretty_print(compiler.read(src));
//util.puts(outlet.compile("(define a (one two three))"));
//util.puts(compile(require('fs').readFileSync('test.ol', 'utf-8'), 
//                  require('./compiler-js')()));

