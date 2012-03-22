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
    var util = require("util");var type = (function(obj){
return (function() {if(number_p_(obj)) {return ((function() {return string_dash__gt_symbol("number");
}))();
} else {return (function() {if(boolean_p_(obj)) {return ((function() {return string_dash__gt_symbol("boolean");
}))();
} else {return (function() {if(string_p_(obj)) {return ((function() {return string_dash__gt_symbol("string");
}))();
} else {return (function() {if(null_p_(obj)) {return ((function() {return string_dash__gt_symbol("null");
}))();
} else {return (function() {if(list_p_(obj)) {return ((function() {return string_dash__gt_symbol("list");
}))();
} else {return (function() {if(vector_p_(obj)) {return ((function() {return string_dash__gt_symbol("vector");
}))();
} else {return (function() {if(dict_p_(obj)) {return ((function() {return string_dash__gt_symbol("dict");
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
}})()
;
}})()
;
}})()
;
});
var number_p_ = (function(obj){
return eq_p_(typeof obj,"number");
});
var string_p_ = (function(obj){
return eq_p_(typeof obj,"string");
});
var symbol_p_ = (function(obj){
return (!!obj && obj.str !== undefined && obj.symbol !== undefined);
});
var boolean_p_ = (function(obj){
return (eq_p_(obj,true) || eq_p_(obj,false));
});
var null_p_ = (function(obj){
return (!!obj && not(eq_p_(obj.length,undefined)) && eq_p_(obj.length,1) && eq_p_(vector_dash_ref(obj,0),null));
});
var list_p_ = (function(obj){
return (!!obj && not(eq_p_(obj.list,undefined)));
});
var vector_p_ = (function(obj){
return (not(list_p_(obj)) && not(null_p_(obj)) && !!obj && eq_p_(typeof obj,"object") && not(eq_p_(obj.length,undefined)));
});
var dict_p_ = (function(obj){
return (not(symbol_p_(obj)) && !!obj && eq_p_(typeof obj,"object") && eq_p_(obj.length,undefined));
});
var literal_p_ = (function(x){
return (number_p_(x) || string_p_(x) || boolean_p_(x) || null_p_(x));
});
var str = (function() {
var args = vector_dash__gt_list(Array.prototype.slice.call(arguments));
return fold((function(el,acc){
return (acc + inspect(el));
}),"",args);
});
var string_dash__gt_symbol = (function(str){
return ((function() {var o1 = (function(s){
s = s.replace(RegExp("-","g"),"_dash_");
s = s.replace(RegExp("\\?","g"),"_p_");
s = s.replace(RegExp("\\!","g"),"_excl_");
s = s.replace(RegExp(">","g"),"_gt_");
s = s.replace(RegExp("<","g"),"_lt_");
s = s.replace(RegExp("%","g"),"_per_");
s = s.replace(RegExp("=","g"),"_eq_");
return {str:s, symbol:true}});
var o2 = str;
return o1(o2);
}))();
});
var symbol_dash__gt_string = (function(sym){
return ((function() {var o3 = (function(s){
s = s.replace(RegExp("_dash_","g"),"-");
s = s.replace(RegExp("_p_","g"),"?");
s = s.replace(RegExp("_excl_","g"),"!");
s = s.replace(RegExp("_gt_","g"),">");
s = s.replace(RegExp("_lt_","g"),"<");
s = s.replace(RegExp("_per_","g"),"%");
s = s.replace(RegExp("_eq_","g"),"=");
return s;
});
var o4 = sym.str;
return o3(o4);
}))();
});
var _emptylst = [null];
var list = (function() {
var args = vector_dash__gt_list(Array.prototype.slice.call(arguments));
return args;
});
var cons = (function(obj,lst){
return ((function() {var o5 = (function(res){
res.list = true;return res;
});
var o6 = [obj, lst];
return o5(o6);
}))();
});
var car = (function(lst){
return lst[0]});
var cdr = (function(lst){
return lst[1]});
var cadr = (function(lst){
return car(cdr(lst));
});
var cddr = (function(lst){
return cdr(cdr(lst));
});
var cdar = (function(lst){
return cdr(car(lst));
});
var caddr = (function(lst){
return car(cdr(cdr(lst)));
});
var cdddr = (function(lst){
return cdr(cdr(cdr(lst)));
});
var cadar = (function(lst){
return car(cdr(car(lst)));
});
var cddar = (function(lst){
return cdr(cdr(car(lst)));
});
var caadr = (function(lst){
return car(car(cdr(lst)));
});
var cdadr = (function(lst){
return cdr(car(cdr(lst)));
});
var list_dash_ref = (function(lst,i){
return ((function() {var loop = (function(lst,i){
return (function() {if(null_p_(lst)) {return ((function() {return false;
}))();
} else {return (function() {if(eq_p_(i,0)) {return ((function() {return car(lst);
}))();
} else {return ((function() {return loop(cdr(lst),(i - 1));
}))();
}})()
;
}})()
;
});
var o7 = lst;
var o8 = i;
return loop(o7,o8);
}))();
});
var length = (function(lst){
return fold((function(el,acc){
return (acc + 1);
}),0,lst);
});
var list_dash_append = (function(lst1,lst2){
return ((function() {var loop = (function(lst){
return (function() {if(null_p_(lst)) {return lst2;
} else {return cons(car(lst),loop(cdr(lst)));
}})()
;
});
var o9 = lst1;
return loop(o9);
}))();
});
var list_dash_find = (function(lst,val){
return ((function() {var loop = (function(lst){
return (function() {if(null_p_(lst)) {return false;
} else {return (function() {if(eq_p_(car(lst),val)) {return lst;
} else {return loop(cdr(lst));
}})()
;
}})()
;
});
var o10 = lst;
return loop(o10);
}))();
});
var map = (function(func,lst){
return (function() {if(null_p_(lst)) {return _emptylst;
} else {return cons(func(car(lst)),map(func,cdr(lst)));
}})()
;
});
var for_dash_each = (function(func,lst){
return (function() {if(not(null_p_(lst))) {return ((function() {func(car(lst));
return for_dash_each(func,cdr(lst));
}))();
} else {return false;
}})()
;
});
var fold = (function(func,acc,lst){
return (function() {if(null_p_(lst)) {return acc;
} else {return fold(func,func(car(lst),acc),cdr(lst));
}})()
;
});
var reverse = (function(lst){
return (function() {if(null_p_(lst)) {return _emptylst;
} else {return list_dash_append(reverse(cdr(lst)),list(car(lst)));
}})()
;
});
var vector_dash__gt_list = (function(vec){
return ((function() {var loop = (function(i){
return (function() {if((i < vec.length)) {return cons(vector_dash_ref(vec,i),loop((i + 1)));
} else {return _emptylst}})()
;
});
var o11 = 0;
return loop(o11);
}))();
});
var make_dash_vector = (function(count,val){
return ((function() {var o12 = (function(v){
return ((function() {var loop = (function(i){
return (function() {if((i < count)) {return ((function() {vector_dash_put_excl_(v,i,val);
return loop((i + 1));
}))();
} else {return v;
}})()
;
});
var o14 = 0;
return loop(o14);
}))();
});
var o13 = new Array(count);
return o12(o13);
}))();
});
var vector = (function() {return Array.prototype.slice.call(arguments)});
var vector_dash_ref = (function(vec,i){
return vec[i]});
var vector_dash_put_excl_ = (function(vec,i,obj){
return vec[i] = obj});
var vector_dash_concat = (function(vec1,vec2){
return vec1.concat(vec2)});
var vector_dash_slice = (function(vec,start,end){
return vec.slice(start, end)});
var vector_dash_push_excl_ = (function(vec,obj){
return vec.push(obj)});
var vector_dash_find = (function(vec,val){
return ((function() {var loop = (function(i){
return (function() {if((i < vec.length)) {return (function() {if(eq_p_(vector_dash_ref(vec,i),val)) {return i;
} else {return loop((i + 1));
}})()
;
} else {return false;
}})()
;
});
var o15 = 0;
return loop(o15);
}))();
});
var vector_dash_length = (function(vec){
return vec.length;
});
var list_dash__gt_vector = (function(lst){
var res = [];
for_dash_each((function(el){
return res.push(el);
}),lst);
return res;
});
var vector_dash_map = (function(func,vec){
var res = [];
((function() {var loop = (function(i){
return (function() {if((i < vec.length)) {return ((function() {res.push(func(vector_dash_ref(vec,i)));
return loop((i + 1));
}))();
} else {return false;
}})()
;
});
var o16 = 0;
return loop(o16);
}))();
return res;
});
var vector_dash_for_dash_each = (function(func,vec){
return ((function() {var loop = (function(i){
return (function() {if((i < vec.length)) {return ((function() {func(vector_dash_ref(vec,i));
return loop((i + 1));
}))();
} else {return false;
}})()
;
});
var o17 = 0;
return loop(o17);
}))();
});
var vector_dash_fold = (function(func,acc,vec){
return ((function() {var loop = (function(i,acc){
return (function() {if((i < vector_dash_length(vec))) {return loop((i + 1),func(vector_dash_ref(vec,i),acc));
} else {return acc;
}})()
;
});
var o18 = 0;
var o19 = acc;
return loop(o18,o19);
}))();
});
var dict = (function() {
var args = vector_dash__gt_list(Array.prototype.slice.call(arguments));
var res = {};
((function() {var loop = (function(lst){
return (function() {if(not(null_p_(lst))) {return ((function() {var o21 = (function(key,val){
dict_dash_put_excl_(res,key,val);
return loop(cddr(lst));
});
var o22 = car(lst);
var o23 = cadr(lst);
return o21(o22,o23);
}))();
} else {return false;
}})()
;
});
var o20 = args;
return loop(o20);
}))();
return res;
});
var dict_dash_put_excl_ = (function(dct,k,v){
return dct[k.str] = v});
var dict_dash_ref = (function(dct,k){
return dct[k.str]});
var dict_dash_map = (function(func,dct){
var res = dict();
((function() {var loop = (function(lst){
return (function() {if(not(null_p_(lst))) {return ((function() {var o25 = (function(k){
dict_dash_put_excl_(res,k,func(dict_dash_ref(dct,k)));
return loop(cdr(lst));
});
var o26 = car(lst);
return o25(o26);
}))();
} else {return false;
}})()
;
});
var o24 = keys(dct);
return loop(o24);
}))();
return res;
});
var dict_dash__gt_vector = (function(dct){
var res = vector();
((function() {var loop = (function(lst){
return (function() {if(not(null_p_(lst))) {return ((function() {vector_dash_push_excl_(res,car(lst));
vector_dash_push_excl_(res,dict_dash_ref(dct,car(lst)));
return loop(cdr(lst));
}))();
} else {return false;
}})()
;
});
var o27 = keys(dct);
return loop(o27);
}))();
return res;
});
var dict_dash__gt_list = (function(dct){
return vector_dash__gt_list(dict_dash__gt_vector(dct));
});
var keys = (function(dct){
return ((function() {var o28 = (function(res){
for(var k in dct) {
       res = cons(string_dash__gt_symbol(k), res);
    }return res;
});
var o29 = _emptylst;
return o28(o29);
}))();
});
var vals = (function(dct){
return map((function(k){
return dict_dash_ref(dct,k);
}),keys(dct));
});
var zip = (function(keys,vals){
var res = dict();
((function() {var loop = (function(ks,vs){
return (function() {if(not(null_p_(ks))) {return ((function() {dict_dash_put_excl_(res,car(ks),car(vs));
return loop(cdr(ks),cdr(vs));
}))();
} else {return false;
}})()
;
});
var o30 = keys;
var o31 = vals;
return loop(o30,o31);
}))();
return res;
});
var not = (function(obj){
return (typeof obj !== 'number' && !obj);
});
var _eq__eq_ = (function(obj1,obj2){
return (function() {if((symbol_p_(obj1) && symbol_p_(obj2))) {return obj1.str === obj2.str} else {return obj1 === obj2}})()
;
});
var _eq_ = (function(obj1,obj2){
return (function() {if((list_p_(obj1) && list_p_(obj2))) {return ((function() {return ((function() {var loop = (function(lst1,lst2){
var n1 = null_p_(lst1);
var n2 = null_p_(lst2);
return (function() {if((n1 && n2)) {return ((function() {return true;
}))();
} else {return (function() {if((n1 || n2)) {return ((function() {return false;
}))();
} else {return ((function() {return (function() {if(equal_p_(car(lst1),car(lst2))) {return loop(cdr(lst1),cdr(lst2));
} else {return false;
}})()
;
}))();
}})()
;
}})()
;
});
var o32 = obj1;
var o33 = obj2;
return loop(o32,o33);
}))();
}))();
} else {return (function() {if((vector_p_(obj1) && vector_p_(obj2))) {return ((function() {return ((function() {var loop = (function(i){
return (function() {if(((i < obj1.length) && (i < obj2.length))) {return ((function() {return true;
}))();
} else {return (function() {if(((i < obj1.length) || (i < obj2.length))) {return ((function() {return false;
}))();
} else {return ((function() {return (function() {if(equal_p_(vector_dash_ref(obj1,i),vector_dash_ref(obj2,i))) {return loop((i + 1));
} else {return false;
}})()
;
}))();
}})()
;
}})()
;
});
var o34 = 0;
return loop(o34);
}))();
}))();
} else {return (function() {if((dict_p_(obj1) && dict_p_(obj2))) {return ((function() {return ((function() {var o35 = (function(keys1,keys2){
return (eq_p_(length(keys1),length(keys2)) && ((function() {var loop = (function(lst){
return (function() {if(null_p_(lst)) {return true;
} else {return (function() {if(equal_p_(dict_dash_ref(obj1,car(lst)),dict_dash_ref(obj2,car(lst)))) {return loop(cdr(lst));
} else {return false;
}})()
;
}})()
;
});
var o38 = keys1;
return loop(o38);
}))());
});
var o36 = keys(obj1);
var o37 = keys(obj2);
return o35(o36,o37);
}))();
}))();
} else {return ((function() {return eq_p_(obj1,obj2);
}))();
}})()
;
}})()
;
}})()
;
});
var eq_p_ = _eq__eq_;
var equal_p_ = _eq_;
var display = (function(msg){
return console.log(msg);
});
var pp = (function(obj){
return display(str(inspect(obj),"\n"));
});
var inspect = (function(obj){
var rest = vector_dash__gt_list(Array.prototype.slice.call(arguments, 1));
var space = (function(obj){
return (function() {if((literal_p_(obj) || symbol_p_(obj))) {return ((function() {return vector_dash_length(inspect(obj));
}))();
} else {return (function() {if(list_p_(obj)) {return ((function() {return (length(obj) + 1 + fold((function(el,acc){
return (acc + space(el));
}),0,obj));
}))();
} else {return (function() {if(dict_p_(obj)) {return ((function() {return space(dict_dash__gt_list(obj));
}))();
} else {return (function() {if(vector_p_(obj)) {return ((function() {return space(vector_dash__gt_list(obj));
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
return ((function() {var o39 = (function(i){
var buffer = "";
var get_dash_buffer = (function() {return buffer;
});
var disp = (function(str){
buffer = (buffer + str);
});
var pad = (function(n){
return vector_dash_for_dash_each((function(_){
return disp(" ");
}),make_dash_vector(n));
});
return (function() {if(number_p_(obj)) {return ((function() {return ("" + obj);
}))();
} else {return (function() {if(string_p_(obj)) {return ((function() {return obj;
}))();
} else {return (function() {if(symbol_p_(obj)) {return ((function() {return symbol_dash__gt_string(obj);
}))();
} else {return (function() {if(boolean_p_(obj)) {return ((function() {return (function() {if(obj) {return "#t";
} else {return "#f";
}})()
;
}))();
} else {return (function() {if(null_p_(obj)) {return ((function() {return "()";
}))();
} else {return (function() {if(list_p_(obj)) {return ((function() {return ((function() {var o41 = (function(node,childr,sp){
disp("(");
disp(inspect(node,(i + 1)));
for_dash_each((function(item){
(function() {if(sp) {return ((function() {disp("\n");
return pad(i);
}))();
} else {return disp(" ");
}})()
;
return disp(inspect(item,(i + 1)));
}),childr);
disp(")");
return get_dash_buffer();
});
var o42 = car(obj);
var o43 = cdr(obj);
var o44 = (space(obj) > 30);
return o41(o42,o43,o44);
}))();
}))();
} else {return (function() {if(vector_p_(obj)) {return ((function() {return ((function() {var o45 = (function(first,rest,sp){
disp("[");
disp(inspect(first,(i + 1)));
vector_dash_for_dash_each((function(item){
(function() {if(sp) {return ((function() {disp("\n");
return pad(i);
}))();
} else {return disp(" ");
}})()
;
return disp(inspect(item,(i + 1)));
}),rest);
disp("]");
return get_dash_buffer();
});
var o46 = vector_dash_ref(obj,0);
var o47 = vector_dash_slice(obj,1);
var o48 = (space(obj) > 30);
return o45(o46,o47,o48);
}))();
}))();
} else {return (function() {if(dict_p_(obj)) {return ((function() {disp("{");
((function() {var o49 = (function(lst,sp){
return ((function() {var loop = (function(lst,first){
return (function() {if(not(null_p_(lst))) {return ((function() {var o54 = (function(key,val){
(function() {if(not(first)) {return (function() {if(sp) {return ((function() {disp("\n");
return pad(i);
}))();
} else {return disp(" ");
}})()
;
} else {return false;
}})()
;
disp(":");
disp(inspect(key,i));
disp(" ");
disp(inspect(val,(i + 1 + vector_dash_length(symbol_dash__gt_string(key)))));
return loop(cddr(lst),false);
});
var o55 = car(lst);
var o56 = cadr(lst);
return o54(o55,o56);
}))();
} else {return false;
}})()
;
});
var o52 = lst;
var o53 = true;
return loop(o52,o53);
}))();
});
var o50 = dict_dash__gt_list(obj);
var o51 = (space(obj) > 30);
return o49(o50,o51);
}))();
disp("}");
return get_dash_buffer();
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
}})()
;
}})()
;
}})()
;
}})()
;
});
var o40 = (function() {if(null_p_(rest)) {return 1;
} else {return car(rest);
}})()
;
return o39(o40);
}))();
});
var apply = (function(func,args){
return func.apply(null,list_dash__gt_vector(args));
});
var _gensym = 0;
var gensym = (function() {_gensym = (_gensym + 1);
return string_dash__gt_symbol(("o" + _gensym));
});


var parser = (function(grammar){
var Y = (function(gen){
return ((function(f){
return f(f);
}))((function(f){
return gen((function() {
var args = vector_dash__gt_list(Array.prototype.slice.call(arguments));
return ((function() {var o1 = (function(ff){
return ff.apply(null,list_dash__gt_vector(args));
});
var o2 = f(f);
return o1(o2);
}))();
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
var args = vector_dash__gt_list(Array.prototype.slice.call(arguments));
return (function(text,state){
var run = (function(lst){
return (function() {if(null_p_(lst)) {return null;
} else {return ((function() {var o3 = (function(r){
return (function() {if(r) {return r;
} else {return run(cdr(lst));
}})()
;
});
var o4 = car(lst)(text,state);
return o3(o4);
}))();
}})()
;
});
return run(args);
});
});
var all = (function() {
var args = vector_dash__gt_list(Array.prototype.slice.call(arguments));
return (function(text,state){
var run = (function(lst,r){
return (function() {if(null_p_(lst)) {return r;
} else {return ((function() {var o5 = (function(r){
return (function() {if(not(r)) {return null;
} else {return run(cdr(lst),r);
}})()
;
});
var o6 = car(lst)(vector_dash_ref(r,0),vector_dash_ref(r,1));
return o5(o6);
}))();
}})()
;
});
return run(args,vector(text,state));
});
});
var capture = (function(func,hook){
return (function(text,state){
return ((function() {var o7 = (function(r){
return (function() {if(r) {return ((function() {var o9 = (function(t,s){
return vector(t,hook(text.substr(0,(text.length - t.length)),s));
});
var o10 = vector_dash_ref(r,0);
var o11 = vector_dash_ref(r,1);
return o9(o10,o11);
}))();
} else {return null;
}})()
;
});
var o8 = func(text,state);
return o7(o8);
}))();
});
});
var before = (function(func,hook){
return (function(text,state){
return func(text,hook(state));
});
});
var after = (function(func,hook){
return (function(text,state){
return ((function() {var o12 = (function(r){
return (function() {if(r) {return vector(vector_dash_ref(r,0),hook(state,vector_dash_ref(r,1)));
} else {return null;
}})()
;
});
var o13 = func(text,state);
return o12(o13);
}))();
});
});
return grammar(all,any,capture,char,not_dash_char,optional,Y,eof,terminator,before,after);
});
var parse = (function(grammar,text,state){
return ((function() {var o14 = (function(r){
return (function() {if(r) {return vector_dash_ref(r,1);
} else {return null;
}})()
;
});
var o15 = parser(grammar)(text,state);
return o14(o15);
}))();
});
module.exports = parse;


});

require.define("/grammar.js", function (require, module, exports, __dirname, __filename) {
    var util = require("util");var type = (function(obj){
return (function() {if(number_p_(obj)) {return ((function() {return string_dash__gt_symbol("number");
}))();
} else {return (function() {if(boolean_p_(obj)) {return ((function() {return string_dash__gt_symbol("boolean");
}))();
} else {return (function() {if(string_p_(obj)) {return ((function() {return string_dash__gt_symbol("string");
}))();
} else {return (function() {if(null_p_(obj)) {return ((function() {return string_dash__gt_symbol("null");
}))();
} else {return (function() {if(list_p_(obj)) {return ((function() {return string_dash__gt_symbol("list");
}))();
} else {return (function() {if(vector_p_(obj)) {return ((function() {return string_dash__gt_symbol("vector");
}))();
} else {return (function() {if(dict_p_(obj)) {return ((function() {return string_dash__gt_symbol("dict");
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
}})()
;
}})()
;
}})()
;
});
var number_p_ = (function(obj){
return eq_p_(typeof obj,"number");
});
var string_p_ = (function(obj){
return eq_p_(typeof obj,"string");
});
var symbol_p_ = (function(obj){
return (!!obj && obj.str !== undefined && obj.symbol !== undefined);
});
var boolean_p_ = (function(obj){
return (eq_p_(obj,true) || eq_p_(obj,false));
});
var null_p_ = (function(obj){
return (!!obj && not(eq_p_(obj.length,undefined)) && eq_p_(obj.length,1) && eq_p_(vector_dash_ref(obj,0),null));
});
var list_p_ = (function(obj){
return (!!obj && not(eq_p_(obj.list,undefined)));
});
var vector_p_ = (function(obj){
return (not(list_p_(obj)) && not(null_p_(obj)) && !!obj && eq_p_(typeof obj,"object") && not(eq_p_(obj.length,undefined)));
});
var dict_p_ = (function(obj){
return (not(symbol_p_(obj)) && !!obj && eq_p_(typeof obj,"object") && eq_p_(obj.length,undefined));
});
var literal_p_ = (function(x){
return (number_p_(x) || string_p_(x) || boolean_p_(x) || null_p_(x));
});
var str = (function() {
var args = vector_dash__gt_list(Array.prototype.slice.call(arguments));
return fold((function(el,acc){
return (acc + inspect(el));
}),"",args);
});
var string_dash__gt_symbol = (function(str){
return ((function() {var o1 = (function(s){
s = s.replace(RegExp("-","g"),"_dash_");
s = s.replace(RegExp("\\?","g"),"_p_");
s = s.replace(RegExp("\\!","g"),"_excl_");
s = s.replace(RegExp(">","g"),"_gt_");
s = s.replace(RegExp("<","g"),"_lt_");
s = s.replace(RegExp("%","g"),"_per_");
s = s.replace(RegExp("=","g"),"_eq_");
return {str:s, symbol:true}});
var o2 = str;
return o1(o2);
}))();
});
var symbol_dash__gt_string = (function(sym){
return ((function() {var o3 = (function(s){
s = s.replace(RegExp("_dash_","g"),"-");
s = s.replace(RegExp("_p_","g"),"?");
s = s.replace(RegExp("_excl_","g"),"!");
s = s.replace(RegExp("_gt_","g"),">");
s = s.replace(RegExp("_lt_","g"),"<");
s = s.replace(RegExp("_per_","g"),"%");
s = s.replace(RegExp("_eq_","g"),"=");
return s;
});
var o4 = sym.str;
return o3(o4);
}))();
});
var _emptylst = [null];
var list = (function() {
var args = vector_dash__gt_list(Array.prototype.slice.call(arguments));
return args;
});
var cons = (function(obj,lst){
return ((function() {var o5 = (function(res){
res.list = true;return res;
});
var o6 = [obj, lst];
return o5(o6);
}))();
});
var car = (function(lst){
return lst[0]});
var cdr = (function(lst){
return lst[1]});
var cadr = (function(lst){
return car(cdr(lst));
});
var cddr = (function(lst){
return cdr(cdr(lst));
});
var cdar = (function(lst){
return cdr(car(lst));
});
var caddr = (function(lst){
return car(cdr(cdr(lst)));
});
var cdddr = (function(lst){
return cdr(cdr(cdr(lst)));
});
var cadar = (function(lst){
return car(cdr(car(lst)));
});
var cddar = (function(lst){
return cdr(cdr(car(lst)));
});
var caadr = (function(lst){
return car(car(cdr(lst)));
});
var cdadr = (function(lst){
return cdr(car(cdr(lst)));
});
var list_dash_ref = (function(lst,i){
return ((function() {var loop = (function(lst,i){
return (function() {if(null_p_(lst)) {return ((function() {return false;
}))();
} else {return (function() {if(eq_p_(i,0)) {return ((function() {return car(lst);
}))();
} else {return ((function() {return loop(cdr(lst),(i - 1));
}))();
}})()
;
}})()
;
});
var o7 = lst;
var o8 = i;
return loop(o7,o8);
}))();
});
var length = (function(lst){
return fold((function(el,acc){
return (acc + 1);
}),0,lst);
});
var list_dash_append = (function(lst1,lst2){
return ((function() {var loop = (function(lst){
return (function() {if(null_p_(lst)) {return lst2;
} else {return cons(car(lst),loop(cdr(lst)));
}})()
;
});
var o9 = lst1;
return loop(o9);
}))();
});
var list_dash_find = (function(lst,val){
return ((function() {var loop = (function(lst){
return (function() {if(null_p_(lst)) {return false;
} else {return (function() {if(eq_p_(car(lst),val)) {return lst;
} else {return loop(cdr(lst));
}})()
;
}})()
;
});
var o10 = lst;
return loop(o10);
}))();
});
var map = (function(func,lst){
return (function() {if(null_p_(lst)) {return _emptylst;
} else {return cons(func(car(lst)),map(func,cdr(lst)));
}})()
;
});
var for_dash_each = (function(func,lst){
return (function() {if(not(null_p_(lst))) {return ((function() {func(car(lst));
return for_dash_each(func,cdr(lst));
}))();
} else {return false;
}})()
;
});
var fold = (function(func,acc,lst){
return (function() {if(null_p_(lst)) {return acc;
} else {return fold(func,func(car(lst),acc),cdr(lst));
}})()
;
});
var reverse = (function(lst){
return (function() {if(null_p_(lst)) {return _emptylst;
} else {return list_dash_append(reverse(cdr(lst)),list(car(lst)));
}})()
;
});
var vector_dash__gt_list = (function(vec){
return ((function() {var loop = (function(i){
return (function() {if((i < vec.length)) {return cons(vector_dash_ref(vec,i),loop((i + 1)));
} else {return _emptylst}})()
;
});
var o11 = 0;
return loop(o11);
}))();
});
var vector_dash_to_dash_list = vector_dash__gt_list;
var make_dash_vector = (function(count,val){
return ((function() {var o12 = (function(v){
return ((function() {var loop = (function(i){
return (function() {if((i < count)) {return ((function() {vector_dash_put_excl_(v,i,val);
return loop((i + 1));
}))();
} else {return v;
}})()
;
});
var o14 = 0;
return loop(o14);
}))();
});
var o13 = new Array(count);
return o12(o13);
}))();
});
var vector = (function() {return Array.prototype.slice.call(arguments)});
var vector_dash_ref = (function(vec,i){
return vec[i]});
var vector_dash_put_excl_ = (function(vec,i,obj){
return vec[i] = obj});
var vector_dash_concat = (function(vec1,vec2){
return vec1.concat(vec2)});
var vector_dash_slice = (function(vec,start,end){
return vec.slice(start, end)});
var vector_dash_push_excl_ = (function(vec,obj){
return vec.push(obj)});
var vector_dash_find = (function(vec,val){
return ((function() {var loop = (function(i){
return (function() {if((i < vec.length)) {return (function() {if(eq_p_(vector_dash_ref(vec,i),val)) {return i;
} else {return loop((i + 1));
}})()
;
} else {return false;
}})()
;
});
var o15 = 0;
return loop(o15);
}))();
});
var vector_dash_length = (function(vec){
return vec.length;
});
var list_dash__gt_vector = (function(lst){
var res = [];
for_dash_each((function(el){
return res.push(el);
}),lst);
return res;
});
var vector_dash_map = (function(func,vec){
var res = [];
((function() {var loop = (function(i){
return (function() {if((i < vec.length)) {return ((function() {res.push(func(vector_dash_ref(vec,i)));
return loop((i + 1));
}))();
} else {return false;
}})()
;
});
var o16 = 0;
return loop(o16);
}))();
return res;
});
var vector_dash_for_dash_each = (function(func,vec){
return ((function() {var loop = (function(i){
return (function() {if((i < vec.length)) {return ((function() {func(vector_dash_ref(vec,i));
return loop((i + 1));
}))();
} else {return false;
}})()
;
});
var o17 = 0;
return loop(o17);
}))();
});
var vector_dash_fold = (function(func,acc,vec){
return ((function() {var loop = (function(i,acc){
return (function() {if((i < vector_dash_length(vec))) {return loop((i + 1),func(vector_dash_ref(vec,i),acc));
} else {return acc;
}})()
;
});
var o18 = 0;
var o19 = acc;
return loop(o18,o19);
}))();
});
var dict = (function() {
var args = vector_dash__gt_list(Array.prototype.slice.call(arguments));
var res = {};
((function() {var loop = (function(lst){
return (function() {if(not(null_p_(lst))) {return ((function() {var o21 = (function(key,val){
dict_dash_put_excl_(res,key,val);
return loop(cddr(lst));
});
var o22 = car(lst);
var o23 = cadr(lst);
return o21(o22,o23);
}))();
} else {return false;
}})()
;
});
var o20 = args;
return loop(o20);
}))();
return res;
});
var dict_dash_put_excl_ = (function(dct,k,v){
return dct[k.str] = v});
var dict_dash_ref = (function(dct,k){
return dct[k.str]});
var dict_dash_map = (function(func,dct){
var res = dict();
((function() {var loop = (function(lst){
return (function() {if(not(null_p_(lst))) {return ((function() {var o25 = (function(k){
dict_dash_put_excl_(res,k,func(dict_dash_ref(dct,k)));
return loop(cdr(lst));
});
var o26 = car(lst);
return o25(o26);
}))();
} else {return false;
}})()
;
});
var o24 = keys(dct);
return loop(o24);
}))();
return res;
});
var dict_dash__gt_vector = (function(dct){
var res = vector();
((function() {var loop = (function(lst){
return (function() {if(not(null_p_(lst))) {return ((function() {vector_dash_push_excl_(res,car(lst));
vector_dash_push_excl_(res,dict_dash_ref(dct,car(lst)));
return loop(cdr(lst));
}))();
} else {return false;
}})()
;
});
var o27 = keys(dct);
return loop(o27);
}))();
return res;
});
var dict_dash__gt_list = (function(dct){
return vector_dash__gt_list(dict_dash__gt_vector(dct));
});
var keys = (function(dct){
return ((function() {var o28 = (function(res){
for(var k in dct) {
       res = cons(string_dash__gt_symbol(k), res);
    }return res;
});
var o29 = _emptylst;
return o28(o29);
}))();
});
var vals = (function(dct){
return map((function(k){
return dict_dash_ref(dct,k);
}),keys(dct));
});
var zip = (function(keys,vals){
var res = dict();
((function() {var loop = (function(ks,vs){
return (function() {if(not(null_p_(ks))) {return ((function() {dict_dash_put_excl_(res,car(ks),car(vs));
return loop(cdr(ks),cdr(vs));
}))();
} else {return false;
}})()
;
});
var o30 = keys;
var o31 = vals;
return loop(o30,o31);
}))();
return res;
});
var not = (function(obj){
return (typeof obj !== 'number' && !obj);
});
var _eq__eq_ = (function(obj1,obj2){
return (function() {if((symbol_p_(obj1) && symbol_p_(obj2))) {return obj1.str === obj2.str} else {return obj1 === obj2}})()
;
});
var _eq_ = (function(obj1,obj2){
return (function() {if((list_p_(obj1) && list_p_(obj2))) {return ((function() {return ((function() {var loop = (function(lst1,lst2){
var n1 = null_p_(lst1);
var n2 = null_p_(lst2);
return (function() {if((n1 && n2)) {return ((function() {return true;
}))();
} else {return (function() {if((n1 || n2)) {return ((function() {return false;
}))();
} else {return ((function() {return (function() {if(equal_p_(car(lst1),car(lst2))) {return loop(cdr(lst1),cdr(lst2));
} else {return false;
}})()
;
}))();
}})()
;
}})()
;
});
var o32 = obj1;
var o33 = obj2;
return loop(o32,o33);
}))();
}))();
} else {return (function() {if((vector_p_(obj1) && vector_p_(obj2))) {return ((function() {return ((function() {var loop = (function(i){
return (function() {if(((i < obj1.length) && (i < obj2.length))) {return ((function() {return true;
}))();
} else {return (function() {if(((i < obj1.length) || (i < obj2.length))) {return ((function() {return false;
}))();
} else {return ((function() {return (function() {if(equal_p_(vector_dash_ref(obj1,i),vector_dash_ref(obj2,i))) {return loop((i + 1));
} else {return false;
}})()
;
}))();
}})()
;
}})()
;
});
var o34 = 0;
return loop(o34);
}))();
}))();
} else {return (function() {if((dict_p_(obj1) && dict_p_(obj2))) {return ((function() {return ((function() {var o35 = (function(keys1,keys2){
return (eq_p_(length(keys1),length(keys2)) && ((function() {var loop = (function(lst){
return (function() {if(null_p_(lst)) {return true;
} else {return (function() {if(equal_p_(dict_dash_ref(obj1,car(lst)),dict_dash_ref(obj2,car(lst)))) {return loop(cdr(lst));
} else {return false;
}})()
;
}})()
;
});
var o38 = keys1;
return loop(o38);
}))());
});
var o36 = keys(obj1);
var o37 = keys(obj2);
return o35(o36,o37);
}))();
}))();
} else {return ((function() {return eq_p_(obj1,obj2);
}))();
}})()
;
}})()
;
}})()
;
});
var eq_p_ = _eq__eq_;
var equal_p_ = _eq_;
var display = (function(msg){
return console.log(msg);
});
var pp = (function(obj){
return display(str(inspect(obj),"\n"));
});
var inspect = (function(obj){
var rest = vector_dash__gt_list(Array.prototype.slice.call(arguments, 1));
var space = (function(obj){
return (function() {if((literal_p_(obj) || symbol_p_(obj))) {return ((function() {return vector_dash_length(inspect(obj));
}))();
} else {return (function() {if(list_p_(obj)) {return ((function() {return (length(obj) + 1 + fold((function(el,acc){
return (acc + space(el));
}),0,obj));
}))();
} else {return (function() {if(dict_p_(obj)) {return ((function() {return space(dict_dash__gt_list(obj));
}))();
} else {return (function() {if(vector_p_(obj)) {return ((function() {return space(vector_dash__gt_list(obj));
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
return ((function() {var o39 = (function(i){
var buffer = "";
var get_dash_buffer = (function() {return buffer;
});
var disp = (function(str){
buffer = (buffer + str);
});
var pad = (function(n){
return vector_dash_for_dash_each((function(_){
return disp(" ");
}),make_dash_vector(n));
});
return (function() {if(number_p_(obj)) {return ((function() {return ("" + obj);
}))();
} else {return (function() {if(string_p_(obj)) {return ((function() {return obj;
}))();
} else {return (function() {if(symbol_p_(obj)) {return ((function() {return symbol_dash__gt_string(obj);
}))();
} else {return (function() {if(boolean_p_(obj)) {return ((function() {return (function() {if(obj) {return "#t";
} else {return "#f";
}})()
;
}))();
} else {return (function() {if(null_p_(obj)) {return ((function() {return "()";
}))();
} else {return (function() {if(list_p_(obj)) {return ((function() {return ((function() {var o41 = (function(node,childr,sp){
disp("(");
disp(inspect(node,(i + 1)));
for_dash_each((function(item){
(function() {if(sp) {return ((function() {disp("\n");
return pad(i);
}))();
} else {return disp(" ");
}})()
;
return disp(inspect(item,(i + 1)));
}),childr);
disp(")");
return get_dash_buffer();
});
var o42 = car(obj);
var o43 = cdr(obj);
var o44 = (space(obj) > 30);
return o41(o42,o43,o44);
}))();
}))();
} else {return (function() {if(vector_p_(obj)) {return ((function() {return ((function() {var o45 = (function(first,rest,sp){
disp("[");
disp(inspect(first,(i + 1)));
vector_dash_for_dash_each((function(item){
(function() {if(sp) {return ((function() {disp("\n");
return pad(i);
}))();
} else {return disp(" ");
}})()
;
return disp(inspect(item,(i + 1)));
}),rest);
disp("]");
return get_dash_buffer();
});
var o46 = vector_dash_ref(obj,0);
var o47 = vector_dash_slice(obj,1);
var o48 = (space(obj) > 30);
return o45(o46,o47,o48);
}))();
}))();
} else {return (function() {if(dict_p_(obj)) {return ((function() {disp("{");
((function() {var o49 = (function(lst,sp){
return ((function() {var loop = (function(lst,first){
return (function() {if(not(null_p_(lst))) {return ((function() {var o54 = (function(key,val){
(function() {if(not(first)) {return (function() {if(sp) {return ((function() {disp("\n");
return pad(i);
}))();
} else {return disp(" ");
}})()
;
} else {return false;
}})()
;
disp(":");
disp(inspect(key,i));
disp(" ");
disp(inspect(val,(i + 1 + vector_dash_length(symbol_dash__gt_string(key)))));
return loop(cddr(lst),false);
});
var o55 = car(lst);
var o56 = cadr(lst);
return o54(o55,o56);
}))();
} else {return false;
}})()
;
});
var o52 = lst;
var o53 = true;
return loop(o52,o53);
}))();
});
var o50 = dict_dash__gt_list(obj);
var o51 = (space(obj) > 30);
return o49(o50,o51);
}))();
disp("}");
return get_dash_buffer();
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
}})()
;
}})()
;
}})()
;
}})()
;
});
var o40 = (function() {if(null_p_(rest)) {return 1;
} else {return car(rest);
}})()
;
return o39(o40);
}))();
});
var apply = (function(func,args){
return func.apply(null,list_dash__gt_vector(args));
});
var _gensym = 0;
var gensym = (function() {_gensym = (_gensym + 1);
return string_dash__gt_symbol(("o" + _gensym));
});


var grammar = (function(all,any,capture,char,not_dash_char,optional,Y,eof,terminator,before,after){
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
var string = ((function() {var o1 = (function(capt,capt_node,capt_special,init){
var content = any(capt_special(all(char("\\"),not_dash_char(""))),capt(not_dash_char("\"")));
return init(all(char("\""),capt_node(optional(repeated(content))),char("\"")));
});
var o2 = (function(rule){
return capture(rule,(function(buf,state){
return (state + buf);
}));
});
var o3 = (function(rule){
return capture(rule,(function(str,state){
return state;
}));
});
var o4 = (function(rule){
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
});
var o5 = (function(rule){
return before(rule,(function(state){
return "";
}));
});
return o1(o2,o3,o4,o5);
}))();
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
return ((function() {var o6 = (function(special){
return list(string_dash__gt_symbol(special),node);
});
var o7 = (function() {if(equal_p_(buf.substring(0,2),",@")) {return ((function() {return "unquote-splicing";
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
;
return o6(o7);
}))();
});
return Y((function(q){
return capture(all(any(char("'"),char("`"),all(char(","),char("@")),char(",")),any(q,rule)),capt);
}));
});
return ((function() {var o8 = (function(rule){
return any(quoting(rule),rule);
});
var o9 = any(lst,number,string,boolean,term);
return o8(o9);
}))();
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
}))))),any(after(char("}"),(function(state,_){
return ((function() {var o10 = (function(i){
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
});
var o11 = 0;
return o10(o11);
}))();
})),after(char(")"),(function(state,_){
return vector_dash_to_dash_list(state);
})),char("]")));
}));
return after(repeated(any(space,comment,after(elements(any(lst)),(function(root,child){
return root.concat(vector(child));
})))),(function(_,root){
return ((function() {var o12 = (function(lst){
return (function() {if(eq_p_(length(lst),1)) {return car(lst);
} else {return cons(string_dash__gt_symbol("begin"),lst);
}})()
;
});
var o13 = vector_dash_to_dash_list(root);
return o12(o13);
}))();
}));
});
module.exports = grammar;


});

require.define("/backends/js.js", function (require, module, exports, __dirname, __filename) {
    var util = require("util");var type = (function(obj){
return (function() {if(number_p_(obj)) {return ((function() {return string_dash__gt_symbol("number");
}))();
} else {return (function() {if(boolean_p_(obj)) {return ((function() {return string_dash__gt_symbol("boolean");
}))();
} else {return (function() {if(string_p_(obj)) {return ((function() {return string_dash__gt_symbol("string");
}))();
} else {return (function() {if(null_p_(obj)) {return ((function() {return string_dash__gt_symbol("null");
}))();
} else {return (function() {if(list_p_(obj)) {return ((function() {return string_dash__gt_symbol("list");
}))();
} else {return (function() {if(vector_p_(obj)) {return ((function() {return string_dash__gt_symbol("vector");
}))();
} else {return (function() {if(dict_p_(obj)) {return ((function() {return string_dash__gt_symbol("dict");
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
}})()
;
}})()
;
}})()
;
});
var number_p_ = (function(obj){
return eq_p_(typeof obj,"number");
});
var string_p_ = (function(obj){
return eq_p_(typeof obj,"string");
});
var symbol_p_ = (function(obj){
return (!!obj && obj.str !== undefined && obj.symbol !== undefined);
});
var boolean_p_ = (function(obj){
return (eq_p_(obj,true) || eq_p_(obj,false));
});
var null_p_ = (function(obj){
return (!!obj && not(eq_p_(obj.length,undefined)) && eq_p_(obj.length,1) && eq_p_(vector_dash_ref(obj,0),null));
});
var list_p_ = (function(obj){
return (!!obj && not(eq_p_(obj.length,undefined)) && not(eq_p_(obj.list,undefined)));
});
var vector_p_ = (function(obj){
return (not(list_p_(obj)) && not(null_p_(obj)) && !!obj && eq_p_(typeof obj,"object") && not(eq_p_(obj.length,undefined)));
});
var dict_p_ = (function(obj){
return (not(symbol_p_(obj)) && !!obj && eq_p_(typeof obj,"object") && eq_p_(obj.length,undefined));
});
var literal_p_ = (function(x){
return (number_p_(x) || string_p_(x) || boolean_p_(x) || null_p_(x));
});
var str = (function() {
var args = vector_dash__gt_list(Array.prototype.slice.call(arguments));
return fold((function(el,acc){
return (acc + inspect(el));
}),"",args);
});
var string_dash__gt_symbol = (function(str){
return ((function() {var o1 = (function(s){
s = s.replace(RegExp("-","g"),"_dash_");
s = s.replace(RegExp("\\?","g"),"_p_");
s = s.replace(RegExp("\\!","g"),"_excl_");
s = s.replace(RegExp(">","g"),"_gt_");
s = s.replace(RegExp("<","g"),"_lt_");
s = s.replace(RegExp("%","g"),"_per_");
s = s.replace(RegExp("=","g"),"_eq_");
return {str:s, symbol:true}});
var o2 = str;
return o1(o2);
}))();
});
var symbol_dash__gt_string = (function(sym){
return ((function() {var o3 = (function(s){
s = s.replace(RegExp("_dash_","g"),"-");
s = s.replace(RegExp("_p_","g"),"?");
s = s.replace(RegExp("_excl_","g"),"!");
s = s.replace(RegExp("_gt_","g"),">");
s = s.replace(RegExp("_lt_","g"),"<");
s = s.replace(RegExp("_per_","g"),"%");
s = s.replace(RegExp("_eq_","g"),"=");
return s;
});
var o4 = sym.str;
return o3(o4);
}))();
});
var _emptylst = [null];
var list = (function() {
var args = vector_dash__gt_list(Array.prototype.slice.call(arguments));
return args;
});
var cons = (function(obj,lst){
return ((function() {var o5 = (function(res){
res.list = true;return res;
});
var o6 = [obj, lst];
return o5(o6);
}))();
});
var car = (function(lst){
return lst[0]});
var cdr = (function(lst){
return lst[1]});
var cadr = (function(lst){
return car(cdr(lst));
});
var cddr = (function(lst){
return cdr(cdr(lst));
});
var cdar = (function(lst){
return cdr(car(lst));
});
var caddr = (function(lst){
return car(cdr(cdr(lst)));
});
var cdddr = (function(lst){
return cdr(cdr(cdr(lst)));
});
var cadar = (function(lst){
return car(cdr(car(lst)));
});
var cddar = (function(lst){
return cdr(cdr(car(lst)));
});
var caadr = (function(lst){
return car(car(cdr(lst)));
});
var cdadr = (function(lst){
return cdr(car(cdr(lst)));
});
var list_dash_ref = (function(lst,i){
return ((function() {var loop = (function(lst,i){
return (function() {if(null_p_(lst)) {return ((function() {return false;
}))();
} else {return (function() {if(eq_p_(i,0)) {return ((function() {return car(lst);
}))();
} else {return ((function() {return loop(cdr(lst),(i - 1));
}))();
}})()
;
}})()
;
});
var o7 = lst;
var o8 = i;
return loop(o7,o8);
}))();
});
var length = (function(lst){
return fold((function(el,acc){
return (acc + 1);
}),0,lst);
});
var list_dash_append = (function(lst1,lst2){
return ((function() {var loop = (function(lst){
return (function() {if(null_p_(lst)) {return lst2;
} else {return cons(car(lst),loop(cdr(lst)));
}})()
;
});
var o9 = lst1;
return loop(o9);
}))();
});
var list_dash_find = (function(lst,val){
return ((function() {var loop = (function(lst){
return (function() {if(null_p_(lst)) {return false;
} else {return (function() {if(eq_p_(car(lst),val)) {return lst;
} else {return loop(cdr(lst));
}})()
;
}})()
;
});
var o10 = lst;
return loop(o10);
}))();
});
var map = (function(func,lst){
return (function() {if(null_p_(lst)) {return _emptylst;
} else {return cons(func(car(lst)),map(func,cdr(lst)));
}})()
;
});
var for_dash_each = (function(func,lst){
return (function() {if(not(null_p_(lst))) {return ((function() {func(car(lst));
return for_dash_each(func,cdr(lst));
}))();
} else {return false;
}})()
;
});
var fold = (function(func,acc,lst){
return (function() {if(null_p_(lst)) {return acc;
} else {return fold(func,func(car(lst),acc),cdr(lst));
}})()
;
});
var reverse = (function(lst){
return (function() {if(null_p_(lst)) {return _emptylst;
} else {return list_dash_append(reverse(cdr(lst)),list(car(lst)));
}})()
;
});
var vector_dash__gt_list = (function(vec){
return ((function() {var loop = (function(i){
return (function() {if((i < vec.length)) {return cons(vector_dash_ref(vec,i),loop((i + 1)));
} else {return _emptylst}})()
;
});
var o11 = 0;
return loop(o11);
}))();
});
var make_dash_vector = (function(count,val){
return ((function() {var o12 = (function(v){
return ((function() {var loop = (function(i){
return (function() {if((i < count)) {return ((function() {vector_dash_put_excl_(v,i,val);
return loop((i + 1));
}))();
} else {return v;
}})()
;
});
var o14 = 0;
return loop(o14);
}))();
});
var o13 = new Array(count);
return o12(o13);
}))();
});
var vector = (function() {return Array.prototype.slice.call(arguments)});
var vector_dash_ref = (function(vec,i){
return vec[i]});
var vector_dash_put_excl_ = (function(vec,i,obj){
return vec[i] = obj});
var vector_dash_concat = (function(vec1,vec2){
return vec1.concat(vec2)});
var vector_dash_slice = (function(vec,start,end){
return vec.slice(start, end)});
var vector_dash_push_excl_ = (function(vec,obj){
return vec.push(obj)});
var vector_dash_find = (function(vec,val){
return ((function() {var loop = (function(i){
return (function() {if((i < vec.length)) {return (function() {if(eq_p_(vector_dash_ref(vec,i),val)) {return i;
} else {return loop((i + 1));
}})()
;
} else {return false;
}})()
;
});
var o15 = 0;
return loop(o15);
}))();
});
var vector_dash_length = (function(vec){
return vec.length;
});
var list_dash__gt_vector = (function(lst){
var res = [];
for_dash_each((function(el){
return res.push(el);
}),lst);
return res;
});
var vector_dash_map = (function(func,vec){
var res = [];
((function() {var loop = (function(i){
return (function() {if((i < vec.length)) {return ((function() {res.push(func(vector_dash_ref(vec,i)));
return loop((i + 1));
}))();
} else {return false;
}})()
;
});
var o16 = 0;
return loop(o16);
}))();
return res;
});
var vector_dash_for_dash_each = (function(func,vec){
return ((function() {var loop = (function(i){
return (function() {if((i < vec.length)) {return ((function() {func(vector_dash_ref(vec,i));
return loop((i + 1));
}))();
} else {return false;
}})()
;
});
var o17 = 0;
return loop(o17);
}))();
});
var vector_dash_fold = (function(func,acc,vec){
return ((function() {var loop = (function(i,acc){
return (function() {if((i < vector_dash_length(vec))) {return loop((i + 1),func(vector_dash_ref(vec,i),acc));
} else {return acc;
}})()
;
});
var o18 = 0;
var o19 = acc;
return loop(o18,o19);
}))();
});
var dict = (function() {
var args = vector_dash__gt_list(Array.prototype.slice.call(arguments));
var res = {};
((function() {var loop = (function(lst){
return (function() {if(not(null_p_(lst))) {return ((function() {var o21 = (function(key,val){
dict_dash_put_excl_(res,key,val);
return loop(cddr(lst));
});
var o22 = car(lst);
var o23 = cadr(lst);
return o21(o22,o23);
}))();
} else {return false;
}})()
;
});
var o20 = args;
return loop(o20);
}))();
return res;
});
var dict_dash_put_excl_ = (function(dct,k,v){
return dct[k.str] = v});
var dict_dash_ref = (function(dct,k){
return dct[k.str]});
var dict_dash_map = (function(func,dct){
var res = dict();
((function() {var loop = (function(lst){
return (function() {if(not(null_p_(lst))) {return ((function() {var o25 = (function(k){
dict_dash_put_excl_(res,k,func(dict_dash_ref(dct,k)));
return loop(cdr(lst));
});
var o26 = car(lst);
return o25(o26);
}))();
} else {return false;
}})()
;
});
var o24 = keys(dct);
return loop(o24);
}))();
return res;
});
var dict_dash__gt_vector = (function(dct){
var res = vector();
((function() {var loop = (function(lst){
return (function() {if(not(null_p_(lst))) {return ((function() {vector_dash_push_excl_(res,car(lst));
vector_dash_push_excl_(res,dict_dash_ref(dct,car(lst)));
return loop(cdr(lst));
}))();
} else {return false;
}})()
;
});
var o27 = keys(dct);
return loop(o27);
}))();
return res;
});
var dict_dash__gt_list = (function(dct){
return vector_dash__gt_list(dict_dash__gt_vector(dct));
});
var keys = (function(dct){
return ((function() {var o28 = (function(res){
for(var k in dct) {
       res = cons(string_dash__gt_symbol(k), res);
    }return res;
});
var o29 = _emptylst;
return o28(o29);
}))();
});
var vals = (function(dct){
return map((function(k){
return dict_dash_ref(dct,k);
}),keys(dct));
});
var zip = (function(keys,vals){
var res = dict();
((function() {var loop = (function(ks,vs){
return (function() {if(not(null_p_(ks))) {return ((function() {dict_dash_put_excl_(res,car(ks),car(vs));
return loop(cdr(ks),cdr(vs));
}))();
} else {return false;
}})()
;
});
var o30 = keys;
var o31 = vals;
return loop(o30,o31);
}))();
return res;
});
var not = (function(obj){
return (typeof obj !== 'number' && !obj);
});
var _eq__eq_ = (function(obj1,obj2){
return (function() {if((symbol_p_(obj1) && symbol_p_(obj2))) {return obj1.str === obj2.str} else {return obj1 === obj2}})()
;
});
var _eq_ = (function(obj1,obj2){
return (function() {if((list_p_(obj1) && list_p_(obj2))) {return ((function() {return ((function() {var loop = (function(lst1,lst2){
var n1 = null_p_(lst1);
var n2 = null_p_(lst2);
return (function() {if((n1 && n2)) {return ((function() {return true;
}))();
} else {return (function() {if((n1 || n2)) {return ((function() {return false;
}))();
} else {return ((function() {return (function() {if(equal_p_(car(lst1),car(lst2))) {return loop(cdr(lst1),cdr(lst2));
} else {return false;
}})()
;
}))();
}})()
;
}})()
;
});
var o32 = obj1;
var o33 = obj2;
return loop(o32,o33);
}))();
}))();
} else {return (function() {if((vector_p_(obj1) && vector_p_(obj2))) {return ((function() {return ((function() {var loop = (function(i){
return (function() {if(((i < obj1.length) && (i < obj2.length))) {return ((function() {return true;
}))();
} else {return (function() {if(((i < obj1.length) || (i < obj2.length))) {return ((function() {return false;
}))();
} else {return ((function() {return (function() {if(equal_p_(vector_dash_ref(obj1,i),vector_dash_ref(obj2,i))) {return loop((i + 1));
} else {return false;
}})()
;
}))();
}})()
;
}})()
;
});
var o34 = 0;
return loop(o34);
}))();
}))();
} else {return (function() {if((dict_p_(obj1) && dict_p_(obj2))) {return ((function() {return ((function() {var o35 = (function(keys1,keys2){
return (eq_p_(length(keys1),length(keys2)) && ((function() {var loop = (function(lst){
return (function() {if(null_p_(lst)) {return true;
} else {return (function() {if(equal_p_(dict_dash_ref(obj1,car(lst)),dict_dash_ref(obj2,car(lst)))) {return loop(cdr(lst));
} else {return false;
}})()
;
}})()
;
});
var o38 = keys1;
return loop(o38);
}))());
});
var o36 = keys(obj1);
var o37 = keys(obj2);
return o35(o36,o37);
}))();
}))();
} else {return ((function() {return eq_p_(obj1,obj2);
}))();
}})()
;
}})()
;
}})()
;
});
var eq_p_ = _eq__eq_;
var equal_p_ = _eq_;
var display = (function(msg){
return console.log(msg);
});
var pp = (function(obj){
return display(str(inspect(obj),"\n"));
});
var inspect = (function(obj){
var rest = vector_dash__gt_list(Array.prototype.slice.call(arguments, 1));
var space = (function(obj){
return (function() {if((literal_p_(obj) || symbol_p_(obj))) {return ((function() {return vector_dash_length(inspect(obj));
}))();
} else {return (function() {if(list_p_(obj)) {return ((function() {return (length(obj) + 1 + fold((function(el,acc){
return (acc + space(el));
}),0,obj));
}))();
} else {return (function() {if(dict_p_(obj)) {return ((function() {return space(dict_dash__gt_list(obj));
}))();
} else {return (function() {if(vector_p_(obj)) {return ((function() {return space(vector_dash__gt_list(obj));
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
return ((function() {var o39 = (function(i){
var buffer = "";
var get_dash_buffer = (function() {return buffer;
});
var disp = (function(str){
buffer = (buffer + str);
});
var pad = (function(n){
return vector_dash_for_dash_each((function(_){
return disp(" ");
}),make_dash_vector(n));
});
return (function() {if(number_p_(obj)) {return ((function() {return ("" + obj);
}))();
} else {return (function() {if(string_p_(obj)) {return ((function() {return obj;
}))();
} else {return (function() {if(symbol_p_(obj)) {return ((function() {return symbol_dash__gt_string(obj);
}))();
} else {return (function() {if(boolean_p_(obj)) {return ((function() {return (function() {if(obj) {return "#t";
} else {return "#f";
}})()
;
}))();
} else {return (function() {if(null_p_(obj)) {return ((function() {return "()";
}))();
} else {return (function() {if(list_p_(obj)) {return ((function() {return ((function() {var o41 = (function(node,childr,sp){
disp("(");
disp(inspect(node,(i + 1)));
for_dash_each((function(item){
(function() {if(sp) {return ((function() {disp("\n");
return pad(i);
}))();
} else {return disp(" ");
}})()
;
return disp(inspect(item,(i + 1)));
}),childr);
disp(")");
return get_dash_buffer();
});
var o42 = car(obj);
var o43 = cdr(obj);
var o44 = (space(obj) > 30);
return o41(o42,o43,o44);
}))();
}))();
} else {return (function() {if(vector_p_(obj)) {return ((function() {return ((function() {var o45 = (function(first,rest,sp){
disp("[");
disp(inspect(first,(i + 1)));
vector_dash_for_dash_each((function(item){
(function() {if(sp) {return ((function() {disp("\n");
return pad(i);
}))();
} else {return disp(" ");
}})()
;
return disp(inspect(item,(i + 1)));
}),rest);
disp("]");
return get_dash_buffer();
});
var o46 = vector_dash_ref(obj,0);
var o47 = vector_dash_slice(obj,1);
var o48 = (space(obj) > 30);
return o45(o46,o47,o48);
}))();
}))();
} else {return (function() {if(dict_p_(obj)) {return ((function() {disp("{");
((function() {var o49 = (function(lst,sp){
return ((function() {var loop = (function(lst,first){
return (function() {if(not(null_p_(lst))) {return ((function() {var o54 = (function(key,val){
(function() {if(not(first)) {return (function() {if(sp) {return ((function() {disp("\n");
return pad(i);
}))();
} else {return disp(" ");
}})()
;
} else {return false;
}})()
;
disp(":");
disp(inspect(key,i));
disp(" ");
disp(inspect(val,(i + 1 + vector_dash_length(symbol_dash__gt_string(key)))));
return loop(cddr(lst),false);
});
var o55 = car(lst);
var o56 = cadr(lst);
return o54(o55,o56);
}))();
} else {return false;
}})()
;
});
var o52 = lst;
var o53 = true;
return loop(o52,o53);
}))();
});
var o50 = dict_dash__gt_list(obj);
var o51 = (space(obj) > 30);
return o49(o50,o51);
}))();
disp("}");
return get_dash_buffer();
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
}})()
;
}})()
;
}})()
;
}})()
;
});
var o40 = (function() {if(null_p_(rest)) {return 1;
} else {return car(rest);
}})()
;
return o39(o40);
}))();
});
var apply = (function(func,args){
return func.apply(null,list_dash__gt_vector(args));
});
var _gensym = 0;
var gensym = (function() {_gensym = (_gensym + 1);
return string_dash__gt_symbol(("o" + _gensym));
});


var fs = require("fs");var should_dash_return_p_ = (function(form){
return not((list_p_(form) && (eq_p_(car(form),string_dash__gt_symbol("throw")) || eq_p_(car(form),string_dash__gt_symbol("set_excl_")) || eq_p_(car(form),string_dash__gt_symbol("set")))));
});
var generator = (function() {var code = vector();
var make_dash_fresh = (function() {return generator();
});
var write = (function(src){
var eol = vector_dash__gt_list(Array.prototype.slice.call(arguments, 1));
return code.push((src + (function() {if(null_p_(eol)) {return "";
} else {return "\n";
}})()
));
});
var write_dash_runtime = (function(target){
var root = vector_dash__gt_list(Array.prototype.slice.call(arguments, 1));
return ((function() {var o1 = (function(root){
return (function() {if(not(equal_p_(target,"no-runtime"))) {return ((function() {write(fs.readFileSync(str(root,"/runtime.js"),"utf-8"),true);
return (function() {if(not(equal_p_(target,"js-noeval"))) {return ((function() {write(str("var __compiler = require('",root,"/compiler');"),true);
write(str("var __generator = require('",root,"/backends/js');"),true);
return write("var read = __compiler.read;",true);
}))();
} else {return false;
}})()
;
}))();
} else {return false;
}})()
;
});
var o2 = (function() {if(null_p_(root)) {return str(__dirname,"/..");
} else {return car(root);
}})()
;
return o1(o2);
}))();
});
var inline_dash_writer = (function(str){
return ((function() {var o3 = (function(first){
return (function() {return (function() {if(first) {first = false;
} else {return write(str);
}})()
;
});
});
var o4 = true;
return o3(o4);
}))();
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
return ((function() {var o5 = (function(str){
str = str.replace(RegExp("\\\\","g"),"\\\\");
str = str.replace(RegExp("\n","g"),"\\n");
str = str.replace(RegExp("\r","g"),"\\r");
str = str.replace(RegExp("\t","g"),"\\t");
str = str.replace(RegExp("\"","g"),"\\\"");
write(("\"" + str + "\""));
return terminate_dash_expr(not(top_p_));
});
var o6 = obj;
return o5(o6);
}))();
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
var fal = vector_dash__gt_list(Array.prototype.slice.call(arguments, 4));
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
write_dash_term(string_dash__gt_symbol("vector_dash__gt_list"));
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
write_dash_term(string_dash__gt_symbol("vector_dash__gt_list"));
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
((function() {var o7 = (function(i,len){
return for_dash_each((function(form){
(function() {if((eq_p_(i,(len - 1)) && should_dash_return_p_(form))) {return write("return ");
} else {return false;
}})()
;
parse(form);
i = (i + 1);
}),body);
});
var o8 = 0;
var o9 = length(body);
return o7(o8,o9);
}))();
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
((function() {var o10 = (function(comma){
return for_dash_each((function(arg){
comma();
return parse(arg,true);
}),args);
});
var o11 = inline_dash_writer(",");
return o10(o11);
}))();
write(")");
return terminate_dash_expr(expr_p_);
});
var write_dash_raw_dash_code = (function(code){
return write(code);
});
var write_dash_op = (function(op,vals,expr_p_,parse){
write("(");
((function() {var o12 = (function(op_dash_writer){
return for_dash_each((function(arg){
op_dash_writer();
return parse(arg,true);
}),vals);
});
var o13 = inline_dash_writer(str(" ",op," "));
return o12(o13);
}))();
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
return dict(string_dash__gt_symbol("get_dash_code"),(function() {return code.join("");
}),string_dash__gt_symbol("make_dash_fresh"),make_dash_fresh,string_dash__gt_symbol("write_dash_mod"),make_dash_op_dash_writer("%"),string_dash__gt_symbol("write_dash_lt"),make_dash_op_dash_writer("<"),string_dash__gt_symbol("write_dash_gt"),make_dash_op_dash_writer(">"),string_dash__gt_symbol("write_dash_divide"),make_dash_op_dash_writer("/"),string_dash__gt_symbol("write_dash_multiply"),make_dash_op_dash_writer("*"),string_dash__gt_symbol("write_dash_subtract"),make_dash_op_dash_writer("-"),string_dash__gt_symbol("write_dash_add"),make_dash_op_dash_writer("+"),string_dash__gt_symbol("write_dash_or"),make_dash_op_dash_writer("||"),string_dash__gt_symbol("write_dash_and"),make_dash_op_dash_writer("&&"),string_dash__gt_symbol("write_dash_require"),write_dash_require,string_dash__gt_symbol("write_dash_raw_dash_code"),write_dash_raw_dash_code,string_dash__gt_symbol("write_dash_func_dash_call"),write_dash_func_dash_call,string_dash__gt_symbol("write_dash_lambda"),write_dash_lambda,string_dash__gt_symbol("write_dash_if"),write_dash_if,string_dash__gt_symbol("write_dash_set_excl_"),write_dash_set_excl_,string_dash__gt_symbol("write_dash_set"),write_dash_set,string_dash__gt_symbol("write_dash_empty_dash_list"),write_dash_empty_dash_list,string_dash__gt_symbol("write_dash_symbol"),write_dash_symbol,string_dash__gt_symbol("write_dash_term"),write_dash_term,string_dash__gt_symbol("write_dash_boolean"),write_dash_boolean,string_dash__gt_symbol("write_dash_string"),write_dash_string,string_dash__gt_symbol("write_dash_number"),write_dash_number,string_dash__gt_symbol("write_dash_runtime"),write_dash_runtime);
});
module.exports = generator;


});

require.define("/compiler.js", function (require, module, exports, __dirname, __filename) {
    var util = require("util");var type = (function(obj){
return (function() {if(number_p_(obj)) {return ((function() {return string_dash__gt_symbol("number");
}))();
} else {return (function() {if(boolean_p_(obj)) {return ((function() {return string_dash__gt_symbol("boolean");
}))();
} else {return (function() {if(string_p_(obj)) {return ((function() {return string_dash__gt_symbol("string");
}))();
} else {return (function() {if(null_p_(obj)) {return ((function() {return string_dash__gt_symbol("null");
}))();
} else {return (function() {if(list_p_(obj)) {return ((function() {return string_dash__gt_symbol("list");
}))();
} else {return (function() {if(vector_p_(obj)) {return ((function() {return string_dash__gt_symbol("vector");
}))();
} else {return (function() {if(dict_p_(obj)) {return ((function() {return string_dash__gt_symbol("dict");
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
}})()
;
}})()
;
}})()
;
});
var number_p_ = (function(obj){
return eq_p_(typeof obj,"number");
});
var string_p_ = (function(obj){
return eq_p_(typeof obj,"string");
});
var symbol_p_ = (function(obj){
return (!!obj && obj.str !== undefined && obj.symbol !== undefined);
});
var boolean_p_ = (function(obj){
return (eq_p_(obj,true) || eq_p_(obj,false));
});
var null_p_ = (function(obj){
return (!!obj && not(eq_p_(obj.length,undefined)) && eq_p_(obj.length,1) && eq_p_(vector_dash_ref(obj,0),null));
});
var list_p_ = (function(obj){
return (!!obj && not(eq_p_(obj.length,undefined)) && not(eq_p_(obj.list,undefined)));
});
var vector_p_ = (function(obj){
return (not(list_p_(obj)) && not(null_p_(obj)) && !!obj && eq_p_(typeof obj,"object") && not(eq_p_(obj.length,undefined)));
});
var dict_p_ = (function(obj){
return (not(symbol_p_(obj)) && !!obj && eq_p_(typeof obj,"object") && eq_p_(obj.length,undefined));
});
var function_p_ = (function(obj){
return eq_p_(typeof obj,"function");
});
var literal_p_ = (function(x){
return (number_p_(x) || string_p_(x) || boolean_p_(x) || null_p_(x));
});
var str = (function() {
var args = vector_dash__gt_list(Array.prototype.slice.call(arguments));
return fold((function(el,acc){
return (acc + inspect(el));
}),"",args);
});
var string_dash__gt_symbol = (function(str){
return ((function() {var o1 = (function(s){
s = s.replace(RegExp("-","g"),"_dash_");
s = s.replace(RegExp("\\?","g"),"_p_");
s = s.replace(RegExp("\\!","g"),"_excl_");
s = s.replace(RegExp(">","g"),"_gt_");
s = s.replace(RegExp("<","g"),"_lt_");
s = s.replace(RegExp("%","g"),"_per_");
s = s.replace(RegExp("=","g"),"_eq_");
return {str:s, symbol:true}});
var o2 = str;
return o1(o2);
}))();
});
var symbol_dash__gt_string = (function(sym){
return ((function() {var o3 = (function(s){
s = s.replace(RegExp("_dash_","g"),"-");
s = s.replace(RegExp("_p_","g"),"?");
s = s.replace(RegExp("_excl_","g"),"!");
s = s.replace(RegExp("_gt_","g"),">");
s = s.replace(RegExp("_lt_","g"),"<");
s = s.replace(RegExp("_per_","g"),"%");
s = s.replace(RegExp("_eq_","g"),"=");
return s;
});
var o4 = sym.str;
return o3(o4);
}))();
});
var _emptylst = [null];
var list = (function() {
var args = vector_dash__gt_list(Array.prototype.slice.call(arguments));
return args;
});
var cons = (function(obj,lst){
return ((function() {var o5 = (function(res){
res.list = true;return res;
});
var o6 = [obj, lst];
return o5(o6);
}))();
});
var car = (function(lst){
return lst[0]});
var cdr = (function(lst){
return lst[1]});
var cadr = (function(lst){
return car(cdr(lst));
});
var cddr = (function(lst){
return cdr(cdr(lst));
});
var cdar = (function(lst){
return cdr(car(lst));
});
var caddr = (function(lst){
return car(cdr(cdr(lst)));
});
var cdddr = (function(lst){
return cdr(cdr(cdr(lst)));
});
var cadar = (function(lst){
return car(cdr(car(lst)));
});
var cddar = (function(lst){
return cdr(cdr(car(lst)));
});
var caadr = (function(lst){
return car(car(cdr(lst)));
});
var cdadr = (function(lst){
return cdr(car(cdr(lst)));
});
var list_dash_ref = (function(lst,i){
return ((function() {var loop = (function(lst,i){
return (function() {if(null_p_(lst)) {return ((function() {return false;
}))();
} else {return (function() {if(eq_p_(i,0)) {return ((function() {return car(lst);
}))();
} else {return ((function() {return loop(cdr(lst),(i - 1));
}))();
}})()
;
}})()
;
});
var o7 = lst;
var o8 = i;
return loop(o7,o8);
}))();
});
var length = (function(lst){
return fold((function(el,acc){
return (acc + 1);
}),0,lst);
});
var list_dash_append = (function(lst1,lst2){
return ((function() {var loop = (function(lst){
return (function() {if(null_p_(lst)) {return lst2;
} else {return cons(car(lst),loop(cdr(lst)));
}})()
;
});
var o9 = lst1;
return loop(o9);
}))();
});
var list_dash_find = (function(lst,val){
var rst = vector_dash__gt_list(Array.prototype.slice.call(arguments, 2));
return ((function() {var o10 = (function(access){
return ((function() {var loop = (function(lst){
return (function() {if(null_p_(lst)) {return false;
} else {return (function() {if(_eq__eq_(access(car(lst)),val)) {return lst;
} else {return loop(cdr(lst));
}})()
;
}})()
;
});
var o12 = lst;
return loop(o12);
}))();
});
var o11 = (function() {if(null_p_(rst)) {return (function(x){
return x;
});
} else {return car(rst);
}})()
;
return o10(o11);
}))();
});
var map = (function(func,lst){
return (function() {if(null_p_(lst)) {return _emptylst;
} else {return cons(func(car(lst)),map(func,cdr(lst)));
}})()
;
});
var for_dash_each = (function(func,lst){
return (function() {if(not(null_p_(lst))) {return ((function() {func(car(lst));
return for_dash_each(func,cdr(lst));
}))();
} else {return false;
}})()
;
});
var fold = (function(func,acc,lst){
return (function() {if(null_p_(lst)) {return acc;
} else {return fold(func,func(car(lst),acc),cdr(lst));
}})()
;
});
var reverse = (function(lst){
return (function() {if(null_p_(lst)) {return _emptylst;
} else {return list_dash_append(reverse(cdr(lst)),list(car(lst)));
}})()
;
});
var vector_dash__gt_list = (function(vec){
return ((function() {var loop = (function(i){
return (function() {if((i < vec.length)) {return cons(vector_dash_ref(vec,i),loop((i + 1)));
} else {return _emptylst}})()
;
});
var o13 = 0;
return loop(o13);
}))();
});
var make_dash_vector = (function(count,val){
return ((function() {var o14 = (function(v){
return ((function() {var loop = (function(i){
return (function() {if((i < count)) {return ((function() {vector_dash_put_excl_(v,i,val);
return loop((i + 1));
}))();
} else {return v;
}})()
;
});
var o16 = 0;
return loop(o16);
}))();
});
var o15 = new Array(count);
return o14(o15);
}))();
});
var vector = (function() {return Array.prototype.slice.call(arguments)});
var vector_dash_ref = (function(vec,i){
return vec[i]});
var vector_dash_put_excl_ = (function(vec,i,obj){
return vec[i] = obj});
var vector_dash_concat = (function(vec1,vec2){
return vec1.concat(vec2)});
var vector_dash_slice = (function(vec,start,end){
return vec.slice(start, end)});
var vector_dash_push_excl_ = (function(vec,obj){
return vec.push(obj)});
var vector_dash_find = (function(vec,val){
return ((function() {var loop = (function(i){
return (function() {if((i < vec.length)) {return (function() {if(eq_p_(vector_dash_ref(vec,i),val)) {return i;
} else {return loop((i + 1));
}})()
;
} else {return false;
}})()
;
});
var o17 = 0;
return loop(o17);
}))();
});
var vector_dash_length = (function(vec){
return vec.length;
});
var list_dash__gt_vector = (function(lst){
var res = [];
for_dash_each((function(el){
return res.push(el);
}),lst);
return res;
});
var vector_dash_map = (function(func,vec){
var res = [];
((function() {var loop = (function(i){
return (function() {if((i < vec.length)) {return ((function() {res.push(func(vector_dash_ref(vec,i)));
return loop((i + 1));
}))();
} else {return false;
}})()
;
});
var o18 = 0;
return loop(o18);
}))();
return res;
});
var vector_dash_for_dash_each = (function(func,vec){
return ((function() {var loop = (function(i){
return (function() {if((i < vec.length)) {return ((function() {func(vector_dash_ref(vec,i));
return loop((i + 1));
}))();
} else {return false;
}})()
;
});
var o19 = 0;
return loop(o19);
}))();
});
var vector_dash_fold = (function(func,acc,vec){
return ((function() {var loop = (function(i,acc){
return (function() {if((i < vector_dash_length(vec))) {return loop((i + 1),func(vector_dash_ref(vec,i),acc));
} else {return acc;
}})()
;
});
var o20 = 0;
var o21 = acc;
return loop(o20,o21);
}))();
});
var dict = (function() {
var args = vector_dash__gt_list(Array.prototype.slice.call(arguments));
var res = {};
((function() {var loop = (function(lst){
return (function() {if(not(null_p_(lst))) {return ((function() {var o23 = (function(key,val){
dict_dash_put_excl_(res,key,val);
return loop(cddr(lst));
});
var o24 = car(lst);
var o25 = cadr(lst);
return o23(o24,o25);
}))();
} else {return false;
}})()
;
});
var o22 = args;
return loop(o22);
}))();
return res;
});
var dict_dash_put_excl_ = (function(dct,k,v){
return dct[k.str] = v});
var dict_dash_ref = (function(dct,k){
return dct[k.str]});
var dict_dash_map = (function(func,dct){
var res = dict();
((function() {var loop = (function(lst){
return (function() {if(not(null_p_(lst))) {return ((function() {var o27 = (function(k){
dict_dash_put_excl_(res,k,func(dict_dash_ref(dct,k)));
return loop(cdr(lst));
});
var o28 = car(lst);
return o27(o28);
}))();
} else {return false;
}})()
;
});
var o26 = keys(dct);
return loop(o26);
}))();
return res;
});
var dict_dash_merge = (function(dct1,dct2){
return ((function() {var o29 = (function(res){
map((function(k){
return dict_dash_put_excl_(res,k,dict_dash_ref(dct1,k));
}),keys(dct1));
map((function(k){
return dict_dash_put_excl_(res,k,dict_dash_ref(dct2,k));
}),keys(dct2));
return res;
});
var o30 = dict();
return o29(o30);
}))();
});
var dict_dash__gt_vector = (function(dct){
var res = vector();
((function() {var loop = (function(lst){
return (function() {if(not(null_p_(lst))) {return ((function() {vector_dash_push_excl_(res,car(lst));
vector_dash_push_excl_(res,dict_dash_ref(dct,car(lst)));
return loop(cdr(lst));
}))();
} else {return false;
}})()
;
});
var o31 = keys(dct);
return loop(o31);
}))();
return res;
});
var dict_dash__gt_list = (function(dct){
return vector_dash__gt_list(dict_dash__gt_vector(dct));
});
var keys = (function(dct){
return ((function() {var o32 = (function(res){
for(var k in dct) {
       res = cons(string_dash__gt_symbol(k), res);
    }return res;
});
var o33 = _emptylst;
return o32(o33);
}))();
});
var vals = (function(dct){
return map((function(k){
return dict_dash_ref(dct,k);
}),keys(dct));
});
var zip = (function(keys,vals){
var res = dict();
((function() {var loop = (function(ks,vs){
return (function() {if(not(null_p_(ks))) {return ((function() {dict_dash_put_excl_(res,car(ks),car(vs));
return loop(cdr(ks),cdr(vs));
}))();
} else {return false;
}})()
;
});
var o34 = keys;
var o35 = vals;
return loop(o34,o35);
}))();
return res;
});
var not = (function(obj){
return (typeof obj !== 'number' && !obj);
});
var _eq__eq_ = (function(obj1,obj2){
return (function() {if((symbol_p_(obj1) && symbol_p_(obj2))) {return obj1.str === obj2.str} else {return obj1 === obj2}})()
;
});
var _eq_ = (function(obj1,obj2){
return (function() {if((list_p_(obj1) && list_p_(obj2))) {return ((function() {return ((function() {var loop = (function(lst1,lst2){
var n1 = null_p_(lst1);
var n2 = null_p_(lst2);
return (function() {if((n1 && n2)) {return ((function() {return true;
}))();
} else {return (function() {if((n1 || n2)) {return ((function() {return false;
}))();
} else {return ((function() {return (function() {if(equal_p_(car(lst1),car(lst2))) {return loop(cdr(lst1),cdr(lst2));
} else {return false;
}})()
;
}))();
}})()
;
}})()
;
});
var o36 = obj1;
var o37 = obj2;
return loop(o36,o37);
}))();
}))();
} else {return (function() {if((vector_p_(obj1) && vector_p_(obj2))) {return ((function() {return ((function() {var loop = (function(i){
return (function() {if(((i < obj1.length) && (i < obj2.length))) {return ((function() {return true;
}))();
} else {return (function() {if(((i < obj1.length) || (i < obj2.length))) {return ((function() {return false;
}))();
} else {return ((function() {return (function() {if(equal_p_(vector_dash_ref(obj1,i),vector_dash_ref(obj2,i))) {return loop((i + 1));
} else {return false;
}})()
;
}))();
}})()
;
}})()
;
});
var o38 = 0;
return loop(o38);
}))();
}))();
} else {return (function() {if((dict_p_(obj1) && dict_p_(obj2))) {return ((function() {return ((function() {var o39 = (function(keys1,keys2){
return (eq_p_(length(keys1),length(keys2)) && ((function() {var loop = (function(lst){
return (function() {if(null_p_(lst)) {return true;
} else {return (function() {if(equal_p_(dict_dash_ref(obj1,car(lst)),dict_dash_ref(obj2,car(lst)))) {return loop(cdr(lst));
} else {return false;
}})()
;
}})()
;
});
var o42 = keys1;
return loop(o42);
}))());
});
var o40 = keys(obj1);
var o41 = keys(obj2);
return o39(o40,o41);
}))();
}))();
} else {return ((function() {return eq_p_(obj1,obj2);
}))();
}})()
;
}})()
;
}})()
;
});
var eq_p_ = _eq__eq_;
var equal_p_ = _eq_;
var display = (function(msg){
return console.log(msg);
});
var pp = (function(obj){
return display(str(inspect(obj),"\n"));
});
var inspect = (function(obj){
var rest = vector_dash__gt_list(Array.prototype.slice.call(arguments, 1));
var space = (function(obj){
return (function() {if((literal_p_(obj) || symbol_p_(obj))) {return ((function() {return vector_dash_length(inspect(obj));
}))();
} else {return (function() {if(list_p_(obj)) {return ((function() {return (length(obj) + 1 + fold((function(el,acc){
return (acc + space(el));
}),0,obj));
}))();
} else {return (function() {if(dict_p_(obj)) {return ((function() {return space(dict_dash__gt_list(obj));
}))();
} else {return (function() {if(vector_p_(obj)) {return ((function() {return space(vector_dash__gt_list(obj));
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
return ((function() {var o43 = (function(i){
var buffer = "";
var get_dash_buffer = (function() {return buffer;
});
var disp = (function(str){
buffer = (buffer + str);
});
var pad = (function(n){
return vector_dash_for_dash_each((function(_){
return disp(" ");
}),make_dash_vector(n));
});
return (function() {if(number_p_(obj)) {return ((function() {return ("" + obj);
}))();
} else {return (function() {if(string_p_(obj)) {return ((function() {return obj;
}))();
} else {return (function() {if(symbol_p_(obj)) {return ((function() {return symbol_dash__gt_string(obj);
}))();
} else {return (function() {if(boolean_p_(obj)) {return ((function() {return (function() {if(obj) {return "#t";
} else {return "#f";
}})()
;
}))();
} else {return (function() {if(null_p_(obj)) {return ((function() {return "()";
}))();
} else {return (function() {if(function_p_(obj)) {return ((function() {return "<function>";
}))();
} else {return (function() {if(list_p_(obj)) {return ((function() {return ((function() {var o45 = (function(node,childr,sp){
disp("(");
disp(inspect(node,(i + 1)));
for_dash_each((function(item){
(function() {if(sp) {return ((function() {disp("\n");
return pad(i);
}))();
} else {return disp(" ");
}})()
;
return disp(inspect(item,(i + 1)));
}),childr);
disp(")");
return get_dash_buffer();
});
var o46 = car(obj);
var o47 = cdr(obj);
var o48 = (space(obj) > 30);
return o45(o46,o47,o48);
}))();
}))();
} else {return (function() {if(vector_p_(obj)) {return ((function() {return ((function() {var o49 = (function(first,rest,sp){
disp("[");
disp(inspect(first,(i + 1)));
vector_dash_for_dash_each((function(item){
(function() {if(sp) {return ((function() {disp("\n");
return pad(i);
}))();
} else {return disp(" ");
}})()
;
return disp(inspect(item,(i + 1)));
}),rest);
disp("]");
return get_dash_buffer();
});
var o50 = vector_dash_ref(obj,0);
var o51 = vector_dash_slice(obj,1);
var o52 = (space(obj) > 30);
return o49(o50,o51,o52);
}))();
}))();
} else {return (function() {if(dict_p_(obj)) {return ((function() {disp("{");
((function() {var o53 = (function(lst,sp){
return ((function() {var loop = (function(lst,first){
return (function() {if(not(null_p_(lst))) {return ((function() {var o58 = (function(key,val){
(function() {if(not(first)) {return (function() {if(sp) {return ((function() {disp("\n");
return pad(i);
}))();
} else {return disp(" ");
}})()
;
} else {return false;
}})()
;
disp(":");
disp(inspect(key,i));
disp(" ");
disp(inspect(val,(i + 1 + vector_dash_length(symbol_dash__gt_string(key)))));
return loop(cddr(lst),false);
});
var o59 = car(lst);
var o60 = cadr(lst);
return o58(o59,o60);
}))();
} else {return false;
}})()
;
});
var o56 = lst;
var o57 = true;
return loop(o56,o57);
}))();
});
var o54 = dict_dash__gt_list(obj);
var o55 = (space(obj) > 30);
return o53(o54,o55);
}))();
disp("}");
return get_dash_buffer();
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
var o44 = (function() {if(null_p_(rest)) {return 1;
} else {return car(rest);
}})()
;
return o43(o44);
}))();
});
var apply = (function(func,args){
return func.apply(null,list_dash__gt_vector(args));
});
var _gensym = 0;
var gensym = (function() {_gensym = (_gensym + 1);
return string_dash__gt_symbol(("o" + _gensym));
});


var util = require("util");var fs = require("fs");var reader = require("./parser");var grammar = require("./grammar");var js = require("./backends/js");var application_p_ = (function(form){
return (list_p_(form) && not(expander_p_(car(form))));
});
var opt = (function(arg,def){
return (function() {if(null_p_(arg)) {return def;
} else {return car(arg);
}})()
;
});
var assert = (function(cnd,msg){
return (function() {if(not(cnd)) {throw(msg);
} else {return false;
}})()
;
});
var _expanders_ = dict();
var expander_dash_function = (function(name){
return dict_dash_ref(_expanders_,name);
});
var install_dash_expander = (function(name,func){
return dict_dash_put_excl_(_expanders_,name,func);
});
var expander_p_ = (function(name){
return (symbol_p_(name) && not(eq_p_(dict_dash_ref(_expanders_,name),undefined)));
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
return ((function() {var o1 = (function(i){
return ((function() {var o3 = (function(e1){
return e1(form,e1);
});
var o4 = (function(x,e2){
return (function() {if(not((i < n))) {return x;
} else {return ((function() {(function() {if((list_p_(x) && expander_p_(car(x)) && not(eq_p_(car(x),string_dash__gt_symbol("lambda"))))) {i = (i + 1);
} else {return false;
}})()
;
return initial_dash_expander(x,e2);
}))();
}})()
;
});
return o3(o4);
}))();
});
var o2 = 0;
return o1(o2);
}))();
});
var initial_dash_expander = (function(form,e){
return (function() {if(symbol_p_(form)) {return ((function() {return form;
}))();
} else {return (function() {if(literal_p_(form)) {return ((function() {return form;
}))();
} else {return (function() {if(vector_p_(form)) {return ((function() {return vector_dash_map((function(el){
return e(el,e);
}),form);
}))();
} else {return (function() {if(dict_p_(form)) {return ((function() {return dict_dash_map((function(el){
return e(el,e);
}),form);
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
return ((function() {var o5 = (function(sig){
return ((function() {var o7 = (function(name,arg_dash_names,body){
install_dash_expander(name,make_dash_expander(arg_dash_names,body));
return true;
});
var o8 = car(sig);
var o9 = cdr(sig);
var o10 = cddr(form);
return o7(o8,o9,o10);
}))();
});
var o6 = cadr(form);
return o5(o6);
}))();
}));
var make_dash_expander = (function(arg_dash_names,body){
assert(eq_p_(length(arg_dash_names),2),"define-expander functions must take two arguments");
return eval(__compiler.compile(compile(list_dash_append(list(string_dash__gt_symbol("lambda"),arg_dash_names),((function() {var o12 = (function(o11){
return (function() {if(vector_p_(o11)) {return vector_dash__gt_list(o11);
} else {return o11;
}})()
;
});
var o13 = body;
return o12(o13);
}))()),macro_dash_generator.make_dash_fresh()),__generator()));
});
install_dash_expander(string_dash__gt_symbol("define_dash_macro"),(function(form,e){
return ((function() {var o14 = (function(sig){
return ((function() {var o16 = (function(name,pattern,body){
install_dash_macro(name,pattern,body);
return true;
});
var o17 = car(sig);
var o18 = cdr(sig);
var o19 = cddr(form);
return o16(o17,o18,o19);
}))();
});
var o15 = cadr(form);
return o14(o15);
}))();
}));
var macro_dash_generator = false;
var install_dash_macro = (function(name,pattern,body){
return install_dash_expander(name,make_dash_macro(pattern,body));
});
var make_dash_macro = (function(pattern,body){
return ((function() {var o20 = (function(x,e){
return ((function() {var o23 = (function(src){
return eval(compile(src,macro_dash_generator.make_dash_fresh()));
});
var o24 = list(string_dash__gt_symbol("lambda"),list(x,e),list(e,list_dash_append(list(string_dash__gt_symbol("let"),destructure(pattern,list(string_dash__gt_symbol("cdr"),x),_emptylst)),((function() {var o26 = (function(o25){
return (function() {if(vector_p_(o25)) {return vector_dash__gt_list(o25);
} else {return o25;
}})()
;
});
var o27 = body;
return o26(o27);
}))()),e));
return o23(o24);
}))();
});
var o21 = gensym();
var o22 = gensym();
return o20(o21,o22);
}))();
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
return list_dash_append(list(string_dash__gt_symbol("lambda"),car(cdr(form))),((function() {var o29 = (function(o28){
return (function() {if(vector_p_(o28)) {return vector_dash__gt_list(o28);
} else {return o28;
}})()
;
});
var o30 = map((function(subform){
return e(subform,e);
}),cdr(cdr(form)));
return o29(o30);
}))());
}));
install_dash_expander(string_dash__gt_symbol("cond"),(function(form,e){
return (function() {if(null_p_(cdr(form))) {return false;
} else {return ((function() {var o31 = (function(forms){
return ((function() {var o33 = (function(f){
return (function() {if(eq_p_(car(f),string_dash__gt_symbol("else"))) {return e(list_dash_append(list(string_dash__gt_symbol("begin")),((function() {var o36 = (function(o35){
return (function() {if(vector_p_(o35)) {return vector_dash__gt_list(o35);
} else {return o35;
}})()
;
});
var o37 = cdr(f);
return o36(o37);
}))()),e);
} else {return e(list(string_dash__gt_symbol("if"),car(f),list_dash_append(list(string_dash__gt_symbol("begin")),((function() {var o39 = (function(o38){
return (function() {if(vector_p_(o38)) {return vector_dash__gt_list(o38);
} else {return o38;
}})()
;
});
var o40 = cdr(f);
return o39(o40);
}))()),list_dash_append(list(string_dash__gt_symbol("cond")),((function() {var o42 = (function(o41){
return (function() {if(vector_p_(o41)) {return vector_dash__gt_list(o41);
} else {return o41;
}})()
;
});
var o43 = cdr(forms);
return o42(o43);
}))())),e);
}})()
;
});
var o34 = car(forms);
return o33(o34);
}))();
});
var o32 = cdr(form);
return o31(o32);
}))();
}})()
;
}));
install_dash_expander(string_dash__gt_symbol("begin"),(function(form,e){
return e(list(list_dash_append(list(string_dash__gt_symbol("lambda"),_emptylst),((function() {var o45 = (function(o44){
return (function() {if(vector_p_(o44)) {return vector_dash__gt_list(o44);
} else {return o44;
}})()
;
});
var o46 = cdr(form);
return o45(o46);
}))())),e);
}));
install_dash_expander(string_dash__gt_symbol("define"),(function(form,e){
return ((function() {var o47 = (function(sig){
return (function() {if(list_p_(sig)) {return ((function() {return e(list(string_dash__gt_symbol("set"),car(sig),list_dash_append(list(string_dash__gt_symbol("lambda"),cdr(sig)),((function() {var o50 = (function(o49){
return (function() {if(vector_p_(o49)) {return vector_dash__gt_list(o49);
} else {return o49;
}})()
;
});
var o51 = cddr(form);
return o50(o51);
}))())),e);
}))();
} else {return (function() {if(symbol_p_(sig)) {return ((function() {return e(list(string_dash__gt_symbol("set"),sig,caddr(form)),e);
}))();
} else {return ((function() {throw(str("define requires a list"," or symbol to operate on: ",inspect(form)));
}))();
}})()
;
}})()
;
});
var o48 = cadr(form);
return o47(o48);
}))();
}));
install_dash_expander(string_dash__gt_symbol("let"),(function(form,e){
var replace = (function(expr,old,sym){
return (function() {if(symbol_p_(expr)) {return ((function() {return (function() {if(_eq__eq_(expr,old)) {return sym;
} else {return expr;
}})()
;
}))();
} else {return (function() {if(literal_p_(expr)) {return ((function() {return expr;
}))();
} else {return (function() {if(dict_p_(expr)) {return ((function() {return dict_dash_map((function(e){
return replace(e,old,sym);
}),expr);
}))();
} else {return (function() {if(vector_p_(expr)) {return ((function() {return vector_dash_map((function(e){
return replace(e,old,sym);
}),expr);
}))();
} else {return (function() {if(list_p_(expr)) {return ((function() {return map((function(e){
return replace(e,old,sym);
}),expr);
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
}})()
;
});
var generate_dash_defs = (function(syms,exprs){
return reverse(((function() {var loop = (function(lst,forms,vars,acc){
return (function() {if(null_p_(lst)) {return acc;
} else {return ((function() {var o56 = (function(sym,name,code){
return loop(cdr(lst),cdr(forms),dict_dash_merge(vars,dict(name,sym)),cons(list(string_dash__gt_symbol("define"),car(lst),fold((function(el,acc){
return replace(acc,el,dict_dash_ref(vars,el));
}),code,keys(vars))),acc));
});
var o57 = car(lst);
var o58 = car(car(forms));
var o59 = cadar(forms);
return o56(o57,o58,o59);
}))();
}})()
;
});
var o52 = syms;
var o53 = exprs;
var o54 = dict();
var o55 = _emptylst;
return loop(o52,o53,o54,o55);
}))());
});
var tco = (function(exprs,exit){
var if_p_ = (function(expr){
return (list_p_(expr) && _eq__eq_(car(expr),string_dash__gt_symbol("if")));
});
var let_p_ = (function(expr){
return (list_p_(expr) && _eq__eq_(car(expr),string_dash__gt_symbol("let")));
});
var begin_p_ = (function(expr){
return (list_p_(expr) && _eq__eq_(car(expr),string_dash__gt_symbol("begin")));
});
var tco_p_ = (function(expr){
return (list_p_(expr) && _eq__eq_(car(expr),exit));
});
var process_dash_if = (function(expr,transform){
return (function() {if(null_p_(cdddr(expr))) {return list(string_dash__gt_symbol("if"),cadr(expr),transform(caddr(expr)));
} else {return list(string_dash__gt_symbol("if"),cadr(expr),transform(caddr(expr)),transform(car(cdddr(expr))));
}})()
;
});
return ((function() {var o60 = (function(rexprs){
return ((function() {var o62 = (function(bottom){
return (function() {if(if_p_(bottom)) {return ((function() {return reverse(cons(process_dash_if(bottom,(function(expr){
return (function() {if(begin_p_(expr)) {return ((function() {return tco(expr,exit);
}))();
} else {return (function() {if(let_p_(expr)) {return ((function() {return tco(expr,exit);
}))();
} else {return ((function() {return car(tco(list(expr),exit));
}))();
}})()
;
}})()
;
})),cdr(rexprs)));
}))();
} else {return (function() {if(let_p_(bottom)) {return ((function() {return reverse(cons(tco(bottom,exit),cdr(rexprs)));
}))();
} else {return ((function() {return (function() {if(tco_p_(bottom)) {return reverse(cons(list(string_dash__gt_symbol("vector"),"__tco_call",list(string_dash__gt_symbol("lambda"),_emptylst,bottom)),cdr(rexprs)));
} else {return exprs;
}})()
;
}))();
}})()
;
}})()
;
});
var o63 = car(rexprs);
return o62(o63);
}))();
});
var o61 = reverse(exprs);
return o60(o61);
}))();
});
var tco_dash_call_p_ = (function(name,expr){
var _tco_p_ = (function(expr){
return (list_p_(expr) && _eq_(car(expr),string_dash__gt_symbol("vector")) && _eq_(cadr(expr),"__tco_call") && ((function() {var o64 = (function(lamb){
return ((function() {var o66 = (function(body){
return _eq_(car(body),name);
});
var o67 = caddr(lamb);
return o66(o67);
}))();
});
var o65 = caddr(expr);
return o64(o65);
}))());
});
return (function() {if(list_p_(expr)) {return (_tco_p_(expr) || fold((function(el,acc){
return (acc || tco_dash_call_p_(name,el));
}),false,expr));
} else {return false;
}})()
;
});
return ((function() {var o68 = (function(name,forms){
assert((null_p_(forms) || (list_p_(forms) && list_p_(car(forms)))),str("invalid let: ",form));
return ((function() {var o71 = (function(syms,body){
return ((function() {var o74 = (function(tco_dash_ed){
return e(list(list_dash_append(list(string_dash__gt_symbol("lambda"),_emptylst,list_dash_append(list(string_dash__gt_symbol("define"),list_dash_append(list(name),((function() {var o77 = (function(o76){
return (function() {if(vector_p_(o76)) {return vector_dash__gt_list(o76);
} else {return o76;
}})()
;
});
var o78 = map(car,forms);
return o77(o78);
}))())),((function() {var o80 = (function(o79){
return (function() {if(vector_p_(o79)) {return vector_dash__gt_list(o79);
} else {return o79;
}})()
;
});
var o81 = tco_dash_ed;
return o80(o81);
}))())),((function() {var o83 = (function(o82){
return (function() {if(vector_p_(o82)) {return vector_dash__gt_list(o82);
} else {return o82;
}})()
;
});
var o84 = list_dash_append(generate_dash_defs(syms,forms),(function() {if(tco_dash_call_p_(name,tco_dash_ed)) {return list(list(string_dash__gt_symbol("trampoline"),list_dash_append(list(name),((function() {var o86 = (function(o85){
return (function() {if(vector_p_(o85)) {return vector_dash__gt_list(o85);
} else {return o85;
}})()
;
});
var o87 = syms;
return o86(o87);
}))())));
} else {return list(list_dash_append(list(name),((function() {var o89 = (function(o88){
return (function() {if(vector_p_(o88)) {return vector_dash__gt_list(o88);
} else {return o88;
}})()
;
});
var o90 = syms;
return o89(o90);
}))()));
}})()
);
return o83(o84);
}))())),e);
});
var o75 = tco(body,name);
return o74(o75);
}))();
});
var o72 = map((function(el){
return gensym();
}),forms);
var o73 = (function() {if(symbol_p_(cadr(form))) {return cdddr(form);
} else {return cddr(form);
}})()
;
return o71(o72,o73);
}))();
});
var o69 = (function() {if(symbol_p_(cadr(form))) {return cadr(form);
} else {return gensym();
}})()
;
var o70 = (function() {if(symbol_p_(cadr(form))) {return caddr(form);
} else {return cadr(form);
}})()
;
return o68(o69,o70);
}))();
}));
install_dash_expander(string_dash__gt_symbol("quote"),(function(form,e){
return ((function() {var o91 = (function(src){
return ((function() {var o93 = (function(q){
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
} else {return ((function() {throw(str("invalid type of expression: ",inspect(src)));
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
var o94 = (function(el){
return e(list(string_dash__gt_symbol("quote"),el),e);
});
return o93(o94);
}))();
});
var o92 = cadr(form);
return o91(o92);
}))();
}));
install_dash_expander(string_dash__gt_symbol("quasiquote"),(function(form,e){
return ((function() {var o95 = (function(src){
return (function() {if(symbol_p_(src)) {return ((function() {return list(string_dash__gt_symbol("quote"),src);
}))();
} else {return (function() {if(literal_p_(src)) {return ((function() {return src;
}))();
} else {return (function() {if(vector_p_(src)) {return ((function() {return list(string_dash__gt_symbol("list_dash__gt_vector"),unquote_dash_splice_dash_expand(vector_dash__gt_list(src),e));
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
} else {return ((function() {throw(str("invalid type of expression: ",inspect(src)));
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
var o96 = cadr(form);
return o95(o96);
}))();
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
} else {return ((function() {var o97 = (function(el){
return (function() {if((list_p_(el) && eq_p_(car(el),string_dash__gt_symbol("unquote_dash_splicing")))) {return ((function() {var o99 = (function(src){
return quote_dash_splice(cdr(lst),cons(e(src,e),list_dash_push(lst_dash_acc,acc)),_emptylst);
});
var o100 = (function() {if(literal_p_(cadr(el))) {return ((function() {return list(string_dash__gt_symbol("list"),cadr(el));
}))();
} else {return (function() {if(vector_p_(cadr(el))) {return ((function() {return list(string_dash__gt_symbol("vector_dash__gt_list"),cadr(el));
}))();
} else {return (function() {if(dict_p_(cadr(el))) {return ((function() {pp(el);
throw("cannot splice dict");
}))();
} else {return ((function() {return ((function() {var o101 = (function(v){
return list(string_dash__gt_symbol("let"),list(list(v,cadr(el))),list(string_dash__gt_symbol("if"),list(string_dash__gt_symbol("vector_p_"),v),list(string_dash__gt_symbol("vector_dash__gt_list"),v),v));
});
var o102 = gensym();
return o101(o102);
}))();
}))();
}})()
;
}})()
;
}})()
;
return o99(o100);
}))();
} else {return quote_dash_splice(cdr(lst),lst_dash_acc,cons(e(list(string_dash__gt_symbol("quasiquote"),el),e),acc));
}})()
;
});
var o98 = car(lst);
return o97(o98);
}))();
}})()
;
});
return ((function() {var o103 = (function(res){
return (function() {if(eq_p_(length(res),1)) {return car(res);
} else {return cons(string_dash__gt_symbol("list_dash_append"),reverse(res));
}})()
;
});
var o104 = quote_dash_splice(lst,_emptylst,_emptylst);
return o103(o104);
}))();
});
install_dash_expander(string_dash__gt_symbol("eval"),(function(form,e){
return list(string_dash__gt_symbol("eval"),list(string_dash__gt_symbol("__compiler.compile"),e(cadr(form),e),list(string_dash__gt_symbol("__generator"))));
}));
var _natives_ = dict();
var native_dash_function = (function(name){
return dict_dash_ref(_natives_,name);
});
var install_dash_native = (function(name,func,validator){
return dict_dash_put_excl_(_natives_,name,(function(form,gen,expr_p_,parse){
validator(form);
return dict_dash_ref(gen,func)(cdr(form),expr_p_,parse);
}));
});
var native_p_ = (function(name){
return (symbol_p_(name) && not(eq_p_(dict_dash_ref(_natives_,name)),undefined));
});
var verify_dash_not_dash_single = (function(form){
return assert((length(form) > 1),str("form requires at least one operand:",inspect(form)));
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
return assert((list_p_(el) && eq_p_(length(el),2)),str("require needs a list of ","2 element lists: ",inspect(el)));
}),cdr(form));
}));
var parse = (function(form,generator){
var expr_p_ = vector_dash__gt_list(Array.prototype.slice.call(arguments, 2));
return ((function() {var o105 = (function(expr_p_,_per_parse){
var parse_dash_literal = (function(form){
return (function() {if(number_p_(form)) {return ((function() {return generator.write_dash_number(form,not(expr_p_));
}))();
} else {return (function() {if(string_p_(form)) {return ((function() {return generator.write_dash_string(form,not(expr_p_));
}))();
} else {return (function() {if(boolean_p_(form)) {return ((function() {return generator.write_dash_boolean(form,not(expr_p_));
}))();
} else {return (function() {if(null_p_(form)) {return ((function() {return generator.write_dash_empty_dash_list(form,not(expr_p_));
}))();
} else {return ((function() {throw(str("Invalid literal: ",inspect(form)));
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
assert(not(expr_p_),str("set{!} cannot be an expression: ",inspect(form)));
assert(symbol_p_(cadr(form)),"set{!} expects a symbol to operate on");
return (function() {if(eq_p_(car(form),string_dash__gt_symbol("set"))) {return generator.write_dash_set;
} else {return generator.write_dash_set_excl_;
}})()
(cadr(form),caddr(form),_per_parse);
});
var parse_dash_if = (function(form){
assert((length(form) > 2),str("`if` has no branches: ",inspect(form)));
return generator.write_dash_if(cadr(form),caddr(form),expr_p_,_per_parse,(function() {if(null_p_(cdddr(form))) {return false;
} else {return car(cdddr(form));
}})()
);
});
var parse_dash_lambda = (function(form){
assert((null_p_(cadr(form)) || list_p_(cadr(form)) || symbol_p_(cadr(form))),"lambda expects a list or symbol for arguments");
return ((function() {var o108 = (function(args){
return generator.write_dash_lambda(args,cddr(form),expr_p_,_per_parse);
});
var o109 = cadr(form);
return o108(o109);
}))();
});
var parse_dash_func_dash_call = (function(form){
return ((function() {var o110 = (function(func){
assert((symbol_p_(func) || list_p_(func)),str("operator is not a procedure: ",inspect(form)));
return generator.write_dash_func_dash_call(func,cdr(form),expr_p_,_per_parse);
});
var o111 = car(form);
return o110(o111);
}))();
});
var parse_dash_quoted = (function(form){
return ((function() {var o112 = (function(src){
return (function() {if(symbol_p_(src)) {return ((function() {return generator.write_dash_symbol(src,not(expr_p_));
}))();
} else {return (function() {if(literal_p_(src)) {return ((function() {return parse_dash_literal(src);
}))();
} else {return ((function() {throw(str("unexpected type of object in quote, ","literal expected: ",inspect(form)));
}))();
}})()
;
}})()
;
});
var o113 = cadr(form);
return o112(o113);
}))();
});
var parse_dash_list = (function(form){
return ((function() {var o114 = (function(first){
return (function() {if(eq_p_(first,string_dash__gt_symbol("if"))) {return ((function() {return parse_dash_if(form);
}))();
} else {return (function() {if(eq_p_(first,string_dash__gt_symbol("lambda"))) {return ((function() {return parse_dash_lambda(form);
}))();
} else {return (function() {if(eq_p_(first,string_dash__gt_symbol("quote"))) {return ((function() {return parse_dash_quoted(form);
}))();
} else {return (function() {if((eq_p_(first,string_dash__gt_symbol("set_excl_")) || eq_p_(first,string_dash__gt_symbol("set")))) {return ((function() {return parse_dash_set(form);
}))();
} else {return (function() {if(eq_p_(first,string_dash__gt_symbol("_per_raw"))) {return ((function() {assert(string_p_(cadr(form)),"%raw expects a string");
return generator.write_dash_raw_dash_code(cadr(form));
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
}})()
;
});
var o115 = car(form);
return o114(o115);
}))();
});
var parse_dash_vector = (function(vec){
return parse_dash_list(cons(string_dash__gt_symbol("vector"),vector_dash__gt_list(vec)));
});
var parse_dash_dict = (function(dict){
return ((function() {var o116 = (function(lst,i){
return ((function() {var o119 = (function(qlst){
return parse_dash_list(cons(string_dash__gt_symbol("dict"),qlst));
});
var o120 = map((function(el){
i = (i + 1);
return (function() {if(eq_p_(((i - 1) % 2),0)) {return list(string_dash__gt_symbol("quote"),el);
} else {return el;
}})()
;
}),lst);
return o119(o120);
}))();
});
var o117 = dict_dash__gt_list(dict);
var o118 = 0;
return o116(o117,o118);
}))();
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
} else {return ((function() {throw(str("Unkown thing: ",form));
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
var o106 = opt(expr_p_,false);
var o107 = (function(form){
var expr_p_ = vector_dash__gt_list(Array.prototype.slice.call(arguments, 1));
return parse(form,generator,opt(expr_p_,false));
});
return o105(o106,o107);
}))();
});
var read = (function(src){
return reader(grammar,src,vector());
});
var compile = (function(src,generator){
(function() {if(not(macro_dash_generator)) {macro_dash_generator = generator;
} else {return false;
}})()
;
return ((function() {var o121 = (function(forms){
(function() {if(eq_p_(car(forms),string_dash__gt_symbol("begin"))) {return for_dash_each((function(form){
return parse(expand(form),generator);
}),cdr(forms));
} else {return parse(expand(forms),generator);
}})()
;
return generator.get_dash_code();
});
var o122 = (function() {if(string_p_(src)) {return read(src);
} else {return src;
}})()
;
return o121(o122);
}))();
});
module.exports = dict(string_dash__gt_symbol("read"),read,string_dash__gt_symbol("expand"),expand,string_dash__gt_symbol("parse"),parse,string_dash__gt_symbol("compile"),compile,string_dash__gt_symbol("install_dash_expander"),install_dash_expander,string_dash__gt_symbol("expand_dash_once"),expand_dash_once,string_dash__gt_symbol("expand_dash_nth"),expand_dash_nth,string_dash__gt_symbol("pp"),pp,string_dash__gt_symbol("set_dash_macro_dash_generator"),(function(g){
return (function() {if(not(macro_dash_generator)) {macro_dash_generator = g;
} else {return false;
}})()
;
}));


});
require("/compiler.js");

require.define("/js.js", function (require, module, exports, __dirname, __filename) {
    var util = require("util");var type = (function(obj){
return (function() {if(number_p_(obj)) {return ((function() {return string_dash__gt_symbol("number");
}))();
} else {return (function() {if(boolean_p_(obj)) {return ((function() {return string_dash__gt_symbol("boolean");
}))();
} else {return (function() {if(string_p_(obj)) {return ((function() {return string_dash__gt_symbol("string");
}))();
} else {return (function() {if(null_p_(obj)) {return ((function() {return string_dash__gt_symbol("null");
}))();
} else {return (function() {if(list_p_(obj)) {return ((function() {return string_dash__gt_symbol("list");
}))();
} else {return (function() {if(vector_p_(obj)) {return ((function() {return string_dash__gt_symbol("vector");
}))();
} else {return (function() {if(dict_p_(obj)) {return ((function() {return string_dash__gt_symbol("dict");
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
}})()
;
}})()
;
}})()
;
});
var number_p_ = (function(obj){
return eq_p_(typeof obj,"number");
});
var string_p_ = (function(obj){
return eq_p_(typeof obj,"string");
});
var symbol_p_ = (function(obj){
return (!!obj && obj.str !== undefined && obj.symbol !== undefined);
});
var boolean_p_ = (function(obj){
return (eq_p_(obj,true) || eq_p_(obj,false));
});
var null_p_ = (function(obj){
return (!!obj && not(eq_p_(obj.length,undefined)) && eq_p_(obj.length,1) && eq_p_(vector_dash_ref(obj,0),null));
});
var list_p_ = (function(obj){
return (!!obj && not(eq_p_(obj.length,undefined)) && not(eq_p_(obj.list,undefined)));
});
var vector_p_ = (function(obj){
return (not(list_p_(obj)) && not(null_p_(obj)) && !!obj && eq_p_(typeof obj,"object") && not(eq_p_(obj.length,undefined)));
});
var dict_p_ = (function(obj){
return (not(symbol_p_(obj)) && !!obj && eq_p_(typeof obj,"object") && eq_p_(obj.length,undefined));
});
var literal_p_ = (function(x){
return (number_p_(x) || string_p_(x) || boolean_p_(x) || null_p_(x));
});
var str = (function() {
var args = vector_dash__gt_list(Array.prototype.slice.call(arguments));
return fold((function(el,acc){
return (acc + inspect(el));
}),"",args);
});
var string_dash__gt_symbol = (function(str){
return ((function() {var o1 = (function(s){
s = s.replace(RegExp("-","g"),"_dash_");
s = s.replace(RegExp("\\?","g"),"_p_");
s = s.replace(RegExp("\\!","g"),"_excl_");
s = s.replace(RegExp(">","g"),"_gt_");
s = s.replace(RegExp("<","g"),"_lt_");
s = s.replace(RegExp("%","g"),"_per_");
s = s.replace(RegExp("=","g"),"_eq_");
return {str:s, symbol:true}});
var o2 = str;
return o1(o2);
}))();
});
var symbol_dash__gt_string = (function(sym){
return ((function() {var o3 = (function(s){
s = s.replace(RegExp("_dash_","g"),"-");
s = s.replace(RegExp("_p_","g"),"?");
s = s.replace(RegExp("_excl_","g"),"!");
s = s.replace(RegExp("_gt_","g"),">");
s = s.replace(RegExp("_lt_","g"),"<");
s = s.replace(RegExp("_per_","g"),"%");
s = s.replace(RegExp("_eq_","g"),"=");
return s;
});
var o4 = sym.str;
return o3(o4);
}))();
});
var _emptylst = [null];
var list = (function() {
var args = vector_dash__gt_list(Array.prototype.slice.call(arguments));
return args;
});
var cons = (function(obj,lst){
return ((function() {var o5 = (function(res){
res.list = true;return res;
});
var o6 = [obj, lst];
return o5(o6);
}))();
});
var car = (function(lst){
return lst[0]});
var cdr = (function(lst){
return lst[1]});
var cadr = (function(lst){
return car(cdr(lst));
});
var cddr = (function(lst){
return cdr(cdr(lst));
});
var cdar = (function(lst){
return cdr(car(lst));
});
var caddr = (function(lst){
return car(cdr(cdr(lst)));
});
var cdddr = (function(lst){
return cdr(cdr(cdr(lst)));
});
var cadar = (function(lst){
return car(cdr(car(lst)));
});
var cddar = (function(lst){
return cdr(cdr(car(lst)));
});
var caadr = (function(lst){
return car(car(cdr(lst)));
});
var cdadr = (function(lst){
return cdr(car(cdr(lst)));
});
var list_dash_ref = (function(lst,i){
return ((function() {var loop = (function(lst,i){
return (function() {if(null_p_(lst)) {return ((function() {return false;
}))();
} else {return (function() {if(eq_p_(i,0)) {return ((function() {return car(lst);
}))();
} else {return ((function() {return loop(cdr(lst),(i - 1));
}))();
}})()
;
}})()
;
});
var o7 = lst;
var o8 = i;
return loop(o7,o8);
}))();
});
var length = (function(lst){
return fold((function(el,acc){
return (acc + 1);
}),0,lst);
});
var list_dash_append = (function(lst1,lst2){
return ((function() {var loop = (function(lst){
return (function() {if(null_p_(lst)) {return lst2;
} else {return cons(car(lst),loop(cdr(lst)));
}})()
;
});
var o9 = lst1;
return loop(o9);
}))();
});
var list_dash_find = (function(lst,val){
return ((function() {var loop = (function(lst){
return (function() {if(null_p_(lst)) {return false;
} else {return (function() {if(eq_p_(car(lst),val)) {return lst;
} else {return loop(cdr(lst));
}})()
;
}})()
;
});
var o10 = lst;
return loop(o10);
}))();
});
var map = (function(func,lst){
return (function() {if(null_p_(lst)) {return _emptylst;
} else {return cons(func(car(lst)),map(func,cdr(lst)));
}})()
;
});
var for_dash_each = (function(func,lst){
return (function() {if(not(null_p_(lst))) {return ((function() {func(car(lst));
return for_dash_each(func,cdr(lst));
}))();
} else {return false;
}})()
;
});
var fold = (function(func,acc,lst){
return (function() {if(null_p_(lst)) {return acc;
} else {return fold(func,func(car(lst),acc),cdr(lst));
}})()
;
});
var reverse = (function(lst){
return (function() {if(null_p_(lst)) {return _emptylst;
} else {return list_dash_append(reverse(cdr(lst)),list(car(lst)));
}})()
;
});
var vector_dash__gt_list = (function(vec){
return ((function() {var loop = (function(i){
return (function() {if((i < vec.length)) {return cons(vector_dash_ref(vec,i),loop((i + 1)));
} else {return _emptylst}})()
;
});
var o11 = 0;
return loop(o11);
}))();
});
var make_dash_vector = (function(count,val){
return ((function() {var o12 = (function(v){
return ((function() {var loop = (function(i){
return (function() {if((i < count)) {return ((function() {vector_dash_put_excl_(v,i,val);
return loop((i + 1));
}))();
} else {return v;
}})()
;
});
var o14 = 0;
return loop(o14);
}))();
});
var o13 = new Array(count);
return o12(o13);
}))();
});
var vector = (function() {return Array.prototype.slice.call(arguments)});
var vector_dash_ref = (function(vec,i){
return vec[i]});
var vector_dash_put_excl_ = (function(vec,i,obj){
return vec[i] = obj});
var vector_dash_concat = (function(vec1,vec2){
return vec1.concat(vec2)});
var vector_dash_slice = (function(vec,start,end){
return vec.slice(start, end)});
var vector_dash_push_excl_ = (function(vec,obj){
return vec.push(obj)});
var vector_dash_find = (function(vec,val){
return ((function() {var loop = (function(i){
return (function() {if((i < vec.length)) {return (function() {if(eq_p_(vector_dash_ref(vec,i),val)) {return i;
} else {return loop((i + 1));
}})()
;
} else {return false;
}})()
;
});
var o15 = 0;
return loop(o15);
}))();
});
var vector_dash_length = (function(vec){
return vec.length;
});
var list_dash__gt_vector = (function(lst){
var res = [];
for_dash_each((function(el){
return res.push(el);
}),lst);
return res;
});
var vector_dash_map = (function(func,vec){
var res = [];
((function() {var loop = (function(i){
return (function() {if((i < vec.length)) {return ((function() {res.push(func(vector_dash_ref(vec,i)));
return loop((i + 1));
}))();
} else {return false;
}})()
;
});
var o16 = 0;
return loop(o16);
}))();
return res;
});
var vector_dash_for_dash_each = (function(func,vec){
return ((function() {var loop = (function(i){
return (function() {if((i < vec.length)) {return ((function() {func(vector_dash_ref(vec,i));
return loop((i + 1));
}))();
} else {return false;
}})()
;
});
var o17 = 0;
return loop(o17);
}))();
});
var vector_dash_fold = (function(func,acc,vec){
return ((function() {var loop = (function(i,acc){
return (function() {if((i < vector_dash_length(vec))) {return loop((i + 1),func(vector_dash_ref(vec,i),acc));
} else {return acc;
}})()
;
});
var o18 = 0;
var o19 = acc;
return loop(o18,o19);
}))();
});
var dict = (function() {
var args = vector_dash__gt_list(Array.prototype.slice.call(arguments));
var res = {};
((function() {var loop = (function(lst){
return (function() {if(not(null_p_(lst))) {return ((function() {var o21 = (function(key,val){
dict_dash_put_excl_(res,key,val);
return loop(cddr(lst));
});
var o22 = car(lst);
var o23 = cadr(lst);
return o21(o22,o23);
}))();
} else {return false;
}})()
;
});
var o20 = args;
return loop(o20);
}))();
return res;
});
var dict_dash_put_excl_ = (function(dct,k,v){
return dct[k.str] = v});
var dict_dash_ref = (function(dct,k){
return dct[k.str]});
var dict_dash_map = (function(func,dct){
var res = dict();
((function() {var loop = (function(lst){
return (function() {if(not(null_p_(lst))) {return ((function() {var o25 = (function(k){
dict_dash_put_excl_(res,k,func(dict_dash_ref(dct,k)));
return loop(cdr(lst));
});
var o26 = car(lst);
return o25(o26);
}))();
} else {return false;
}})()
;
});
var o24 = keys(dct);
return loop(o24);
}))();
return res;
});
var dict_dash__gt_vector = (function(dct){
var res = vector();
((function() {var loop = (function(lst){
return (function() {if(not(null_p_(lst))) {return ((function() {vector_dash_push_excl_(res,car(lst));
vector_dash_push_excl_(res,dict_dash_ref(dct,car(lst)));
return loop(cdr(lst));
}))();
} else {return false;
}})()
;
});
var o27 = keys(dct);
return loop(o27);
}))();
return res;
});
var dict_dash__gt_list = (function(dct){
return vector_dash__gt_list(dict_dash__gt_vector(dct));
});
var keys = (function(dct){
return ((function() {var o28 = (function(res){
for(var k in dct) {
       res = cons(string_dash__gt_symbol(k), res);
    }return res;
});
var o29 = _emptylst;
return o28(o29);
}))();
});
var vals = (function(dct){
return map((function(k){
return dict_dash_ref(dct,k);
}),keys(dct));
});
var zip = (function(keys,vals){
var res = dict();
((function() {var loop = (function(ks,vs){
return (function() {if(not(null_p_(ks))) {return ((function() {dict_dash_put_excl_(res,car(ks),car(vs));
return loop(cdr(ks),cdr(vs));
}))();
} else {return false;
}})()
;
});
var o30 = keys;
var o31 = vals;
return loop(o30,o31);
}))();
return res;
});
var not = (function(obj){
return (typeof obj !== 'number' && !obj);
});
var _eq__eq_ = (function(obj1,obj2){
return (function() {if((symbol_p_(obj1) && symbol_p_(obj2))) {return obj1.str === obj2.str} else {return obj1 === obj2}})()
;
});
var _eq_ = (function(obj1,obj2){
return (function() {if((list_p_(obj1) && list_p_(obj2))) {return ((function() {return ((function() {var loop = (function(lst1,lst2){
var n1 = null_p_(lst1);
var n2 = null_p_(lst2);
return (function() {if((n1 && n2)) {return ((function() {return true;
}))();
} else {return (function() {if((n1 || n2)) {return ((function() {return false;
}))();
} else {return ((function() {return (function() {if(equal_p_(car(lst1),car(lst2))) {return loop(cdr(lst1),cdr(lst2));
} else {return false;
}})()
;
}))();
}})()
;
}})()
;
});
var o32 = obj1;
var o33 = obj2;
return loop(o32,o33);
}))();
}))();
} else {return (function() {if((vector_p_(obj1) && vector_p_(obj2))) {return ((function() {return ((function() {var loop = (function(i){
return (function() {if(((i < obj1.length) && (i < obj2.length))) {return ((function() {return true;
}))();
} else {return (function() {if(((i < obj1.length) || (i < obj2.length))) {return ((function() {return false;
}))();
} else {return ((function() {return (function() {if(equal_p_(vector_dash_ref(obj1,i),vector_dash_ref(obj2,i))) {return loop((i + 1));
} else {return false;
}})()
;
}))();
}})()
;
}})()
;
});
var o34 = 0;
return loop(o34);
}))();
}))();
} else {return (function() {if((dict_p_(obj1) && dict_p_(obj2))) {return ((function() {return ((function() {var o35 = (function(keys1,keys2){
return (eq_p_(length(keys1),length(keys2)) && ((function() {var loop = (function(lst){
return (function() {if(null_p_(lst)) {return true;
} else {return (function() {if(equal_p_(dict_dash_ref(obj1,car(lst)),dict_dash_ref(obj2,car(lst)))) {return loop(cdr(lst));
} else {return false;
}})()
;
}})()
;
});
var o38 = keys1;
return loop(o38);
}))());
});
var o36 = keys(obj1);
var o37 = keys(obj2);
return o35(o36,o37);
}))();
}))();
} else {return ((function() {return eq_p_(obj1,obj2);
}))();
}})()
;
}})()
;
}})()
;
});
var eq_p_ = _eq__eq_;
var equal_p_ = _eq_;
var display = (function(msg){
return console.log(msg);
});
var pp = (function(obj){
return display(str(inspect(obj),"\n"));
});
var inspect = (function(obj){
var rest = vector_dash__gt_list(Array.prototype.slice.call(arguments, 1));
var space = (function(obj){
return (function() {if((literal_p_(obj) || symbol_p_(obj))) {return ((function() {return vector_dash_length(inspect(obj));
}))();
} else {return (function() {if(list_p_(obj)) {return ((function() {return (length(obj) + 1 + fold((function(el,acc){
return (acc + space(el));
}),0,obj));
}))();
} else {return (function() {if(dict_p_(obj)) {return ((function() {return space(dict_dash__gt_list(obj));
}))();
} else {return (function() {if(vector_p_(obj)) {return ((function() {return space(vector_dash__gt_list(obj));
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
return ((function() {var o39 = (function(i){
var buffer = "";
var get_dash_buffer = (function() {return buffer;
});
var disp = (function(str){
buffer = (buffer + str);
});
var pad = (function(n){
return vector_dash_for_dash_each((function(_){
return disp(" ");
}),make_dash_vector(n));
});
return (function() {if(number_p_(obj)) {return ((function() {return ("" + obj);
}))();
} else {return (function() {if(string_p_(obj)) {return ((function() {return obj;
}))();
} else {return (function() {if(symbol_p_(obj)) {return ((function() {return symbol_dash__gt_string(obj);
}))();
} else {return (function() {if(boolean_p_(obj)) {return ((function() {return (function() {if(obj) {return "#t";
} else {return "#f";
}})()
;
}))();
} else {return (function() {if(null_p_(obj)) {return ((function() {return "()";
}))();
} else {return (function() {if(list_p_(obj)) {return ((function() {return ((function() {var o41 = (function(node,childr,sp){
disp("(");
disp(inspect(node,(i + 1)));
for_dash_each((function(item){
(function() {if(sp) {return ((function() {disp("\n");
return pad(i);
}))();
} else {return disp(" ");
}})()
;
return disp(inspect(item,(i + 1)));
}),childr);
disp(")");
return get_dash_buffer();
});
var o42 = car(obj);
var o43 = cdr(obj);
var o44 = (space(obj) > 30);
return o41(o42,o43,o44);
}))();
}))();
} else {return (function() {if(vector_p_(obj)) {return ((function() {return ((function() {var o45 = (function(first,rest,sp){
disp("[");
disp(inspect(first,(i + 1)));
vector_dash_for_dash_each((function(item){
(function() {if(sp) {return ((function() {disp("\n");
return pad(i);
}))();
} else {return disp(" ");
}})()
;
return disp(inspect(item,(i + 1)));
}),rest);
disp("]");
return get_dash_buffer();
});
var o46 = vector_dash_ref(obj,0);
var o47 = vector_dash_slice(obj,1);
var o48 = (space(obj) > 30);
return o45(o46,o47,o48);
}))();
}))();
} else {return (function() {if(dict_p_(obj)) {return ((function() {disp("{");
((function() {var o49 = (function(lst,sp){
return ((function() {var loop = (function(lst,first){
return (function() {if(not(null_p_(lst))) {return ((function() {var o54 = (function(key,val){
(function() {if(not(first)) {return (function() {if(sp) {return ((function() {disp("\n");
return pad(i);
}))();
} else {return disp(" ");
}})()
;
} else {return false;
}})()
;
disp(":");
disp(inspect(key,i));
disp(" ");
disp(inspect(val,(i + 1 + vector_dash_length(symbol_dash__gt_string(key)))));
return loop(cddr(lst),false);
});
var o55 = car(lst);
var o56 = cadr(lst);
return o54(o55,o56);
}))();
} else {return false;
}})()
;
});
var o52 = lst;
var o53 = true;
return loop(o52,o53);
}))();
});
var o50 = dict_dash__gt_list(obj);
var o51 = (space(obj) > 30);
return o49(o50,o51);
}))();
disp("}");
return get_dash_buffer();
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
}})()
;
}})()
;
}})()
;
}})()
;
});
var o40 = (function() {if(null_p_(rest)) {return 1;
} else {return car(rest);
}})()
;
return o39(o40);
}))();
});
var apply = (function(func,args){
return func.apply(null,list_dash__gt_vector(args));
});
var _gensym = 0;
var gensym = (function() {_gensym = (_gensym + 1);
return string_dash__gt_symbol(("o" + _gensym));
});


var fs = require("fs");var should_dash_return_p_ = (function(form){
return not((list_p_(form) && (eq_p_(car(form),string_dash__gt_symbol("throw")) || eq_p_(car(form),string_dash__gt_symbol("set_excl_")) || eq_p_(car(form),string_dash__gt_symbol("set")))));
});
var generator = (function() {var code = vector();
var make_dash_fresh = (function() {return generator();
});
var write = (function(src){
var eol = vector_dash__gt_list(Array.prototype.slice.call(arguments, 1));
return code.push((src + (function() {if(null_p_(eol)) {return "";
} else {return "\n";
}})()
));
});
var write_dash_runtime = (function(target){
var root = vector_dash__gt_list(Array.prototype.slice.call(arguments, 1));
return ((function() {var o1 = (function(root){
return (function() {if(not(equal_p_(target,"no-runtime"))) {return ((function() {write(fs.readFileSync(str(root,"/runtime.js"),"utf-8"),true);
return (function() {if(not(equal_p_(target,"js-noeval"))) {return ((function() {write(str("var __compiler = require('",root,"/compiler');"),true);
write(str("var __generator = require('",root,"/backends/js');"),true);
return write("var read = __compiler.read;",true);
}))();
} else {return false;
}})()
;
}))();
} else {return false;
}})()
;
});
var o2 = (function() {if(null_p_(root)) {return str(__dirname,"/..");
} else {return car(root);
}})()
;
return o1(o2);
}))();
});
var inline_dash_writer = (function(str){
return ((function() {var o3 = (function(first){
return (function() {return (function() {if(first) {first = false;
} else {return write(str);
}})()
;
});
});
var o4 = true;
return o3(o4);
}))();
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
return ((function() {var o5 = (function(str){
str = str.replace(RegExp("\\\\","g"),"\\\\");
str = str.replace(RegExp("\n","g"),"\\n");
str = str.replace(RegExp("\r","g"),"\\r");
str = str.replace(RegExp("\t","g"),"\\t");
str = str.replace(RegExp("\"","g"),"\\\"");
write(("\"" + str + "\""));
return terminate_dash_expr(not(top_p_));
});
var o6 = obj;
return o5(o6);
}))();
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
var fal = vector_dash__gt_list(Array.prototype.slice.call(arguments, 4));
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
write_dash_term(string_dash__gt_symbol("vector_dash__gt_list"));
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
write_dash_term(string_dash__gt_symbol("vector_dash__gt_list"));
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
((function() {var o7 = (function(i,len){
return for_dash_each((function(form){
(function() {if((eq_p_(i,(len - 1)) && should_dash_return_p_(form))) {return write("return ");
} else {return false;
}})()
;
parse(form);
i = (i + 1);
}),body);
});
var o8 = 0;
var o9 = length(body);
return o7(o8,o9);
}))();
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
((function() {var o10 = (function(comma){
return for_dash_each((function(arg){
comma();
return parse(arg,true);
}),args);
});
var o11 = inline_dash_writer(",");
return o10(o11);
}))();
write(")");
return terminate_dash_expr(expr_p_);
});
var write_dash_raw_dash_code = (function(code){
return write(code);
});
var write_dash_op = (function(op,vals,expr_p_,parse){
write("(");
((function() {var o12 = (function(op_dash_writer){
return for_dash_each((function(arg){
op_dash_writer();
return parse(arg,true);
}),vals);
});
var o13 = inline_dash_writer(str(" ",op," "));
return o12(o13);
}))();
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
return dict(string_dash__gt_symbol("get_dash_code"),(function() {return code.join("");
}),string_dash__gt_symbol("make_dash_fresh"),make_dash_fresh,string_dash__gt_symbol("write_dash_mod"),make_dash_op_dash_writer("%"),string_dash__gt_symbol("write_dash_lt"),make_dash_op_dash_writer("<"),string_dash__gt_symbol("write_dash_gt"),make_dash_op_dash_writer(">"),string_dash__gt_symbol("write_dash_divide"),make_dash_op_dash_writer("/"),string_dash__gt_symbol("write_dash_multiply"),make_dash_op_dash_writer("*"),string_dash__gt_symbol("write_dash_subtract"),make_dash_op_dash_writer("-"),string_dash__gt_symbol("write_dash_add"),make_dash_op_dash_writer("+"),string_dash__gt_symbol("write_dash_or"),make_dash_op_dash_writer("||"),string_dash__gt_symbol("write_dash_and"),make_dash_op_dash_writer("&&"),string_dash__gt_symbol("write_dash_require"),write_dash_require,string_dash__gt_symbol("write_dash_raw_dash_code"),write_dash_raw_dash_code,string_dash__gt_symbol("write_dash_func_dash_call"),write_dash_func_dash_call,string_dash__gt_symbol("write_dash_lambda"),write_dash_lambda,string_dash__gt_symbol("write_dash_if"),write_dash_if,string_dash__gt_symbol("write_dash_set_excl_"),write_dash_set_excl_,string_dash__gt_symbol("write_dash_set"),write_dash_set,string_dash__gt_symbol("write_dash_empty_dash_list"),write_dash_empty_dash_list,string_dash__gt_symbol("write_dash_symbol"),write_dash_symbol,string_dash__gt_symbol("write_dash_term"),write_dash_term,string_dash__gt_symbol("write_dash_boolean"),write_dash_boolean,string_dash__gt_symbol("write_dash_string"),write_dash_string,string_dash__gt_symbol("write_dash_number"),write_dash_number,string_dash__gt_symbol("write_dash_runtime"),write_dash_runtime);
});
module.exports = generator;


});
require("/js.js");
