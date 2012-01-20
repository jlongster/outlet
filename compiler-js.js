var fs = require('fs');
var ast = require('./ast');

function generator() {
    var code = [];
    function write(src, eol) {
        code.push(src + (eol ? '\n' : ''));
    };

    function write_runtime(target) {
        if(target == 'no-runtime') {
            return;
        }

        var rt = fs.readFileSync('runtime.js', 'utf-8');
        write(rt, true);

        if(target != 'js-noeval') {
            rt = fs.readFileSync('runtime-eval.js', 'utf-8');
            write(rt, true);
        }
    }

    function create_generator() {
        return generator();
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
            node.children[0].data &&
            node.children[0].data.str == 'throw';
    }

    function parse_expr(parse, parent, node) {
        // Link these nodes for context (big hack)
        link(parent, node, 'expr');
        parse(node);
        unlink(node);
    }

    function write_boolean(node) {
        if(node.data === true) {
            write('true');
        }
        else {
            write('false');
        }
    }

    function write_number(node) {
        // NUMBER
        write(node.data);
    }

    function write_string(node) {
        // STRING
        var str = node.data;
        str = str.replace(/\\/g, '\\\\');
        str = str.replace(/\n/g, '\\n');
        str = str.replace(/\r/g, '\\r');
        str = str.replace(/\t/g, '\\t');
        str = str.replace(/"/g, '\\"');
        write('"' + str  + '"');
    }

    function write_term(node) {
        // TERM (variable, keyword, etc)
        var term = node.data.str;
        term = term.replace(/-/g, '_');
        term = term.replace(/\?/g, '_p_');
        term = term.replace(/\!/g, '_excl_');
        term = term.replace(/>/g, '_gt_');
        term = term.replace(/</g, '_lt_');
        term = term.replace(/%/g, '_per_');
        write(term);
    }

    function write_symbol(node) {
        // SYMBOL
        write('make_symbol("' + node.data.str + '")');
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
            var capture_name;

            write('function(');

            for(var i=0, len=args_expr.children.length; i<len; i++) {
                var arg = args_expr.children[i];

                // support for dot-style rest arguments
                if(arg.data.str == '.') {
                    var name = args_expr.children[i+1];
                    capture_name = name.data.str;
                    break;
                }
                else {
                    if(i>0) {
                        write(',');
                    }

                    write_term(arg);
                }
            }

            write('){', true);

            if(capture_name) {
                write('var ' + capture_name +
                      ' = Array.prototype.slice.call(arguments, ' +
                      (args_expr.children.length - 2) + ');', true);
            }
        }
        else {
            write('function() {', true);
            write('var ' + args_expr.data.str +
                  ' = Array.prototype.slice.call(arguments);', true);
        }

        for(var i=2, len=node.children.length; i<len; i++) {
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
        for(var i=1, len=node.children.length; i<len; i++) {
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

        for(var i=1, len=node.children.length; i<len; i++) {
            if(i>1) {
                write(',');
            }

            parse_expr(parse, node, node.children[i]);
        }

        write(')');

        // var util = require('util');
        // util.puts(util.inspect(node, false, 4));

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

    function write_array(node, parse, context) {
        // Handle quasiquoting specially here. This is hacky and not
        // the right place to do it, but it works for now.
        if(context == 'quasi') {
            // If it's a list with a term in the front, check if it's
            // an unquote or unquote-splicing and handle it specially
            if(node.type == ast.LIST &&
               node.children[0] &&
               node.children[0].type == ast.TERM) {

                var term = node.children[0];

                if(term.data.str == 'unquote') {
                    parse_expr(parse, node, node.children[1]);
                    return;
                }
                else if(term.data.str == 'unquote-splicing') {
                    var lst = node.children[1];

                    if(lst.type == ast.LIST) {
                        // Splicing should put all the list elements into
                        // the current element
                        for(var i=0, len=lst.children.length; i<len; i++) {
                            if(i > 0) {
                                write(',');
                            }

                            parse_expr(parse, lst, lst.children[i]);
                        }
                    }
                    else if(lst.type == ast.TERM) {
                        // Need to do the splicing at runtime
                        write('{ please_splice: true, data: ' + lst.data.str + ' }');
                    }
                    else {
                        throw ("unquote-splicing expected a list or symbol, got " +
                               ast.type_str(lst.type));
                    }

                    return;
                }
            }
        }

        if(node.type == ast.TERM) {
            if(context == 'quote' || context == 'quasi') {
                write_symbol(node);
            }
            else {
                write_term(node);
            }
        }
        else if(node.type == ast.NUMBER) {
            write_number(node);
        }
        else if(node.type == ast.BOOLEAN) {
            write_boolean(node);
        }
        else if(node.type == ast.STRING) {
            write_string(node);
        }
        else if(node.type == ast.LIST) {
            write('unquote_splice([');
            for(var i=0, len=node.children.length; i<len; i++) {
                if(i > 0) {
                    write(',');
                }

                if(context == 'quote' || context == 'quasi') {
                    write_array(node.children[i], parse, context);
                }
                else {
                    parse_expr(parse, node, node.children[i]);
                }
            }
            write('])');
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

        'and': function(node, parse) {
            write_op('&&', node, parse);
        },

        'or': function(node, parse) {
            write_op('||', node, parse);
        },

        'require': function(node, parse) {
            for(var i=1, len=node.children.length; i<len; i++) {
                var expr = node.children[i];
                var name = expr.children[0];
                var path = expr.children[1];

                write('var ');
                write_term(name);
                write(' = require("' + path.data + '");', true);
            }
        },

        'string-append': function(node, parse) {
            write_op('+', node, parse);
        }
    };

    return {
        create_generator: create_generator,
        has_hook: has_hook,
        run_hook: run_hook,
        write_runtime: write_runtime,
        write_boolean: write_boolean,
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

module.exports = generator;
