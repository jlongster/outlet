var machine = require('./machine');
var fs = require('fs');

fs.readFileSync = function(src) {
    return '1';
};

machine['set-stdin-handler!'] = (function() {
    outlet_display(
        '<div><strong>breakpoint</strong> w/expression:</div>' +
            inspect(
                machine.get_dash_register_dash_contents(machine.instance(),
                                                        { symbol: true, str: "exp" })
            )
    );

    var env = machine.inspect_dash_environment();
    env = env.replace(/>/g, '&gt;');
    env = env.replace(/</g, '&lt;');
    outlet_display(env, 'environment');
});

function step() {
    clear();
    machine.instance().proceed();
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
