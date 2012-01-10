var fs = require('fs');
var ast = require('./ast');

module.exports = function() {
    var code = [];
    function write(src, eol) {
        code.push(src + (eol ? '\n' : ''));
    };

    function write_runtime() {
        var rt = fs.readFileSync('runtime.js', 'utf-8');
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

    function is_throw(node) {
        return node.type == ast.LIST &&
            node.children[0].data == 'throw';
    }

    function parse_expr(parse, parent, node) {
        // Link these nodes for context (big hack)
        link(parent, node, 'expr');
        parse(node);
        unlink(node);
    }
    
    function write_number(node) {
        // NUMBER
        write(node.data);
    }

    function write_string(node) {
        // STRING
        write('"' + node.data + '"');
    }

    function write_term(node) {
        // TERM (variable, keyword, etc)
        var term = node.data;
        term = term.replace(/-/g, '_');
        term = term.replace(/\?/g, 'p');
        write(term);
    }

    function write_symbol(node) {
        // SYMBOL
        write('make_symbol("' + node.data + '")');
    }

    function write_set(node, parse) {
        // var TERM = EXPR;
        write('var ');
        write_set_excl(node, parse);
    }

    function write_set_excl(node, parse) {
        // TERM = EXPR;
        write_term(node.children[1]);
        write(' = ');
        parse(node.children[2]);
        write(';');
    }

    function write_lambda(node, parse) {
        // function(TERM1, TERM2, ...) { EXPR1; EXPR2; ...; return EXPRn; }
        var args_expr = node.children[1];

        if(args_expr.type == ast.LIST) {
            var args = [];

            for(var i=0; i<args_expr.children.length; i++) {
                args.push(args_expr.children[i].data);
            }

            write('function(' + args.join(',') + '){', true);
        }
        else {
            write('function() {', true);
            write('var ' + args_expr.data +
                  ' = Array.slice.call(null, arguments);', true);
        }

        for(var i=2; i<node.children.length; i++) {
            var child = node.children[i];

            if(i == node.children.length-1 &&
               !is_throw(child)) {
                write('return ');
            }
            parse(child);
        }

        write('}', true);
    }

    function write_op(op, node, parse) {
        // (EXPR1 <op> EXPR2 <op> ... <op> EXPRn),
        write('(');
        for(var i=1; i<node.children.length; i++) {
            if(i > 1) {
                write(op);
            }

            parse_expr(parse, node, node.children[i]);            
        }

        write(')');
    }

    function write_func_call(node, parse) {
        if(node.children[0].type == ast.TERM) {
            write_term(node.children[0]);
        }
        else {
            write('(');
            parse_expr(parse, node, node.children[0]);
            write(')');
        }

        write('(');

        for(var i=1; i<node.children.length; i++) {
            if(i>1) {
                write(',');
            }

            parse_expr(parse, node, node.children[i]);
        }

        write(')');

        // if the parent node is not a function call, we should end
        // the expression. this solves ambiguities with the next
        // statement which could be another function call in the form
        // (foo)(x, y, z) where it tries to call the result of this
        // function
        if(!node.link ||
           (node.link && node.link.tag != 'expr')) {
            write(';');
        }
    }

    function write_array(node, parse, quoted) {
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
            write('[');
            for(var i=0; i<node.children.length; i++) {
                if(i > 0) {
                    write(',');
                }

                if(quoted) {
                    write_array(node.children[i], parse, quoted);
                }
                else {
                    parse_expr(parse, node, node.children[i]);
                }
            }
            write(']');
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
            write_op('<', node, parse);
        },

        'if': function (node, parse) {
            // (function() { if(EXPR1) { return EXPR2; } else { return EXPR3; }})()
            write('(function() {');

            write('if(');
            parse_expr(parse, node, node.children[1]);
            write(') { ');

            if(!is_throw(node.children[2])) {
                write('return ');
            }

            parse(node.children[2]);
            write('}');

            if(node.children.length > 3) {
                write(' else { ');

                if(!is_throw(node.children[3])) {
                    write('return ');
                }

                parse(node.children[3]);
                write('}');
            }

            write('})()', true);
        },

        'not': function(node, parse) {
            write('!');
            parse(node.children[1]);
        },

        'require': function(node, parse) {
            for(var i=1; i<node.children.length; i++) {
                var expr = node.children[i];
                var name = expr.children[0].data;
                var path = expr.children[1].data;

                write('var ' + name + ' = ' +
                      'require("' + path + '");', true);
            }
        },

        'string-append': function(node, parse) {
            write_op('+', node, parse);
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
