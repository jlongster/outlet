var outlet = require('./outlet');
var compiler = require('./compiler');
var ast = require('./ast');
var util = require('util');
var generator = require('./compiler-js')();

var src = require('fs').readFileSync('example.ol', 'utf-8');
util.puts(outlet.compile(src, 'nodejs'));

// var compiler = require('./compiler-bootstrap');
// var reader = require('./parser');
// var grammar = require('./grammar');
// compiler.parse(reader(grammar,
//                       src,
//                       ast.node(ast.ROOT)),
//               generator);
// util.puts(generator.get_code());


//ast.pretty_print(compiler.read(src));
//util.puts(outlet.compile("(define a (one two three))"));
//util.puts(compile(require('fs').readFileSync('test.ol', 'utf-8'), 
//                  require('./compiler-js')()));

