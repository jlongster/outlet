var util = require('util');

function make_symbol(str) {
    return {
        str: str,
        symbol: true
    };
}

function map(func, lst) {
    if(null_p_(lst)) {
        return [];
    }
    else {
        return cons(func(car(lst)),
                    map(func, cdr(lst)));
    }
}

function for_each(func, lst) {
    if(!null_p_(lst)) {
        func(car(lst));
        for_each(func, cdr(lst));
    }
}

function vector_map(func, vec) {
    var res = [];

    for(var i=0, len=vec.length; i<len; i++) {
        res.push(func(vec[i]));
    }

    return res;
}

function vector_for_each(func, vec) {
    for(var i=0, len=vec.length; i<len; i++) {
        func(vec[i]);
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
    else if(map_p_(v1) && map_p_(v2)) {
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
    return arr.length !== undefined && arr.length == 0;
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

function make_list(arr) {
    arr.list = true;
    return arr;
}

function vector_to_list(vec) {
    function l(v, i) {
        if(i < v.length) {
            return cons(v[i], l(v, i+1));
        }
        else {
            return [];
        }
    }

    return l(vec, 0);
}

function list_to_vector(lst) {
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

function vector_ref(arr, i) {
    return arr[i];
}

function vector_set_excl_(arr, i, v) {
    arr[i] = v;
}

function vector_concat(arr1, arr2) {
    return arr1.concat(arr2);
}

function vector() {
    return Array.prototype.slice.call(arguments);
}

function vector_push(vec, val) {
    vec.push(val);
}

function hash_map() {
    var keyvals = Array.prototype.slice.call(arguments);
    var res = {};

    for(var i=0, len=keyvals.length; i<len; i+=2) {
        var key = keyvals[i];

        // Ignore this, it's only to support the compiler for now...
        if(key.children &&
           key.children[0].data &&
           key.children[0].data.str &&
           key.children[0].data.str == 'quote') {
            key = key.children[1].data.str;
        }
        else if(key.str) {
            key = key.str;
        }

        res[key] = keyvals[i+1];
    }

    return res;
}

function hash_map_map(func, m) {
    var res = {};
    for(var k in m) {
        res[k] = func(m[k]);
    }
    return res;
}

function hash_map_to_vec(obj) {
    var res = [];
    for(var k in obj) {
        res.push(k);
        res.push(obj);
    }
    return res;
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

function list_p_(obj) {
    return obj && obj.list;
}

function vector_p_(obj) {
    return obj && typeof obj == 'object' && obj.length !== undefined;
}

function map_p_(obj) {
    return obj && typeof obj == 'object' && obj.length === undefined;
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
    else if(list_p_(obj)) {
        return '(' + 
            map(function(obj) { return __gt_string(obj); },
                obj).join(' ') +
            ')';
    }
    else if(vector_p_(obj)) {
        return '[' +
            vector_map(function(obj) { return __gt_string(obj); },
                       obj).join(' ') +
            ']';
    }
    else if(map_p_(obj)) {
        var res = [];
        for(var k in obj) {
            res.push(k + ': ' + util.inspect(obj[k], null, 10));
        }
        return '{' + res.join(', ') + '}';
    }
}

function list_append(lst1, lst2) {
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

function unquote_splice(lst) {
    // if(!lst.length || lst.length != 2 || lst[1].length === undefined) {
    //     return lst;
    // }

    if(null_p_(lst)) {
        return [];
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
            return list_append(elem.data, rest);
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
            if(!map_p_(prop.data)) {
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
var util = require("util");
var fs = require("fs");
var reader = require("./parser");
var ast = require("./ast");
var grammar = require("./grammar");
var js = require("./compiler-js");
var current_generator = false;var assert = function(v,msg){
return (function() {if(not(v)) { throw(msg);}})()
}
;var assert_type = function(node,type,msg){
return assert((node.type===type),("invalid type, expected "+type+": "+inspect(node)));}
;var parsers = unquote_splice([]);var install_builtin_macros = function(){
return (function(src){
return parse(read(src),create_generator());}
)(fs.readFileSync("macros.ol","utf-8"));}
;var read = function(src){
return reader(grammar,src,ast.node(ast.ROOT));}
;var set_generator = function(gen){
return current_generator = gen;}
;var create_generator = function(){
return current_generator.create_generator();}
;var parse = function(node,generator){
return (function() {if(macro_p_(node)) { return parse(expand(node,generator),generator);} else { return (function(parser){
assert(parser,("No parser for node type:"+node.type));return parser(node,function(node){
return parse(node,generator);}
,generator);}
)(vector_ref(parsers,node.type));}})()
}
;var compile = function(src,generator){
current_generator = generator;install_builtin_macros();parse(read(src),generator);return generator.get_code();}
;var expand = function(node,generator){
return (function(name){
return (function(func){
return (function(args){
return (function(src){
return (function(res){
(function() {if(res) { return res.link = node.link;}})()
return res}
)(nodify(src));}
)(func.apply(null,args));}
)(vector_map(sourcify,node.children.slice(1)));}
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
return vector_to_list(vector_map(sourcify,node.children));}
)();} else { return (function() {if(eq_p_(node.type,ast.VECTOR)) { return (function(){
return vector_map(sourcify,node.children);}
)();} else { return (function() {if(eq_p_(node.type,ast.MAP)) { return (function(){
return hash_map_map(sourcify,hash_map.apply(null,node.children));}
)();} else { return false}})()
}})()
}})()
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
)();} else { return (function() {if(list_p_(obj)) { return (function(){
return ast.node(ast.LIST,null,vector_map(nodify,list_to_vector(obj)));}
)();} else { return (function() {if(null_p_(obj)) { return (function(){
return ast.node(ast.LIST);}
)();} else { return (function() {if(vector_p_(obj)) { return (function(){
return ast.node(ast.VECTOR,null,vector_map(nodify,obj));}
)();} else { return (function() {if(map_p_(obj)) { return (function(){
return ast.node(ast.MAP,null,hash_map_to_vec(hash_map_map(nodify,obj)));}
)();} else { return (function(){
return null}
)();}})()
}})()
}})()
}})()
}})()
}})()
}})()
}})()
}
;var define_to_lambda = function(node){
return (function(target){
return (function(args,body){
return ast.node(ast.LIST,null,vector_concat(vector(ast.node(ast.TERM,make_symbol("lambda")),ast.node(ast.LIST,null,args)),body));}
)(target.children.slice(1),node.children.slice(2));}
)(vector_ref(node.children,1));}
;var define_to_setlambda = function(node){
var target = vector_ref(node.children,1);;var name = null;var expr = null;(function() {if(eq_p_(target.type,ast.LIST)) { return (function(){
name = object_ref(vector_ref(target.children,0),"data");;return expr = define_to_lambda(node);;}
)();} else { return (function(_expr){
name = target.data;return expr = _expr;}
)(vector_ref(node.children,2));}})()
return ast.node(ast.LIST,null,vector(ast.node(ast.TERM,make_symbol("set")),ast.node(ast.TERM,name),expr));}
;var macros = hash_map();;var install_macro = function(name,func){
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
)();} else { return (function() {if(equal_p_(term,"lambda")) { return (function(){
var args = vector_ref(node.children,1);;(function() {if(eq_p_(args.type,ast.LIST)) { return vector_for_each(function(n){
return assert_type(n,ast.TERM);}
,args.children);} else { return (function() {if(not(eq_p_(args.type,ast.TERM))) { throw("lambda must have a list of arguments or a binding term");}})()
}})()
return generator.write_lambda(node,parse);}
)();} else { return (function() {if(equal_p_(term,"define")) { return (function(){
return generator.write_set(define_to_setlambda(node),parse);}
)();} else { return (function() {if(equal_p_(term,"define-macro")) { return (function(){
return parse_macro(node,generator);}
)();} else { return (function() {if((equal_p_(term,"quote")||equal_p_(term,"quasiquote"))) { return (function(){
return (function(n){
return (function(type){
return (function() {if(eq_p_(type,ast.LIST)) { return (function(){
return generator.write_list(vector_ref(node.children,1),parse,(function() {if(equal_p_(term,"quote")) { return "quote"} else { return "quasi"}})()
);}
)();} else { return (function() {if(eq_p_(type,ast.VECTOR)) { return (function(){
return generator.write_vector(vector_ref(node.children,1),parse,(function() {if(equal_p_(term,"quote")) { return "quote"} else { return "quasi"}})()
);}
)();} else { return (function() {if(eq_p_(type,ast.MAP)) { return (function(){
return generator.write_map(n,parse,(function() {if(equal_p_(term,"quote")) { return "quote"} else { return "quasi"}})()
);}
)();} else { return (function() {if(eq_p_(type,ast.TERM)) { return (function(){
return generator.write_symbol(n);}
)();} else { return (function(){
return parse(n);}
)();}})()
}})()
}})()
}})()
}
)(object_ref(n,"type"));}
)(vector_ref(node.children,1));}
)();} else { return (function() {if(equal_p_(term,"list")) { return (function(){
return generator.write_list(ast.node(ast.LIST,null,node.children.slice(1)),parse);}
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
}
);install_parser(ast.VECTOR,function(node,parse,generator){
return generator.write_vector(node,parse);}
);install_parser(ast.MAP,function(node,parse,generator){
return generator.write_map(node,parse);}
);install_parser(ast.ROOT,function(node,parse){
return vector_for_each(function(n){
return parse(n);}
,node.children);}
);module.exports = hash_map();;module.exports.read = read;module.exports.parse = parse;module.exports.compile = compile;module.exports.install_builtin_macros = install_builtin_macros;module.exports.set_generator = set_generator;module.exports.create_generator = create_generator;module.exports.nodify = nodify;module.exports.sourcify = sourcify;
