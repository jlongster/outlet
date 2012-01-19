var outlet = require('./boot/outlet');
var util = require('util');

var src = require('fs').readFileSync('grammar.ol', 'utf-8');
util.puts(outlet.compile(src, 'js-noeval'));