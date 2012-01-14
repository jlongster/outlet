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
var cons = runtime.cons;
var car = runtime.car;
var cdr = runtime.cdr;
var vector_ref = runtime.vector_ref;
var vector_set_excl = runtime.vector_set_excl;
var vector_concat = runtime.vector_concat;
var vector = runtime.vector;
var object = runtime.object;
var object_ref = runtime.object_ref;
var numberp = runtime.numberp;
var symbolp = runtime.symbolp;
var stringp = runtime.stringp;
var pairp = runtime.pairp;

var ast = require("./ast");
var grammar = function(all,any,capture,char,not_char,optional,Y,eof,terminator,before,after){
var repeated = function(rule){
return Y(function(seq){
return any(all(rule,seq),rule);}
);}
;var space_char = " \t\n\r";var space = repeated(char(space_char));;var comment = all(optional(space),char(";"),repeated(not_char("\n")),space);;var number = capture(all(optional(char("-")),repeated(char("1234567890"))),function(text,state){
return ast.node(ast.NUMBER,text);}
);;var string = (function(capt,capt_node,init){
var content = any(all(char("\\"),capt(not_char(""))),capt(not_char("\"")));;return init(all(char("\""),capt_node(optional(repeated(content))),char("\"")));}
)(function(rule){
return capture(rule,function(buf,state){
return (state+buf)}
);}
,function(rule){
return capture(rule,function(str,state){
return ast.node(ast.STRING,str);}
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
return ast.node(ast.LIST,null,[q,node]);}
)(ast.node(ast.TERM,make_symbol(special)));}
)((function() {if(equalp(buf.substring(0,2),",@")) { return (function(){
return "unquote-splicing"}
)();} else { return (function() {if(equalp(buf.charAt(0),",")) { return (function(){
return "unquote"}
)();} else { return (function() {if(equalp(buf.charAt(0),"'")) { return (function(){
return "quote"}
)();} else { return (function() {if(equalp(buf.charAt(0),"`")) { return (function(){
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
)(any(lst,number,string,term));}
;var lst = Y(function(lst){
return before(all(char("("),optional(repeated(any(space,comment,after(elements(lst),function(parent,child){
return ast.add_child(parent,child);}
)))),char(")")),function(state){
return ast.node(ast.LIST);}
);}
);;return repeated(any(space,comment,after(elements(lst),function(root,child){
return ast.node(ast.ROOT,null,root.children.concat([child]));}
)));}
;module.exports = grammar;
