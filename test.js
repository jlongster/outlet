var outlet = require('./outlet');
var compiler = require('./compiler');
var ast = require('./ast');
var util = require('util');

util.puts(outlet.compile(require('fs').readFileSync('test.ol', 'utf-8'),
                         'lua'));

//ast.pretty_print(compiler.read("(define a '(one two three))"));
//util.puts(outlet.compile("(define a (one two three))"));
// util.puts(compile(require('fs').readFileSync('test.ol', 'utf-8'), 
//                   require('./compiler-js')()));

