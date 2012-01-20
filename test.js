var outlet = require('./outlet');
var compiler = require('./compiler');
var ast = require('./ast');
var util = require('util');
var generator = require('./compiler-js')();

var src = require('fs').readFileSync('tests/compile.ol', 'utf-8');
//util.puts(outlet.compile(src, 'nodejs'));

var compiler = require('./compiler');
var reader = require('./parser');
var grammar = require('./grammar');
// ast.pretty_print(reader(grammar,
//                       src,
//                       ast.node(ast.ROOT)));
generator.write_runtime('js');
var n = reader(grammar,
               src,
               ast.node(ast.ROOT));
//ast.pretty_print(n);
compiler.parse(n, generator);
//util.puts(generator.get_code());
eval(generator.get_code());


