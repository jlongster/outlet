var reader = require('./ext/Parser');
var util = require('util');

var ast = require('./ast');
var grammar = require('./grammar');

var parsers = {};

// util
function assert(v, msg) {
    if(!v) {
        throw msg;        
    }
}

function assert_type(node, type, msg) {
    assert(node.type == type,
           (msg ? '[' + msg + '] ' : '') +
           "invalid type, expected " + type + ": " + inspect(node));
}

function inspect(obj) {
    return util.inspect(obj);
}

// main functions
function read(src) {
    return reader.Parse(reader.Parser(grammar), src);
}

function parse(node, generator) {
    var parser = parsers[node.type];
    assert(parser, "No parser for node type: " + node.type);

    return parser(node, 
                  function(node) { parse(node, generator); },
                  generator);
}

function compile(src, generator) {
    parse(read(src), generator);
    return generator.get_code();
}

// parsing
function install_parser(type, parser) {
    parsers[type] = parser;
}

install_parser(ast.NUMBER, function(node, parse, generator) {
    generator.write_number(node);
});

install_parser(ast.STRING, function(node, parse, generator) {
    generator.write_string(node);
});

install_parser(ast.TERM, function(node, parse, generator) {
    generator.write_term(node);
});

install_parser(ast.LIST, function(node, parse, generator) {
    var hooks = {
        '+': generator.write_plus,
        '-': generator.write_minus,
        '*': generator.write_mult,
        '/': generator.write_divide,
        '=': generator.write_equals,
        'if': generator.write_if
    };

    var first = node.children[0];

    assert(first.type == ast.TERM || first.type == ast.LIST,
           'operator is not a procedure: ' + inspect(first));

    if(first.data == 'set!') {
        assert_type(node.children[1], ast.TERM);
        generator.write_set_excl(node, parse);
    }
    else if(first.data == 'let') {
        // transform a let into an inline lambda
        //
        // (let ((foo 5)
        //       (bar (do-something)))
        //   body ...) ->
        //
        // ((lambda (foo bar)
        //    body ...) 5 (do-something))

        var vars = node.children[1];
        var body = node.children.splice(2);
        assert_type(vars, ast.LIST);

        var args = [];
        var exprs = [];
        for(var i=0; i<vars.children.length; i++) {
            var v = vars.children[i];
            assert_type(v, ast.LIST);

            var name = v.children[0];
            var expr = v.children[1];
            assert_type(name, ast.TERM);
            
            args.push(name);
            exprs.push(expr);
        }

        // make the lambda node
        var lambda = ast.node(ast.LIST, null,
                              [ast.node(ast.TERM, 'lambda'),
                               ast.node(ast.LIST, null, args)].concat(body));

        // call the lambda
        var call = ast.node(ast.LIST, null,
                           [lambda].concat(exprs));
        generator.write_func_call(call, parse);
    }
    else if(first.data == 'lambda') {
        // do some ast structure verification, should look like:
        // (lambda (term1 term2 ...) expr ...)
        var args = node.children[1];
        assert_type(args, ast.LIST);

        for(var i=0; i<args.children.length; i++) {
            assert_type(args.children[i], ast.TERM);
        }

        generator.write_lambda(node, parse);
    }
    else if(first.data == 'define') {
        // define is the same as a set! with an expression, except that the
        // variable doesn't have to exist. Convert it into this: 
        // (set TERM EXPR)
        //
        // Example: (define (foo x y) (+ x y)) ->
        // (set foo (lambda (x y) (+ x y)))

        var target = node.children[1];
        var name, expr;

        if(target.type == ast.LIST) {
            // function definition
            // extract the name and cut it off
            var name = target.children[0].data;
            var args = target.children.slice(1);

            // extract the body
            var body = node.children.slice(2);

            // make a lambda node
            expr = ast.node(ast.LIST, null,
                            [ast.node(ast.TERM, 'lambda'),
                             ast.node(ast.LIST, null, args)].concat(body));
        }
        else if(target.type == ast.TERM) {
            // variable declaration
            name = target.data;
            expr = node.children[2];
        }

        // make the set node
        var set = ast.node(ast.LIST, null,
                           [ast.node(ast.TERM, 'set'),
                            ast.node(ast.TERM, name),
                            expr]);

        generator.write_set(set, parse);
    }
    else if(hooks[first.data]) {
        hooks[first.data](node, parse);
    }
    else {
        generator.write_func_call(node, parse);
    }
});

install_parser(ast.ROOT, function(node, parse) {
    for(var i=0; i<node.children.length; i++) {
        parse(node.children[i]);
    }
});

module.exports = {
    read: read,
    parse: parse,
    compile: compile
}
