var outlet = require('./outlet.js');
var util = require('util');
var fs = require('fs');

util.inspect = function(obj) {
    return obj.toSource();
}

fs.readFileSync = function(src) { return ''; };

var JS = 0;
var LUA = 1;

function clear() {
    document.getElementById('output').innerHTML = '';
    document.getElementById('result').innerHTML = '';
}

function print_code(code) {
    document.getElementById('output').innerHTML = '<pre>' + code + '</pre>';
}

function print_result(res) {
    if(res && res.toSource && typeof(res) == 'object') {
        res = res.toSource();
    }
    document.getElementById('result').innerHTML = '<pre>' + res + '</pre>';
}

function compile() {
    clear();
    var lang = document.getElementById('lang').selectedIndex;
    var code;

    try {
        var src = document.getElementById('src').value;

        if(lang == LUA) {
            code = outlet.compile(src, 'lua');
            print_code(code);
            print_result("can't evaluate non-js languages");
        }
        else {
            code = outlet.compile(src, 'js');
            print_code(code);
            try {
                print_result(eval(code));
            } catch (x) {
                print_result('error: ' + x.message);
            }
        }
    } catch (x) {
        print_code(x.message);
    }

}
