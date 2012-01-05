var outlet = require('./outlet.js');
var util = require('util');

util.inspect = function(obj) {
    return obj.toSource();
}

function clear() {
    document.getElementById('output').innerHTML = '';
    document.getElementById('result').innerHTML = '';
}

function print_code(code) {
    document.getElementById('output').innerHTML = '<pre>' + code + '</pre>';    
}

function print_result(res) {
    document.getElementById('result').innerHTML = '<pre>' + res + '</pre>';
}

function compile() {
    clear();
    var code;

    try {
        code = outlet.compile(document.getElementById('src').value);
        print_code(code);

        try {
            print_result(eval(code));        
        } catch (x) {
            print_result('error: ' + x.message);
        }
    } catch (x) {
        print_code(x.message);
    }

}
