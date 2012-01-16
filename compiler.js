var util = require('util');

function make_symbol(str) {
    return {
        str: str,
        symbol: true
    };
}

function map(func, arr) {
    var r = [];
    for(var i=0; i<arr.length; i++) {
        r.push(func(arr[i]));
    }
    return r;
}

function for_each(func, arr) {
    for(var i=0; i<arr.length; i++) {
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
    return util.inspect(obj);
}

function eqp(v1, v2) {
    return v1 == v2;
}

function equalp(v1, v2) {
    return v1 == v2;
}

function nullp(arr) {
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

function vector_set_excl(arr, i, v) {
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

function numberp(obj) {
    return typeof obj == 'number';
}

function symbolp(obj) {
    return (obj.str && obj.symbol);
}

function stringp(obj) {
    return typeof obj == 'string';
}

function pairp(obj) {
    return obj.length;
}

function unquote_splice(arr) {
    var res = [];
    var i = 0;

    while(i<arr.length) {
        if(arr[i].please_splice) {
            res = res.concat(unquote_splice(arr[i].data));
        }
        else {
            res.push(arr[i]);
        }

        i++;
    }

    return res;
}

module.exports = {
    make_symbol: make_symbol,
    map: map,
    for_each: for_each,
    display: display,
    pp: pp,
    inspect: inspect,
    eqp: eqp,
    equalp: equalp,
    nullp: nullp,
    cons: cons,
    car: car,
    cdr: cdr,
    vector_ref: vector_ref,
    vector_set_excl: vector_set_excl,
    vector_concat: vector_concat,
    vector: vector,
    object: object,
    object_ref: object_ref,
    numberp: numberp,
    symbolp: symbolp,
    stringp: stringp,
    pairp: pairp,
    unquote_splice: unquote_splice
};

var reader = require("./parser");
var util = require("util");
var ast = require("./ast");
var grammar = require("./grammar");
var js = require("./compiler-js");
var current_generator = false;var assert = function(v,msg){
return (function() {if(!v) { throw(msg);}})()
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
(function() {if(!current_generator) { return current_generator = generator;}})()
return (function() {if(macrop(node)) { return parse(expand(node,generator),generator);} else { return (function(parser){
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
return (function(res){
(function() {if(res) { return res.link = node.link;}})()
return res}
)(nodify(func.apply(null,map(sourcify,node.children.slice(1)))));}
)(get_macro(name.data.str));}
)(vector_ref(node.children,0));}
;var sourcify = function(node){
return (function() {if(eqp(node.type,ast.NUMBER)) { return (function(){
return parseInt(node.data);}
)();} else { return (function() {if(eqp(node.type,ast.TERM)) { return (function(){
return node.data}
)();} else { return (function() {if(eqp(node.type,ast.STRING)) { return (function(){
return node.data}
)();} else { return (function() {if(eqp(node.type,ast.LIST)) { return (function(){
return map(sourcify,node.children);}
)();}})()
}})()
}})()
}})()
}
;var nodify = function(obj){
return (function() {if(!obj) { return null} else { return (function() {if(numberp(obj)) { return (function(){
return ast.node(ast.NUMBER,obj);}
)();} else { return (function() {if(symbolp(obj)) { return (function(){
return ast.node(ast.TERM,obj);}
)();} else { return (function() {if(stringp(obj)) { return (function(){
return ast.node(ast.STRING,obj);}
)();} else { return (function() {if(pairp(obj)) { return (function(){
return ast.node(ast.LIST,null,map(nodify,obj));}
)();} else { return (function() {if(nullp(obj)) { return (function(){
return ast.node(ast.LIST);}
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
var target = vector_ref(node.children,1);;var name = null;var expr = null;(function() {if(eqp(target.type,ast.LIST)) { return (function(){
name = object_ref(vector_ref(target.children,0),"data");;return expr = define_to_lambda(node);;}
)();} else { return (function(_expr){
name = target.data;return expr = _expr;}
)(vector_ref(node.children,2));}})()
return ast.node(ast.LIST,null,unquote_splice([ast.node(ast.TERM,make_symbol("set")),ast.node(ast.TERM,name),expr]));}
;var macros = object();;var install_macro = function(name,func){
return vector_set_excl(macros,name,func);}
;var get_macro = function(name){
return vector_ref(macros,name);}
;var macrop = function(node){
return (function() {if(eqp(node.type,ast.LIST)) { return (function(name){
return (function() {if(eqp(name.type,ast.TERM)) { return object_ref(macros,name.data.str);}})()
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
return vector_set_excl(parsers,type,parser);}
;install_parser(ast.NUMBER,function(node,parse,generator){
return generator.write_number(node);}
);install_parser(ast.STRING,function(node,parse,generator){
return generator.write_string(node);}
);install_parser(ast.TERM,function(node,parse,generator){
return generator.write_term(node);}
);install_parser(ast.LIST,function(node,parse,generator){
var first = vector_ref(node.children,0);;assert((eqp(first.type,ast.TERM)||eqp(first.type,ast.LIST)),("operator is not a procedure: "+inspect(first)));var term = (first.data&&first.data.str);return (function() {if(equalp(term,"set!")) { return (function(){
assert_type(vector_ref(node.children,1),ast.TERM);return generator.write_set_excl(node,parse);}
)();} else { return (function() {if(equalp(term,"let")) { return (function(){
return (function(vars,body){
assert_type(vars,ast.LIST);var vars_to_nodes = function(vars,names,exprs){
return (function() {if(nullp(vars)) { return unquote_splice([names,exprs])} else { return (function(_var){
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
)();} else { return (function() {if(equalp(term,"lambda")) { return (function(){
var args = vector_ref(node.children,1);;(function() {if(eqp(args.type,ast.LIST)) { return for_each(function(n){
return assert_type(n,ast.TERM);}
,args.children);} else { return (function() {if(!eqp(args.type,ast.TERM)) { throw("lambda must have a list of arguments or a binding term");}})()
}})()
return generator.write_lambda(node,parse);}
)();} else { return (function() {if(equalp(term,"define")) { return (function(){
return generator.write_set(define_to_setlambda(node),parse);}
)();} else { return (function() {if(equalp(term,"define-macro")) { return (function(){
return parse_macro(node,generator);}
)();} else { return (function() {if(equalp(term,"quote")) { return (function(){
return generator.write_array(vector_ref(node.children,1),parse,"quote");}
)();} else { return (function() {if(equalp(term,"quasiquote")) { return (function(){
return generator.write_array(vector_ref(node.children,1),parse,"quasi");}
)();} else { return (function() {if(equalp(term,"list")) { return (function(){
return generator.write_array(ast.node(ast.LIST,null,node.children.slice(1)),parse);}
)();} else { return (function() {if(equalp(term,"cond")) { return (function(){
var transform = function(i){
return (function() {if(((i>node.children.length)||eqp(i,node.children.length))) { return null} else { return (function(n){
return (function(condition,res){
return (function() {if((eqp(condition.type,ast.TERM)&&equalp(condition.data.str,"else"))) { return res} else { return ast.add_child(ast.node(ast.LIST,null,unquote_splice([ast.node(ast.TERM,make_symbol("if")),condition,res])),transform((i+1)));}})()
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
return unquote_splice([make_symbol("let"),unquote_splice([unquote_splice([make_symbol("gen"),unquote_splice([make_symbol("create_generator")])])]),unquote_splice([make_symbol("parse"),unquote_splice([make_symbol("nodify"),form]),make_symbol("gen")]),unquote_splice([make_symbol("eval"),unquote_splice([make_symbol("gen.get-code")])])])}
);module.exports = object();;module.exports.read = read;module.exports.parse = parse;module.exports.compile = compile;module.exports.set_generator = set_generator;module.exports.create_generator = create_generator;module.exports.nodify = nodify;
