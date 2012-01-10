var ast = require('./ast');

function grammar(All, Any, Capture, Char, NotChar, Optional, Y, EOF, Terminator, Before, After) {
    var Repeated = function(rule) {
        return Y(function(seq){
            return Any(All(rule, seq), rule);
        });
    };

    var space_char = " \t\n\r";
    var space = Repeated(Char(space_char));

    // For comments, there might be space before it, at least one
    // semicolon, eat all text up to the newline, then eat all the
    // space after it up to the next element
    var comment = All(Optional(space),
                      Char(';'),
                      Repeated(NotChar("\n")),
                      space);

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
        return Capture(Repeated(NotChar("()'" + space_char)),
                       function(buf, s) { return ast.node(ast.TERM, buf); });
    })();


    // match any possible element, must pass in the lst rule
    function elements(lst) {
        function capture_quoted(buf, node) {
            // add a "quote" term
            var quote = ast.node(ast.TERM, 'quote');
            return ast.node(ast.LIST,
                            null,
                            [quote, node]);
        }

        var rule = Any(lst, number, string, term);

        // also match quoted elements, inserted a quote term if matched
        return Any(Capture(All(Char("'"), rule), capture_quoted),
                   rule);
    }

    var list = Y(function(list) {
        return Before(
            All(Char("("),
                Repeated(Any(space,
                             comment,
                             After(elements(list),
                                   function(parent, child) {
                                       return ast.add_child(parent, child);
                                   }))),
                Char(")")),
            function(state) { return ast.node(ast.LIST); }
        );
    });

    return Repeated(Any(space,
                        comment,
                        After(elements(list),
                              function(root, child) {
                                  return ast.node(ast.ROOT,
                                                  null,
                                                  root.children.concat([child]));
                              })));
};

module.exports = grammar;

// var reader = require('./ext/Parser');
// ast.pretty_print(reader.Parse(reader.Parser(grammar), "(define a '(one wo three))"));
