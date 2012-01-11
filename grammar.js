var runtime = require('./runtime');
var make_symbol = runtime.make_symbol;
var map = runtime.map;
var for_each = runtime.for_each;
var display = runtime.display;
var pp = runtime.pp;
var inspect = runtime.inspect;
var eqp = runtime.eqp;
var nullp = runtime.nullp;
var car = runtime.car;
var cdr = runtime.cdr;
var vector_ref = runtime.vector_ref;
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
return ast.node(ast.TERM,buf);}
);;var elements = function(lst){
var capture_quoted = function(buf,node){
return (function(q){
return ast.node(ast.LIST,null,[q,node]);}
)(ast.node(ast.TERM,"quote"));}
;return (function(rule){
return any(capture(all(char("'"),rule),capture_quoted),rule);}
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
