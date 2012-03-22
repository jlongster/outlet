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

start_dash_stdin = function(mode) {
    if(mode.str == 'break') {
        util.puts(
            '<div><strong>breakpoint</strong> w/expression:</div>' +
            inspect(
                get_dash_register_dash_contents(current_dash_machine,
                                                { symbol: true, str: "exp" })
            )
        );


        var val = get_dash_register_dash_contents(current_dash_machine,
                                                  { symbol: true, str: "val" });

        util.puts('<p><em>val: ' +
                  inspect_dash_var(val || "undefined") +
                  '</em></p>',
                  'environment');

        var env = inspect_dash_environment();
        env = env.replace(/>/g, '&gt;');
        env = env.replace(/</g, '&lt;');
        util.puts(env, 'environment');
    }
};

stop_dash_stdin = function() {};
prompt_dash_read = function() {};

function step() {
    clear();
    current_dash_machine.proceed();
}

function outlet_display(str, id) {
    var output = document.getElementById(id || 'messages');
    var buffer = output.innerHTML;
    str = str.replace(/ /g, '&nbsp;');
    str = str.replace(/\n/g, '<br />');
    output.innerHTML = buffer + str;
}

function clear() {
    document.getElementById('messages').innerHTML = '';
    document.getElementById('environment').innerHTML = '';
    document.getElementById('result').innerHTML = '';
}

function print_result(res) {
    var el = document.getElementById('result');
    el.innerHTML = '<pre>' + inspect(res) + '</pre>';
}
