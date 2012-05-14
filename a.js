var util = require("util");var type = (function(obj){
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
return _eq__eq_(typeof obj,"number"); // Line 16 Column 3
});
var string_p_ = (function(obj){
return (_eq__eq_(typeof obj,"string") && not(_eq__eq_(obj[0],"\uFDD0")) && not(_eq__eq_(obj[0],"\uFDD1"))); // Line <unknown undefined> Column <unknown undefined>
});
var symbol_p_ = (function(obj){
return ((_eq__eq_(typeof obj,"string") && _eq__eq_(obj[0],"\uFDD1"))); // Line <unknown undefined> Column <unknown undefined>
});
var key_p_ = (function(obj){
return (_eq__eq_(typeof obj,"string") && _eq__eq_(obj[0],"\uFDD0")); // Line <unknown undefined> Column <unknown undefined>
});
var boolean_p_ = (function(obj){
return (eq_p_(obj,true) || eq_p_(obj,false)); // Line <unknown undefined> Column <unknown undefined>
});
var null_p_ = (function(obj){
return (!!obj && not(eq_p_(obj["length"],undefined)) && eq_p_(obj["length"],1) && eq_p_(vector_dash_ref(obj,0),null)); // Line <unknown undefined> Column <unknown undefined>
});
var list_p_ = (function(obj){
return (!!obj && not(eq_p_(obj["length"],undefined)) && not(eq_p_(obj["list"],undefined))); // Line <unknown undefined> Column <unknown undefined>
});
var vector_p_ = (function(obj){
return (not(list_p_(obj)) && not(null_p_(obj)) && !!obj && eq_p_(typeof obj,"object") && not(eq_p_(obj["length"],undefined))); // Line <unknown undefined> Column <unknown undefined>
});
var dict_p_ = (function(obj){
return (not(symbol_p_(obj)) && !!obj && eq_p_(typeof obj,"object") && eq_p_(obj["length"],undefined)); // Line <unknown undefined> Column <unknown undefined>
});
var function_p_ = (function(obj){
return eq_p_(typeof obj,"function"); // Line 60 Column 3
});
var literal_p_ = (function(x){
return (key_p_(x) || number_p_(x) || string_p_(x) || boolean_p_(x) || null_p_(x)); // Line <unknown undefined> Column <unknown undefined>
});
var str = (function() {
var args = vector_dash__gt_list(Array.prototype.slice.call(arguments));
return fold((function(el,acc){
return (acc + (function() {if(string_p_(el)) {return el; // Line <unknown undefined> Column <unknown undefined>
} else {return inspect(el); // Line 75 Column 36
}})()
); // Line <unknown undefined> Column <unknown undefined>
}),"",args); // Line 73 Column 5
});
var symbol_dash__gt_key = (function(sym){
return ("\uFDD0" + sym["substring"](1)); // Line <unknown undefined> Column <unknown undefined>
});
var key_dash__gt_symbol = (function(sym){
return ("\uFDD1" + sym["substring"](1)); // Line <unknown undefined> Column <unknown undefined>
});
var string_dash__gt_key = (function(str){
return ("\uFDD0" + str); // Line <unknown undefined> Column <unknown undefined>
});
var key_dash__gt_string = (function(key){
return key["substring"](1); // Line 89 Column 3
});
var string_dash__gt_symbol = (function(str){
return ("\uFDD1" + str); // Line <unknown undefined> Column <unknown undefined>
});
var symbol_dash__gt_string = (function(sym){
return sym["substring"](1); // Line 95 Column 3
});
var _emptylst = [null];
var list = (function() {
var args = vector_dash__gt_list(Array.prototype.slice.call(arguments));
return args; // Line <unknown undefined> Column <unknown undefined>
});
var cons = (function(obj,lst){
return ((function() {var o1 = (function(res){
res.list = true;return res; // Line <unknown undefined> Column <unknown undefined>
});
var o2 = [obj, lst];
return o1(o2); // Line 106 Column 2
}))(); // Line 106 Column 2
});
var car = (function(lst){
return lst[0]});
var cdr = (function(lst){
return lst[1]});
var cadr = (function(lst){
return car(cdr(lst)); // Line 116 Column 20
});
var cddr = (function(lst){
return cdr(cdr(lst)); // Line 117 Column 20
});
var cdar = (function(lst){
return cdr(car(lst)); // Line 118 Column 20
});
var caddr = (function(lst){
return car(cdr(cdr(lst))); // Line 119 Column 21
});
var cdddr = (function(lst){
return cdr(cdr(cdr(lst))); // Line 120 Column 21
});
var cadar = (function(lst){
return car(cdr(car(lst))); // Line 121 Column 21
});
var cddar = (function(lst){
return cdr(cdr(car(lst))); // Line 122 Column 21
});
var caadr = (function(lst){
return car(car(cdr(lst))); // Line 123 Column 21
});
var cdadr = (function(lst){
return cdr(car(cdr(lst))); // Line 124 Column 21
});
var list_dash_ref = (function(lst,i){
return ((function() {var loop = (function(lst,i){
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
var o3 = lst;
var o4 = i;
return loop(o3,o4); // Line 127 Column 2
}))(); // Line 127 Column 2
});
var length = (function(lst){
return fold((function(el,acc){
return (acc + 1); // Line <unknown undefined> Column <unknown undefined>
}),0,lst); // Line 135 Column 3
});
var list_dash_append = (function(){
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
return ((function() {var loop = (function(lst){
return (function() {if(null_p_(lst)) {return lst2; // Line <unknown undefined> Column <unknown undefined>
} else {return cons(car(lst),loop(cdr(lst))); // Line 149 Column 2
}})()
; // Line <unknown undefined> Column <unknown undefined>
});
var o5 = lst1;
return loop(o5); // Line 149 Column 2
}))(); // Line 149 Column 2
});
var list_dash_find = (function(lst,val){
var rst = vector_dash__gt_list(Array.prototype.slice.call(arguments, 2));
return ((function() {var o6 = (function(access){
return ((function() {var loop = (function(lst){
return (function() {if(null_p_(lst)) {return false; // Line <unknown undefined> Column <unknown undefined>
} else {return (function() {if(_eq__eq_(access(car(lst)),val)) {return lst; // Line <unknown undefined> Column <unknown undefined>
} else {return vector("__tco_call",(function() {return loop(cdr(lst)); // Line 156 Column 2
})); // Line 156 Column 2
}})()
; // Line <unknown undefined> Column <unknown undefined>
}})()
; // Line <unknown undefined> Column <unknown undefined>
});
var o8 = lst;
return trampoline(loop(o8)); // Line 156 Column 2
}))(); // Line 156 Column 2
});
var o7 = (function() {if(null_p_(rst)) {return (function(x){
return x; // Line <unknown undefined> Column <unknown undefined>
}); // Line <unknown undefined> Column <unknown undefined>
} else {return car(rst); // Line 156 Column 2
}})()
;
return o6(o7); // Line 156 Column 2
}))(); // Line 156 Column 2
});
var map = (function(func,lst){
return (function() {if(null_p_(lst)) {return _emptylst; // Line <unknown undefined> Column <unknown undefined>
} else {return cons(func(car(lst)),map(func,cdr(lst))); // Line 167 Column 7
}})()
; // Line <unknown undefined> Column <unknown undefined>
});
var for_dash_each = (function(func,lst){
return ((function() {var loop = (function(lst){
return (function() {if(not(null_p_(lst))) {return ((function() {func(car(lst)); // Line 171 Column 2
return vector("__tco_call",(function() {return loop(cdr(lst)); // Line 171 Column 2
})); // Line 171 Column 2
}))(); // Line 171 Column 2
}})()
; // Line <unknown undefined> Column <unknown undefined>
});
var o9 = lst;
return trampoline(loop(o9)); // Line 171 Column 2
}))(); // Line 171 Column 2
});
var fold = (function(func,acc,lst){
return (function() {if(null_p_(lst)) {return acc; // Line <unknown undefined> Column <unknown undefined>
} else {return fold(func,func(car(lst),acc),cdr(lst)); // Line 180 Column 7
}})()
; // Line <unknown undefined> Column <unknown undefined>
});
var reverse = (function(lst){
return (function() {if(null_p_(lst)) {return _emptylst; // Line <unknown undefined> Column <unknown undefined>
} else {return list_dash_append(reverse(cdr(lst)),list(car(lst))); // Line 187 Column 7
}})()
; // Line <unknown undefined> Column <unknown undefined>
});
var vector_dash__gt_list = (function(vec){
return ((function() {var loop = (function(i){
return (function() {if((i < vec.length)) {return cons(vector_dash_ref(vec,i),loop((i + 1))); // Line 193 Column 2
} else {return _emptylst}})()
; // Line <unknown undefined> Column <unknown undefined>
});
var o10 = 0;
return loop(o10); // Line 193 Column 2
}))(); // Line 193 Column 2
});
var make_dash_vector = (function(count){
var val = arguments[1] || false;
return ((function() {var o11 = (function(v){
return (function() {if(val) {return ((function() {var loop = (function(i){
return (function() {if((i < count)) {return ((function() {vector_dash_put_excl_(v,i,val); // Line 202 Column 2
return vector("__tco_call",(function() {return loop((i + 1)); // Line 202 Column 2
})); // Line 202 Column 2
}))(); // Line 202 Column 2
} else {return v; // Line <unknown undefined> Column <unknown undefined>
}})()
; // Line <unknown undefined> Column <unknown undefined>
});
var o13 = 0;
return trampoline(loop(o13)); // Line 202 Column 2
}))(); // Line 202 Column 2
} else {return v; // Line <unknown undefined> Column <unknown undefined>
}})()
; // Line <unknown undefined> Column <unknown undefined>
});
var o12 = new Array(count);
return o11(o12); // Line 202 Column 2
}))(); // Line 202 Column 2
});
var vector = (function() {return Array.prototype.slice.call(arguments)});
var vector_dash_ref = (function(vec,i){
return vec[i]});
var vector_dash_put_excl_ = (function(vec,i,obj){
return vec[i] = obj});
var vector_dash_concat = (function(){
var vecs = vector_dash__gt_list(Array.prototype.slice.call(arguments, 0));
return ((function() {var loop = (function(lst,res){
return (function() {if(null_p_(lst)) {return res; // Line <unknown undefined> Column <unknown undefined>
} else {return vector("__tco_call",(function() {return loop(cdr(lst),res["concat"](car(lst))); // Line 222 Column 2
})); // Line 222 Column 2
}})()
; // Line <unknown undefined> Column <unknown undefined>
});
var o14 = cdr(vecs);
var o15 = car(vecs);
return trampoline(loop(o14,o15)); // Line 222 Column 2
}))(); // Line 222 Column 2
});
var vector_dash_slice = (function(vec,start){
var end = arguments[2] || false;
return vec.slice(start, end || undefined)});
var vector_dash_push_excl_ = (function(vec,obj){
return vec.push(obj)});
var vector_dash_find = (function(vec,val){
return ((function() {var loop = (function(i){
return (function() {if((i < vec.length)) {return (function() {if(eq_p_(vector_dash_ref(vec,i),val)) {return i; // Line <unknown undefined> Column <unknown undefined>
} else {return vector("__tco_call",(function() {return loop((i + 1)); // Line 236 Column 2
})); // Line 236 Column 2
}})()
; // Line <unknown undefined> Column <unknown undefined>
} else {return false; // Line <unknown undefined> Column <unknown undefined>
}})()
; // Line <unknown undefined> Column <unknown undefined>
});
var o16 = 0;
return trampoline(loop(o16)); // Line 236 Column 2
}))(); // Line 236 Column 2
});
var vector_dash_length = (function(vec){
return vec["length"]; // Line <unknown undefined> Column <unknown undefined>
});
var list_dash__gt_vector = (function(lst){
var res = [];
for_dash_each((function(el){
return res["push"](el); // Line 248 Column 15
}),lst); // Line 247 Column 3
return res; // Line <unknown undefined> Column <unknown undefined>
});
var vector_dash_map = (function(func,vec){
var res = [];
((function() {var loop = (function(i){
return (function() {if((i < vec["length"])) {return ((function() {res["push"](func(vector_dash_ref(vec,i))); // Line 254 Column 2
return vector("__tco_call",(function() {return loop((i + 1)); // Line 254 Column 2
})); // Line 254 Column 2
}))(); // Line 254 Column 2
}})()
; // Line <unknown undefined> Column <unknown undefined>
});
var o17 = 0;
return trampoline(loop(o17)); // Line 254 Column 2
}))(); // Line 254 Column 2
return res; // Line <unknown undefined> Column <unknown undefined>
});
var vector_dash_for_dash_each = (function(func,vec){
return ((function() {var loop = (function(i){
return (function() {if((i < vec["length"])) {return ((function() {func(vector_dash_ref(vec,i)); // Line 262 Column 2
return vector("__tco_call",(function() {return loop((i + 1)); // Line 262 Column 2
})); // Line 262 Column 2
}))(); // Line 262 Column 2
}})()
; // Line <unknown undefined> Column <unknown undefined>
});
var o18 = 0;
return trampoline(loop(o18)); // Line 262 Column 2
}))(); // Line 262 Column 2
});
var vector_dash_fold = (function(func,acc,vec){
return ((function() {var loop = (function(i,acc){
return (function() {if((i < vector_dash_length(vec))) {return vector("__tco_call",(function() {return loop((i + 1),func(vector_dash_ref(vec,i),acc)); // Line 269 Column 2
})); // Line 269 Column 2
} else {return acc; // Line <unknown undefined> Column <unknown undefined>
}})()
; // Line <unknown undefined> Column <unknown undefined>
});
var o19 = 0;
var o20 = acc;
return trampoline(loop(o19,o20)); // Line 269 Column 2
}))(); // Line 269 Column 2
});
var dict = (function() {
var args = vector_dash__gt_list(Array.prototype.slice.call(arguments));
var res = {};
((function() {var loop = (function(lst){
return (function() {if(not(null_p_(lst))) {return ((function() {var o22 = (function(key,val){
dict_dash_put_excl_(res,key,val); // Line 281 Column 4
return vector("__tco_call",(function() {return loop(cddr(lst)); // Line 281 Column 4
})); // Line 281 Column 4
});
var o23 = car(lst);
var o24 = cadr(lst);
return o22(o23,o24); // Line 281 Column 4
}))(); // Line 281 Column 4
}})()
; // Line <unknown undefined> Column <unknown undefined>
});
var o21 = args;
return trampoline(loop(o21)); // Line 281 Column 4
}))(); // Line 281 Column 4
return res; // Line <unknown undefined> Column <unknown undefined>
});
var dict_dash_put_excl_ = (function(dct,k,v){
return dct[k.substring(1)] = v});
var dict_dash_ref = (function(dct,k){
return dct[k.substring(1)]});
var dict_dash_map = (function(func,dct){
var res = dict();
((function() {var loop = (function(lst){
return (function() {if(not(null_p_(lst))) {return ((function() {var o26 = (function(k){
dict_dash_put_excl_(res,k,func(dict_dash_ref(dct,k))); // Line 297 Column 2
return vector("__tco_call",(function() {return loop(cdr(lst)); // Line 297 Column 2
})); // Line 297 Column 2
});
var o27 = car(lst);
return o26(o27); // Line 297 Column 2
}))(); // Line 297 Column 2
}})()
; // Line <unknown undefined> Column <unknown undefined>
});
var o25 = keys(dct);
return trampoline(loop(o25)); // Line 297 Column 2
}))(); // Line 297 Column 2
return res; // Line <unknown undefined> Column <unknown undefined>
});
var dict_dash_merge = (function(){
var dcts = vector_dash__gt_list(Array.prototype.slice.call(arguments, 0));
return ((function() {var o28 = (function(res){
for_dash_each((function(dct){
return for_dash_each((function(k){
return dict_dash_put_excl_(res,k,dict_dash_ref(dct,k)); // Line 306 Column 2
}),keys(dct)); // Line 306 Column 2
}),dcts); // Line 306 Column 2
return res; // Line <unknown undefined> Column <unknown undefined>
});
var o29 = dict();
return o28(o29); // Line 306 Column 2
}))(); // Line 306 Column 2
});
var dict_dash__gt_vector = (function(dct){
var res = vector();
((function() {var loop = (function(lst){
return (function() {if(not(null_p_(lst))) {return ((function() {vector_dash_push_excl_(res,car(lst)); // Line 316 Column 2
vector_dash_push_excl_(res,dict_dash_ref(dct,car(lst))); // Line 316 Column 2
return vector("__tco_call",(function() {return loop(cdr(lst)); // Line 316 Column 2
})); // Line 316 Column 2
}))(); // Line 316 Column 2
}})()
; // Line <unknown undefined> Column <unknown undefined>
});
var o30 = keys(dct);
return trampoline(loop(o30)); // Line 316 Column 2
}))(); // Line 316 Column 2
return res; // Line <unknown undefined> Column <unknown undefined>
});
var dict_dash__gt_list = (function(dct){
return vector_dash__gt_list(dict_dash__gt_vector(dct)); // Line 325 Column 3
});
var keys = (function(dct){
return ((function() {var o31 = (function(res){
for(var k in dct) {
       res = cons(string_dash__gt_key(k), res);
    }return res; // Line <unknown undefined> Column <unknown undefined>
});
var o32 = _emptylst;
return o31(o32); // Line 328 Column 2
}))(); // Line 328 Column 2
});
var vals = (function(dct){
return map((function(k){
return dict_dash_ref(dct,k); // Line 335 Column 20
}),keys(dct)); // Line 335 Column 3
});
var zip = (function(keys,vals){
var res = dict();
((function() {var loop = (function(ks,vs){
return (function() {if(not(null_p_(ks))) {return ((function() {dict_dash_put_excl_(res,car(ks),car(vs)); // Line 340 Column 2
return vector("__tco_call",(function() {return loop(cdr(ks),cdr(vs)); // Line 340 Column 2
})); // Line 340 Column 2
}))(); // Line 340 Column 2
}})()
; // Line <unknown undefined> Column <unknown undefined>
});
var o33 = keys;
var o34 = vals;
return trampoline(loop(o33,o34)); // Line 340 Column 2
}))(); // Line 340 Column 2
return res; // Line <unknown undefined> Column <unknown undefined>
});
var not = (function(obj){
return (typeof obj !== 'number' && !obj); // Line <unknown undefined> Column <unknown undefined>
});
var _eq__eq_ = (function(obj1,obj2){
return obj1 === obj2});
var _eq_ = (function(obj1,obj2){
return (function() {if((list_p_(obj1) && list_p_(obj2))) {return ((function() {return ((function() {var loop = (function(lst1,lst2){
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
var o35 = obj1;
var o36 = obj2;
return loop(o35,o36); // Line 360 Column 2
}))(); // Line 360 Column 2
}))(); // Line 360 Column 2
} else {return (function() {if((vector_p_(obj1) && vector_p_(obj2))) {return ((function() {return (function() {if(not(_eq_(obj1["length"],obj2["length"]))) {return false; // Line <unknown undefined> Column <unknown undefined>
} else {return ((function() {var loop = (function(i){
return (function() {if((i < obj1["length"])) {return (function() {if(_eq_(vector_dash_ref(obj1,i),vector_dash_ref(obj2,i))) {return vector("__tco_call",(function() {return loop((i + 1)); // Line 360 Column 2
})); // Line 360 Column 2
} else {return false; // Line <unknown undefined> Column <unknown undefined>
}})()
; // Line <unknown undefined> Column <unknown undefined>
} else {return true; // Line <unknown undefined> Column <unknown undefined>
}})()
; // Line <unknown undefined> Column <unknown undefined>
});
var o37 = 0;
return trampoline(loop(o37)); // Line 360 Column 2
}))(); // Line 360 Column 2
}})()
; // Line <unknown undefined> Column <unknown undefined>
}))(); // Line 360 Column 2
} else {return (function() {if((dict_p_(obj1) && dict_p_(obj2))) {return ((function() {return ((function() {var o38 = (function(keys1,keys2){
return (eq_p_(length(keys1),length(keys2)) && ((function() {var loop = (function(lst){
return (function() {if(null_p_(lst)) {return true; // Line <unknown undefined> Column <unknown undefined>
} else {return (function() {if(equal_p_(dict_dash_ref(obj1,car(lst)),dict_dash_ref(obj2,car(lst)))) {return vector("__tco_call",(function() {return loop(cdr(lst)); // Line 360 Column 2
})); // Line 360 Column 2
} else {return false; // Line <unknown undefined> Column <unknown undefined>
}})()
; // Line <unknown undefined> Column <unknown undefined>
}})()
; // Line <unknown undefined> Column <unknown undefined>
});
var o41 = keys1;
return trampoline(loop(o41)); // Line 360 Column 2
}))()); // Line <unknown undefined> Column <unknown undefined>
});
var o39 = keys(obj1);
var o40 = keys(obj2);
return o38(o39,o40); // Line 360 Column 2
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
return util["print"](msg); // Line 408 Column 3
});
var println = (function(msg){
return util["puts"](msg); // Line 411 Column 3
});
var pp = (function(obj){
return println(inspect(obj)); // Line 414 Column 3
});
var _per_inspect_dash_non_dash_sequence = (function(obj){
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
var rest = vector_dash__gt_list(Array.prototype.slice.call(arguments, 4));
return ((function() {var o42 = (function(parents){
return (function() {if(list_dash_find(parents,obj)) {return halt; // Line <unknown undefined> Column <unknown undefined>
} else {return func(obj,arg,(function(el,arg){
return _per_recur_dash_protect(el,arg,func,halt,cons(obj,parents)); // Line 435 Column 2
})); // Line 435 Column 2
}})()
; // Line <unknown undefined> Column <unknown undefined>
});
var o43 = (function() {if(null_p_(rest)) {return _emptylst; // Line <unknown undefined> Column <unknown undefined>
} else {return car(rest); // Line 435 Column 2
}})()
;
return o42(o43); // Line 435 Column 2
}))(); // Line 435 Column 2
});
var _per_space = (function(obj){
return _per_recur_dash_protect(obj,false,(function(obj,arg,recur){
return (function() {if(list_p_(obj)) {return ((function() {return (length(obj) + 1 + fold((function(el,acc){
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
var rest = vector_dash__gt_list(Array.prototype.slice.call(arguments, 1));
return ((function() {var o44 = (function(no_dash_newlines){
return _per_recur_dash_protect(obj,1,(function(obj,i,recur){
var buffer = "";
var get_dash_buffer = (function() {return buffer; // Line <unknown undefined> Column <unknown undefined>
});
var disp = (function(s){
buffer = (buffer + s);
});
var pad = (function(n){
return vector_dash_for_dash_each((function(_){
return disp(" "); // Line 468 Column 2
}),make_dash_vector(n)); // Line 468 Column 2
});
return (function() {if(list_p_(obj)) {return ((function() {return ((function() {var o46 = (function(sp,first){
disp("("); // Line 468 Column 2
for_dash_each((function(el){
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
var o47 = (_per_space(obj) > 30);
var o48 = true;
return o46(o47,o48); // Line 468 Column 2
}))(); // Line 468 Column 2
}))(); // Line 468 Column 2
} else {return (function() {if(vector_p_(obj)) {return ((function() {return ((function() {var o49 = (function(sp,first){
disp("["); // Line 468 Column 2
vector_dash_for_dash_each((function(el){
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
var o50 = (_per_space(obj) > 30);
var o51 = true;
return o49(o50,o51); // Line 468 Column 2
}))(); // Line 468 Column 2
}))(); // Line 468 Column 2
} else {return (function() {if(dict_p_(obj)) {return ((function() {return ((function() {var o52 = (function(sp,first){
disp("{"); // Line 468 Column 2
for_dash_each((function(k){
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
var o53 = (_per_space(obj) > 30);
var o54 = true;
return o52(o53,o54); // Line 468 Column 2
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
var o45 = (function() {if(null_p_(rest)) {return false; // Line <unknown undefined> Column <unknown undefined>
} else {return car(rest); // Line 468 Column 2
}})()
;
return o44(o45); // Line 468 Column 2
}))(); // Line 468 Column 2
});
var apply = (function(func,args){
return func.apply(null,list_dash__gt_vector(args)); // Line 542 Column 3
});
var trampoline_dash_result_p_ = (function(value){
return (vector_p_(value) && _eq_(vector_dash_ref(value,0),"__tco_call")); // Line <unknown undefined> Column <unknown undefined>
});
var trampoline = (function(value){
while(trampoline_dash_result_p_(value)) { value = value[1](); }return value; // Line <unknown undefined> Column <unknown undefined>
});
var _per_gensym_dash_base = 0;
var gensym_dash_fresh = (function() {_per_gensym_dash_base = 10000;
});
var gensym = (function() {_per_gensym_dash_base = (_per_gensym_dash_base + 1);
return string_dash__gt_symbol(("o" + _per_gensym_dash_base)); // Line 563 Column 3
});
var cps_dash_trampoline = (function(func){
var v = func();
while(v) { v = v(); }return v; // Line <unknown undefined> Column <unknown undefined>
});
var cps_dash_jump = (function(to){
return to; // Line <unknown undefined> Column <unknown undefined>
});
var cps_dash_halt = (function(v){
return list(list("\uFDD1lambda",_emptylst,list("\uFDD1pp",list("\uFDD1str","halted with result: ",v)),false)); // Line 576 Column 4
});


var __compiler = require('/Users/james/projects/outlet/backends/../compiler');
var __generator = require('/Users/james/projects/outlet/backends/../backends/js');
var read = __compiler.read;
false; 
false; 
false; 
false; 
var foo = (function(x,y,z){
if(arguments.length < 3) {
throw Error("foo: not enough arguments")
}
else if(arguments.length > 3) {
throw Error("foo: too many arguments");
}
return (x + y + z); 
});
((function() {var o5 = (function(comp,res){
if(arguments.length < 2) {
throw Error("o5: not enough arguments")
}
else if(arguments.length > 2) {
throw Error("o5: too many arguments");
}
return (function() {if(not(comp(res,6))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),":\n",list("\uFDD1foo",1,2,3)," got ",res," but expected ",6)); 
}})()
; 
});
var o6 = _eq_;
var o7 = eval(__compiler["compile-program"](list("\uFDD1foo",1,2,3),__generator()));
return o5(o6,o7); 
}))(); 
var bar = (function(t){
if(arguments.length < 1) {
throw Error("bar: not enough arguments")
}
else if(arguments.length > 1) {
throw Error("bar: too many arguments");
}
return (foo(1,2,3) * t); 
});
((function() {var o8 = (function(comp,res){
if(arguments.length < 2) {
throw Error("o8: not enough arguments")
}
else if(arguments.length > 2) {
throw Error("o8: too many arguments");
}
return (function() {if(not(comp(res,30.738))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),":\n",list("\uFDD1bar",5.123)," got ",res," but expected ",30.738)); 
}})()
; 
});
var o9 = _eq_;
var o10 = eval(__compiler["compile-program"](list("\uFDD1bar",5.123),__generator()));
return o8(o9,o10); 
}))(); 
((function() {var o11 = (function(comp,res){
if(arguments.length < 2) {
throw Error("o11: not enough arguments")
}
else if(arguments.length > 2) {
throw Error("o11: too many arguments");
}
return (function() {if(not(comp(res,42))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),":\n",list(list("\uFDD1lambda",list("\uFDD1x"),list("\uFDD1bar",list("\uFDD1+","\uFDD1x",2))),5)," got ",res," but expected ",42)); 
}})()
; 
});
var o12 = _eq_;
var o13 = eval(__compiler["compile-program"](list(list("\uFDD1lambda",list("\uFDD1x"),list("\uFDD1bar",list("\uFDD1+","\uFDD1x",2))),5),__generator()));
return o11(o12,o13); 
}))(); 
var foo = (function(x,y,z){
if(arguments.length < 3) {
throw Error("lambda: not enough arguments")
}
else if(arguments.length > 3) {
throw Error("lambda: too many arguments");
}
return (x + y + z); 
});
((function() {var o14 = (function(comp,res){
if(arguments.length < 2) {
throw Error("o14: not enough arguments")
}
else if(arguments.length > 2) {
throw Error("o14: too many arguments");
}
return (function() {if(not(comp(res,6))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),":\n",list("\uFDD1foo",1,2,3)," got ",res," but expected ",6)); 
}})()
; 
});
var o15 = _eq_;
var o16 = eval(__compiler["compile-program"](list("\uFDD1foo",1,2,3),__generator()));
return o14(o15,o16); 
}))(); 
((function() {var o17 = (function(comp,res){
if(arguments.length < 2) {
throw Error("o17: not enough arguments")
}
else if(arguments.length > 2) {
throw Error("o17: too many arguments");
}
return (function() {if(not(comp(res,"onetwo"))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),":\n",list("\uFDD1str","one","two")," got ",res," but expected ","onetwo")); 
}})()
; 
});
var o18 = _eq_;
var o19 = eval(__compiler["compile-program"](list("\uFDD1str","one","two"),__generator()));
return o17(o18,o19); 
}))(); 
((function() {var o20 = (function(comp,res){
if(arguments.length < 2) {
throw Error("o20: not enough arguments")
}
else if(arguments.length > 2) {
throw Error("o20: too many arguments");
}
return (function() {if(not(comp(res,"one2three#f"))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),":\n",list("\uFDD1str","one",2,list("\uFDD1quote","\uFDD1three"),false)," got ",res," but expected ","one2three#f")); 
}})()
; 
});
var o21 = _eq_;
var o22 = eval(__compiler["compile-program"](list("\uFDD1str","one",2,list("\uFDD1quote","\uFDD1three"),false),__generator()));
return o20(o21,o22); 
}))(); 
((function() {var o23 = (function(comp,res){
if(arguments.length < 2) {
throw Error("o23: not enough arguments")
}
else if(arguments.length > 2) {
throw Error("o23: too many arguments");
}
return (function() {if(not(comp(res,"(1 2 3)one"))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),":\n",list("\uFDD1str",list("\uFDD1quote",list(1,2,3)),"one")," got ",res," but expected ","(1 2 3)one")); 
}})()
; 
});
var o24 = _eq_;
var o25 = eval(__compiler["compile-program"](list("\uFDD1str",list("\uFDD1quote",list(1,2,3)),"one"),__generator()));
return o23(o24,o25); 
}))(); 
((function() {var o26 = (function(comp,res){
if(arguments.length < 2) {
throw Error("o26: not enough arguments")
}
else if(arguments.length > 2) {
throw Error("o26: too many arguments");
}
return (function() {if(not(comp(res,"[1 2 3]one"))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),":\n",list("\uFDD1str",vector(1,2,3),"one")," got ",res," but expected ","[1 2 3]one")); 
}})()
; 
});
var o27 = _eq_;
var o28 = eval(__compiler["compile-program"](list("\uFDD1str",vector(1,2,3),"one"),__generator()));
return o26(o27,o28); 
}))(); 
((function() {var o29 = (function(comp,res){
if(arguments.length < 2) {
throw Error("o29: not enough arguments")
}
else if(arguments.length > 2) {
throw Error("o29: too many arguments");
}
return (function() {if(not(comp(res,"\uFDD1foo"))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),":\n",list("\uFDD1string->symbol","foo")," got ",res," but expected ","\uFDD1foo")); 
}})()
; 
});
var o30 = _eq_;
var o31 = eval(__compiler["compile-program"](list("\uFDD1string->symbol","foo"),__generator()));
return o29(o30,o31); 
}))(); 
((function() {var o32 = (function(comp,res){
if(arguments.length < 2) {
throw Error("o32: not enough arguments")
}
else if(arguments.length > 2) {
throw Error("o32: too many arguments");
}
return (function() {if(not(comp(res,"\uFDD1foo-?!><%="))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),":\n",list("\uFDD1string->symbol","foo-?!><%=")," got ",res," but expected ","\uFDD1foo-?!><%=")); 
}})()
; 
});
var o33 = _eq_;
var o34 = eval(__compiler["compile-program"](list("\uFDD1string->symbol","foo-?!><%="),__generator()));
return o32(o33,o34); 
}))(); 
((function() {var o35 = (function(comp,res){
if(arguments.length < 2) {
throw Error("o35: not enough arguments")
}
else if(arguments.length > 2) {
throw Error("o35: too many arguments");
}
return (function() {if(not(comp(res,"bar"))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),":\n",list("\uFDD1symbol->string",list("\uFDD1quote","\uFDD1bar"))," got ",res," but expected ","bar")); 
}})()
; 
});
var o36 = _eq_;
var o37 = eval(__compiler["compile-program"](list("\uFDD1symbol->string",list("\uFDD1quote","\uFDD1bar")),__generator()));
return o35(o36,o37); 
}))(); 
((function() {var o38 = (function(comp,res){
if(arguments.length < 2) {
throw Error("o38: not enough arguments")
}
else if(arguments.length > 2) {
throw Error("o38: too many arguments");
}
return (function() {if(not(comp(res,"bar-?!><%="))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),":\n",list("\uFDD1symbol->string",list("\uFDD1quote","\uFDD1bar-?!><%="))," got ",res," but expected ","bar-?!><%=")); 
}})()
; 
});
var o39 = _eq_;
var o40 = eval(__compiler["compile-program"](list("\uFDD1symbol->string",list("\uFDD1quote","\uFDD1bar-?!><%=")),__generator()));
return o38(o39,o40); 
}))(); 
((function() {var o41 = (function(comp,res){
if(arguments.length < 2) {
throw Error("o41: not enough arguments")
}
else if(arguments.length > 2) {
throw Error("o41: too many arguments");
}
return (function() {if(not(comp(res,100))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),":\n",list(list("\uFDD1lambda",list("\uFDD1x"),list("\uFDD1set!","\uFDD1x",10),list("\uFDD1*","\uFDD1x","\uFDD1x")),5)," got ",res," but expected ",100)); 
}})()
; 
});
var o42 = _eq_;
var o43 = eval(__compiler["compile-program"](list(list("\uFDD1lambda",list("\uFDD1x"),list("\uFDD1set!","\uFDD1x",10),list("\uFDD1*","\uFDD1x","\uFDD1x")),5),__generator()));
return o41(o42,o43); 
}))(); 
((function() {var o44 = (function(comp,res){
if(arguments.length < 2) {
throw Error("o44: not enough arguments")
}
else if(arguments.length > 2) {
throw Error("o44: too many arguments");
}
return (function() {if(not(comp(res,3))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),":\n",list("\uFDD1+",1,2)," got ",res," but expected ",3)); 
}})()
; 
});
var o45 = _eq_;
var o46 = eval(__compiler["compile-program"](list("\uFDD1+",1,2),__generator()));
return o44(o45,o46); 
}))(); 
((function() {var o47 = (function(comp,res){
if(arguments.length < 2) {
throw Error("o47: not enough arguments")
}
else if(arguments.length > 2) {
throw Error("o47: too many arguments");
}
return (function() {if(not(comp(res,-1))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),":\n",list("\uFDD1-",1,2)," got ",res," but expected ",-1)); 
}})()
; 
});
var o48 = _eq_;
var o49 = eval(__compiler["compile-program"](list("\uFDD1-",1,2),__generator()));
return o47(o48,o49); 
}))(); 
((function() {var o50 = (function(comp,res){
if(arguments.length < 2) {
throw Error("o50: not enough arguments")
}
else if(arguments.length > 2) {
throw Error("o50: too many arguments");
}
return (function() {if(not(comp(res,12))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),":\n",list("\uFDD1*",3,4)," got ",res," but expected ",12)); 
}})()
; 
});
var o51 = _eq_;
var o52 = eval(__compiler["compile-program"](list("\uFDD1*",3,4),__generator()));
return o50(o51,o52); 
}))(); 
((function() {var o53 = (function(comp,res){
if(arguments.length < 2) {
throw Error("o53: not enough arguments")
}
else if(arguments.length > 2) {
throw Error("o53: too many arguments");
}
return (function() {if(not(comp(res,2.5))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),":\n",list("\uFDD1/",10,4)," got ",res," but expected ",2.5)); 
}})()
; 
});
var o54 = _eq_;
var o55 = eval(__compiler["compile-program"](list("\uFDD1/",10,4),__generator()));
return o53(o54,o55); 
}))(); 
((function() {var o56 = (function(comp,res){
if(arguments.length < 2) {
throw Error("o56: not enough arguments")
}
else if(arguments.length > 2) {
throw Error("o56: too many arguments");
}
return (function() {if(not(comp(res,2))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),":\n",list("\uFDD1%",12,10)," got ",res," but expected ",2)); 
}})()
; 
});
var o57 = _eq_;
var o58 = eval(__compiler["compile-program"](list("\uFDD1%",12,10),__generator()));
return o56(o57,o58); 
}))(); 
((function() {var o59 = (function(comp,res){
if(arguments.length < 2) {
throw Error("o59: not enough arguments")
}
else if(arguments.length > 2) {
throw Error("o59: too many arguments");
}
return (function() {if(not(comp(res,true))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),":\n",list("\uFDD1<",1,2)," got ",res," but expected ",true)); 
}})()
; 
});
var o60 = _eq_;
var o61 = eval(__compiler["compile-program"](list("\uFDD1<",1,2),__generator()));
return o59(o60,o61); 
}))(); 
((function() {var o62 = (function(comp,res){
if(arguments.length < 2) {
throw Error("o62: not enough arguments")
}
else if(arguments.length > 2) {
throw Error("o62: too many arguments");
}
return (function() {if(not(comp(res,false))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),":\n",list("\uFDD1<",5,4)," got ",res," but expected ",false)); 
}})()
; 
});
var o63 = _eq_;
var o64 = eval(__compiler["compile-program"](list("\uFDD1<",5,4),__generator()));
return o62(o63,o64); 
}))(); 
((function() {var o65 = (function(comp,res){
if(arguments.length < 2) {
throw Error("o65: not enough arguments")
}
else if(arguments.length > 2) {
throw Error("o65: too many arguments");
}
return (function() {if(not(comp(res,true))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),":\n",list("\uFDD1>",2,1)," got ",res," but expected ",true)); 
}})()
; 
});
var o66 = _eq_;
var o67 = eval(__compiler["compile-program"](list("\uFDD1>",2,1),__generator()));
return o65(o66,o67); 
}))(); 
((function() {var o68 = (function(comp,res){
if(arguments.length < 2) {
throw Error("o68: not enough arguments")
}
else if(arguments.length > 2) {
throw Error("o68: too many arguments");
}
return (function() {if(not(comp(res,false))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),":\n",list("\uFDD1>",4,5)," got ",res," but expected ",false)); 
}})()
; 
});
var o69 = _eq_;
var o70 = eval(__compiler["compile-program"](list("\uFDD1>",4,5),__generator()));
return o68(o69,o70); 
}))(); 
((function() {var o71 = (function(comp,res){
if(arguments.length < 2) {
throw Error("o71: not enough arguments")
}
else if(arguments.length > 2) {
throw Error("o71: too many arguments");
}
return (function() {if(not(comp(res,list(1,2,3)))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),":\n",list("\uFDD1list",1,2,3)," got ",res," but expected ",list(1,2,3))); 
}})()
; 
});
var o72 = _eq_;
var o73 = eval(__compiler["compile-program"](list("\uFDD1list",1,2,3),__generator()));
return o71(o72,o73); 
}))(); 
((function() {var o74 = (function(comp,res){
if(arguments.length < 2) {
throw Error("o74: not enough arguments")
}
else if(arguments.length > 2) {
throw Error("o74: too many arguments");
}
return (function() {if(not(comp(res,list(1)))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),":\n",list("\uFDD1cons",1,list("\uFDD1quote",_emptylst))," got ",res," but expected ",list(1))); 
}})()
; 
});
var o75 = _eq_;
var o76 = eval(__compiler["compile-program"](list("\uFDD1cons",1,list("\uFDD1quote",_emptylst)),__generator()));
return o74(o75,o76); 
}))(); 
((function() {var o77 = (function(comp,res){
if(arguments.length < 2) {
throw Error("o77: not enough arguments")
}
else if(arguments.length > 2) {
throw Error("o77: too many arguments");
}
return (function() {if(not(comp(res,2))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),":\n",list("\uFDD1car",list("\uFDD1cons",2,list("\uFDD1cons",3,list("\uFDD1quote",_emptylst))))," got ",res," but expected ",2)); 
}})()
; 
});
var o78 = _eq_;
var o79 = eval(__compiler["compile-program"](list("\uFDD1car",list("\uFDD1cons",2,list("\uFDD1cons",3,list("\uFDD1quote",_emptylst)))),__generator()));
return o77(o78,o79); 
}))(); 
((function() {var o80 = (function(comp,res){
if(arguments.length < 2) {
throw Error("o80: not enough arguments")
}
else if(arguments.length > 2) {
throw Error("o80: too many arguments");
}
return (function() {if(not(comp(res,list(3)))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),":\n",list("\uFDD1cdr",list("\uFDD1cons",2,list("\uFDD1cons",3,list("\uFDD1quote",_emptylst))))," got ",res," but expected ",list(3))); 
}})()
; 
});
var o81 = _eq_;
var o82 = eval(__compiler["compile-program"](list("\uFDD1cdr",list("\uFDD1cons",2,list("\uFDD1cons",3,list("\uFDD1quote",_emptylst)))),__generator()));
return o80(o81,o82); 
}))(); 
var foo = list(list(1,2,3),list(4,5,6),list(7,8,9),10);
((function() {var o83 = (function(comp,res){
if(arguments.length < 2) {
throw Error("o83: not enough arguments")
}
else if(arguments.length > 2) {
throw Error("o83: too many arguments");
}
return (function() {if(not(comp(res,list(4,5,6)))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),":\n",list("\uFDD1cadr","\uFDD1foo")," got ",res," but expected ",list(4,5,6))); 
}})()
; 
});
var o84 = _eq_;
var o85 = eval(__compiler["compile-program"](list("\uFDD1cadr","\uFDD1foo"),__generator()));
return o83(o84,o85); 
}))(); 
((function() {var o86 = (function(comp,res){
if(arguments.length < 2) {
throw Error("o86: not enough arguments")
}
else if(arguments.length > 2) {
throw Error("o86: too many arguments");
}
return (function() {if(not(comp(res,list(list(7,8,9),10)))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),":\n",list("\uFDD1cddr","\uFDD1foo")," got ",res," but expected ",list(list(7,8,9),10))); 
}})()
; 
});
var o87 = _eq_;
var o88 = eval(__compiler["compile-program"](list("\uFDD1cddr","\uFDD1foo"),__generator()));
return o86(o87,o88); 
}))(); 
((function() {var o89 = (function(comp,res){
if(arguments.length < 2) {
throw Error("o89: not enough arguments")
}
else if(arguments.length > 2) {
throw Error("o89: too many arguments");
}
return (function() {if(not(comp(res,list(2,3)))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),":\n",list("\uFDD1cdar","\uFDD1foo")," got ",res," but expected ",list(2,3))); 
}})()
; 
});
var o90 = _eq_;
var o91 = eval(__compiler["compile-program"](list("\uFDD1cdar","\uFDD1foo"),__generator()));
return o89(o90,o91); 
}))(); 
((function() {var o92 = (function(comp,res){
if(arguments.length < 2) {
throw Error("o92: not enough arguments")
}
else if(arguments.length > 2) {
throw Error("o92: too many arguments");
}
return (function() {if(not(comp(res,list(7,8,9)))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),":\n",list("\uFDD1caddr","\uFDD1foo")," got ",res," but expected ",list(7,8,9))); 
}})()
; 
});
var o93 = _eq_;
var o94 = eval(__compiler["compile-program"](list("\uFDD1caddr","\uFDD1foo"),__generator()));
return o92(o93,o94); 
}))(); 
((function() {var o95 = (function(comp,res){
if(arguments.length < 2) {
throw Error("o95: not enough arguments")
}
else if(arguments.length > 2) {
throw Error("o95: too many arguments");
}
return (function() {if(not(comp(res,list(10)))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),":\n",list("\uFDD1cdddr","\uFDD1foo")," got ",res," but expected ",list(10))); 
}})()
; 
});
var o96 = _eq_;
var o97 = eval(__compiler["compile-program"](list("\uFDD1cdddr","\uFDD1foo"),__generator()));
return o95(o96,o97); 
}))(); 
((function() {var o98 = (function(comp,res){
if(arguments.length < 2) {
throw Error("o98: not enough arguments")
}
else if(arguments.length > 2) {
throw Error("o98: too many arguments");
}
return (function() {if(not(comp(res,2))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),":\n",list("\uFDD1cadar","\uFDD1foo")," got ",res," but expected ",2)); 
}})()
; 
});
var o99 = _eq_;
var o100 = eval(__compiler["compile-program"](list("\uFDD1cadar","\uFDD1foo"),__generator()));
return o98(o99,o100); 
}))(); 
((function() {var o101 = (function(comp,res){
if(arguments.length < 2) {
throw Error("o101: not enough arguments")
}
else if(arguments.length > 2) {
throw Error("o101: too many arguments");
}
return (function() {if(not(comp(res,list(3)))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),":\n",list("\uFDD1cddar","\uFDD1foo")," got ",res," but expected ",list(3))); 
}})()
; 
});
var o102 = _eq_;
var o103 = eval(__compiler["compile-program"](list("\uFDD1cddar","\uFDD1foo"),__generator()));
return o101(o102,o103); 
}))(); 
((function() {var o104 = (function(comp,res){
if(arguments.length < 2) {
throw Error("o104: not enough arguments")
}
else if(arguments.length > 2) {
throw Error("o104: too many arguments");
}
return (function() {if(not(comp(res,4))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),":\n",list("\uFDD1caadr","\uFDD1foo")," got ",res," but expected ",4)); 
}})()
; 
});
var o105 = _eq_;
var o106 = eval(__compiler["compile-program"](list("\uFDD1caadr","\uFDD1foo"),__generator()));
return o104(o105,o106); 
}))(); 
((function() {var o107 = (function(comp,res){
if(arguments.length < 2) {
throw Error("o107: not enough arguments")
}
else if(arguments.length > 2) {
throw Error("o107: too many arguments");
}
return (function() {if(not(comp(res,list(5,6)))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),":\n",list("\uFDD1cdadr","\uFDD1foo")," got ",res," but expected ",list(5,6))); 
}})()
; 
});
var o108 = _eq_;
var o109 = eval(__compiler["compile-program"](list("\uFDD1cdadr","\uFDD1foo"),__generator()));
return o107(o108,o109); 
}))(); 
((function() {var o110 = (function(comp,res){
if(arguments.length < 2) {
throw Error("o110: not enough arguments")
}
else if(arguments.length > 2) {
throw Error("o110: too many arguments");
}
return (function() {if(not(comp(res,"\uFDD1z"))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),":\n",list("\uFDD1list-ref",list("\uFDD1quote",list("\uFDD1x","\uFDD1y","\uFDD1z")),2)," got ",res," but expected ","\uFDD1z")); 
}})()
; 
});
var o111 = _eq_;
var o112 = eval(__compiler["compile-program"](list("\uFDD1list-ref",list("\uFDD1quote",list("\uFDD1x","\uFDD1y","\uFDD1z")),2),__generator()));
return o110(o111,o112); 
}))(); 
((function() {var o113 = (function(comp,res){
if(arguments.length < 2) {
throw Error("o113: not enough arguments")
}
else if(arguments.length > 2) {
throw Error("o113: too many arguments");
}
return (function() {if(not(comp(res,3))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),":\n",list("\uFDD1length",list("\uFDD1quote",list("\uFDD1x","\uFDD1y","\uFDD1z")))," got ",res," but expected ",3)); 
}})()
; 
});
var o114 = _eq_;
var o115 = eval(__compiler["compile-program"](list("\uFDD1length",list("\uFDD1quote",list("\uFDD1x","\uFDD1y","\uFDD1z"))),__generator()));
return o113(o114,o115); 
}))(); 
((function() {var o116 = (function(comp,res){
if(arguments.length < 2) {
throw Error("o116: not enough arguments")
}
else if(arguments.length > 2) {
throw Error("o116: too many arguments");
}
return (function() {if(not(comp(res,list(1,2,3,4)))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),":\n",list("\uFDD1list-append",list("\uFDD1quote",list(1,2)),list("\uFDD1quote",list(3,4)))," got ",res," but expected ",list(1,2,3,4))); 
}})()
; 
});
var o117 = _eq_;
var o118 = eval(__compiler["compile-program"](list("\uFDD1list-append",list("\uFDD1quote",list(1,2)),list("\uFDD1quote",list(3,4))),__generator()));
return o116(o117,o118); 
}))(); 
((function() {var o119 = (function(comp,res){
if(arguments.length < 2) {
throw Error("o119: not enough arguments")
}
else if(arguments.length > 2) {
throw Error("o119: too many arguments");
}
return (function() {if(not(comp(res,list("\uFDD1z")))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),":\n",list("\uFDD1list-find",list("\uFDD1quote",list("\uFDD1x","\uFDD1y","\uFDD1z")),list("\uFDD1quote","\uFDD1z"))," got ",res," but expected ",list("\uFDD1z"))); 
}})()
; 
});
var o120 = _eq_;
var o121 = eval(__compiler["compile-program"](list("\uFDD1list-find",list("\uFDD1quote",list("\uFDD1x","\uFDD1y","\uFDD1z")),list("\uFDD1quote","\uFDD1z")),__generator()));
return o119(o120,o121); 
}))(); 
((function() {var o122 = (function(comp,res){
if(arguments.length < 2) {
throw Error("o122: not enough arguments")
}
else if(arguments.length > 2) {
throw Error("o122: too many arguments");
}
return (function() {if(not(comp(res,false))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),":\n",list("\uFDD1list-find",list("\uFDD1quote",list("\uFDD1x","\uFDD1y","\uFDD1z")),list("\uFDD1quote","\uFDD1w"))," got ",res," but expected ",false)); 
}})()
; 
});
var o123 = _eq_;
var o124 = eval(__compiler["compile-program"](list("\uFDD1list-find",list("\uFDD1quote",list("\uFDD1x","\uFDD1y","\uFDD1z")),list("\uFDD1quote","\uFDD1w")),__generator()));
return o122(o123,o124); 
}))(); 
((function() {var o125 = (function(comp,res){
if(arguments.length < 2) {
throw Error("o125: not enough arguments")
}
else if(arguments.length > 2) {
throw Error("o125: too many arguments");
}
return (function() {if(not(comp(res,false))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),":\n",list("\uFDD1list-find",list("\uFDD1quote",list(list(1,2),list(3,4))),list("\uFDD1quote",list(3,4)))," got ",res," but expected ",false)); 
}})()
; 
});
var o126 = _eq_;
var o127 = eval(__compiler["compile-program"](list("\uFDD1list-find",list("\uFDD1quote",list(list(1,2),list(3,4))),list("\uFDD1quote",list(3,4))),__generator()));
return o125(o126,o127); 
}))(); 
((function() {var o128 = (function(comp,res){
if(arguments.length < 2) {
throw Error("o128: not enough arguments")
}
else if(arguments.length > 2) {
throw Error("o128: too many arguments");
}
return (function() {if(not(comp(res,list(list(3,4))))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),":\n",list("\uFDD1list-find",list("\uFDD1quote",list(list(1,2),list(3,4))),4,"\uFDD1cadr")," got ",res," but expected ",list(list(3,4)))); 
}})()
; 
});
var o129 = _eq_;
var o130 = eval(__compiler["compile-program"](list("\uFDD1list-find",list("\uFDD1quote",list(list(1,2),list(3,4))),4,"\uFDD1cadr"),__generator()));
return o128(o129,o130); 
}))(); 
((function() {var o131 = (function(comp,res){
if(arguments.length < 2) {
throw Error("o131: not enough arguments")
}
else if(arguments.length > 2) {
throw Error("o131: too many arguments");
}
return (function() {if(not(comp(res,list("\uFDD1z","\uFDD1y","\uFDD1x")))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),":\n",list("\uFDD1reverse",list("\uFDD1quote",list("\uFDD1x","\uFDD1y","\uFDD1z")))," got ",res," but expected ",list("\uFDD1z","\uFDD1y","\uFDD1x"))); 
}})()
; 
});
var o132 = _eq_;
var o133 = eval(__compiler["compile-program"](list("\uFDD1reverse",list("\uFDD1quote",list("\uFDD1x","\uFDD1y","\uFDD1z"))),__generator()));
return o131(o132,o133); 
}))(); 
((function() {var o134 = (function(comp,res){
if(arguments.length < 2) {
throw Error("o134: not enough arguments")
}
else if(arguments.length > 2) {
throw Error("o134: too many arguments");
}
return (function() {if(not(comp(res,list(1,2,3)))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),":\n",list("\uFDD1vector->list",vector(1,2,3))," got ",res," but expected ",list(1,2,3))); 
}})()
; 
});
var o135 = _eq_;
var o136 = eval(__compiler["compile-program"](list("\uFDD1vector->list",vector(1,2,3)),__generator()));
return o134(o135,o136); 
}))(); 
((function() {var o137 = (function(comp,res){
if(arguments.length < 2) {
throw Error("o137: not enough arguments")
}
else if(arguments.length > 2) {
throw Error("o137: too many arguments");
}
return (function() {if(not(comp(res,list(1,2,vector(1,2))))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),":\n",list("\uFDD1vector->list",vector(1,2,vector(1,2)))," got ",res," but expected ",list(1,2,vector(1,2)))); 
}})()
; 
});
var o138 = _eq_;
var o139 = eval(__compiler["compile-program"](list("\uFDD1vector->list",vector(1,2,vector(1,2))),__generator()));
return o137(o138,o139); 
}))(); 
((function() {var o140 = (function(comp,res){
if(arguments.length < 2) {
throw Error("o140: not enough arguments")
}
else if(arguments.length > 2) {
throw Error("o140: too many arguments");
}
return (function() {if(not(comp(res,list(2,3,4)))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),":\n",list("\uFDD1map",list("\uFDD1lambda",list("\uFDD1el"),list("\uFDD1+","\uFDD1el",1)),list("\uFDD1quote",list(1,2,3)))," got ",res," but expected ",list(2,3,4))); 
}})()
; 
});
var o141 = _eq_;
var o142 = eval(__compiler["compile-program"](list("\uFDD1map",list("\uFDD1lambda",list("\uFDD1el"),list("\uFDD1+","\uFDD1el",1)),list("\uFDD1quote",list(1,2,3))),__generator()));
return o140(o141,o142); 
}))(); 
((function() {var o143 = (function(comp,res){
if(arguments.length < 2) {
throw Error("o143: not enough arguments")
}
else if(arguments.length > 2) {
throw Error("o143: too many arguments");
}
return (function() {if(not(comp(res,18))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),":\n",list("\uFDD1fold",list("\uFDD1lambda",list("\uFDD1el","\uFDD1acc"),list("\uFDD1+","\uFDD1el","\uFDD1acc")),0,list("\uFDD1quote",list(5,6,7)))," got ",res," but expected ",18)); 
}})()
; 
});
var o144 = _eq_;
var o145 = eval(__compiler["compile-program"](list("\uFDD1fold",list("\uFDD1lambda",list("\uFDD1el","\uFDD1acc"),list("\uFDD1+","\uFDD1el","\uFDD1acc")),0,list("\uFDD1quote",list(5,6,7))),__generator()));
return o143(o144,o145); 
}))(); 
var last = false;
for_dash_each((function(el){
if(arguments.length < 1) {
throw Error("lambda: not enough arguments")
}
else if(arguments.length > 1) {
throw Error("lambda: too many arguments");
}
last = el;
}),list("\uFDD1one","\uFDD1two","\uFDD1three")); 
((function() {var o146 = (function(comp,res){
if(arguments.length < 2) {
throw Error("o146: not enough arguments")
}
else if(arguments.length > 2) {
throw Error("o146: too many arguments");
}
return (function() {if(not(comp(res,"\uFDD1three"))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),":\n","\uFDD1last"," got ",res," but expected ","\uFDD1three")); 
}})()
; 
});
var o147 = _eq_;
var o148 = eval(__compiler["compile-program"]("\uFDD1last",__generator()));
return o146(o147,o148); 
}))(); 
var foo = (function() {
var args = vector_dash__gt_list(Array.prototype.slice.call(arguments));
return args; 
});
((function() {var o149 = (function(comp,res){
if(arguments.length < 2) {
throw Error("o149: not enough arguments")
}
else if(arguments.length > 2) {
throw Error("o149: too many arguments");
}
return (function() {if(not(comp(res,list(1,2,3)))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),":\n",list("\uFDD1foo",1,2,3)," got ",res," but expected ",list(1,2,3))); 
}})()
; 
});
var o150 = _eq_;
var o151 = eval(__compiler["compile-program"](list("\uFDD1foo",1,2,3),__generator()));
return o149(o150,o151); 
}))(); 
((function() {var o152 = (function(comp,res){
if(arguments.length < 2) {
throw Error("o152: not enough arguments")
}
else if(arguments.length > 2) {
throw Error("o152: too many arguments");
}
return (function() {if(not(comp(res,vector(1,1,1,1,1)))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),":\n",list("\uFDD1make-vector",5,1)," got ",res," but expected ",vector(1,1,1,1,1))); 
}})()
; 
});
var o153 = _eq_;
var o154 = eval(__compiler["compile-program"](list("\uFDD1make-vector",5,1),__generator()));
return o152(o153,o154); 
}))(); 
((function() {var o155 = (function(comp,res){
if(arguments.length < 2) {
throw Error("o155: not enough arguments")
}
else if(arguments.length > 2) {
throw Error("o155: too many arguments");
}
return (function() {if(not(comp(res,vector(1,"\uFDD1one","one",dict("\uFDD0one",1))))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),":\n",list("\uFDD1vector",1,list("\uFDD1quote","\uFDD1one"),"one",dict("\uFDD0one",1))," got ",res," but expected ",vector(1,"\uFDD1one","one",dict("\uFDD0one",1)))); 
}})()
; 
});
var o156 = _eq_;
var o157 = eval(__compiler["compile-program"](list("\uFDD1vector",1,list("\uFDD1quote","\uFDD1one"),"one",dict("\uFDD0one",1)),__generator()));
return o155(o156,o157); 
}))(); 
((function() {var o158 = (function(comp,res){
if(arguments.length < 2) {
throw Error("o158: not enough arguments")
}
else if(arguments.length > 2) {
throw Error("o158: too many arguments");
}
return (function() {if(not(comp(res,"one"))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),":\n",list("\uFDD1vector-ref",vector(1,list("\uFDD1quote","\uFDD1one"),"one"),2)," got ",res," but expected ","one")); 
}})()
; 
});
var o159 = _eq_;
var o160 = eval(__compiler["compile-program"](list("\uFDD1vector-ref",vector(1,list("\uFDD1quote","\uFDD1one"),"one"),2),__generator()));
return o158(o159,o160); 
}))(); 
var vec = vector(1,2,3,4);
vector_dash_put_excl_(vec,3,3); 
((function() {var o161 = (function(comp,res){
if(arguments.length < 2) {
throw Error("o161: not enough arguments")
}
else if(arguments.length > 2) {
throw Error("o161: too many arguments");
}
return (function() {if(not(comp(res,vector(1,2,3,3)))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),":\n","\uFDD1vec"," got ",res," but expected ",vector(1,2,3,3))); 
}})()
; 
});
var o162 = _eq_;
var o163 = eval(__compiler["compile-program"]("\uFDD1vec",__generator()));
return o161(o162,o163); 
}))(); 
((function() {var o164 = (function(comp,res){
if(arguments.length < 2) {
throw Error("o164: not enough arguments")
}
else if(arguments.length > 2) {
throw Error("o164: too many arguments");
}
return (function() {if(not(comp(res,vector(1,2,3,4)))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),":\n",list("\uFDD1vector-concat",vector(1,2),vector(3,4))," got ",res," but expected ",vector(1,2,3,4))); 
}})()
; 
});
var o165 = _eq_;
var o166 = eval(__compiler["compile-program"](list("\uFDD1vector-concat",vector(1,2),vector(3,4)),__generator()));
return o164(o165,o166); 
}))(); 
((function() {var o167 = (function(comp,res){
if(arguments.length < 2) {
throw Error("o167: not enough arguments")
}
else if(arguments.length > 2) {
throw Error("o167: too many arguments");
}
return (function() {if(not(comp(res,vector(2,3,4)))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),":\n",list("\uFDD1vector-slice",vector(1,2,3,4),1)," got ",res," but expected ",vector(2,3,4))); 
}})()
; 
});
var o168 = _eq_;
var o169 = eval(__compiler["compile-program"](list("\uFDD1vector-slice",vector(1,2,3,4),1),__generator()));
return o167(o168,o169); 
}))(); 
((function() {var o170 = (function(comp,res){
if(arguments.length < 2) {
throw Error("o170: not enough arguments")
}
else if(arguments.length > 2) {
throw Error("o170: too many arguments");
}
return (function() {if(not(comp(res,vector(2,3)))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),":\n",list("\uFDD1vector-slice",vector(1,2,3,4),1,3)," got ",res," but expected ",vector(2,3))); 
}})()
; 
});
var o171 = _eq_;
var o172 = eval(__compiler["compile-program"](list("\uFDD1vector-slice",vector(1,2,3,4),1,3),__generator()));
return o170(o171,o172); 
}))(); 
var vec = vector(1,2,3,4);
vector_dash_push_excl_(vec,5); 
((function() {var o173 = (function(comp,res){
if(arguments.length < 2) {
throw Error("o173: not enough arguments")
}
else if(arguments.length > 2) {
throw Error("o173: too many arguments");
}
return (function() {if(not(comp(res,vector(1,2,3,4,5)))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),":\n","\uFDD1vec"," got ",res," but expected ",vector(1,2,3,4,5))); 
}})()
; 
});
var o174 = _eq_;
var o175 = eval(__compiler["compile-program"]("\uFDD1vec",__generator()));
return o173(o174,o175); 
}))(); 
((function() {var o176 = (function(comp,res){
if(arguments.length < 2) {
throw Error("o176: not enough arguments")
}
else if(arguments.length > 2) {
throw Error("o176: too many arguments");
}
return (function() {if(not(comp(res,2))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),":\n",list("\uFDD1vector-find",list("\uFDD1quote",vector("\uFDD1x","\uFDD1y","\uFDD1z")),list("\uFDD1quote","\uFDD1z"))," got ",res," but expected ",2)); 
}})()
; 
});
var o177 = _eq_;
var o178 = eval(__compiler["compile-program"](list("\uFDD1vector-find",list("\uFDD1quote",vector("\uFDD1x","\uFDD1y","\uFDD1z")),list("\uFDD1quote","\uFDD1z")),__generator()));
return o176(o177,o178); 
}))(); 
((function() {var o179 = (function(comp,res){
if(arguments.length < 2) {
throw Error("o179: not enough arguments")
}
else if(arguments.length > 2) {
throw Error("o179: too many arguments");
}
return (function() {if(not(comp(res,3))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),":\n",list("\uFDD1vector-length",vector(1,2,3))," got ",res," but expected ",3)); 
}})()
; 
});
var o180 = _eq_;
var o181 = eval(__compiler["compile-program"](list("\uFDD1vector-length",vector(1,2,3)),__generator()));
return o179(o180,o181); 
}))(); 
((function() {var o182 = (function(comp,res){
if(arguments.length < 2) {
throw Error("o182: not enough arguments")
}
else if(arguments.length > 2) {
throw Error("o182: too many arguments");
}
return (function() {if(not(comp(res,vector(1,2,3)))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),":\n",list("\uFDD1list->vector",list("\uFDD1quote",list(1,2,3)))," got ",res," but expected ",vector(1,2,3))); 
}})()
; 
});
var o183 = _eq_;
var o184 = eval(__compiler["compile-program"](list("\uFDD1list->vector",list("\uFDD1quote",list(1,2,3))),__generator()));
return o182(o183,o184); 
}))(); 
((function() {var o185 = (function(comp,res){
if(arguments.length < 2) {
throw Error("o185: not enough arguments")
}
else if(arguments.length > 2) {
throw Error("o185: too many arguments");
}
return (function() {if(not(comp(res,vector(2,3,4,5)))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),":\n",list("\uFDD1vector-map",list("\uFDD1lambda",list("\uFDD1el"),list("\uFDD1+","\uFDD1el",1)),vector(1,2,3,4))," got ",res," but expected ",vector(2,3,4,5))); 
}})()
; 
});
var o186 = _eq_;
var o187 = eval(__compiler["compile-program"](list("\uFDD1vector-map",list("\uFDD1lambda",list("\uFDD1el"),list("\uFDD1+","\uFDD1el",1)),vector(1,2,3,4)),__generator()));
return o185(o186,o187); 
}))(); 
((function() {var o188 = (function(comp,res){
if(arguments.length < 2) {
throw Error("o188: not enough arguments")
}
else if(arguments.length > 2) {
throw Error("o188: too many arguments");
}
return (function() {if(not(comp(res,6))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),":\n",list("\uFDD1vector-fold",list("\uFDD1lambda",list("\uFDD1el","\uFDD1acc"),list("\uFDD1+","\uFDD1el","\uFDD1acc")),0,vector(1,2,3))," got ",res," but expected ",6)); 
}})()
; 
});
var o189 = _eq_;
var o190 = eval(__compiler["compile-program"](list("\uFDD1vector-fold",list("\uFDD1lambda",list("\uFDD1el","\uFDD1acc"),list("\uFDD1+","\uFDD1el","\uFDD1acc")),0,vector(1,2,3)),__generator()));
return o188(o189,o190); 
}))(); 
var last = false;
vector_dash_for_dash_each((function(el){
if(arguments.length < 1) {
throw Error("lambda: not enough arguments")
}
else if(arguments.length > 1) {
throw Error("lambda: too many arguments");
}
last = el;
}),vector(4,5,6)); 
((function() {var o191 = (function(comp,res){
if(arguments.length < 2) {
throw Error("o191: not enough arguments")
}
else if(arguments.length > 2) {
throw Error("o191: too many arguments");
}
return (function() {if(not(comp(res,6))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),":\n","\uFDD1last"," got ",res," but expected ",6)); 
}})()
; 
});
var o192 = _eq_;
var o193 = eval(__compiler["compile-program"]("\uFDD1last",__generator()));
return o191(o192,o193); 
}))(); 
((function() {var o194 = (function(comp,res){
if(arguments.length < 2) {
throw Error("o194: not enough arguments")
}
else if(arguments.length > 2) {
throw Error("o194: too many arguments");
}
return (function() {if(not(comp(res,dict("\uFDD0two",2,"\uFDD0one",1)))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),":\n",list("\uFDD1dict","\uFDD0one",1,"\uFDD0two",2)," got ",res," but expected ",dict("\uFDD0two",2,"\uFDD0one",1))); 
}})()
; 
});
var o195 = _eq_;
var o196 = eval(__compiler["compile-program"](list("\uFDD1dict","\uFDD0one",1,"\uFDD0two",2),__generator()));
return o194(o195,o196); 
}))(); 
((function() {var o197 = (function(comp,res){
if(arguments.length < 2) {
throw Error("o197: not enough arguments")
}
else if(arguments.length > 2) {
throw Error("o197: too many arguments");
}
return (function() {if(not(comp(res,1))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),":\n",list("\uFDD1dict-ref",dict("\uFDD0two",2,"\uFDD0one",1),"\uFDD0one")," got ",res," but expected ",1)); 
}})()
; 
});
var o198 = _eq_;
var o199 = eval(__compiler["compile-program"](list("\uFDD1dict-ref",dict("\uFDD0two",2,"\uFDD0one",1),"\uFDD0one"),__generator()));
return o197(o198,o199); 
}))(); 
var dct = dict("\uFDD0foo","bar","\uFDD0baz","bizz");
dict_dash_put_excl_(dct,"\uFDD0mumble","nimble"); 
((function() {var o200 = (function(comp,res){
if(arguments.length < 2) {
throw Error("o200: not enough arguments")
}
else if(arguments.length > 2) {
throw Error("o200: too many arguments");
}
return (function() {if(not(comp(res,dict("\uFDD0mumble","nimble","\uFDD0baz","bizz","\uFDD0foo","bar")))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),":\n","\uFDD1dct"," got ",res," but expected ",dict("\uFDD0mumble","nimble","\uFDD0baz","bizz","\uFDD0foo","bar"))); 
}})()
; 
});
var o201 = _eq_;
var o202 = eval(__compiler["compile-program"]("\uFDD1dct",__generator()));
return o200(o201,o202); 
}))(); 
((function() {var o203 = (function(comp,res){
if(arguments.length < 2) {
throw Error("o203: not enough arguments")
}
else if(arguments.length > 2) {
throw Error("o203: too many arguments");
}
return (function() {if(not(comp(res,dict("\uFDD0bar",3,"\uFDD0foo",2)))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),":\n",list("\uFDD1dict-map",list("\uFDD1lambda",list("\uFDD1el"),list("\uFDD1+","\uFDD1el",1)),dict("\uFDD0bar",2,"\uFDD0foo",1))," got ",res," but expected ",dict("\uFDD0bar",3,"\uFDD0foo",2))); 
}})()
; 
});
var o204 = _eq_;
var o205 = eval(__compiler["compile-program"](list("\uFDD1dict-map",list("\uFDD1lambda",list("\uFDD1el"),list("\uFDD1+","\uFDD1el",1)),dict("\uFDD0bar",2,"\uFDD0foo",1)),__generator()));
return o203(o204,o205); 
}))(); 
((function() {var o206 = (function(comp,res){
if(arguments.length < 2) {
throw Error("o206: not enough arguments")
}
else if(arguments.length > 2) {
throw Error("o206: too many arguments");
}
return (function() {if(not(comp(res,dict("\uFDD0four",4,"\uFDD0three",3,"\uFDD0two",2,"\uFDD0one",1)))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),":\n",list("\uFDD1dict-merge",dict("\uFDD0two",2,"\uFDD0one",1),dict("\uFDD0four",4,"\uFDD0three",3))," got ",res," but expected ",dict("\uFDD0four",4,"\uFDD0three",3,"\uFDD0two",2,"\uFDD0one",1))); 
}})()
; 
});
var o207 = _eq_;
var o208 = eval(__compiler["compile-program"](list("\uFDD1dict-merge",dict("\uFDD0two",2,"\uFDD0one",1),dict("\uFDD0four",4,"\uFDD0three",3)),__generator()));
return o206(o207,o208); 
}))(); 
((function() {var o209 = (function(comp,res){
if(arguments.length < 2) {
throw Error("o209: not enough arguments")
}
else if(arguments.length > 2) {
throw Error("o209: too many arguments");
}
return (function() {if(not(comp(res,true))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),":\n",list("\uFDD1let",list(list("\uFDD1vec",list("\uFDD1dict->vector",dict("\uFDD0two",2,"\uFDD0one",1)))),list("\uFDD1and",list("\uFDD1vector-find","\uFDD1vec","\uFDD0one"),list("\uFDD1vector-find","\uFDD1vec",1),list("\uFDD1vector-find","\uFDD1vec","\uFDD0two"),list("\uFDD1vector-find","\uFDD1vec",2)))," got ",res," but expected ",true)); 
}})()
; 
});
var o210 = (function(res,val){
if(arguments.length < 2) {
throw Error("lambda: not enough arguments")
}
else if(arguments.length > 2) {
throw Error("lambda: too many arguments");
}
return not(eq_p_(res,false)); 
});
var o211 = eval(__compiler["compile-program"](list("\uFDD1let",list(list("\uFDD1vec",list("\uFDD1dict->vector",dict("\uFDD0two",2,"\uFDD0one",1)))),list("\uFDD1and",list("\uFDD1vector-find","\uFDD1vec","\uFDD0one"),list("\uFDD1vector-find","\uFDD1vec",1),list("\uFDD1vector-find","\uFDD1vec","\uFDD0two"),list("\uFDD1vector-find","\uFDD1vec",2))),__generator()));
return o209(o210,o211); 
}))(); 
((function() {var o212 = (function(comp,res){
if(arguments.length < 2) {
throw Error("o212: not enough arguments")
}
else if(arguments.length > 2) {
throw Error("o212: too many arguments");
}
return (function() {if(not(comp(res,true))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),":\n",list("\uFDD1let",list(list("\uFDD1lst",list("\uFDD1dict->list",dict("\uFDD0two",2,"\uFDD0one",1)))),list("\uFDD1and",list("\uFDD1list-find","\uFDD1lst","\uFDD0one"),list("\uFDD1list-find","\uFDD1lst",1),list("\uFDD1list-find","\uFDD1lst","\uFDD0two"),list("\uFDD1list-find","\uFDD1lst",2)))," got ",res," but expected ",true)); 
}})()
; 
});
var o213 = (function(res,val){
if(arguments.length < 2) {
throw Error("lambda: not enough arguments")
}
else if(arguments.length > 2) {
throw Error("lambda: too many arguments");
}
return not(eq_p_(res,false)); 
});
var o214 = eval(__compiler["compile-program"](list("\uFDD1let",list(list("\uFDD1lst",list("\uFDD1dict->list",dict("\uFDD0two",2,"\uFDD0one",1)))),list("\uFDD1and",list("\uFDD1list-find","\uFDD1lst","\uFDD0one"),list("\uFDD1list-find","\uFDD1lst",1),list("\uFDD1list-find","\uFDD1lst","\uFDD0two"),list("\uFDD1list-find","\uFDD1lst",2))),__generator()));
return o212(o213,o214); 
}))(); 
((function() {var o215 = (function(k){
if(arguments.length < 1) {
throw Error("o215: not enough arguments")
}
else if(arguments.length > 1) {
throw Error("o215: too many arguments");
}
((function() {var o217 = (function(comp,res){
if(arguments.length < 2) {
throw Error("o217: not enough arguments")
}
else if(arguments.length > 2) {
throw Error("o217: too many arguments");
}
return (function() {if(not(comp(res,true))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),":\n",list("\uFDD1list-find","\uFDD1k","\uFDD0foo")," got ",res," but expected ",true)); 
}})()
; 
});
var o218 = (function(res,val){
if(arguments.length < 2) {
throw Error("lambda: not enough arguments")
}
else if(arguments.length > 2) {
throw Error("lambda: too many arguments");
}
return not(eq_p_(res,false)); 
});
var o219 = eval(__compiler["compile-program"](list("\uFDD1list-find","\uFDD1k","\uFDD0foo"),__generator()));
return o217(o218,o219); 
}))(); 
return ((function() {var o220 = (function(comp,res){
if(arguments.length < 2) {
throw Error("o220: not enough arguments")
}
else if(arguments.length > 2) {
throw Error("o220: too many arguments");
}
return (function() {if(not(comp(res,true))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),":\n",list("\uFDD1list-find","\uFDD1k","\uFDD0bar")," got ",res," but expected ",true)); 
}})()
; 
});
var o221 = (function(res,val){
if(arguments.length < 2) {
throw Error("lambda: not enough arguments")
}
else if(arguments.length > 2) {
throw Error("lambda: too many arguments");
}
return not(eq_p_(res,false)); 
});
var o222 = eval(__compiler["compile-program"](list("\uFDD1list-find","\uFDD1k","\uFDD0bar"),__generator()));
return o220(o221,o222); 
}))(); 
});
var o216 = keys(dict("\uFDD0bar",2,"\uFDD0foo",1));
return o215(o216); 
}))(); 
((function() {var o223 = (function(v){
if(arguments.length < 1) {
throw Error("o223: not enough arguments")
}
else if(arguments.length > 1) {
throw Error("o223: too many arguments");
}
((function() {var o225 = (function(comp,res){
if(arguments.length < 2) {
throw Error("o225: not enough arguments")
}
else if(arguments.length > 2) {
throw Error("o225: too many arguments");
}
return (function() {if(not(comp(res,true))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),":\n",list("\uFDD1list-find","\uFDD1v",1)," got ",res," but expected ",true)); 
}})()
; 
});
var o226 = (function(res,val){
if(arguments.length < 2) {
throw Error("lambda: not enough arguments")
}
else if(arguments.length > 2) {
throw Error("lambda: too many arguments");
}
return not(eq_p_(res,false)); 
});
var o227 = eval(__compiler["compile-program"](list("\uFDD1list-find","\uFDD1v",1),__generator()));
return o225(o226,o227); 
}))(); 
return ((function() {var o228 = (function(comp,res){
if(arguments.length < 2) {
throw Error("o228: not enough arguments")
}
else if(arguments.length > 2) {
throw Error("o228: too many arguments");
}
return (function() {if(not(comp(res,true))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),":\n",list("\uFDD1list-find","\uFDD1v",2)," got ",res," but expected ",true)); 
}})()
; 
});
var o229 = (function(res,val){
if(arguments.length < 2) {
throw Error("lambda: not enough arguments")
}
else if(arguments.length > 2) {
throw Error("lambda: too many arguments");
}
return not(eq_p_(res,false)); 
});
var o230 = eval(__compiler["compile-program"](list("\uFDD1list-find","\uFDD1v",2),__generator()));
return o228(o229,o230); 
}))(); 
});
var o224 = vals(dict("\uFDD0bar",2,"\uFDD0foo",1));
return o223(o224); 
}))(); 
((function() {var o231 = (function(dct){
if(arguments.length < 1) {
throw Error("o231: not enough arguments")
}
else if(arguments.length > 1) {
throw Error("o231: too many arguments");
}
((function() {var o233 = (function(comp,res){
if(arguments.length < 2) {
throw Error("o233: not enough arguments")
}
else if(arguments.length > 2) {
throw Error("o233: too many arguments");
}
return (function() {if(not(comp(res,1))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),":\n",list("\uFDD1dict-ref","\uFDD1dct","\uFDD0foo")," got ",res," but expected ",1)); 
}})()
; 
});
var o234 = _eq_;
var o235 = eval(__compiler["compile-program"](list("\uFDD1dict-ref","\uFDD1dct","\uFDD0foo"),__generator()));
return o233(o234,o235); 
}))(); 
return ((function() {var o236 = (function(comp,res){
if(arguments.length < 2) {
throw Error("o236: not enough arguments")
}
else if(arguments.length > 2) {
throw Error("o236: too many arguments");
}
return (function() {if(not(comp(res,2))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),":\n",list("\uFDD1dict-ref","\uFDD1dct","\uFDD0bar")," got ",res," but expected ",2)); 
}})()
; 
});
var o237 = _eq_;
var o238 = eval(__compiler["compile-program"](list("\uFDD1dict-ref","\uFDD1dct","\uFDD0bar"),__generator()));
return o236(o237,o238); 
}))(); 
});
var o232 = zip(list("\uFDD1foo","\uFDD1bar","\uFDD1baz"),list(1,2,3));
return o231(o232); 
}))(); 
((function() {var o239 = (function(comp,res){
if(arguments.length < 2) {
throw Error("o239: not enough arguments")
}
else if(arguments.length > 2) {
throw Error("o239: too many arguments");
}
return (function() {if(not(comp(res,true))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),":\n",list("\uFDD1not",false)," got ",res," but expected ",true)); 
}})()
; 
});
var o240 = _eq_;
var o241 = eval(__compiler["compile-program"](list("\uFDD1not",false),__generator()));
return o239(o240,o241); 
}))(); 
((function() {var o242 = (function(comp,res){
if(arguments.length < 2) {
throw Error("o242: not enough arguments")
}
else if(arguments.length > 2) {
throw Error("o242: too many arguments");
}
return (function() {if(not(comp(res,false))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),":\n",list("\uFDD1not",0)," got ",res," but expected ",false)); 
}})()
; 
});
var o243 = _eq_;
var o244 = eval(__compiler["compile-program"](list("\uFDD1not",0),__generator()));
return o242(o243,o244); 
}))(); 
((function() {var o245 = (function(comp,res){
if(arguments.length < 2) {
throw Error("o245: not enough arguments")
}
else if(arguments.length > 2) {
throw Error("o245: too many arguments");
}
return (function() {if(not(comp(res,false))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),":\n",list("\uFDD1not","foo")," got ",res," but expected ",false)); 
}})()
; 
});
var o246 = _eq_;
var o247 = eval(__compiler["compile-program"](list("\uFDD1not","foo"),__generator()));
return o245(o246,o247); 
}))(); 
((function() {var o248 = (function(comp,res){
if(arguments.length < 2) {
throw Error("o248: not enough arguments")
}
else if(arguments.length > 2) {
throw Error("o248: too many arguments");
}
return (function() {if(not(comp(res,true))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),":\n",list("\uFDD1==",3,3)," got ",res," but expected ",true)); 
}})()
; 
});
var o249 = (function(res,val){
if(arguments.length < 2) {
throw Error("lambda: not enough arguments")
}
else if(arguments.length > 2) {
throw Error("lambda: too many arguments");
}
return not(eq_p_(res,false)); 
});
var o250 = eval(__compiler["compile-program"](list("\uFDD1==",3,3),__generator()));
return o248(o249,o250); 
}))(); 
((function() {var o251 = (function(comp,res){
if(arguments.length < 2) {
throw Error("o251: not enough arguments")
}
else if(arguments.length > 2) {
throw Error("o251: too many arguments");
}
return (function() {if(not(comp(res,true))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),":\n",list("\uFDD1=",3,3)," got ",res," but expected ",true)); 
}})()
; 
});
var o252 = (function(res,val){
if(arguments.length < 2) {
throw Error("lambda: not enough arguments")
}
else if(arguments.length > 2) {
throw Error("lambda: too many arguments");
}
return not(eq_p_(res,false)); 
});
var o253 = eval(__compiler["compile-program"](list("\uFDD1=",3,3),__generator()));
return o251(o252,o253); 
}))(); 
((function() {var o254 = (function(comp,res){
if(arguments.length < 2) {
throw Error("o254: not enough arguments")
}
else if(arguments.length > 2) {
throw Error("o254: too many arguments");
}
return (function() {if(not(comp(res,true))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),":\n",list("\uFDD1==","foo","foo")," got ",res," but expected ",true)); 
}})()
; 
});
var o255 = (function(res,val){
if(arguments.length < 2) {
throw Error("lambda: not enough arguments")
}
else if(arguments.length > 2) {
throw Error("lambda: too many arguments");
}
return not(eq_p_(res,false)); 
});
var o256 = eval(__compiler["compile-program"](list("\uFDD1==","foo","foo"),__generator()));
return o254(o255,o256); 
}))(); 
((function() {var o257 = (function(comp,res){
if(arguments.length < 2) {
throw Error("o257: not enough arguments")
}
else if(arguments.length > 2) {
throw Error("o257: too many arguments");
}
return (function() {if(not(comp(res,true))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),":\n",list("\uFDD1=","foo","foo")," got ",res," but expected ",true)); 
}})()
; 
});
var o258 = (function(res,val){
if(arguments.length < 2) {
throw Error("lambda: not enough arguments")
}
else if(arguments.length > 2) {
throw Error("lambda: too many arguments");
}
return not(eq_p_(res,false)); 
});
var o259 = eval(__compiler["compile-program"](list("\uFDD1=","foo","foo"),__generator()));
return o257(o258,o259); 
}))(); 
((function() {var o260 = (function(comp,res){
if(arguments.length < 2) {
throw Error("o260: not enough arguments")
}
else if(arguments.length > 2) {
throw Error("o260: too many arguments");
}
return (function() {if(not(comp(res,true))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),":\n",list("\uFDD1==",true,true)," got ",res," but expected ",true)); 
}})()
; 
});
var o261 = (function(res,val){
if(arguments.length < 2) {
throw Error("lambda: not enough arguments")
}
else if(arguments.length > 2) {
throw Error("lambda: too many arguments");
}
return not(eq_p_(res,false)); 
});
var o262 = eval(__compiler["compile-program"](list("\uFDD1==",true,true),__generator()));
return o260(o261,o262); 
}))(); 
((function() {var o263 = (function(comp,res){
if(arguments.length < 2) {
throw Error("o263: not enough arguments")
}
else if(arguments.length > 2) {
throw Error("o263: too many arguments");
}
return (function() {if(not(comp(res,true))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),":\n",list("\uFDD1=",true,true)," got ",res," but expected ",true)); 
}})()
; 
});
var o264 = (function(res,val){
if(arguments.length < 2) {
throw Error("lambda: not enough arguments")
}
else if(arguments.length > 2) {
throw Error("lambda: too many arguments");
}
return not(eq_p_(res,false)); 
});
var o265 = eval(__compiler["compile-program"](list("\uFDD1=",true,true),__generator()));
return o263(o264,o265); 
}))(); 
((function() {var o266 = (function(comp,res){
if(arguments.length < 2) {
throw Error("o266: not enough arguments")
}
else if(arguments.length > 2) {
throw Error("o266: too many arguments");
}
return (function() {if(not(comp(res,true))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),":\n",list("\uFDD1==",list("\uFDD1quote","\uFDD1foo"),list("\uFDD1quote","\uFDD1foo"))," got ",res," but expected ",true)); 
}})()
; 
});
var o267 = (function(res,val){
if(arguments.length < 2) {
throw Error("lambda: not enough arguments")
}
else if(arguments.length > 2) {
throw Error("lambda: too many arguments");
}
return not(eq_p_(res,false)); 
});
var o268 = eval(__compiler["compile-program"](list("\uFDD1==",list("\uFDD1quote","\uFDD1foo"),list("\uFDD1quote","\uFDD1foo")),__generator()));
return o266(o267,o268); 
}))(); 
((function() {var o269 = (function(comp,res){
if(arguments.length < 2) {
throw Error("o269: not enough arguments")
}
else if(arguments.length > 2) {
throw Error("o269: too many arguments");
}
return (function() {if(not(comp(res,true))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),":\n",list("\uFDD1=",list("\uFDD1quote","\uFDD1foo"),list("\uFDD1quote","\uFDD1foo"))," got ",res," but expected ",true)); 
}})()
; 
});
var o270 = (function(res,val){
if(arguments.length < 2) {
throw Error("lambda: not enough arguments")
}
else if(arguments.length > 2) {
throw Error("lambda: too many arguments");
}
return not(eq_p_(res,false)); 
});
var o271 = eval(__compiler["compile-program"](list("\uFDD1=",list("\uFDD1quote","\uFDD1foo"),list("\uFDD1quote","\uFDD1foo")),__generator()));
return o269(o270,o271); 
}))(); 
((function() {var o272 = (function(comp,res){
if(arguments.length < 2) {
throw Error("o272: not enough arguments")
}
else if(arguments.length > 2) {
throw Error("o272: too many arguments");
}
return (function() {if(not(comp(res,true))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),":\n",list("\uFDD1==",list("\uFDD1quote",_emptylst),list("\uFDD1quote",_emptylst))," got ",res," but expected ",true)); 
}})()
; 
});
var o273 = (function(res,val){
if(arguments.length < 2) {
throw Error("lambda: not enough arguments")
}
else if(arguments.length > 2) {
throw Error("lambda: too many arguments");
}
return not(eq_p_(res,false)); 
});
var o274 = eval(__compiler["compile-program"](list("\uFDD1==",list("\uFDD1quote",_emptylst),list("\uFDD1quote",_emptylst)),__generator()));
return o272(o273,o274); 
}))(); 
((function() {var o275 = (function(comp,res){
if(arguments.length < 2) {
throw Error("o275: not enough arguments")
}
else if(arguments.length > 2) {
throw Error("o275: too many arguments");
}
return (function() {if(not(comp(res,true))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),":\n",list("\uFDD1=",list("\uFDD1quote",_emptylst),list("\uFDD1quote",_emptylst))," got ",res," but expected ",true)); 
}})()
; 
});
var o276 = (function(res,val){
if(arguments.length < 2) {
throw Error("lambda: not enough arguments")
}
else if(arguments.length > 2) {
throw Error("lambda: too many arguments");
}
return not(eq_p_(res,false)); 
});
var o277 = eval(__compiler["compile-program"](list("\uFDD1=",list("\uFDD1quote",_emptylst),list("\uFDD1quote",_emptylst)),__generator()));
return o275(o276,o277); 
}))(); 
var foo = list(1,2,3);
((function() {var o278 = (function(comp,res){
if(arguments.length < 2) {
throw Error("o278: not enough arguments")
}
else if(arguments.length > 2) {
throw Error("o278: too many arguments");
}
return (function() {if(not(comp(res,true))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),":\n",list("\uFDD1==","\uFDD1foo","\uFDD1foo")," got ",res," but expected ",true)); 
}})()
; 
});
var o279 = (function(res,val){
if(arguments.length < 2) {
throw Error("lambda: not enough arguments")
}
else if(arguments.length > 2) {
throw Error("lambda: too many arguments");
}
return not(eq_p_(res,false)); 
});
var o280 = eval(__compiler["compile-program"](list("\uFDD1==","\uFDD1foo","\uFDD1foo"),__generator()));
return o278(o279,o280); 
}))(); 
((function() {var o281 = (function(comp,res){
if(arguments.length < 2) {
throw Error("o281: not enough arguments")
}
else if(arguments.length > 2) {
throw Error("o281: too many arguments");
}
return (function() {if(not(comp(res,false))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),":\n",list("\uFDD1==",list("\uFDD1quote",list(1,2,3)),list("\uFDD1quote",list(1,2,3)))," got ",res," but expected ",false)); 
}})()
; 
});
var o282 = _eq_;
var o283 = eval(__compiler["compile-program"](list("\uFDD1==",list("\uFDD1quote",list(1,2,3)),list("\uFDD1quote",list(1,2,3))),__generator()));
return o281(o282,o283); 
}))(); 
((function() {var o284 = (function(comp,res){
if(arguments.length < 2) {
throw Error("o284: not enough arguments")
}
else if(arguments.length > 2) {
throw Error("o284: too many arguments");
}
return (function() {if(not(comp(res,true))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),":\n",list("\uFDD1=",list("\uFDD1quote",list(1,2,3)),list("\uFDD1quote",list(1,2,3)))," got ",res," but expected ",true)); 
}})()
; 
});
var o285 = (function(res,val){
if(arguments.length < 2) {
throw Error("lambda: not enough arguments")
}
else if(arguments.length > 2) {
throw Error("lambda: too many arguments");
}
return not(eq_p_(res,false)); 
});
var o286 = eval(__compiler["compile-program"](list("\uFDD1=",list("\uFDD1quote",list(1,2,3)),list("\uFDD1quote",list(1,2,3))),__generator()));
return o284(o285,o286); 
}))(); 
var foo = vector(1,2,3);
((function() {var o287 = (function(comp,res){
if(arguments.length < 2) {
throw Error("o287: not enough arguments")
}
else if(arguments.length > 2) {
throw Error("o287: too many arguments");
}
return (function() {if(not(comp(res,true))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),":\n",list("\uFDD1==","\uFDD1foo","\uFDD1foo")," got ",res," but expected ",true)); 
}})()
; 
});
var o288 = (function(res,val){
if(arguments.length < 2) {
throw Error("lambda: not enough arguments")
}
else if(arguments.length > 2) {
throw Error("lambda: too many arguments");
}
return not(eq_p_(res,false)); 
});
var o289 = eval(__compiler["compile-program"](list("\uFDD1==","\uFDD1foo","\uFDD1foo"),__generator()));
return o287(o288,o289); 
}))(); 
((function() {var o290 = (function(comp,res){
if(arguments.length < 2) {
throw Error("o290: not enough arguments")
}
else if(arguments.length > 2) {
throw Error("o290: too many arguments");
}
return (function() {if(not(comp(res,false))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),":\n",list("\uFDD1==",vector(1,2,3),vector(1,2,3))," got ",res," but expected ",false)); 
}})()
; 
});
var o291 = _eq_;
var o292 = eval(__compiler["compile-program"](list("\uFDD1==",vector(1,2,3),vector(1,2,3)),__generator()));
return o290(o291,o292); 
}))(); 
((function() {var o293 = (function(comp,res){
if(arguments.length < 2) {
throw Error("o293: not enough arguments")
}
else if(arguments.length > 2) {
throw Error("o293: too many arguments");
}
return (function() {if(not(comp(res,true))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),":\n",list("\uFDD1=",vector(1,2,3),vector(1,2,3))," got ",res," but expected ",true)); 
}})()
; 
});
var o294 = (function(res,val){
if(arguments.length < 2) {
throw Error("lambda: not enough arguments")
}
else if(arguments.length > 2) {
throw Error("lambda: too many arguments");
}
return not(eq_p_(res,false)); 
});
var o295 = eval(__compiler["compile-program"](list("\uFDD1=",vector(1,2,3),vector(1,2,3)),__generator()));
return o293(o294,o295); 
}))(); 
var foo = dict("\uFDD0one",1);
((function() {var o296 = (function(comp,res){
if(arguments.length < 2) {
throw Error("o296: not enough arguments")
}
else if(arguments.length > 2) {
throw Error("o296: too many arguments");
}
return (function() {if(not(comp(res,true))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),":\n",list("\uFDD1==","\uFDD1foo","\uFDD1foo")," got ",res," but expected ",true)); 
}})()
; 
});
var o297 = (function(res,val){
if(arguments.length < 2) {
throw Error("lambda: not enough arguments")
}
else if(arguments.length > 2) {
throw Error("lambda: too many arguments");
}
return not(eq_p_(res,false)); 
});
var o298 = eval(__compiler["compile-program"](list("\uFDD1==","\uFDD1foo","\uFDD1foo"),__generator()));
return o296(o297,o298); 
}))(); 
((function() {var o299 = (function(comp,res){
if(arguments.length < 2) {
throw Error("o299: not enough arguments")
}
else if(arguments.length > 2) {
throw Error("o299: too many arguments");
}
return (function() {if(not(comp(res,false))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),":\n",list("\uFDD1==",dict("\uFDD0one",1),dict("\uFDD0one",1))," got ",res," but expected ",false)); 
}})()
; 
});
var o300 = _eq_;
var o301 = eval(__compiler["compile-program"](list("\uFDD1==",dict("\uFDD0one",1),dict("\uFDD0one",1)),__generator()));
return o299(o300,o301); 
}))(); 
((function() {var o302 = (function(comp,res){
if(arguments.length < 2) {
throw Error("o302: not enough arguments")
}
else if(arguments.length > 2) {
throw Error("o302: too many arguments");
}
return (function() {if(not(comp(res,true))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),":\n",list("\uFDD1=",dict("\uFDD0one",1),dict("\uFDD0one",1))," got ",res," but expected ",true)); 
}})()
; 
});
var o303 = (function(res,val){
if(arguments.length < 2) {
throw Error("lambda: not enough arguments")
}
else if(arguments.length > 2) {
throw Error("lambda: too many arguments");
}
return not(eq_p_(res,false)); 
});
var o304 = eval(__compiler["compile-program"](list("\uFDD1=",dict("\uFDD0one",1),dict("\uFDD0one",1)),__generator()));
return o302(o303,o304); 
}))(); 
false; 
((function() {var o306 = (function(comp,res){
if(arguments.length < 2) {
throw Error("o306: not enough arguments")
}
else if(arguments.length > 2) {
throw Error("o306: too many arguments");
}
return (function() {if(not(comp(res,false))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),":\n",list("\uFDD1boolean?",5)," got ",res," but expected ",false)); 
}})()
; 
});
var o307 = _eq_;
var o308 = eval(__compiler["compile-program"](list("\uFDD1boolean?",5),__generator()));
return o306(o307,o308); 
}))(); 
((function() {var o309 = (function(comp,res){
if(arguments.length < 2) {
throw Error("o309: not enough arguments")
}
else if(arguments.length > 2) {
throw Error("o309: too many arguments");
}
return (function() {if(not(comp(res,true))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),":\n",list("\uFDD1number?",5)," got ",res," but expected ",true)); 
}})()
; 
});
var o310 = _eq_;
var o311 = eval(__compiler["compile-program"](list("\uFDD1number?",5),__generator()));
return o309(o310,o311); 
}))(); 
((function() {var o312 = (function(comp,res){
if(arguments.length < 2) {
throw Error("o312: not enough arguments")
}
else if(arguments.length > 2) {
throw Error("o312: too many arguments");
}
return (function() {if(not(comp(res,false))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),":\n",list("\uFDD1symbol?",5)," got ",res," but expected ",false)); 
}})()
; 
});
var o313 = _eq_;
var o314 = eval(__compiler["compile-program"](list("\uFDD1symbol?",5),__generator()));
return o312(o313,o314); 
}))(); 
((function() {var o315 = (function(comp,res){
if(arguments.length < 2) {
throw Error("o315: not enough arguments")
}
else if(arguments.length > 2) {
throw Error("o315: too many arguments");
}
return (function() {if(not(comp(res,false))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),":\n",list("\uFDD1key?",5)," got ",res," but expected ",false)); 
}})()
; 
});
var o316 = _eq_;
var o317 = eval(__compiler["compile-program"](list("\uFDD1key?",5),__generator()));
return o315(o316,o317); 
}))(); 
((function() {var o318 = (function(comp,res){
if(arguments.length < 2) {
throw Error("o318: not enough arguments")
}
else if(arguments.length > 2) {
throw Error("o318: too many arguments");
}
return (function() {if(not(comp(res,false))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),":\n",list("\uFDD1string?",5)," got ",res," but expected ",false)); 
}})()
; 
});
var o319 = _eq_;
var o320 = eval(__compiler["compile-program"](list("\uFDD1string?",5),__generator()));
return o318(o319,o320); 
}))(); 
((function() {var o321 = (function(comp,res){
if(arguments.length < 2) {
throw Error("o321: not enough arguments")
}
else if(arguments.length > 2) {
throw Error("o321: too many arguments");
}
return (function() {if(not(comp(res,false))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),":\n",list("\uFDD1list?",5)," got ",res," but expected ",false)); 
}})()
; 
});
var o322 = _eq_;
var o323 = eval(__compiler["compile-program"](list("\uFDD1list?",5),__generator()));
return o321(o322,o323); 
}))(); 
((function() {var o324 = (function(comp,res){
if(arguments.length < 2) {
throw Error("o324: not enough arguments")
}
else if(arguments.length > 2) {
throw Error("o324: too many arguments");
}
return (function() {if(not(comp(res,false))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),":\n",list("\uFDD1vector?",5)," got ",res," but expected ",false)); 
}})()
; 
});
var o325 = _eq_;
var o326 = eval(__compiler["compile-program"](list("\uFDD1vector?",5),__generator()));
return o324(o325,o326); 
}))(); 
return ((function() {var o327 = (function(comp,res){
if(arguments.length < 2) {
throw Error("o327: not enough arguments")
}
else if(arguments.length > 2) {
throw Error("o327: too many arguments");
}
return (function() {if(not(comp(res,false))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),":\n",list("\uFDD1dict?",5)," got ",res," but expected ",false)); 
}})()
; 
});
var o328 = _eq_;
var o329 = eval(__compiler["compile-program"](list("\uFDD1dict?",5),__generator()));
return o327(o328,o329); 
}))(); 
((function() {var o330 = (function(comp,res){
if(arguments.length < 2) {
throw Error("o330: not enough arguments")
}
else if(arguments.length > 2) {
throw Error("o330: too many arguments");
}
return (function() {if(not(comp(res,true))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),":\n",list("\uFDD1boolean?",true)," got ",res," but expected ",true)); 
}})()
; 
});
var o331 = _eq_;
var o332 = eval(__compiler["compile-program"](list("\uFDD1boolean?",true),__generator()));
return o330(o331,o332); 
}))(); 
((function() {var o333 = (function(comp,res){
if(arguments.length < 2) {
throw Error("o333: not enough arguments")
}
else if(arguments.length > 2) {
throw Error("o333: too many arguments");
}
return (function() {if(not(comp(res,false))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),":\n",list("\uFDD1number?",true)," got ",res," but expected ",false)); 
}})()
; 
});
var o334 = _eq_;
var o335 = eval(__compiler["compile-program"](list("\uFDD1number?",true),__generator()));
return o333(o334,o335); 
}))(); 
((function() {var o336 = (function(comp,res){
if(arguments.length < 2) {
throw Error("o336: not enough arguments")
}
else if(arguments.length > 2) {
throw Error("o336: too many arguments");
}
return (function() {if(not(comp(res,false))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),":\n",list("\uFDD1symbol?",true)," got ",res," but expected ",false)); 
}})()
; 
});
var o337 = _eq_;
var o338 = eval(__compiler["compile-program"](list("\uFDD1symbol?",true),__generator()));
return o336(o337,o338); 
}))(); 
((function() {var o339 = (function(comp,res){
if(arguments.length < 2) {
throw Error("o339: not enough arguments")
}
else if(arguments.length > 2) {
throw Error("o339: too many arguments");
}
return (function() {if(not(comp(res,false))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),":\n",list("\uFDD1key?",true)," got ",res," but expected ",false)); 
}})()
; 
});
var o340 = _eq_;
var o341 = eval(__compiler["compile-program"](list("\uFDD1key?",true),__generator()));
return o339(o340,o341); 
}))(); 
((function() {var o342 = (function(comp,res){
if(arguments.length < 2) {
throw Error("o342: not enough arguments")
}
else if(arguments.length > 2) {
throw Error("o342: too many arguments");
}
return (function() {if(not(comp(res,false))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),":\n",list("\uFDD1string?",true)," got ",res," but expected ",false)); 
}})()
; 
});
var o343 = _eq_;
var o344 = eval(__compiler["compile-program"](list("\uFDD1string?",true),__generator()));
return o342(o343,o344); 
}))(); 
((function() {var o345 = (function(comp,res){
if(arguments.length < 2) {
throw Error("o345: not enough arguments")
}
else if(arguments.length > 2) {
throw Error("o345: too many arguments");
}
return (function() {if(not(comp(res,false))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),":\n",list("\uFDD1list?",true)," got ",res," but expected ",false)); 
}})()
; 
});
var o346 = _eq_;
var o347 = eval(__compiler["compile-program"](list("\uFDD1list?",true),__generator()));
return o345(o346,o347); 
}))(); 
((function() {var o348 = (function(comp,res){
if(arguments.length < 2) {
throw Error("o348: not enough arguments")
}
else if(arguments.length > 2) {
throw Error("o348: too many arguments");
}
return (function() {if(not(comp(res,false))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),":\n",list("\uFDD1vector?",true)," got ",res," but expected ",false)); 
}})()
; 
});
var o349 = _eq_;
var o350 = eval(__compiler["compile-program"](list("\uFDD1vector?",true),__generator()));
return o348(o349,o350); 
}))(); 
return ((function() {var o351 = (function(comp,res){
if(arguments.length < 2) {
throw Error("o351: not enough arguments")
}
else if(arguments.length > 2) {
throw Error("o351: too many arguments");
}
return (function() {if(not(comp(res,false))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),":\n",list("\uFDD1dict?",true)," got ",res," but expected ",false)); 
}})()
; 
});
var o352 = _eq_;
var o353 = eval(__compiler["compile-program"](list("\uFDD1dict?",true),__generator()));
return o351(o352,o353); 
}))(); 
((function() {var o354 = (function(comp,res){
if(arguments.length < 2) {
throw Error("o354: not enough arguments")
}
else if(arguments.length > 2) {
throw Error("o354: too many arguments");
}
return (function() {if(not(comp(res,false))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),":\n",list("\uFDD1boolean?",list("\uFDD1quote","\uFDD1foo"))," got ",res," but expected ",false)); 
}})()
; 
});
var o355 = _eq_;
var o356 = eval(__compiler["compile-program"](list("\uFDD1boolean?",list("\uFDD1quote","\uFDD1foo")),__generator()));
return o354(o355,o356); 
}))(); 
((function() {var o357 = (function(comp,res){
if(arguments.length < 2) {
throw Error("o357: not enough arguments")
}
else if(arguments.length > 2) {
throw Error("o357: too many arguments");
}
return (function() {if(not(comp(res,false))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),":\n",list("\uFDD1number?",list("\uFDD1quote","\uFDD1foo"))," got ",res," but expected ",false)); 
}})()
; 
});
var o358 = _eq_;
var o359 = eval(__compiler["compile-program"](list("\uFDD1number?",list("\uFDD1quote","\uFDD1foo")),__generator()));
return o357(o358,o359); 
}))(); 
((function() {var o360 = (function(comp,res){
if(arguments.length < 2) {
throw Error("o360: not enough arguments")
}
else if(arguments.length > 2) {
throw Error("o360: too many arguments");
}
return (function() {if(not(comp(res,true))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),":\n",list("\uFDD1symbol?",list("\uFDD1quote","\uFDD1foo"))," got ",res," but expected ",true)); 
}})()
; 
});
var o361 = _eq_;
var o362 = eval(__compiler["compile-program"](list("\uFDD1symbol?",list("\uFDD1quote","\uFDD1foo")),__generator()));
return o360(o361,o362); 
}))(); 
((function() {var o363 = (function(comp,res){
if(arguments.length < 2) {
throw Error("o363: not enough arguments")
}
else if(arguments.length > 2) {
throw Error("o363: too many arguments");
}
return (function() {if(not(comp(res,false))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),":\n",list("\uFDD1key?",list("\uFDD1quote","\uFDD1foo"))," got ",res," but expected ",false)); 
}})()
; 
});
var o364 = _eq_;
var o365 = eval(__compiler["compile-program"](list("\uFDD1key?",list("\uFDD1quote","\uFDD1foo")),__generator()));
return o363(o364,o365); 
}))(); 
((function() {var o366 = (function(comp,res){
if(arguments.length < 2) {
throw Error("o366: not enough arguments")
}
else if(arguments.length > 2) {
throw Error("o366: too many arguments");
}
return (function() {if(not(comp(res,false))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),":\n",list("\uFDD1string?",list("\uFDD1quote","\uFDD1foo"))," got ",res," but expected ",false)); 
}})()
; 
});
var o367 = _eq_;
var o368 = eval(__compiler["compile-program"](list("\uFDD1string?",list("\uFDD1quote","\uFDD1foo")),__generator()));
return o366(o367,o368); 
}))(); 
((function() {var o369 = (function(comp,res){
if(arguments.length < 2) {
throw Error("o369: not enough arguments")
}
else if(arguments.length > 2) {
throw Error("o369: too many arguments");
}
return (function() {if(not(comp(res,false))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),":\n",list("\uFDD1list?",list("\uFDD1quote","\uFDD1foo"))," got ",res," but expected ",false)); 
}})()
; 
});
var o370 = _eq_;
var o371 = eval(__compiler["compile-program"](list("\uFDD1list?",list("\uFDD1quote","\uFDD1foo")),__generator()));
return o369(o370,o371); 
}))(); 
((function() {var o372 = (function(comp,res){
if(arguments.length < 2) {
throw Error("o372: not enough arguments")
}
else if(arguments.length > 2) {
throw Error("o372: too many arguments");
}
return (function() {if(not(comp(res,false))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),":\n",list("\uFDD1vector?",list("\uFDD1quote","\uFDD1foo"))," got ",res," but expected ",false)); 
}})()
; 
});
var o373 = _eq_;
var o374 = eval(__compiler["compile-program"](list("\uFDD1vector?",list("\uFDD1quote","\uFDD1foo")),__generator()));
return o372(o373,o374); 
}))(); 
return ((function() {var o375 = (function(comp,res){
if(arguments.length < 2) {
throw Error("o375: not enough arguments")
}
else if(arguments.length > 2) {
throw Error("o375: too many arguments");
}
return (function() {if(not(comp(res,false))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),":\n",list("\uFDD1dict?",list("\uFDD1quote","\uFDD1foo"))," got ",res," but expected ",false)); 
}})()
; 
});
var o376 = _eq_;
var o377 = eval(__compiler["compile-program"](list("\uFDD1dict?",list("\uFDD1quote","\uFDD1foo")),__generator()));
return o375(o376,o377); 
}))(); 
((function() {var o378 = (function(comp,res){
if(arguments.length < 2) {
throw Error("o378: not enough arguments")
}
else if(arguments.length > 2) {
throw Error("o378: too many arguments");
}
return (function() {if(not(comp(res,false))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),":\n",list("\uFDD1boolean?","\uFDD0foo")," got ",res," but expected ",false)); 
}})()
; 
});
var o379 = _eq_;
var o380 = eval(__compiler["compile-program"](list("\uFDD1boolean?","\uFDD0foo"),__generator()));
return o378(o379,o380); 
}))(); 
((function() {var o381 = (function(comp,res){
if(arguments.length < 2) {
throw Error("o381: not enough arguments")
}
else if(arguments.length > 2) {
throw Error("o381: too many arguments");
}
return (function() {if(not(comp(res,false))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),":\n",list("\uFDD1number?","\uFDD0foo")," got ",res," but expected ",false)); 
}})()
; 
});
var o382 = _eq_;
var o383 = eval(__compiler["compile-program"](list("\uFDD1number?","\uFDD0foo"),__generator()));
return o381(o382,o383); 
}))(); 
((function() {var o384 = (function(comp,res){
if(arguments.length < 2) {
throw Error("o384: not enough arguments")
}
else if(arguments.length > 2) {
throw Error("o384: too many arguments");
}
return (function() {if(not(comp(res,false))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),":\n",list("\uFDD1symbol?","\uFDD0foo")," got ",res," but expected ",false)); 
}})()
; 
});
var o385 = _eq_;
var o386 = eval(__compiler["compile-program"](list("\uFDD1symbol?","\uFDD0foo"),__generator()));
return o384(o385,o386); 
}))(); 
((function() {var o387 = (function(comp,res){
if(arguments.length < 2) {
throw Error("o387: not enough arguments")
}
else if(arguments.length > 2) {
throw Error("o387: too many arguments");
}
return (function() {if(not(comp(res,true))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),":\n",list("\uFDD1key?","\uFDD0foo")," got ",res," but expected ",true)); 
}})()
; 
});
var o388 = _eq_;
var o389 = eval(__compiler["compile-program"](list("\uFDD1key?","\uFDD0foo"),__generator()));
return o387(o388,o389); 
}))(); 
((function() {var o390 = (function(comp,res){
if(arguments.length < 2) {
throw Error("o390: not enough arguments")
}
else if(arguments.length > 2) {
throw Error("o390: too many arguments");
}
return (function() {if(not(comp(res,false))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),":\n",list("\uFDD1string?","\uFDD0foo")," got ",res," but expected ",false)); 
}})()
; 
});
var o391 = _eq_;
var o392 = eval(__compiler["compile-program"](list("\uFDD1string?","\uFDD0foo"),__generator()));
return o390(o391,o392); 
}))(); 
((function() {var o393 = (function(comp,res){
if(arguments.length < 2) {
throw Error("o393: not enough arguments")
}
else if(arguments.length > 2) {
throw Error("o393: too many arguments");
}
return (function() {if(not(comp(res,false))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),":\n",list("\uFDD1list?","\uFDD0foo")," got ",res," but expected ",false)); 
}})()
; 
});
var o394 = _eq_;
var o395 = eval(__compiler["compile-program"](list("\uFDD1list?","\uFDD0foo"),__generator()));
return o393(o394,o395); 
}))(); 
((function() {var o396 = (function(comp,res){
if(arguments.length < 2) {
throw Error("o396: not enough arguments")
}
else if(arguments.length > 2) {
throw Error("o396: too many arguments");
}
return (function() {if(not(comp(res,false))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),":\n",list("\uFDD1vector?","\uFDD0foo")," got ",res," but expected ",false)); 
}})()
; 
});
var o397 = _eq_;
var o398 = eval(__compiler["compile-program"](list("\uFDD1vector?","\uFDD0foo"),__generator()));
return o396(o397,o398); 
}))(); 
return ((function() {var o399 = (function(comp,res){
if(arguments.length < 2) {
throw Error("o399: not enough arguments")
}
else if(arguments.length > 2) {
throw Error("o399: too many arguments");
}
return (function() {if(not(comp(res,false))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),":\n",list("\uFDD1dict?","\uFDD0foo")," got ",res," but expected ",false)); 
}})()
; 
});
var o400 = _eq_;
var o401 = eval(__compiler["compile-program"](list("\uFDD1dict?","\uFDD0foo"),__generator()));
return o399(o400,o401); 
}))(); 
((function() {var o402 = (function(comp,res){
if(arguments.length < 2) {
throw Error("o402: not enough arguments")
}
else if(arguments.length > 2) {
throw Error("o402: too many arguments");
}
return (function() {if(not(comp(res,false))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),":\n",list("\uFDD1boolean?","foo")," got ",res," but expected ",false)); 
}})()
; 
});
var o403 = _eq_;
var o404 = eval(__compiler["compile-program"](list("\uFDD1boolean?","foo"),__generator()));
return o402(o403,o404); 
}))(); 
((function() {var o405 = (function(comp,res){
if(arguments.length < 2) {
throw Error("o405: not enough arguments")
}
else if(arguments.length > 2) {
throw Error("o405: too many arguments");
}
return (function() {if(not(comp(res,false))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),":\n",list("\uFDD1number?","foo")," got ",res," but expected ",false)); 
}})()
; 
});
var o406 = _eq_;
var o407 = eval(__compiler["compile-program"](list("\uFDD1number?","foo"),__generator()));
return o405(o406,o407); 
}))(); 
((function() {var o408 = (function(comp,res){
if(arguments.length < 2) {
throw Error("o408: not enough arguments")
}
else if(arguments.length > 2) {
throw Error("o408: too many arguments");
}
return (function() {if(not(comp(res,false))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),":\n",list("\uFDD1symbol?","foo")," got ",res," but expected ",false)); 
}})()
; 
});
var o409 = _eq_;
var o410 = eval(__compiler["compile-program"](list("\uFDD1symbol?","foo"),__generator()));
return o408(o409,o410); 
}))(); 
((function() {var o411 = (function(comp,res){
if(arguments.length < 2) {
throw Error("o411: not enough arguments")
}
else if(arguments.length > 2) {
throw Error("o411: too many arguments");
}
return (function() {if(not(comp(res,false))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),":\n",list("\uFDD1key?","foo")," got ",res," but expected ",false)); 
}})()
; 
});
var o412 = _eq_;
var o413 = eval(__compiler["compile-program"](list("\uFDD1key?","foo"),__generator()));
return o411(o412,o413); 
}))(); 
((function() {var o414 = (function(comp,res){
if(arguments.length < 2) {
throw Error("o414: not enough arguments")
}
else if(arguments.length > 2) {
throw Error("o414: too many arguments");
}
return (function() {if(not(comp(res,true))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),":\n",list("\uFDD1string?","foo")," got ",res," but expected ",true)); 
}})()
; 
});
var o415 = _eq_;
var o416 = eval(__compiler["compile-program"](list("\uFDD1string?","foo"),__generator()));
return o414(o415,o416); 
}))(); 
((function() {var o417 = (function(comp,res){
if(arguments.length < 2) {
throw Error("o417: not enough arguments")
}
else if(arguments.length > 2) {
throw Error("o417: too many arguments");
}
return (function() {if(not(comp(res,false))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),":\n",list("\uFDD1list?","foo")," got ",res," but expected ",false)); 
}})()
; 
});
var o418 = _eq_;
var o419 = eval(__compiler["compile-program"](list("\uFDD1list?","foo"),__generator()));
return o417(o418,o419); 
}))(); 
((function() {var o420 = (function(comp,res){
if(arguments.length < 2) {
throw Error("o420: not enough arguments")
}
else if(arguments.length > 2) {
throw Error("o420: too many arguments");
}
return (function() {if(not(comp(res,false))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),":\n",list("\uFDD1vector?","foo")," got ",res," but expected ",false)); 
}})()
; 
});
var o421 = _eq_;
var o422 = eval(__compiler["compile-program"](list("\uFDD1vector?","foo"),__generator()));
return o420(o421,o422); 
}))(); 
return ((function() {var o423 = (function(comp,res){
if(arguments.length < 2) {
throw Error("o423: not enough arguments")
}
else if(arguments.length > 2) {
throw Error("o423: too many arguments");
}
return (function() {if(not(comp(res,false))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),":\n",list("\uFDD1dict?","foo")," got ",res," but expected ",false)); 
}})()
; 
});
var o424 = _eq_;
var o425 = eval(__compiler["compile-program"](list("\uFDD1dict?","foo"),__generator()));
return o423(o424,o425); 
}))(); 
((function() {var o426 = (function(comp,res){
if(arguments.length < 2) {
throw Error("o426: not enough arguments")
}
else if(arguments.length > 2) {
throw Error("o426: too many arguments");
}
return (function() {if(not(comp(res,false))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),":\n",list("\uFDD1boolean?",list("\uFDD1quote",list(1,2,3)))," got ",res," but expected ",false)); 
}})()
; 
});
var o427 = _eq_;
var o428 = eval(__compiler["compile-program"](list("\uFDD1boolean?",list("\uFDD1quote",list(1,2,3))),__generator()));
return o426(o427,o428); 
}))(); 
((function() {var o429 = (function(comp,res){
if(arguments.length < 2) {
throw Error("o429: not enough arguments")
}
else if(arguments.length > 2) {
throw Error("o429: too many arguments");
}
return (function() {if(not(comp(res,false))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),":\n",list("\uFDD1number?",list("\uFDD1quote",list(1,2,3)))," got ",res," but expected ",false)); 
}})()
; 
});
var o430 = _eq_;
var o431 = eval(__compiler["compile-program"](list("\uFDD1number?",list("\uFDD1quote",list(1,2,3))),__generator()));
return o429(o430,o431); 
}))(); 
((function() {var o432 = (function(comp,res){
if(arguments.length < 2) {
throw Error("o432: not enough arguments")
}
else if(arguments.length > 2) {
throw Error("o432: too many arguments");
}
return (function() {if(not(comp(res,false))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),":\n",list("\uFDD1symbol?",list("\uFDD1quote",list(1,2,3)))," got ",res," but expected ",false)); 
}})()
; 
});
var o433 = _eq_;
var o434 = eval(__compiler["compile-program"](list("\uFDD1symbol?",list("\uFDD1quote",list(1,2,3))),__generator()));
return o432(o433,o434); 
}))(); 
((function() {var o435 = (function(comp,res){
if(arguments.length < 2) {
throw Error("o435: not enough arguments")
}
else if(arguments.length > 2) {
throw Error("o435: too many arguments");
}
return (function() {if(not(comp(res,false))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),":\n",list("\uFDD1key?",list("\uFDD1quote",list(1,2,3)))," got ",res," but expected ",false)); 
}})()
; 
});
var o436 = _eq_;
var o437 = eval(__compiler["compile-program"](list("\uFDD1key?",list("\uFDD1quote",list(1,2,3))),__generator()));
return o435(o436,o437); 
}))(); 
((function() {var o438 = (function(comp,res){
if(arguments.length < 2) {
throw Error("o438: not enough arguments")
}
else if(arguments.length > 2) {
throw Error("o438: too many arguments");
}
return (function() {if(not(comp(res,false))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),":\n",list("\uFDD1string?",list("\uFDD1quote",list(1,2,3)))," got ",res," but expected ",false)); 
}})()
; 
});
var o439 = _eq_;
var o440 = eval(__compiler["compile-program"](list("\uFDD1string?",list("\uFDD1quote",list(1,2,3))),__generator()));
return o438(o439,o440); 
}))(); 
((function() {var o441 = (function(comp,res){
if(arguments.length < 2) {
throw Error("o441: not enough arguments")
}
else if(arguments.length > 2) {
throw Error("o441: too many arguments");
}
return (function() {if(not(comp(res,true))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),":\n",list("\uFDD1list?",list("\uFDD1quote",list(1,2,3)))," got ",res," but expected ",true)); 
}})()
; 
});
var o442 = _eq_;
var o443 = eval(__compiler["compile-program"](list("\uFDD1list?",list("\uFDD1quote",list(1,2,3))),__generator()));
return o441(o442,o443); 
}))(); 
((function() {var o444 = (function(comp,res){
if(arguments.length < 2) {
throw Error("o444: not enough arguments")
}
else if(arguments.length > 2) {
throw Error("o444: too many arguments");
}
return (function() {if(not(comp(res,false))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),":\n",list("\uFDD1vector?",list("\uFDD1quote",list(1,2,3)))," got ",res," but expected ",false)); 
}})()
; 
});
var o445 = _eq_;
var o446 = eval(__compiler["compile-program"](list("\uFDD1vector?",list("\uFDD1quote",list(1,2,3))),__generator()));
return o444(o445,o446); 
}))(); 
return ((function() {var o447 = (function(comp,res){
if(arguments.length < 2) {
throw Error("o447: not enough arguments")
}
else if(arguments.length > 2) {
throw Error("o447: too many arguments");
}
return (function() {if(not(comp(res,false))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),":\n",list("\uFDD1dict?",list("\uFDD1quote",list(1,2,3)))," got ",res," but expected ",false)); 
}})()
; 
});
var o448 = _eq_;
var o449 = eval(__compiler["compile-program"](list("\uFDD1dict?",list("\uFDD1quote",list(1,2,3))),__generator()));
return o447(o448,o449); 
}))(); 
((function() {var o450 = (function(comp,res){
if(arguments.length < 2) {
throw Error("o450: not enough arguments")
}
else if(arguments.length > 2) {
throw Error("o450: too many arguments");
}
return (function() {if(not(comp(res,false))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),":\n",list("\uFDD1boolean?",vector(1,2,3))," got ",res," but expected ",false)); 
}})()
; 
});
var o451 = _eq_;
var o452 = eval(__compiler["compile-program"](list("\uFDD1boolean?",vector(1,2,3)),__generator()));
return o450(o451,o452); 
}))(); 
((function() {var o453 = (function(comp,res){
if(arguments.length < 2) {
throw Error("o453: not enough arguments")
}
else if(arguments.length > 2) {
throw Error("o453: too many arguments");
}
return (function() {if(not(comp(res,false))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),":\n",list("\uFDD1number?",vector(1,2,3))," got ",res," but expected ",false)); 
}})()
; 
});
var o454 = _eq_;
var o455 = eval(__compiler["compile-program"](list("\uFDD1number?",vector(1,2,3)),__generator()));
return o453(o454,o455); 
}))(); 
((function() {var o456 = (function(comp,res){
if(arguments.length < 2) {
throw Error("o456: not enough arguments")
}
else if(arguments.length > 2) {
throw Error("o456: too many arguments");
}
return (function() {if(not(comp(res,false))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),":\n",list("\uFDD1symbol?",vector(1,2,3))," got ",res," but expected ",false)); 
}})()
; 
});
var o457 = _eq_;
var o458 = eval(__compiler["compile-program"](list("\uFDD1symbol?",vector(1,2,3)),__generator()));
return o456(o457,o458); 
}))(); 
((function() {var o459 = (function(comp,res){
if(arguments.length < 2) {
throw Error("o459: not enough arguments")
}
else if(arguments.length > 2) {
throw Error("o459: too many arguments");
}
return (function() {if(not(comp(res,false))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),":\n",list("\uFDD1key?",vector(1,2,3))," got ",res," but expected ",false)); 
}})()
; 
});
var o460 = _eq_;
var o461 = eval(__compiler["compile-program"](list("\uFDD1key?",vector(1,2,3)),__generator()));
return o459(o460,o461); 
}))(); 
((function() {var o462 = (function(comp,res){
if(arguments.length < 2) {
throw Error("o462: not enough arguments")
}
else if(arguments.length > 2) {
throw Error("o462: too many arguments");
}
return (function() {if(not(comp(res,false))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),":\n",list("\uFDD1string?",vector(1,2,3))," got ",res," but expected ",false)); 
}})()
; 
});
var o463 = _eq_;
var o464 = eval(__compiler["compile-program"](list("\uFDD1string?",vector(1,2,3)),__generator()));
return o462(o463,o464); 
}))(); 
((function() {var o465 = (function(comp,res){
if(arguments.length < 2) {
throw Error("o465: not enough arguments")
}
else if(arguments.length > 2) {
throw Error("o465: too many arguments");
}
return (function() {if(not(comp(res,false))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),":\n",list("\uFDD1list?",vector(1,2,3))," got ",res," but expected ",false)); 
}})()
; 
});
var o466 = _eq_;
var o467 = eval(__compiler["compile-program"](list("\uFDD1list?",vector(1,2,3)),__generator()));
return o465(o466,o467); 
}))(); 
((function() {var o468 = (function(comp,res){
if(arguments.length < 2) {
throw Error("o468: not enough arguments")
}
else if(arguments.length > 2) {
throw Error("o468: too many arguments");
}
return (function() {if(not(comp(res,true))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),":\n",list("\uFDD1vector?",vector(1,2,3))," got ",res," but expected ",true)); 
}})()
; 
});
var o469 = _eq_;
var o470 = eval(__compiler["compile-program"](list("\uFDD1vector?",vector(1,2,3)),__generator()));
return o468(o469,o470); 
}))(); 
return ((function() {var o471 = (function(comp,res){
if(arguments.length < 2) {
throw Error("o471: not enough arguments")
}
else if(arguments.length > 2) {
throw Error("o471: too many arguments");
}
return (function() {if(not(comp(res,false))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),":\n",list("\uFDD1dict?",vector(1,2,3))," got ",res," but expected ",false)); 
}})()
; 
});
var o472 = _eq_;
var o473 = eval(__compiler["compile-program"](list("\uFDD1dict?",vector(1,2,3)),__generator()));
return o471(o472,o473); 
}))(); 
((function() {var o474 = (function(comp,res){
if(arguments.length < 2) {
throw Error("o474: not enough arguments")
}
else if(arguments.length > 2) {
throw Error("o474: too many arguments");
}
return (function() {if(not(comp(res,false))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),":\n",list("\uFDD1boolean?",dict("\uFDD0one",1))," got ",res," but expected ",false)); 
}})()
; 
});
var o475 = _eq_;
var o476 = eval(__compiler["compile-program"](list("\uFDD1boolean?",dict("\uFDD0one",1)),__generator()));
return o474(o475,o476); 
}))(); 
((function() {var o477 = (function(comp,res){
if(arguments.length < 2) {
throw Error("o477: not enough arguments")
}
else if(arguments.length > 2) {
throw Error("o477: too many arguments");
}
return (function() {if(not(comp(res,false))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),":\n",list("\uFDD1number?",dict("\uFDD0one",1))," got ",res," but expected ",false)); 
}})()
; 
});
var o478 = _eq_;
var o479 = eval(__compiler["compile-program"](list("\uFDD1number?",dict("\uFDD0one",1)),__generator()));
return o477(o478,o479); 
}))(); 
((function() {var o480 = (function(comp,res){
if(arguments.length < 2) {
throw Error("o480: not enough arguments")
}
else if(arguments.length > 2) {
throw Error("o480: too many arguments");
}
return (function() {if(not(comp(res,false))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),":\n",list("\uFDD1symbol?",dict("\uFDD0one",1))," got ",res," but expected ",false)); 
}})()
; 
});
var o481 = _eq_;
var o482 = eval(__compiler["compile-program"](list("\uFDD1symbol?",dict("\uFDD0one",1)),__generator()));
return o480(o481,o482); 
}))(); 
((function() {var o483 = (function(comp,res){
if(arguments.length < 2) {
throw Error("o483: not enough arguments")
}
else if(arguments.length > 2) {
throw Error("o483: too many arguments");
}
return (function() {if(not(comp(res,false))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),":\n",list("\uFDD1key?",dict("\uFDD0one",1))," got ",res," but expected ",false)); 
}})()
; 
});
var o484 = _eq_;
var o485 = eval(__compiler["compile-program"](list("\uFDD1key?",dict("\uFDD0one",1)),__generator()));
return o483(o484,o485); 
}))(); 
((function() {var o486 = (function(comp,res){
if(arguments.length < 2) {
throw Error("o486: not enough arguments")
}
else if(arguments.length > 2) {
throw Error("o486: too many arguments");
}
return (function() {if(not(comp(res,false))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),":\n",list("\uFDD1string?",dict("\uFDD0one",1))," got ",res," but expected ",false)); 
}})()
; 
});
var o487 = _eq_;
var o488 = eval(__compiler["compile-program"](list("\uFDD1string?",dict("\uFDD0one",1)),__generator()));
return o486(o487,o488); 
}))(); 
((function() {var o489 = (function(comp,res){
if(arguments.length < 2) {
throw Error("o489: not enough arguments")
}
else if(arguments.length > 2) {
throw Error("o489: too many arguments");
}
return (function() {if(not(comp(res,false))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),":\n",list("\uFDD1list?",dict("\uFDD0one",1))," got ",res," but expected ",false)); 
}})()
; 
});
var o490 = _eq_;
var o491 = eval(__compiler["compile-program"](list("\uFDD1list?",dict("\uFDD0one",1)),__generator()));
return o489(o490,o491); 
}))(); 
((function() {var o492 = (function(comp,res){
if(arguments.length < 2) {
throw Error("o492: not enough arguments")
}
else if(arguments.length > 2) {
throw Error("o492: too many arguments");
}
return (function() {if(not(comp(res,false))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),":\n",list("\uFDD1vector?",dict("\uFDD0one",1))," got ",res," but expected ",false)); 
}})()
; 
});
var o493 = _eq_;
var o494 = eval(__compiler["compile-program"](list("\uFDD1vector?",dict("\uFDD0one",1)),__generator()));
return o492(o493,o494); 
}))(); 
return ((function() {var o495 = (function(comp,res){
if(arguments.length < 2) {
throw Error("o495: not enough arguments")
}
else if(arguments.length > 2) {
throw Error("o495: too many arguments");
}
return (function() {if(not(comp(res,true))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),":\n",list("\uFDD1dict?",dict("\uFDD0one",1))," got ",res," but expected ",true)); 
}})()
; 
});
var o496 = _eq_;
var o497 = eval(__compiler["compile-program"](list("\uFDD1dict?",dict("\uFDD0one",1)),__generator()));
return o495(o496,o497); 
}))(); 
((function() {var o498 = (function(comp,res){
if(arguments.length < 2) {
throw Error("o498: not enough arguments")
}
else if(arguments.length > 2) {
throw Error("o498: too many arguments");
}
return (function() {if(not(comp(res,1))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),":\n",list("\uFDD1if",true,1,2)," got ",res," but expected ",1)); 
}})()
; 
});
var o499 = _eq_;
var o500 = eval(__compiler["compile-program"](list("\uFDD1if",true,1,2),__generator()));
return o498(o499,o500); 
}))(); 
((function() {var o501 = (function(comp,res){
if(arguments.length < 2) {
throw Error("o501: not enough arguments")
}
else if(arguments.length > 2) {
throw Error("o501: too many arguments");
}
return (function() {if(not(comp(res,2))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),":\n",list("\uFDD1if",false,1,2)," got ",res," but expected ",2)); 
}})()
; 
});
var o502 = _eq_;
var o503 = eval(__compiler["compile-program"](list("\uFDD1if",false,1,2),__generator()));
return o501(o502,o503); 
}))(); 
((function() {var o504 = (function(comp,res){
if(arguments.length < 2) {
throw Error("o504: not enough arguments")
}
else if(arguments.length > 2) {
throw Error("o504: too many arguments");
}
return (function() {if(not(comp(res,10))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),":\n",list("\uFDD1if","\uFDD1true",list("\uFDD1begin",list("\uFDD1define","\uFDD1a",5),list("\uFDD1*","\uFDD1a",2)))," got ",res," but expected ",10)); 
}})()
; 
});
var o505 = _eq_;
var o506 = eval(__compiler["compile-program"](list("\uFDD1if","\uFDD1true",list("\uFDD1begin",list("\uFDD1define","\uFDD1a",5),list("\uFDD1*","\uFDD1a",2))),__generator()));
return o504(o505,o506); 
}))(); 
var x = 3;
((function() {var o507 = (function(comp,res){
if(arguments.length < 2) {
throw Error("o507: not enough arguments")
}
else if(arguments.length > 2) {
throw Error("o507: too many arguments");
}
return (function() {if(not(comp(res,"\uFDD1three"))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),":\n",list("\uFDD1cond",list(list("\uFDD1eq?","\uFDD1x",0),list("\uFDD1quote","\uFDD1zero")),list(list("\uFDD1eq?","\uFDD1x",1),list("\uFDD1quote","\uFDD1one")),list(list("\uFDD1eq?","\uFDD1x",2),list("\uFDD1quote","\uFDD1two")),list(list("\uFDD1eq?","\uFDD1x",3),list("\uFDD1quote","\uFDD1three")))," got ",res," but expected ","\uFDD1three")); 
}})()
; 
});
var o508 = _eq_;
var o509 = eval(__compiler["compile-program"](list("\uFDD1cond",list(list("\uFDD1eq?","\uFDD1x",0),list("\uFDD1quote","\uFDD1zero")),list(list("\uFDD1eq?","\uFDD1x",1),list("\uFDD1quote","\uFDD1one")),list(list("\uFDD1eq?","\uFDD1x",2),list("\uFDD1quote","\uFDD1two")),list(list("\uFDD1eq?","\uFDD1x",3),list("\uFDD1quote","\uFDD1three"))),__generator()));
return o507(o508,o509); 
}))(); 
((function() {var o510 = (function(comp,res){
if(arguments.length < 2) {
throw Error("o510: not enough arguments")
}
else if(arguments.length > 2) {
throw Error("o510: too many arguments");
}
return (function() {if(not(comp(res,"\uFDD1none"))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),":\n",list("\uFDD1cond",list(list("\uFDD1eq?","\uFDD1x",0),list("\uFDD1quote","\uFDD1zero")),list(list("\uFDD1eq?","\uFDD1x",1),list("\uFDD1quote","\uFDD1one")),list(list("\uFDD1eq?","\uFDD1x",2),list("\uFDD1quote","\uFDD1two")),list("\uFDD1else",list("\uFDD1quote","\uFDD1none")))," got ",res," but expected ","\uFDD1none")); 
}})()
; 
});
var o511 = _eq_;
var o512 = eval(__compiler["compile-program"](list("\uFDD1cond",list(list("\uFDD1eq?","\uFDD1x",0),list("\uFDD1quote","\uFDD1zero")),list(list("\uFDD1eq?","\uFDD1x",1),list("\uFDD1quote","\uFDD1one")),list(list("\uFDD1eq?","\uFDD1x",2),list("\uFDD1quote","\uFDD1two")),list("\uFDD1else",list("\uFDD1quote","\uFDD1none"))),__generator()));
return o510(o511,o512); 
}))(); 
((function() {var o513 = (function(comp,res){
if(arguments.length < 2) {
throw Error("o513: not enough arguments")
}
else if(arguments.length > 2) {
throw Error("o513: too many arguments");
}
return (function() {if(not(comp(res,2))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),":\n",list("\uFDD1case",list("\uFDD1quote","\uFDD1foo"),list(list("\uFDD1bar","\uFDD1baz"),1),list(list("\uFDD1biz","\uFDD1foo"),2))," got ",res," but expected ",2)); 
}})()
; 
});
var o514 = _eq_;
var o515 = eval(__compiler["compile-program"](list("\uFDD1case",list("\uFDD1quote","\uFDD1foo"),list(list("\uFDD1bar","\uFDD1baz"),1),list(list("\uFDD1biz","\uFDD1foo"),2)),__generator()));
return o513(o514,o515); 
}))(); 
var fizzle = (function(one){
if(arguments.length < 1) {
throw Error("fizzle: not enough arguments")
}
var two = vector_dash__gt_list(Array.prototype.slice.call(arguments, 1));
return two; 
});
((function() {var o516 = (function(comp,res){
if(arguments.length < 2) {
throw Error("o516: not enough arguments")
}
else if(arguments.length > 2) {
throw Error("o516: too many arguments");
}
return (function() {if(not(comp(res,list(2,3,4)))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),":\n",list("\uFDD1fizzle",1,2,3,4)," got ",res," but expected ",list(2,3,4))); 
}})()
; 
});
var o517 = _eq_;
var o518 = eval(__compiler["compile-program"](list("\uFDD1fizzle",1,2,3,4),__generator()));
return o516(o517,o518); 
}))(); 
var bizzle = (function(x){
if(arguments.length < 1) {
throw Error("bizzle: not enough arguments")
}
else if(arguments.length > 3) {
throw Error("bizzle: too many arguments");
}
var y = arguments[1] || false;
var z = arguments[2] || false;
return list(x,y,z); 
});
((function() {var o519 = (function(comp,res){
if(arguments.length < 2) {
throw Error("o519: not enough arguments")
}
else if(arguments.length > 2) {
throw Error("o519: too many arguments");
}
return (function() {if(not(comp(res,list(1,false,false)))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),":\n",list("\uFDD1bizzle",1)," got ",res," but expected ",list(1,false,false))); 
}})()
; 
});
var o520 = _eq_;
var o521 = eval(__compiler["compile-program"](list("\uFDD1bizzle",1),__generator()));
return o519(o520,o521); 
}))(); 
((function() {var o522 = (function(comp,res){
if(arguments.length < 2) {
throw Error("o522: not enough arguments")
}
else if(arguments.length > 2) {
throw Error("o522: too many arguments");
}
return (function() {if(not(comp(res,list(1,2,false)))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),":\n",list("\uFDD1bizzle",1,2)," got ",res," but expected ",list(1,2,false))); 
}})()
; 
});
var o523 = _eq_;
var o524 = eval(__compiler["compile-program"](list("\uFDD1bizzle",1,2),__generator()));
return o522(o523,o524); 
}))(); 
((function() {var o525 = (function(comp,res){
if(arguments.length < 2) {
throw Error("o525: not enough arguments")
}
else if(arguments.length > 2) {
throw Error("o525: too many arguments");
}
return (function() {if(not(comp(res,list(1,2,3)))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),":\n",list("\uFDD1bizzle",1,2,3)," got ",res," but expected ",list(1,2,3))); 
}})()
; 
});
var o526 = _eq_;
var o527 = eval(__compiler["compile-program"](list("\uFDD1bizzle",1,2,3),__generator()));
return o525(o526,o527); 
}))(); 
var func = (function() {(function() {if(true) {return "yes"; 
} else {return "no"; 
}})()
; 
return (1 + 2); 
});
((function() {var o528 = (function(comp,res){
if(arguments.length < 2) {
throw Error("o528: not enough arguments")
}
else if(arguments.length > 2) {
throw Error("o528: too many arguments");
}
return (function() {if(not(comp(res,3))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),":\n",list("\uFDD1func")," got ",res," but expected ",3)); 
}})()
; 
});
var o529 = _eq_;
var o530 = eval(__compiler["compile-program"](list("\uFDD1func"),__generator()));
return o528(o529,o530); 
}))(); 
var faz = (function() {return ((function() {var o531 = (function(x){
if(arguments.length < 1) {
throw Error("o531: not enough arguments")
}
else if(arguments.length > 1) {
throw Error("o531: too many arguments");
}
(2 + 3); 
x = 3;
});
var o532 = 1;
return o531(o532); 
}))(); 
});
((function() {var o533 = (function(comp,res){
if(arguments.length < 2) {
throw Error("o533: not enough arguments")
}
else if(arguments.length > 2) {
throw Error("o533: too many arguments");
}
return (function() {if(not(comp(res,undefined))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),":\n",list("\uFDD1faz")," got ",res," but expected ",undefined)); 
}})()
; 
});
var o534 = _eq_;
var o535 = eval(__compiler["compile-program"](list("\uFDD1faz"),__generator()));
return o533(o534,o535); 
}))(); 
var buz = (function() {(2 + 3); 
var a = 4;
});
((function() {var o536 = (function(comp,res){
if(arguments.length < 2) {
throw Error("o536: not enough arguments")
}
else if(arguments.length > 2) {
throw Error("o536: too many arguments");
}
return (function() {if(not(comp(res,undefined))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),":\n",list("\uFDD1buz")," got ",res," but expected ",undefined)); 
}})()
; 
});
var o537 = _eq_;
var o538 = eval(__compiler["compile-program"](list("\uFDD1buz"),__generator()));
return o536(o537,o538); 
}))(); 
((function() {var o539 = (function(comp,res){
if(arguments.length < 2) {
throw Error("o539: not enough arguments")
}
else if(arguments.length > 2) {
throw Error("o539: too many arguments");
}
return (function() {if(not(comp(res,true))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),":\n",list("\uFDD1not",list("\uFDD1list?",0))," got ",res," but expected ",true)); 
}})()
; 
});
var o540 = _eq_;
var o541 = eval(__compiler["compile-program"](list("\uFDD1not",list("\uFDD1list?",0)),__generator()));
return o539(o540,o541); 
}))(); 
((function() {var o542 = (function(x,y){
if(arguments.length < 2) {
throw Error("o542: not enough arguments")
}
else if(arguments.length > 2) {
throw Error("o542: too many arguments");
}
return ((function() {var o545 = (function(comp,res){
if(arguments.length < 2) {
throw Error("o545: not enough arguments")
}
else if(arguments.length > 2) {
throw Error("o545: too many arguments");
}
return (function() {if(not(comp(res,1))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),":\n","\uFDD1y"," got ",res," but expected ",1)); 
}})()
; 
});
var o546 = _eq_;
var o547 = eval(__compiler["compile-program"]("\uFDD1y",__generator()));
return o545(o546,o547); 
}))(); 
});
var o543 = 0;
var o544 = (o543 + 1);
return o542(o543,o544); 
}))(); 
var foo = 5;
((function() {var o548 = (function(baz,bar){
if(arguments.length < 2) {
throw Error("o548: not enough arguments")
}
else if(arguments.length > 2) {
throw Error("o548: too many arguments");
}
return ((function() {var o551 = (function(comp,res){
if(arguments.length < 2) {
throw Error("o551: not enough arguments")
}
else if(arguments.length > 2) {
throw Error("o551: too many arguments");
}
return (function() {if(not(comp(res,25))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),":\n",list("\uFDD1bar")," got ",res," but expected ",25)); 
}})()
; 
});
var o552 = _eq_;
var o553 = eval(__compiler["compile-program"](list("\uFDD1bar"),__generator()));
return o551(o552,o553); 
}))(); 
});
var o549 = foo;
var o550 = (function() {return (o549 * 5); 
});
return o548(o549,o550); 
}))(); 
var foo = 5;
((function() {var o554 = (function(foo,bar){
if(arguments.length < 2) {
throw Error("o554: not enough arguments")
}
else if(arguments.length > 2) {
throw Error("o554: too many arguments");
}
((function() {var o557 = (function(comp,res){
if(arguments.length < 2) {
throw Error("o557: not enough arguments")
}
else if(arguments.length > 2) {
throw Error("o557: too many arguments");
}
return (function() {if(not(comp(res,5))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),":\n","\uFDD1foo"," got ",res," but expected ",5)); 
}})()
; 
});
var o558 = _eq_;
var o559 = eval(__compiler["compile-program"]("\uFDD1foo",__generator()));
return o557(o558,o559); 
}))(); 
((function() {var o560 = (function(comp,res){
if(arguments.length < 2) {
throw Error("o560: not enough arguments")
}
else if(arguments.length > 2) {
throw Error("o560: too many arguments");
}
return (function() {if(not(comp(res,6))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),":\n","\uFDD1bar"," got ",res," but expected ",6)); 
}})()
; 
});
var o561 = _eq_;
var o562 = eval(__compiler["compile-program"]("\uFDD1bar",__generator()));
return o560(o561,o562); 
}))(); 
foo = 6;
return ((function() {var o563 = (function(comp,res){
if(arguments.length < 2) {
throw Error("o563: not enough arguments")
}
else if(arguments.length > 2) {
throw Error("o563: too many arguments");
}
return (function() {if(not(comp(res,6))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),":\n","\uFDD1foo"," got ",res," but expected ",6)); 
}})()
; 
});
var o564 = _eq_;
var o565 = eval(__compiler["compile-program"]("\uFDD1foo",__generator()));
return o563(o564,o565); 
}))(); 
});
var o555 = foo;
var o556 = (o555 + 1);
return o554(o555,o556); 
}))(); 
((function() {var o566 = (function(comp,res){
if(arguments.length < 2) {
throw Error("o566: not enough arguments")
}
else if(arguments.length > 2) {
throw Error("o566: too many arguments");
}
return (function() {if(not(comp(res,5))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),":\n","\uFDD1foo"," got ",res," but expected ",5)); 
}})()
; 
});
var o567 = _eq_;
var o568 = eval(__compiler["compile-program"]("\uFDD1foo",__generator()));
return o566(o567,o568); 
}))(); 

