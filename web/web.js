var require = function (file, cwd) {
    var resolved = require.resolve(file, cwd || '/');
    var mod = require.modules[resolved];
    if (!mod) throw new Error(
        'Failed to resolve module ' + file + ', tried ' + resolved
    );
    var res = mod._cached ? mod._cached : mod();
    return res;
}

require.paths = [];
require.modules = {};
require.extensions = [".js",".coffee"];

require._core = {
    'assert': true,
    'events': true,
    'fs': true,
    'path': true,
    'vm': true
};

require.resolve = (function () {
    return function (x, cwd) {
        if (!cwd) cwd = '/';
        
        if (require._core[x]) return x;
        var path = require.modules.path();
        var y = cwd || '.';
        
        if (x.match(/^(?:\.\.?\/|\/)/)) {
            var m = loadAsFileSync(path.resolve(y, x))
                || loadAsDirectorySync(path.resolve(y, x));
            if (m) return m;
        }
        
        var n = loadNodeModulesSync(x, y);
        if (n) return n;
        
        throw new Error("Cannot find module '" + x + "'");
        
        function loadAsFileSync (x) {
            if (require.modules[x]) {
                return x;
            }
            
            for (var i = 0; i < require.extensions.length; i++) {
                var ext = require.extensions[i];
                if (require.modules[x + ext]) return x + ext;
            }
        }
        
        function loadAsDirectorySync (x) {
            x = x.replace(/\/+$/, '');
            var pkgfile = x + '/package.json';
            if (require.modules[pkgfile]) {
                var pkg = require.modules[pkgfile]();
                var b = pkg.browserify;
                if (typeof b === 'object' && b.main) {
                    var m = loadAsFileSync(path.resolve(x, b.main));
                    if (m) return m;
                }
                else if (typeof b === 'string') {
                    var m = loadAsFileSync(path.resolve(x, b));
                    if (m) return m;
                }
                else if (pkg.main) {
                    var m = loadAsFileSync(path.resolve(x, pkg.main));
                    if (m) return m;
                }
            }
            
            return loadAsFileSync(x + '/index');
        }
        
        function loadNodeModulesSync (x, start) {
            var dirs = nodeModulesPathsSync(start);
            for (var i = 0; i < dirs.length; i++) {
                var dir = dirs[i];
                var m = loadAsFileSync(dir + '/' + x);
                if (m) return m;
                var n = loadAsDirectorySync(dir + '/' + x);
                if (n) return n;
            }
            
            var m = loadAsFileSync(x);
            if (m) return m;
        }
        
        function nodeModulesPathsSync (start) {
            var parts;
            if (start === '/') parts = [ '' ];
            else parts = path.normalize(start).split('/');
            
            var dirs = [];
            for (var i = parts.length - 1; i >= 0; i--) {
                if (parts[i] === 'node_modules') continue;
                var dir = parts.slice(0, i + 1).join('/') + '/node_modules';
                dirs.push(dir);
            }
            
            return dirs;
        }
    };
})();

require.alias = function (from, to) {
    var path = require.modules.path();
    var res = null;
    try {
        res = require.resolve(from + '/package.json', '/');
    }
    catch (err) {
        res = require.resolve(from, '/');
    }
    var basedir = path.dirname(res);
    
    var keys = (Object.keys || function (obj) {
        var res = [];
        for (var key in obj) res.push(key)
        return res;
    })(require.modules);
    
    for (var i = 0; i < keys.length; i++) {
        var key = keys[i];
        if (key.slice(0, basedir.length + 1) === basedir + '/') {
            var f = key.slice(basedir.length);
            require.modules[to + f] = require.modules[basedir + f];
        }
        else if (key === basedir) {
            require.modules[to] = require.modules[basedir];
        }
    }
};

require.define = function (filename, fn) {
    var dirname = require._core[filename]
        ? ''
        : require.modules.path().dirname(filename)
    ;
    
    var require_ = function (file) {
        return require(file, dirname)
    };
    require_.resolve = function (name) {
        return require.resolve(name, dirname);
    };
    require_.modules = require.modules;
    require_.define = require.define;
    var module_ = { exports : {} };
    
    require.modules[filename] = function () {
        require.modules[filename]._cached = module_.exports;
        fn.call(
            module_.exports,
            require_,
            module_,
            module_.exports,
            dirname,
            filename
        );
        require.modules[filename]._cached = module_.exports;
        return module_.exports;
    };
};

if (typeof process === 'undefined') process = {};

if (!process.nextTick) process.nextTick = (function () {
    var queue = [];
    var canPost = typeof window !== 'undefined'
        && window.postMessage && window.addEventListener
    ;
    
    if (canPost) {
        window.addEventListener('message', function (ev) {
            if (ev.source === window && ev.data === 'browserify-tick') {
                ev.stopPropagation();
                if (queue.length > 0) {
                    var fn = queue.shift();
                    fn();
                }
            }
        }, true);
    }
    
    return function (fn) {
        if (canPost) {
            queue.push(fn);
            window.postMessage('browserify-tick', '*');
        }
        else setTimeout(fn, 0);
    };
})();

if (!process.title) process.title = 'browser';

if (!process.binding) process.binding = function (name) {
    if (name === 'evals') return require('vm')
    else throw new Error('No such module')
};

if (!process.cwd) process.cwd = function () { return '.' };

require.define("path", function (require, module, exports, __dirname, __filename) {
    function filter (xs, fn) {
    var res = [];
    for (var i = 0; i < xs.length; i++) {
        if (fn(xs[i], i, xs)) res.push(xs[i]);
    }
    return res;
}

// resolves . and .. elements in a path array with directory names there
// must be no slashes, empty elements, or device names (c:\) in the array
// (so also no leading and trailing slashes - it does not distinguish
// relative and absolute paths)
function normalizeArray(parts, allowAboveRoot) {
  // if the path tries to go above the root, `up` ends up > 0
  var up = 0;
  for (var i = parts.length; i >= 0; i--) {
    var last = parts[i];
    if (last == '.') {
      parts.splice(i, 1);
    } else if (last === '..') {
      parts.splice(i, 1);
      up++;
    } else if (up) {
      parts.splice(i, 1);
      up--;
    }
  }

  // if the path is allowed to go above the root, restore leading ..s
  if (allowAboveRoot) {
    for (; up--; up) {
      parts.unshift('..');
    }
  }

  return parts;
}

// Regex to split a filename into [*, dir, basename, ext]
// posix version
var splitPathRe = /^(.+\/(?!$)|\/)?((?:.+?)?(\.[^.]*)?)$/;

// path.resolve([from ...], to)
// posix version
exports.resolve = function() {
var resolvedPath = '',
    resolvedAbsolute = false;

for (var i = arguments.length; i >= -1 && !resolvedAbsolute; i--) {
  var path = (i >= 0)
      ? arguments[i]
      : process.cwd();

  // Skip empty and invalid entries
  if (typeof path !== 'string' || !path) {
    continue;
  }

  resolvedPath = path + '/' + resolvedPath;
  resolvedAbsolute = path.charAt(0) === '/';
}

// At this point the path should be resolved to a full absolute path, but
// handle relative paths to be safe (might happen when process.cwd() fails)

// Normalize the path
resolvedPath = normalizeArray(filter(resolvedPath.split('/'), function(p) {
    return !!p;
  }), !resolvedAbsolute).join('/');

  return ((resolvedAbsolute ? '/' : '') + resolvedPath) || '.';
};

// path.normalize(path)
// posix version
exports.normalize = function(path) {
var isAbsolute = path.charAt(0) === '/',
    trailingSlash = path.slice(-1) === '/';

// Normalize the path
path = normalizeArray(filter(path.split('/'), function(p) {
    return !!p;
  }), !isAbsolute).join('/');

  if (!path && !isAbsolute) {
    path = '.';
  }
  if (path && trailingSlash) {
    path += '/';
  }
  
  return (isAbsolute ? '/' : '') + path;
};


// posix version
exports.join = function() {
  var paths = Array.prototype.slice.call(arguments, 0);
  return exports.normalize(filter(paths, function(p, index) {
    return p && typeof p === 'string';
  }).join('/'));
};


exports.dirname = function(path) {
  var dir = splitPathRe.exec(path)[1] || '';
  var isWindows = false;
  if (!dir) {
    // No dirname
    return '.';
  } else if (dir.length === 1 ||
      (isWindows && dir.length <= 3 && dir.charAt(1) === ':')) {
    // It is just a slash or a drive letter with a slash
    return dir;
  } else {
    // It is a full dirname, strip trailing slash
    return dir.substring(0, dir.length - 1);
  }
};


exports.basename = function(path, ext) {
  var f = splitPathRe.exec(path)[2] || '';
  // TODO: make this comparison case-insensitive on windows?
  if (ext && f.substr(-1 * ext.length) === ext) {
    f = f.substr(0, f.length - ext.length);
  }
  return f;
};


exports.extname = function(path) {
  return splitPathRe.exec(path)[3] || '';
};

});

require.define("/compiler.js", function (require, module, exports, __dirname, __filename) {
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

});

require.define("/ext/Parser.js", function (require, module, exports, __dirname, __filename) {
    // https://raw.github.com/oleganza/iovm2/master/ecma-engine/Parser.js

var Parser = function(grammar)
{
  var toArray = function(args) {
    var arr = []
    for (var i = 0; i < args.length; i++) arr.push(args[i])
    return arr
  }
  
  // The Y Combinator
  var Y = function (gen) {
    return (function(f) {return f(f)})(
      function(f) {
        return gen(function() {return f(f).apply(null, arguments)})
      }
    )
  }
  
  var Optional = function(func)
  {
    return function(text, state) {
      return func(text, state) || [text, state]
    }
  }
  
  var EOF = function(text, state) { // matches the end of the text
    return (text == "" ? [text, state] : null)
  }
  
  var Terminator = function(text, state) { // terminates scanner (possibly in the middle of the text)
    return ["", state]
  }
  
  var Char = function(alphabet)
  {
    return function(text, state) {
      return ((text.length > 0 && alphabet.indexOf(text.charAt(0)) > -1) ? [text.substr(1), state] : null)
    }
  }
  
  var NotChar = function(alphabet)
  {
    return function(text, state) {
      return ((text.length > 0 && alphabet.indexOf(text.charAt(0)) == -1) ? [text.substr(1), state] : null)
    }
  }
  
  var Any = function()
  {
    var args = toArray(arguments)
    return function(text, state) {
      var r = null
      for (var i in args)
      {
        r = args[i](text, state)
        if (r) 
        {
          return r
        }
      }
      return null
    }
  }
  
  var All = function()
  {
    var args = toArray(arguments)
    return function(text, state) {
      var r = null
      for (var i in args)
      {
        r = args[i](text, state)
        if (!r) return r
        text  = r[0]
        state = r[1]
      }
      return [text, state]
    }
  }
  
  // hook: function(buffer, state) { return state }
  var Capture = function(func, hook)
  {
    return function(text, state)
    {
      var r = func(text, state)
      if (r) {
        var t = r[0]
        var s = r[1]
        return [t, hook(text.substr(0, text.length - t.length), s)]
      }
      return r
    }
  }

  // hook: function(state1) { return state2 }
  var Before = function(func, hook)
  {
    return function(text, state) {
      return func(text, hook(state))
    }
  }
  
  // hook: function(state1, state2) { return state3 }
  var After = function(func, hook)
  {
    return function(text, state) {
      var r = func(text, state)
      return r && [r[0], hook(state, r[1])]
    }
  }
  
  return grammar(All, Any, Capture, Char, NotChar, Optional, Y, EOF, Terminator, Before, After)
}

var Parse = function(parser, text, state)
{
  var r = parser(text, state)
  return r && r[1]
}

module.exports = {
    Parse: Parse,
    Parser: Parser
};

});

require.define("util", function (require, module, exports, __dirname, __filename) {
    // todo

});

require.define("/ast.js", function (require, module, exports, __dirname, __filename) {
    
var ROOT = -1;
var TERM = 0;
var STRING = 1;
var NUMBER = 2;
var LIST = 3;

function node(type, data, children) {
    return {
        type: type,
        data: data,
        children: children || []
    };
}

function add_child(parent, child) {
    return node(parent.type,
                parent.data,
                parent.children.concat([child]));
}

function type_str(type) {
    switch(type) {
        case ROOT: return 'root';
        case TERM: return 'term';
        case STRING: return 'string';
        case NUMBER: return 'number';
        case LIST: return 'list';
    }
    return 'unknown';
}

function pretty_print(ast, indent) {
    indent = indent || 0;

    function puts(str) {
        var pad = (new Array(indent+1)).join('-');
        if(indent > 0) {
            pad += ' ';
        }

        //sys.puts(pad + str);
    }

    var data = '';
    if(ast.type == TERM || ast.type == STRING || ast.type == NUMBER) {
        data = ': ' + util.inspect(ast.data);
    }

    puts(type_str(ast.type) + data);

    for(var i=0; i<ast.children.length; i++) {
        pretty_print(ast.children[i], indent+2);
    }
}

module.exports = {
    ROOT: ROOT,
    TERM: TERM,
    NUMBER: NUMBER,
    STRING: STRING,
    LIST: LIST,

    node: node,
    add_child: add_child,
    pretty_print: pretty_print
};
});

require.define("/grammar.js", function (require, module, exports, __dirname, __filename) {
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
});

require.define("/compiler-js.js", function (require, module, exports, __dirname, __filename) {
    
module.exports = function() {
    var code = [];
    function write(src, eol) {
        code.push(src + (eol ? '\n' : ''));
    };

    function link(node1, node2, tag) {
        node2.link = node1;
        node1.tag = tag;
    }

    function unlink(node) {
        node.link = null;
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
        write(node.data);
    }

    function write_set(node, parse) {
        // var TERM = EXPR;
        write('var ');
        write_set_excl(node, parse);
    }

    function write_set_excl(node, parse) {
        // TERM = EXPR;
        write(node.children[1].data + ' = ');
        parse(node.children[2]);
        write(';');
    }

    function write_lambda(node, parse) {
        // function(TERM1, TERM2, ...) { EXPR1; EXPR2; ...; return EXPRn; }
        var lst = node.children[1];
        var args = [];

        for(var i=0; i<lst.children.length; i++) {
            args.push(lst.children[i].data);
        }

        write('function(' + args.join(',') + '){', true);

        for(var i=2; i<node.children.length; i++) {
            if(i == node.children.length-1) {
                write('return ');
            }
            parse(node.children[i]);
        }

        write('}', true);
    }

    function write_if(node, parse) {
        // (function() { if(EXPR1) { return EXPR2; } else { return EXPR3; }})()
        write('(function() {');

        write('if(');
        parse(node.children[1]);
        write(') { return ');
        parse(node.children[2]);
        write(';}');

        if(node.children.length > 3) {
            write(' else { return ');
            parse(node.children[3]);
            write(';}');
        }

        write('})()', true);
    }

    function write_op(op, node, parse) {
        // (EXPR1 <op> EXPR2 <op> ... <op> EXPRn),
        write('(');
        for(var i=1; i<node.children.length; i++) {
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

    function write_plus(node, parse) {
        write_op('+', node, parse);
    }

    function write_minus(node, parse) {
        write_op('-', node, parse);
    }

    function write_mult(node, parse) {
        write_op('*', node, parse);
    }

    function write_divide(node, parse) {
        write_op('/', node, parse);
    }

    function write_equals(node, parse) {
        write_op('==', node, parse);
    }

    function write_func_call(node, parse) {
        write('(');
        parse(node.children[0]);
        write(')(');

        for(var i=1; i<node.children.length; i++) {
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

    return {
        write_number: write_number,
        write_string: write_string,
        write_term: write_term,
        write_set: write_set,
        write_set_excl: write_set_excl,
        write_lambda: write_lambda,
        write_if: write_if,
        write_plus: write_plus,
        write_minus: write_minus,
        write_mult: write_mult,
        write_divide: write_divide,
        write_equals: write_equals,
        write_func_call: write_func_call,

        get_code: function() {
            return code.join('');
        }
    };
};

});

require.define("/outlet.js", function (require, module, exports, __dirname, __filename) {
    var compiler = require('./compiler');
var js_generator = require('./compiler-js');

module.exports = {
    compile: function(src) {
        return compiler.compile(src, js_generator());
    }
};

});
require("/outlet.js");
