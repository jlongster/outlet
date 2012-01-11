var outlet = require('./outlet');
var compiler = require('./compiler');
var ast = require('./ast');
var util = require('util');
var generator = require('./compiler-js')();

var src = require('fs').readFileSync('compiler.ol', 'utf-8');
util.puts(outlet.compile(src, 'nodejs'));