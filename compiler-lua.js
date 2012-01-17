var fs = require('fs');
var ast = require('./ast');

module.exports = function() {
    var code = [];
    function write(src, eol) {
        code.push(src + (eol ? '\n' : ''));
    };

    function write_runtime() {
        var rt = fs.readFileSync('runtime.lua', 'utf-8');
        write(rt, true);
    }

    function link(node1, node2, tag) {
        node2.link = node1;
        node1.tag = tag;
    }

    function unlink(node) {
        node.link = null;
    }

    function has_hook(name) {
        return !!hooks[name];
    }

    function run_hook(name, node, parse) {
        hooks[name](node, parse);
    }

    function write_number(node) {
        write(node.data);
    }

    function write_string(node) {
        write('"' + node.data + '"');
    }

    function write_term(node) {
        write(node.data.replace(/-/g, '_'));
    }

    function write_symbol(node) {
        write('make_symbol("' + node.data + '")');
    }

    function write_set(node, parse) {
        write('local ');
        write_set_excl(node, parse);
    }

    function write_set_excl(node, parse) {
        write(node.children[1].data + ' = ');
        parse(node.children[2]);
        write(';');
    }

    function write_lambda(node, parse) {
        var lst = node.children[1];
        var args = [];

        for(var i=0, len=lst.children.length; i<len; i++) {
            args.push(lst.children[i].data);
        }

        write('function(' + args.join(',') + ')', true);

        for(var i=2, len=node.children.length; i<len; i++) {
            if(i == node.children.length-1) {
                write('return ');
            }
            parse(node.children[i]);
        }

        write(' end', true);

    }

    function write_op(op, node, parse) {
        // (EXPR1 <op> EXPR2 <op> ... <op> EXPRn),
        write('(');
        for(var i=1, len=node.children.length; i<len; i++) {
            if(i > 1) {
                write(op);
            }

            // Link these nodes for context (big hack)
            var arg = node.children[i];
            link(node, arg, 'expr');
            parse(arg);
            unlink(arg);
        }

        write(')');
    }

    function write_func_call(node, parse) {
        write('(');
        parse(node.children[0]);
        write(')(');

        for(var i=1, len=node.children.length; i<len; i++) {
            if(i>1) {
                write(',');
            }

            var arg = node.children[i];

            // Link these nodes for context (big hack)
            link(node, arg, 'expr');
            parse(arg);

            // Unlink it to avoid circular references
            unlink(arg);
        }

        write(')');

        // If the parent node is not a function call, we should end
        // the expression
        if(!node.link ||
           (node.link && node.link.tag != 'expr')) {
            write(';');
        }
    }

    function write_array(node, quoted) {
        if(node.type == ast.TERM) {
            if(quoted) {
                write_symbol(node);
            }
            else {
                write_term(node);
            }
        }
        else if(node.type == ast.NUMBER) {
            write_number(node);
        }
        else if(node.type == ast.STRING) {
            write_string(node);
        }
        else if(node.type == ast.LIST) {
            write('{');
            for(var i=0, len=node.children.length; i<len; i++) {
                if(i > 0) {
                    write(',');
                }
                write_array(node.children[i], quoted);
            }
            write('}');
        }
    }

    var hooks = {
        '+': function(node, parse) {
            write_op('+', node, parse);
        },

        '-': function(node, parse) {
            write_op('-', node, parse);
        },

        '*': function(node, parse) {
            write_op('*', node, parse);
        },

        '/': function(node, parse) {
            write_op('/', node, parse);
        },

        '=': function(node, parse) {
            write_op('===', node, parse);
        },

        '>': function(node, parse) {
            write_op('>', node, parse);
        },

        '<': function(node, parse) {
            write_op('<', node, parse)
        },

        'if': function (node, parse) {
            write('(function()');

            write('if ');
            parse(node.children[1]);
            write(' then return ');
            parse(node.children[2]);

            if(node.children.length > 3) {
                write(' else return ');
                parse(node.children[3]);
            }

            write(' end');
            write(' end)()', true);
        },

        'throw': function(node, parse) {
            write('error(');
            parse(node);
            write(')');
        },

        'require': function(node, parse) {
            for(var i=1, len=node.children.length; i<len; i++) {
                var expr = node.children[i];
                var name = expr.children[0].data;
                var path = expr.children[1].data;

                write(name + ' = ' +
                      'require("' + path + '");', true);
            }
        },

        'not': function(node, parse) {
            write('not ');
            parse(node);
        },

        'string-append': function(node, parse) {
            write_op(' .. ', node, parse);
        }
    };

    return {
        has_hook: has_hook,
        run_hook: run_hook,
        write_runtime: write_runtime,
        write_number: write_number,
        write_string: write_string,
        write_term: write_term,
        write_set: write_set,
        write_set_excl: write_set_excl,
        write_lambda: write_lambda,
        write_func_call: write_func_call,
        write_array: write_array,
        write_symbol: write_symbol,

        get_code: function() {
            return code.join('');
        }
    };
};
