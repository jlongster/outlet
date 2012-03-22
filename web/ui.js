var util = require('util');
util.inspect = function(obj) {
    return obj && obj.toSource();
};
util.print = outlet_display;
util.puts = outlet_display;

var compiler = require('./compiler.js');
var js = require('./js.js');
var fs = require('fs');

fs.readFileSync = function(src) {
    return '1';
};

start_dash_stdin = function() {};
stop_dash_stdin = function() {};
prompt_dash_read = function() {};

function outlet_display(str) {
    var output = document.getElementById('output');
    var buffer = output.innerHTML;
    output.innerHTML = buffer + ('' + str).replace(/\n/g, '<br />');
}

var JS = 0;
var LUA = 1;

function clear() {
    document.getElementById('generated').innerHTML = '';
    document.getElementById('output').innerHTML = '';
    document.getElementById('result').innerHTML = '';
}

function print_code(code) {
    document.getElementById('generated').innerHTML = '<pre>' + code + '</pre>';
}

function print_result(res) {
    if(res && res.toSource && typeof(res) == 'object') {
        res = res.toSource();
    }
    document.getElementById('result').innerHTML = '<pre>' + res + '</pre>';
}

function compile() {
    clear();
    var lang_el = document.getElementById('lang');
    var lang = lang_el && lang_el.selectedIndex;
    var code;

    try {
        var src = document.getElementById('src').value;

        code = compiler.compile(src, js());
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

function get_query() {
    if(window.location.search) {
        var q = window.location.search.substring(1);
        var p = q.split('&');
        var obj = {};

        for(var i=0, len=p.length; i<len; i++) {
            var kv = p[i].split('=');
            obj[kv[0]] = kv[1];
        }
        
        return obj;
    }
    return {};
};

function fill_code() {
    var src = document.getElementById('src');
    var q = get_query();

    if(q.code) {
        src.value = unescape(q.code);
    }
}

function share() {
    var src = document.getElementById('src').value;
    alert('Copy the URL to share this program');
    window.location.search = '?code=' + escape(src);
}