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
return (func(text,state)||[text,state])}
}
;var eof = function(text,state){
return (function() {if(equalp(text,"")) { return [text,state]} else { return null}})()
}
;var terminator = function(text,state){
return ["",state]}
;var char = function(alphabet){
return function(text,state){
return (function() {if(((text.length>0)&&(alphabet.indexOf(text.charAt(0))>-1))) { return [text.substr(1),state]} else { return null}})()
}
}
;var not_char = function(alphabet){
return function(text,state){
return (function() {if(((text.length>0)&&eqp(alphabet.indexOf(text.charAt(0)),-1))) { return [text.substr(1),state]} else { return null}})()
}
}
;var any = function() {
var args = Array.prototype.slice.call(arguments);
return function(text,state){
var run = function(lst){
return (function() {if(nullp(lst)) { return null} else { return (function(r){
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
return (function() {if(nullp(lst)) { return r} else { return (function(r){
return (function() {if(!r) { return null} else { return run(cdr(lst),r);}})()
}
)((car(lst))(car(r),car(cdr(r))));}})()
}
;return run(args,[text,state]);}
}
;var capture = function(func,hook){
return function(text,state){
return (function(r){
return (function() {if(r) { return (function(t,s){
return [t,hook(text.substr(0,(text.length-t.length)),s)]}
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
return (function() {if(r) { return [car(r),hook(state,car(cdr(r)))]} else { return null}})()
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
