var util = require("util");var type = (function(obj){
if(arguments.length < 1) {
throw Error("type: not enough arguments")
}
else if(arguments.length > 1) {
throw Error("type: too many arguments");
}
return (function() {if(number_p_(obj)) {return ((function() {return "\uFDD1number"; // Line <unknown undefined> Column <unknown undefined>
}))(); // Line 6 Column 2
} else {return (function() {if(boolean_p_(obj)) {return ((function() {return "\uFDD1boolean"; // Line <unknown undefined> Column <unknown undefined>
}))(); // Line 6 Column 2
} else {return (function() {if(string_p_(obj)) {return ((function() {return "\uFDD1string"; // Line <unknown undefined> Column <unknown undefined>
}))(); // Line 6 Column 2
} else {return (function() {if(null_p_(obj)) {return ((function() {return "\uFDD1null"; // Line <unknown undefined> Column <unknown undefined>
}))(); // Line 6 Column 2
} else {return (function() {if(list_p_(obj)) {return ((function() {return "\uFDD1list"; // Line <unknown undefined> Column <unknown undefined>
}))(); // Line 6 Column 2
} else {return (function() {if(vector_p_(obj)) {return ((function() {return "\uFDD1vector"; // Line <unknown undefined> Column <unknown undefined>
}))(); // Line 6 Column 2
} else {return (function() {if(dict_p_(obj)) {return ((function() {return "\uFDD1dict"; // Line <unknown undefined> Column <unknown undefined>
}))(); // Line 6 Column 2
} else {return false; // Line <unknown undefined> Column <unknown undefined>
}})()
; // Line <unknown undefined> Column <unknown undefined>
}})()
; // Line <unknown undefined> Column <unknown undefined>
}})()
; // Line <unknown undefined> Column <unknown undefined>
}})()
; // Line <unknown undefined> Column <unknown undefined>
}})()
; // Line <unknown undefined> Column <unknown undefined>
}})()
; // Line <unknown undefined> Column <unknown undefined>
}})()
; // Line <unknown undefined> Column <unknown undefined>
});
var number_p_ = (function(obj){
if(arguments.length < 1) {
throw Error("number?: not enough arguments")
}
else if(arguments.length > 1) {
throw Error("number?: too many arguments");
}
return _eq__eq_(typeof obj,"number"); // Line 16 Column 3
});
var string_p_ = (function(obj){
if(arguments.length < 1) {
throw Error("string?: not enough arguments")
}
else if(arguments.length > 1) {
throw Error("string?: too many arguments");
}
return (_eq__eq_(typeof obj,"string") && not(_eq__eq_(obj[0],"\uFDD0")) && not(_eq__eq_(obj[0],"\uFDD1"))); // Line <unknown undefined> Column <unknown undefined>
});
var symbol_p_ = (function(obj){
if(arguments.length < 1) {
throw Error("symbol?: not enough arguments")
}
else if(arguments.length > 1) {
throw Error("symbol?: too many arguments");
}
return ((_eq__eq_(typeof obj,"string") && _eq__eq_(obj[0],"\uFDD1"))); // Line <unknown undefined> Column <unknown undefined>
});
var key_p_ = (function(obj){
if(arguments.length < 1) {
throw Error("key?: not enough arguments")
}
else if(arguments.length > 1) {
throw Error("key?: too many arguments");
}
return (_eq__eq_(typeof obj,"string") && _eq__eq_(obj[0],"\uFDD0")); // Line <unknown undefined> Column <unknown undefined>
});
var boolean_p_ = (function(obj){
if(arguments.length < 1) {
throw Error("boolean?: not enough arguments")
}
else if(arguments.length > 1) {
throw Error("boolean?: too many arguments");
}
return (eq_p_(obj,true) || eq_p_(obj,false)); // Line <unknown undefined> Column <unknown undefined>
});
var null_p_ = (function(obj){
if(arguments.length < 1) {
throw Error("null?: not enough arguments")
}
else if(arguments.length > 1) {
throw Error("null?: too many arguments");
}
return (!!obj && not(eq_p_(obj["length"],undefined)) && eq_p_(obj["length"],1) && eq_p_(vector_dash_ref(obj,0),null)); // Line <unknown undefined> Column <unknown undefined>
});
var list_p_ = (function(obj){
if(arguments.length < 1) {
throw Error("list?: not enough arguments")
}
else if(arguments.length > 1) {
throw Error("list?: too many arguments");
}
return (!!obj && not(eq_p_(obj["length"],undefined)) && not(eq_p_(obj["list"],undefined))); // Line <unknown undefined> Column <unknown undefined>
});
var vector_p_ = (function(obj){
if(arguments.length < 1) {
throw Error("vector?: not enough arguments")
}
else if(arguments.length > 1) {
throw Error("vector?: too many arguments");
}
return (not(list_p_(obj)) && not(null_p_(obj)) && !!obj && eq_p_(typeof obj,"object") && not(eq_p_(obj["length"],undefined))); // Line <unknown undefined> Column <unknown undefined>
});
var dict_p_ = (function(obj){
if(arguments.length < 1) {
throw Error("dict?: not enough arguments")
}
else if(arguments.length > 1) {
throw Error("dict?: too many arguments");
}
return (not(symbol_p_(obj)) && !!obj && eq_p_(typeof obj,"object") && eq_p_(obj["length"],undefined)); // Line <unknown undefined> Column <unknown undefined>
});
var function_p_ = (function(obj){
if(arguments.length < 1) {
throw Error("function?: not enough arguments")
}
else if(arguments.length > 1) {
throw Error("function?: too many arguments");
}
return eq_p_(typeof obj,"function"); // Line 60 Column 3
});
var literal_p_ = (function(x){
if(arguments.length < 1) {
throw Error("literal?: not enough arguments")
}
else if(arguments.length > 1) {
throw Error("literal?: too many arguments");
}
return (key_p_(x) || number_p_(x) || string_p_(x) || boolean_p_(x) || null_p_(x)); // Line <unknown undefined> Column <unknown undefined>
});
var str = (function() {
var args = vector_dash__gt_list(Array.prototype.slice.call(arguments));
return fold((function(el,acc){
if(arguments.length < 2) {
throw Error("lambda: not enough arguments")
}
else if(arguments.length > 2) {
throw Error("lambda: too many arguments");
}
return (acc + (function() {if(string_p_(el)) {return el; // Line <unknown undefined> Column <unknown undefined>
} else {return inspect(el); // Line 75 Column 36
}})()
); // Line <unknown undefined> Column <unknown undefined>
}),"",args); // Line 73 Column 5
});
var symbol_dash__gt_key = (function(sym){
if(arguments.length < 1) {
throw Error("symbol->key: not enough arguments")
}
else if(arguments.length > 1) {
throw Error("symbol->key: too many arguments");
}
return ("\uFDD0" + sym["substring"](1)); // Line <unknown undefined> Column <unknown undefined>
});
var key_dash__gt_symbol = (function(sym){
if(arguments.length < 1) {
throw Error("key->symbol: not enough arguments")
}
else if(arguments.length > 1) {
throw Error("key->symbol: too many arguments");
}
return ("\uFDD1" + sym["substring"](1)); // Line <unknown undefined> Column <unknown undefined>
});
var string_dash__gt_key = (function(str){
if(arguments.length < 1) {
throw Error("string->key: not enough arguments")
}
else if(arguments.length > 1) {
throw Error("string->key: too many arguments");
}
return ("\uFDD0" + str); // Line <unknown undefined> Column <unknown undefined>
});
var key_dash__gt_string = (function(key){
if(arguments.length < 1) {
throw Error("key->string: not enough arguments")
}
else if(arguments.length > 1) {
throw Error("key->string: too many arguments");
}
return key["substring"](1); // Line 89 Column 3
});
var string_dash__gt_symbol = (function(str){
if(arguments.length < 1) {
throw Error("string->symbol: not enough arguments")
}
else if(arguments.length > 1) {
throw Error("string->symbol: too many arguments");
}
return ("\uFDD1" + str); // Line <unknown undefined> Column <unknown undefined>
});
var symbol_dash__gt_string = (function(sym){
if(arguments.length < 1) {
throw Error("symbol->string: not enough arguments")
}
else if(arguments.length > 1) {
throw Error("symbol->string: too many arguments");
}
return sym["substring"](1); // Line 95 Column 3
});
var _emptylst = [null];
var list = (function() {
var args = vector_dash__gt_list(Array.prototype.slice.call(arguments));
return args; // Line <unknown undefined> Column <unknown undefined>
});
var cons = (function(obj,lst){
if(arguments.length < 2) {
throw Error("cons: not enough arguments")
}
else if(arguments.length > 2) {
throw Error("cons: too many arguments");
}
return ((function() {var o8634010 = (function(res){
if(arguments.length < 1) {
throw Error("o8634010: not enough arguments")
}
else if(arguments.length > 1) {
throw Error("o8634010: too many arguments");
}
res.list = true;return res; // Line <unknown undefined> Column <unknown undefined>
});
var o4185710 = [obj, lst];
return o8634010(o4185710); // Line 106 Column 2
}))(); // Line 106 Column 2
});
var car = (function(lst){
if(arguments.length < 1) {
throw Error("car: not enough arguments")
}
else if(arguments.length > 1) {
throw Error("car: too many arguments");
}
return lst[0]});
var cdr = (function(lst){
if(arguments.length < 1) {
throw Error("cdr: not enough arguments")
}
else if(arguments.length > 1) {
throw Error("cdr: too many arguments");
}
return lst[1]});
var cadr = (function(lst){
if(arguments.length < 1) {
throw Error("cadr: not enough arguments")
}
else if(arguments.length > 1) {
throw Error("cadr: too many arguments");
}
return car(cdr(lst)); // Line 116 Column 20
});
var cddr = (function(lst){
if(arguments.length < 1) {
throw Error("cddr: not enough arguments")
}
else if(arguments.length > 1) {
throw Error("cddr: too many arguments");
}
return cdr(cdr(lst)); // Line 117 Column 20
});
var cdar = (function(lst){
if(arguments.length < 1) {
throw Error("cdar: not enough arguments")
}
else if(arguments.length > 1) {
throw Error("cdar: too many arguments");
}
return cdr(car(lst)); // Line 118 Column 20
});
var caddr = (function(lst){
if(arguments.length < 1) {
throw Error("caddr: not enough arguments")
}
else if(arguments.length > 1) {
throw Error("caddr: too many arguments");
}
return car(cdr(cdr(lst))); // Line 119 Column 21
});
var cdddr = (function(lst){
if(arguments.length < 1) {
throw Error("cdddr: not enough arguments")
}
else if(arguments.length > 1) {
throw Error("cdddr: too many arguments");
}
return cdr(cdr(cdr(lst))); // Line 120 Column 21
});
var cadar = (function(lst){
if(arguments.length < 1) {
throw Error("cadar: not enough arguments")
}
else if(arguments.length > 1) {
throw Error("cadar: too many arguments");
}
return car(cdr(car(lst))); // Line 121 Column 21
});
var cddar = (function(lst){
if(arguments.length < 1) {
throw Error("cddar: not enough arguments")
}
else if(arguments.length > 1) {
throw Error("cddar: too many arguments");
}
return cdr(cdr(car(lst))); // Line 122 Column 21
});
var caadr = (function(lst){
if(arguments.length < 1) {
throw Error("caadr: not enough arguments")
}
else if(arguments.length > 1) {
throw Error("caadr: too many arguments");
}
return car(car(cdr(lst))); // Line 123 Column 21
});
var cdadr = (function(lst){
if(arguments.length < 1) {
throw Error("cdadr: not enough arguments")
}
else if(arguments.length > 1) {
throw Error("cdadr: too many arguments");
}
return cdr(car(cdr(lst))); // Line 124 Column 21
});
var list_dash_ref = (function(lst,i){
if(arguments.length < 2) {
throw Error("list-ref: not enough arguments")
}
else if(arguments.length > 2) {
throw Error("list-ref: too many arguments");
}
return ((function() {var loop = (function(lst,i){
if(arguments.length < 2) {
throw Error("loop: not enough arguments")
}
else if(arguments.length > 2) {
throw Error("loop: too many arguments");
}
return (function() {if(null_p_(lst)) {return ((function() {return false; // Line <unknown undefined> Column <unknown undefined>
}))(); // Line 127 Column 2
} else {return (function() {if(eq_p_(i,0)) {return ((function() {return car(lst); // Line 127 Column 2
}))(); // Line 127 Column 2
} else {return ((function() {return loop(cdr(lst),(i - 1)); // Line 127 Column 2
}))(); // Line 127 Column 2
}})()
; // Line <unknown undefined> Column <unknown undefined>
}})()
; // Line <unknown undefined> Column <unknown undefined>
});
var o8501755 = lst;
var o5255882 = i;
return loop(o8501755,o5255882); // Line 127 Column 2
}))(); // Line 127 Column 2
});
var length = (function(lst){
if(arguments.length < 1) {
throw Error("length: not enough arguments")
}
else if(arguments.length > 1) {
throw Error("length: too many arguments");
}
return fold((function(el,acc){
if(arguments.length < 2) {
throw Error("lambda: not enough arguments")
}
else if(arguments.length > 2) {
throw Error("lambda: too many arguments");
}
return (acc + 1); // Line <unknown undefined> Column <unknown undefined>
}),0,lst); // Line 135 Column 3
});
var list_dash_append = (function(){
if(arguments.length < 0) {
throw Error("list-append: not enough arguments")
}
var lsts = vector_dash__gt_list(Array.prototype.slice.call(arguments, 0));
var l_star_ = (function() {if(null_p_(lsts)) {return _emptylst; // Line <unknown undefined> Column <unknown undefined>
} else {return lsts; // Line <unknown undefined> Column <unknown undefined>
}})()
;
return (function() {if(null_p_(l_star_)) {return _emptylst; // Line <unknown undefined> Column <unknown undefined>
} else {return (function() {if(null_p_(cdr(l_star_))) {return car(l_star_); // Line 144 Column 11
} else {return _list_dash_append(car(l_star_),apply(list_dash_append,cdr(l_star_))); // Line 145 Column 11
}})()
; // Line <unknown undefined> Column <unknown undefined>
}})()
; // Line <unknown undefined> Column <unknown undefined>
});
var _list_dash_append = (function(lst1,lst2){
if(arguments.length < 2) {
throw Error("_list-append: not enough arguments")
}
else if(arguments.length > 2) {
throw Error("_list-append: too many arguments");
}
return ((function() {var loop = (function(lst){
if(arguments.length < 1) {
throw Error("loop: not enough arguments")
}
else if(arguments.length > 1) {
throw Error("loop: too many arguments");
}
return (function() {if(null_p_(lst)) {return lst2; // Line <unknown undefined> Column <unknown undefined>
} else {return cons(car(lst),loop(cdr(lst))); // Line 149 Column 2
}})()
; // Line <unknown undefined> Column <unknown undefined>
});
var o5458424 = lst1;
return loop(o5458424); // Line 149 Column 2
}))(); // Line 149 Column 2
});
var list_dash_find = (function(lst,val){
if(arguments.length < 2) {
throw Error("list-find: not enough arguments")
}
var rst = vector_dash__gt_list(Array.prototype.slice.call(arguments, 2));
return ((function() {var o3848969 = (function(access){
if(arguments.length < 1) {
throw Error("o3848969: not enough arguments")
}
else if(arguments.length > 1) {
throw Error("o3848969: too many arguments");
}
return ((function() {var loop = (function(lst){
if(arguments.length < 1) {
throw Error("loop: not enough arguments")
}
else if(arguments.length > 1) {
throw Error("loop: too many arguments");
}
return (function() {if(null_p_(lst)) {return false; // Line <unknown undefined> Column <unknown undefined>
} else {return (function() {if(_eq__eq_(access(car(lst)),val)) {return lst; // Line <unknown undefined> Column <unknown undefined>
} else {return vector("__tco_call",(function() {return loop(cdr(lst)); // Line 156 Column 2
})); // Line 156 Column 2
}})()
; // Line <unknown undefined> Column <unknown undefined>
}})()
; // Line <unknown undefined> Column <unknown undefined>
});
var o1434060 = lst;
return trampoline(loop(o1434060)); // Line 156 Column 2
}))(); // Line 156 Column 2
});
var o4671376 = (function() {if(null_p_(rst)) {return (function(x){
if(arguments.length < 1) {
throw Error("lambda: not enough arguments")
}
else if(arguments.length > 1) {
throw Error("lambda: too many arguments");
}
return x; // Line <unknown undefined> Column <unknown undefined>
}); // Line <unknown undefined> Column <unknown undefined>
} else {return car(rst); // Line 156 Column 2
}})()
;
return o3848969(o4671376); // Line 156 Column 2
}))(); // Line 156 Column 2
});
var map = (function(func,lst){
if(arguments.length < 2) {
throw Error("map: not enough arguments")
}
else if(arguments.length > 2) {
throw Error("map: too many arguments");
}
return (function() {if(null_p_(lst)) {return _emptylst; // Line <unknown undefined> Column <unknown undefined>
} else {return cons(func(car(lst)),map(func,cdr(lst))); // Line 167 Column 7
}})()
; // Line <unknown undefined> Column <unknown undefined>
});
var for_dash_each = (function(func,lst){
if(arguments.length < 2) {
throw Error("for-each: not enough arguments")
}
else if(arguments.length > 2) {
throw Error("for-each: too many arguments");
}
return ((function() {var loop = (function(lst){
if(arguments.length < 1) {
throw Error("loop: not enough arguments")
}
else if(arguments.length > 1) {
throw Error("loop: too many arguments");
}
return (function() {if(not(null_p_(lst))) {return ((function() {func(car(lst)); // Line 171 Column 2
return vector("__tco_call",(function() {return loop(cdr(lst)); // Line 171 Column 2
})); // Line 171 Column 2
}))(); // Line 171 Column 2
}})()
; // Line <unknown undefined> Column <unknown undefined>
});
var o9591666 = lst;
return trampoline(loop(o9591666)); // Line 171 Column 2
}))(); // Line 171 Column 2
});
var fold = (function(func,acc,lst){
if(arguments.length < 3) {
throw Error("fold: not enough arguments")
}
else if(arguments.length > 3) {
throw Error("fold: too many arguments");
}
return (function() {if(null_p_(lst)) {return acc; // Line <unknown undefined> Column <unknown undefined>
} else {return fold(func,func(car(lst),acc),cdr(lst)); // Line 180 Column 7
}})()
; // Line <unknown undefined> Column <unknown undefined>
});
var reverse = (function(lst){
if(arguments.length < 1) {
throw Error("reverse: not enough arguments")
}
else if(arguments.length > 1) {
throw Error("reverse: too many arguments");
}
return (function() {if(null_p_(lst)) {return _emptylst; // Line <unknown undefined> Column <unknown undefined>
} else {return list_dash_append(reverse(cdr(lst)),list(car(lst))); // Line 187 Column 7
}})()
; // Line <unknown undefined> Column <unknown undefined>
});
var vector_dash__gt_list = (function(vec){
if(arguments.length < 1) {
throw Error("vector->list: not enough arguments")
}
else if(arguments.length > 1) {
throw Error("vector->list: too many arguments");
}
return ((function() {var loop = (function(i){
if(arguments.length < 1) {
throw Error("loop: not enough arguments")
}
else if(arguments.length > 1) {
throw Error("loop: too many arguments");
}
return (function() {if((i < vec.length)) {return cons(vector_dash_ref(vec,i),loop((i + 1))); // Line 193 Column 2
} else {return _emptylst}})()
; // Line <unknown undefined> Column <unknown undefined>
});
var o9482611 = 0;
return loop(o9482611); // Line 193 Column 2
}))(); // Line 193 Column 2
});
var make_dash_vector = (function(count){
if(arguments.length < 1) {
throw Error("make-vector: not enough arguments")
}
else if(arguments.length > 2) {
throw Error("make-vector: too many arguments");
}
var val = arguments[1] || false;
return ((function() {var o2590411 = (function(v){
if(arguments.length < 1) {
throw Error("o2590411: not enough arguments")
}
else if(arguments.length > 1) {
throw Error("o2590411: too many arguments");
}
return (function() {if(val) {return ((function() {var loop = (function(i){
if(arguments.length < 1) {
throw Error("loop: not enough arguments")
}
else if(arguments.length > 1) {
throw Error("loop: too many arguments");
}
return (function() {if((i < count)) {return ((function() {vector_dash_put_excl_(v,i,val); // Line 202 Column 2
return vector("__tco_call",(function() {return loop((i + 1)); // Line 202 Column 2
})); // Line 202 Column 2
}))(); // Line 202 Column 2
} else {return v; // Line <unknown undefined> Column <unknown undefined>
}})()
; // Line <unknown undefined> Column <unknown undefined>
});
var o7588124 = 0;
return trampoline(loop(o7588124)); // Line 202 Column 2
}))(); // Line 202 Column 2
} else {return v; // Line <unknown undefined> Column <unknown undefined>
}})()
; // Line <unknown undefined> Column <unknown undefined>
});
var o2128333 = new Array(count);
return o2590411(o2128333); // Line 202 Column 2
}))(); // Line 202 Column 2
});
var vector = (function() {return Array.prototype.slice.call(arguments)});
var vector_dash_ref = (function(vec,i){
if(arguments.length < 2) {
throw Error("vector-ref: not enough arguments")
}
else if(arguments.length > 2) {
throw Error("vector-ref: too many arguments");
}
return vec[i]});
var vector_dash_put_excl_ = (function(vec,i,obj){
if(arguments.length < 3) {
throw Error("vector-put!: not enough arguments")
}
else if(arguments.length > 3) {
throw Error("vector-put!: too many arguments");
}
return vec[i] = obj});
var vector_dash_concat = (function(){
if(arguments.length < 0) {
throw Error("vector-concat: not enough arguments")
}
var vecs = vector_dash__gt_list(Array.prototype.slice.call(arguments, 0));
return ((function() {var loop = (function(lst,res){
if(arguments.length < 2) {
throw Error("loop: not enough arguments")
}
else if(arguments.length > 2) {
throw Error("loop: too many arguments");
}
return (function() {if(null_p_(lst)) {return res; // Line <unknown undefined> Column <unknown undefined>
} else {return vector("__tco_call",(function() {return loop(cdr(lst),res["concat"](car(lst))); // Line 222 Column 2
})); // Line 222 Column 2
}})()
; // Line <unknown undefined> Column <unknown undefined>
});
var o3830985 = cdr(vecs);
var o2767814 = car(vecs);
return trampoline(loop(o3830985,o2767814)); // Line 222 Column 2
}))(); // Line 222 Column 2
});
var vector_dash_slice = (function(vec,start){
if(arguments.length < 2) {
throw Error("vector-slice: not enough arguments")
}
else if(arguments.length > 3) {
throw Error("vector-slice: too many arguments");
}
var end = arguments[2] || false;
return vec.slice(start, end || undefined)});
var vector_dash_push_excl_ = (function(vec,obj){
if(arguments.length < 2) {
throw Error("vector-push!: not enough arguments")
}
else if(arguments.length > 2) {
throw Error("vector-push!: too many arguments");
}
return vec.push(obj)});
var vector_dash_find = (function(vec,val){
if(arguments.length < 2) {
throw Error("vector-find: not enough arguments")
}
else if(arguments.length > 2) {
throw Error("vector-find: too many arguments");
}
return ((function() {var loop = (function(i){
if(arguments.length < 1) {
throw Error("loop: not enough arguments")
}
else if(arguments.length > 1) {
throw Error("loop: too many arguments");
}
return (function() {if((i < vec.length)) {return (function() {if(eq_p_(vector_dash_ref(vec,i),val)) {return i; // Line <unknown undefined> Column <unknown undefined>
} else {return vector("__tco_call",(function() {return loop((i + 1)); // Line 236 Column 2
})); // Line 236 Column 2
}})()
; // Line <unknown undefined> Column <unknown undefined>
} else {return false; // Line <unknown undefined> Column <unknown undefined>
}})()
; // Line <unknown undefined> Column <unknown undefined>
});
var o5365054 = 0;
return trampoline(loop(o5365054)); // Line 236 Column 2
}))(); // Line 236 Column 2
});
var vector_dash_length = (function(vec){
if(arguments.length < 1) {
throw Error("vector-length: not enough arguments")
}
else if(arguments.length > 1) {
throw Error("vector-length: too many arguments");
}
return vec["length"]; // Line <unknown undefined> Column <unknown undefined>
});
var list_dash__gt_vector = (function(lst){
if(arguments.length < 1) {
throw Error("list->vector: not enough arguments")
}
else if(arguments.length > 1) {
throw Error("list->vector: too many arguments");
}
var res = [];
for_dash_each((function(el){
if(arguments.length < 1) {
throw Error("lambda: not enough arguments")
}
else if(arguments.length > 1) {
throw Error("lambda: too many arguments");
}
return res["push"](el); // Line 248 Column 15
}),lst); // Line 247 Column 3
return res; // Line <unknown undefined> Column <unknown undefined>
});
var vector_dash_map = (function(func,vec){
if(arguments.length < 2) {
throw Error("vector-map: not enough arguments")
}
else if(arguments.length > 2) {
throw Error("vector-map: too many arguments");
}
var res = [];
((function() {var loop = (function(i){
if(arguments.length < 1) {
throw Error("loop: not enough arguments")
}
else if(arguments.length > 1) {
throw Error("loop: too many arguments");
}
return (function() {if((i < vec["length"])) {return ((function() {res["push"](func(vector_dash_ref(vec,i))); // Line 254 Column 2
return vector("__tco_call",(function() {return loop((i + 1)); // Line 254 Column 2
})); // Line 254 Column 2
}))(); // Line 254 Column 2
}})()
; // Line <unknown undefined> Column <unknown undefined>
});
var o7450151 = 0;
return trampoline(loop(o7450151)); // Line 254 Column 2
}))(); // Line 254 Column 2
return res; // Line <unknown undefined> Column <unknown undefined>
});
var vector_dash_for_dash_each = (function(func,vec){
if(arguments.length < 2) {
throw Error("vector-for-each: not enough arguments")
}
else if(arguments.length > 2) {
throw Error("vector-for-each: too many arguments");
}
return ((function() {var loop = (function(i){
if(arguments.length < 1) {
throw Error("loop: not enough arguments")
}
else if(arguments.length > 1) {
throw Error("loop: too many arguments");
}
return (function() {if((i < vec["length"])) {return ((function() {func(vector_dash_ref(vec,i)); // Line 262 Column 2
return vector("__tco_call",(function() {return loop((i + 1)); // Line 262 Column 2
})); // Line 262 Column 2
}))(); // Line 262 Column 2
}})()
; // Line <unknown undefined> Column <unknown undefined>
});
var o7362510 = 0;
return trampoline(loop(o7362510)); // Line 262 Column 2
}))(); // Line 262 Column 2
});
var vector_dash_fold = (function(func,acc,vec){
if(arguments.length < 3) {
throw Error("vector-fold: not enough arguments")
}
else if(arguments.length > 3) {
throw Error("vector-fold: too many arguments");
}
return ((function() {var loop = (function(i,acc){
if(arguments.length < 2) {
throw Error("loop: not enough arguments")
}
else if(arguments.length > 2) {
throw Error("loop: too many arguments");
}
return (function() {if((i < vector_dash_length(vec))) {return vector("__tco_call",(function() {return loop((i + 1),func(vector_dash_ref(vec,i),acc)); // Line 269 Column 2
})); // Line 269 Column 2
} else {return acc; // Line <unknown undefined> Column <unknown undefined>
}})()
; // Line <unknown undefined> Column <unknown undefined>
});
var o8888976 = 0;
var o1297207 = acc;
return trampoline(loop(o8888976,o1297207)); // Line 269 Column 2
}))(); // Line 269 Column 2
});
var dict = (function() {
var args = vector_dash__gt_list(Array.prototype.slice.call(arguments));
var res = {};
((function() {var loop = (function(lst){
if(arguments.length < 1) {
throw Error("loop: not enough arguments")
}
else if(arguments.length > 1) {
throw Error("loop: too many arguments");
}
return (function() {if(not(null_p_(lst))) {return ((function() {var o6552772 = (function(key,val){
if(arguments.length < 2) {
throw Error("o6552772: not enough arguments")
}
else if(arguments.length > 2) {
throw Error("o6552772: too many arguments");
}
dict_dash_put_excl_(res,key,val); // Line 281 Column 4
return vector("__tco_call",(function() {return loop(cddr(lst)); // Line 281 Column 4
})); // Line 281 Column 4
});
var o1448147 = car(lst);
var o119873 = cadr(lst);
return o6552772(o1448147,o119873); // Line 281 Column 4
}))(); // Line 281 Column 4
}})()
; // Line <unknown undefined> Column <unknown undefined>
});
var o9020810 = args;
return trampoline(loop(o9020810)); // Line 281 Column 4
}))(); // Line 281 Column 4
return res; // Line <unknown undefined> Column <unknown undefined>
});
var dict_dash_put_excl_ = (function(dct,k,v){
if(arguments.length < 3) {
throw Error("dict-put!: not enough arguments")
}
else if(arguments.length > 3) {
throw Error("dict-put!: too many arguments");
}
return dct[k.substring(1)] = v});
var dict_dash_ref = (function(dct,k){
if(arguments.length < 2) {
throw Error("dict-ref: not enough arguments")
}
else if(arguments.length > 2) {
throw Error("dict-ref: too many arguments");
}
return dct[k.substring(1)]});
var dict_dash_map = (function(func,dct){
if(arguments.length < 2) {
throw Error("dict-map: not enough arguments")
}
else if(arguments.length > 2) {
throw Error("dict-map: too many arguments");
}
var res = dict();
((function() {var loop = (function(lst){
if(arguments.length < 1) {
throw Error("loop: not enough arguments")
}
else if(arguments.length > 1) {
throw Error("loop: too many arguments");
}
return (function() {if(not(null_p_(lst))) {return ((function() {var o2697718 = (function(k){
if(arguments.length < 1) {
throw Error("o2697718: not enough arguments")
}
else if(arguments.length > 1) {
throw Error("o2697718: too many arguments");
}
dict_dash_put_excl_(res,k,func(dict_dash_ref(dct,k))); // Line 297 Column 2
return vector("__tco_call",(function() {return loop(cdr(lst)); // Line 297 Column 2
})); // Line 297 Column 2
});
var o879719 = car(lst);
return o2697718(o879719); // Line 297 Column 2
}))(); // Line 297 Column 2
}})()
; // Line <unknown undefined> Column <unknown undefined>
});
var o2897896 = keys(dct);
return trampoline(loop(o2897896)); // Line 297 Column 2
}))(); // Line 297 Column 2
return res; // Line <unknown undefined> Column <unknown undefined>
});
var dict_dash_merge = (function(){
if(arguments.length < 0) {
throw Error("dict-merge: not enough arguments")
}
var dcts = vector_dash__gt_list(Array.prototype.slice.call(arguments, 0));
return ((function() {var o4947276 = (function(res){
if(arguments.length < 1) {
throw Error("o4947276: not enough arguments")
}
else if(arguments.length > 1) {
throw Error("o4947276: too many arguments");
}
for_dash_each((function(dct){
if(arguments.length < 1) {
throw Error("lambda: not enough arguments")
}
else if(arguments.length > 1) {
throw Error("lambda: too many arguments");
}
return for_dash_each((function(k){
if(arguments.length < 1) {
throw Error("lambda: not enough arguments")
}
else if(arguments.length > 1) {
throw Error("lambda: too many arguments");
}
return dict_dash_put_excl_(res,k,dict_dash_ref(dct,k)); // Line 306 Column 2
}),keys(dct)); // Line 306 Column 2
}),dcts); // Line 306 Column 2
return res; // Line <unknown undefined> Column <unknown undefined>
});
var o8711829 = dict();
return o4947276(o8711829); // Line 306 Column 2
}))(); // Line 306 Column 2
});
var dict_dash__gt_vector = (function(dct){
if(arguments.length < 1) {
throw Error("dict->vector: not enough arguments")
}
else if(arguments.length > 1) {
throw Error("dict->vector: too many arguments");
}
var res = vector();
((function() {var loop = (function(lst){
if(arguments.length < 1) {
throw Error("loop: not enough arguments")
}
else if(arguments.length > 1) {
throw Error("loop: too many arguments");
}
return (function() {if(not(null_p_(lst))) {return ((function() {vector_dash_push_excl_(res,car(lst)); // Line 316 Column 2
vector_dash_push_excl_(res,dict_dash_ref(dct,car(lst))); // Line 316 Column 2
return vector("__tco_call",(function() {return loop(cdr(lst)); // Line 316 Column 2
})); // Line 316 Column 2
}))(); // Line 316 Column 2
}})()
; // Line <unknown undefined> Column <unknown undefined>
});
var o3479103 = keys(dct);
return trampoline(loop(o3479103)); // Line 316 Column 2
}))(); // Line 316 Column 2
return res; // Line <unknown undefined> Column <unknown undefined>
});
var dict_dash__gt_list = (function(dct){
if(arguments.length < 1) {
throw Error("dict->list: not enough arguments")
}
else if(arguments.length > 1) {
throw Error("dict->list: too many arguments");
}
return vector_dash__gt_list(dict_dash__gt_vector(dct)); // Line 325 Column 3
});
var keys = (function(dct){
if(arguments.length < 1) {
throw Error("keys: not enough arguments")
}
else if(arguments.length > 1) {
throw Error("keys: too many arguments");
}
return ((function() {var o2009072 = (function(res){
if(arguments.length < 1) {
throw Error("o2009072: not enough arguments")
}
else if(arguments.length > 1) {
throw Error("o2009072: too many arguments");
}
for(var k in dct) {
       res = cons(string_dash__gt_key(k), res);
    }return res; // Line <unknown undefined> Column <unknown undefined>
});
var o3251151 = _emptylst;
return o2009072(o3251151); // Line 328 Column 2
}))(); // Line 328 Column 2
});
var vals = (function(dct){
if(arguments.length < 1) {
throw Error("vals: not enough arguments")
}
else if(arguments.length > 1) {
throw Error("vals: too many arguments");
}
return map((function(k){
if(arguments.length < 1) {
throw Error("lambda: not enough arguments")
}
else if(arguments.length > 1) {
throw Error("lambda: too many arguments");
}
return dict_dash_ref(dct,k); // Line 335 Column 20
}),keys(dct)); // Line 335 Column 3
});
var zip = (function(keys,vals){
if(arguments.length < 2) {
throw Error("zip: not enough arguments")
}
else if(arguments.length > 2) {
throw Error("zip: too many arguments");
}
var res = dict();
((function() {var loop = (function(ks,vs){
if(arguments.length < 2) {
throw Error("loop: not enough arguments")
}
else if(arguments.length > 2) {
throw Error("loop: too many arguments");
}
return (function() {if(not(null_p_(ks))) {return ((function() {dict_dash_put_excl_(res,car(ks),car(vs)); // Line 340 Column 2
return vector("__tco_call",(function() {return loop(cdr(ks),cdr(vs)); // Line 340 Column 2
})); // Line 340 Column 2
}))(); // Line 340 Column 2
}})()
; // Line <unknown undefined> Column <unknown undefined>
});
var o7299865 = keys;
var o8267366 = vals;
return trampoline(loop(o7299865,o8267366)); // Line 340 Column 2
}))(); // Line 340 Column 2
return res; // Line <unknown undefined> Column <unknown undefined>
});
var not = (function(obj){
if(arguments.length < 1) {
throw Error("not: not enough arguments")
}
else if(arguments.length > 1) {
throw Error("not: too many arguments");
}
return (typeof obj !== 'number' && !obj); // Line <unknown undefined> Column <unknown undefined>
});
var _eq__eq_ = (function(obj1,obj2){
if(arguments.length < 2) {
throw Error("==: not enough arguments")
}
else if(arguments.length > 2) {
throw Error("==: too many arguments");
}
return obj1 === obj2});
var _eq_ = (function(obj1,obj2){
if(arguments.length < 2) {
throw Error("=: not enough arguments")
}
else if(arguments.length > 2) {
throw Error("=: too many arguments");
}
return (function() {if((list_p_(obj1) && list_p_(obj2))) {return ((function() {return ((function() {var loop = (function(lst1,lst2){
if(arguments.length < 2) {
throw Error("loop: not enough arguments")
}
else if(arguments.length > 2) {
throw Error("loop: too many arguments");
}
var n1 = null_p_(lst1);
var n2 = null_p_(lst2);
return (function() {if((n1 && n2)) {return ((function() {return true; // Line <unknown undefined> Column <unknown undefined>
}))(); // Line 360 Column 2
} else {return (function() {if((n1 || n2)) {return ((function() {return false; // Line <unknown undefined> Column <unknown undefined>
}))(); // Line 360 Column 2
} else {return ((function() {return (function() {if(equal_p_(car(lst1),car(lst2))) {return loop(cdr(lst1),cdr(lst2)); // Line 360 Column 2
} else {return false; // Line <unknown undefined> Column <unknown undefined>
}})()
; // Line <unknown undefined> Column <unknown undefined>
}))(); // Line 360 Column 2
}})()
; // Line <unknown undefined> Column <unknown undefined>
}})()
; // Line <unknown undefined> Column <unknown undefined>
});
var o2237128 = obj1;
var o3002681 = obj2;
return loop(o2237128,o3002681); // Line 360 Column 2
}))(); // Line 360 Column 2
}))(); // Line 360 Column 2
} else {return (function() {if((vector_p_(obj1) && vector_p_(obj2))) {return ((function() {return (function() {if(not(_eq_(obj1["length"],obj2["length"]))) {return false; // Line <unknown undefined> Column <unknown undefined>
} else {return ((function() {var loop = (function(i){
if(arguments.length < 1) {
throw Error("loop: not enough arguments")
}
else if(arguments.length > 1) {
throw Error("loop: too many arguments");
}
return (function() {if((i < obj1["length"])) {return (function() {if(_eq_(vector_dash_ref(obj1,i),vector_dash_ref(obj2,i))) {return vector("__tco_call",(function() {return loop((i + 1)); // Line 360 Column 2
})); // Line 360 Column 2
} else {return false; // Line <unknown undefined> Column <unknown undefined>
}})()
; // Line <unknown undefined> Column <unknown undefined>
} else {return true; // Line <unknown undefined> Column <unknown undefined>
}})()
; // Line <unknown undefined> Column <unknown undefined>
});
var o9504941 = 0;
return trampoline(loop(o9504941)); // Line 360 Column 2
}))(); // Line 360 Column 2
}})()
; // Line <unknown undefined> Column <unknown undefined>
}))(); // Line 360 Column 2
} else {return (function() {if((dict_p_(obj1) && dict_p_(obj2))) {return ((function() {return ((function() {var o5503660 = (function(keys1,keys2){
if(arguments.length < 2) {
throw Error("o5503660: not enough arguments")
}
else if(arguments.length > 2) {
throw Error("o5503660: too many arguments");
}
return (eq_p_(length(keys1),length(keys2)) && ((function() {var loop = (function(lst){
if(arguments.length < 1) {
throw Error("loop: not enough arguments")
}
else if(arguments.length > 1) {
throw Error("loop: too many arguments");
}
return (function() {if(null_p_(lst)) {return true; // Line <unknown undefined> Column <unknown undefined>
} else {return (function() {if(equal_p_(dict_dash_ref(obj1,car(lst)),dict_dash_ref(obj2,car(lst)))) {return vector("__tco_call",(function() {return loop(cdr(lst)); // Line 360 Column 2
})); // Line 360 Column 2
} else {return false; // Line <unknown undefined> Column <unknown undefined>
}})()
; // Line <unknown undefined> Column <unknown undefined>
}})()
; // Line <unknown undefined> Column <unknown undefined>
});
var o4425679 = keys1;
return trampoline(loop(o4425679)); // Line 360 Column 2
}))()); // Line <unknown undefined> Column <unknown undefined>
});
var o3381950 = keys(obj1);
var o6400636 = keys(obj2);
return o5503660(o3381950,o6400636); // Line 360 Column 2
}))(); // Line 360 Column 2
}))(); // Line 360 Column 2
} else {return ((function() {return eq_p_(obj1,obj2); // Line 360 Column 2
}))(); // Line 360 Column 2
}})()
; // Line <unknown undefined> Column <unknown undefined>
}})()
; // Line <unknown undefined> Column <unknown undefined>
}})()
; // Line <unknown undefined> Column <unknown undefined>
});
var eq_p_ = _eq__eq_;
var equal_p_ = _eq_;
var print = (function(msg){
if(arguments.length < 1) {
throw Error("print: not enough arguments")
}
else if(arguments.length > 1) {
throw Error("print: too many arguments");
}
return util["print"](msg); // Line 408 Column 3
});
var println = (function(msg){
if(arguments.length < 1) {
throw Error("println: not enough arguments")
}
else if(arguments.length > 1) {
throw Error("println: too many arguments");
}
return util["puts"](msg); // Line 411 Column 3
});
var pp = (function(obj){
if(arguments.length < 1) {
throw Error("pp: not enough arguments")
}
else if(arguments.length > 1) {
throw Error("pp: too many arguments");
}
return println(inspect(obj)); // Line 414 Column 3
});
var _per_inspect_dash_non_dash_sequence = (function(obj){
if(arguments.length < 1) {
throw Error("%inspect-non-sequence: not enough arguments")
}
else if(arguments.length > 1) {
throw Error("%inspect-non-sequence: too many arguments");
}
return (function() {if(number_p_(obj)) {return ((function() {return ("" + obj); // Line <unknown undefined> Column <unknown undefined>
}))(); // Line 418 Column 2
} else {return (function() {if(string_p_(obj)) {return ((function() {obj = obj["replace"](RegExp("\\\\","g"),"\\\\");
obj = obj["replace"](RegExp("\n","g"),"\\n");
obj = obj["replace"](RegExp("\r","g"),"\\r");
obj = obj["replace"](RegExp("\t","g"),"\\t");
obj = obj["replace"](RegExp("\"","g"),"\\\"");
return ("\"" + obj + "\""); // Line <unknown undefined> Column <unknown undefined>
}))(); // Line 418 Column 2
} else {return (function() {if(key_p_(obj)) {return ((function() {return (":" + symbol_dash__gt_string(obj)); // Line <unknown undefined> Column <unknown undefined>
}))(); // Line 418 Column 2
} else {return (function() {if(symbol_p_(obj)) {return ((function() {return symbol_dash__gt_string(obj); // Line 418 Column 2
}))(); // Line 418 Column 2
} else {return (function() {if(boolean_p_(obj)) {return ((function() {return (function() {if(obj) {return "#t"; // Line <unknown undefined> Column <unknown undefined>
} else {return "#f"; // Line <unknown undefined> Column <unknown undefined>
}})()
; // Line <unknown undefined> Column <unknown undefined>
}))(); // Line 418 Column 2
} else {return (function() {if(null_p_(obj)) {return ((function() {return "()"; // Line <unknown undefined> Column <unknown undefined>
}))(); // Line 418 Column 2
} else {return (function() {if(function_p_(obj)) {return ((function() {return "<function>"; // Line <unknown undefined> Column <unknown undefined>
}))(); // Line 418 Column 2
} else {return ((function() {return ("<unknown " + obj + ">"); // Line <unknown undefined> Column <unknown undefined>
}))(); // Line 418 Column 2
}})()
; // Line <unknown undefined> Column <unknown undefined>
}})()
; // Line <unknown undefined> Column <unknown undefined>
}})()
; // Line <unknown undefined> Column <unknown undefined>
}})()
; // Line <unknown undefined> Column <unknown undefined>
}})()
; // Line <unknown undefined> Column <unknown undefined>
}})()
; // Line <unknown undefined> Column <unknown undefined>
}})()
; // Line <unknown undefined> Column <unknown undefined>
});
var _per_recur_dash_protect = (function(obj,arg,func,halt){
if(arguments.length < 4) {
throw Error("%recur-protect: not enough arguments")
}
var rest = vector_dash__gt_list(Array.prototype.slice.call(arguments, 4));
return ((function() {var o3081190 = (function(parents){
if(arguments.length < 1) {
throw Error("o3081190: not enough arguments")
}
else if(arguments.length > 1) {
throw Error("o3081190: too many arguments");
}
return (function() {if(list_dash_find(parents,obj)) {return halt; // Line <unknown undefined> Column <unknown undefined>
} else {return func(obj,arg,(function(el,arg){
if(arguments.length < 2) {
throw Error("lambda: not enough arguments")
}
else if(arguments.length > 2) {
throw Error("lambda: too many arguments");
}
return _per_recur_dash_protect(el,arg,func,halt,cons(obj,parents)); // Line 435 Column 2
})); // Line 435 Column 2
}})()
; // Line <unknown undefined> Column <unknown undefined>
});
var o9543810 = (function() {if(null_p_(rest)) {return _emptylst; // Line <unknown undefined> Column <unknown undefined>
} else {return car(rest); // Line 435 Column 2
}})()
;
return o3081190(o9543810); // Line 435 Column 2
}))(); // Line 435 Column 2
});
var _per_space = (function(obj){
if(arguments.length < 1) {
throw Error("%space: not enough arguments")
}
else if(arguments.length > 1) {
throw Error("%space: too many arguments");
}
return _per_recur_dash_protect(obj,false,(function(obj,arg,recur){
if(arguments.length < 3) {
throw Error("lambda: not enough arguments")
}
else if(arguments.length > 3) {
throw Error("lambda: too many arguments");
}
return (function() {if(list_p_(obj)) {return ((function() {return (length(obj) + 1 + fold((function(el,acc){
if(arguments.length < 2) {
throw Error("lambda: not enough arguments")
}
else if(arguments.length > 2) {
throw Error("lambda: too many arguments");
}
return (acc + recur(el,false)); // Line <unknown undefined> Column <unknown undefined>
}),0,obj)); // Line <unknown undefined> Column <unknown undefined>
}))(); // Line 448 Column 5
} else {return (function() {if(dict_p_(obj)) {return ((function() {return recur(dict_dash__gt_list(obj),false); // Line 448 Column 5
}))(); // Line 448 Column 5
} else {return (function() {if(vector_p_(obj)) {return ((function() {return recur(vector_dash__gt_list(obj),false); // Line 448 Column 5
}))(); // Line 448 Column 5
} else {return ((function() {return vector_dash_length(_per_inspect_dash_non_dash_sequence(obj)); // Line 448 Column 5
}))(); // Line 448 Column 5
}})()
; // Line <unknown undefined> Column <unknown undefined>
}})()
; // Line <unknown undefined> Column <unknown undefined>
}})()
; // Line <unknown undefined> Column <unknown undefined>
}),vector_dash_length("<circular>")); // Line 444 Column 3
});
var inspect = (function(obj){
if(arguments.length < 1) {
throw Error("inspect: not enough arguments")
}
var rest = vector_dash__gt_list(Array.prototype.slice.call(arguments, 1));
return ((function() {var o6767545 = (function(no_dash_newlines){
if(arguments.length < 1) {
throw Error("o6767545: not enough arguments")
}
else if(arguments.length > 1) {
throw Error("o6767545: too many arguments");
}
return _per_recur_dash_protect(obj,1,(function(obj,i,recur){
if(arguments.length < 3) {
throw Error("lambda: not enough arguments")
}
else if(arguments.length > 3) {
throw Error("lambda: too many arguments");
}
var buffer = "";
var get_dash_buffer = (function() {return buffer; // Line <unknown undefined> Column <unknown undefined>
});
var disp = (function(s){
if(arguments.length < 1) {
throw Error("disp: not enough arguments")
}
else if(arguments.length > 1) {
throw Error("disp: too many arguments");
}
buffer = (buffer + s);
});
var pad = (function(n){
if(arguments.length < 1) {
throw Error("pad: not enough arguments")
}
else if(arguments.length > 1) {
throw Error("pad: too many arguments");
}
return vector_dash_for_dash_each((function(_){
if(arguments.length < 1) {
throw Error("lambda: not enough arguments")
}
else if(arguments.length > 1) {
throw Error("lambda: too many arguments");
}
return disp(" "); // Line 468 Column 2
}),make_dash_vector(n)); // Line 468 Column 2
});
return (function() {if(list_p_(obj)) {return ((function() {return ((function() {var o5835072 = (function(sp,first){
if(arguments.length < 2) {
throw Error("o5835072: not enough arguments")
}
else if(arguments.length > 2) {
throw Error("o5835072: too many arguments");
}
disp("("); // Line 468 Column 2
for_dash_each((function(el){
if(arguments.length < 1) {
throw Error("lambda: not enough arguments")
}
else if(arguments.length > 1) {
throw Error("lambda: too many arguments");
}
(function() {if(not(first)) {return (function() {if((sp && not(no_dash_newlines))) {return ((function() {disp("\n"); // Line 468 Column 2
return pad(i); // Line 468 Column 2
}))(); // Line 468 Column 2
} else {return disp(" "); // Line 468 Column 2
}})()
; // Line <unknown undefined> Column <unknown undefined>
}})()
; // Line <unknown undefined> Column <unknown undefined>
disp(recur(el,(i + 1))); // Line 468 Column 2
first = false;
}),obj); // Line 468 Column 2
disp(")"); // Line 468 Column 2
return get_dash_buffer(); // Line 468 Column 2
});
var o4387955 = (_per_space(obj) > 30);
var o4229010 = true;
return o5835072(o4387955,o4229010); // Line 468 Column 2
}))(); // Line 468 Column 2
}))(); // Line 468 Column 2
} else {return (function() {if(vector_p_(obj)) {return ((function() {return ((function() {var o7087018 = (function(sp,first){
if(arguments.length < 2) {
throw Error("o7087018: not enough arguments")
}
else if(arguments.length > 2) {
throw Error("o7087018: too many arguments");
}
disp("["); // Line 468 Column 2
vector_dash_for_dash_each((function(el){
if(arguments.length < 1) {
throw Error("lambda: not enough arguments")
}
else if(arguments.length > 1) {
throw Error("lambda: too many arguments");
}
(function() {if(not(first)) {return (function() {if((sp && not(no_dash_newlines))) {return ((function() {disp("\n"); // Line 468 Column 2
return pad(i); // Line 468 Column 2
}))(); // Line 468 Column 2
} else {return disp(" "); // Line 468 Column 2
}})()
; // Line <unknown undefined> Column <unknown undefined>
}})()
; // Line <unknown undefined> Column <unknown undefined>
disp(recur(el,(i + 1))); // Line 468 Column 2
first = false;
}),obj); // Line 468 Column 2
disp("]"); // Line 468 Column 2
return get_dash_buffer(); // Line 468 Column 2
});
var o6158937 = (_per_space(obj) > 30);
var o9586128 = true;
return o7087018(o6158937,o9586128); // Line 468 Column 2
}))(); // Line 468 Column 2
}))(); // Line 468 Column 2
} else {return (function() {if(dict_p_(obj)) {return ((function() {return ((function() {var o2058374 = (function(sp,first){
if(arguments.length < 2) {
throw Error("o2058374: not enough arguments")
}
else if(arguments.length > 2) {
throw Error("o2058374: too many arguments");
}
disp("{"); // Line 468 Column 2
for_dash_each((function(k){
if(arguments.length < 1) {
throw Error("lambda: not enough arguments")
}
else if(arguments.length > 1) {
throw Error("lambda: too many arguments");
}
(function() {if(not(first)) {return (function() {if((sp && not(no_dash_newlines))) {return ((function() {disp("\n"); // Line 468 Column 2
return pad(i); // Line 468 Column 2
}))(); // Line 468 Column 2
} else {return disp(" "); // Line 468 Column 2
}})()
; // Line <unknown undefined> Column <unknown undefined>
}})()
; // Line <unknown undefined> Column <unknown undefined>
disp(recur(k,i)); // Line 468 Column 2
disp(" "); // Line 468 Column 2
disp(recur(dict_dash_ref(obj,k),(i + 3 + vector_dash_length(symbol_dash__gt_string(k))))); // Line 468 Column 2
first = false;
}),keys(obj)); // Line 468 Column 2
disp("}"); // Line 468 Column 2
return get_dash_buffer(); // Line 468 Column 2
});
var o2525106 = (_per_space(obj) > 30);
var o9239235 = true;
return o2058374(o2525106,o9239235); // Line 468 Column 2
}))(); // Line 468 Column 2
}))(); // Line 468 Column 2
} else {return ((function() {return _per_inspect_dash_non_dash_sequence(obj); // Line 468 Column 2
}))(); // Line 468 Column 2
}})()
; // Line <unknown undefined> Column <unknown undefined>
}})()
; // Line <unknown undefined> Column <unknown undefined>
}})()
; // Line <unknown undefined> Column <unknown undefined>
}),"<circular>"); // Line 468 Column 2
});
var o9766079 = (function() {if(null_p_(rest)) {return false; // Line <unknown undefined> Column <unknown undefined>
} else {return car(rest); // Line 468 Column 2
}})()
;
return o6767545(o9766079); // Line 468 Column 2
}))(); // Line 468 Column 2
});
var apply = (function(func,args){
if(arguments.length < 2) {
throw Error("apply: not enough arguments")
}
else if(arguments.length > 2) {
throw Error("apply: too many arguments");
}
return func.apply(null,list_dash__gt_vector(args)); // Line 542 Column 3
});
var trampoline_dash_result_p_ = (function(value){
if(arguments.length < 1) {
throw Error("trampoline-result?: not enough arguments")
}
else if(arguments.length > 1) {
throw Error("trampoline-result?: too many arguments");
}
return (vector_p_(value) && _eq_(vector_dash_ref(value,0),"__tco_call")); // Line <unknown undefined> Column <unknown undefined>
});
var trampoline = (function(value){
if(arguments.length < 1) {
throw Error("trampoline: not enough arguments")
}
else if(arguments.length > 1) {
throw Error("trampoline: too many arguments");
}
while(trampoline_dash_result_p_(value)) { value = value[1](); }return value; // Line <unknown undefined> Column <unknown undefined>
});
var gensym = (function() {return string_dash__gt_symbol(("o" + Math["floor"]((Math["random"]() * 10000000)))); // Line 556 Column 3
});


var fs = require("fs");var ast = require("../ast");var should_dash_return_p_ = (function(form){
if(arguments.length < 1) {
throw Error("should-return?: not enough arguments")
}
else if(arguments.length > 1) {
throw Error("should-return?: too many arguments");
}
return not((ast["list?"](form) && (_eq__eq_(ast["first*"](form),"\uFDD1throw") || _eq__eq_(ast["first*"](form),"\uFDD1set!") || _eq__eq_(ast["first*"](form),"\uFDD1define")))); // Line 5 Column 3
});
var generator = (function() {var code = vector();
var make_dash_fresh = (function() {return generator(); // Line 14 Column 5
});
var write = (function(src){
if(arguments.length < 1) {
throw Error("write: not enough arguments")
}
var eol = vector_dash__gt_list(Array.prototype.slice.call(arguments, 1));
return code["push"]((src + (function() {if(null_p_(eol)) {return ""; // Line <unknown undefined> Column <unknown undefined>
} else {return "\n"; // Line <unknown undefined> Column <unknown undefined>
}})()
)); // Line 17 Column 5
});
var write_dash_runtime = (function(target){
if(arguments.length < 1) {
throw Error("write-runtime: not enough arguments")
}
var root = vector_dash__gt_list(Array.prototype.slice.call(arguments, 1));
return ((function() {var o8829814 = (function(root){
if(arguments.length < 1) {
throw Error("o8829814: not enough arguments")
}
else if(arguments.length > 1) {
throw Error("o8829814: too many arguments");
}
return (function() {if(not(equal_p_(target,"no-runtime"))) {return ((function() {(function() {if(not(equal_p_(target,"js-onlyeval"))) {return write(fs["readFileSync"](str(root,"/runtime.js"),"utf-8"),true); // Line 20 Column 4
}})()
; // Line <unknown undefined> Column <unknown undefined>
return (function() {if(not(equal_p_(target,"js-noeval"))) {return ((function() {write(str("var __compiler = require('",root,"/compiler');"),true); // Line 20 Column 4
write(str("var __generator = require('",root,"/backends/js');"),true); // Line 20 Column 4
return write("var read = __compiler.read;",true); // Line 20 Column 4
}))(); // Line 20 Column 4
}})()
; // Line <unknown undefined> Column <unknown undefined>
}))(); // Line 20 Column 4
}})()
; // Line <unknown undefined> Column <unknown undefined>
});
var o2261360 = (function() {if(null_p_(root)) {return str(__dirname,"/.."); // Line 20 Column 4
} else {return car(root); // Line 20 Column 4
}})()
;
return o8829814(o2261360); // Line 20 Column 4
}))(); // Line 20 Column 4
});
var inline_dash_writer = (function(str){
if(arguments.length < 1) {
throw Error("inline-writer: not enough arguments")
}
else if(arguments.length > 1) {
throw Error("inline-writer: too many arguments");
}
return ((function() {var o9277649 = (function(first){
if(arguments.length < 1) {
throw Error("o9277649: not enough arguments")
}
else if(arguments.length > 1) {
throw Error("o9277649: too many arguments");
}
return (function() {return (function() {if(first) {first = false;
} else {return write(str); // Line 36 Column 4
}})()
; // Line <unknown undefined> Column <unknown undefined>
}); // Line <unknown undefined> Column <unknown undefined>
});
var o8033014 = true;
return o9277649(o8033014); // Line 36 Column 4
}))(); // Line 36 Column 4
});
var terminate_dash_expr = (function(expr_p_){
if(arguments.length < 1) {
throw Error("terminate-expr: not enough arguments")
}
var node = vector_dash__gt_list(Array.prototype.slice.call(arguments, 1));
return ((function() {var o6327476 = (function(node){
if(arguments.length < 1) {
throw Error("o6327476: not enough arguments")
}
else if(arguments.length > 1) {
throw Error("o6327476: too many arguments");
}
return (function() {if(not(expr_p_)) {return ((function() {return write(str("; ","// Line ",ast["node-lineno"](node)," Column ",ast["node-colno"](node)),true); // Line 43 Column 4
}))(); // Line 43 Column 4
}})()
; // Line <unknown undefined> Column <unknown undefined>
});
var o6429943 = (function() {if(null_p_(node)) {return false; // Line <unknown undefined> Column <unknown undefined>
} else {return car(node); // Line 43 Column 4
}})()
;
return o6327476(o6429943); // Line 43 Column 4
}))(); // Line 43 Column 4
});
var write_dash_number = (function(obj,expr_p_){
if(arguments.length < 2) {
throw Error("write-number: not enough arguments")
}
else if(arguments.length > 2) {
throw Error("write-number: too many arguments");
}
write(obj); // Line 55 Column 5
return terminate_dash_expr(expr_p_); // Line 56 Column 5
});
var write_dash_boolean = (function(obj,expr_p_){
if(arguments.length < 2) {
throw Error("write-boolean: not enough arguments")
}
else if(arguments.length > 2) {
throw Error("write-boolean: too many arguments");
}
(function() {if(obj) {return write("true"); // Line 60 Column 9
} else {return write("false"); // Line 61 Column 9
}})()
; // Line <unknown undefined> Column <unknown undefined>
return terminate_dash_expr(expr_p_); // Line 62 Column 5
});
var write_dash_empty_dash_list = (function(obj,expr_p_){
if(arguments.length < 2) {
throw Error("write-empty-list: not enough arguments")
}
else if(arguments.length > 2) {
throw Error("write-empty-list: too many arguments");
}
write("_emptylst"); // Line 67 Column 5
return terminate_dash_expr(expr_p_); // Line 68 Column 5
});
var write_dash_string = (function(obj,expr_p_){
if(arguments.length < 2) {
throw Error("write-string: not enough arguments")
}
else if(arguments.length > 2) {
throw Error("write-string: too many arguments");
}
return ((function() {var o3376882 = (function(str){
if(arguments.length < 1) {
throw Error("o3376882: not enough arguments")
}
else if(arguments.length > 1) {
throw Error("o3376882: too many arguments");
}
str = str["replace"](RegExp("\\\\","g"),"\\\\");
str = str["replace"](RegExp("\n","g"),"\\n");
str = str["replace"](RegExp("\r","g"),"\\r");
str = str["replace"](RegExp("\t","g"),"\\t");
str = str["replace"](RegExp("\"","g"),"\\\"");
write(("\"" + str + "\"")); // Line 71 Column 4
return terminate_dash_expr(expr_p_); // Line 71 Column 4
});
var o3011291 = obj;
return o3376882(o3011291); // Line 71 Column 4
}))(); // Line 71 Column 4
});
var write_dash_symbol = (function(obj,expr_p_){
if(arguments.length < 2) {
throw Error("write-symbol: not enough arguments")
}
else if(arguments.length > 2) {
throw Error("write-symbol: too many arguments");
}
write(("\"\\uFDD1" + obj["substring"](1) + "\"")); // Line 81 Column 5
return terminate_dash_expr(expr_p_); // Line 82 Column 5
});
var write_dash_key = (function(obj,expr_p_){
if(arguments.length < 2) {
throw Error("write-key: not enough arguments")
}
else if(arguments.length > 2) {
throw Error("write-key: too many arguments");
}
write(("\"\\uFDD0" + obj["substring"](1) + "\"")); // Line 85 Column 5
return terminate_dash_expr(expr_p_); // Line 86 Column 5
});
var write_dash_term = (function(node,expr_p_){
if(arguments.length < 2) {
throw Error("write-term: not enough arguments")
}
else if(arguments.length > 2) {
throw Error("write-term: too many arguments");
}
return ((function() {var o2934946 = (function(exp,exp){
if(arguments.length < 2) {
throw Error("o2934946: not enough arguments")
}
else if(arguments.length > 2) {
throw Error("o2934946: too many arguments");
}
var name = exp["substring"](1);
var parts = name["split"](".");
((function() {var o949632 = (function(name){
if(arguments.length < 1) {
throw Error("o949632: not enough arguments")
}
else if(arguments.length > 1) {
throw Error("o949632: too many arguments");
}
name = name["replace"](RegExp("-","g"),"_dash_");
name = name["replace"](RegExp("\\?","g"),"_p_");
name = name["replace"](RegExp("\\!","g"),"_excl_");
name = name["replace"](RegExp(">","g"),"_gt_");
name = name["replace"](RegExp("<","g"),"_lt_");
name = name["replace"](RegExp("%","g"),"_per_");
name = name["replace"](RegExp("=","g"),"_eq_");
name = name["replace"](RegExp("\\/","g"),"_slash_");
name = name["replace"](RegExp("\\*","g"),"_star_");
name = name["replace"](RegExp("\\+","g"),"_plus_");
return write(name); // Line 89 Column 4
});
var o2153051 = vector_dash_ref(parts,0);
return o949632(o2153051); // Line 89 Column 4
}))(); // Line 89 Column 4
vector_dash_for_dash_each((function(part){
if(arguments.length < 1) {
throw Error("lambda: not enough arguments")
}
else if(arguments.length > 1) {
throw Error("lambda: too many arguments");
}
return write(str("[\"",part,"\"]")); // Line 89 Column 4
}),vector_dash_slice(parts,1)); // Line 89 Column 4
return terminate_dash_expr(expr_p_); // Line 89 Column 4
});
var o3834617 = ast["node-data"](node);
var o8387726 = (function() {if(_eq__eq_(o3834617,"\uFDD1var")) {return ((function() {return "\uFDD1_var_"; // Line <unknown undefined> Column <unknown undefined>
}))(); // Line 89 Column 4
} else {return (function() {if(_eq__eq_(o3834617,"\uFDD1in")) {return ((function() {return "\uFDD1_in_"; // Line <unknown undefined> Column <unknown undefined>
}))(); // Line 89 Column 4
} else {return ((function() {return o3834617; // Line <unknown undefined> Column <unknown undefined>
}))(); // Line 89 Column 4
}})()
; // Line <unknown undefined> Column <unknown undefined>
}})()
;
return o2934946(o3834617,o8387726); // Line 89 Column 4
}))(); // Line 89 Column 4
});
var write_dash_define = (function(lval,rval,compile){
if(arguments.length < 3) {
throw Error("write-define: not enough arguments")
}
else if(arguments.length > 3) {
throw Error("write-define: too many arguments");
}
write("var "); // Line 122 Column 5
return write_dash_set_excl_(lval,rval,compile); // Line 123 Column 5
});
var write_dash_set_excl_ = (function(lval,rval,compile){
if(arguments.length < 3) {
throw Error("write-set!: not enough arguments")
}
else if(arguments.length > 3) {
throw Error("write-set!: too many arguments");
}
write_dash_term(lval,true); // Line 126 Column 5
write(" = "); // Line 127 Column 5
compile(rval,true); // Line 128 Column 5
return write(";",true); // Line 131 Column 5
});
var write_dash_if = (function(cnd,tru,alt,expr_p_,compile){
if(arguments.length < 5) {
throw Error("write-if: not enough arguments")
}
else if(arguments.length > 5) {
throw Error("write-if: too many arguments");
}
write("(function() {"); // Line 134 Column 5
write("if("); // Line 136 Column 5
compile(cnd,true); // Line 137 Column 5
write(") {"); // Line 138 Column 5
(function() {if(should_dash_return_p_(tru)) {return write("return "); // Line 140 Column 9
}})()
; // Line <unknown undefined> Column <unknown undefined>
compile(tru); // Line 141 Column 5
write("}"); // Line 142 Column 5
(function() {if(alt) {return ((function() {write(" else {"); // Line 145 Column 8
(function() {if(should_dash_return_p_(alt)) {return write("return "); // Line 145 Column 8
}})()
; // Line <unknown undefined> Column <unknown undefined>
compile(alt); // Line 145 Column 8
return write("}"); // Line 145 Column 8
}))(); // Line 145 Column 8
}})()
; // Line <unknown undefined> Column <unknown undefined>
write("})()",true); // Line 152 Column 5
return terminate_dash_expr(expr_p_); // Line 153 Column 5
});
var write_dash_lambda = (function(node,expr_p_,compile){
if(arguments.length < 3) {
throw Error("write-lambda: not enough arguments")
}
else if(arguments.length > 3) {
throw Error("write-lambda: too many arguments");
}
var name = car(ast["node-data"](node));
var args = cadr(ast["node-data"](node));
var body = cddr(ast["node-data"](node));
(function() {if(ast["list?"](args)) {return ((function() {var comma = inline_dash_writer(",");
var capture_dash_name = false;
var opt_dash_args = false;
var arg_dash_min = length(ast["node-data"](args));
var arg_dash_max = arg_dash_min;
var write_dash_args = (function(args,i){
if(arguments.length < 2) {
throw Error("write-args: not enough arguments")
}
else if(arguments.length > 2) {
throw Error("write-args: too many arguments");
}
return (function() {if(not(null_p_(args))) {return ((function() {var o219642 = (function(arg){
if(arguments.length < 1) {
throw Error("o219642: not enough arguments")
}
else if(arguments.length > 1) {
throw Error("o219642: too many arguments");
}
return (function() {if(_eq__eq_(arg,"\uFDD1.")) {return ((function() {capture_dash_name = cadr(args);
arg_dash_min = i;
arg_dash_max = false;
}))(); // Line 160 Column 4
} else {return (function() {if(_eq__eq_(arg,"\uFDD1&")) {return ((function() {opt_dash_args = cdr(args);
arg_dash_min = i;
arg_dash_max = (arg_dash_max - 1);
}))(); // Line 160 Column 4
} else {return ((function() {comma(); // Line 160 Column 4
write_dash_term(car(args),true); // Line 160 Column 4
return write_dash_args(cdr(args),(i + 1)); // Line 160 Column 4
}))(); // Line 160 Column 4
}})()
; // Line <unknown undefined> Column <unknown undefined>
}})()
; // Line <unknown undefined> Column <unknown undefined>
});
var o5208400 = ast["node-data"](car(args));
return o219642(o5208400); // Line 160 Column 4
}))(); // Line 160 Column 4
}})()
; // Line <unknown undefined> Column <unknown undefined>
});
write("(function("); // Line 160 Column 4
write_dash_args(ast["node-data"](args),0); // Line 160 Column 4
write("){",true); // Line 160 Column 4
write(str("if(arguments.length < ",arg_dash_min,") {"),true); // Line 160 Column 4
write(str("throw Error(\"",(ast["node-extra"](name) || "lambda"),": not enough arguments\")"),true); // Line 160 Column 4
write("}",true); // Line 160 Column 4
(function() {if(arg_dash_max) {return ((function() {write(str("else if(arguments.length > ",arg_dash_max,") {"),true); // Line 160 Column 4
write(str("throw Error(\"",(ast["node-extra"](name) || "lambda"),": too many arguments\");"),true); // Line 160 Column 4
return write("}",true); // Line 160 Column 4
}))(); // Line 160 Column 4
}})()
; // Line <unknown undefined> Column <unknown undefined>
return (function() {if(capture_dash_name) {return ((function() {write("var "); // Line 160 Column 4
write_dash_term(capture_dash_name,true); // Line 160 Column 4
write(" = "); // Line 160 Column 4
write_dash_term(ast["make-atom"]("\uFDD1vector->list",capture_dash_name),true); // Line 160 Column 4
return write(str("(Array.prototype.slice.call(arguments, ",arg_dash_min,"));"),true); // Line 160 Column 4
}))(); // Line 160 Column 4
} else {return (function() {if(opt_dash_args) {return ((function() {return fold((function(arg,i){
if(arguments.length < 2) {
throw Error("lambda: not enough arguments")
}
else if(arguments.length > 2) {
throw Error("lambda: too many arguments");
}
write("var "); // Line 160 Column 4
write_dash_term(arg,true); // Line 160 Column 4
write(str(" = arguments[",i,"] || false;"),true); // Line 160 Column 4
return (i + 1); // Line <unknown undefined> Column <unknown undefined>
}),arg_dash_min,opt_dash_args); // Line 160 Column 4
}))(); // Line 160 Column 4
} else {return false; // Line <unknown undefined> Column <unknown undefined>
}})()
; // Line <unknown undefined> Column <unknown undefined>
}})()
; // Line <unknown undefined> Column <unknown undefined>
}))(); // Line 160 Column 4
} else {return (function() {if(symbol_p_(ast["node-data"](args))) {return ((function() {write("(function() {",true); // Line 160 Column 4
write("var "); // Line 160 Column 4
write_dash_term(args,true); // Line 160 Column 4
write(" = "); // Line 160 Column 4
write_dash_term(ast["make-atom"]("\uFDD1vector->list",args),true); // Line 160 Column 4
return write("(Array.prototype.slice.call(arguments));",true); // Line 160 Column 4
}))(); // Line 160 Column 4
} else {return (function() {if(null_p_(ast["node-data"](args))) {return ((function() {return write("(function() {"); // Line 160 Column 4
}))(); // Line 160 Column 4
} else {return false; // Line <unknown undefined> Column <unknown undefined>
}})()
; // Line <unknown undefined> Column <unknown undefined>
}})()
; // Line <unknown undefined> Column <unknown undefined>
}})()
; // Line <unknown undefined> Column <unknown undefined>
((function() {var o8339269 = (function(i,len){
if(arguments.length < 2) {
throw Error("o8339269: not enough arguments")
}
else if(arguments.length > 2) {
throw Error("o8339269: too many arguments");
}
return for_dash_each((function(form){
if(arguments.length < 1) {
throw Error("lambda: not enough arguments")
}
else if(arguments.length > 1) {
throw Error("lambda: too many arguments");
}
(function() {if((_eq__eq_(i,(len - 1)) && should_dash_return_p_(form))) {return write("return "); // Line 236 Column 4
}})()
; // Line <unknown undefined> Column <unknown undefined>
compile(form); // Line 236 Column 4
i = (i + 1);
}),body); // Line 236 Column 4
});
var o1884799 = 0;
var o6373871 = length(body);
return o8339269(o1884799,o6373871); // Line 236 Column 4
}))(); // Line 236 Column 4
write("})"); // Line 247 Column 5
return terminate_dash_expr(expr_p_); // Line 248 Column 5
});
var write_dash_func_dash_call = (function(func,args,expr_p_,compile){
if(arguments.length < 4) {
throw Error("write-func-call: not enough arguments")
}
else if(arguments.length > 4) {
throw Error("write-func-call: too many arguments");
}
(function() {if((ast["list?"](func) && _eq__eq_(ast["first*"](func),"\uFDD1lambda"))) {return ((function() {write("("); // Line 255 Column 8
compile(func,true); // Line 255 Column 8
return write(")"); // Line 255 Column 8
}))(); // Line 255 Column 8
} else {return compile(func,true); // Line 261 Column 9
}})()
; // Line <unknown undefined> Column <unknown undefined>
write("("); // Line 264 Column 5
((function() {var o4431420 = (function(comma){
if(arguments.length < 1) {
throw Error("o4431420: not enough arguments")
}
else if(arguments.length > 1) {
throw Error("o4431420: too many arguments");
}
return for_dash_each((function(arg){
if(arguments.length < 1) {
throw Error("lambda: not enough arguments")
}
else if(arguments.length > 1) {
throw Error("lambda: too many arguments");
}
comma(); // Line 265 Column 4
return compile(arg,true); // Line 265 Column 4
}),args); // Line 265 Column 4
});
var o5542096 = inline_dash_writer(",");
return o4431420(o5542096); // Line 265 Column 4
}))(); // Line 265 Column 4
write(")"); // Line 270 Column 5
return terminate_dash_expr(expr_p_,func); // Line 272 Column 5
});
var write_dash_raw_dash_code = (function(node){
if(arguments.length < 1) {
throw Error("write-raw-code: not enough arguments")
}
else if(arguments.length > 1) {
throw Error("write-raw-code: too many arguments");
}
return write(ast["node-data"](node)); // Line 275 Column 5
});
var write_dash_op = (function(op,vals,expr_p_,compile){
if(arguments.length < 4) {
throw Error("write-op: not enough arguments")
}
else if(arguments.length > 4) {
throw Error("write-op: too many arguments");
}
write("("); // Line 278 Column 5
((function() {var o6694181 = (function(op_dash_writer){
if(arguments.length < 1) {
throw Error("o6694181: not enough arguments")
}
else if(arguments.length > 1) {
throw Error("o6694181: too many arguments");
}
return for_dash_each((function(arg){
if(arguments.length < 1) {
throw Error("lambda: not enough arguments")
}
else if(arguments.length > 1) {
throw Error("lambda: too many arguments");
}
op_dash_writer(); // Line 279 Column 4
return compile(arg,true); // Line 279 Column 4
}),vals); // Line 279 Column 4
});
var o4478094 = inline_dash_writer(str(" ",op," "));
return o6694181(o4478094); // Line 279 Column 4
}))(); // Line 279 Column 4
write(")"); // Line 285 Column 5
return terminate_dash_expr(expr_p_); // Line 286 Column 5
});
var make_dash_op_dash_writer = (function(str){
if(arguments.length < 1) {
throw Error("make-op-writer: not enough arguments")
}
else if(arguments.length > 1) {
throw Error("make-op-writer: too many arguments");
}
return (function(vals,expr_p_,compile){
if(arguments.length < 3) {
throw Error("lambda: not enough arguments")
}
else if(arguments.length > 3) {
throw Error("lambda: too many arguments");
}
return write_dash_op(str,vals,expr_p_,compile); // Line 290 Column 7
}); // Line <unknown undefined> Column <unknown undefined>
});
var write_dash_require = (function(args,expr_p_,compile){
if(arguments.length < 3) {
throw Error("write-require: not enough arguments")
}
else if(arguments.length > 3) {
throw Error("write-require: too many arguments");
}
return for_dash_each((function(el){
if(arguments.length < 1) {
throw Error("lambda: not enough arguments")
}
else if(arguments.length > 1) {
throw Error("lambda: too many arguments");
}
write("var "); // Line 294 Column 17
write_dash_term(ast["first"](el),true); // Line 295 Column 17
write(" = require("); // Line 296 Column 17
write_dash_string(ast["node-data"](cadr(ast["node-data"](el))),true); // Line 297 Column 17
return write(");"); // Line 299 Column 17
}),args); // Line 293 Column 5
});
return dict("\uFDD0write-runtime",write_dash_runtime,"\uFDD0write-number",write_dash_number,"\uFDD0write-string",write_dash_string,"\uFDD0write-boolean",write_dash_boolean,"\uFDD0write-term",write_dash_term,"\uFDD0write-symbol",write_dash_symbol,"\uFDD0write-key",write_dash_key,"\uFDD0write-empty-list",write_dash_empty_dash_list,"\uFDD0write-define",write_dash_define,"\uFDD0write-set!",write_dash_set_excl_,"\uFDD0write-if",write_dash_if,"\uFDD0write-lambda",write_dash_lambda,"\uFDD0write-func-call",write_dash_func_dash_call,"\uFDD0write-raw-code",write_dash_raw_dash_code,"\uFDD0write-require",write_dash_require,"\uFDD0write-and",make_dash_op_dash_writer("&&"),"\uFDD0write-or",make_dash_op_dash_writer("||"),"\uFDD0write-add",make_dash_op_dash_writer("+"),"\uFDD0write-subtract",make_dash_op_dash_writer("-"),"\uFDD0write-multiply",make_dash_op_dash_writer("*"),"\uFDD0write-divide",make_dash_op_dash_writer("/"),"\uFDD0write-gt",make_dash_op_dash_writer(">"),"\uFDD0write-lt",make_dash_op_dash_writer("<"),"\uFDD0write-gteq",make_dash_op_dash_writer(">="),"\uFDD0write-lteq",make_dash_op_dash_writer("<="),"\uFDD0write-mod",make_dash_op_dash_writer("%"),"\uFDD0write-rshift",make_dash_op_dash_writer(">>"),"\uFDD0write-lshift",make_dash_op_dash_writer("<<"),"\uFDD0write-bitwise-or",make_dash_op_dash_writer("|"),"\uFDD0write-bitwise-and",make_dash_op_dash_writer("&"),"\uFDD0make-fresh",make_dash_fresh,"\uFDD0get-code",(function() {return code["join"](""); // Line 336 Column 25
})); // Line 302 Column 2
});
module["exports"] = generator;

