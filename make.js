var util = require('util');
var fs = require('fs');
var outlet;

var args;
if(process.argv.length > 2 && process.argv[2] == '_boot') {
    outlet = require('./boot/outlet');
    args = process.argv.slice(3);
}
else {
    outlet = require('./outlet');
    args = process.argv.slice(2);
}

for(var i=0; i<args.length; i++) {
    var src = fs.readFileSync(args[i], 'utf-8');
    util.puts(outlet.compile(src, 'js-noeval'));
}
