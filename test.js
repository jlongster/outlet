var outlet = require('./outlet');
var compiler = require('./compiler');
var ast = require('./ast');
var util = require('util');
var generator = require('./compiler-js')();
var grammar = require('./grammar');
var reader = require('./parser');

var src = require('fs').readFileSync('tests/compile.ol', 'utf-8');
//util.puts(outlet.compile(src, 'nodejs'));

//var js = outlet.compile(src, 'js');

generator.write_runtime('js');
compiler.set_generator(generator);
compiler.install_builtin_macros();
var forms = reader(grammar,
                   src,
                   ast.node(ast.ROOT));
compiler.parse(forms, generator);
var js = generator.get_code();

//ast.pretty_print(forms);
//util.puts(js);
eval(js);
