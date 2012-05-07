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


var reader = require("./reader");var ast = require("./ast");var js = require("./backends/js");var fs = require("fs");var self_dash_evaluating_p_ = (function(exp){
if(arguments.length < 1) {
throw Error("self-evaluating?: not enough arguments")
}
else if(arguments.length > 1) {
throw Error("self-evaluating?: too many arguments");
}
return (number_p_(exp) || string_p_(exp) || boolean_p_(exp) || null_p_(exp) || key_p_(exp)); // Line <unknown undefined> Column <unknown undefined>
});
var alternating_dash_map = (function(func,lst){
if(arguments.length < 2) {
throw Error("alternating-map: not enough arguments")
}
var former_p_ = vector_dash__gt_list(Array.prototype.slice.call(arguments, 2));
return ((function() {var loop = (function(lst,acc){
if(arguments.length < 2) {
throw Error("loop: not enough arguments")
}
else if(arguments.length > 2) {
throw Error("loop: too many arguments");
}
return (function() {if((null_p_(lst) || null_p_(cdr(lst)))) {return acc; // Line <unknown undefined> Column <unknown undefined>
} else {return vector("__tco_call",(function() {return loop(cddr(lst),cons((function() {if(not(null_p_(former_p_))) {return func(car(lst)); // Line 16 Column 2
} else {return car(lst); // Line 16 Column 2
}})()
,cons((function() {if(null_p_(former_p_)) {return func(cadr(lst)); // Line 16 Column 2
} else {return cadr(lst); // Line 16 Column 2
}})()
,acc))); // Line 16 Column 2
})); // Line 16 Column 2
}})()
; // Line <unknown undefined> Column <unknown undefined>
});
var o5795835 = lst;
var o5572010 = _emptylst;
return trampoline(loop(o5795835,o5572010)); // Line 16 Column 2
}))(); // Line 16 Column 2
});
var opt = (function(arg,def){
if(arguments.length < 2) {
throw Error("opt: not enough arguments")
}
else if(arguments.length > 2) {
throw Error("opt: too many arguments");
}
return (function() {if(null_p_(arg)) {return def; // Line <unknown undefined> Column <unknown undefined>
} else {return car(arg); // Line 31 Column 23
}})()
; // Line <unknown undefined> Column <unknown undefined>
});
var assert = (function(cnd,msg){
if(arguments.length < 2) {
throw Error("assert: not enough arguments")
}
else if(arguments.length > 2) {
throw Error("assert: too many arguments");
}
return (function() {if(not(cnd)) {throw(msg); // Line 35 Column 7
}})()
; // Line <unknown undefined> Column <unknown undefined>
});
var expand = (function(node){
if(arguments.length < 1) {
throw Error("expand: not enough arguments")
}
else if(arguments.length > 1) {
throw Error("expand: too many arguments");
}
return (function() {if(ast["atom?"](node)) {return ((function() {return node; // Line <unknown undefined> Column <unknown undefined>
}))(); // Line 40 Column 2
} else {return (function() {if(ast["vector?"](node)) {return ((function() {return ast["copy-node"](node,map((function(e){
if(arguments.length < 1) {
throw Error("lambda: not enough arguments")
}
else if(arguments.length > 1) {
throw Error("lambda: too many arguments");
}
return expand(e); // Line 40 Column 2
}),ast["node-data"](node))); // Line 40 Column 2
}))(); // Line 40 Column 2
} else {return (function() {if(ast["dict?"](node)) {return ((function() {return ast["copy-node"](node,map((function(e){
if(arguments.length < 1) {
throw Error("lambda: not enough arguments")
}
else if(arguments.length > 1) {
throw Error("lambda: too many arguments");
}
return expand(e); // Line 40 Column 2
}),ast["node-data"](node))); // Line 40 Column 2
}))(); // Line 40 Column 2
} else {return (function() {if((_eq__eq_(ast["first*"](node),"\uFDD1quote") || _eq__eq_(ast["first*"](node),"\uFDD1quasiquote"))) {return ((function() {return node; // Line <unknown undefined> Column <unknown undefined>
}))(); // Line 40 Column 2
} else {return (function() {if(_eq__eq_(ast["first*"](node),"\uFDD1lambda")) {return ((function() {return ast["copy-node"](node,cons(ast["first"](node),cons(cadr(ast["node-data"](node)),map((function(e){
if(arguments.length < 1) {
throw Error("lambda: not enough arguments")
}
else if(arguments.length > 1) {
throw Error("lambda: too many arguments");
}
return expand(e); // Line 40 Column 2
}),cddr(ast["node-data"](node)))))); // Line 40 Column 2
}))(); // Line 40 Column 2
} else {return (function() {if(macro_p_(ast["first*"](node))) {return ((function() {return ((function() {var o3569702 = (function(res){
if(arguments.length < 1) {
throw Error("o3569702: not enough arguments")
}
else if(arguments.length > 1) {
throw Error("o3569702: too many arguments");
}
return expand(sourcify(res,ast["node-lineno"](node),ast["node-colno"](node))); // Line 40 Column 2
});
var o7347088 = macro_dash_function(ast["first*"](node))(desourcify(node));
return o3569702(o7347088); // Line 40 Column 2
}))(); // Line 40 Column 2
}))(); // Line 40 Column 2
} else {return ((function() {return ast["copy-node"](node,map(expand,ast["node-data"](node))); // Line 40 Column 2
}))(); // Line 40 Column 2
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
var _per_macros = dict();
var macro_dash_function = (function(name){
if(arguments.length < 1) {
throw Error("macro-function: not enough arguments")
}
else if(arguments.length > 1) {
throw Error("macro-function: too many arguments");
}
return dict_dash_ref(_per_macros,name); // Line 72 Column 3
});
var install_dash_macro = (function(name,f){
if(arguments.length < 2) {
throw Error("install-macro: not enough arguments")
}
else if(arguments.length > 2) {
throw Error("install-macro: too many arguments");
}
return dict_dash_put_excl_(_per_macros,name,f); // Line 75 Column 3
});
var macro_p_ = (function(name){
if(arguments.length < 1) {
throw Error("macro?: not enough arguments")
}
else if(arguments.length > 1) {
throw Error("macro?: too many arguments");
}
return (symbol_p_(name) && dict_dash_ref(_per_macros,symbol_dash__gt_key(name)) && true); // Line <unknown undefined> Column <unknown undefined>
});
var macro_dash_generator = false;
var make_dash_macro = (function(pattern,body){
if(arguments.length < 2) {
throw Error("make-macro: not enough arguments")
}
else if(arguments.length > 2) {
throw Error("make-macro: too many arguments");
}
return ((function() {var o1315955 = (function(x){
if(arguments.length < 1) {
throw Error("o1315955: not enough arguments")
}
else if(arguments.length > 1) {
throw Error("o1315955: too many arguments");
}
return ((function() {var o3237643 = (function(s,p){
if(arguments.length < 2) {
throw Error("o3237643: not enough arguments")
}
else if(arguments.length > 2) {
throw Error("o3237643: too many arguments");
}
return eval(p); // Line 85 Column 2
});
var o4124518 = list("\uFDD1lambda",list(x),list("\uFDD1apply",list_dash_append(list("\uFDD1lambda",pattern),body),list("\uFDD1cdr",x)));
var o6822320 = compile_dash_program(o4124518,macro_dash_generator["make-fresh"]());
return o3237643(o4124518,o6822320); // Line 85 Column 2
}))(); // Line 85 Column 2
});
var o7361883 = gensym();
return o1315955(o7361883); // Line 85 Column 2
}))(); // Line 85 Column 2
});
var sourcify = (function(exp,lineno,colno){
if(arguments.length < 3) {
throw Error("sourcify: not enough arguments")
}
else if(arguments.length > 3) {
throw Error("sourcify: too many arguments");
}
return (function() {if((self_dash_evaluating_p_(exp) || symbol_p_(exp))) {return ((function() {return ast["make-node"]("\uFDD1ATOM",exp,lineno,colno); // Line 96 Column 2
}))(); // Line 96 Column 2
} else {return (function() {if(vector_p_(exp)) {return ((function() {return ast["make-node"]("\uFDD1VECTOR",map((function(e){
if(arguments.length < 1) {
throw Error("lambda: not enough arguments")
}
else if(arguments.length > 1) {
throw Error("lambda: too many arguments");
}
return sourcify(e,lineno,colno); // Line 96 Column 2
}),vector_dash__gt_list(exp)),lineno,colno); // Line 96 Column 2
}))(); // Line 96 Column 2
} else {return (function() {if(dict_p_(exp)) {return ((function() {return ast["make-node"]("\uFDD1DICT",map((function(e){
if(arguments.length < 1) {
throw Error("lambda: not enough arguments")
}
else if(arguments.length > 1) {
throw Error("lambda: too many arguments");
}
return sourcify(e,lineno,colno); // Line 96 Column 2
}),dict_dash__gt_list(exp)),lineno,colno); // Line 96 Column 2
}))(); // Line 96 Column 2
} else {return ((function() {return ast["make-node"]("\uFDD1LIST",map((function(e){
if(arguments.length < 1) {
throw Error("lambda: not enough arguments")
}
else if(arguments.length > 1) {
throw Error("lambda: too many arguments");
}
return sourcify(e,lineno,colno); // Line 96 Column 2
}),exp),lineno,colno); // Line 96 Column 2
}))(); // Line 96 Column 2
}})()
; // Line <unknown undefined> Column <unknown undefined>
}})()
; // Line <unknown undefined> Column <unknown undefined>
}})()
; // Line <unknown undefined> Column <unknown undefined>
});
var desourcify = (function(node){
if(arguments.length < 1) {
throw Error("desourcify: not enough arguments")
}
else if(arguments.length > 1) {
throw Error("desourcify: too many arguments");
}
return (function() {if(ast["atom?"](node)) {return ((function() {return ast["node-data"](node); // Line 116 Column 2
}))(); // Line 116 Column 2
} else {return (function() {if(ast["vector?"](node)) {return ((function() {return list_dash__gt_vector(map(desourcify,ast["node-data"](node))); // Line 116 Column 2
}))(); // Line 116 Column 2
} else {return (function() {if(ast["dict?"](node)) {return ((function() {return apply(dict,map(desourcify,ast["node-data"](node))); // Line 116 Column 2
}))(); // Line 116 Column 2
} else {return (function() {if(ast["list?"](node)) {return ((function() {return map(desourcify,ast["node-data"](node)); // Line 116 Column 2
}))(); // Line 116 Column 2
} else {return ((function() {throw(str("unknown node type: ",node)); // Line 116 Column 2
}))(); // Line 116 Column 2
}})()
; // Line <unknown undefined> Column <unknown undefined>
}})()
; // Line <unknown undefined> Column <unknown undefined>
}})()
; // Line <unknown undefined> Column <unknown undefined>
}})()
; // Line <unknown undefined> Column <unknown undefined>
});
install_dash_macro("\uFDD1define-macro",(function(form){
if(arguments.length < 1) {
throw Error("lambda: not enough arguments")
}
else if(arguments.length > 1) {
throw Error("lambda: too many arguments");
}
return ((function() {var o9688550 = (function(sig){
if(arguments.length < 1) {
throw Error("o9688550: not enough arguments")
}
else if(arguments.length > 1) {
throw Error("o9688550: too many arguments");
}
return ((function() {var o1201118 = (function(name,pattern,body){
if(arguments.length < 3) {
throw Error("o1201118: not enough arguments")
}
else if(arguments.length > 3) {
throw Error("o1201118: too many arguments");
}
install_dash_macro(name,make_dash_macro(pattern,body)); // Line 129 Column 3
return false; // Line <unknown undefined> Column <unknown undefined>
});
var o6259826 = car(sig);
var o4455939 = cdr(sig);
var o5810398 = cddr(form);
return o1201118(o6259826,o4455939,o5810398); // Line 129 Column 3
}))(); // Line 129 Column 3
});
var o122334 = cadr(form);
return o9688550(o122334); // Line 129 Column 3
}))(); // Line 129 Column 3
})); // Line 126 Column 1
install_dash_macro("\uFDD1begin",(function(form){
if(arguments.length < 1) {
throw Error("lambda: not enough arguments")
}
else if(arguments.length > 1) {
throw Error("lambda: too many arguments");
}
return list(list_dash_append(list("\uFDD1lambda",_emptylst),cdr(form))); // Line 140 Column 5
})); // Line 137 Column 1
install_dash_macro("\uFDD1cond",(function(form){
if(arguments.length < 1) {
throw Error("lambda: not enough arguments")
}
else if(arguments.length > 1) {
throw Error("lambda: too many arguments");
}
return (function() {if(null_p_(cdr(form))) {return false; // Line <unknown undefined> Column <unknown undefined>
} else {return ((function() {var o5395191 = (function(forms){
if(arguments.length < 1) {
throw Error("o5395191: not enough arguments")
}
else if(arguments.length > 1) {
throw Error("o5395191: too many arguments");
}
return ((function() {var o4388173 = (function(f){
if(arguments.length < 1) {
throw Error("o4388173: not enough arguments")
}
else if(arguments.length > 1) {
throw Error("o4388173: too many arguments");
}
return (function() {if(eq_p_(car(f),"\uFDD1else")) {return list_dash_append(list("\uFDD1begin"),cdr(f)); // Line 147 Column 7
} else {return list("\uFDD1if",car(f),list_dash_append(list("\uFDD1begin"),cdr(f)),list_dash_append(list("\uFDD1cond"),cdr(forms))); // Line 147 Column 7
}})()
; // Line <unknown undefined> Column <unknown undefined>
});
var o9320561 = car(forms);
return o4388173(o9320561); // Line 147 Column 7
}))(); // Line 147 Column 7
});
var o4096639 = cdr(form);
return o5395191(o4096639); // Line 147 Column 7
}))(); // Line 147 Column 7
}})()
; // Line <unknown undefined> Column <unknown undefined>
})); // Line 142 Column 1
install_dash_macro("\uFDD1let",(function(form){
if(arguments.length < 1) {
throw Error("lambda: not enough arguments")
}
else if(arguments.length > 1) {
throw Error("lambda: too many arguments");
}
var replace = (function(expr,old,sym){
if(arguments.length < 3) {
throw Error("replace: not enough arguments")
}
else if(arguments.length > 3) {
throw Error("replace: too many arguments");
}
return (function() {if(symbol_p_(expr)) {return ((function() {return (function() {if(_eq__eq_(expr,old)) {return sym; // Line <unknown undefined> Column <unknown undefined>
} else {return expr; // Line <unknown undefined> Column <unknown undefined>
}})()
; // Line <unknown undefined> Column <unknown undefined>
}))(); // Line 160 Column 5
} else {return (function() {if(literal_p_(expr)) {return ((function() {return expr; // Line <unknown undefined> Column <unknown undefined>
}))(); // Line 160 Column 5
} else {return (function() {if(dict_p_(expr)) {return ((function() {return dict_dash_map((function(e){
if(arguments.length < 1) {
throw Error("lambda: not enough arguments")
}
else if(arguments.length > 1) {
throw Error("lambda: too many arguments");
}
return replace(e,old,sym); // Line 160 Column 5
}),expr); // Line 160 Column 5
}))(); // Line 160 Column 5
} else {return (function() {if(vector_p_(expr)) {return ((function() {return vector_dash_map((function(e){
if(arguments.length < 1) {
throw Error("lambda: not enough arguments")
}
else if(arguments.length > 1) {
throw Error("lambda: too many arguments");
}
return replace(e,old,sym); // Line 160 Column 5
}),expr); // Line 160 Column 5
}))(); // Line 160 Column 5
} else {return (function() {if(list_p_(expr)) {return ((function() {return map((function(e){
if(arguments.length < 1) {
throw Error("lambda: not enough arguments")
}
else if(arguments.length > 1) {
throw Error("lambda: too many arguments");
}
return replace(e,old,sym); // Line 160 Column 5
}),expr); // Line 160 Column 5
}))(); // Line 160 Column 5
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
});
var generate_dash_defs = (function(syms,exprs){
if(arguments.length < 2) {
throw Error("generate-defs: not enough arguments")
}
else if(arguments.length > 2) {
throw Error("generate-defs: too many arguments");
}
return reverse(((function() {var loop = (function(lst,forms,vars,acc){
if(arguments.length < 4) {
throw Error("loop: not enough arguments")
}
else if(arguments.length > 4) {
throw Error("loop: too many arguments");
}
return (function() {if(null_p_(lst)) {return acc; // Line <unknown undefined> Column <unknown undefined>
} else {return ((function() {var o9034357 = (function(sym,name,code){
if(arguments.length < 3) {
throw Error("o9034357: not enough arguments")
}
else if(arguments.length > 3) {
throw Error("o9034357: too many arguments");
}
return vector("__tco_call",(function() {return loop(cdr(lst),cdr(forms),dict_dash_merge(vars,dict(name,sym)),cons(list("\uFDD1define",car(lst),fold((function(el,acc){
if(arguments.length < 2) {
throw Error("lambda: not enough arguments")
}
else if(arguments.length > 2) {
throw Error("lambda: too many arguments");
}
return replace(acc,key_dash__gt_symbol(el),dict_dash_ref(vars,el)); // Line 174 Column 6
}),code,keys(vars))),acc)); // Line 174 Column 6
})); // Line 174 Column 6
});
var o7270414 = car(lst);
var o4537751 = car(car(forms));
var o4073463 = cadar(forms);
return o9034357(o7270414,o4537751,o4073463); // Line 174 Column 6
}))(); // Line 174 Column 6
}})()
; // Line <unknown undefined> Column <unknown undefined>
});
var o2121039 = syms;
var o4234901 = exprs;
var o75341 = dict();
var o2994509 = _emptylst;
return trampoline(loop(o2121039,o4234901,o75341,o2994509)); // Line 174 Column 6
}))()); // Line 173 Column 6
});
var tco = (function(exprs,exit){
if(arguments.length < 2) {
throw Error("tco: not enough arguments")
}
else if(arguments.length > 2) {
throw Error("tco: too many arguments");
}
var if_p_ = (function(expr){
if(arguments.length < 1) {
throw Error("if?: not enough arguments")
}
else if(arguments.length > 1) {
throw Error("if?: too many arguments");
}
return (list_p_(expr) && _eq__eq_(car(expr),"\uFDD1if")); // Line <unknown undefined> Column <unknown undefined>
});
var let_p_ = (function(expr){
if(arguments.length < 1) {
throw Error("let?: not enough arguments")
}
else if(arguments.length > 1) {
throw Error("let?: too many arguments");
}
return (list_p_(expr) && _eq__eq_(car(expr),"\uFDD1let")); // Line <unknown undefined> Column <unknown undefined>
});
var begin_p_ = (function(expr){
if(arguments.length < 1) {
throw Error("begin?: not enough arguments")
}
else if(arguments.length > 1) {
throw Error("begin?: too many arguments");
}
return (list_p_(expr) && _eq__eq_(car(expr),"\uFDD1begin")); // Line <unknown undefined> Column <unknown undefined>
});
var tco_p_ = (function(expr){
if(arguments.length < 1) {
throw Error("tco?: not enough arguments")
}
else if(arguments.length > 1) {
throw Error("tco?: too many arguments");
}
return (list_p_(expr) && _eq__eq_(car(expr),exit)); // Line <unknown undefined> Column <unknown undefined>
});
var process_dash_if = (function(expr,transform){
if(arguments.length < 2) {
throw Error("process-if: not enough arguments")
}
else if(arguments.length > 2) {
throw Error("process-if: too many arguments");
}
return (function() {if(null_p_(cdddr(expr))) {return list("\uFDD1if",cadr(expr),transform(caddr(expr))); // Line 212 Column 13
} else {return list("\uFDD1if",cadr(expr),transform(caddr(expr)),transform(car(cdddr(expr)))); // Line 214 Column 13
}})()
; // Line <unknown undefined> Column <unknown undefined>
});
return ((function() {var o7307413 = (function(rexprs){
if(arguments.length < 1) {
throw Error("o7307413: not enough arguments")
}
else if(arguments.length > 1) {
throw Error("o7307413: too many arguments");
}
return ((function() {var o8814397 = (function(bottom){
if(arguments.length < 1) {
throw Error("o8814397: not enough arguments")
}
else if(arguments.length > 1) {
throw Error("o8814397: too many arguments");
}
return (function() {if(if_p_(bottom)) {return ((function() {return reverse(cons(process_dash_if(bottom,(function(expr){
if(arguments.length < 1) {
throw Error("lambda: not enough arguments")
}
else if(arguments.length > 1) {
throw Error("lambda: too many arguments");
}
return (function() {if(begin_p_(expr)) {return ((function() {return tco(expr,exit); // Line 218 Column 5
}))(); // Line 218 Column 5
} else {return (function() {if(let_p_(expr)) {return ((function() {return tco(expr,exit); // Line 218 Column 5
}))(); // Line 218 Column 5
} else {return ((function() {return car(tco(list(expr),exit)); // Line 218 Column 5
}))(); // Line 218 Column 5
}})()
; // Line <unknown undefined> Column <unknown undefined>
}})()
; // Line <unknown undefined> Column <unknown undefined>
})),cdr(rexprs))); // Line 218 Column 5
}))(); // Line 218 Column 5
} else {return (function() {if(let_p_(bottom)) {return ((function() {return reverse(cons(tco(bottom,exit),cdr(rexprs))); // Line 218 Column 5
}))(); // Line 218 Column 5
} else {return ((function() {return (function() {if(tco_p_(bottom)) {return reverse(cons(list("\uFDD1vector","__tco_call",list("\uFDD1lambda",_emptylst,bottom)),cdr(rexprs))); // Line 218 Column 5
} else {return exprs; // Line <unknown undefined> Column <unknown undefined>
}})()
; // Line <unknown undefined> Column <unknown undefined>
}))(); // Line 218 Column 5
}})()
; // Line <unknown undefined> Column <unknown undefined>
}})()
; // Line <unknown undefined> Column <unknown undefined>
});
var o2196090 = car(rexprs);
return o8814397(o2196090); // Line 218 Column 5
}))(); // Line 218 Column 5
});
var o2090799 = reverse(exprs);
return o7307413(o2090799); // Line 218 Column 5
}))(); // Line 218 Column 5
});
var tco_dash_call_p_ = (function(name,expr){
if(arguments.length < 2) {
throw Error("tco-call?: not enough arguments")
}
else if(arguments.length > 2) {
throw Error("tco-call?: too many arguments");
}
var _tco_p_ = (function(expr){
if(arguments.length < 1) {
throw Error("_tco?: not enough arguments")
}
else if(arguments.length > 1) {
throw Error("_tco?: too many arguments");
}
return (list_p_(expr) && _eq_(car(expr),"\uFDD1vector") && _eq_(cadr(expr),"__tco_call") && ((function() {var o7301263 = (function(lamb){
if(arguments.length < 1) {
throw Error("o7301263: not enough arguments")
}
else if(arguments.length > 1) {
throw Error("o7301263: too many arguments");
}
return ((function() {var o2912970 = (function(body){
if(arguments.length < 1) {
throw Error("o2912970: not enough arguments")
}
else if(arguments.length > 1) {
throw Error("o2912970: too many arguments");
}
return _eq_(car(body),name); // Line 247 Column 12
});
var o4595518 = caddr(lamb);
return o2912970(o4595518); // Line 247 Column 12
}))(); // Line 247 Column 12
});
var o8643675 = caddr(expr);
return o7301263(o8643675); // Line 247 Column 12
}))()); // Line <unknown undefined> Column <unknown undefined>
});
return (function() {if(list_p_(expr)) {return (_tco_p_(expr) || fold((function(el,acc){
if(arguments.length < 2) {
throw Error("lambda: not enough arguments")
}
else if(arguments.length > 2) {
throw Error("lambda: too many arguments");
}
return (acc || tco_dash_call_p_(name,el)); // Line <unknown undefined> Column <unknown undefined>
}),false,expr)); // Line <unknown undefined> Column <unknown undefined>
} else {return false; // Line <unknown undefined> Column <unknown undefined>
}})()
; // Line <unknown undefined> Column <unknown undefined>
});
return ((function() {var o5418786 = (function(name,forms){
if(arguments.length < 2) {
throw Error("o5418786: not enough arguments")
}
else if(arguments.length > 2) {
throw Error("o5418786: too many arguments");
}
assert((null_p_(forms) || (list_p_(forms) && list_p_(car(forms)))),str("invalid let: ",form)); // Line 262 Column 3
return ((function() {var o9535608 = (function(syms,body){
if(arguments.length < 2) {
throw Error("o9535608: not enough arguments")
}
else if(arguments.length > 2) {
throw Error("o9535608: too many arguments");
}
return ((function() {var o6880753 = (function(tco_dash_ed){
if(arguments.length < 1) {
throw Error("o6880753: not enough arguments")
}
else if(arguments.length > 1) {
throw Error("o6880753: too many arguments");
}
return list(list_dash_append(list("\uFDD1lambda",_emptylst,list_dash_append(list("\uFDD1define",list_dash_append(list(name),map(car,forms))),tco_dash_ed)),list_dash_append(generate_dash_defs(syms,forms),(function() {if(tco_dash_call_p_(name,tco_dash_ed)) {return list(list("\uFDD1trampoline",list_dash_append(list(name),syms))); // Line 262 Column 3
} else {return list(list_dash_append(list(name),syms)); // Line 262 Column 3
}})()
))); // Line 262 Column 3
});
var o127696 = tco(body,name);
return o6880753(o127696); // Line 262 Column 3
}))(); // Line 262 Column 3
});
var o5519133 = map((function(el){
if(arguments.length < 1) {
throw Error("lambda: not enough arguments")
}
else if(arguments.length > 1) {
throw Error("lambda: too many arguments");
}
return gensym(); // Line 262 Column 3
}),forms);
var o9881680 = (function() {if(symbol_p_(cadr(form))) {return cdddr(form); // Line 262 Column 3
} else {return cddr(form); // Line 262 Column 3
}})()
;
return o9535608(o5519133,o9881680); // Line 262 Column 3
}))(); // Line 262 Column 3
});
var o3843282 = (function() {if(symbol_p_(cadr(form))) {return cadr(form); // Line 262 Column 3
} else {return gensym(); // Line 262 Column 3
}})()
;
var o1495346 = (function() {if(symbol_p_(cadr(form))) {return caddr(form); // Line 262 Column 3
} else {return cadr(form); // Line 262 Column 3
}})()
;
return o5418786(o3843282,o1495346); // Line 262 Column 3
}))(); // Line 262 Column 3
})); // Line 156 Column 1
install_dash_macro("\uFDD1eval",(function(form){
if(arguments.length < 1) {
throw Error("lambda: not enough arguments")
}
else if(arguments.length > 1) {
throw Error("lambda: too many arguments");
}
return list(list("\uFDD1%raw","eval"),list("\uFDD1__compiler.compile-program",cadr(form),list("\uFDD1__generator"))); // Line 295 Column 5
})); // Line 292 Column 1
var _natives_ = dict();
var native_dash_function = (function(name){
if(arguments.length < 1) {
throw Error("native-function: not enough arguments")
}
else if(arguments.length > 1) {
throw Error("native-function: too many arguments");
}
return dict_dash_ref(_natives_,name); // Line 311 Column 3
});
var install_dash_native = (function(name,func,validator){
if(arguments.length < 3) {
throw Error("install-native: not enough arguments")
}
else if(arguments.length > 3) {
throw Error("install-native: too many arguments");
}
return dict_dash_put_excl_(_natives_,name,(function(node,gen,expr_p_,compile_star_){
if(arguments.length < 4) {
throw Error("lambda: not enough arguments")
}
else if(arguments.length > 4) {
throw Error("lambda: too many arguments");
}
validator(node); // Line 317 Column 16
return dict_dash_ref(gen,func)(cdr(ast["node-data"](node)),expr_p_,compile_star_); // Line 318 Column 16
})); // Line 314 Column 3
});
var native_p_ = (function(name){
if(arguments.length < 1) {
throw Error("native?: not enough arguments")
}
else if(arguments.length > 1) {
throw Error("native?: too many arguments");
}
return (symbol_p_(name) && not(_eq__eq_(dict_dash_ref(_natives_,symbol_dash__gt_key(name)),undefined))); // Line <unknown undefined> Column <unknown undefined>
});
var verify_dash_not_dash_single = (function(node){
if(arguments.length < 1) {
throw Error("verify-not-single: not enough arguments")
}
else if(arguments.length > 1) {
throw Error("verify-not-single: too many arguments");
}
return assert((length(ast["node-data"](node)) > 1),str("form requires at least one operand:",inspect(desourcify(node)))); // Line 326 Column 3
});
install_dash_native("\uFDD0and","\uFDD1write-and",verify_dash_not_dash_single); // Line 330 Column 1
install_dash_native("\uFDD0or","\uFDD1write-or",verify_dash_not_dash_single); // Line 331 Column 1
install_dash_native("\uFDD0+","\uFDD1write-add",verify_dash_not_dash_single); // Line 332 Column 1
install_dash_native("\uFDD0-","\uFDD1write-subtract",verify_dash_not_dash_single); // Line 333 Column 1
install_dash_native("\uFDD0*","\uFDD1write-multiply",verify_dash_not_dash_single); // Line 334 Column 1
install_dash_native("\uFDD0/","\uFDD1write-divide",verify_dash_not_dash_single); // Line 335 Column 1
install_dash_native("\uFDD0>","\uFDD1write-gt",verify_dash_not_dash_single); // Line 336 Column 1
install_dash_native("\uFDD0<","\uFDD1write-lt",verify_dash_not_dash_single); // Line 337 Column 1
install_dash_native("\uFDD0<=","\uFDD1write-lteq",verify_dash_not_dash_single); // Line 338 Column 1
install_dash_native("\uFDD0>=","\uFDD1write-gteq",verify_dash_not_dash_single); // Line 339 Column 1
install_dash_native("\uFDD0>>","\uFDD1write-rshift",verify_dash_not_dash_single); // Line 340 Column 1
install_dash_native("\uFDD0<<","\uFDD1write-lshift",verify_dash_not_dash_single); // Line 341 Column 1
install_dash_native("\uFDD0bitwise-or","\uFDD1write-bitwise-or",verify_dash_not_dash_single); // Line 342 Column 1
install_dash_native("\uFDD0bitwise-and","\uFDD1write-bitwise-and",verify_dash_not_dash_single); // Line 343 Column 1
install_dash_native("\uFDD0%","\uFDD1write-mod",verify_dash_not_dash_single); // Line 344 Column 1
install_dash_native("\uFDD0require","\uFDD1write-require",(function(node){
if(arguments.length < 1) {
throw Error("lambda: not enough arguments")
}
else if(arguments.length > 1) {
throw Error("lambda: too many arguments");
}
verify_dash_not_dash_single(node); // Line 348 Column 19
return for_dash_each((function(el){
if(arguments.length < 1) {
throw Error("lambda: not enough arguments")
}
else if(arguments.length > 1) {
throw Error("lambda: too many arguments");
}
return assert((ast["list?"](el) && eq_p_(length(ast["node-data"](el)),2)),str("require needs a list of ","2 element lists: ",inspect(desourcify(el)))); // Line 351 Column 22
}),cdr(ast["node-data"](node))); // Line 349 Column 19
})); // Line 346 Column 1
var apply_dash_node = (function(func_dash_name,node){
if(arguments.length < 2) {
throw Error("apply-node: not enough arguments")
}
var quoted_p_ = vector_dash__gt_list(Array.prototype.slice.call(arguments, 2));
return ((function() {var o7309752 = (function(quoted_p_){
if(arguments.length < 1) {
throw Error("o7309752: not enough arguments")
}
else if(arguments.length > 1) {
throw Error("o7309752: too many arguments");
}
return ast["prepend"](ast["make-atom"](func_dash_name,node),(function() {if(quoted_p_) {return ast["map-children"]((function(e){
if(arguments.length < 1) {
throw Error("lambda: not enough arguments")
}
else if(arguments.length > 1) {
throw Error("lambda: too many arguments");
}
return ast["make-list"](ast["make-atom"]("\uFDD1quote",node),e); // Line 363 Column 2
}),node); // Line 363 Column 2
} else {return node; // Line <unknown undefined> Column <unknown undefined>
}})()
); // Line 363 Column 2
});
var o8631476 = opt(quoted_p_,false);
return o7309752(o8631476); // Line 363 Column 2
}))(); // Line 363 Column 2
});
var apply_dash_w_slash_unquote = (function(func_dash_name,node){
if(arguments.length < 2) {
throw Error("apply-w/unquote: not enough arguments")
}
else if(arguments.length > 2) {
throw Error("apply-w/unquote: too many arguments");
}
return ast["prepend"](ast["make-atom"](func_dash_name,node),ast["map-children"]((function(e){
if(arguments.length < 1) {
throw Error("lambda: not enough arguments")
}
else if(arguments.length > 1) {
throw Error("lambda: too many arguments");
}
return (function() {if((ast["list?"](e) && _eq__eq_(ast["first*"](e),"\uFDD1unquote"))) {return cadr(ast["node-data"](e)); // Line 381 Column 11
} else {return (function() {if((ast["list?"](e) && _eq__eq_(ast["first*"](e),"\uFDD1key"))) {return ast["make-list"](ast["make-atom"]("\uFDD1quasiquote",node),cadr(ast["node-data"](e))); // Line 384 Column 15
} else {return ast["make-list"](ast["make-atom"]("\uFDD1quasiquote",node),e); // Line 386 Column 15
}})()
; // Line <unknown undefined> Column <unknown undefined>
}})()
; // Line <unknown undefined> Column <unknown undefined>
}),node)); // Line 375 Column 3
});
var split_dash_splices = (function(lst,func_dash_name){
if(arguments.length < 2) {
throw Error("split-splices: not enough arguments")
}
else if(arguments.length > 2) {
throw Error("split-splices: too many arguments");
}
var make_dash_splice = (function(lst){
if(arguments.length < 1) {
throw Error("make-splice: not enough arguments")
}
else if(arguments.length > 1) {
throw Error("make-splice: too many arguments");
}
return (function() {if((self_dash_evaluating_p_(lst) || symbol_p_(lst))) {return apply_dash_w_slash_unquote(func_dash_name,ast["make-list*"](list(lst))); // Line 393 Column 9
} else {return apply_dash_w_slash_unquote(func_dash_name,ast["make-list*"](lst)); // Line 394 Column 9
}})()
; // Line <unknown undefined> Column <unknown undefined>
});
return ((function() {var loop = (function(nodes,slices,acc){
if(arguments.length < 3) {
throw Error("loop: not enough arguments")
}
else if(arguments.length > 3) {
throw Error("loop: too many arguments");
}
return (function() {if(null_p_(nodes)) {return reverse((function() {if(null_p_(acc)) {return slices; // Line <unknown undefined> Column <unknown undefined>
} else {return cons(make_dash_splice(reverse(acc)),slices); // Line 396 Column 2
}})()
); // Line 396 Column 2
} else {return ((function() {var o6112172 = (function(node){
if(arguments.length < 1) {
throw Error("o6112172: not enough arguments")
}
else if(arguments.length > 1) {
throw Error("o6112172: too many arguments");
}
return (function() {if((ast["list?"](node) && _eq__eq_(ast["first*"](node),"\uFDD1unquote-splicing"))) {return ((function() {var o8474856 = (function(el){
if(arguments.length < 1) {
throw Error("o8474856: not enough arguments")
}
else if(arguments.length > 1) {
throw Error("o8474856: too many arguments");
}
return vector("__tco_call",(function() {return loop(cdr(nodes),cons(el,(function() {if(null_p_(acc)) {return slices; // Line <unknown undefined> Column <unknown undefined>
} else {return cons(make_dash_splice(reverse(acc)),slices); // Line 396 Column 2
}})()
),_emptylst); // Line 396 Column 2
})); // Line 396 Column 2
});
var o7431361 = cadr(ast["node-data"](node));
return o8474856(o7431361); // Line 396 Column 2
}))(); // Line 396 Column 2
} else {return vector("__tco_call",(function() {return loop(cdr(nodes),slices,cons(node,acc)); // Line 396 Column 2
})); // Line 396 Column 2
}})()
; // Line <unknown undefined> Column <unknown undefined>
});
var o8739449 = car(nodes);
return o6112172(o8739449); // Line 396 Column 2
}))(); // Line 396 Column 2
}})()
; // Line <unknown undefined> Column <unknown undefined>
});
var o5432975 = lst;
var o4275193 = _emptylst;
var o8032251 = _emptylst;
return trampoline(loop(o5432975,o4275193,o8032251)); // Line 396 Column 2
}))(); // Line 396 Column 2
});
var quasiquote_dash_split = (function(append_dash_name,func_dash_name,node){
if(arguments.length < 3) {
throw Error("quasiquote-split: not enough arguments")
}
else if(arguments.length > 3) {
throw Error("quasiquote-split: too many arguments");
}
return ((function() {var o396761 = (function(slices){
if(arguments.length < 1) {
throw Error("o396761: not enough arguments")
}
else if(arguments.length > 1) {
throw Error("o396761: too many arguments");
}
return (function() {if(_eq__eq_(length(slices),1)) {return car(slices); // Line 421 Column 2
} else {return apply_dash_node(append_dash_name,ast["make-list*"](slices)); // Line 421 Column 2
}})()
; // Line <unknown undefined> Column <unknown undefined>
});
var o9400948 = split_dash_splices(ast["node-data"](node),func_dash_name);
return o396761(o9400948); // Line 421 Column 2
}))(); // Line 421 Column 2
});
var compile_dash_object = (function(node,generator,quoted_p_,expr_p_){
if(arguments.length < 4) {
throw Error("compile-object: not enough arguments")
}
else if(arguments.length > 4) {
throw Error("compile-object: too many arguments");
}
return ((function() {var o5289633 = (function(exp){
if(arguments.length < 1) {
throw Error("o5289633: not enough arguments")
}
else if(arguments.length > 1) {
throw Error("o5289633: too many arguments");
}
return (function() {if(key_p_(exp)) {return ((function() {return generator["write-key"](exp,expr_p_); // Line 427 Column 2
}))(); // Line 427 Column 2
} else {return (function() {if(symbol_p_(exp)) {return ((function() {return generator["write-symbol"](exp,expr_p_); // Line 427 Column 2
}))(); // Line 427 Column 2
} else {return (function() {if(number_p_(exp)) {return ((function() {return generator["write-number"](exp,expr_p_); // Line 427 Column 2
}))(); // Line 427 Column 2
} else {return (function() {if(boolean_p_(exp)) {return ((function() {return generator["write-boolean"](exp,expr_p_); // Line 427 Column 2
}))(); // Line 427 Column 2
} else {return (function() {if(string_p_(exp)) {return ((function() {return generator["write-string"](exp,expr_p_); // Line 427 Column 2
}))(); // Line 427 Column 2
} else {return (function() {if(ast["dict?"](node)) {return ((function() {return compile(apply_dash_node("\uFDD1dict",node,quoted_p_),generator,expr_p_); // Line 427 Column 2
}))(); // Line 427 Column 2
} else {return (function() {if(ast["vector?"](node)) {return ((function() {return compile(apply_dash_node("\uFDD1vector",node,quoted_p_),generator,expr_p_); // Line 427 Column 2
}))(); // Line 427 Column 2
} else {return (function() {if(null_p_(exp)) {return ((function() {return generator["write-empty-list"](exp,expr_p_); // Line 427 Column 2
}))(); // Line 427 Column 2
} else {return (function() {if(ast["list?"](node)) {return ((function() {return compile(apply_dash_node("\uFDD1list",node,quoted_p_),generator,expr_p_); // Line 427 Column 2
}))(); // Line 427 Column 2
} else {return ((function() {throw(str("compile-object: unknown type: ",exp)); // Line 427 Column 2
}))(); // Line 427 Column 2
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
}})()
; // Line <unknown undefined> Column <unknown undefined>
}})()
; // Line <unknown undefined> Column <unknown undefined>
});
var o2847939 = ast["node-data"](node);
return o5289633(o2847939); // Line 427 Column 2
}))(); // Line 427 Column 2
});
var compile_dash_quasi = (function(node,generator,expr_p_){
if(arguments.length < 3) {
throw Error("compile-quasi: not enough arguments")
}
else if(arguments.length > 3) {
throw Error("compile-quasi: too many arguments");
}
return (function() {if(ast["list?"](node)) {return ((function() {return compile(quasiquote_dash_split("\uFDD1list-append","\uFDD1list",node),generator,expr_p_); // Line 446 Column 2
}))(); // Line 446 Column 2
} else {return (function() {if(ast["vector?"](node)) {return ((function() {return compile(quasiquote_dash_split("\uFDD1vector-concat","\uFDD1vector",node),generator,expr_p_); // Line 446 Column 2
}))(); // Line 446 Column 2
} else {return (function() {if(ast["dict?"](node)) {return ((function() {return compile(quasiquote_dash_split("\uFDD1dict-merge","\uFDD1dict",node),generator,expr_p_); // Line 446 Column 2
}))(); // Line 446 Column 2
} else {return ((function() {return compile_dash_object(node,generator,true,expr_p_); // Line 446 Column 2
}))(); // Line 446 Column 2
}})()
; // Line <unknown undefined> Column <unknown undefined>
}})()
; // Line <unknown undefined> Column <unknown undefined>
}})()
; // Line <unknown undefined> Column <unknown undefined>
});
var compile_dash_reference = (function(node,generator){
if(arguments.length < 2) {
throw Error("compile-reference: not enough arguments")
}
var expr_p_ = vector_dash__gt_list(Array.prototype.slice.call(arguments, 2));
return generator["write-term"](node,opt(expr_p_,false)); // Line 457 Column 3
});
var compile_dash_if = (function(node,generator,expr_p_,compile_star_){
if(arguments.length < 4) {
throw Error("compile-if: not enough arguments")
}
else if(arguments.length > 4) {
throw Error("compile-if: too many arguments");
}
return ((function() {var o7264645 = (function(nodes,cnd,tru,alt){
if(arguments.length < 4) {
throw Error("o7264645: not enough arguments")
}
else if(arguments.length > 4) {
throw Error("o7264645: too many arguments");
}
return generator["write-if"](cnd,tru,alt,expr_p_,compile_star_); // Line 460 Column 2
});
var o8253790 = ast["node-data"](node);
var o3832809 = cadr(o8253790);
var o1291353 = caddr(o8253790);
var o6537187 = (function() {if(null_p_(cdddr(o8253790))) {return false; // Line <unknown undefined> Column <unknown undefined>
} else {return car(cdddr(o8253790)); // Line 460 Column 2
}})()
;
return o7264645(o8253790,o3832809,o1291353,o6537187); // Line 460 Column 2
}))(); // Line 460 Column 2
});
var compile_dash_lambda = (function(node,generator,expr_p_,compile_star_){
if(arguments.length < 4) {
throw Error("compile-lambda: not enough arguments")
}
else if(arguments.length > 4) {
throw Error("compile-lambda: too many arguments");
}
return generator["write-lambda"](node,expr_p_,compile_star_); // Line 469 Column 3
});
var compile_dash_set_excl_ = (function(node,generator,compile_star_){
if(arguments.length < 3) {
throw Error("compile-set!: not enough arguments")
}
else if(arguments.length > 3) {
throw Error("compile-set!: too many arguments");
}
return generator["write-set!"](cadr(ast["node-data"](node)),caddr(ast["node-data"](node)),compile_star_); // Line 472 Column 3
});
var compile_dash_define = (function(node,generator,compile_star_){
if(arguments.length < 3) {
throw Error("compile-define: not enough arguments")
}
else if(arguments.length > 3) {
throw Error("compile-define: too many arguments");
}
return ((function() {var o8378405 = (function(target){
if(arguments.length < 1) {
throw Error("o8378405: not enough arguments")
}
else if(arguments.length > 1) {
throw Error("o8378405: too many arguments");
}
return (function() {if(ast["list?"](target)) {return ((function() {var o2331387 = (function(name,args,body){
if(arguments.length < 3) {
throw Error("o2331387: not enough arguments")
}
else if(arguments.length > 3) {
throw Error("o2331387: too many arguments");
}
return generator["write-define"](name,ast["make-list*"](cons(ast["make-node-w/extra"]("\uFDD1ATOM","\uFDD1lambda",ast["node-data"](name),ast["node-lineno"](name),ast["node-colno"](name)),cons((function() {if(null_p_(args)) {return ast["make-empty-list"](name); // Line 477 Column 2
} else {return ast["make-list*"](args); // Line 477 Column 2
}})()
,body))),compile_star_); // Line 477 Column 2
});
var o9227785 = ast["first"](target);
var o3510498 = cdr(ast["node-data"](target));
var o7924147 = cddr(ast["node-data"](node));
return o2331387(o9227785,o3510498,o7924147); // Line 477 Column 2
}))(); // Line 477 Column 2
} else {return generator["write-define"](target,caddr(ast["node-data"](node)),compile_star_); // Line 477 Column 2
}})()
; // Line <unknown undefined> Column <unknown undefined>
});
var o1862337 = cadr(ast["node-data"](node));
return o8378405(o1862337); // Line 477 Column 2
}))(); // Line 477 Column 2
});
var compile = (function(node,generator){
if(arguments.length < 2) {
throw Error("compile: not enough arguments")
}
var expr_p_ = vector_dash__gt_list(Array.prototype.slice.call(arguments, 2));
var compile_star_ = (function(node){
if(arguments.length < 1) {
throw Error("compile*: not enough arguments")
}
var expr_p_ = vector_dash__gt_list(Array.prototype.slice.call(arguments, 1));
return compile(node,generator,opt(expr_p_,false)); // Line 500 Column 5
});
return ((function() {var o432308 = (function(expr_p_){
if(arguments.length < 1) {
throw Error("o432308: not enough arguments")
}
else if(arguments.length > 1) {
throw Error("o432308: too many arguments");
}
return (function() {if(self_dash_evaluating_p_(ast["node-data"](node))) {return ((function() {return compile_dash_object(node,generator,false,expr_p_); // Line 502 Column 2
}))(); // Line 502 Column 2
} else {return (function() {if(symbol_p_(ast["node-data"](node))) {return ((function() {return compile_dash_reference(node,generator,expr_p_); // Line 502 Column 2
}))(); // Line 502 Column 2
} else {return (function() {if(ast["vector?"](node)) {return ((function() {return compile_dash_object(node,generator,false,expr_p_); // Line 502 Column 2
}))(); // Line 502 Column 2
} else {return (function() {if(ast["dict?"](node)) {return ((function() {return compile_dash_object(node,generator,false,expr_p_); // Line 502 Column 2
}))(); // Line 502 Column 2
} else {return (function() {if(ast["list?"](node)) {return ((function() {return ((function() {var o6532258 = (function(sym){
if(arguments.length < 1) {
throw Error("o6532258: not enough arguments")
}
else if(arguments.length > 1) {
throw Error("o6532258: too many arguments");
}
return (function() {if(_eq__eq_(sym,"\uFDD1quote")) {return ((function() {return compile_dash_object(cadr(ast["node-data"](node)),generator,true,expr_p_); // Line 502 Column 2
}))(); // Line 502 Column 2
} else {return (function() {if(_eq__eq_(sym,"\uFDD1quasiquote")) {return ((function() {return compile_dash_quasi(cadr(ast["node-data"](node)),generator,expr_p_); // Line 502 Column 2
}))(); // Line 502 Column 2
} else {return (function() {if(_eq__eq_(sym,"\uFDD1if")) {return ((function() {return compile_dash_if(node,generator,expr_p_,compile_star_); // Line 502 Column 2
}))(); // Line 502 Column 2
} else {return (function() {if(_eq__eq_(sym,"\uFDD1lambda")) {return ((function() {return compile_dash_lambda(node,generator,expr_p_,compile_star_); // Line 502 Column 2
}))(); // Line 502 Column 2
} else {return (function() {if(_eq__eq_(sym,"\uFDD1set!")) {return ((function() {return compile_dash_set_excl_(node,generator,compile_star_); // Line 502 Column 2
}))(); // Line 502 Column 2
} else {return (function() {if(_eq__eq_(sym,"\uFDD1define")) {return ((function() {return compile_dash_define(node,generator,compile_star_); // Line 502 Column 2
}))(); // Line 502 Column 2
} else {return (function() {if(_eq__eq_(sym,"\uFDD1%raw")) {return ((function() {return generator["write-raw-code"](cadr(ast["node-data"](node))); // Line 502 Column 2
}))(); // Line 502 Column 2
} else {return (function() {if(native_p_(sym)) {return ((function() {return native_dash_function(sym)(node,generator,expr_p_,compile_star_); // Line 502 Column 2
}))(); // Line 502 Column 2
} else {return ((function() {(function() {if(not((symbol_p_(ast["first*"](node)) || list_p_(ast["first*"](node))))) {throw(str("operator is not a procedure: ",ast["first*"](node))); // Line 502 Column 2
}})()
; // Line <unknown undefined> Column <unknown undefined>
return generator["write-func-call"](ast["first"](node),cdr(ast["node-data"](node)),expr_p_,compile_star_); // Line 502 Column 2
}))(); // Line 502 Column 2
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
}})()
; // Line <unknown undefined> Column <unknown undefined>
});
var o6044053 = ast["first*"](node);
return o6532258(o6044053); // Line 502 Column 2
}))(); // Line 502 Column 2
}))(); // Line 502 Column 2
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
});
var o136245 = opt(expr_p_,false);
return o432308(o136245); // Line 502 Column 2
}))(); // Line 502 Column 2
});
var compile_dash_program = (function(src,generator){
if(arguments.length < 2) {
throw Error("compile-program: not enough arguments")
}
else if(arguments.length > 2) {
throw Error("compile-program: too many arguments");
}
(function() {if(not(macro_dash_generator)) {macro_dash_generator = generator;
}})()
; // Line <unknown undefined> Column <unknown undefined>
return ((function() {var o5464330 = (function(exp){
if(arguments.length < 1) {
throw Error("o5464330: not enough arguments")
}
else if(arguments.length > 1) {
throw Error("o5464330: too many arguments");
}
(function() {if((ast["type?"](exp,"\uFDD1LIST") && _eq__eq_(ast["first*"](exp),"\uFDD1begin"))) {return for_dash_each((function(e){
if(arguments.length < 1) {
throw Error("lambda: not enough arguments")
}
else if(arguments.length > 1) {
throw Error("lambda: too many arguments");
}
return compile(expand(e),generator); // Line 540 Column 2
}),cdr(ast["node-data"](exp))); // Line 540 Column 2
} else {return compile(expand(exp),generator); // Line 540 Column 2
}})()
; // Line <unknown undefined> Column <unknown undefined>
return generator["get-code"](); // Line 540 Column 2
});
var o8627932 = (function() {if(string_p_(src)) {return reader["read"](src); // Line 540 Column 2
} else {return sourcify(src,0,0); // Line 540 Column 2
}})()
;
return o5464330(o8627932); // Line 540 Column 2
}))(); // Line 540 Column 2
});
module["exports"] = dict("\uFDD0read",(function(e){
if(arguments.length < 1) {
throw Error("lambda: not enough arguments")
}
else if(arguments.length > 1) {
throw Error("lambda: too many arguments");
}
return desourcify(reader["read"](e)); // Line 552 Column 41
}),"\uFDD0expand",expand,"\uFDD0compile",compile,"\uFDD0compile-program",compile_dash_program,"\uFDD0desourcify",desourcify,"\uFDD0sourcify",sourcify,"\uFDD0pp",pp,"\uFDD0set-macro-generator",(function(g){
if(arguments.length < 1) {
throw Error("lambda: not enough arguments")
}
else if(arguments.length > 1) {
throw Error("lambda: too many arguments");
}
return (function() {if(not(macro_dash_generator)) {macro_dash_generator = g;
}})()
; // Line <unknown undefined> Column <unknown undefined>
}));

