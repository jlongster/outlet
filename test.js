var outlet = require('./outlet');
var util = require('util');

util.puts(outlet.compile(require('fs').readFileSync('test.ol', 'utf-8')));
// util.puts(compile(require('fs').readFileSync('test.ol', 'utf-8'), 
//                   require('./compiler-js')()));

