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

require.define("util", function (require, module, exports, __dirname, __filename) {
    // todo

});

require.define("fs", function (require, module, exports, __dirname, __filename) {
    // nothing to see here... no file methods for the browser

});

require.define("/parser.js", function (require, module, exports, __dirname, __filename) {
    var __util = require('util');

var _emptylst = [null];

function string_dash__gt_symbol(str) {
    str = str.replace(/-/g, '_dash_');
    str = str.replace(/\?/g, '_p_');
    str = str.replace(/\!/g, '_excl_');
    str = str.replace(/>/g, '_gt_');
    str = str.replace(/</g, '_lt_');
    str = str.replace(/%/g, '_per_');

    return {
        str: str,
        symbol: true
    };
}

function map(func, lst) {
    if(null_p_(lst)) {
        return _emptylst;
    }
    else {
        return cons(func(car(lst)),
                    map(func, cdr(lst)));
    }
}

function for_dash_each(func, lst) {
    if(!null_p_(lst)) {
        func(car(lst));
        for_dash_each(func, cdr(lst));
    }
}

function make_dash_vector(i) {
    return new Array(i);
}

function vector_dash_map(func, vec) {
    var res = [];

    for(var i=0, len=vec.length; i<len; i++) {
        res.push(func(vec[i]));
    }

    return res;
}

function vector_dash_for_dash_each(func, vec) {
    for(var i=0, len=vec.length; i<len; i++) {
        func(vec[i]);
    }
}

function display(msg) {
    __util.print(msg);
}

function pp(obj) {
    display(inspect(obj) + '\n');
}

function inspect(obj) {
    return __util.inspect(obj, null, 50);
}

function not(v) {
    return (typeof(v) != 'number' &&
            !v);
}

function eq_p_(v1, v2) {
    if(symbol_p_(v1) && symbol_p_(v2)) {
        return v1.str == v2.str;
    }

    return v1 === v2;
}

function equal_p_(v1, v2) {    
    if(list_p_(v1) && list_p_(v2)) {
        function l(lst1, lst2) {
            var n1 = null_p_(lst1);
            var n2 = null_p_(lst2);

            if(n1 && n2) {
                return true;
            }
            else if(n1 || n2) {
                return false
            }
            else if(equal_p_(car(lst1), car(lst2))) {
                return l(cdr(lst1), cdr(lst2));
            }

            return false;
        }

        return l(v1, v2);
    }
    else if(vector_p_(v1) && vector_p_(v2)) {
        for(var i=0, len=v1.length; i<len; i++) {
            if(!equal_p_(v1[i], v2[i])) {
                return false;
            }
        }
        return true;
    }
    else if(dict_p_(v1) && dict_p_(v2)) {
        for(var k in v1) {
            if(!equal_p_(v1[k], v2[k])) {
                return false;
            }
        }
        return true;
    }
    else if(symbol_p_(v1) && symbol_p_(v2)) {
        return v1.str == v2.str;
    }

    return v1 == v2;
}

function null_p_(arr) {
    return (arr &&
            arr.length !== undefined &&
            arr.length === 1 &&
            arr[0] === null);
}

function cons(v1, v2) {
    var lst = [v1, v2];
    lst.list = true;
    return lst;
}

function car(arr) {
    return arr[0];
}

function cdr(arr) {
    return arr[1];
}

function cadr(lst) {
    return car(cdr(lst));
}

function cddr(lst) {
    return cdr(cdr(lst));
}

function caddr(lst) {
    return car(cdr(cdr(lst)));
}

function cdddr(lst) {
    return cdr(cdr(cdr(lst)));
}

function cadddr(lst) {
    return car(cdr(cdr(cdr(lst))));
}

function cddddr(lst) {
    return cdr(cdr(cdr(cdr(lst))));
}

function length(lst) {
    var i=0;
    for_dash_each(function(obj) { i++; },
                  lst);
    return i;
}

function reverse(lst) {
    if(null_p_(lst)) {
        return _emptylst;
    }
    return list_dash_append(reverse(cdr(lst)), list(car(lst)));
}

function make_dash_list(arr) {
    arr.list = true;
    return arr;
}

function list() {
    return vector_dash_to_dash_list(
        Array.prototype.slice.call(arguments)
    );
}

function vector_dash_to_dash_list(vec) {
    function l(v, i) {
        if(i < v.length) {
            return cons(v[i], l(v, i+1));
        }
        else {
            return _emptylst;
        }
    }

    return l(vec, 0);
}

function list_dash_to_dash_vector(lst) {
    var res = [];

    function m(lst) {
        if(!null_p_(lst)) {
            res.push(car(lst));
            m(cdr(lst));
        }
    };

    m(lst);
    return res;
}

function vector_dash_ref(arr, i) {
    return arr[i];
}

function vector_dash_set_excl_(arr, i, v) {
    arr[i] = v;
}

function vector_dash_concat(arr1, arr2) {
    return arr1.concat(arr2);
}

function vector() {
    return Array.prototype.slice.call(arguments);
}

function vector_dash_push(vec, val) {
    vec.push(val);
}

function dict() {
    var keyvals = Array.prototype.slice.call(arguments);
    var res = {};

    for(var i=0, len=keyvals.length; i<len; i+=2) {
        var key = keyvals[i];

        if(key.str) {
            key = key.str;
        }

        res[key] = keyvals[i+1];
    }

    return res;
}

var hash_dash_map = dict;


function dict_dash_map(func, dict) {
    var res = {};
    for(var k in dict) {
        res[k] = func(dict[k]);
    }
    return res;
}

var hash_dash_map_dash_map = dict_dash_map;

function hash_dash_map_dash_to_dash_vec(obj) {
    var res = [];
    for(var k in obj) {
        res.push(vector_to_list([string_dash__gt_symbol('quote'),
                                 string_dash__gt_symbol(k)]));
        res.push(obj[k]);
    }
    return res;
}

function dict_dash_to_dash_list(dict) {
    var res = [];
    for(var k in dict) {
        res.push(string_dash__gt_symbol(k));
        res.push(dict[k]);
    }
    return vector_dash_to_dash_list(res);
}

function keys(dict) {
    var res = [];
    for(var k in dict) {
        res.push(k);
    }
    return vector_dash_to_dash_list(res);
}

function vals(dict) {
    var res = [];
    for(var k in dict) {
        res.push(dict[k]);
    }
    return vector_dash_to_dash_list(res);
}

function zip(keys, vals) {
    var obj = {};
    for(var i=0, len=keys.length; i<len; i++) {
        obj[keys[i]] = vals[i];
    }
    return obj;
}

function object_dash_ref(obj, key) {
    return obj[key];
}

function number_p_(obj) {
    return typeof obj == 'number';
}

function symbol_p_(obj) {
    return obj && obj.str != undefined && obj.symbol != undefined;
}

function string_p_(obj) {
    return typeof obj == 'string';
}

function boolean_p_(obj) {
    return obj === true || obj === false;
}

function list_p_(obj) {
    return obj && obj.list !== undefined;
}

function vector_p_(obj) {
    var v = (obj && typeof obj == 'object' && obj.length !== undefined);
    return !list_p_(obj) && !null_p_(obj) && v;
}

function dict_p_(obj) {
    var d = (obj && typeof obj == 'object' && obj.length === undefined);
    return !symbol_p_(obj) && d;
}

function _dash__gt_string(obj) {
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
    else if(list_p_(obj)) {
        return '(' + 
            map(function(obj) { return _dash__gt_string(obj); },
                obj).join(' ') +
            ')';
    }
    else if(vector_p_(obj)) {
        return '[' +
            vector_dash_map(function(obj) { return _dash__gt_string(obj); },
                       obj).join(' ') +
            ']';
    }
    else if(dict_p_(obj)) {
        var res = [];
        for(var k in obj) {
            res.push(k + ': ' + __util.inspect(obj[k], null, 10));
        }
        return '{' + res.join(', ') + '}';
    }
}

function list_dash_append(lst1, lst2) {
    function loop(lst) {
        if(null_p_(lst)) {
            return lst2;
        }
        else {
            return cons(car(lst), loop(cdr(lst)));
        }
    };

    if(null_p_(lst1)) {
        return lst2;
    }
    else {
        return loop(lst1);
    }
}

function string_dash_append() {
    return Array.prototype.slice.call(arguments).join('');
}

function unquote_splice(lst) {
    // if(!lst.length || lst.length != 2 || lst[1].length === undefined) {
    //     return lst;
    // }

    if(null_p_(lst)) {
        return _emptylst;
    }
    else {
        var elem = car(lst);
        var rest = unquote_splice(cdr(lst));

        if(elem.please_splice) {
            if(!list_p_(elem.data) && !null_p_(elem.data)) {
                throw ("Lists can only splice lists, unexpected object: " +
                       __gt_string(elem.data));
            }

            // do we need to unquote_splice elem.data?
            return list_dash_append(elem.data, rest);
        }
        else {
            return cons(elem, rest);
        }
    }
}

function unquote_splice_vec(vec) {
    var ret = [];
    for(var i=0, len=vec.length; i<len; i++) {
        var obj = vec[i];

        if(obj && obj.please_splice) {
            if(!vector_p_(obj.data)) {
                throw ("Vectors can only splice vectors, unexpected object: " +
                       obj.data);
            }
            ret = ret.concat(obj.data);
        }
        else {
            ret.push(obj);
        }
    }

    return ret;
}

function unquote_splice_map(obj) {
    // this is expensive, but I don't really care. this will all be
    // rewritten soon enough anyway.
    var res = {};

    for(var k in obj) {
        var prop = obj[k];
        if(prop && prop.please_splice) {
            if(!dict_p_(prop.data)) {
                throw ("Maps can only splice maps, unexpected object: " +
                       prop.data);
            }

            for(j in prop.data) {
                res[j] = prop.data[j];
            }
        }
        else if(k != '__unquote_splicing') {
            res[k] = prop;
        }
    }

    return res;
}
((function() {var parser = (function(grammar){
var Y = (function(gen){
return ((function(f){
return f(f);
}))((function(f){
return gen((function() {
var args = vector_dash_to_dash_list(Array.prototype.slice.call(arguments));
return ((function(ff){
return ff.apply(null,list_dash_to_dash_vector(args));
}))(f(f));
}));
}));
});
var optional = (function(func){
return (function(text,state){
return (func(text,state) || vector(text,state));
});
});
var eof = (function(text,state){
return (function() {if(equal_p_(text,"")) {return vector(text,state);
} else {return null;
}})()
;
});
var terminator = (function(text,state){
return vector("",state);
});
var char = (function(alphabet){
return (function(text,state){
return (function() {if(((text.length > 0) && (alphabet.indexOf(text.charAt(0)) > -1))) {return vector(text.substr(1),state);
} else {return null;
}})()
;
});
});
var not_dash_char = (function(alphabet){
return (function(text,state){
return (function() {if(((text.length > 0) && eq_p_(alphabet.indexOf(text.charAt(0)),-1))) {return vector(text.substr(1),state);
} else {return null;
}})()
;
});
});
var any = (function() {
var args = vector_dash_to_dash_list(Array.prototype.slice.call(arguments));
return (function(text,state){
var run = (function(lst){
return (function() {if(null_p_(lst)) {return null;
} else {return ((function(r){
return (function() {if(r) {return r;
} else {return run(cdr(lst));
}})()
;
}))(car(lst)(text,state));
}})()
;
});
return run(args);
});
});
var all = (function() {
var args = vector_dash_to_dash_list(Array.prototype.slice.call(arguments));
return (function(text,state){
var run = (function(lst,r){
return (function() {if(null_p_(lst)) {return r;
} else {return ((function(r){
return (function() {if(not(r)) {return null;
} else {return run(cdr(lst),r);
}})()
;
}))(car(lst)(vector_dash_ref(r,0),vector_dash_ref(r,1)));
}})()
;
});
return run(args,vector(text,state));
});
});
var capture = (function(func,hook){
return (function(text,state){
return ((function(r){
return (function() {if(r) {return ((function(t,s){
return vector(t,hook(text.substr(0,(text.length - t.length)),s));
}))(vector_dash_ref(r,0),vector_dash_ref(r,1));
} else {return null;
}})()
;
}))(func(text,state));
});
});
var before = (function(func,hook){
return (function(text,state){
return func(text,hook(state));
});
});
var after = (function(func,hook){
return (function(text,state){
return ((function(r){
return (function() {if(r) {return vector(vector_dash_ref(r,0),hook(state,vector_dash_ref(r,1)));
} else {return null;
}})()
;
}))(func(text,state));
});
});
return grammar(all,any,capture,char,not_dash_char,optional,Y,eof,terminator,before,after);
});
var parse = (function(grammar,text,state){
return ((function(r){
return (function() {if(r) {return vector_dash_ref(r,1);
} else {return null;
}})()
;
}))(parser(grammar)(text,state));
});
module.exports = parse;
}))();


});

require.define("/grammar.js", function (require, module, exports, __dirname, __filename) {
    var __util = require('util');

var _emptylst = [null];

function string_dash__gt_symbol(str) {
    str = str.replace(/-/g, '_dash_');
    str = str.replace(/\?/g, '_p_');
    str = str.replace(/\!/g, '_excl_');
    str = str.replace(/>/g, '_gt_');
    str = str.replace(/</g, '_lt_');
    str = str.replace(/%/g, '_per_');

    return {
        str: str,
        symbol: true
    };
}

function map(func, lst) {
    if(null_p_(lst)) {
        return _emptylst;
    }
    else {
        return cons(func(car(lst)),
                    map(func, cdr(lst)));
    }
}

function for_dash_each(func, lst) {
    if(!null_p_(lst)) {
        func(car(lst));
        for_dash_each(func, cdr(lst));
    }
}

function make_dash_vector(i) {
    return new Array(i);
}

function vector_dash_map(func, vec) {
    var res = [];

    for(var i=0, len=vec.length; i<len; i++) {
        res.push(func(vec[i]));
    }

    return res;
}

function vector_dash_for_dash_each(func, vec) {
    for(var i=0, len=vec.length; i<len; i++) {
        func(vec[i]);
    }
}

function display(msg) {
    __util.print(msg);
}

function pp(obj) {
    display(inspect(obj) + '\n');
}

function inspect(obj) {
    return __util.inspect(obj, null, 50);
}

function not(v) {
    return (typeof(v) != 'number' &&
            !v);
}

function eq_p_(v1, v2) {
    if(symbol_p_(v1) && symbol_p_(v2)) {
        return v1.str == v2.str;
    }

    return v1 === v2;
}

function equal_p_(v1, v2) {    
    if(list_p_(v1) && list_p_(v2)) {
        function l(lst1, lst2) {
            var n1 = null_p_(lst1);
            var n2 = null_p_(lst2);

            if(n1 && n2) {
                return true;
            }
            else if(n1 || n2) {
                return false
            }
            else if(equal_p_(car(lst1), car(lst2))) {
                return l(cdr(lst1), cdr(lst2));
            }

            return false;
        }

        return l(v1, v2);
    }
    else if(vector_p_(v1) && vector_p_(v2)) {
        for(var i=0, len=v1.length; i<len; i++) {
            if(!equal_p_(v1[i], v2[i])) {
                return false;
            }
        }
        return true;
    }
    else if(dict_p_(v1) && dict_p_(v2)) {
        for(var k in v1) {
            if(!equal_p_(v1[k], v2[k])) {
                return false;
            }
        }
        return true;
    }
    else if(symbol_p_(v1) && symbol_p_(v2)) {
        return v1.str == v2.str;
    }

    return v1 == v2;
}

function null_p_(arr) {
    return (arr &&
            arr.length !== undefined &&
            arr.length === 1 &&
            arr[0] === null);
}

function cons(v1, v2) {
    var lst = [v1, v2];
    lst.list = true;
    return lst;
}

function car(arr) {
    return arr[0];
}

function cdr(arr) {
    return arr[1];
}

function cadr(lst) {
    return car(cdr(lst));
}

function cddr(lst) {
    return cdr(cdr(lst));
}

function caddr(lst) {
    return car(cdr(cdr(lst)));
}

function cdddr(lst) {
    return cdr(cdr(cdr(lst)));
}

function cadddr(lst) {
    return car(cdr(cdr(cdr(lst))));
}

function cddddr(lst) {
    return cdr(cdr(cdr(cdr(lst))));
}

function length(lst) {
    var i=0;
    for_dash_each(function(obj) { i++; },
                  lst);
    return i;
}

function reverse(lst) {
    if(null_p_(lst)) {
        return _emptylst;
    }
    return list_dash_append(reverse(cdr(lst)), list(car(lst)));
}

function make_dash_list(arr) {
    arr.list = true;
    return arr;
}

function list() {
    return vector_dash_to_dash_list(
        Array.prototype.slice.call(arguments)
    );
}

function vector_dash_to_dash_list(vec) {
    function l(v, i) {
        if(i < v.length) {
            return cons(v[i], l(v, i+1));
        }
        else {
            return _emptylst;
        }
    }

    return l(vec, 0);
}

function list_dash_to_dash_vector(lst) {
    var res = [];

    function m(lst) {
        if(!null_p_(lst)) {
            res.push(car(lst));
            m(cdr(lst));
        }
    };

    m(lst);
    return res;
}

function vector_dash_ref(arr, i) {
    return arr[i];
}

function vector_dash_set_excl_(arr, i, v) {
    arr[i] = v;
}

function vector_dash_concat(arr1, arr2) {
    return arr1.concat(arr2);
}

function vector() {
    return Array.prototype.slice.call(arguments);
}

function vector_dash_push(vec, val) {
    vec.push(val);
}

function dict() {
    var keyvals = Array.prototype.slice.call(arguments);
    var res = {};

    for(var i=0, len=keyvals.length; i<len; i+=2) {
        var key = keyvals[i];

        if(key.str) {
            key = key.str;
        }

        res[key] = keyvals[i+1];
    }

    return res;
}

var hash_dash_map = dict;


function dict_dash_map(func, dict) {
    var res = {};
    for(var k in dict) {
        res[k] = func(dict[k]);
    }
    return res;
}

var hash_dash_map_dash_map = dict_dash_map;

function hash_dash_map_dash_to_dash_vec(obj) {
    var res = [];
    for(var k in obj) {
        res.push(vector_to_list([string_dash__gt_symbol('quote'),
                                 string_dash__gt_symbol(k)]));
        res.push(obj[k]);
    }
    return res;
}

function dict_dash_to_dash_list(dict) {
    var res = [];
    for(var k in dict) {
        res.push(string_dash__gt_symbol(k));
        res.push(dict[k]);
    }
    return vector_dash_to_dash_list(res);
}

function keys(dict) {
    var res = [];
    for(var k in dict) {
        res.push(k);
    }
    return vector_dash_to_dash_list(res);
}

function vals(dict) {
    var res = [];
    for(var k in dict) {
        res.push(dict[k]);
    }
    return vector_dash_to_dash_list(res);
}

function zip(keys, vals) {
    var obj = {};
    for(var i=0, len=keys.length; i<len; i++) {
        obj[keys[i]] = vals[i];
    }
    return obj;
}

function object_dash_ref(obj, key) {
    return obj[key];
}

function number_p_(obj) {
    return typeof obj == 'number';
}

function symbol_p_(obj) {
    return obj && obj.str != undefined && obj.symbol != undefined;
}

function string_p_(obj) {
    return typeof obj == 'string';
}

function boolean_p_(obj) {
    return obj === true || obj === false;
}

function list_p_(obj) {
    return obj && obj.list !== undefined;
}

function vector_p_(obj) {
    var v = (obj && typeof obj == 'object' && obj.length !== undefined);
    return !list_p_(obj) && !null_p_(obj) && v;
}

function dict_p_(obj) {
    var d = (obj && typeof obj == 'object' && obj.length === undefined);
    return !symbol_p_(obj) && d;
}

function _dash__gt_string(obj) {
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
    else if(list_p_(obj)) {
        return '(' + 
            map(function(obj) { return _dash__gt_string(obj); },
                obj).join(' ') +
            ')';
    }
    else if(vector_p_(obj)) {
        return '[' +
            vector_dash_map(function(obj) { return _dash__gt_string(obj); },
                       obj).join(' ') +
            ']';
    }
    else if(dict_p_(obj)) {
        var res = [];
        for(var k in obj) {
            res.push(k + ': ' + __util.inspect(obj[k], null, 10));
        }
        return '{' + res.join(', ') + '}';
    }
}

function list_dash_append(lst1, lst2) {
    function loop(lst) {
        if(null_p_(lst)) {
            return lst2;
        }
        else {
            return cons(car(lst), loop(cdr(lst)));
        }
    };

    if(null_p_(lst1)) {
        return lst2;
    }
    else {
        return loop(lst1);
    }
}

function string_dash_append() {
    return Array.prototype.slice.call(arguments).join('');
}

function unquote_splice(lst) {
    // if(!lst.length || lst.length != 2 || lst[1].length === undefined) {
    //     return lst;
    // }

    if(null_p_(lst)) {
        return _emptylst;
    }
    else {
        var elem = car(lst);
        var rest = unquote_splice(cdr(lst));

        if(elem.please_splice) {
            if(!list_p_(elem.data) && !null_p_(elem.data)) {
                throw ("Lists can only splice lists, unexpected object: " +
                       __gt_string(elem.data));
            }

            // do we need to unquote_splice elem.data?
            return list_dash_append(elem.data, rest);
        }
        else {
            return cons(elem, rest);
        }
    }
}

function unquote_splice_vec(vec) {
    var ret = [];
    for(var i=0, len=vec.length; i<len; i++) {
        var obj = vec[i];

        if(obj && obj.please_splice) {
            if(!vector_p_(obj.data)) {
                throw ("Vectors can only splice vectors, unexpected object: " +
                       obj.data);
            }
            ret = ret.concat(obj.data);
        }
        else {
            ret.push(obj);
        }
    }

    return ret;
}

function unquote_splice_map(obj) {
    // this is expensive, but I don't really care. this will all be
    // rewritten soon enough anyway.
    var res = {};

    for(var k in obj) {
        var prop = obj[k];
        if(prop && prop.please_splice) {
            if(!dict_p_(prop.data)) {
                throw ("Maps can only splice maps, unexpected object: " +
                       prop.data);
            }

            for(j in prop.data) {
                res[j] = prop.data[j];
            }
        }
        else if(k != '__unquote_splicing') {
            res[k] = prop;
        }
    }

    return res;
}
((function() {var grammar = (function(all,any,capture,char,not_dash_char,optional,Y,eof,terminator,before,after){
var repeated = (function(rule){
return Y((function(seq){
return any(all(rule,seq),rule);
}));
});
var space_dash_char = " \n\t\r";
var space = repeated(char(space_dash_char));
var comment = all(optional(space),char(";"),repeated(not_dash_char("\n")),space);
var number = capture(all(optional(char("-")),repeated(char("1234567890")),optional(all(char("."),repeated(char("1234567890"))))),(function(text,state){
return parseFloat(text);
}));
var boolean = capture(any(all(char("#"),char("f")),all(char("#"),char("t"))),(function(text,state){
return (function() {if(equal_p_(text,"#f")) {return false;
} else {return true;
}})()
;
}));
var string = ((function(capt,capt_node,capt_special,init){
var content = any(capt_special(all(char("\\"),not_dash_char(""))),capt(not_dash_char("\"")));
return init(all(char("\""),capt_node(optional(repeated(content))),char("\"")));
}))((function(rule){
return capture(rule,(function(buf,state){
return (state + buf);
}));
}),(function(rule){
return capture(rule,(function(str,state){
return state;
}));
}),(function(rule){
return capture(rule,(function(str,state){
return (state + (function() {if(equal_p_(str,"\\n")) {return ((function() {return "\n";
}))();
} else {return (function() {if(equal_p_(str,"\\t")) {return ((function() {return "\t";
}))();
} else {return (function() {if(equal_p_(str,"\\r")) {return ((function() {return "\r";
}))();
} else {return ((function() {return str.charAt(1);
}))();
}})()
;
}})()
;
}})()
);
}));
}),(function(rule){
return before(rule,(function(state){
return "";
}));
}));
var raw_term = capture(repeated(any(not_dash_char(("{}()[]'" + space_dash_char)))),(function(buf,s){
return string_dash__gt_symbol(buf);
}));
var raw_keyword = capture(all(char(":"),raw_term),(function(buf,node){
return list(string_dash__gt_symbol("quote"),node);
}));
var term = any(raw_keyword,raw_term);
var elements = (function(lst){
var quoting = (function(rule){
var capt = (function(buf,node){
return ((function(special){
return list(string_dash__gt_symbol(special),node);
}))((function() {if(equal_p_(buf.substring(0,2),",@")) {return ((function() {return "unquote-splicing";
}))();
} else {return (function() {if(equal_p_(buf.charAt(0),",")) {return ((function() {return "unquote";
}))();
} else {return (function() {if(equal_p_(buf.charAt(0),"'")) {return ((function() {return "quote";
}))();
} else {return (function() {if(equal_p_(buf.charAt(0),"`")) {return ((function() {return "quasiquote";
}))();
} else {return false;
}})()
;
}})()
;
}})()
;
}})()
);
});
return Y((function(q){
return capture(all(any(char("'"),char("`"),all(char(","),char("@")),char(",")),any(q,rule)),capt);
}));
});
return ((function(rule){
return any(quoting(rule),rule);
}))(any(lst,number,string,boolean,term));
});
var lst = Y((function(lst){
return all(any(before(char("{"),(function(state){
return vector();
})),before(char("("),(function(state){
return vector();
})),before(char("["),(function(state){
return vector();
}))),optional(repeated(any(space,comment,after(elements(lst),(function(parent,child){
return vector_dash_concat(parent,vector(child));
}))))),any(before(char("}"),(function(state){
return ((function(i){
return dict.apply(null,vector_dash_map((function(el){
i = (i + 1);
return (function() {if(eq_p_(((i - 1) % 2),0)) {return (function() {if((list_p_(el) && eq_p_(car(el),string_dash__gt_symbol("quote")))) {return cadr(el);
} else {return el;
}})()
;
} else {return el;
}})()
;
}),state));
}))(0);
})),before(char(")"),(function(state){
return vector_dash_to_dash_list(state);
})),char("]")));
}));
return after(repeated(any(space,comment,after(elements(any(lst)),(function(root,child){
return root.concat(vector(child));
})))),(function(_,root){
return ((function(lst){
return (function() {if(eq_p_(length(lst),1)) {return car(lst);
} else {return cons(string_dash__gt_symbol("begin"),lst);
}})()
;
}))(vector_dash_to_dash_list(root));
}));
});
module.exports = grammar;
}))();


});

require.define("/backends/js.js", function (require, module, exports, __dirname, __filename) {
    var __util = require('util');

var _emptylst = [null];

function string_dash__gt_symbol(str) {
    str = str.replace(/-/g, '_dash_');
    str = str.replace(/\?/g, '_p_');
    str = str.replace(/\!/g, '_excl_');
    str = str.replace(/>/g, '_gt_');
    str = str.replace(/</g, '_lt_');
    str = str.replace(/%/g, '_per_');

    return {
        str: str,
        symbol: true
    };
}

function map(func, lst) {
    if(null_p_(lst)) {
        return _emptylst;
    }
    else {
        return cons(func(car(lst)),
                    map(func, cdr(lst)));
    }
}

function for_dash_each(func, lst) {
    if(!null_p_(lst)) {
        func(car(lst));
        for_dash_each(func, cdr(lst));
    }
}

function make_dash_vector(i) {
    return new Array(i);
}

function vector_dash_map(func, vec) {
    var res = [];

    for(var i=0, len=vec.length; i<len; i++) {
        res.push(func(vec[i]));
    }

    return res;
}

function vector_dash_for_dash_each(func, vec) {
    for(var i=0, len=vec.length; i<len; i++) {
        func(vec[i]);
    }
}

function display(msg) {
    __util.print(msg);
}

function pp(obj) {
    display(inspect(obj) + '\n');
}

function inspect(obj) {
    return __util.inspect(obj, null, 50);
}

function not(v) {
    return (typeof(v) != 'number' &&
            !v);
}

function eq_p_(v1, v2) {
    if(symbol_p_(v1) && symbol_p_(v2)) {
        return v1.str == v2.str;
    }

    return v1 === v2;
}

function equal_p_(v1, v2) {    
    if(list_p_(v1) && list_p_(v2)) {
        function l(lst1, lst2) {
            var n1 = null_p_(lst1);
            var n2 = null_p_(lst2);

            if(n1 && n2) {
                return true;
            }
            else if(n1 || n2) {
                return false
            }
            else if(equal_p_(car(lst1), car(lst2))) {
                return l(cdr(lst1), cdr(lst2));
            }

            return false;
        }

        return l(v1, v2);
    }
    else if(vector_p_(v1) && vector_p_(v2)) {
        for(var i=0, len=v1.length; i<len; i++) {
            if(!equal_p_(v1[i], v2[i])) {
                return false;
            }
        }
        return true;
    }
    else if(dict_p_(v1) && dict_p_(v2)) {
        for(var k in v1) {
            if(!equal_p_(v1[k], v2[k])) {
                return false;
            }
        }
        return true;
    }
    else if(symbol_p_(v1) && symbol_p_(v2)) {
        return v1.str == v2.str;
    }

    return v1 == v2;
}

function null_p_(arr) {
    return (arr &&
            arr.length !== undefined &&
            arr.length === 1 &&
            arr[0] === null);
}

function cons(v1, v2) {
    var lst = [v1, v2];
    lst.list = true;
    return lst;
}

function car(arr) {
    return arr[0];
}

function cdr(arr) {
    return arr[1];
}

function cadr(lst) {
    return car(cdr(lst));
}

function cddr(lst) {
    return cdr(cdr(lst));
}

function caddr(lst) {
    return car(cdr(cdr(lst)));
}

function cdddr(lst) {
    return cdr(cdr(cdr(lst)));
}

function cadddr(lst) {
    return car(cdr(cdr(cdr(lst))));
}

function cddddr(lst) {
    return cdr(cdr(cdr(cdr(lst))));
}

function length(lst) {
    var i=0;
    for_dash_each(function(obj) { i++; },
                  lst);
    return i;
}

function reverse(lst) {
    if(null_p_(lst)) {
        return _emptylst;
    }
    return list_dash_append(reverse(cdr(lst)), list(car(lst)));
}

function make_dash_list(arr) {
    arr.list = true;
    return arr;
}

function list() {
    return vector_dash_to_dash_list(
        Array.prototype.slice.call(arguments)
    );
}

function vector_dash_to_dash_list(vec) {
    function l(v, i) {
        if(i < v.length) {
            return cons(v[i], l(v, i+1));
        }
        else {
            return _emptylst;
        }
    }

    return l(vec, 0);
}

function list_dash_to_dash_vector(lst) {
    var res = [];

    function m(lst) {
        if(!null_p_(lst)) {
            res.push(car(lst));
            m(cdr(lst));
        }
    };

    m(lst);
    return res;
}

function vector_dash_ref(arr, i) {
    return arr[i];
}

function vector_dash_set_excl_(arr, i, v) {
    arr[i] = v;
}

function vector_dash_concat(arr1, arr2) {
    return arr1.concat(arr2);
}

function vector() {
    return Array.prototype.slice.call(arguments);
}

function vector_dash_push(vec, val) {
    vec.push(val);
}

function dict() {
    var keyvals = Array.prototype.slice.call(arguments);
    var res = {};

    for(var i=0, len=keyvals.length; i<len; i+=2) {
        var key = keyvals[i];

        if(key.str) {
            key = key.str;
        }

        res[key] = keyvals[i+1];
    }

    return res;
}

var hash_dash_map = dict;


function dict_dash_map(func, dict) {
    var res = {};
    for(var k in dict) {
        res[k] = func(dict[k]);
    }
    return res;
}

var hash_dash_map_dash_map = dict_dash_map;

function hash_dash_map_dash_to_dash_vec(obj) {
    var res = [];
    for(var k in obj) {
        res.push(vector_to_list([string_dash__gt_symbol('quote'),
                                 string_dash__gt_symbol(k)]));
        res.push(obj[k]);
    }
    return res;
}

function dict_dash_to_dash_list(dict) {
    var res = [];
    for(var k in dict) {
        res.push(string_dash__gt_symbol(k));
        res.push(dict[k]);
    }
    return vector_dash_to_dash_list(res);
}

function keys(dict) {
    var res = [];
    for(var k in dict) {
        res.push(k);
    }
    return vector_dash_to_dash_list(res);
}

function vals(dict) {
    var res = [];
    for(var k in dict) {
        res.push(dict[k]);
    }
    return vector_dash_to_dash_list(res);
}

function zip(keys, vals) {
    var obj = {};
    for(var i=0, len=keys.length; i<len; i++) {
        obj[keys[i]] = vals[i];
    }
    return obj;
}

function object_dash_ref(obj, key) {
    return obj[key];
}

function number_p_(obj) {
    return typeof obj == 'number';
}

function symbol_p_(obj) {
    return obj && obj.str != undefined && obj.symbol != undefined;
}

function string_p_(obj) {
    return typeof obj == 'string';
}

function boolean_p_(obj) {
    return obj === true || obj === false;
}

function list_p_(obj) {
    return !!obj && obj.list !== undefined;
}

function vector_p_(obj) {
    var v = (obj && typeof obj == 'object' && obj.length !== undefined);
    return !list_p_(obj) && !null_p_(obj) && v;
}

function dict_p_(obj) {
    var d = (obj && typeof obj == 'object' && obj.length === undefined);
    return !symbol_p_(obj) && d;
}

function _dash__gt_string(obj) {
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
    else if(list_p_(obj)) {
        return '(' + 
            map(function(obj) { return _dash__gt_string(obj); },
                obj).join(' ') +
            ')';
    }
    else if(vector_p_(obj)) {
        return '[' +
            vector_dash_map(function(obj) { return _dash__gt_string(obj); },
                       obj).join(' ') +
            ']';
    }
    else if(dict_p_(obj)) {
        var res = [];
        for(var k in obj) {
            res.push(k + ': ' + __util.inspect(obj[k], null, 10));
        }
        return '{' + res.join(', ') + '}';
    }
}

function list_dash_append(lst1, lst2) {
    function loop(lst) {
        if(null_p_(lst)) {
            return lst2;
        }
        else {
            return cons(car(lst), loop(cdr(lst)));
        }
    };

    if(null_p_(lst1)) {
        return lst2;
    }
    else {
        return loop(lst1);
    }
}

function string_dash_append() {
    return Array.prototype.slice.call(arguments).join('');
}

function unquote_splice(lst) {
    // if(!lst.length || lst.length != 2 || lst[1].length === undefined) {
    //     return lst;
    // }

    if(null_p_(lst)) {
        return _emptylst;
    }
    else {
        var elem = car(lst);
        var rest = unquote_splice(cdr(lst));

        if(elem.please_splice) {
            if(!list_p_(elem.data) && !null_p_(elem.data)) {
                throw ("Lists can only splice lists, unexpected object: " +
                       __gt_string(elem.data));
            }

            // do we need to unquote_splice elem.data?
            return list_dash_append(elem.data, rest);
        }
        else {
            return cons(elem, rest);
        }
    }
}

function unquote_splice_vec(vec) {
    var ret = [];
    for(var i=0, len=vec.length; i<len; i++) {
        var obj = vec[i];

        if(obj && obj.please_splice) {
            if(!vector_p_(obj.data)) {
                throw ("Vectors can only splice vectors, unexpected object: " +
                       obj.data);
            }
            ret = ret.concat(obj.data);
        }
        else {
            ret.push(obj);
        }
    }

    return ret;
}

function unquote_splice_map(obj) {
    // this is expensive, but I don't really care. this will all be
    // rewritten soon enough anyway.
    var res = {};

    for(var k in obj) {
        var prop = obj[k];
        if(prop && prop.please_splice) {
            if(!dict_p_(prop.data)) {
                throw ("Maps can only splice maps, unexpected object: " +
                       prop.data);
            }

            for(j in prop.data) {
                res[j] = prop.data[j];
            }
        }
        else if(k != '__unquote_splicing') {
            res[k] = prop;
        }
    }

    return res;
}
((function() {var fs = require("fs");var should_dash_return_p_ = (function(form){
return not((list_p_(form) && (eq_p_(car(form),string_dash__gt_symbol("throw")) || eq_p_(car(form),string_dash__gt_symbol("set_excl_")) || eq_p_(car(form),string_dash__gt_symbol("set")))));
});
var generator = (function() {var code = vector();
var make_dash_fresh = (function() {return generator();
});
var write = (function(src){
var eol = vector_dash_to_dash_list(Array.prototype.slice.call(arguments, 1));
return code.push((src + (function() {if(null_p_(eol)) {return "";
} else {return "\n";
}})()
));
});
var write_dash_runtime = (function(target){
return (function() {if(not(equal_p_(target,"no-runtime"))) {return ((function() {write(fs.readFileSync("runtime.js","utf-8"),true);
return (function() {if(not(equal_p_(target,"js-noeval"))) {return write(fs.readFileSync("runtime-eval.js","utf-8"),true);
} else {return false;
}})()
;
}))();
} else {return false;
}})()
;
});
var inline_dash_writer = (function(str){
return ((function(first){
return (function() {return (function() {if(first) {first = false;
} else {return write(str);
}})()
;
});
}))(true);
});
var terminate_dash_expr = (function(expr_p_){
return (function() {if(not(expr_p_)) {return write(";",true);
} else {return false;
}})()
;
});
var write_dash_number = (function(obj,top_p_){
write(obj);
return terminate_dash_expr(not(top_p_));
});
var write_dash_boolean = (function(obj,top_p_){
(function() {if(obj) {return write("true");
} else {return write("false");
}})()
;
return terminate_dash_expr(not(top_p_));
});
var write_dash_empty_dash_list = (function(obj,top_p_){
write("_emptylst");
return terminate_dash_expr(not(top_p_));
});
var write_dash_string = (function(obj,top_p_){
return ((function(str){
str = str.replace(RegExp("\\\\","g"),"\\\\");
str = str.replace(RegExp("\n","g"),"\\n");
str = str.replace(RegExp("\r","g"),"\\r");
str = str.replace(RegExp("\t","g"),"\\t");
str = str.replace(RegExp("\"","g"),"\\\"");
write(("\"" + str + "\""));
return terminate_dash_expr(not(top_p_));
}))(obj);
});
var write_dash_symbol = (function(obj,top_p_){
write(("string_dash__gt_symbol(\"" + obj.str + "\")"));
return terminate_dash_expr(not(top_p_));
});
var write_dash_term = (function(obj,top_p_){
write(obj.str);
return terminate_dash_expr(not(top_p_));
});
var write_dash_set = (function(lval,rval,parse){
write("var ");
return write_dash_set_excl_(lval,rval,parse);
});
var write_dash_set_excl_ = (function(lval,rval,parse){
write_dash_term(lval);
write(" = ");
parse(rval,true);
return write(";",true);
});
var write_dash_if = (function(pred,tru,expr_p_,parse){
var fal = vector_dash_to_dash_list(Array.prototype.slice.call(arguments, 4));
write("(function() {");
write("if(");
parse(pred,true);
write(") {");
(function() {if(should_dash_return_p_(tru)) {return write("return ");
} else {return false;
}})()
;
parse(tru);
write("}");
(function() {if(not(null_p_(fal))) {return ((function() {write(" else {");
(function() {if(should_dash_return_p_(car(fal))) {return write("return ");
} else {return false;
}})()
;
parse(car(fal));
return write("}");
}))();
} else {return false;
}})()
;
write("})()",true);
return terminate_dash_expr(expr_p_);
});
var write_dash_lambda = (function(args,body,expr_p_,parse){
(function() {if(list_p_(args)) {return ((function() {var comma = inline_dash_writer(",");
var capture_dash_name = false;
var write_dash_args = (function(args){
return (function() {if(not(null_p_(args))) {return ((function() {return (function() {if(eq_p_(car(args),string_dash__gt_symbol("."))) {capture_dash_name = cadr(args);
} else {return ((function() {comma();
write_dash_term(car(args));
return write_dash_args(cdr(args));
}))();
}})()
;
}))();
} else {return false;
}})()
;
});
write("(function(");
write_dash_args(args);
write("){",true);
return (function() {if(capture_dash_name) {return ((function() {write("var ");
write_dash_term(capture_dash_name);
write(" = ");
write_dash_term(string_dash__gt_symbol("vector_dash_to_dash_list"));
write("(Array.prototype.slice.call(arguments, ");
write((length(args) - 2));
return write("));",true);
}))();
} else {return false;
}})()
;
}))();
} else {return (function() {if(symbol_p_(args)) {return ((function() {write("(function() {",true);
write("var ");
write_dash_term(args);
write(" = ");
write_dash_term(string_dash__gt_symbol("vector_dash_to_dash_list"));
return write("(Array.prototype.slice.call(arguments));",true);
}))();
} else {return (function() {if(null_p_(args)) {return ((function() {return write("(function() {");
}))();
} else {return false;
}})()
;
}})()
;
}})()
;
((function(i,len){
return for_dash_each((function(form){
(function() {if((eq_p_(i,(len - 1)) && should_dash_return_p_(form))) {return write("return ");
} else {return false;
}})()
;
parse(form);
i = (i + 1);
}),body);
}))(0,length(body));
write("})");
return terminate_dash_expr(expr_p_);
});
var write_dash_func_dash_call = (function(func,args,expr_p_,parse){
(function() {if(symbol_p_(func)) {return write_dash_term(func);
} else {return (function() {if(eq_p_(car(func),string_dash__gt_symbol("lambda"))) {return ((function() {write("(");
parse(func,true);
return write(")");
}))();
} else {return parse(func,true);
}})()
;
}})()
;
write("(");
((function(comma){
return for_dash_each((function(arg){
comma();
return parse(arg,true);
}),args);
}))(inline_dash_writer(","));
write(")");
return terminate_dash_expr(expr_p_);
});
var write_dash_op = (function(op,vals,expr_p_,parse){
write("(");
((function(op_dash_writer){
return for_dash_each((function(arg){
op_dash_writer();
return parse(arg,true);
}),vals);
}))(inline_dash_writer(string_dash_append(" ",op," ")));
write(")");
return terminate_dash_expr(expr_p_);
});
var make_dash_op_dash_writer = (function(str){
return (function(vals,expr_p_,parse){
return write_dash_op(str,vals,expr_p_,parse);
});
});
var write_dash_require = (function(args,expr_p_,parse){
return for_dash_each((function(el){
write("var ");
write_dash_term(car(el));
write(" = require(");
write_dash_string(cadr(el));
return write(");");
}),args);
});
return dict(string_dash__gt_symbol("write_dash_runtime"),write_dash_runtime,string_dash__gt_symbol("write_dash_number"),write_dash_number,string_dash__gt_symbol("write_dash_string"),write_dash_string,string_dash__gt_symbol("write_dash_boolean"),write_dash_boolean,string_dash__gt_symbol("write_dash_term"),write_dash_term,string_dash__gt_symbol("write_dash_symbol"),write_dash_symbol,string_dash__gt_symbol("write_dash_empty_dash_list"),write_dash_empty_dash_list,string_dash__gt_symbol("write_dash_set"),write_dash_set,string_dash__gt_symbol("write_dash_set_excl_"),write_dash_set_excl_,string_dash__gt_symbol("write_dash_if"),write_dash_if,string_dash__gt_symbol("write_dash_lambda"),write_dash_lambda,string_dash__gt_symbol("write_dash_func_dash_call"),write_dash_func_dash_call,string_dash__gt_symbol("write_dash_require"),write_dash_require,string_dash__gt_symbol("write_dash_and"),make_dash_op_dash_writer("&&"),string_dash__gt_symbol("write_dash_or"),make_dash_op_dash_writer("||"),string_dash__gt_symbol("write_dash_add"),make_dash_op_dash_writer("+"),string_dash__gt_symbol("write_dash_subtract"),make_dash_op_dash_writer("-"),string_dash__gt_symbol("write_dash_multiply"),make_dash_op_dash_writer("*"),string_dash__gt_symbol("write_dash_divide"),make_dash_op_dash_writer("/"),string_dash__gt_symbol("write_dash_gt"),make_dash_op_dash_writer(">"),string_dash__gt_symbol("write_dash_lt"),make_dash_op_dash_writer("<"),string_dash__gt_symbol("write_dash_mod"),make_dash_op_dash_writer("%"),string_dash__gt_symbol("make_dash_fresh"),make_dash_fresh,string_dash__gt_symbol("get_dash_code"),(function() {return code.join("");
}));
});
module.exports = generator;
}))();


});

require.define("/compiler.js", function (require, module, exports, __dirname, __filename) {
    var __util = require('util');

var _emptylst = [null];

function string_dash__gt_symbol(str) {
    str = str.replace(/-/g, '_dash_');
    str = str.replace(/\?/g, '_p_');
    str = str.replace(/\!/g, '_excl_');
    str = str.replace(/>/g, '_gt_');
    str = str.replace(/</g, '_lt_');
    str = str.replace(/%/g, '_per_');

    return {
        str: str,
        symbol: true
    };
}

function map(func, lst) {
    if(null_p_(lst)) {
        return _emptylst;
    }
    else {
        return cons(func(car(lst)),
                    map(func, cdr(lst)));
    }
}

function for_dash_each(func, lst) {
    if(!null_p_(lst)) {
        func(car(lst));
        for_dash_each(func, cdr(lst));
    }
}

function fold(func, acc, lst) {
    if(null_p_(lst)) {
        return acc;
    }
    else {
        return fold(func, func(car(lst), acc), cdr(lst));
    }
}

function make_dash_vector(i) {
    return new Array(i);
}

function vector_dash_map(func, vec) {
    var res = [];

    for(var i=0, len=vec.length; i<len; i++) {
        res.push(func(vec[i]));
    }

    return res;
}

function vector_dash_for_dash_each(func, vec) {
    for(var i=0, len=vec.length; i<len; i++) {
        func(vec[i]);
    }
}

function vector_dash_length(vec) {
    return vec.length;
}

function display(msg) {
    __util.print(msg);
}

function pp(obj) {
    display(inspect(obj) + '\n');
}

function inspect(obj) {
    return __util.inspect(obj, null, 50);
}

function not(v) {
    return (typeof(v) != 'number' &&
            !v);
}

function eq_p_(v1, v2) {
    if(symbol_p_(v1) && symbol_p_(v2)) {
        return v1.str == v2.str;
    }

    return v1 === v2;
}

function equal_p_(v1, v2) {    
    if(list_p_(v1) && list_p_(v2)) {
        function l(lst1, lst2) {
            var n1 = null_p_(lst1);
            var n2 = null_p_(lst2);

            if(n1 && n2) {
                return true;
            }
            else if(n1 || n2) {
                return false
            }
            else if(equal_p_(car(lst1), car(lst2))) {
                return l(cdr(lst1), cdr(lst2));
            }

            return false;
        }

        return l(v1, v2);
    }
    else if(vector_p_(v1) && vector_p_(v2)) {
        for(var i=0, len=v1.length; i<len; i++) {
            if(!equal_p_(v1[i], v2[i])) {
                return false;
            }
        }
        return true;
    }
    else if(dict_p_(v1) && dict_p_(v2)) {
        for(var k in v1) {
            if(!equal_p_(v1[k], v2[k])) {
                return false;
            }
        }
        return true;
    }
    else if(symbol_p_(v1) && symbol_p_(v2)) {
        return v1.str == v2.str;
    }

    return v1 == v2;
}

function null_p_(arr) {
    return (arr &&
            arr.length !== undefined &&
            arr.length === 1 &&
            arr[0] === null);
}

function cons(v1, v2) {
    var lst = [v1, v2];
    lst.list = true;
    return lst;
}

function car(arr) {
    return arr[0];
}

function cdr(arr) {
    return arr[1];
}

function cadr(lst) {
    return car(cdr(lst));
}

function cddr(lst) {
    return cdr(cdr(lst));
}

function caddr(lst) {
    return car(cdr(cdr(lst)));
}

function cdddr(lst) {
    return cdr(cdr(cdr(lst)));
}

function cadddr(lst) {
    return car(cdr(cdr(cdr(lst))));
}

function cddddr(lst) {
    return cdr(cdr(cdr(cdr(lst))));
}

function length(lst) {
    var i=0;
    for_dash_each(function(obj) { i++; },
                  lst);
    return i;
}

function reverse(lst) {
    if(null_p_(lst)) {
        return _emptylst;
    }
    return list_dash_append(reverse(cdr(lst)), list(car(lst)));
}

function make_dash_list(arr) {
    arr.list = true;
    return arr;
}

function list() {
    return vector_dash_to_dash_list(
        Array.prototype.slice.call(arguments)
    );
}

function vector_dash_to_dash_list(vec) {
    function l(v, i) {
        if(i < v.length) {
            return cons(v[i], l(v, i+1));
        }
        else {
            return _emptylst;
        }
    }

    return l(vec, 0);
}

function list_dash_to_dash_vector(lst) {
    var res = [];

    function m(lst) {
        if(!null_p_(lst)) {
            res.push(car(lst));
            m(cdr(lst));
        }
    };

    m(lst);
    return res;
}

function vector_dash_ref(arr, i) {
    return arr[i];
}

function vector_dash_set_excl_(arr, i, v) {
    arr[i] = v;
}

function vector_dash_concat(arr1, arr2) {
    return arr1.concat(arr2);
}

function vector() {
    return Array.prototype.slice.call(arguments);
}

function vector_dash_push(vec, val) {
    vec.push(val);
}

function dict() {
    var keyvals = Array.prototype.slice.call(arguments);
    var res = {};

    for(var i=0, len=keyvals.length; i<len; i+=2) {
        var key = keyvals[i];

        if(key.str) {
            key = key.str;
        }

        res[key] = keyvals[i+1];
    }

    return res;
}

var hash_dash_map = dict;


function dict_dash_map(func, dict) {
    var res = {};
    for(var k in dict) {
        res[k] = func(dict[k]);
    }
    return res;
}

var hash_dash_map_dash_map = dict_dash_map;

function hash_dash_map_dash_to_dash_vec(obj) {
    var res = [];
    for(var k in obj) {
        res.push(vector_to_list([string_dash__gt_symbol('quote'),
                                 string_dash__gt_symbol(k)]));
        res.push(obj[k]);
    }
    return res;
}

function dict_dash_to_dash_list(dict) {
    var res = [];
    for(var k in dict) {
        res.push(string_dash__gt_symbol(k));
        res.push(dict[k]);
    }
    return vector_dash_to_dash_list(res);
}

function keys(dict) {
    var res = [];
    for(var k in dict) {
        res.push(k);
    }
    return vector_dash_to_dash_list(res);
}

function vals(dict) {
    var res = [];
    for(var k in dict) {
        res.push(dict[k]);
    }
    return vector_dash_to_dash_list(res);
}

function zip(keys, vals) {
    var obj = {};
    for(var i=0, len=keys.length; i<len; i++) {
        obj[keys[i]] = vals[i];
    }
    return obj;
}

function object_dash_ref(obj, key) {
    return obj[key];
}

function number_p_(obj) {
    return typeof obj == 'number';
}

function symbol_p_(obj) {
    return obj && obj.str != undefined && obj.symbol != undefined;
}

function string_p_(obj) {
    return typeof obj == 'string';
}

function boolean_p_(obj) {
    return obj === true || obj === false;
}

function list_p_(obj) {
    return !!obj && obj.list !== undefined;
}

function vector_p_(obj) {
    var v = (obj && typeof obj == 'object' && obj.length !== undefined);
    return !list_p_(obj) && !null_p_(obj) && v;
}

function dict_p_(obj) {
    var d = (obj && typeof obj == 'object' && obj.length === undefined);
    return !symbol_p_(obj) && d;
}

function _dash__gt_string(obj) {
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
    else if(list_p_(obj)) {
        return '(' + 
            map(function(obj) { return _dash__gt_string(obj); },
                obj).join(' ') +
            ')';
    }
    else if(vector_p_(obj)) {
        return '[' +
            vector_dash_map(function(obj) { return _dash__gt_string(obj); },
                       obj).join(' ') +
            ']';
    }
    else if(dict_p_(obj)) {
        var res = [];
        for(var k in obj) {
            res.push(k + ': ' + __util.inspect(obj[k], null, 10));
        }
        return '{' + res.join(', ') + '}';
    }
    else if(null_p_(obj)) {
        return '()';
    }
}

function list_dash_append(lst1, lst2) {
    function loop(lst) {
        if(null_p_(lst)) {
            return lst2;
        }
        else {
            return cons(car(lst), loop(cdr(lst)));
        }
    };

    if(null_p_(lst1)) {
        return lst2;
    }
    else {
        return loop(lst1);
    }
}

function string_dash_append() {
    return Array.prototype.slice.call(arguments).join('');
}

function unquote_splice(lst) {
    // if(!lst.length || lst.length != 2 || lst[1].length === undefined) {
    //     return lst;
    // }

    if(null_p_(lst)) {
        return _emptylst;
    }
    else {
        var elem = car(lst);
        var rest = unquote_splice(cdr(lst));

        if(elem.please_splice) {
            if(!list_p_(elem.data) && !null_p_(elem.data)) {
                throw ("Lists can only splice lists, unexpected object: " +
                       __gt_string(elem.data));
            }

            // do we need to unquote_splice elem.data?
            return list_dash_append(elem.data, rest);
        }
        else {
            return cons(elem, rest);
        }
    }
}

function unquote_splice_vec(vec) {
    var ret = [];
    for(var i=0, len=vec.length; i<len; i++) {
        var obj = vec[i];

        if(obj && obj.please_splice) {
            if(!vector_p_(obj.data)) {
                throw ("Vectors can only splice vectors, unexpected object: " +
                       obj.data);
            }
            ret = ret.concat(obj.data);
        }
        else {
            ret.push(obj);
        }
    }

    return ret;
}

function unquote_splice_map(obj) {
    // this is expensive, but I don't really care. this will all be
    // rewritten soon enough anyway.
    var res = {};

    for(var k in obj) {
        var prop = obj[k];
        if(prop && prop.please_splice) {
            if(!dict_p_(prop.data)) {
                throw ("Maps can only splice maps, unexpected object: " +
                       prop.data);
            }

            for(j in prop.data) {
                res[j] = prop.data[j];
            }
        }
        else if(k != '__unquote_splicing') {
            res[k] = prop;
        }
    }

    return res;
}
((function() {var util = require("util");var fs = require("fs");var reader = require("./parser");var grammar = require("./grammar");var js = require("./backends/js");var _gensym = 0;
var gensym = (function() {_gensym = (_gensym + 1);
return string_dash__gt_symbol(("o" + _gensym));
});
var literal_p_ = (function(x){
return (number_p_(x) || string_p_(x) || boolean_p_(x) || null_p_(x));
});
var application_p_ = (function(form){
return (list_p_(form) && not(expander_p_(car(form))));
});
var ref = (function(obj,name){
return object_dash_ref(obj,symbol_dash__gt_string(name));
});
var put_excl_ = vector_dash_set_excl_;
var opt = (function(arg,def){
return (function() {if(null_p_(arg)) {return def;
} else {return car(arg);
}})()
;
});
var _str = "";
var disp = (function(str){
_str = (_str + str);
});
var new_dash_string = (function() {_str = "";
});
var pretty = (function(obj){
var i = vector_dash_to_dash_list(Array.prototype.slice.call(arguments, 1));
var pad = (function(n){
return vector_dash_for_dash_each((function(_){
return disp(" ");
}),make_dash_vector(n));
});
var space = (function(obj){
return (function() {if((literal_p_(obj) || symbol_p_(obj))) {return ((function() {return vector_dash_length(_dash__gt_string(obj));
}))();
} else {return (function() {if(list_p_(obj)) {return ((function() {return (length(obj) + 1 + fold((function(el,acc){
return (acc + space(el));
}),0,obj));
}))();
} else {return (function() {if(dict_p_(obj)) {return ((function() {return space(dict_dash_to_dash_list(obj));
}))();
} else {return (function() {if(vector_p_(obj)) {return ((function() {return space(vector_dash_to_dash_list(obj));
}))();
} else {return false;
}})()
;
}})()
;
}})()
;
}})()
;
});
((function(i){
return (function() {if((symbol_p_(obj) || literal_p_(obj))) {return ((function() {return disp(_dash__gt_string(obj));
}))();
} else {return (function() {if(list_p_(obj)) {return ((function() {return ((function(node,childr,sp){
disp("(");
pretty(node,(i + 1));
for_dash_each((function(item){
(function() {if(sp) {return ((function() {disp("\n");
return pad(i);
}))();
} else {return disp(" ");
}})()
;
return pretty(item,(i + 1));
}),childr);
return disp(")");
}))(car(obj),cdr(obj),(space(obj) > 30));
}))();
} else {return false;
}})()
;
}})()
;
}))((function() {if(null_p_(i)) {return 1;
} else {return car(i);
}})()
);
return _str;
});
var symbol_dash__gt_string = (function(sym){
return sym.str;
});
var assert = (function(cnd,msg){
return (function() {if(not(cnd)) {throw(msg);
} else {return false;
}})()
;
});
var _expanders_ = dict();
var expander_dash_function = (function(name){
return ref(_expanders_,name);
});
var install_dash_expander = (function(name,func){
return put_excl_(_expanders_,symbol_dash__gt_string(name),func);
});
var expander_p_ = (function(name){
return not(eq_p_(ref(_expanders_,name),undefined));
});
var expand = (function(form){
return initial_dash_expander(form,initial_dash_expander);
});
var expand_dash_once = (function(form){
return initial_dash_expander(form,(function(x,e){
return x;
}));
});
var expand_dash_nth = (function(form,n){
return ((function(i){
return initial_dash_expander(form,(function(form,e){
return ((function(e1){
return e1(form,e1);
}))((function(x,e2){
return (function() {if(not((i < n))) {return x;
} else {return ((function() {i = (i + 1);
return e(x,e2);
}))();
}})()
;
}));
}));
}))(0);
});
var initial_dash_expander = (function(form,e){
return (function() {if(symbol_p_(form)) {return ((function() {return form;
}))();
} else {return (function() {if(literal_p_(form)) {return ((function() {return form;
}))();
} else {return (function() {if(vector_p_(form)) {return ((function() {return form;
}))();
} else {return (function() {if(dict_p_(form)) {return ((function() {return form;
}))();
} else {return (function() {if(expander_p_(car(form))) {return ((function() {return expander_dash_function(car(form))(form,e);
}))();
} else {return ((function() {return map((function(subform){
return e(subform,e);
}),form);
}))();
}})()
;
}})()
;
}})()
;
}})()
;
}})()
;
});
install_dash_expander(string_dash__gt_symbol("define_dash_expander"),(function(form,e){
return ((function(sig){
return ((function(name,arg_dash_names,body){
install_dash_expander(name,make_dash_expander(arg_dash_names,body));
return true;
}))(car(sig),cdr(sig),cddr(form));
}))(cadr(form));
}));
var make_dash_expander = (function(arg_dash_names,body){
assert(eq_p_(length(arg_dash_names),2),"define-expander functions must take two arguments");
return eval(compile(list_dash_append(list(string_dash__gt_symbol("lambda"),arg_dash_names),((function(o1){
return (function() {if(vector_p_(o1)) {return vector_dash_to_dash_list(o1);
} else {return o1;
}})()
;
}))(body)),macro_dash_generator.make_dash_fresh()));
});
install_dash_expander(string_dash__gt_symbol("define_dash_macro"),(function(form,e){
return ((function(sig){
return ((function(name,pattern,body){
install_dash_macro(name,pattern,body);
return true;
}))(car(sig),cdr(sig),cddr(form));
}))(cadr(form));
}));
var macro_dash_generator = false;
var install_dash_macro = (function(name,pattern,body){
return install_dash_expander(name,make_dash_macro(pattern,body));
});
var make_dash_macro = (function(pattern,body){
return ((function(x,e){
return eval(compile(list(string_dash__gt_symbol("lambda"),list(x,e),list(e,list_dash_append(list(string_dash__gt_symbol("let"),destructure(pattern,list(string_dash__gt_symbol("cdr"),x),_emptylst)),((function(o2){
return (function() {if(vector_p_(o2)) {return vector_dash_to_dash_list(o2);
} else {return o2;
}})()
;
}))(body)),e)),macro_dash_generator.make_dash_fresh()));
}))(gensym(),gensym());
});
var destructure = (function(pattern,access,bindings){
return (function() {if(null_p_(pattern)) {return ((function() {return bindings;
}))();
} else {return (function() {if(eq_p_(car(pattern),string_dash__gt_symbol("."))) {return ((function() {return cons(list(cadr(pattern),access),bindings);
}))();
} else {return ((function() {return cons(list(car(pattern),list(string_dash__gt_symbol("car"),access)),destructure(cdr(pattern),list(string_dash__gt_symbol("cdr"),access),bindings));
}))();
}})()
;
}})()
;
});
install_dash_expander(string_dash__gt_symbol("lambda"),(function(form,e){
return list_dash_append(list(string_dash__gt_symbol("lambda"),car(cdr(form))),((function(o3){
return (function() {if(vector_p_(o3)) {return vector_dash_to_dash_list(o3);
} else {return o3;
}})()
;
}))(map((function(subform){
return e(subform,e);
}),cdr(cdr(form)))));
}));
install_dash_expander(string_dash__gt_symbol("cond"),(function(form,e){
return (function() {if(null_p_(cdr(form))) {return false;
} else {return ((function(forms){
return ((function(f){
return (function() {if(eq_p_(car(f),string_dash__gt_symbol("else"))) {return e(list_dash_append(list(string_dash__gt_symbol("begin")),((function(o4){
return (function() {if(vector_p_(o4)) {return vector_dash_to_dash_list(o4);
} else {return o4;
}})()
;
}))(cdr(f))),e);
} else {return e(list(string_dash__gt_symbol("if"),car(f),list_dash_append(list(string_dash__gt_symbol("begin")),((function(o5){
return (function() {if(vector_p_(o5)) {return vector_dash_to_dash_list(o5);
} else {return o5;
}})()
;
}))(cdr(f))),list_dash_append(list(string_dash__gt_symbol("cond")),((function(o6){
return (function() {if(vector_p_(o6)) {return vector_dash_to_dash_list(o6);
} else {return o6;
}})()
;
}))(cdr(forms)))),e);
}})()
;
}))(car(forms));
}))(cdr(form));
}})()
;
}));
install_dash_expander(string_dash__gt_symbol("begin"),(function(form,e){
return e(list(list_dash_append(list(string_dash__gt_symbol("lambda"),_emptylst),((function(o7){
return (function() {if(vector_p_(o7)) {return vector_dash_to_dash_list(o7);
} else {return o7;
}})()
;
}))(cdr(form)))),e);
}));
install_dash_expander(string_dash__gt_symbol("define"),(function(form,e){
return ((function(sig){
return (function() {if(list_p_(sig)) {return ((function() {return e(list(string_dash__gt_symbol("set"),car(sig),list_dash_append(list(string_dash__gt_symbol("lambda"),cdr(sig)),((function(o8){
return (function() {if(vector_p_(o8)) {return vector_dash_to_dash_list(o8);
} else {return o8;
}})()
;
}))(cddr(form)))),e);
}))();
} else {return (function() {if(symbol_p_(sig)) {return ((function() {return e(list(string_dash__gt_symbol("set"),sig,caddr(form)),e);
}))();
} else {return ((function() {throw(string_dash_append("define requires a list"," or symbol to operate on"));
}))();
}})()
;
}})()
;
}))(cadr(form));
}));
install_dash_expander(string_dash__gt_symbol("let"),(function(form,e){
return ((function(forms,body){
return e(list_dash_append(list(list_dash_append(list(string_dash__gt_symbol("lambda"),map(car,forms)),((function(o9){
return (function() {if(vector_p_(o9)) {return vector_dash_to_dash_list(o9);
} else {return o9;
}})()
;
}))(body))),((function(o10){
return (function() {if(vector_p_(o10)) {return vector_dash_to_dash_list(o10);
} else {return o10;
}})()
;
}))(map(cadr,forms))),e);
}))(cadr(form),cddr(form));
}));
install_dash_expander(string_dash__gt_symbol("quote"),(function(form,e){
return ((function(src){
return ((function(q){
return (function() {if(symbol_p_(src)) {return ((function() {return list(string_dash__gt_symbol("quote"),src);
}))();
} else {return (function() {if(literal_p_(src)) {return ((function() {return src;
}))();
} else {return (function() {if(vector_p_(src)) {return ((function() {return vector_dash_map(q,src);
}))();
} else {return (function() {if(dict_p_(src)) {return ((function() {return dict_dash_map(q,src);
}))();
} else {return (function() {if(list_p_(src)) {return ((function() {return cons(string_dash__gt_symbol("list"),map(q,src));
}))();
} else {return ((function() {throw(string_dash_append("invalid type of expression: ",inspect(src)));
}))();
}})()
;
}})()
;
}})()
;
}})()
;
}})()
;
}))((function(el){
return e(list(string_dash__gt_symbol("quote"),el),e);
}));
}))(cadr(form));
}));
install_dash_expander(string_dash__gt_symbol("quasiquote"),(function(form,e){
return ((function(src){
return (function() {if(symbol_p_(src)) {return ((function() {return list(string_dash__gt_symbol("quote"),src);
}))();
} else {return (function() {if(literal_p_(src)) {return ((function() {return src;
}))();
} else {return (function() {if(vector_p_(src)) {return ((function() {return list(string_dash__gt_symbol("list_dash_to_dash_vector"),unquote_dash_splice_dash_expand(vector_dash_to_dash_list(src),e));
}))();
} else {return (function() {if(dict_p_(src)) {return ((function() {return dict_dash_map((function(el){
return (function() {if((list_p_(el) && eq_p_(car(src),string_dash__gt_symbol("unquote")))) {return e(cadr(el),e);
} else {return e(list(string_dash__gt_symbol("quasiquote"),el),e);
}})()
;
}),src);
}))();
} else {return (function() {if(list_p_(src)) {return ((function() {return (function() {if(eq_p_(car(src),string_dash__gt_symbol("unquote"))) {return e(cadr(src),e);
} else {return unquote_dash_splice_dash_expand(src,e);
}})()
;
}))();
} else {return ((function() {throw(string_dash_append("invalid type of expression: ",inspect(src)));
}))();
}})()
;
}})()
;
}})()
;
}})()
;
}})()
;
}))(cadr(form));
}));
var unquote_dash_splice_dash_expand = (function(lst,e){
var list_dash_push = (function(lst,item){
return (function() {if(null_p_(item)) {return lst;
} else {return cons(cons(string_dash__gt_symbol("list"),reverse(item)),lst);
}})()
;
});
var quote_dash_splice = (function(lst,lst_dash_acc,acc){
return (function() {if(null_p_(lst)) {return list_dash_push(lst_dash_acc,acc);
} else {return ((function(el){
return (function() {if((list_p_(el) && eq_p_(car(el),string_dash__gt_symbol("unquote_dash_splicing")))) {return ((function(src){
return quote_dash_splice(cdr(lst),cons(e(src,e),list_dash_push(lst_dash_acc,acc)),_emptylst);
}))((function() {if(literal_p_(cadr(el))) {return ((function() {return list(string_dash__gt_symbol("list"),cadr(el));
}))();
} else {return (function() {if(vector_p_(cadr(el))) {return ((function() {return list(string_dash__gt_symbol("vector_dash_to_dash_list"),cadr(el));
}))();
} else {return (function() {if(dict_p_(cadr(el))) {return ((function() {pp(el);
throw("cannot splice dict");
}))();
} else {return ((function() {return ((function(v){
return list(string_dash__gt_symbol("let"),list(list(v,cadr(el))),list(string_dash__gt_symbol("if"),list(string_dash__gt_symbol("vector_p_"),v),list(string_dash__gt_symbol("vector_dash_to_dash_list"),v),v));
}))(gensym());
}))();
}})()
;
}})()
;
}})()
);
} else {return quote_dash_splice(cdr(lst),lst_dash_acc,cons(e(list(string_dash__gt_symbol("quasiquote"),el),e),acc));
}})()
;
}))(car(lst));
}})()
;
});
return ((function(res){
return (function() {if(eq_p_(length(res),1)) {return car(res);
} else {return cons(string_dash__gt_symbol("list_dash_append"),reverse(res));
}})()
;
}))(quote_dash_splice(lst,_emptylst,_emptylst));
});
install_dash_expander(string_dash__gt_symbol("eval_dash_outlet"),(function(form,e){
return list(string_dash__gt_symbol("eval"),list(string_dash__gt_symbol("__compiler.compile"),e(cadr(form),e),list(string_dash__gt_symbol("__generator"))));
}));
var _natives_ = dict();
var native_dash_function = (function(name){
return ref(_natives_,name);
});
var install_dash_native = (function(name,func,validator){
return put_excl_(_natives_,symbol_dash__gt_string(name),(function(form,gen,expr_p_,parse){
validator(form);
return ref(gen,func)(cdr(form),expr_p_,parse);
}));
});
var native_p_ = (function(name){
return not(eq_p_(ref(_natives_,name)),undefined);
});
var verify_dash_not_dash_single = (function(form){
return assert((length(form) > 1),string_dash_append("form requires at least one operand:",inspect(form)));
});
install_dash_native(string_dash__gt_symbol("and"),string_dash__gt_symbol("write_dash_and"),verify_dash_not_dash_single);
install_dash_native(string_dash__gt_symbol("or"),string_dash__gt_symbol("write_dash_or"),verify_dash_not_dash_single);
install_dash_native(string_dash__gt_symbol("+"),string_dash__gt_symbol("write_dash_add"),verify_dash_not_dash_single);
install_dash_native(string_dash__gt_symbol("_dash_"),string_dash__gt_symbol("write_dash_subtract"),verify_dash_not_dash_single);
install_dash_native(string_dash__gt_symbol("*"),string_dash__gt_symbol("write_dash_multiply"),verify_dash_not_dash_single);
install_dash_native(string_dash__gt_symbol("/"),string_dash__gt_symbol("write_dash_divide"),verify_dash_not_dash_single);
install_dash_native(string_dash__gt_symbol("_gt_"),string_dash__gt_symbol("write_dash_gt"),verify_dash_not_dash_single);
install_dash_native(string_dash__gt_symbol("_lt_"),string_dash__gt_symbol("write_dash_lt"),verify_dash_not_dash_single);
install_dash_native(string_dash__gt_symbol("_per_"),string_dash__gt_symbol("write_dash_mod"),verify_dash_not_dash_single);
install_dash_native(string_dash__gt_symbol("require"),string_dash__gt_symbol("write_dash_require"),(function(form){
verify_dash_not_dash_single(form);
return for_dash_each((function(el){
return assert((list_p_(el) && eq_p_(length(el),2)),string_dash_append("require needs a list of ","2 element lists: ",inspect(el)));
}),cdr(form));
}));
var parse = (function(form,generator){
var expr_p_ = vector_dash_to_dash_list(Array.prototype.slice.call(arguments, 2));
return ((function(expr_p_,_per_parse){
var parse_dash_literal = (function(form){
return (function() {if(number_p_(form)) {return ((function() {return generator.write_dash_number(form,not(expr_p_));
}))();
} else {return (function() {if(string_p_(form)) {return ((function() {return generator.write_dash_string(form,not(expr_p_));
}))();
} else {return (function() {if(boolean_p_(form)) {return ((function() {return generator.write_dash_boolean(form,not(expr_p_));
}))();
} else {return (function() {if(null_p_(form)) {return ((function() {return generator.write_dash_empty_dash_list(form,not(expr_p_));
}))();
} else {return ((function() {throw(string_dash_append("Invalid literal: ",inspect(form)));
}))();
}})()
;
}})()
;
}})()
;
}})()
;
});
var parse_dash_set = (function(form){
assert(not(expr_p_),string_dash_append("set{!} cannot be an expression: ",_dash__gt_string(form)));
assert(symbol_p_(cadr(form)),"set{!} expects a symbol to operate on");
return (function() {if(eq_p_(car(form),string_dash__gt_symbol("set"))) {return generator.write_dash_set;
} else {return generator.write_dash_set_excl_;
}})()
(cadr(form),caddr(form),_per_parse);
});
var parse_dash_if = (function(form){
assert((length(form) > 2),string_dash_append("`if` has no branches: ",inspect(form)));
return generator.write_dash_if(cadr(form),caddr(form),expr_p_,_per_parse,(function() {if(null_p_(cdddr(form))) {return false;
} else {return cadddr(form);
}})()
);
});
var parse_dash_lambda = (function(form){
assert((null_p_(cadr(form)) || list_p_(cadr(form)) || symbol_p_(cadr(form))),"lambda expects a list or symbol for arguments");
return ((function(args){
return generator.write_dash_lambda(args,cddr(form),expr_p_,_per_parse);
}))(cadr(form));
});
var parse_dash_func_dash_call = (function(form){
return ((function(func){
assert((symbol_p_(func) || list_p_(func)),string_dash_append("operator is not a procedure: ",_dash__gt_string(func)));
return generator.write_dash_func_dash_call(func,cdr(form),expr_p_,_per_parse);
}))(car(form));
});
var parse_dash_quoted = (function(form){
return ((function(src){
return (function() {if(symbol_p_(src)) {return ((function() {return generator.write_dash_symbol(src,not(expr_p_));
}))();
} else {return (function() {if(literal_p_(src)) {return ((function() {return parse_dash_literal(src);
}))();
} else {return ((function() {throw(string_dash_append("unexpected type of object in quote, ","literal expected: ",inspect(form)));
}))();
}})()
;
}})()
;
}))(cadr(form));
});
var parse_dash_list = (function(form){
return ((function(first){
return (function() {if(eq_p_(first,string_dash__gt_symbol("if"))) {return ((function() {return parse_dash_if(form);
}))();
} else {return (function() {if(eq_p_(first,string_dash__gt_symbol("lambda"))) {return ((function() {return parse_dash_lambda(form);
}))();
} else {return (function() {if(eq_p_(first,string_dash__gt_symbol("quote"))) {return ((function() {return parse_dash_quoted(form);
}))();
} else {return (function() {if((eq_p_(first,string_dash__gt_symbol("set_excl_")) || eq_p_(first,string_dash__gt_symbol("set")))) {return ((function() {return parse_dash_set(form);
}))();
} else {return (function() {if(native_p_(first)) {return ((function() {return native_dash_function(first)(form,generator,expr_p_,_per_parse);
}))();
} else {return ((function() {return parse_dash_func_dash_call(form);
}))();
}})()
;
}})()
;
}})()
;
}})()
;
}})()
;
}))(car(form));
});
var parse_dash_vector = (function(vec){
return parse_dash_list(cons(string_dash__gt_symbol("vector"),vector_dash_to_dash_list(vec)));
});
var parse_dash_dict = (function(dict){
return ((function(lst,i){
return ((function(qlst){
return parse_dash_list(cons(string_dash__gt_symbol("dict"),qlst));
}))(map((function(el){
i = (i + 1);
return (function() {if(eq_p_(((i - 1) % 2),0)) {return list(string_dash__gt_symbol("quote"),el);
} else {return el;
}})()
;
}),lst));
}))(dict_dash_to_dash_list(dict),0);
});
return (function() {if(symbol_p_(form)) {return ((function() {return generator.write_dash_term(form,not(expr_p_));
}))();
} else {return (function() {if(literal_p_(form)) {return ((function() {return parse_dash_literal(form);
}))();
} else {return (function() {if(list_p_(form)) {return ((function() {return parse_dash_list(form);
}))();
} else {return (function() {if(vector_p_(form)) {return ((function() {return parse_dash_vector(form);
}))();
} else {return (function() {if(dict_p_(form)) {return ((function() {return parse_dash_dict(form);
}))();
} else {return ((function() {throw(string_dash_append("Unkown thing: ",form));
}))();
}})()
;
}})()
;
}})()
;
}})()
;
}})()
;
}))(opt(expr_p_,false),(function(form){
var expr_p_ = vector_dash_to_dash_list(Array.prototype.slice.call(arguments, 1));
return parse(form,generator,opt(expr_p_,false));
}));
});
var read = (function(src){
return reader(grammar,src,vector());
});
var compile = (function(src,generator){
(function() {if(not(macro_dash_generator)) {macro_dash_generator = generator;
} else {return false;
}})()
;
return ((function(f){
parse(f,generator);
return generator.get_dash_code();
}))(expand((function() {if(string_p_(src)) {return read(src);
} else {return src;
}})()
));
});
module.exports = dict(string_dash__gt_symbol("read"),read,string_dash__gt_symbol("expand"),expand,string_dash__gt_symbol("parse"),parse,string_dash__gt_symbol("compile"),compile,string_dash__gt_symbol("install_dash_expander"),install_dash_expander,string_dash__gt_symbol("expand_dash_once"),expand_dash_once,string_dash__gt_symbol("expand_dash_nth"),expand_dash_nth,string_dash__gt_symbol("pretty"),pretty,string_dash__gt_symbol("expander_p_"),expander_p_,string_dash__gt_symbol("expander_dash_function"),expander_dash_function,string_dash__gt_symbol("literal_p_"),literal_p_,string_dash__gt_symbol("set_dash_macro_dash_generator"),(function(g){
return (function() {if(not(macro_dash_generator)) {macro_dash_generator = g;
} else {return false;
}})()
;
}),string_dash__gt_symbol("new_dash_string"),new_dash_string);
}))();


});

require.define("/compiler.js", function (require, module, exports, __dirname, __filename) {
    var __util = require('util');

var _emptylst = [null];

function string_dash__gt_symbol(str) {
    str = str.replace(/-/g, '_dash_');
    str = str.replace(/\?/g, '_p_');
    str = str.replace(/\!/g, '_excl_');
    str = str.replace(/>/g, '_gt_');
    str = str.replace(/</g, '_lt_');
    str = str.replace(/%/g, '_per_');

    return {
        str: str,
        symbol: true
    };
}

function map(func, lst) {
    if(null_p_(lst)) {
        return _emptylst;
    }
    else {
        return cons(func(car(lst)),
                    map(func, cdr(lst)));
    }
}

function for_dash_each(func, lst) {
    if(!null_p_(lst)) {
        func(car(lst));
        for_dash_each(func, cdr(lst));
    }
}

function fold(func, acc, lst) {
    if(null_p_(lst)) {
        return acc;
    }
    else {
        return fold(func, func(car(lst), acc), cdr(lst));
    }
}

function make_dash_vector(i) {
    return new Array(i);
}

function vector_dash_map(func, vec) {
    var res = [];

    for(var i=0, len=vec.length; i<len; i++) {
        res.push(func(vec[i]));
    }

    return res;
}

function vector_dash_for_dash_each(func, vec) {
    for(var i=0, len=vec.length; i<len; i++) {
        func(vec[i]);
    }
}

function vector_dash_length(vec) {
    return vec.length;
}

function display(msg) {
    __util.print(msg);
}

function pp(obj) {
    display(inspect(obj) + '\n');
}

function inspect(obj) {
    return __util.inspect(obj, null, 50);
}

function not(v) {
    return (typeof(v) != 'number' &&
            !v);
}

function eq_p_(v1, v2) {
    if(symbol_p_(v1) && symbol_p_(v2)) {
        return v1.str == v2.str;
    }

    return v1 === v2;
}

function equal_p_(v1, v2) {    
    if(list_p_(v1) && list_p_(v2)) {
        function l(lst1, lst2) {
            var n1 = null_p_(lst1);
            var n2 = null_p_(lst2);

            if(n1 && n2) {
                return true;
            }
            else if(n1 || n2) {
                return false
            }
            else if(equal_p_(car(lst1), car(lst2))) {
                return l(cdr(lst1), cdr(lst2));
            }

            return false;
        }

        return l(v1, v2);
    }
    else if(vector_p_(v1) && vector_p_(v2)) {
        for(var i=0, len=v1.length; i<len; i++) {
            if(!equal_p_(v1[i], v2[i])) {
                return false;
            }
        }
        return true;
    }
    else if(dict_p_(v1) && dict_p_(v2)) {
        for(var k in v1) {
            if(!equal_p_(v1[k], v2[k])) {
                return false;
            }
        }
        return true;
    }
    else if(symbol_p_(v1) && symbol_p_(v2)) {
        return v1.str == v2.str;
    }

    return v1 == v2;
}

function null_p_(arr) {
    return (arr &&
            arr.length !== undefined &&
            arr.length === 1 &&
            arr[0] === null);
}

function cons(v1, v2) {
    var lst = [v1, v2];
    lst.list = true;
    return lst;
}

function car(arr) {
    return arr[0];
}

function cdr(arr) {
    return arr[1];
}

function cadr(lst) {
    return car(cdr(lst));
}

function cddr(lst) {
    return cdr(cdr(lst));
}

function caddr(lst) {
    return car(cdr(cdr(lst)));
}

function cdddr(lst) {
    return cdr(cdr(cdr(lst)));
}

function cadddr(lst) {
    return car(cdr(cdr(cdr(lst))));
}

function cddddr(lst) {
    return cdr(cdr(cdr(cdr(lst))));
}

function length(lst) {
    var i=0;
    for_dash_each(function(obj) { i++; },
                  lst);
    return i;
}

function reverse(lst) {
    if(null_p_(lst)) {
        return _emptylst;
    }
    return list_dash_append(reverse(cdr(lst)), list(car(lst)));
}

function make_dash_list(arr) {
    arr.list = true;
    return arr;
}

function list() {
    return vector_dash_to_dash_list(
        Array.prototype.slice.call(arguments)
    );
}

function vector_dash_to_dash_list(vec) {
    function l(v, i) {
        if(i < v.length) {
            return cons(v[i], l(v, i+1));
        }
        else {
            return _emptylst;
        }
    }

    return l(vec, 0);
}

function list_dash_to_dash_vector(lst) {
    var res = [];

    function m(lst) {
        if(!null_p_(lst)) {
            res.push(car(lst));
            m(cdr(lst));
        }
    };

    m(lst);
    return res;
}

function vector_dash_ref(arr, i) {
    return arr[i];
}

function vector_dash_set_excl_(arr, i, v) {
    arr[i] = v;
}

function vector_dash_concat(arr1, arr2) {
    return arr1.concat(arr2);
}

function vector() {
    return Array.prototype.slice.call(arguments);
}

function vector_dash_push(vec, val) {
    vec.push(val);
}

function dict() {
    var keyvals = Array.prototype.slice.call(arguments);
    var res = {};

    for(var i=0, len=keyvals.length; i<len; i+=2) {
        var key = keyvals[i];

        if(key.str) {
            key = key.str;
        }

        res[key] = keyvals[i+1];
    }

    return res;
}

var hash_dash_map = dict;


function dict_dash_map(func, dict) {
    var res = {};
    for(var k in dict) {
        res[k] = func(dict[k]);
    }
    return res;
}

var hash_dash_map_dash_map = dict_dash_map;

function hash_dash_map_dash_to_dash_vec(obj) {
    var res = [];
    for(var k in obj) {
        res.push(vector_to_list([string_dash__gt_symbol('quote'),
                                 string_dash__gt_symbol(k)]));
        res.push(obj[k]);
    }
    return res;
}

function dict_dash_to_dash_list(dict) {
    var res = [];
    for(var k in dict) {
        res.push(string_dash__gt_symbol(k));
        res.push(dict[k]);
    }
    return vector_dash_to_dash_list(res);
}

function keys(dict) {
    var res = [];
    for(var k in dict) {
        res.push(k);
    }
    return vector_dash_to_dash_list(res);
}

function vals(dict) {
    var res = [];
    for(var k in dict) {
        res.push(dict[k]);
    }
    return vector_dash_to_dash_list(res);
}

function zip(keys, vals) {
    var obj = {};
    for(var i=0, len=keys.length; i<len; i++) {
        obj[keys[i]] = vals[i];
    }
    return obj;
}

function object_dash_ref(obj, key) {
    return obj[key];
}

function number_p_(obj) {
    return typeof obj == 'number';
}

function symbol_p_(obj) {
    return obj && obj.str != undefined && obj.symbol != undefined;
}

function string_p_(obj) {
    return typeof obj == 'string';
}

function boolean_p_(obj) {
    return obj === true || obj === false;
}

function list_p_(obj) {
    return !!obj && obj.list !== undefined;
}

function vector_p_(obj) {
    var v = (obj && typeof obj == 'object' && obj.length !== undefined);
    return !list_p_(obj) && !null_p_(obj) && v;
}

function dict_p_(obj) {
    var d = (obj && typeof obj == 'object' && obj.length === undefined);
    return !symbol_p_(obj) && d;
}

function _dash__gt_string(obj) {
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
    else if(list_p_(obj)) {
        return '(' + 
            map(function(obj) { return _dash__gt_string(obj); },
                obj).join(' ') +
            ')';
    }
    else if(vector_p_(obj)) {
        return '[' +
            vector_dash_map(function(obj) { return _dash__gt_string(obj); },
                       obj).join(' ') +
            ']';
    }
    else if(dict_p_(obj)) {
        var res = [];
        for(var k in obj) {
            res.push(k + ': ' + __util.inspect(obj[k], null, 10));
        }
        return '{' + res.join(', ') + '}';
    }
    else if(null_p_(obj)) {
        return '()';
    }
}

function list_dash_append(lst1, lst2) {
    function loop(lst) {
        if(null_p_(lst)) {
            return lst2;
        }
        else {
            return cons(car(lst), loop(cdr(lst)));
        }
    };

    if(null_p_(lst1)) {
        return lst2;
    }
    else {
        return loop(lst1);
    }
}

function string_dash_append() {
    return Array.prototype.slice.call(arguments).join('');
}

function unquote_splice(lst) {
    // if(!lst.length || lst.length != 2 || lst[1].length === undefined) {
    //     return lst;
    // }

    if(null_p_(lst)) {
        return _emptylst;
    }
    else {
        var elem = car(lst);
        var rest = unquote_splice(cdr(lst));

        if(elem.please_splice) {
            if(!list_p_(elem.data) && !null_p_(elem.data)) {
                throw ("Lists can only splice lists, unexpected object: " +
                       __gt_string(elem.data));
            }

            // do we need to unquote_splice elem.data?
            return list_dash_append(elem.data, rest);
        }
        else {
            return cons(elem, rest);
        }
    }
}

function unquote_splice_vec(vec) {
    var ret = [];
    for(var i=0, len=vec.length; i<len; i++) {
        var obj = vec[i];

        if(obj && obj.please_splice) {
            if(!vector_p_(obj.data)) {
                throw ("Vectors can only splice vectors, unexpected object: " +
                       obj.data);
            }
            ret = ret.concat(obj.data);
        }
        else {
            ret.push(obj);
        }
    }

    return ret;
}

function unquote_splice_map(obj) {
    // this is expensive, but I don't really care. this will all be
    // rewritten soon enough anyway.
    var res = {};

    for(var k in obj) {
        var prop = obj[k];
        if(prop && prop.please_splice) {
            if(!dict_p_(prop.data)) {
                throw ("Maps can only splice maps, unexpected object: " +
                       prop.data);
            }

            for(j in prop.data) {
                res[j] = prop.data[j];
            }
        }
        else if(k != '__unquote_splicing') {
            res[k] = prop;
        }
    }

    return res;
}
((function() {var util = require("util");var fs = require("fs");var reader = require("./parser");var grammar = require("./grammar");var js = require("./backends/js");var _gensym = 0;
var gensym = (function() {_gensym = (_gensym + 1);
return string_dash__gt_symbol(("o" + _gensym));
});
var literal_p_ = (function(x){
return (number_p_(x) || string_p_(x) || boolean_p_(x) || null_p_(x));
});
var application_p_ = (function(form){
return (list_p_(form) && not(expander_p_(car(form))));
});
var ref = (function(obj,name){
return object_dash_ref(obj,symbol_dash__gt_string(name));
});
var put_excl_ = vector_dash_set_excl_;
var opt = (function(arg,def){
return (function() {if(null_p_(arg)) {return def;
} else {return car(arg);
}})()
;
});
var _str = "";
var disp = (function(str){
_str = (_str + str);
});
var new_dash_string = (function() {_str = "";
});
var pretty = (function(obj){
var i = vector_dash_to_dash_list(Array.prototype.slice.call(arguments, 1));
var pad = (function(n){
return vector_dash_for_dash_each((function(_){
return disp(" ");
}),make_dash_vector(n));
});
var space = (function(obj){
return (function() {if((literal_p_(obj) || symbol_p_(obj))) {return ((function() {return vector_dash_length(_dash__gt_string(obj));
}))();
} else {return (function() {if(list_p_(obj)) {return ((function() {return (length(obj) + 1 + fold((function(el,acc){
return (acc + space(el));
}),0,obj));
}))();
} else {return (function() {if(dict_p_(obj)) {return ((function() {return space(dict_dash_to_dash_list(obj));
}))();
} else {return (function() {if(vector_p_(obj)) {return ((function() {return space(vector_dash_to_dash_list(obj));
}))();
} else {return false;
}})()
;
}})()
;
}})()
;
}})()
;
});
((function(i){
return (function() {if((symbol_p_(obj) || literal_p_(obj))) {return ((function() {return disp(_dash__gt_string(obj));
}))();
} else {return (function() {if(list_p_(obj)) {return ((function() {return ((function(node,childr,sp){
disp("(");
pretty(node,(i + 1));
for_dash_each((function(item){
(function() {if(sp) {return ((function() {disp("\n");
return pad(i);
}))();
} else {return disp(" ");
}})()
;
return pretty(item,(i + 1));
}),childr);
return disp(")");
}))(car(obj),cdr(obj),(space(obj) > 30));
}))();
} else {return false;
}})()
;
}})()
;
}))((function() {if(null_p_(i)) {return 1;
} else {return car(i);
}})()
);
return _str;
});
var symbol_dash__gt_string = (function(sym){
return sym.str;
});
var assert = (function(cnd,msg){
return (function() {if(not(cnd)) {throw(msg);
} else {return false;
}})()
;
});
var _expanders_ = dict();
var expander_dash_function = (function(name){
return ref(_expanders_,name);
});
var install_dash_expander = (function(name,func){
return put_excl_(_expanders_,symbol_dash__gt_string(name),func);
});
var expander_p_ = (function(name){
return not(eq_p_(ref(_expanders_,name),undefined));
});
var expand = (function(form){
return initial_dash_expander(form,initial_dash_expander);
});
var expand_dash_once = (function(form){
return initial_dash_expander(form,(function(x,e){
return x;
}));
});
var expand_dash_nth = (function(form,n){
return ((function(i){
return initial_dash_expander(form,(function(form,e){
return ((function(e1){
return e1(form,e1);
}))((function(x,e2){
return (function() {if(not((i < n))) {return x;
} else {return ((function() {i = (i + 1);
return e(x,e2);
}))();
}})()
;
}));
}));
}))(0);
});
var initial_dash_expander = (function(form,e){
return (function() {if(symbol_p_(form)) {return ((function() {return form;
}))();
} else {return (function() {if(literal_p_(form)) {return ((function() {return form;
}))();
} else {return (function() {if(vector_p_(form)) {return ((function() {return form;
}))();
} else {return (function() {if(dict_p_(form)) {return ((function() {return form;
}))();
} else {return (function() {if(expander_p_(car(form))) {return ((function() {return expander_dash_function(car(form))(form,e);
}))();
} else {return ((function() {return map((function(subform){
return e(subform,e);
}),form);
}))();
}})()
;
}})()
;
}})()
;
}})()
;
}})()
;
});
install_dash_expander(string_dash__gt_symbol("define_dash_expander"),(function(form,e){
return ((function(sig){
return ((function(name,arg_dash_names,body){
install_dash_expander(name,make_dash_expander(arg_dash_names,body));
return true;
}))(car(sig),cdr(sig),cddr(form));
}))(cadr(form));
}));
var make_dash_expander = (function(arg_dash_names,body){
assert(eq_p_(length(arg_dash_names),2),"define-expander functions must take two arguments");
return eval(compile(list_dash_append(list(string_dash__gt_symbol("lambda"),arg_dash_names),((function(o1){
return (function() {if(vector_p_(o1)) {return vector_dash_to_dash_list(o1);
} else {return o1;
}})()
;
}))(body)),macro_dash_generator.make_dash_fresh()));
});
install_dash_expander(string_dash__gt_symbol("define_dash_macro"),(function(form,e){
return ((function(sig){
return ((function(name,pattern,body){
install_dash_macro(name,pattern,body);
return true;
}))(car(sig),cdr(sig),cddr(form));
}))(cadr(form));
}));
var macro_dash_generator = false;
var install_dash_macro = (function(name,pattern,body){
return install_dash_expander(name,make_dash_macro(pattern,body));
});
var make_dash_macro = (function(pattern,body){
return ((function(x,e){
return eval(compile(list(string_dash__gt_symbol("lambda"),list(x,e),list(e,list_dash_append(list(string_dash__gt_symbol("let"),destructure(pattern,list(string_dash__gt_symbol("cdr"),x),_emptylst)),((function(o2){
return (function() {if(vector_p_(o2)) {return vector_dash_to_dash_list(o2);
} else {return o2;
}})()
;
}))(body)),e)),macro_dash_generator.make_dash_fresh()));
}))(gensym(),gensym());
});
var destructure = (function(pattern,access,bindings){
return (function() {if(null_p_(pattern)) {return ((function() {return bindings;
}))();
} else {return (function() {if(eq_p_(car(pattern),string_dash__gt_symbol("."))) {return ((function() {return cons(list(cadr(pattern),access),bindings);
}))();
} else {return ((function() {return cons(list(car(pattern),list(string_dash__gt_symbol("car"),access)),destructure(cdr(pattern),list(string_dash__gt_symbol("cdr"),access),bindings));
}))();
}})()
;
}})()
;
});
install_dash_expander(string_dash__gt_symbol("lambda"),(function(form,e){
return list_dash_append(list(string_dash__gt_symbol("lambda"),car(cdr(form))),((function(o3){
return (function() {if(vector_p_(o3)) {return vector_dash_to_dash_list(o3);
} else {return o3;
}})()
;
}))(map((function(subform){
return e(subform,e);
}),cdr(cdr(form)))));
}));
install_dash_expander(string_dash__gt_symbol("cond"),(function(form,e){
return (function() {if(null_p_(cdr(form))) {return false;
} else {return ((function(forms){
return ((function(f){
return (function() {if(eq_p_(car(f),string_dash__gt_symbol("else"))) {return e(list_dash_append(list(string_dash__gt_symbol("begin")),((function(o4){
return (function() {if(vector_p_(o4)) {return vector_dash_to_dash_list(o4);
} else {return o4;
}})()
;
}))(cdr(f))),e);
} else {return e(list(string_dash__gt_symbol("if"),car(f),list_dash_append(list(string_dash__gt_symbol("begin")),((function(o5){
return (function() {if(vector_p_(o5)) {return vector_dash_to_dash_list(o5);
} else {return o5;
}})()
;
}))(cdr(f))),list_dash_append(list(string_dash__gt_symbol("cond")),((function(o6){
return (function() {if(vector_p_(o6)) {return vector_dash_to_dash_list(o6);
} else {return o6;
}})()
;
}))(cdr(forms)))),e);
}})()
;
}))(car(forms));
}))(cdr(form));
}})()
;
}));
install_dash_expander(string_dash__gt_symbol("begin"),(function(form,e){
return e(list(list_dash_append(list(string_dash__gt_symbol("lambda"),_emptylst),((function(o7){
return (function() {if(vector_p_(o7)) {return vector_dash_to_dash_list(o7);
} else {return o7;
}})()
;
}))(cdr(form)))),e);
}));
install_dash_expander(string_dash__gt_symbol("define"),(function(form,e){
return ((function(sig){
return (function() {if(list_p_(sig)) {return ((function() {return e(list(string_dash__gt_symbol("set"),car(sig),list_dash_append(list(string_dash__gt_symbol("lambda"),cdr(sig)),((function(o8){
return (function() {if(vector_p_(o8)) {return vector_dash_to_dash_list(o8);
} else {return o8;
}})()
;
}))(cddr(form)))),e);
}))();
} else {return (function() {if(symbol_p_(sig)) {return ((function() {return e(list(string_dash__gt_symbol("set"),sig,caddr(form)),e);
}))();
} else {return ((function() {throw(string_dash_append("define requires a list"," or symbol to operate on"));
}))();
}})()
;
}})()
;
}))(cadr(form));
}));
install_dash_expander(string_dash__gt_symbol("let"),(function(form,e){
return ((function(forms,body){
return e(list_dash_append(list(list_dash_append(list(string_dash__gt_symbol("lambda"),map(car,forms)),((function(o9){
return (function() {if(vector_p_(o9)) {return vector_dash_to_dash_list(o9);
} else {return o9;
}})()
;
}))(body))),((function(o10){
return (function() {if(vector_p_(o10)) {return vector_dash_to_dash_list(o10);
} else {return o10;
}})()
;
}))(map(cadr,forms))),e);
}))(cadr(form),cddr(form));
}));
install_dash_expander(string_dash__gt_symbol("quote"),(function(form,e){
return ((function(src){
return ((function(q){
return (function() {if(symbol_p_(src)) {return ((function() {return list(string_dash__gt_symbol("quote"),src);
}))();
} else {return (function() {if(literal_p_(src)) {return ((function() {return src;
}))();
} else {return (function() {if(vector_p_(src)) {return ((function() {return vector_dash_map(q,src);
}))();
} else {return (function() {if(dict_p_(src)) {return ((function() {return dict_dash_map(q,src);
}))();
} else {return (function() {if(list_p_(src)) {return ((function() {return cons(string_dash__gt_symbol("list"),map(q,src));
}))();
} else {return ((function() {throw(string_dash_append("invalid type of expression: ",inspect(src)));
}))();
}})()
;
}})()
;
}})()
;
}})()
;
}})()
;
}))((function(el){
return e(list(string_dash__gt_symbol("quote"),el),e);
}));
}))(cadr(form));
}));
install_dash_expander(string_dash__gt_symbol("quasiquote"),(function(form,e){
return ((function(src){
return (function() {if(symbol_p_(src)) {return ((function() {return list(string_dash__gt_symbol("quote"),src);
}))();
} else {return (function() {if(literal_p_(src)) {return ((function() {return src;
}))();
} else {return (function() {if(vector_p_(src)) {return ((function() {return list(string_dash__gt_symbol("list_dash_to_dash_vector"),unquote_dash_splice_dash_expand(vector_dash_to_dash_list(src),e));
}))();
} else {return (function() {if(dict_p_(src)) {return ((function() {return dict_dash_map((function(el){
return (function() {if((list_p_(el) && eq_p_(car(src),string_dash__gt_symbol("unquote")))) {return e(cadr(el),e);
} else {return e(list(string_dash__gt_symbol("quasiquote"),el),e);
}})()
;
}),src);
}))();
} else {return (function() {if(list_p_(src)) {return ((function() {return (function() {if(eq_p_(car(src),string_dash__gt_symbol("unquote"))) {return e(cadr(src),e);
} else {return unquote_dash_splice_dash_expand(src,e);
}})()
;
}))();
} else {return ((function() {throw(string_dash_append("invalid type of expression: ",inspect(src)));
}))();
}})()
;
}})()
;
}})()
;
}})()
;
}})()
;
}))(cadr(form));
}));
var unquote_dash_splice_dash_expand = (function(lst,e){
var list_dash_push = (function(lst,item){
return (function() {if(null_p_(item)) {return lst;
} else {return cons(cons(string_dash__gt_symbol("list"),reverse(item)),lst);
}})()
;
});
var quote_dash_splice = (function(lst,lst_dash_acc,acc){
return (function() {if(null_p_(lst)) {return list_dash_push(lst_dash_acc,acc);
} else {return ((function(el){
return (function() {if((list_p_(el) && eq_p_(car(el),string_dash__gt_symbol("unquote_dash_splicing")))) {return ((function(src){
return quote_dash_splice(cdr(lst),cons(e(src,e),list_dash_push(lst_dash_acc,acc)),_emptylst);
}))((function() {if(literal_p_(cadr(el))) {return ((function() {return list(string_dash__gt_symbol("list"),cadr(el));
}))();
} else {return (function() {if(vector_p_(cadr(el))) {return ((function() {return list(string_dash__gt_symbol("vector_dash_to_dash_list"),cadr(el));
}))();
} else {return (function() {if(dict_p_(cadr(el))) {return ((function() {pp(el);
throw("cannot splice dict");
}))();
} else {return ((function() {return ((function(v){
return list(string_dash__gt_symbol("let"),list(list(v,cadr(el))),list(string_dash__gt_symbol("if"),list(string_dash__gt_symbol("vector_p_"),v),list(string_dash__gt_symbol("vector_dash_to_dash_list"),v),v));
}))(gensym());
}))();
}})()
;
}})()
;
}})()
);
} else {return quote_dash_splice(cdr(lst),lst_dash_acc,cons(e(list(string_dash__gt_symbol("quasiquote"),el),e),acc));
}})()
;
}))(car(lst));
}})()
;
});
return ((function(res){
return (function() {if(eq_p_(length(res),1)) {return car(res);
} else {return cons(string_dash__gt_symbol("list_dash_append"),reverse(res));
}})()
;
}))(quote_dash_splice(lst,_emptylst,_emptylst));
});
install_dash_expander(string_dash__gt_symbol("eval_dash_outlet"),(function(form,e){
return list(string_dash__gt_symbol("eval"),list(string_dash__gt_symbol("__compiler.compile"),e(cadr(form),e),list(string_dash__gt_symbol("__generator"))));
}));
var _natives_ = dict();
var native_dash_function = (function(name){
return ref(_natives_,name);
});
var install_dash_native = (function(name,func,validator){
return put_excl_(_natives_,symbol_dash__gt_string(name),(function(form,gen,expr_p_,parse){
validator(form);
return ref(gen,func)(cdr(form),expr_p_,parse);
}));
});
var native_p_ = (function(name){
return not(eq_p_(ref(_natives_,name)),undefined);
});
var verify_dash_not_dash_single = (function(form){
return assert((length(form) > 1),string_dash_append("form requires at least one operand:",inspect(form)));
});
install_dash_native(string_dash__gt_symbol("and"),string_dash__gt_symbol("write_dash_and"),verify_dash_not_dash_single);
install_dash_native(string_dash__gt_symbol("or"),string_dash__gt_symbol("write_dash_or"),verify_dash_not_dash_single);
install_dash_native(string_dash__gt_symbol("+"),string_dash__gt_symbol("write_dash_add"),verify_dash_not_dash_single);
install_dash_native(string_dash__gt_symbol("_dash_"),string_dash__gt_symbol("write_dash_subtract"),verify_dash_not_dash_single);
install_dash_native(string_dash__gt_symbol("*"),string_dash__gt_symbol("write_dash_multiply"),verify_dash_not_dash_single);
install_dash_native(string_dash__gt_symbol("/"),string_dash__gt_symbol("write_dash_divide"),verify_dash_not_dash_single);
install_dash_native(string_dash__gt_symbol("_gt_"),string_dash__gt_symbol("write_dash_gt"),verify_dash_not_dash_single);
install_dash_native(string_dash__gt_symbol("_lt_"),string_dash__gt_symbol("write_dash_lt"),verify_dash_not_dash_single);
install_dash_native(string_dash__gt_symbol("_per_"),string_dash__gt_symbol("write_dash_mod"),verify_dash_not_dash_single);
install_dash_native(string_dash__gt_symbol("require"),string_dash__gt_symbol("write_dash_require"),(function(form){
verify_dash_not_dash_single(form);
return for_dash_each((function(el){
return assert((list_p_(el) && eq_p_(length(el),2)),string_dash_append("require needs a list of ","2 element lists: ",inspect(el)));
}),cdr(form));
}));
var parse = (function(form,generator){
var expr_p_ = vector_dash_to_dash_list(Array.prototype.slice.call(arguments, 2));
return ((function(expr_p_,_per_parse){
var parse_dash_literal = (function(form){
return (function() {if(number_p_(form)) {return ((function() {return generator.write_dash_number(form,not(expr_p_));
}))();
} else {return (function() {if(string_p_(form)) {return ((function() {return generator.write_dash_string(form,not(expr_p_));
}))();
} else {return (function() {if(boolean_p_(form)) {return ((function() {return generator.write_dash_boolean(form,not(expr_p_));
}))();
} else {return (function() {if(null_p_(form)) {return ((function() {return generator.write_dash_empty_dash_list(form,not(expr_p_));
}))();
} else {return ((function() {throw(string_dash_append("Invalid literal: ",inspect(form)));
}))();
}})()
;
}})()
;
}})()
;
}})()
;
});
var parse_dash_set = (function(form){
assert(not(expr_p_),string_dash_append("set{!} cannot be an expression: ",_dash__gt_string(form)));
assert(symbol_p_(cadr(form)),"set{!} expects a symbol to operate on");
return (function() {if(eq_p_(car(form),string_dash__gt_symbol("set"))) {return generator.write_dash_set;
} else {return generator.write_dash_set_excl_;
}})()
(cadr(form),caddr(form),_per_parse);
});
var parse_dash_if = (function(form){
assert((length(form) > 2),string_dash_append("`if` has no branches: ",inspect(form)));
return generator.write_dash_if(cadr(form),caddr(form),expr_p_,_per_parse,(function() {if(null_p_(cdddr(form))) {return false;
} else {return cadddr(form);
}})()
);
});
var parse_dash_lambda = (function(form){
assert((null_p_(cadr(form)) || list_p_(cadr(form)) || symbol_p_(cadr(form))),"lambda expects a list or symbol for arguments");
return ((function(args){
return generator.write_dash_lambda(args,cddr(form),expr_p_,_per_parse);
}))(cadr(form));
});
var parse_dash_func_dash_call = (function(form){
return ((function(func){
assert((symbol_p_(func) || list_p_(func)),string_dash_append("operator is not a procedure: ",_dash__gt_string(func)));
return generator.write_dash_func_dash_call(func,cdr(form),expr_p_,_per_parse);
}))(car(form));
});
var parse_dash_quoted = (function(form){
return ((function(src){
return (function() {if(symbol_p_(src)) {return ((function() {return generator.write_dash_symbol(src,not(expr_p_));
}))();
} else {return (function() {if(literal_p_(src)) {return ((function() {return parse_dash_literal(src);
}))();
} else {return ((function() {throw(string_dash_append("unexpected type of object in quote, ","literal expected: ",inspect(form)));
}))();
}})()
;
}})()
;
}))(cadr(form));
});
var parse_dash_list = (function(form){
return ((function(first){
return (function() {if(eq_p_(first,string_dash__gt_symbol("if"))) {return ((function() {return parse_dash_if(form);
}))();
} else {return (function() {if(eq_p_(first,string_dash__gt_symbol("lambda"))) {return ((function() {return parse_dash_lambda(form);
}))();
} else {return (function() {if(eq_p_(first,string_dash__gt_symbol("quote"))) {return ((function() {return parse_dash_quoted(form);
}))();
} else {return (function() {if((eq_p_(first,string_dash__gt_symbol("set_excl_")) || eq_p_(first,string_dash__gt_symbol("set")))) {return ((function() {return parse_dash_set(form);
}))();
} else {return (function() {if(native_p_(first)) {return ((function() {return native_dash_function(first)(form,generator,expr_p_,_per_parse);
}))();
} else {return ((function() {return parse_dash_func_dash_call(form);
}))();
}})()
;
}})()
;
}})()
;
}})()
;
}})()
;
}))(car(form));
});
var parse_dash_vector = (function(vec){
return parse_dash_list(cons(string_dash__gt_symbol("vector"),vector_dash_to_dash_list(vec)));
});
var parse_dash_dict = (function(dict){
return ((function(lst,i){
return ((function(qlst){
return parse_dash_list(cons(string_dash__gt_symbol("dict"),qlst));
}))(map((function(el){
i = (i + 1);
return (function() {if(eq_p_(((i - 1) % 2),0)) {return list(string_dash__gt_symbol("quote"),el);
} else {return el;
}})()
;
}),lst));
}))(dict_dash_to_dash_list(dict),0);
});
return (function() {if(symbol_p_(form)) {return ((function() {return generator.write_dash_term(form,not(expr_p_));
}))();
} else {return (function() {if(literal_p_(form)) {return ((function() {return parse_dash_literal(form);
}))();
} else {return (function() {if(list_p_(form)) {return ((function() {return parse_dash_list(form);
}))();
} else {return (function() {if(vector_p_(form)) {return ((function() {return parse_dash_vector(form);
}))();
} else {return (function() {if(dict_p_(form)) {return ((function() {return parse_dash_dict(form);
}))();
} else {return ((function() {throw(string_dash_append("Unkown thing: ",form));
}))();
}})()
;
}})()
;
}})()
;
}})()
;
}})()
;
}))(opt(expr_p_,false),(function(form){
var expr_p_ = vector_dash_to_dash_list(Array.prototype.slice.call(arguments, 1));
return parse(form,generator,opt(expr_p_,false));
}));
});
var read = (function(src){
return reader(grammar,src,vector());
});
var compile = (function(src,generator){
(function() {if(not(macro_dash_generator)) {macro_dash_generator = generator;
} else {return false;
}})()
;
return ((function(f){
parse(f,generator);
return generator.get_dash_code();
}))(expand((function() {if(string_p_(src)) {return read(src);
} else {return src;
}})()
));
});
module.exports = dict(string_dash__gt_symbol("read"),read,string_dash__gt_symbol("expand"),expand,string_dash__gt_symbol("parse"),parse,string_dash__gt_symbol("compile"),compile,string_dash__gt_symbol("install_dash_expander"),install_dash_expander,string_dash__gt_symbol("expand_dash_once"),expand_dash_once,string_dash__gt_symbol("expand_dash_nth"),expand_dash_nth,string_dash__gt_symbol("pretty"),pretty,string_dash__gt_symbol("expander_p_"),expander_p_,string_dash__gt_symbol("expander_dash_function"),expander_dash_function,string_dash__gt_symbol("literal_p_"),literal_p_,string_dash__gt_symbol("set_dash_macro_dash_generator"),(function(g){
return (function() {if(not(macro_dash_generator)) {macro_dash_generator = g;
} else {return false;
}})()
;
}),string_dash__gt_symbol("new_dash_string"),new_dash_string);
}))();


});
require("/compiler.js");

require.define("/js.js", function (require, module, exports, __dirname, __filename) {
    var __util = require('util');

var _emptylst = [null];

function string_dash__gt_symbol(str) {
    str = str.replace(/-/g, '_dash_');
    str = str.replace(/\?/g, '_p_');
    str = str.replace(/\!/g, '_excl_');
    str = str.replace(/>/g, '_gt_');
    str = str.replace(/</g, '_lt_');
    str = str.replace(/%/g, '_per_');

    return {
        str: str,
        symbol: true
    };
}

function map(func, lst) {
    if(null_p_(lst)) {
        return _emptylst;
    }
    else {
        return cons(func(car(lst)),
                    map(func, cdr(lst)));
    }
}

function for_dash_each(func, lst) {
    if(!null_p_(lst)) {
        func(car(lst));
        for_dash_each(func, cdr(lst));
    }
}

function make_dash_vector(i) {
    return new Array(i);
}

function vector_dash_map(func, vec) {
    var res = [];

    for(var i=0, len=vec.length; i<len; i++) {
        res.push(func(vec[i]));
    }

    return res;
}

function vector_dash_for_dash_each(func, vec) {
    for(var i=0, len=vec.length; i<len; i++) {
        func(vec[i]);
    }
}

function display(msg) {
    __util.print(msg);
}

function pp(obj) {
    display(inspect(obj) + '\n');
}

function inspect(obj) {
    return __util.inspect(obj, null, 50);
}

function not(v) {
    return (typeof(v) != 'number' &&
            !v);
}

function eq_p_(v1, v2) {
    if(symbol_p_(v1) && symbol_p_(v2)) {
        return v1.str == v2.str;
    }

    return v1 === v2;
}

function equal_p_(v1, v2) {    
    if(list_p_(v1) && list_p_(v2)) {
        function l(lst1, lst2) {
            var n1 = null_p_(lst1);
            var n2 = null_p_(lst2);

            if(n1 && n2) {
                return true;
            }
            else if(n1 || n2) {
                return false
            }
            else if(equal_p_(car(lst1), car(lst2))) {
                return l(cdr(lst1), cdr(lst2));
            }

            return false;
        }

        return l(v1, v2);
    }
    else if(vector_p_(v1) && vector_p_(v2)) {
        for(var i=0, len=v1.length; i<len; i++) {
            if(!equal_p_(v1[i], v2[i])) {
                return false;
            }
        }
        return true;
    }
    else if(dict_p_(v1) && dict_p_(v2)) {
        for(var k in v1) {
            if(!equal_p_(v1[k], v2[k])) {
                return false;
            }
        }
        return true;
    }
    else if(symbol_p_(v1) && symbol_p_(v2)) {
        return v1.str == v2.str;
    }

    return v1 == v2;
}

function null_p_(arr) {
    return (arr &&
            arr.length !== undefined &&
            arr.length === 1 &&
            arr[0] === null);
}

function cons(v1, v2) {
    var lst = [v1, v2];
    lst.list = true;
    return lst;
}

function car(arr) {
    return arr[0];
}

function cdr(arr) {
    return arr[1];
}

function cadr(lst) {
    return car(cdr(lst));
}

function cddr(lst) {
    return cdr(cdr(lst));
}

function caddr(lst) {
    return car(cdr(cdr(lst)));
}

function cdddr(lst) {
    return cdr(cdr(cdr(lst)));
}

function cadddr(lst) {
    return car(cdr(cdr(cdr(lst))));
}

function cddddr(lst) {
    return cdr(cdr(cdr(cdr(lst))));
}

function length(lst) {
    var i=0;
    for_dash_each(function(obj) { i++; },
                  lst);
    return i;
}

function reverse(lst) {
    if(null_p_(lst)) {
        return _emptylst;
    }
    return list_dash_append(reverse(cdr(lst)), list(car(lst)));
}

function make_dash_list(arr) {
    arr.list = true;
    return arr;
}

function list() {
    return vector_dash_to_dash_list(
        Array.prototype.slice.call(arguments)
    );
}

function vector_dash_to_dash_list(vec) {
    function l(v, i) {
        if(i < v.length) {
            return cons(v[i], l(v, i+1));
        }
        else {
            return _emptylst;
        }
    }

    return l(vec, 0);
}

function list_dash_to_dash_vector(lst) {
    var res = [];

    function m(lst) {
        if(!null_p_(lst)) {
            res.push(car(lst));
            m(cdr(lst));
        }
    };

    m(lst);
    return res;
}

function vector_dash_ref(arr, i) {
    return arr[i];
}

function vector_dash_set_excl_(arr, i, v) {
    arr[i] = v;
}

function vector_dash_concat(arr1, arr2) {
    return arr1.concat(arr2);
}

function vector() {
    return Array.prototype.slice.call(arguments);
}

function vector_dash_push(vec, val) {
    vec.push(val);
}

function dict() {
    var keyvals = Array.prototype.slice.call(arguments);
    var res = {};

    for(var i=0, len=keyvals.length; i<len; i+=2) {
        var key = keyvals[i];

        if(key.str) {
            key = key.str;
        }

        res[key] = keyvals[i+1];
    }

    return res;
}

var hash_dash_map = dict;


function dict_dash_map(func, dict) {
    var res = {};
    for(var k in dict) {
        res[k] = func(dict[k]);
    }
    return res;
}

var hash_dash_map_dash_map = dict_dash_map;

function hash_dash_map_dash_to_dash_vec(obj) {
    var res = [];
    for(var k in obj) {
        res.push(vector_to_list([string_dash__gt_symbol('quote'),
                                 string_dash__gt_symbol(k)]));
        res.push(obj[k]);
    }
    return res;
}

function dict_dash_to_dash_list(dict) {
    var res = [];
    for(var k in dict) {
        res.push(string_dash__gt_symbol(k));
        res.push(dict[k]);
    }
    return vector_dash_to_dash_list(res);
}

function keys(dict) {
    var res = [];
    for(var k in dict) {
        res.push(k);
    }
    return vector_dash_to_dash_list(res);
}

function vals(dict) {
    var res = [];
    for(var k in dict) {
        res.push(dict[k]);
    }
    return vector_dash_to_dash_list(res);
}

function zip(keys, vals) {
    var obj = {};
    for(var i=0, len=keys.length; i<len; i++) {
        obj[keys[i]] = vals[i];
    }
    return obj;
}

function object_dash_ref(obj, key) {
    return obj[key];
}

function number_p_(obj) {
    return typeof obj == 'number';
}

function symbol_p_(obj) {
    return obj && obj.str != undefined && obj.symbol != undefined;
}

function string_p_(obj) {
    return typeof obj == 'string';
}

function boolean_p_(obj) {
    return obj === true || obj === false;
}

function list_p_(obj) {
    return !!obj && obj.list !== undefined;
}

function vector_p_(obj) {
    var v = (obj && typeof obj == 'object' && obj.length !== undefined);
    return !list_p_(obj) && !null_p_(obj) && v;
}

function dict_p_(obj) {
    var d = (obj && typeof obj == 'object' && obj.length === undefined);
    return !symbol_p_(obj) && d;
}

function _dash__gt_string(obj) {
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
    else if(list_p_(obj)) {
        return '(' + 
            map(function(obj) { return _dash__gt_string(obj); },
                obj).join(' ') +
            ')';
    }
    else if(vector_p_(obj)) {
        return '[' +
            vector_dash_map(function(obj) { return _dash__gt_string(obj); },
                       obj).join(' ') +
            ']';
    }
    else if(dict_p_(obj)) {
        var res = [];
        for(var k in obj) {
            res.push(k + ': ' + __util.inspect(obj[k], null, 10));
        }
        return '{' + res.join(', ') + '}';
    }
}

function list_dash_append(lst1, lst2) {
    function loop(lst) {
        if(null_p_(lst)) {
            return lst2;
        }
        else {
            return cons(car(lst), loop(cdr(lst)));
        }
    };

    if(null_p_(lst1)) {
        return lst2;
    }
    else {
        return loop(lst1);
    }
}

function string_dash_append() {
    return Array.prototype.slice.call(arguments).join('');
}

function unquote_splice(lst) {
    // if(!lst.length || lst.length != 2 || lst[1].length === undefined) {
    //     return lst;
    // }

    if(null_p_(lst)) {
        return _emptylst;
    }
    else {
        var elem = car(lst);
        var rest = unquote_splice(cdr(lst));

        if(elem.please_splice) {
            if(!list_p_(elem.data) && !null_p_(elem.data)) {
                throw ("Lists can only splice lists, unexpected object: " +
                       __gt_string(elem.data));
            }

            // do we need to unquote_splice elem.data?
            return list_dash_append(elem.data, rest);
        }
        else {
            return cons(elem, rest);
        }
    }
}

function unquote_splice_vec(vec) {
    var ret = [];
    for(var i=0, len=vec.length; i<len; i++) {
        var obj = vec[i];

        if(obj && obj.please_splice) {
            if(!vector_p_(obj.data)) {
                throw ("Vectors can only splice vectors, unexpected object: " +
                       obj.data);
            }
            ret = ret.concat(obj.data);
        }
        else {
            ret.push(obj);
        }
    }

    return ret;
}

function unquote_splice_map(obj) {
    // this is expensive, but I don't really care. this will all be
    // rewritten soon enough anyway.
    var res = {};

    for(var k in obj) {
        var prop = obj[k];
        if(prop && prop.please_splice) {
            if(!dict_p_(prop.data)) {
                throw ("Maps can only splice maps, unexpected object: " +
                       prop.data);
            }

            for(j in prop.data) {
                res[j] = prop.data[j];
            }
        }
        else if(k != '__unquote_splicing') {
            res[k] = prop;
        }
    }

    return res;
}
((function() {var fs = require("fs");var should_dash_return_p_ = (function(form){
return not((list_p_(form) && (eq_p_(car(form),string_dash__gt_symbol("throw")) || eq_p_(car(form),string_dash__gt_symbol("set_excl_")) || eq_p_(car(form),string_dash__gt_symbol("set")))));
});
var generator = (function() {var code = vector();
var make_dash_fresh = (function() {return generator();
});
var write = (function(src){
var eol = vector_dash_to_dash_list(Array.prototype.slice.call(arguments, 1));
return code.push((src + (function() {if(null_p_(eol)) {return "";
} else {return "\n";
}})()
));
});
var write_dash_runtime = (function(target){
return (function() {if(not(equal_p_(target,"no-runtime"))) {return ((function() {write(fs.readFileSync("runtime.js","utf-8"),true);
return (function() {if(not(equal_p_(target,"js-noeval"))) {return write(fs.readFileSync("runtime-eval.js","utf-8"),true);
} else {return false;
}})()
;
}))();
} else {return false;
}})()
;
});
var inline_dash_writer = (function(str){
return ((function(first){
return (function() {return (function() {if(first) {first = false;
} else {return write(str);
}})()
;
});
}))(true);
});
var terminate_dash_expr = (function(expr_p_){
return (function() {if(not(expr_p_)) {return write(";",true);
} else {return false;
}})()
;
});
var write_dash_number = (function(obj,top_p_){
write(obj);
return terminate_dash_expr(not(top_p_));
});
var write_dash_boolean = (function(obj,top_p_){
(function() {if(obj) {return write("true");
} else {return write("false");
}})()
;
return terminate_dash_expr(not(top_p_));
});
var write_dash_empty_dash_list = (function(obj,top_p_){
write("_emptylst");
return terminate_dash_expr(not(top_p_));
});
var write_dash_string = (function(obj,top_p_){
return ((function(str){
str = str.replace(RegExp("\\\\","g"),"\\\\");
str = str.replace(RegExp("\n","g"),"\\n");
str = str.replace(RegExp("\r","g"),"\\r");
str = str.replace(RegExp("\t","g"),"\\t");
str = str.replace(RegExp("\"","g"),"\\\"");
write(("\"" + str + "\""));
return terminate_dash_expr(not(top_p_));
}))(obj);
});
var write_dash_symbol = (function(obj,top_p_){
write(("string_dash__gt_symbol(\"" + obj.str + "\")"));
return terminate_dash_expr(not(top_p_));
});
var write_dash_term = (function(obj,top_p_){
write(obj.str);
return terminate_dash_expr(not(top_p_));
});
var write_dash_set = (function(lval,rval,parse){
write("var ");
return write_dash_set_excl_(lval,rval,parse);
});
var write_dash_set_excl_ = (function(lval,rval,parse){
write_dash_term(lval);
write(" = ");
parse(rval,true);
return write(";",true);
});
var write_dash_if = (function(pred,tru,expr_p_,parse){
var fal = vector_dash_to_dash_list(Array.prototype.slice.call(arguments, 4));
write("(function() {");
write("if(");
parse(pred,true);
write(") {");
(function() {if(should_dash_return_p_(tru)) {return write("return ");
} else {return false;
}})()
;
parse(tru);
write("}");
(function() {if(not(null_p_(fal))) {return ((function() {write(" else {");
(function() {if(should_dash_return_p_(car(fal))) {return write("return ");
} else {return false;
}})()
;
parse(car(fal));
return write("}");
}))();
} else {return false;
}})()
;
write("})()",true);
return terminate_dash_expr(expr_p_);
});
var write_dash_lambda = (function(args,body,expr_p_,parse){
(function() {if(list_p_(args)) {return ((function() {var comma = inline_dash_writer(",");
var capture_dash_name = false;
var write_dash_args = (function(args){
return (function() {if(not(null_p_(args))) {return ((function() {return (function() {if(eq_p_(car(args),string_dash__gt_symbol("."))) {capture_dash_name = cadr(args);
} else {return ((function() {comma();
write_dash_term(car(args));
return write_dash_args(cdr(args));
}))();
}})()
;
}))();
} else {return false;
}})()
;
});
write("(function(");
write_dash_args(args);
write("){",true);
return (function() {if(capture_dash_name) {return ((function() {write("var ");
write_dash_term(capture_dash_name);
write(" = ");
write_dash_term(string_dash__gt_symbol("vector_dash_to_dash_list"));
write("(Array.prototype.slice.call(arguments, ");
write((length(args) - 2));
return write("));",true);
}))();
} else {return false;
}})()
;
}))();
} else {return (function() {if(symbol_p_(args)) {return ((function() {write("(function() {",true);
write("var ");
write_dash_term(args);
write(" = ");
write_dash_term(string_dash__gt_symbol("vector_dash_to_dash_list"));
return write("(Array.prototype.slice.call(arguments));",true);
}))();
} else {return (function() {if(null_p_(args)) {return ((function() {return write("(function() {");
}))();
} else {return false;
}})()
;
}})()
;
}})()
;
((function(i,len){
return for_dash_each((function(form){
(function() {if((eq_p_(i,(len - 1)) && should_dash_return_p_(form))) {return write("return ");
} else {return false;
}})()
;
parse(form);
i = (i + 1);
}),body);
}))(0,length(body));
write("})");
return terminate_dash_expr(expr_p_);
});
var write_dash_func_dash_call = (function(func,args,expr_p_,parse){
(function() {if(symbol_p_(func)) {return write_dash_term(func);
} else {return (function() {if(eq_p_(car(func),string_dash__gt_symbol("lambda"))) {return ((function() {write("(");
parse(func,true);
return write(")");
}))();
} else {return parse(func,true);
}})()
;
}})()
;
write("(");
((function(comma){
return for_dash_each((function(arg){
comma();
return parse(arg,true);
}),args);
}))(inline_dash_writer(","));
write(")");
return terminate_dash_expr(expr_p_);
});
var write_dash_op = (function(op,vals,expr_p_,parse){
write("(");
((function(op_dash_writer){
return for_dash_each((function(arg){
op_dash_writer();
return parse(arg,true);
}),vals);
}))(inline_dash_writer(string_dash_append(" ",op," ")));
write(")");
return terminate_dash_expr(expr_p_);
});
var make_dash_op_dash_writer = (function(str){
return (function(vals,expr_p_,parse){
return write_dash_op(str,vals,expr_p_,parse);
});
});
var write_dash_require = (function(args,expr_p_,parse){
return for_dash_each((function(el){
write("var ");
write_dash_term(car(el));
write(" = require(");
write_dash_string(cadr(el));
return write(");");
}),args);
});
return dict(string_dash__gt_symbol("write_dash_runtime"),write_dash_runtime,string_dash__gt_symbol("write_dash_number"),write_dash_number,string_dash__gt_symbol("write_dash_string"),write_dash_string,string_dash__gt_symbol("write_dash_boolean"),write_dash_boolean,string_dash__gt_symbol("write_dash_term"),write_dash_term,string_dash__gt_symbol("write_dash_symbol"),write_dash_symbol,string_dash__gt_symbol("write_dash_empty_dash_list"),write_dash_empty_dash_list,string_dash__gt_symbol("write_dash_set"),write_dash_set,string_dash__gt_symbol("write_dash_set_excl_"),write_dash_set_excl_,string_dash__gt_symbol("write_dash_if"),write_dash_if,string_dash__gt_symbol("write_dash_lambda"),write_dash_lambda,string_dash__gt_symbol("write_dash_func_dash_call"),write_dash_func_dash_call,string_dash__gt_symbol("write_dash_require"),write_dash_require,string_dash__gt_symbol("write_dash_and"),make_dash_op_dash_writer("&&"),string_dash__gt_symbol("write_dash_or"),make_dash_op_dash_writer("||"),string_dash__gt_symbol("write_dash_add"),make_dash_op_dash_writer("+"),string_dash__gt_symbol("write_dash_subtract"),make_dash_op_dash_writer("-"),string_dash__gt_symbol("write_dash_multiply"),make_dash_op_dash_writer("*"),string_dash__gt_symbol("write_dash_divide"),make_dash_op_dash_writer("/"),string_dash__gt_symbol("write_dash_gt"),make_dash_op_dash_writer(">"),string_dash__gt_symbol("write_dash_lt"),make_dash_op_dash_writer("<"),string_dash__gt_symbol("write_dash_mod"),make_dash_op_dash_writer("%"),string_dash__gt_symbol("make_dash_fresh"),make_dash_fresh,string_dash__gt_symbol("get_dash_code"),(function() {return code.join("");
}));
});
module.exports = generator;
}))();


});
require("/js.js");

require.define("/trace.js", function (require, module, exports, __dirname, __filename) {
    var __util = require('util');

var _emptylst = [null];

function string_dash__gt_symbol(str) {
    str = str.replace(/-/g, '_dash_');
    str = str.replace(/\?/g, '_p_');
    str = str.replace(/\!/g, '_excl_');
    str = str.replace(/>/g, '_gt_');
    str = str.replace(/</g, '_lt_');
    str = str.replace(/%/g, '_per_');

    return {
        str: str,
        symbol: true
    };
}

function map(func, lst) {
    if(null_p_(lst)) {
        return _emptylst;
    }
    else {
        return cons(func(car(lst)),
                    map(func, cdr(lst)));
    }
}

function for_dash_each(func, lst) {
    if(!null_p_(lst)) {
        func(car(lst));
        for_dash_each(func, cdr(lst));
    }
}

function fold(func, acc, lst) {
    if(null_p_(lst)) {
        return acc;
    }
    else {
        return fold(func, func(car(lst), acc), cdr(lst));
    }
}

function make_dash_vector(i) {
    return new Array(i);
}

function vector_dash_map(func, vec) {
    var res = [];

    for(var i=0, len=vec.length; i<len; i++) {
        res.push(func(vec[i]));
    }

    return res;
}

function vector_dash_for_dash_each(func, vec) {
    for(var i=0, len=vec.length; i<len; i++) {
        func(vec[i]);
    }
}

function vector_dash_length(vec) {
    return vec.length;
}

function display(msg) {
    __util.print(msg);
}

function pp(obj) {
    display(inspect(obj) + '\n');
}

function inspect(obj) {
    return __util.inspect(obj, null, 50);
}

function not(v) {
    return (typeof(v) != 'number' &&
            !v);
}

function eq_p_(v1, v2) {
    if(symbol_p_(v1) && symbol_p_(v2)) {
        return v1.str == v2.str;
    }

    return v1 === v2;
}

function equal_p_(v1, v2) {    
    if(list_p_(v1) && list_p_(v2)) {
        function l(lst1, lst2) {
            var n1 = null_p_(lst1);
            var n2 = null_p_(lst2);

            if(n1 && n2) {
                return true;
            }
            else if(n1 || n2) {
                return false
            }
            else if(equal_p_(car(lst1), car(lst2))) {
                return l(cdr(lst1), cdr(lst2));
            }

            return false;
        }

        return l(v1, v2);
    }
    else if(vector_p_(v1) && vector_p_(v2)) {
        for(var i=0, len=v1.length; i<len; i++) {
            if(!equal_p_(v1[i], v2[i])) {
                return false;
            }
        }
        return true;
    }
    else if(dict_p_(v1) && dict_p_(v2)) {
        for(var k in v1) {
            if(!equal_p_(v1[k], v2[k])) {
                return false;
            }
        }
        return true;
    }
    else if(symbol_p_(v1) && symbol_p_(v2)) {
        return v1.str == v2.str;
    }

    return v1 == v2;
}

function null_p_(arr) {
    return (arr &&
            arr.length !== undefined &&
            arr.length === 1 &&
            arr[0] === null);
}

function cons(v1, v2) {
    var lst = [v1, v2];
    lst.list = true;
    return lst;
}

function car(arr) {
    return arr[0];
}

function cdr(arr) {
    return arr[1];
}

function cadr(lst) {
    return car(cdr(lst));
}

function cddr(lst) {
    return cdr(cdr(lst));
}

function caddr(lst) {
    return car(cdr(cdr(lst)));
}

function cdddr(lst) {
    return cdr(cdr(cdr(lst)));
}

function cadddr(lst) {
    return car(cdr(cdr(cdr(lst))));
}

function cddddr(lst) {
    return cdr(cdr(cdr(cdr(lst))));
}

function length(lst) {
    var i=0;
    for_dash_each(function(obj) { i++; },
                  lst);
    return i;
}

function reverse(lst) {
    if(null_p_(lst)) {
        return _emptylst;
    }
    return list_dash_append(reverse(cdr(lst)), list(car(lst)));
}

function make_dash_list(arr) {
    arr.list = true;
    return arr;
}

function list() {
    return vector_dash_to_dash_list(
        Array.prototype.slice.call(arguments)
    );
}

function vector_dash_to_dash_list(vec) {
    function l(v, i) {
        if(i < v.length) {
            return cons(v[i], l(v, i+1));
        }
        else {
            return _emptylst;
        }
    }

    return l(vec, 0);
}

function list_dash_to_dash_vector(lst) {
    var res = [];

    function m(lst) {
        if(!null_p_(lst)) {
            res.push(car(lst));
            m(cdr(lst));
        }
    };

    m(lst);
    return res;
}

function vector_dash_ref(arr, i) {
    return arr[i];
}

function vector_dash_set_excl_(arr, i, v) {
    arr[i] = v;
}

function vector_dash_concat(arr1, arr2) {
    return arr1.concat(arr2);
}

function vector() {
    return Array.prototype.slice.call(arguments);
}

function vector_dash_push(vec, val) {
    vec.push(val);
}

function dict() {
    var keyvals = Array.prototype.slice.call(arguments);
    var res = {};

    for(var i=0, len=keyvals.length; i<len; i+=2) {
        var key = keyvals[i];

        if(key.str) {
            key = key.str;
        }

        res[key] = keyvals[i+1];
    }

    return res;
}

var hash_dash_map = dict;


function dict_dash_map(func, dict) {
    var res = {};
    for(var k in dict) {
        res[k] = func(dict[k]);
    }
    return res;
}

var hash_dash_map_dash_map = dict_dash_map;

function hash_dash_map_dash_to_dash_vec(obj) {
    var res = [];
    for(var k in obj) {
        res.push(vector_to_list([string_dash__gt_symbol('quote'),
                                 string_dash__gt_symbol(k)]));
        res.push(obj[k]);
    }
    return res;
}

function dict_dash_to_dash_list(dict) {
    var res = [];
    for(var k in dict) {
        res.push(string_dash__gt_symbol(k));
        res.push(dict[k]);
    }
    return vector_dash_to_dash_list(res);
}

function keys(dict) {
    var res = [];
    for(var k in dict) {
        res.push(k);
    }
    return vector_dash_to_dash_list(res);
}

function vals(dict) {
    var res = [];
    for(var k in dict) {
        res.push(dict[k]);
    }
    return vector_dash_to_dash_list(res);
}

function zip(keys, vals) {
    var obj = {};
    for(var i=0, len=keys.length; i<len; i++) {
        obj[keys[i]] = vals[i];
    }
    return obj;
}

function object_dash_ref(obj, key) {
    return obj[key];
}

function number_p_(obj) {
    return typeof obj == 'number';
}

function symbol_p_(obj) {
    return obj && obj.str != undefined && obj.symbol != undefined;
}

function string_p_(obj) {
    return typeof obj == 'string';
}

function boolean_p_(obj) {
    return obj === true || obj === false;
}

function list_p_(obj) {
    return !!obj && obj.list !== undefined;
}

function vector_p_(obj) {
    var v = (obj && typeof obj == 'object' && obj.length !== undefined);
    return !list_p_(obj) && !null_p_(obj) && v;
}

function dict_p_(obj) {
    var d = (obj && typeof obj == 'object' && obj.length === undefined);
    return !symbol_p_(obj) && d;
}

function _dash__gt_string(obj) {
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
    else if(list_p_(obj)) {
        return '(' + 
            map(function(obj) { return _dash__gt_string(obj); },
                obj).join(' ') +
            ')';
    }
    else if(vector_p_(obj)) {
        return '[' +
            vector_dash_map(function(obj) { return _dash__gt_string(obj); },
                       obj).join(' ') +
            ']';
    }
    else if(dict_p_(obj)) {
        var res = [];
        for(var k in obj) {
            res.push(k + ': ' + __util.inspect(obj[k], null, 10));
        }
        return '{' + res.join(', ') + '}';
    }
    else if(null_p_(obj)) {
        return '()';
    }
}

function list_dash_append(lst1, lst2) {
    function loop(lst) {
        if(null_p_(lst)) {
            return lst2;
        }
        else {
            return cons(car(lst), loop(cdr(lst)));
        }
    };

    if(null_p_(lst1)) {
        return lst2;
    }
    else {
        return loop(lst1);
    }
}

function string_dash_append() {
    return Array.prototype.slice.call(arguments).join('');
}

function unquote_splice(lst) {
    // if(!lst.length || lst.length != 2 || lst[1].length === undefined) {
    //     return lst;
    // }

    if(null_p_(lst)) {
        return _emptylst;
    }
    else {
        var elem = car(lst);
        var rest = unquote_splice(cdr(lst));

        if(elem.please_splice) {
            if(!list_p_(elem.data) && !null_p_(elem.data)) {
                throw ("Lists can only splice lists, unexpected object: " +
                       __gt_string(elem.data));
            }

            // do we need to unquote_splice elem.data?
            return list_dash_append(elem.data, rest);
        }
        else {
            return cons(elem, rest);
        }
    }
}

function unquote_splice_vec(vec) {
    var ret = [];
    for(var i=0, len=vec.length; i<len; i++) {
        var obj = vec[i];

        if(obj && obj.please_splice) {
            if(!vector_p_(obj.data)) {
                throw ("Vectors can only splice vectors, unexpected object: " +
                       obj.data);
            }
            ret = ret.concat(obj.data);
        }
        else {
            ret.push(obj);
        }
    }

    return ret;
}

function unquote_splice_map(obj) {
    // this is expensive, but I don't really care. this will all be
    // rewritten soon enough anyway.
    var res = {};

    for(var k in obj) {
        var prop = obj[k];
        if(prop && prop.please_splice) {
            if(!dict_p_(prop.data)) {
                throw ("Maps can only splice maps, unexpected object: " +
                       prop.data);
            }

            for(j in prop.data) {
                res[j] = prop.data[j];
            }
        }
        else if(k != '__unquote_splicing') {
            res[k] = prop;
        }
    }

    return res;
}
((function() {var compiler = require("./compiler");compiler.install_dash_expander(string_dash__gt_symbol("trace_dash_source"),(function(form,e){
var trace_dash_expander = (function(src,e){
return (function(x,e1){
return (function() {if((list_p_(x) && subexpression_p_(x,src))) {return list(string_dash__gt_symbol("trace.trace_dash_form"),e(list(string_dash__gt_symbol("quote"),x),e),list(string_dash__gt_symbol("lambda"),_emptylst,e(x,e1)));
} else {return e(x,e1);
}})()
;
});
});
var subexpression_p_ = (function(form,src){
return (equal_p_(form,src) || (list_p_(src) && (subexpression_p_(form,car(src)) || subexpression_p_(form,cdr(src)))));
});
return ((function(e1){
return e1(cadr(form),e1);
}))(trace_dash_expander(cadr(form),e));
}));
var level = 0;
var trace_dash_form = (function(src,k){
compiler.new_dash_string();
pr(string_dash_append(pad(level,"-"),compiler.pretty(src),"\n"));
level = (level + 1);
return ((function(value){
level = (level - 1);
compiler.new_dash_string();
pr(string_dash_append(pad(level,">"),"RESULT: ",compiler.pretty(value),"\n"));
return value;
}))(k());
});
var pad = (function(n,s){
return ((function(v){
return ((function(s){
return (function() {if((n > 0)) {return string_dash_append(s," ");
} else {return s;
}})()
;
}))(v.join(""));
}))(vector_dash_map((function(_){
return s;
}),make_dash_vector((n * 2))));
});
var pr = false;
pr = display;
var set_dash_prompt = (function(func){
pr = func;
});
module.exports = dict(string_dash__gt_symbol("trace_dash_form"),trace_dash_form,string_dash__gt_symbol("set_dash_prompt"),set_dash_prompt);
}))();


});
require("/trace.js");
