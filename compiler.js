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
