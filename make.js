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

var src = fs.readFileSync(srcfile, 'utf-8');
var js = js_generator();

js['write-runtime'](opts.no_runtime ? 'no-runtime' :
                          (opts.with_eval ?
                           'js' :
                           'js-noeval'),
                      opts.current_runtime ? __dirname : __dirname + '/boot');
util.puts(compiler.compile(src, js));
