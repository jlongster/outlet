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
    var util = require('util');

function make_symbol(str) {
    return {
        str: str,
        symbol: true
    };
}

function map(func, arr) {
    var r = [];
    for(var i = 0, len = arr.length; i < len; i++) {
        r.push(func(arr[i]));
    }
    return r;
}

function for_each(func, arr) {
    for(var i = 0, len = arr.length; i < len; i++) {
        func(arr[i]);
    }
}

function display(msg) {
    console.log(msg);
}

function pp(obj) {
    display(inspect(obj));
}

function inspect(obj) {
    return util.inspect(obj, null, 10);
}

function not(v) {
    return (typeof(v) != 'number' &&
            !v);
}

function eq_p_(v1, v2) {
    if(symbol_p_(v1) && symbol_p_(v2)) {
        return v1.str == v2.str;
    }

    return v1 == v2;
}

function equal_p_(v1, v2) {
    if(pair_p_(v1) && pair_p_(v2)) {
        var good = true;        
        for(var i=0, len=v1.length; i<len; i++) {
            good = good && equal_p_(v1[i], v2[i]);
        }
        return good;
    }
    else if(symbol_p_(v1) && symbol_p_(v2)) {
        return v1.str == v2.str;
    }
    return v1 == v2;
}

function null_p_(arr) {
    return arr.length !== undefined && arr.length == 0;
}

function cons(v1, v2) {
    // this is NOT a correct representation for pairs, but will do for
    // now
    if(v2.length) {
        return [v1].concat(v2);
    }
    else {
        return [v1, v2];
    }
}

function car(arr) {
    return arr[0];
}

function cdr(arr) {
    return arr.slice(1);
}

function vector_ref(arr, i) {
    return arr[i];
}

function vector_set_excl_(arr, i, v) {
    arr[i] = v;
}

function vector_concat(arr1, arr2) {
    return arr1.concat(arr2);
}

function vector(v) {
    return [v];
}

function object() {
    return {};
}

function object_ref(obj, key) {
    return obj[key];
}

function number_p_(obj) {
    return typeof obj == 'number';
}

function symbol_p_(obj) {
    return obj && obj.str && obj.symbol;
}

function string_p_(obj) {
    return typeof obj == 'string';
}

function boolean_p_(obj) {
    return obj === true || obj === false;
}

function pair_p_(obj) {
    return obj && typeof obj != 'string' && obj.length;
}

function __gt_string(obj) {
    if(number_p_(obj)) {
        return '' + obj;
    }
    else if(string_p_(obj)) {
        return '"' + obj.replace(/"/g, "\\\"") + '"';
    }
    else if(symbol_p_(obj)) {
        return obj.str;
    }
    else if(boolean_p_(obj)) {
        if(obj) {
            return '#t';
        }
        else {
            return '#f';
        }
    }
    else if(pair_p_(obj)) {
        return '(' + 
            map(function(obj) { return __gt_string(obj); },
                obj).join(' ') +
            ')';
    }
}

function unquote_splice(arr) {
    var res = [], i = 0, len = arr.length, elem;

    while(i < len) {
        elem = arr[i];
        if(elem.please_splice) {
            res = res.concat(unquote_splice(elem.data));
        }
        else {
            res.push(elem);
        }

        i++;
    }

    return res;
}

var reader = require("./parser");
var util = require("util");
var ast = require("./ast");
var grammar = require("./grammar");
var js = require("./compiler-js");
var current_generator = false;var assert = function(v,msg){
return (function() {if(not(v)) { throw(msg);}})()
}
;var assert_type = function(node,type,msg){
return assert((node.type===type),("invalid type, expected "+type+": "+inspect(node)));}
;var parsers = unquote_splice([]);var read = function(src){
return reader(grammar,src,ast.node(ast.ROOT));}
;var set_generator = function(gen){
return current_generator = gen;}
;var create_generator = function(){
return current_generator.create_generator();}
;var parse = function(node,generator){
(function() {if(not(current_generator)) { return current_generator = generator;}})()
return (function() {if(macro_p_(node)) { return parse(expand(node,generator),generator);} else { return (function(parser){
assert(parser,("No parser for node type:"+node.type));return parser(node,function(node){
return parse(node,generator);}
,generator);}
)(vector_ref(parsers,node.type));}})()
}
;var compile = function(src,generator){
parse(read(src),generator);return generator.get_code();}
;var expand = function(node,generator){
return (function(name){
return (function(func){
return (function(src){
return (function(res){
(function() {if(res) { return res.link = node.link;}})()
return res}
)(nodify(src));}
)(func.apply(null,map(sourcify,node.children.slice(1))));}
)(get_macro(name.data.str));}
)(vector_ref(node.children,0));}
;var sourcify = function(node){
return (function() {if(eq_p_(node.type,ast.NUMBER)) { return (function(){
return parseFloat(node.data);}
)();} else { return (function() {if(eq_p_(node.type,ast.TERM)) { return (function(){
return node.data}
)();} else { return (function() {if(eq_p_(node.type,ast.STRING)) { return (function(){
return node.data}
)();} else { return (function() {if(eq_p_(node.type,ast.BOOLEAN)) { return (function(){
return node.data}
)();} else { return (function() {if(eq_p_(node.type,ast.LIST)) { return (function(){
return map(sourcify,node.children);}
)();}})()
}})()
}})()
}})()
}})()
}
;var nodify = function(obj){
return (function() {if(number_p_(obj)) { return (function(){
return ast.node(ast.NUMBER,obj);}
)();} else { return (function() {if(symbol_p_(obj)) { return (function(){
return ast.node(ast.TERM,obj);}
)();} else { return (function() {if(string_p_(obj)) { return (function(){
return ast.node(ast.STRING,obj);}
)();} else { return (function() {if(boolean_p_(obj)) { return (function(){
return ast.node(ast.BOOLEAN,obj);}
)();} else { return (function() {if(pair_p_(obj)) { return (function(){
return ast.node(ast.LIST,null,map(nodify,obj));}
)();} else { return (function() {if(null_p_(obj)) { return (function(){
return ast.node(ast.LIST);}
)();} else { return (function(){
return null}
)();}})()
}})()
}})()
}})()
}})()
}})()
}
;var define_to_lambda = function(node){
return (function(target){
return (function(args,body){
return ast.node(ast.LIST,null,vector_concat(unquote_splice([ast.node(ast.TERM,make_symbol("lambda")),ast.node(ast.LIST,null,args)]),body));}
)(target.children.slice(1),node.children.slice(2));}
)(vector_ref(node.children,1));}
;var define_to_setlambda = function(node){
var target = vector_ref(node.children,1);;var name = null;var expr = null;(function() {if(eq_p_(target.type,ast.LIST)) { return (function(){
name = object_ref(vector_ref(target.children,0),"data");;return expr = define_to_lambda(node);;}
)();} else { return (function(_expr){
name = target.data;return expr = _expr;}
)(vector_ref(node.children,2));}})()
return ast.node(ast.LIST,null,unquote_splice([ast.node(ast.TERM,make_symbol("set")),ast.node(ast.TERM,name),expr]));}
;var macros = object();;var install_macro = function(name,func){
return vector_set_excl_(macros,name,func);}
;var get_macro = function(name){
return vector_ref(macros,name);}
;var macro_p_ = function(node){
return (function() {if((eq_p_(node.type,ast.LIST)&&not(null_p_(node.children)))) { return (function(name){
return (function() {if(eq_p_(name.type,ast.TERM)) { return object_ref(macros,name.data.str);}})()
}
)(vector_ref(node.children,0));}})()
}
;var parse_macro = function(node,generator){
return (function(gen,func_info){
parse(define_to_lambda(node),gen);return (function(name){
return (function(func){
return install_macro(name.data.str,func);}
)(vector_ref(eval(("["+gen.get_code()+"]")),0));}
)(vector_ref(func_info.children,0));}
)(generator.create_generator(),vector_ref(node.children,1));}
;var install_parser = function(type,parser){
return vector_set_excl_(parsers,type,parser);}
;install_parser(ast.NUMBER,function(node,parse,generator){
return generator.write_number(node);}
);install_parser(ast.STRING,function(node,parse,generator){
return generator.write_string(node);}
);install_parser(ast.TERM,function(node,parse,generator){
return generator.write_term(node);}
);install_parser(ast.BOOLEAN,function(node,parse,generator){
return generator.write_boolean(node);}
);install_parser(ast.LIST,function(node,parse,generator){
assert(not(null_p_(node.children)),"invalid form: empty list");var first = vector_ref(node.children,0);;assert((eq_p_(first.type,ast.TERM)||eq_p_(first.type,ast.LIST)),("operator is not a procedure: "+inspect(first)));var term = (first.data&&first.data.str);return (function() {if(equal_p_(term,"set!")) { return (function(){
assert_type(vector_ref(node.children,1),ast.TERM);return generator.write_set_excl(node,parse);}
)();} else { return (function() {if(equal_p_(term,"let")) { return (function(){
return (function(vars,body){
assert_type(vars,ast.LIST);var vars_to_nodes = function(vars,names,exprs){
return (function() {if(null_p_(vars)) { return unquote_splice([names,exprs])} else { return (function(_var){
assert_type(_var,ast.LIST);return (function(name,expr){
assert_type(name,ast.TERM);return vars_to_nodes(cdr(vars),names.concat(unquote_splice([name])),exprs.concat(unquote_splice([expr])));}
)(vector_ref(_var.children,0),vector_ref(_var.children,1));}
)(car(vars));}})()
}
;return (function(nodes){
return (function(lambda_header){
return (function(lambda_node){
return (function(res){
res.link = node.link;return generator.write_func_call(res,parse);}
)(ast.node(ast.LIST,null,vector_concat(vector(lambda_node),vector_ref(nodes,1))));}
)(ast.node(ast.LIST,null,lambda_header.concat(body)));}
)(unquote_splice([ast.node(ast.TERM,make_symbol("lambda")),ast.node(ast.LIST,null,vector_ref(nodes,0))]));}
)(vars_to_nodes(vars.children,unquote_splice([]),unquote_splice([])));}
)(vector_ref(node.children,1),node.children.splice(2));}
)();} else { return (function() {if(equal_p_(term,"lambda")) { return (function(){
var args = vector_ref(node.children,1);;(function() {if(eq_p_(args.type,ast.LIST)) { return for_each(function(n){
return assert_type(n,ast.TERM);}
,args.children);} else { return (function() {if(not(eq_p_(args.type,ast.TERM))) { throw("lambda must have a list of arguments or a binding term");}})()
}})()
return generator.write_lambda(node,parse);}
)();} else { return (function() {if(equal_p_(term,"define")) { return (function(){
return generator.write_set(define_to_setlambda(node),parse);}
)();} else { return (function() {if(equal_p_(term,"define-macro")) { return (function(){
return parse_macro(node,generator);}
)();} else { return (function() {if(equal_p_(term,"quote")) { return (function(){
return generator.write_array(vector_ref(node.children,1),parse,"quote");}
)();} else { return (function() {if(equal_p_(term,"quasiquote")) { return (function(){
return generator.write_array(vector_ref(node.children,1),parse,"quasi");}
)();} else { return (function() {if(equal_p_(term,"list")) { return (function(){
return generator.write_array(ast.node(ast.LIST,null,node.children.slice(1)),parse);}
)();} else { return (function() {if(equal_p_(term,"cond")) { return (function(){
var transform = function(i){
return (function() {if(((i>node.children.length)||eq_p_(i,node.children.length))) { return null} else { return (function(n){
return (function(condition,res){
return (function() {if((eq_p_(condition.type,ast.TERM)&&equal_p_(condition.data.str,"else"))) { return res} else { return ast.add_child(ast.node(ast.LIST,null,unquote_splice([ast.node(ast.TERM,make_symbol("if")),condition,res])),transform((i+1)));}})()
}
)(vector_ref(n.children,0),ast.node(ast.LIST,null,vector_concat(unquote_splice([ast.node(ast.TERM,make_symbol("begin"))]),n.children.slice(1))));}
)(vector_ref(node.children,i));}})()
}
;return (function(res){
res.link = node.link;return parse(res);}
)(transform(1));}
)();} else { return (function() {if(generator.has_hook(term)) { return (function(){
return generator.run_hook(term,node,parse);}
)();} else { return (function(){
return generator.write_func_call(node,parse);}
)();}})()
}})()
}})()
}})()
}})()
}})()
}})()
}})()
}})()
}})()
}
);install_parser(ast.ROOT,function(node,parse){
return for_each(function(n){
return parse(n);}
,node.children);}
);install_macro("begin",function() {
var body = Array.prototype.slice.call(arguments);
return unquote_splice([unquote_splice([make_symbol("lambda"),unquote_splice([]),{ please_splice: true, data: body }])])}
);install_macro("eval_outlet",function(form){
return unquote_splice([make_symbol("let"),unquote_splice([unquote_splice([make_symbol("gen"),unquote_splice([make_symbol("create-generator")])])]),unquote_splice([make_symbol("parse"),unquote_splice([make_symbol("nodify"),form]),make_symbol("gen")]),unquote_splice([make_symbol("eval"),unquote_splice([make_symbol("gen.get_code")])])])}
);module.exports = object();;module.exports.read = read;module.exports.parse = parse;module.exports.compile = compile;module.exports.set_generator = set_generator;module.exports.create_generator = create_generator;module.exports.nodify = nodify;module.exports.sourcify = sourcify;

});

require.define("util", function (require, module, exports, __dirname, __filename) {
    // todo

});

require.define("/parser.js", function (require, module, exports, __dirname, __filename) {
    var util = require('util');

function make_symbol(str) {
    return {
        str: str,
        symbol: true
    };
}

function map(func, arr) {
    var r = [];
    for(var i = 0, len = arr.length; i < len; i++) {
        r.push(func(arr[i]));
    }
    return r;
}

function for_each(func, arr) {
    for(var i = 0, len = arr.length; i < len; i++) {
        func(arr[i]);
    }
}

function display(msg) {
    console.log(msg);
}

function pp(obj) {
    display(inspect(obj));
}

function inspect(obj) {
    return util.inspect(obj, null, 10);
}

function not(v) {
    return (typeof(v) != 'number' &&
            !v);
}

function eq_p_(v1, v2) {
    if(symbol_p_(v1) && symbol_p_(v2)) {
        return v1.str == v2.str;
    }

    return v1 == v2;
}

function equal_p_(v1, v2) {
    if(pair_p_(v1) && pair_p_(v2)) {
        var good = true;        
        for(var i=0, len=v1.length; i<len; i++) {
            good = good && equal_p_(v1[i], v2[i]);
        }
        return good;
    }
    else if(symbol_p_(v1) && symbol_p_(v2)) {
        return v1.str == v2.str;
    }
    return v1 == v2;
}

function null_p_(arr) {
    return arr.length !== undefined && arr.length == 0;
}

function cons(v1, v2) {
    // this is NOT a correct representation for pairs, but will do for
    // now
    if(v2.length) {
        return [v1].concat(v2);
    }
    else {
        return [v1, v2];
    }
}

function car(arr) {
    return arr[0];
}

function cdr(arr) {
    return arr.slice(1);
}

function vector_ref(arr, i) {
    return arr[i];
}

function vector_set_excl_(arr, i, v) {
    arr[i] = v;
}

function vector_concat(arr1, arr2) {
    return arr1.concat(arr2);
}

function vector(v) {
    return [v];
}

function object() {
    return {};
}

function object_ref(obj, key) {
    return obj[key];
}

function number_p_(obj) {
    return typeof obj == 'number';
}

function symbol_p_(obj) {
    return obj && obj.str && obj.symbol;
}

function string_p_(obj) {
    return typeof obj == 'string';
}

function boolean_p_(obj) {
    return obj === true || obj === false;
}

function pair_p_(obj) {
    return obj && typeof obj != 'string' && obj.length;
}

function __gt_string(obj) {
    if(number_p_(obj)) {
        return '' + obj;
    }
    else if(string_p_(obj)) {
        return '"' + obj.replace(/"/g, "\\\"") + '"';
    }
    else if(symbol_p_(obj)) {
        return obj.str;
    }
    else if(boolean_p_(obj)) {
        if(obj) {
            return '#t';
        }
        else {
            return '#f';
        }
    }
    else if(pair_p_(obj)) {
        return '(' + 
            map(function(obj) { return __gt_string(obj); },
                obj).join(' ') +
            ')';
    }
}

function unquote_splice(arr) {
    var res = [], i = 0, len = arr.length, elem;

    while(i < len) {
        elem = arr[i];
        if(elem.please_splice) {
            res = res.concat(unquote_splice(elem.data));
        }
        else {
            res.push(elem);
        }

        i++;
    }

    return res;
}

var parser = function(grammar){
var Y = function(gen){
return (function(f){
return f(f);}
)(function(f){
return gen(function() {
var args = Array.prototype.slice.call(arguments);
return (function(ff){
return ff.apply(null,args);}
)(f(f));}
);}
);}
;var optional = function(func){
return function(text,state){
return (func(text,state)||unquote_splice([text,state]))}
}
;var eof = function(text,state){
return (function() {if(equal_p_(text,"")) { return unquote_splice([text,state])} else { return null}})()
}
;var terminator = function(text,state){
return unquote_splice(["",state])}
;var char = function(alphabet){
return function(text,state){
return (function() {if(((text.length>0)&&(alphabet.indexOf(text.charAt(0))>-1))) { return unquote_splice([text.substr(1),state])} else { return null}})()
}
}
;var not_char = function(alphabet){
return function(text,state){
return (function() {if(((text.length>0)&&eq_p_(alphabet.indexOf(text.charAt(0)),-1))) { return unquote_splice([text.substr(1),state])} else { return null}})()
}
}
;var any = function() {
var args = Array.prototype.slice.call(arguments);
return function(text,state){
var run = function(lst){
return (function() {if(null_p_(lst)) { return null} else { return (function(r){
return (function() {if(r) { return r} else { return run(cdr(lst));}})()
}
)((car(lst))(text,state));}})()
}
;return run(args);}
}
;var all = function() {
var args = Array.prototype.slice.call(arguments);
return function(text,state){
var run = function(lst,r){
return (function() {if(null_p_(lst)) { return r} else { return (function(r){
return (function() {if(not(r)) { return null} else { return run(cdr(lst),r);}})()
}
)((car(lst))(car(r),car(cdr(r))));}})()
}
;return run(args,unquote_splice([text,state]));}
}
;var capture = function(func,hook){
return function(text,state){
return (function(r){
return (function() {if(r) { return (function(t,s){
return unquote_splice([t,hook(text.substr(0,(text.length-t.length)),s)])}
)(car(r),car(cdr(r)));} else { return null}})()
}
)(func(text,state));}
}
;var before = function(func,hook){
return function(text,state){
return func(text,hook(state));}
}
;var after = function(func,hook){
return function(text,state){
return (function(r){
return (function() {if(r) { return unquote_splice([car(r),hook(state,car(cdr(r)))])} else { return null}})()
}
)(func(text,state));}
}
;return grammar(all,any,capture,char,not_char,optional,Y,eof,terminator,before,after);}
;var parse = function(grammar,text,state){
return (function(r){
return (function() {if(r) { return car(cdr(r));} else { return null}})()
}
)((parser(grammar))(text,state));}
;module.exports = parse;

});

require.define("/ast.js", function (require, module, exports, __dirname, __filename) {
    var util = require('util');

var ROOT = -1;
var TERM = 0;
var STRING = 1;
var NUMBER = 2;
var LIST = 3;
var BOOLEAN = 4;

function node(type, data, children) {
    return {
        type: type,
        data: data,
        children: children || []
    };
}

function add_child(parent, child) {
    if(child) {
        return node(parent.type,
                    parent.data,
                    parent.children.concat([child]));
    }
    return parent;
}

function type_str(type) {
    switch(type) {
        case ROOT: return 'root';
        case TERM: return 'term';
        case STRING: return 'string';
        case NUMBER: return 'number';
        case LIST: return 'list';
        case BOOLEAN: return 'boolean';
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

        util.puts(pad + str);
    }

    if(!ast) {
        puts('undefined');
        return;
    }

    var data = '';
    if(ast.data !== null) {
        data = ': ' + util.inspect(ast.data);
    }

    if(ast === undefined || ast === null) {
        puts('NULL');
    }
    else {
        puts(type_str(ast.type) + data);    
    }
    

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
    BOOLEAN: BOOLEAN,

    node: node,
    add_child: add_child,
    pretty_print: pretty_print,
    type_str: type_str
};
});

require.define("/grammar.js", function (require, module, exports, __dirname, __filename) {
    var util = require('util');

function make_symbol(str) {
    return {
        str: str,
        symbol: true
    };
}

function map(func, arr) {
    var r = [];
    for(var i = 0, len = arr.length; i < len; i++) {
        r.push(func(arr[i]));
    }
    return r;
}

function for_each(func, arr) {
    for(var i = 0, len = arr.length; i < len; i++) {
        func(arr[i]);
    }
}

function display(msg) {
    console.log(msg);
}

function pp(obj) {
    display(inspect(obj));
}

function inspect(obj) {
    return util.inspect(obj, null, 10);
}

function not(v) {
    return (typeof(v) != 'number' &&
            !v);
}

function eq_p_(v1, v2) {
    if(symbol_p_(v1) && symbol_p_(v2)) {
        return v1.str == v2.str;
    }

    return v1 == v2;
}

function equal_p_(v1, v2) {
    if(pair_p_(v1) && pair_p_(v2)) {
        var good = true;        
        for(var i=0, len=v1.length; i<len; i++) {
            good = good && equal_p_(v1[i], v2[i]);
        }
        return good;
    }
    else if(symbol_p_(v1) && symbol_p_(v2)) {
        return v1.str == v2.str;
    }
    return v1 == v2;
}

function null_p_(arr) {
    return arr.length !== undefined && arr.length == 0;
}

function cons(v1, v2) {
    // this is NOT a correct representation for pairs, but will do for
    // now
    if(v2.length) {
        return [v1].concat(v2);
    }
    else {
        return [v1, v2];
    }
}

function car(arr) {
    return arr[0];
}

function cdr(arr) {
    return arr.slice(1);
}

function vector_ref(arr, i) {
    return arr[i];
}

function vector_set_excl_(arr, i, v) {
    arr[i] = v;
}

function vector_concat(arr1, arr2) {
    return arr1.concat(arr2);
}

function vector(v) {
    return [v];
}

function object() {
    return {};
}

function object_ref(obj, key) {
    return obj[key];
}

function number_p_(obj) {
    return typeof obj == 'number';
}

function symbol_p_(obj) {
    return obj && obj.str && obj.symbol;
}

function string_p_(obj) {
    return typeof obj == 'string';
}

function boolean_p_(obj) {
    return obj === true || obj === false;
}

function pair_p_(obj) {
    return obj && typeof obj != 'string' && obj.length;
}

function __gt_string(obj) {
    if(number_p_(obj)) {
        return '' + obj;
    }
    else if(string_p_(obj)) {
        return '"' + obj.replace(/"/g, "\\\"") + '"';
    }
    else if(symbol_p_(obj)) {
        return obj.str;
    }
    else if(boolean_p_(obj)) {
        if(obj) {
            return '#t';
        }
        else {
            return '#f';
        }
    }
    else if(pair_p_(obj)) {
        return '(' + 
            map(function(obj) { return __gt_string(obj); },
                obj).join(' ') +
            ')';
    }
}

function unquote_splice(arr) {
    var res = [], i = 0, len = arr.length, elem;

    while(i < len) {
        elem = arr[i];
        if(elem.please_splice) {
            res = res.concat(unquote_splice(elem.data));
        }
        else {
            res.push(elem);
        }

        i++;
    }

    return res;
}

var ast = require("./ast");
var grammar = function(all,any,capture,char,not_char,optional,Y,eof,terminator,before,after){
var repeated = function(rule){
return Y(function(seq){
return any(all(rule,seq),rule);}
);}
;var space_char = " \n\t\r";var space = repeated(char(space_char));;var comment = all(optional(space),char(";"),repeated(not_char("\n")),space);;var number = capture(all(optional(char("-")),repeated(char("1234567890")),optional(all(char("."),repeated(char("1234567890"))))),function(text,state){
return ast.node(ast.NUMBER,text);}
);;var boolean = capture(any(all(char("#"),char("f")),all(char("#"),char("t"))),function(text,state){
return ast.node(ast.BOOLEAN,(function() {if(equal_p_(text,"#f")) { return false} else { return true}})()
);}
);;var string = (function(capt,capt_node,capt_special,init){
var content = any(capt_special(all(char("\\"),not_char(""))),capt(not_char("\"")));;return init(all(char("\""),capt_node(optional(repeated(content))),char("\"")));}
)(function(rule){
return capture(rule,function(buf,state){
return (state+buf)}
);}
,function(rule){
return capture(rule,function(str,state){
return ast.node(ast.STRING,state);}
);}
,function(rule){
return capture(rule,function(str,state){
return (state+(function() {if(equal_p_(str,"\\n")) { return (function(){
return "\n"}
)();} else { return (function() {if(equal_p_(str,"\\t")) { return (function(){
return "\t"}
)();} else { return (function() {if(equal_p_(str,"\\r")) { return (function(){
return "\r"}
)();} else { return (function(){
return str.charAt(1);}
)();}})()
}})()
}})()
)}
);}
,function(rule){
return before(rule,function(state){
return ""}
);}
);;var term = capture(repeated(any(not_char(("()'"+space_char)))),function(buf,s){
return ast.node(ast.TERM,make_symbol(buf));}
);;var elements = function(lst){
var quoting = function(rule){
var capt = function(buf,node){
return (function(special){
return (function(q){
return ast.node(ast.LIST,null,unquote_splice([q,node]));}
)(ast.node(ast.TERM,make_symbol(special)));}
)((function() {if(equal_p_(buf.substring(0,2),",@")) { return (function(){
return "unquote-splicing"}
)();} else { return (function() {if(equal_p_(buf.charAt(0),",")) { return (function(){
return "unquote"}
)();} else { return (function() {if(equal_p_(buf.charAt(0),"'")) { return (function(){
return "quote"}
)();} else { return (function() {if(equal_p_(buf.charAt(0),"`")) { return (function(){
return "quasiquote"}
)();}})()
}})()
}})()
}})()
);}
;return Y(function(q){
return capture(all(any(char("'"),char("`"),all(char(","),char("@")),char(",")),any(q,rule)),capt);}
);}
;return (function(rule){
return any(quoting(rule),rule);}
)(any(lst,number,string,boolean,term));}
;var lst = Y(function(lst){
return before(all(char("("),optional(repeated(any(space,comment,after(elements(lst),function(parent,child){
return ast.add_child(parent,child);}
)))),char(")")),function(state){
return ast.node(ast.LIST);}
);}
);;return repeated(any(space,comment,after(elements(lst),function(root,child){
return ast.node(ast.ROOT,null,root.children.concat(unquote_splice([child])));}
)));}
;module.exports = grammar;

});

require.define("/compiler-js.js", function (require, module, exports, __dirname, __filename) {
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

});

require.define("fs", function (require, module, exports, __dirname, __filename) {
    // nothing to see here... no file methods for the browser

});

require.define("/compiler-lua.js", function (require, module, exports, __dirname, __filename) {
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

});

require.define("/outlet.js", function (require, module, exports, __dirname, __filename) {
    var compiler = require('./compiler');
var js_generator = require('./compiler-js');
var lua_generator = require('./compiler-lua');

module.exports = {
    compile: function(src, target) {
        var gen;
        if(target == 'lua') {
            gen = lua_generator();
        }
        else {
            gen = js_generator();
        }

        gen.write_runtime(target);
        return compiler.compile(src, gen);
    }
};

});
require("/outlet.js");
