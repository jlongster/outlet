var util = require('util');
var fs = require('fs');


var opts = {};
var root;
var args = process.argv.slice(2);

while(args[0].indexOf('.ol') == -1) {
    if(args[0] == '_boot') {
        opts.boot = true;
    }
    else if(args[0] == '_with_eval') {
        opts.with_eval = true;
    }
    else if(args[0] == '_no_runtime') {
        opts.no_runtime = true;
    }
    else if(args[0] == '_current_runtime') {
        opts.current_runtime = true;
    }
    
    args = args.slice(1);
}

if(opts.boot) {
    root = './boot/';
}
else {
    root = './';
}

var compiler = require(root + 'compiler');
var js_generator = require(root + 'backends/js');
var srcfile = args[0];
var rt_root = root;

if(opts.current_runtime) {
    rt_root = './';
}

var runtime = fs.readFileSync(rt_root + 'runtime.js', 'utf-8');
var runtime_eval = fs.readFileSync(rt_root + 'runtime-eval.js', 'utf-8');
var src = fs.readFileSync(srcfile, 'utf-8');

if(!opts.no_runtime) {
    util.puts(runtime);

    if(opts.with_eval) {
        util.puts(runtime_eval);
    }
}


util.puts(compiler.compile(src, js_generator()));
