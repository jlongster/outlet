var ast = require('./ast');

module.exports = function (All, Any, Capture, Char, NotChar, Optional, Y, EOF, Terminator, Before, After) {
    var Repeated = function(rule) {
        return Y(function(seq){
            return Any(All(rule, seq), rule);
        });
    };

    var space = Repeated(Char(" \t\n\r"));

    var number = (function() {
        var digit = Char("1234567890");
        var digits = Repeated(digit);

        function capture(text, state) {
            return ast.node(ast.NUMBER, text);
        }

        return Capture(digits, capture);
    })();

    var string = (function() {
        function capture(rule) {
            return Capture(rule, function(buf, state) { return state + buf; });
        }

        function capture_node(rule) {
            return Capture(rule, function(str, state) { return ast.node(ast.STRING, str); });
        }

        function init(rule) {
            return Before(rule, function(state) { return ''; });
        }
        
        var content = Any(
            All(Char("\\"), capture(NotChar(""))),
            capture(NotChar("\""))
        );

        return init(All(Char('"'),
                        capture_node(Optional(Repeated(content))),
                        Char('"')));
    })();

    var term = (function() {
        return Capture(Repeated(NotChar("() ")),
                       function(buf, s) { return ast.node(ast.TERM, buf); });
    })();

    var list = Y(function(list) {
        return Before(
            All(Char("("),
                Repeated(All(After(Any(list, number, string, term),
                                   function(parent, child) {
                                       return ast.add_child(parent, child);
                                   }),
                             Optional(space))),
                Char(")")),
            function(state) { return ast.node(ast.LIST); }
        );
    });

    return Before(Repeated(All(Optional(space),
                               After(Any(list, number, string),
                                     function(root, child) { 
                                         return ast.node(ast.ROOT,
                                                         null,
                                                         root.children.concat([child]));
                                     }),
                               Optional(space))),
                  function(state) { return ast.node(ast.ROOT); });
};