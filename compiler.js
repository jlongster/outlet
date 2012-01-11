var runtime = require('./runtime');
var make_symbol = runtime.make_symbol;
var map = runtime.map;
var for_each = runtime.for_each;
var display = runtime.display;
var pp = runtime.pp;
var inspect = runtime.inspect;
var eqp = runtime.eqp;
var equalp = runtime.equalp;
var nullp = runtime.nullp;
var car = runtime.car;
var cdr = runtime.cdr;
var vector_ref = runtime.vector_ref;
var vector_set_excl = runtime.vector_set_excl;
var vector_concat = runtime.vector_concat;
var vector = runtime.vector;
var object = runtime.object;
var object_ref = runtime.object_ref;
var reader = require("./parser");
var util = require("util");
var ast = require("./ast");
var grammar = require("./grammar");
var assert = function(v,msg){
return (function() {if(!v) { throw(msg);}})()
}
;var assert_type = function(node,type,msg){
return assert((node.type===type),("invalid type, expected "+type+": "+inspect(node)));}
;var parsers = [];var read = function(src){
return reader(grammar,src,ast.node(ast.ROOT));}
;var parse = function(node,generator){
return (function(parser){
assert(parser,("No parser for node type:"+node.type));return parser(node,function(node){
return parse(node,generator);}
,generator);}
)(vector_ref(parsers,node.type));}
;var compile = function(src,generator){
parse(read(src),generator);return generator.get_code();}
;var install_parser = function(type,parser){
return vector_set_excl(parsers,type,parser);}
;install_parser(ast.NUMBER,function(node,parse,generator){
return generator.write_number(node);}
);install_parser(ast.STRING,function(node,parse,generator){
return generator.write_string(node);}
);install_parser(ast.TERM,function(node,parse,generator){
return generator.write_term(node);}
);install_parser(ast.LIST,function(node,parse,generator){
var first = vector_ref(node.children,0);;assert((eqp(first.type,ast.TERM)||eqp(first.type,ast.LIST)),("operator is not a procedure: "+inspect(first)));return (function() {if(equalp(first.data,"set!")) { return (function(){
assert_type(vector_ref(node.children,1),ast.TERM);return generator.write_set_excl(node,parse);}
)();} else { return (function() {if(equalp(first.data,"let")) { return (function(){
return (function(vars,body){
assert_type(vars,ast.LIST);var vars_to_nodes = function(vars,names,exprs){
return (function() {if(nullp(vars)) { return [names,exprs]} else { return (function(_var){
assert_type(_var,ast.LIST);return (function(name,expr){
assert_type(name,ast.TERM);return vars_to_nodes(cdr(vars),names.concat([name]),exprs.concat([expr]));}
)(vector_ref(_var.children,0),vector_ref(_var.children,1));}
)(car(vars));}})()
}
;return (function(nodes){
return (function(lambda_header){
return (function(lambda_node){
return generator.write_func_call(ast.node(ast.LIST,null,vector_concat(vector(lambda_node),vector_ref(nodes,1))),parse);}
)(ast.node(ast.LIST,null,lambda_header.concat(body)));}
)([ast.node(ast.TERM,"lambda"),ast.node(ast.LIST,null,vector_ref(nodes,0))]);}
)(vars_to_nodes(vars.children,[],[]));}
)(vector_ref(node.children,1),node.children.splice(2));}
)();} else { return (function() {if(equalp(first.data,"lambda")) { return (function(){
var args = vector_ref(node.children,1);;(function() {if(eqp(args.type,ast.LIST)) { return for_each(function(n){
return assert_type(n,ast.TERM);}
,args.children);} else { return (function() {if(eqp(args.type,ast.TERM)) { throw("lambda must have a list of arguments or a binding term");}})()
}})()
return generator.write_lambda(node,parse);}
)();} else { return (function() {if(equalp(first.data,"define")) { return (function(){
var target = vector_ref(node.children,1);;var name = null;var expr = null;(function() {if(eqp(target.type,ast.LIST)) { return (function(args){
name = object_ref(vector_ref(target.children,0),"data");;return (function(body){
return expr = ast.node(ast.LIST,null,vector_concat([ast.node(ast.TERM,"lambda"),ast.node(ast.LIST,null,args)],body));;}
)(node.children.slice(2));}
)(target.children.slice(1));} else { return (function(_expr){
name = target.data;return expr = _expr;}
)(vector_ref(node.children,2));}})()
return generator.write_set(ast.node(ast.LIST,null,[ast.node(ast.TERM,"set"),ast.node(ast.TERM,name),expr]),parse);}
)();} else { return (function() {if(equalp(first.data,"quote")) { return (function(){
return generator.write_array(vector_ref(node.children,1),parse,true);}
)();} else { return (function() {if(equalp(first.data,"list")) { return (function(){
return generator.write_array(ast.node(ast.LIST,null,node.children.slice(1)),parse);}
)();} else { return (function() {if(equalp(first.data,"begin")) { return (function(){
return (function(body){
return (function(lamb){
return parse(ast.node(ast.LIST,null,[lamb]));}
)(ast.node(ast.LIST,null,vector_concat([ast.node(ast.TERM,"lambda"),ast.node(ast.LIST,null,[])],body)));}
)(node.children.slice(1));}
)();} else { return (function() {if(equalp(first.data,"cond")) { return (function(){
var transform = function(i){
return (function() {if(((i>node.children.length)||eqp(i,node.children.length))) { return null} else { return (function(n){
return (function(condition,res){
return (function() {if((eqp(condition.type,ast.TERM)&&equalp(condition.data,"else"))) { return res} else { return ast.add_child(ast.node(ast.LIST,null,[ast.node(ast.TERM,"if"),condition,res]),transform((i+1)));}})()
}
)(vector_ref(n.children,0),ast.node(ast.LIST,null,vector_concat([ast.node(ast.TERM,"begin")],n.children.slice(1))));}
)(vector_ref(node.children,i));}})()
}
;return parse(transform(1));}
)();} else { return (function() {if(generator.has_hook(first.data)) { return (function(){
return generator.run_hook(first.data,node,parse);}
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
}
);install_parser(ast.ROOT,function(node,parse){
return for_each(function(n){
return parse(n);}
,node.children);}
);module.exports = object();;module.exports.read = read;module.exports.parse = parse;module.exports.compile = compile;
