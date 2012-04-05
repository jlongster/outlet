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
        cwd = path.resolve('/', cwd);
        var y = cwd || '/';
        
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
var __args = process.argv.slice(2);var list_dash_union = (function(lst1,lst2){
return list_dash_append(lst1,fold((function(el,acc){
return (function() {if(list_dash_find(lst1,el)) {return acc;
} else {return cons(el,acc);
}})()
;
}),_emptylst,lst2));
});
var list_dash_difference = (function(lst1,lst2){
return fold((function(el,acc){
return (function() {if(list_dash_find(lst2,el)) {return acc;
} else {return cons(el,acc);
}})()
;
}),_emptylst,lst1);
});
var true_p_ = (function(x){
return x;
});
var false_p_ = (function(x){
return not(x);
});
var self_dash_evaluating_p_ = literal_p_;
var variable_p_ = symbol_p_;
var quoted_p_ = (function(expr){
return eq_p_(car(expr),"\uFDD1quote");
});
var assignment_p_ = (function(expr){
return eq_p_(car(expr),"\uFDD1set!");
});
var definition_p_ = (function(expr){
return eq_p_(car(expr),"\uFDD1define");
});
var if_p_ = (function(expr){
return eq_p_(car(expr),"\uFDD1if");
});
var lambda_p_ = (function(expr){
return eq_p_(car(expr),"\uFDD1lambda");
});
var begin_p_ = (function(expr){
return eq_p_(car(expr),"\uFDD1begin");
});
var application_p_ = list_p_;
var text_dash_of_dash_quotation = (function(expr){
return cadr(expr);
});
var assignment_dash_variable = cadr;
var assignment_dash_value = caddr;
var make_dash_lambda = (function(args,body){
return cons("\uFDD1lambda",cons(args,body));
});
var definition_dash_variable = (function(expr){
return (function() {if(symbol_p_(cadr(expr))) {return cadr(expr);
} else {return caadr(expr);
}})()
;
});
var definition_dash_value = (function(expr){
return (function() {if(symbol_p_(cadr(expr))) {return caddr(expr);
} else {return make_dash_lambda(cdadr(expr),cddr(expr));
}})()
;
});
var if_dash_predicate = cadr;
var if_dash_consequent = caddr;
var if_dash_alternative = (function(exp){
return (function() {if(not(null_p_(cdddr(exp)))) {return car(cdddr(exp));
} else {return false;
}})()
;
});
var first_dash_exp = car;
var rest_dash_exps = cdr;
var last_dash_exp_p_ = (function(exp){
return null_p_(cdr(exp));
});
var lambda_dash_parameters = cadr;
var lambda_dash_body = cddr;
var begin_dash_actions = cdr;
var operator = car;
var operands = cdr;
var label_dash_counter = 0;
var new_dash_label_dash_counter = (function() {label_dash_counter = (label_dash_counter + 1);
return label_dash_counter;
});
var make_dash_label = (function(name){
return string_dash__gt_symbol(str(name,new_dash_label_dash_counter()));
});
var always_dash_should_dash_break = false;
var should_dash_break = false;
var breakpoint = (function(exp){
return (function() {if((always_dash_should_dash_break || should_dash_break)) {return ((function() {should_dash_break = false;
return list(list("\uFDD1assign","\uFDD1exp",list("\uFDD1const",exp)),list("\uFDD1break"));
}))();
} else {return list(list("\uFDD1nop"));
}})()
;
});
var make_dash_instruction_dash_sequence = (function(needs,modifies,statements){
return list(needs,modifies,statements);
});
var empty_dash_instruction_dash_sequence = (function() {return make_dash_instruction_dash_sequence(_emptylst,_emptylst,_emptylst);
});
var registers_dash_needed = (function(s){
return (function() {if(symbol_p_(s)) {return _emptylst;
} else {return car(s);
}})()
;
});
var registers_dash_modified = (function(s){
return (function() {if(symbol_p_(s)) {return _emptylst;
} else {return cadr(s);
}})()
;
});
var statements = (function(s){
return (function() {if(symbol_p_(s)) {return list(s);
} else {return caddr(s);
}})()
;
});
var needs_dash_register_p_ = (function(seq,reg){
return list_dash_find(registers_dash_needed(seq),reg);
});
var modifies_dash_register_p_ = (function(seq,reg){
return list_dash_find(registers_dash_modified(seq),reg);
});
var append_dash_instruction_dash_sequences = (function(){
var seqs = vector_dash__gt_list(Array.prototype.slice.call(arguments, 0));
var append_dash_2_dash_sequences = (function(seq1,seq2){
return make_dash_instruction_dash_sequence(list_dash_union(registers_dash_needed(seq1),list_dash_difference(registers_dash_needed(seq2),registers_dash_modified(seq1))),list_dash_union(registers_dash_modified(seq1),registers_dash_modified(seq2)),list_dash_append(statements(seq1),statements(seq2)));
});
var append_dash_seq_dash_list = (function(seqs){
return (function() {if(null_p_(seqs)) {return empty_dash_instruction_dash_sequence();
} else {return append_dash_2_dash_sequences(car(seqs),append_dash_seq_dash_list(cdr(seqs)));
}})()
;
});
return append_dash_seq_dash_list(seqs);
});
var preserving = (function(regs,seq1,seq2){
return (function() {if(null_p_(regs)) {return append_dash_instruction_dash_sequences(seq1,seq2);
} else {return ((function() {var o1 = (function(first_dash_reg){
return (function() {if((needs_dash_register_p_(seq2,first_dash_reg) && modifies_dash_register_p_(seq1,first_dash_reg))) {return preserving(cdr(regs),make_dash_instruction_dash_sequence(list_dash_union(list(first_dash_reg),registers_dash_needed(seq1)),list_dash_difference(registers_dash_modified(seq1),list(first_dash_reg)),list_dash_append(list(list("\uFDD1save",first_dash_reg)),list_dash_append(statements(seq1),list(list("\uFDD1restore",first_dash_reg))))),seq2);
} else {return preserving(cdr(regs),seq1,seq2);
}})()
;
});
var o2 = car(regs);
return o1(o2);
}))();
}})()
;
});
var tack_dash_on_dash_instruction_dash_sequence = (function(seq,body_dash_seq){
return make_dash_instruction_dash_sequence(registers_dash_needed(seq),registers_dash_modified(seq),list_dash_append(statements(seq),statements(body_dash_seq)));
});
var parallel_dash_instruction_dash_sequences = (function(seq1,seq2){
return make_dash_instruction_dash_sequence(list_dash_union(registers_dash_needed(seq1),registers_dash_needed(seq2)),list_dash_union(registers_dash_modified(seq1),registers_dash_modified(seq2)),list_dash_append(statements(seq1),statements(seq2)));
});
var make_dash_frame = (function(vars,vals){
return zip(vars,vals);
});
var enclosing_dash_environment = cdr;
var first_dash_frame = car;
var last_dash_frame = (function(env){
return car(reverse(env));
});
var empty_dash_environment = _emptylst;
var extend_dash_environment = (function(vars,vals,base_dash_env){
return (function() {if(_eq__eq_(length(vars),length(vals))) {return cons(make_dash_frame(vars,vals),base_dash_env);
} else {return (function() {if((length(vars) < length(vals))) {throw("too many arguments supplied");
} else {throw("too few arguments supplied");
}})()
;
}})()
;
});
var find_dash_frame_dash_with_dash_var = (function(varr,env){
return (function() {if(_eq_(env,empty_dash_environment)) {return false;
} else {return ((function() {var o3 = (function(frame){
return (function() {if(list_dash_find(keys(frame),varr)) {return frame;
} else {return find_dash_frame_dash_with_dash_var(varr,enclosing_dash_environment(env));
}})()
;
});
var o4 = first_dash_frame(env);
return o3(o4);
}))();
}})()
;
});
var lookup_dash_variable_dash_value = (function(varr,env){
return ((function() {var o5 = (function(frame){
return (function() {if(frame) {return dict_dash_ref(frame,varr);
} else {throw(str("unbound variable: ",varr));
}})()
;
});
var o6 = find_dash_frame_dash_with_dash_var(varr,env);
return o5(o6);
}))();
});
var set_dash_variable_dash_value_excl_ = (function(varr,val,env){
return ((function() {var o7 = (function(frame){
return (function() {if(frame) {return dict_dash_put_excl_(frame,varr,val);
} else {throw(str("unbound variable: ",varr));
}})()
;
});
var o8 = find_dash_frame_dash_with_dash_var(varr,env);
return o7(o8);
}))();
});
var define_dash_variable_excl_ = (function(varr,val,env){
return dict_dash_put_excl_(first_dash_frame(env),varr,val);
});
var setup_dash_environment = (function() {return extend_dash_environment(primitive_dash_procedure_dash_names(),primitive_dash_procedure_dash_objects(),empty_dash_environment);
});
var install_dash_primitives = (function(procs){
return ((function() {var o9 = (function(bottom){
return for_dash_each((function(key){
return dict_dash_put_excl_(bottom,key,make_dash_primitive_dash_procedure(dict_dash_ref(procs,key)));
}),keys(procs));
});
var o10 = last_dash_frame(global_dash_environment);
return o9(o10);
}))();
});
var primitive_dash_procedures = dict("\uFDD1car",car,"\uFDD1cdr",cdr,"\uFDD1cons",cons,"\uFDD1list",list,"\uFDD1null?",null_p_,"\uFDD1pp",pp,"\uFDD1+",(function(x,y){
return (x + y);
}),"\uFDD1-",(function(x,y){
return (x - y);
}),"\uFDD1*",(function(x,y){
return (x * y);
}),"\uFDD1>",(function(x,y){
return (x > y);
}),"\uFDD1<",(function(x,y){
return (x < y);
}),"\uFDD1==",_eq__eq_);
var primitive_dash_procedure_dash_names = (function() {return keys(primitive_dash_procedures);
});
var primitive_dash_procedure_dash_objects = (function() {return map(make_dash_primitive_dash_procedure,vals(primitive_dash_procedures));
});
var make_dash_primitive_dash_procedure = (function(proc){
return list("\uFDD1primitive",proc);
});
var primitive_dash_procedure_p_ = (function(proc){
return eq_p_(car(proc),"\uFDD1primitive");
});
var primitive_dash_implementation = cadr;
var apply_dash_primitive_dash_procedure = (function(proc,args){
return apply(primitive_dash_implementation(proc),args);
});
var make_dash_compiled_dash_procedure = (function(entry,env){
return list("\uFDD1compiled-procedure",entry,env);
});
var compiled_dash_procedure_p_ = (function(proc){
return eq_p_(car(proc),"\uFDD1compiled-procedure");
});
var compiled_dash_procedure_dash_entry = cadr;
var compiled_dash_procedure_dash_env = caddr;
var compile_dash_linkage = (function(linkage){
return (function() {if(eq_p_(linkage,"\uFDD1return")) {return ((function() {return make_dash_instruction_dash_sequence(list("\uFDD1continue"),_emptylst,list(list("\uFDD1goto",list("\uFDD1reg","\uFDD1continue"))));
}))();
} else {return (function() {if(eq_p_(linkage,"\uFDD1next")) {return ((function() {return empty_dash_instruction_dash_sequence();
}))();
} else {return ((function() {return make_dash_instruction_dash_sequence(_emptylst,_emptylst,list(list("\uFDD1goto",list("\uFDD1label",linkage))));
}))();
}})()
;
}})()
;
});
var end_dash_with_dash_linkage = (function(linkage,instruction_dash_sequence){
return preserving(list("\uFDD1continue"),instruction_dash_sequence,compile_dash_linkage(linkage));
});
var compile_dash_self_dash_evaluating = (function(exp,target,linkage){
return end_dash_with_dash_linkage(linkage,make_dash_instruction_dash_sequence(_emptylst,list(target),list_dash_append(((function() {var o12 = (function(o11){
return (function() {if(vector_p_(o11)) {return vector_dash__gt_list(o11);
} else {return o11;
}})()
;
});
var o13 = breakpoint(exp);
return o12(o13);
}))(),list(list("\uFDD1assign",target,list("\uFDD1const",exp))))));
});
var compile_dash_quoted = (function(exp,target,linkage){
return end_dash_with_dash_linkage(linkage,make_dash_instruction_dash_sequence(_emptylst,list(target),list_dash_append(((function() {var o15 = (function(o14){
return (function() {if(vector_p_(o14)) {return vector_dash__gt_list(o14);
} else {return o14;
}})()
;
});
var o16 = breakpoint(exp);
return o15(o16);
}))(),list(list("\uFDD1assign",target,list("\uFDD1const",text_dash_of_dash_quotation(exp)))))));
});
var compile_dash_variable = (function(exp,target,linkage){
return end_dash_with_dash_linkage(linkage,make_dash_instruction_dash_sequence(list("\uFDD1env"),list(target),list_dash_append(((function() {var o18 = (function(o17){
return (function() {if(vector_p_(o17)) {return vector_dash__gt_list(o17);
} else {return o17;
}})()
;
});
var o19 = breakpoint(exp);
return o18(o19);
}))(),list(list("\uFDD1assign",target,list("\uFDD1op","\uFDD1lookup-variable-value"),list("\uFDD1const",exp),list("\uFDD1reg","\uFDD1env"))))));
});
var compile_dash_assignment = (function(exp,target,linkage){
return ((function() {var o20 = (function(_var_,value_dash_code){
return end_dash_with_dash_linkage(linkage,preserving(list("\uFDD1env"),value_dash_code,make_dash_instruction_dash_sequence(list("\uFDD1env","\uFDD1val"),list(target),list_dash_append(((function() {var o24 = (function(o23){
return (function() {if(vector_p_(o23)) {return vector_dash__gt_list(o23);
} else {return o23;
}})()
;
});
var o25 = breakpoint(exp);
return o24(o25);
}))(),list(list("\uFDD1perform",list("\uFDD1op","\uFDD1set-variable-value!"),list("\uFDD1const",_var_),list("\uFDD1reg","\uFDD1val"),list("\uFDD1reg","\uFDD1env")),list("\uFDD1assign",target,list("\uFDD1const","\uFDD1ok")))))));
});
var o21 = assignment_dash_variable(exp);
var o22 = compile(assignment_dash_value(exp),"\uFDD1val","\uFDD1next");
return o20(o21,o22);
}))();
});
var compile_dash_definition = (function(exp,target,linkage){
return ((function() {var o26 = (function(_var_,value_dash_code){
return end_dash_with_dash_linkage(linkage,preserving(list("\uFDD1env"),value_dash_code,make_dash_instruction_dash_sequence(list("\uFDD1env","\uFDD1val"),list(target),list_dash_append(((function() {var o30 = (function(o29){
return (function() {if(vector_p_(o29)) {return vector_dash__gt_list(o29);
} else {return o29;
}})()
;
});
var o31 = breakpoint(exp);
return o30(o31);
}))(),list(list("\uFDD1perform",list("\uFDD1op","\uFDD1define-variable!"),list("\uFDD1const",_var_),list("\uFDD1reg","\uFDD1val"),list("\uFDD1reg","\uFDD1env")),list("\uFDD1assign",target,list("\uFDD1const","\uFDD1ok")))))));
});
var o27 = definition_dash_variable(exp);
var o28 = compile(definition_dash_value(exp),"\uFDD1val","\uFDD1next");
return o26(o27,o28);
}))();
});
var compile_dash_if = (function(exp,target,linkage){
return ((function() {var o32 = (function(t_dash_branch,f_dash_branch,after_dash_if,consequent_dash_linkage,p_dash_code,c_dash_code,a_dash_code){
return preserving(list("\uFDD1env","\uFDD1continue"),p_dash_code,append_dash_instruction_dash_sequences(make_dash_instruction_dash_sequence(list("\uFDD1val"),_emptylst,list_dash_append(((function() {var o41 = (function(o40){
return (function() {if(vector_p_(o40)) {return vector_dash__gt_list(o40);
} else {return o40;
}})()
;
});
var o42 = breakpoint(exp);
return o41(o42);
}))(),list(list("\uFDD1test",list("\uFDD1op","\uFDD1false?"),list("\uFDD1reg","\uFDD1val")),list("\uFDD1branch",list("\uFDD1label",f_dash_branch))))),parallel_dash_instruction_dash_sequences(append_dash_instruction_dash_sequences(t_dash_branch,c_dash_code),append_dash_instruction_dash_sequences(f_dash_branch,a_dash_code)),after_dash_if));
});
var o33 = make_dash_label("\uFDD1true-branch");
var o34 = make_dash_label("\uFDD1false-branch");
var o35 = make_dash_label("\uFDD1after-if");
var o36 = (function() {if(eq_p_(linkage,"\uFDD1next")) {return o35;
} else {return linkage;
}})()
;
var o37 = compile(if_dash_predicate(exp),"\uFDD1val","\uFDD1next");
var o38 = compile(if_dash_consequent(exp),target,o36);
var o39 = compile(if_dash_alternative(exp),target,linkage);
return o32(o33,o34,o35,o36,o37,o38,o39);
}))();
});
var compile_dash_sequence = (function(seq,target,linkage){
return (function() {if(last_dash_exp_p_(seq)) {return compile(first_dash_exp(seq),target,linkage);
} else {return preserving(list("\uFDD1env","\uFDD1continue"),compile(first_dash_exp(seq),target,"\uFDD1next"),compile_dash_sequence(rest_dash_exps(seq),target,linkage));
}})()
;
});
var compile_dash_lambda = (function(exp,target,linkage){
return ((function() {var o43 = (function(proc_dash_entry,after_dash_lambda,lambda_dash_linkage){
return append_dash_instruction_dash_sequences(tack_dash_on_dash_instruction_dash_sequence(end_dash_with_dash_linkage(lambda_dash_linkage,make_dash_instruction_dash_sequence(list("\uFDD1env"),list(target),list_dash_append(((function() {var o48 = (function(o47){
return (function() {if(vector_p_(o47)) {return vector_dash__gt_list(o47);
} else {return o47;
}})()
;
});
var o49 = breakpoint(exp);
return o48(o49);
}))(),list(list("\uFDD1assign",target,list("\uFDD1op","\uFDD1make-compiled-procedure"),list("\uFDD1label",proc_dash_entry),list("\uFDD1reg","\uFDD1env")))))),compile_dash_lambda_dash_body(exp,proc_dash_entry)),after_dash_lambda);
});
var o44 = make_dash_label("\uFDD1entry");
var o45 = make_dash_label("\uFDD1after-lambda");
var o46 = (function() {if(eq_p_(linkage,"\uFDD1next")) {return o45;
} else {return linkage;
}})()
;
return o43(o44,o45,o46);
}))();
});
var compile_dash_lambda_dash_body = (function(exp,proc_dash_entry){
return ((function() {var o50 = (function(formals){
return append_dash_instruction_dash_sequences(make_dash_instruction_dash_sequence(list("\uFDD1env","\uFDD1proc","\uFDD1arg1"),list("\uFDD1env"),list(proc_dash_entry,list("\uFDD1assign","\uFDD1env",list("\uFDD1op","\uFDD1compiled-procedure-env"),list("\uFDD1reg","\uFDD1proc")),list("\uFDD1assign","\uFDD1env",list("\uFDD1op","\uFDD1extend-environment"),list("\uFDD1const",formals),list("\uFDD1reg","\uFDD1arg1"),list("\uFDD1reg","\uFDD1env")))),compile_dash_sequence(lambda_dash_body(exp),"\uFDD1val","\uFDD1return"));
});
var o51 = lambda_dash_parameters(exp);
return o50(o51);
}))();
});
var compile_dash_application = (function(exp,target,linkage){
return ((function() {var o52 = (function(bp,proc_dash_code,operand_dash_codes){
return preserving(list("\uFDD1env","\uFDD1continue"),proc_dash_code,preserving(list("\uFDD1proc","\uFDD1continue"),construct_dash_arglist(operand_dash_codes),append_dash_instruction_dash_sequences(make_dash_instruction_dash_sequence(_emptylst,_emptylst,bp),compile_dash_procedure_dash_call(exp,target,linkage))));
});
var o53 = breakpoint(exp);
var o54 = compile(operator(exp),"\uFDD1proc","\uFDD1next");
var o55 = map((function(operand){
return compile(operand,"\uFDD1val","\uFDD1next");
}),operands(exp));
return o52(o53,o54,o55);
}))();
});
var construct_dash_arglist = (function(operand_dash_codes){
return ((function() {var o56 = (function(operand_dash_codes){
return (function() {if(null_p_(operand_dash_codes)) {return make_dash_instruction_dash_sequence(_emptylst,list("\uFDD1arg1"),list(list("\uFDD1assign","\uFDD1arg1",list("\uFDD1const",_emptylst))));
} else {return ((function() {var o58 = (function(code_dash_to_dash_get_dash_last_dash_arg){
return (function() {if(null_p_(cdr(operand_dash_codes))) {return code_dash_to_dash_get_dash_last_dash_arg;
} else {return preserving(list("\uFDD1env"),code_dash_to_dash_get_dash_last_dash_arg,code_dash_to_dash_get_dash_rest_dash_args(cdr(operand_dash_codes)));
}})()
;
});
var o59 = append_dash_instruction_dash_sequences(car(operand_dash_codes),make_dash_instruction_dash_sequence(list("\uFDD1val"),list("\uFDD1arg1"),list(list("\uFDD1assign","\uFDD1arg1",list("\uFDD1op","\uFDD1list"),list("\uFDD1reg","\uFDD1val")))));
return o58(o59);
}))();
}})()
;
});
var o57 = reverse(operand_dash_codes);
return o56(o57);
}))();
});
var code_dash_to_dash_get_dash_rest_dash_args = (function(operand_dash_codes){
return ((function() {var o60 = (function(code_dash_for_dash_next_dash_arg){
return (function() {if(null_p_(cdr(operand_dash_codes))) {return code_dash_for_dash_next_dash_arg;
} else {return preserving(list("\uFDD1env"),code_dash_for_dash_next_dash_arg,code_dash_to_dash_get_dash_rest_dash_args(cdr(operand_dash_codes)));
}})()
;
});
var o61 = preserving(list("\uFDD1arg1"),car(operand_dash_codes),make_dash_instruction_dash_sequence(list("\uFDD1val","\uFDD1arg1"),list("\uFDD1arg1"),list(list("\uFDD1assign","\uFDD1arg1",list("\uFDD1op","\uFDD1cons"),list("\uFDD1reg","\uFDD1val"),list("\uFDD1reg","\uFDD1arg1")))));
return o60(o61);
}))();
});
var compile_dash_procedure_dash_call = (function(exp,target,linkage){
return ((function() {var o62 = (function(primitive_dash_branch,compiled_dash_branch,after_dash_call,compiled_dash_linkage){
return append_dash_instruction_dash_sequences(make_dash_instruction_dash_sequence(list("\uFDD1proc"),_emptylst,list(list("\uFDD1test",list("\uFDD1op","\uFDD1primitive-procedure?"),list("\uFDD1reg","\uFDD1proc")),list("\uFDD1branch",list("\uFDD1label",primitive_dash_branch)))),parallel_dash_instruction_dash_sequences(append_dash_instruction_dash_sequences(compiled_dash_branch,compile_dash_proc_dash_app1(target,compiled_dash_linkage)),append_dash_instruction_dash_sequences(primitive_dash_branch,end_dash_with_dash_linkage(linkage,make_dash_instruction_dash_sequence(list("\uFDD1proc","\uFDD1arg1"),list(target),list(list("\uFDD1assign",target,list("\uFDD1op","\uFDD1apply-primitive-procedure"),list("\uFDD1reg","\uFDD1proc"),list("\uFDD1reg","\uFDD1arg1"))))))),after_dash_call);
});
var o63 = make_dash_label("\uFDD1primitive-branch");
var o64 = make_dash_label("\uFDD1compiled-branch");
var o65 = make_dash_label("\uFDD1after-call");
var o66 = (function() {if(eq_p_(linkage,"\uFDD1next")) {return o65;
} else {return linkage;
}})()
;
return o62(o63,o64,o65,o66);
}))();
});
var compile_dash_proc_dash_app1 = (function(target,linkage){
return (function() {if((eq_p_(target,"\uFDD1val") && not(eq_p_(linkage,"\uFDD1return")))) {return ((function() {return make_dash_instruction_dash_sequence(list("\uFDD1proc"),all_dash_regs,list(list("\uFDD1assign","\uFDD1continue",list("\uFDD1label",linkage)),list("\uFDD1assign","\uFDD1val",list("\uFDD1op","\uFDD1compiled-procedure-entry"),list("\uFDD1reg","\uFDD1proc")),list("\uFDD1goto",list("\uFDD1reg","\uFDD1val"))));
}))();
} else {return (function() {if((not(eq_p_(target,"\uFDD1val")) && not(eq_p_(linkage,"\uFDD1return")))) {return ((function() {return make_dash_instruction_dash_sequence(list("\uFDD1proc"),all_dash_regs,list(list("\uFDD1assign","\uFDD1continue",list("\uFDD1label",proc_dash_return)),list("\uFDD1assign","\uFDD1val",list("\uFDD1op","\uFDD1compiled-procedure-entry"),list("\uFDD1reg","\uFDD1proc")),list("\uFDD1goto",list("\uFDD1reg","\uFDD1val")),proc_dash_return,list("\uFDD1assign",target,list("\uFDD1reg","\uFDD1val")),list("\uFDD1goto",list("\uFDD1label",linkage))));
}))();
} else {return (function() {if((eq_p_(target,"\uFDD1val") && eq_p_(linkage,"\uFDD1return"))) {return ((function() {return make_dash_instruction_dash_sequence(list("\uFDD1proc","\uFDD1continue"),all_dash_regs,list(list("\uFDD1assign","\uFDD1val",list("\uFDD1op","\uFDD1compiled-procedure-entry"),list("\uFDD1reg","\uFDD1proc")),list("\uFDD1goto",list("\uFDD1reg","\uFDD1val"))));
}))();
} else {return (function() {if((not(eq_p_(target,"\uFDD1val")) && eq_p_(linkage,"\uFDD1return"))) {return ((function() {throw(str("compile-proc-app1: return linkage, target not val: ",target));
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
var next_p_ = (function(exp){
return (list_p_(exp) && eq_p_(car(exp),"\uFDD1next"));
});
var compile_dash_next = (function(linkage){
return end_dash_with_dash_linkage(linkage,make_dash_instruction_dash_sequence(_emptylst,_emptylst,list(list("\uFDD1next"))));
});
var all_dash_regs = list("\uFDD1env","\uFDD1proc","\uFDD1val","\uFDD1arg1","\uFDD1continue","\uFDD1exp");
var compile = (function(exp,target,linkage){
return (function() {if(next_p_(exp)) {return ((function() {return compile_dash_next(linkage);
}))();
} else {return (function() {if(self_dash_evaluating_p_(exp)) {return ((function() {return compile_dash_self_dash_evaluating(exp,target,linkage);
}))();
} else {return (function() {if(quoted_p_(exp)) {return ((function() {return compile_dash_quoted(exp,target,linkage);
}))();
} else {return (function() {if(variable_p_(exp)) {return ((function() {return compile_dash_variable(exp,target,linkage);
}))();
} else {return (function() {if(assignment_p_(exp)) {return ((function() {return compile_dash_assignment(exp,target,linkage);
}))();
} else {return (function() {if(definition_p_(exp)) {return ((function() {return compile_dash_definition(exp,target,linkage);
}))();
} else {return (function() {if(if_p_(exp)) {return ((function() {return compile_dash_if(exp,target,linkage);
}))();
} else {return (function() {if(lambda_p_(exp)) {return ((function() {return compile_dash_lambda(exp,target,linkage);
}))();
} else {return (function() {if(begin_p_(exp)) {return ((function() {return compile_dash_sequence(begin_dash_actions(exp),target,linkage);
}))();
} else {return (function() {if(application_p_(exp)) {return ((function() {return (function() {if(eq_p_(car(exp),"\uFDD1break")) {return ((function() {should_dash_break = true;
return empty_dash_instruction_dash_sequence();
}))();
} else {return compile_dash_application(exp,target,linkage);
}})()
;
}))();
} else {return ((function() {throw(str("compiler: unknown expression type",exp));
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
}})()
;
}})()
;
}})()
;
}})()
;
});
var runtime_dash_ops = dict("\uFDD1make-compiled-procedure",make_dash_compiled_dash_procedure,"\uFDD1compiled-procedure?",compiled_dash_procedure_p_,"\uFDD1compiled-procedure-env",compiled_dash_procedure_dash_env,"\uFDD1compiled-procedure-entry",compiled_dash_procedure_dash_entry,"\uFDD1extend-environment",extend_dash_environment,"\uFDD1lookup-variable-value",lookup_dash_variable_dash_value,"\uFDD1define-variable!",define_dash_variable_excl_,"\uFDD1list",list,"\uFDD1cons",cons,"\uFDD1primitive-procedure?",primitive_dash_procedure_p_,"\uFDD1apply-primitive-procedure",apply_dash_primitive_dash_procedure,"\uFDD1false?",false_p_,"\uFDD1true?",true_p_);
var global_dash_environment = setup_dash_environment();
module["exports"] = dict("\uFDD1compile",(function(src){
return statements(compile(src,"\uFDD1val","\uFDD1next"));
}),"\uFDD1ops",runtime_dash_ops,"\uFDD1first-frame",first_dash_frame,"\uFDD1install-primitives",install_dash_primitives,"\uFDD1stepping-mode",(function() {always_dash_should_dash_break = true;
}),"\uFDD1primitive-procedure?",primitive_dash_procedure_p_,"\uFDD1compiled-procedure?",compiled_dash_procedure_p_,"\uFDD1global-environment",global_dash_environment);


});

require.define("/machine.js", function (require, module, exports, __dirname, __filename) {
var __args = process.argv.slice(2);var fs = require("fs");var compiler = require("./compiler");var make_dash_machine = (function(regs,ops,controller){
return ((function() {var o1 = (function(machine){
for_dash_each((function(reg){
return machine["allocate-register"](reg);
}),regs);
machine["install-operations"](ops);
machine["install-instruction-sequence"](assemble(controller,machine));
return machine;
});
var o2 = make_dash_new_dash_machine();
return o1(o2);
}))();
});
var make_dash_register = (function() {return ((function() {var o3 = (function(contents){
return dict("\uFDD1get",(function() {return contents;
}),"\uFDD1set!",(function(val){
contents = val;
}));
});
var o4 = "\uFDD1_unassigned_";
return o3(o4);
}))();
});
var make_dash_stack = (function() {return ((function() {var o5 = (function(s){
return dict("\uFDD1push",(function(x){
s = cons(x,s);
}),"\uFDD1pop!",(function() {return (function() {if(null_p_(s)) {throw("pop: empty stack");
} else {return ((function() {var o7 = (function(top){
s = cdr(s);
return top;
});
var o8 = car(s);
return o7(o8);
}))();
}})()
;
}),"\uFDD1initialize",(function() {s = _emptylst;
}));
});
var o6 = _emptylst;
return o5(o6);
}))();
});
var make_dash_new_dash_machine = (function() {return ((function() {var o9 = (function(pc,flag,stack,instruction_dash_sequence,paused,on_dash_break){
return ((function() {var o16 = (function(ops,reg_dash_table){
var allocate_dash_register = (function(name){
return (function() {if(list_dash_find(keys(reg_dash_table),name)) {throw(str("register already defined: ",name));
} else {return dict_dash_put_excl_(reg_dash_table,name,make_dash_register());
}})()
;
});
var lookup_dash_register = (function(name){
return (function() {if(list_dash_find(keys(reg_dash_table),name)) {return dict_dash_ref(reg_dash_table,name);
} else {throw(str("unknown register: ",name));
}})()
;
});
var pause = (function() {paused = true;
return (function() {if(on_dash_break) {return on_dash_break();
} else {return false;
}})()
;
});
var execute = (function() {return ((function() {var loop = (function() {return ((function() {var o19 = (function(insts){
return (function() {if(null_p_(insts)) {return "\uFDD1done";
} else {return ((function() {var o21 = (function(inst){
return (function() {if(not(paused)) {return ((function() {var o23 = (function(proc){
(function() {if(proc) {return proc();
} else {throw(str("invalid exec proc: ",proc));
}})()
;
return vector("__tco_call",(function() {return loop();
}));
});
var o24 = instruction_dash_exec_dash_proc(inst);
return o23(o24);
}))();
} else {return false;
}})()
;
});
var o22 = car(insts);
return o21(o22);
}))();
}})()
;
});
var o20 = pc["get"]();
return o19(o20);
}))();
});
return trampoline(loop());
}))();
});
return dict("\uFDD1start",(function() {pc["set!"](instruction_dash_sequence);
return execute();
}),"\uFDD1install-instruction-sequence",(function(seq){
instruction_dash_sequence = seq;
}),"\uFDD1allocate-register",allocate_dash_register,"\uFDD1get-register",lookup_dash_register,"\uFDD1install-operations",(function(dct){
ops = dict_dash_merge(ops,dct);
}),"\uFDD1stack",(function() {return stack;
}),"\uFDD1operations",(function() {return ops;
}),"\uFDD1registers",(function() {return keys(reg_dash_table);
}),"\uFDD1pause",pause,"\uFDD1proceed",(function() {paused = false;
return execute();
}),"\uFDD1set-break-handler",(function(func){
on_dash_break = func;
}),"\uFDD1on-input",(function(txt){
return ((function() {var o25 = (function(exp){
(function() {if(eq_p_(car(exp),"\uFDD1read-into-reg")) {return ((function() {var o27 = (function(reg){
return reg["set!"](read(txt));
});
var o28 = lookup_dash_register(cadr(exp));
return o27(o28);
}))();
} else {return false;
}})()
;
advance_dash_pc(pc);
stop_dash_stdin();
paused = false;
return execute();
});
var o26 = instruction_dash_text(car(pc["get"]()));
return o25(o26);
}))();
}));
});
var o17 = dict("\uFDD1initialize-stack",stack["initialize"]);
var o18 = dict("\uFDD1flag",flag,"\uFDD1pc",pc);
return o16(o17,o18);
}))();
});
var o10 = make_dash_register();
var o11 = make_dash_register();
var o12 = make_dash_stack();
var o13 = _emptylst;
var o14 = false;
var o15 = false;
return o9(o10,o11,o12,o13,o14,o15);
}))();
});
var get_dash_register_dash_contents = (function(machine,name){
return dict_dash_ref(machine["get-register"](name),"\uFDD1get")();
});
var set_dash_register_dash_contents_excl_ = (function(machine,name,val){
return dict_dash_ref(machine["get-register"](name),"\uFDD1set!")(val);
});
var assemble = (function(controller,machine){
return extract_dash_labels(controller,(function(insts,labels){
update_dash_insts_excl_(insts,labels,machine);
return insts;
}));
});
var extract_dash_labels = (function(text,receive){
return (function() {if(null_p_(text)) {return receive(_emptylst,_emptylst);
} else {return extract_dash_labels(cdr(text),(function(insts,labels){
return ((function() {var o29 = (function(next_dash_inst){
return (function() {if(symbol_p_(next_dash_inst)) {return receive(insts,cons(make_dash_label_dash_entry(next_dash_inst,insts),labels));
} else {return receive(cons(make_dash_instruction(next_dash_inst),insts),labels);
}})()
;
});
var o30 = car(text);
return o29(o30);
}))();
}));
}})()
;
});
var update_dash_insts_excl_ = (function(insts,labels,machine){
return ((function() {var o31 = (function(pc,flag,stack,ops){
for_dash_each((function(inst){
return set_dash_instruction_dash_exec_dash_proc_excl_(inst,make_dash_execution_dash_procedure(instruction_dash_text(inst),labels,machine,pc,flag,stack,ops));
}),insts);
return for_dash_each((function(label){
return ((function() {var o36 = (function(i){
return for_dash_each((function(inst){
set_dash_instruction_dash_label_excl_(inst,label_dash_entry_dash_name(label));
set_dash_instruction_dash_line_dash_number_excl_(inst,i);
i = (i + 1);
}),label_dash_insts(label));
});
var o37 = 0;
return o36(o37);
}))();
}),labels);
});
var o32 = machine["get-register"]("\uFDD1pc");
var o33 = machine["get-register"]("\uFDD1flag");
var o34 = machine["stack"]();
var o35 = machine["operations"]();
return o31(o32,o33,o34,o35);
}))();
});
var make_dash_instruction = (function(text){
return vector(text,_emptylst,false,false);
});
var instruction_dash_text = (function(inst){
return vector_dash_ref(inst,0);
});
var instruction_dash_exec_dash_proc = (function(inst){
return vector_dash_ref(inst,1);
});
var instruction_dash_label = (function(inst){
return vector_dash_ref(inst,2);
});
var instruction_dash_line_dash_number = (function(inst){
return vector_dash_ref(inst,3);
});
var set_dash_instruction_dash_exec_dash_proc_excl_ = (function(inst,proc){
return vector_dash_put_excl_(inst,1,proc);
});
var set_dash_instruction_dash_label_excl_ = (function(inst,label){
return vector_dash_put_excl_(inst,2,label);
});
var set_dash_instruction_dash_line_dash_number_excl_ = (function(inst,n){
return vector_dash_put_excl_(inst,3,n);
});
var make_dash_label_dash_entry = (function(label,insts){
return vector(label,insts);
});
var label_dash_entry_dash_name = (function(label){
return vector_dash_ref(label,0);
});
var label_dash_insts = (function(label){
return vector_dash_ref(label,1);
});
var lookup_dash_label = (function(labels,name){
return ((function() {var o38 = (function(lst){
return (function() {if(lst) {return vector_dash_ref(car(lst),1);
} else {throw(str("undefined label: ",name));
}})()
;
});
var o39 = list_dash_find(labels,name,(function(v){
return vector_dash_ref(v,0);
}));
return o38(o39);
}))();
});
var advance_dash_pc = (function(pc){
return pc["set!"](cdr(pc["get"]()));
});
var make_dash_execution_dash_procedure = (function(inst,labels,machine,pc,flag,stack,ops){
return ((function() {var o40 = (function(top){
return (function() {if(_eq__eq_(top,"\uFDD1assign")) {return ((function() {return make_dash_assign(inst,machine,labels,ops,pc);
}))();
} else {return (function() {if(_eq__eq_(top,"\uFDD1test")) {return ((function() {return make_dash_test(inst,machine,labels,ops,flag,pc);
}))();
} else {return (function() {if(_eq__eq_(top,"\uFDD1branch")) {return ((function() {return make_dash_branch(inst,machine,labels,flag,pc);
}))();
} else {return (function() {if(_eq__eq_(top,"\uFDD1goto")) {return ((function() {return make_dash_goto(inst,machine,labels,pc);
}))();
} else {return (function() {if(_eq__eq_(top,"\uFDD1save")) {return ((function() {return make_dash_save(inst,machine,stack,pc);
}))();
} else {return (function() {if(_eq__eq_(top,"\uFDD1restore")) {return ((function() {return make_dash_restore(inst,machine,stack,pc);
}))();
} else {return (function() {if(_eq__eq_(top,"\uFDD1perform")) {return ((function() {return make_dash_perform(inst,machine,labels,ops,pc);
}))();
} else {return (function() {if(_eq__eq_(top,"\uFDD1read-into-reg")) {return ((function() {return make_dash_read(inst,machine,pc);
}))();
} else {return (function() {if(_eq__eq_(top,"\uFDD1break")) {return ((function() {return make_dash_break(machine,pc);
}))();
} else {return (function() {if(_eq__eq_(top,"\uFDD1next")) {return ((function() {return make_dash_next(machine,pc);
}))();
} else {return (function() {if(_eq__eq_(top,"\uFDD1nop")) {return ((function() {return make_dash_nop(machine,pc);
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
}})()
;
}})()
;
});
var o41 = car(inst);
return o40(o41);
}))();
});
var make_dash_assign = (function(inst,machine,labels,ops,pc){
return ((function() {var o42 = (function(target,expr){
return ((function() {var o45 = (function(value_dash_proc){
return (function() {target["set!"](value_dash_proc());
return advance_dash_pc(pc);
});
});
var o46 = (function() {if(operation_dash_exp_p_(expr)) {return make_dash_operation_dash_exp(expr,machine,labels,ops);
} else {return make_dash_primitive_dash_exp(car(expr),machine,labels);
}})()
;
return o45(o46);
}))();
});
var o43 = machine["get-register"](cadr(inst));
var o44 = cddr(inst);
return o42(o43,o44);
}))();
});
var make_dash_test = (function(inst,machine,labels,ops,flag,pc){
return ((function() {var o47 = (function(condition){
return (function() {if(operation_dash_exp_p_(condition)) {return ((function() {var o49 = (function(condition_dash_proc){
return (function() {flag["set!"](condition_dash_proc());
return advance_dash_pc(pc);
});
});
var o50 = make_dash_operation_dash_exp(condition,machine,labels,ops);
return o49(o50);
}))();
} else {throw(str("bad test instruction:",inst));
}})()
;
});
var o48 = cdr(inst);
return o47(o48);
}))();
});
var make_dash_branch = (function(inst,machine,labels,flag,pc){
return ((function() {var o51 = (function(dest){
return (function() {if(label_dash_exp_p_(dest)) {return ((function() {var o53 = (function(insts){
return (function() {return (function() {if(flag["get"]()) {return pc["set!"](insts);
} else {return advance_dash_pc(pc);
}})()
;
});
});
var o54 = lookup_dash_label(labels,label_dash_exp_dash_label(dest));
return o53(o54);
}))();
} else {throw(str("bad branch instruction: ",inst));
}})()
;
});
var o52 = cadr(inst);
return o51(o52);
}))();
});
var make_dash_goto = (function(inst,machine,labels,pc){
return ((function() {var o55 = (function(dest){
return (function() {if(label_dash_exp_p_(dest)) {return ((function() {return ((function() {var o57 = (function(insts){
return (function() {return pc["set!"](insts);
});
});
var o58 = lookup_dash_label(labels,label_dash_exp_dash_label(dest));
return o57(o58);
}))();
}))();
} else {return (function() {if(register_dash_exp_p_(dest)) {return ((function() {return ((function() {var o59 = (function(reg){
return (function() {return pc["set!"](reg["get"]());
});
});
var o60 = machine["get-register"](register_dash_exp_dash_reg(dest));
return o59(o60);
}))();
}))();
} else {return ((function() {throw(str("bad goto instruction: ",inst));
}))();
}})()
;
}})()
;
});
var o56 = cadr(inst);
return o55(o56);
}))();
});
var make_dash_save = (function(inst,machine,stack,pc){
return ((function() {var o61 = (function(reg){
return (function() {stack["push"](reg["get"]());
return advance_dash_pc(pc);
});
});
var o62 = machine["get-register"](cadr(inst));
return o61(o62);
}))();
});
var make_dash_restore = (function(inst,machine,stack,pc){
return ((function() {var o63 = (function(reg){
return (function() {reg["set!"](stack["pop!"]());
return advance_dash_pc(pc);
});
});
var o64 = machine["get-register"](cadr(inst));
return o63(o64);
}))();
});
var make_dash_perform = (function(inst,machine,labels,ops,pc){
return ((function() {var o65 = (function(action){
return (function() {if(operation_dash_exp_p_(action)) {return ((function() {var o67 = (function(action_dash_proc){
return (function() {action_dash_proc();
return advance_dash_pc(pc);
});
});
var o68 = make_dash_operation_dash_exp(action,machine,labels,ops);
return o67(o68);
}))();
} else {throw(str("bad perform instruction: ",inst));
}})()
;
});
var o66 = cdr(inst);
return o65(o66);
}))();
});
var make_dash_read = (function(inst,machine,pc){
return ((function() {var o69 = (function(reg){
return (function() {start_dash_stdin("\uFDD1repl");
return machine["pause"]();
});
});
var o70 = machine["get-register"](cadr(inst));
return o69(o70);
}))();
});
var make_dash_break = (function(machine,pc){
return (function() {advance_dash_pc(pc);
start_dash_stdin("\uFDD1break");
println(str("break: ",get_dash_register_dash_contents(machine,"\uFDD1exp")));
return machine["pause"]();
});
});
var make_dash_next = (function(machine,pc){
return (function() {advance_dash_pc(pc);
machine["pause"]();
return setTimeout((function() {return machine["proceed"]();
}),1);
});
});
var make_dash_nop = (function(machine,pc){
return (function() {return advance_dash_pc(pc);
});
});
var make_dash_primitive_dash_exp = (function(exp,machine,labels){
return (function() {if(const_dash_exp_p_(exp)) {return ((function() {return ((function() {var o71 = (function(c){
return (function() {return c;
});
});
var o72 = cadr(exp);
return o71(o72);
}))();
}))();
} else {return (function() {if(label_dash_exp_p_(exp)) {return ((function() {return ((function() {var o73 = (function(insts){
return (function() {return insts;
});
});
var o74 = lookup_dash_label(labels,cadr(exp));
return o73(o74);
}))();
}))();
} else {return (function() {if(register_dash_exp_p_(exp)) {return ((function() {return ((function() {var o75 = (function(r){
return (function() {return r["get"]();
});
});
var o76 = machine["get-register"](cadr(exp));
return o75(o76);
}))();
}))();
} else {return ((function() {throw(str("unknown expression type: ",exp));
}))();
}})()
;
}})()
;
}})()
;
});
var label_dash_exp_p_ = (function(exp){
return (list_p_(exp) && _eq__eq_(car(exp),"\uFDD1label"));
});
var label_dash_exp_dash_label = (function(exp){
return cadr(exp);
});
var register_dash_exp_p_ = (function(exp){
return (list_p_(exp) && _eq__eq_(car(exp),"\uFDD1reg"));
});
var register_dash_exp_dash_reg = (function(exp){
return cadr(exp);
});
var const_dash_exp_p_ = (function(exp){
return (list_p_(exp) && _eq__eq_(car(exp),"\uFDD1const"));
});
var const_dash_exp_dash_value = (function(exp){
return cadr(exp);
});
var make_dash_operation_dash_exp = (function(exp,machine,labels,ops){
return ((function() {var o77 = (function(op,aprocs){
return (function() {return apply(op,map((function(p){
return p();
}),aprocs));
});
});
var o78 = lookup_dash_prim(cadar(exp),ops);
var o79 = map((function(e){
return make_dash_primitive_dash_exp(e,machine,labels);
}),cdr(exp));
return o77(o78,o79);
}))();
});
var operation_dash_exp_p_ = (function(exp){
return (list_p_(exp) && eq_p_(car(car(exp)),"\uFDD1op"));
});
var lookup_dash_prim = (function(sym,ops){
return ((function() {var o80 = (function(prim){
(function() {if(not(prim)) {throw(str("unknown operation: ",sym));
} else {return false;
}})()
;
return prim;
});
var o81 = dict_dash_ref(ops,sym);
return o80(o81);
}))();
});
var stdin_dash_mode = false;
var start_dash_stdin = (function(mode){
stdin_dash_mode = mode;
return get_dash_stdin_dash_handler()();
});
var stdin_dash_handler = (function() {return process["stdin"]["resume"]();
});
var get_dash_stdin_dash_handler = (function() {return stdin_dash_handler;
});
var set_dash_stdin_dash_handler_excl_ = (function(func){
stdin_dash_handler = func;
});
var stop_dash_stdin = (function() {return process["stdin"]["pause"]();
});
process["stdin"]["on"]("data",(function(txt){
return ((function() {var o82 = (function(txt){
return (function() {if(_eq_(stdin_dash_mode,"\uFDD1repl")) {return ((function() {return on_dash_repl_dash_input(txt);
}))();
} else {return (function() {if(_eq_(stdin_dash_mode,"\uFDD1break")) {return ((function() {return on_dash_break_dash_input(txt);
}))();
} else {return false;
}})()
;
}})()
;
});
var o83 = (txt + "");
return o82(o83);
}))();
}));
process["stdin"]["pause"]();
var continue_dash_machine = (function() {process["stdin"]["pause"]();
return current_dash_machine["proceed"]();
});
var inspect_dash_var = (function(v){
return (function() {if((v && compiler["compiled-procedure?"](v))) {return ((function() {return "<compiled-function>";
}))();
} else {return (function() {if((v && compiler["primitive-procedure?"](v))) {return ((function() {return "<native-function>";
}))();
} else {return ((function() {return inspect(v);
}))();
}})()
;
}})()
;
});
var inspect_dash_environment = (function() {return ((function() {var o84 = (function(frame){
return fold((function(k,acc){
return ((function() {var o86 = (function(v,v){
return (acc + str(k,": ",v,"\n"));
});
var o87 = dict_dash_ref(frame,k);
var o88 = inspect_dash_var(o87);
return o86(o87,o88);
}))();
}),"",keys(frame));
});
var o85 = compiler["first-frame"](get_dash_register_dash_contents(current_dash_machine,"\uFDD1env"));
return o84(o85);
}))();
});
var debugger_dash_handle = (function(txt){
return ((function() {var o89 = (function(txt){
return (function() {if(_eq_(txt,"v")) {return ((function() {return println(inspect_dash_environment());
}))();
} else {return ((function() {return continue_dash_machine();
}))();
}})()
;
});
var o90 = txt["trim"]();
return o89(o90);
}))();
});
var current_dash_machine = false;
var on_dash_repl_dash_input = (function(txt){
return current_dash_machine["on-input"](txt);
});
var on_dash_break_dash_input = debugger_dash_handle;
var feed_dash_asm = (function(src){
return ((function() {var o91 = (function(machine){
set_dash_register_dash_contents_excl_(machine,"\uFDD1env",compiler["global-environment"]);
current_dash_machine = machine;
return machine;
});
var o92 = make_dash_machine(list("\uFDD1env","\uFDD1proc","\uFDD1val","\uFDD1arg1","\uFDD1continue","\uFDD1input","\uFDD1exp"),compiler["ops"],src);
return o91(o92);
}))();
});
module["exports"] = dict("\uFDD1feed-asm",feed_dash_asm,"\uFDD1set-stdin-handler!",set_dash_stdin_dash_handler_excl_,"\uFDD1instance",(function() {return current_dash_machine;
}),"\uFDD1inspect-environment",inspect_dash_environment,"\uFDD1get-register-contents",get_dash_register_dash_contents,"\uFDD1result",(function() {return get_dash_register_dash_contents(current_dash_machine,"\uFDD1val");
}));


});

require.define("fs", function (require, module, exports, __dirname, __filename) {
// nothing to see here... no file methods for the browser

});

require.define("/vm.js", function (require, module, exports, __dirname, __filename) {
    var __args = process.argv.slice(2);var compiler = require("./compiler");var machine = require("./machine");var run = (function(src){
return ((function() {var o1 = (function(statements,m){
m["set-break-handler"](break_dash_handler);
return m["start"]();
});
var o2 = compiler["compile"](src);
var o3 = machine["feed-asm"](o2);
return o1(o2,o3);
}))();
});
var resume = (function() {return ((function() {var o4 = (function(m){
return m["proceed"]();
});
var o5 = machine["instance"]();
return o4(o5);
}))();
});
var asm = (function(src){
return pp(compiler["compile"](src));
});
var break_dash_handler = false;
var set_dash_break_dash_handler = (function(func){
break_dash_handler = func;
});
var install_dash_primitives = (function(procs){
return compiler["install-primitives"](procs);
});
module["exports"] = dict("\uFDD1run",run,"\uFDD1asm",asm,"\uFDD1stepping-mode",compiler["stepping-mode"],"\uFDD1set-break-handler",set_dash_break_dash_handler,"\uFDD1install-primitives",install_dash_primitives);


});
require("/vm.js");
