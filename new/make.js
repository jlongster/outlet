var util = require('util');
var fs = require('fs');

var compiler = require('./compiler');
var js_generator = require('./backends/js');
var srcfile = process.argv[2];

var runtime = fs.readFileSync('runtime.js', 'utf-8');
var runtime_eval = fs.readFileSync('runtime-eval.js', 'utf-8');

var src = fs.readFileSync(srcfile, 'utf-8');
util.puts(runtime);

if(srcfile == 'test.ol') {
    util.puts(runtime_eval);
}

util.puts(compiler.compile(src, js_generator()));
