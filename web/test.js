var Y = function(gen){
return (function(f){
return f(f);}
)(function(f){
return gen(function() {
var args = Array.slice.call(null, arguments);
return (function(ff){
return ff.apply(null,args);}
)(f(f));}
);}
);}
;var a = Y(function(f){
return function(i){
return (function() {if((i<10)) { return (function(x){
console.log(i);return f((i+1));}
)(0);}})()
}
}
);;
