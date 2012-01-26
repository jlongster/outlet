var outlet = require('./outlet');
var compiler = require('./compiler');
var ast = require('./ast');
var util = require('util');
var generator = require('./compiler-js')();
var grammar = require('./grammar');
var reader = require('./parser');
var fs = require('fs');

if(process.argv.length < 3) {
    throw "must pass a filename";
}

var file = process.argv[2];

var src = fs.readFileSync('tests/' + file, 'utf-8');
//util.puts(outlet.compile(src, 'nodejs'));

//var js = outlet.compile(src, 'js');

generator.write_runtime('js');
compiler.set_generator(generator);

if(file != 'basic.ol') {
    compiler.install_builtin_macros();
}

var forms = reader(grammar,
                   src,
                   ast.node(ast.ROOT));
//ast.pretty_print(forms);
compiler.parse(forms, generator);
var js = generator.get_code();

//ast.pretty_print(forms);
//util.puts(js);
eval(js);
