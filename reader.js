var util = require("util");var type = (function(obj){
return (function() {if(number_p_(obj)) {return "\uFDD1number"; // Line <unknown undefined> Column <unknown undefined>
} else {return (function() {if(boolean_p_(obj)) {return "\uFDD1boolean"; // Line <unknown undefined> Column <unknown undefined>
} else {return (function() {if(string_p_(obj)) {return "\uFDD1string"; // Line <unknown undefined> Column <unknown undefined>
} else {return (function() {if(null_p_(obj)) {return "\uFDD1null"; // Line <unknown undefined> Column <unknown undefined>
} else {return (function() {if(list_p_(obj)) {return "\uFDD1list"; // Line <unknown undefined> Column <unknown undefined>
} else {return (function() {if(vector_p_(obj)) {return "\uFDD1vector"; // Line <unknown undefined> Column <unknown undefined>
} else {return (function() {if(dict_p_(obj)) {return "\uFDD1dict"; // Line <unknown undefined> Column <unknown undefined>
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
return (function() {if(null_p_(lst)) {return false; // Line <unknown undefined> Column <unknown undefined>
} else {return (function() {if(eq_p_(i,0)) {return car(lst); // Line 127 Column 2
} else {return loop(cdr(lst),(i - 1)); // Line 127 Column 2
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
} else {return loop(cdr(lst)); // Line 156 Column 2
}})()
; // Line <unknown undefined> Column <unknown undefined>
}})()
; // Line <unknown undefined> Column <unknown undefined>
});
var o8 = lst;
return loop(o8); // Line 156 Column 2
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
return (function() {if(not(null_p_(lst))) {func(car(lst)); // Line 171 Column 2
return loop(cdr(lst)); // Line 171 Column 2
}})()
; // Line <unknown undefined> Column <unknown undefined>
});
var o9 = lst;
return loop(o9); // Line 171 Column 2
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
return (function() {if((i < count)) {vector_dash_put_excl_(v,i,val); // Line 202 Column 2
return loop((i + 1)); // Line 202 Column 2
} else {return v; // Line <unknown undefined> Column <unknown undefined>
}})()
; // Line <unknown undefined> Column <unknown undefined>
});
var o13 = 0;
return loop(o13); // Line 202 Column 2
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
} else {return loop(cdr(lst),res["concat"](car(lst))); // Line 222 Column 2
}})()
; // Line <unknown undefined> Column <unknown undefined>
});
var o14 = cdr(vecs);
var o15 = car(vecs);
return loop(o14,o15); // Line 222 Column 2
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
} else {return loop((i + 1)); // Line 236 Column 2
}})()
; // Line <unknown undefined> Column <unknown undefined>
} else {return false; // Line <unknown undefined> Column <unknown undefined>
}})()
; // Line <unknown undefined> Column <unknown undefined>
});
var o16 = 0;
return loop(o16); // Line 236 Column 2
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
return (function() {if((i < vec["length"])) {res["push"](func(vector_dash_ref(vec,i))); // Line 254 Column 2
return loop((i + 1)); // Line 254 Column 2
}})()
; // Line <unknown undefined> Column <unknown undefined>
});
var o17 = 0;
return loop(o17); // Line 254 Column 2
}))(); // Line 254 Column 2
return res; // Line <unknown undefined> Column <unknown undefined>
});
var vector_dash_for_dash_each = (function(func,vec){
return ((function() {var loop = (function(i){
return (function() {if((i < vec["length"])) {func(vector_dash_ref(vec,i)); // Line 262 Column 2
return loop((i + 1)); // Line 262 Column 2
}})()
; // Line <unknown undefined> Column <unknown undefined>
});
var o18 = 0;
return loop(o18); // Line 262 Column 2
}))(); // Line 262 Column 2
});
var vector_dash_fold = (function(func,acc,vec){
return ((function() {var loop = (function(i,acc){
return (function() {if((i < vector_dash_length(vec))) {return loop((i + 1),func(vector_dash_ref(vec,i),acc)); // Line 269 Column 2
} else {return acc; // Line <unknown undefined> Column <unknown undefined>
}})()
; // Line <unknown undefined> Column <unknown undefined>
});
var o19 = 0;
var o20 = acc;
return loop(o19,o20); // Line 269 Column 2
}))(); // Line 269 Column 2
});
var dict = (function() {
var args = vector_dash__gt_list(Array.prototype.slice.call(arguments));
var res = {};
((function() {var loop = (function(lst){
return (function() {if(not(null_p_(lst))) {return ((function() {var o22 = (function(key,val){
dict_dash_put_excl_(res,key,val); // Line 281 Column 4
return loop(cddr(lst)); // Line 281 Column 4
});
var o23 = car(lst);
var o24 = cadr(lst);
return o22(o23,o24); // Line 281 Column 4
}))(); // Line 281 Column 4
}})()
; // Line <unknown undefined> Column <unknown undefined>
});
var o21 = args;
return loop(o21); // Line 281 Column 4
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
return loop(cdr(lst)); // Line 297 Column 2
});
var o27 = car(lst);
return o26(o27); // Line 297 Column 2
}))(); // Line 297 Column 2
}})()
; // Line <unknown undefined> Column <unknown undefined>
});
var o25 = keys(dct);
return loop(o25); // Line 297 Column 2
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
return (function() {if(not(null_p_(lst))) {vector_dash_push_excl_(res,car(lst)); // Line 316 Column 2
vector_dash_push_excl_(res,dict_dash_ref(dct,car(lst))); // Line 316 Column 2
return loop(cdr(lst)); // Line 316 Column 2
}})()
; // Line <unknown undefined> Column <unknown undefined>
});
var o30 = keys(dct);
return loop(o30); // Line 316 Column 2
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
return (function() {if(not(null_p_(ks))) {dict_dash_put_excl_(res,car(ks),car(vs)); // Line 340 Column 2
return loop(cdr(ks),cdr(vs)); // Line 340 Column 2
}})()
; // Line <unknown undefined> Column <unknown undefined>
});
var o33 = keys;
var o34 = vals;
return loop(o33,o34); // Line 340 Column 2
}))(); // Line 340 Column 2
return res; // Line <unknown undefined> Column <unknown undefined>
});
var not = (function(obj){
return (typeof obj !== 'number' && !obj); // Line <unknown undefined> Column <unknown undefined>
});
var _eq__eq_ = (function(obj1,obj2){
return obj1 === obj2});
var _eq_ = (function(obj1,obj2){
return (function() {if((list_p_(obj1) && list_p_(obj2))) {return ((function() {var loop = (function(lst1,lst2){
var n1 = null_p_(lst1);
var n2 = null_p_(lst2);
return (function() {if((n1 && n2)) {return true; // Line <unknown undefined> Column <unknown undefined>
} else {return (function() {if((n1 || n2)) {return false; // Line <unknown undefined> Column <unknown undefined>
} else {return (function() {if(equal_p_(car(lst1),car(lst2))) {return loop(cdr(lst1),cdr(lst2)); // Line 360 Column 2
} else {return false; // Line <unknown undefined> Column <unknown undefined>
}})()
; // Line <unknown undefined> Column <unknown undefined>
}})()
; // Line <unknown undefined> Column <unknown undefined>
}})()
; // Line <unknown undefined> Column <unknown undefined>
});
var o35 = obj1;
var o36 = obj2;
return loop(o35,o36); // Line 360 Column 2
}))(); // Line 360 Column 2
} else {return (function() {if((vector_p_(obj1) && vector_p_(obj2))) {return (function() {if(not(_eq_(obj1["length"],obj2["length"]))) {return false; // Line <unknown undefined> Column <unknown undefined>
} else {return ((function() {var loop = (function(i){
return (function() {if((i < obj1["length"])) {return (function() {if(_eq_(vector_dash_ref(obj1,i),vector_dash_ref(obj2,i))) {return loop((i + 1)); // Line 360 Column 2
} else {return false; // Line <unknown undefined> Column <unknown undefined>
}})()
; // Line <unknown undefined> Column <unknown undefined>
} else {return true; // Line <unknown undefined> Column <unknown undefined>
}})()
; // Line <unknown undefined> Column <unknown undefined>
});
var o37 = 0;
return loop(o37); // Line 360 Column 2
}))(); // Line 360 Column 2
}})()
; // Line <unknown undefined> Column <unknown undefined>
} else {return (function() {if((dict_p_(obj1) && dict_p_(obj2))) {return ((function() {var o38 = (function(keys1,keys2){
return (eq_p_(length(keys1),length(keys2)) && ((function() {var loop = (function(lst){
return (function() {if(null_p_(lst)) {return true; // Line <unknown undefined> Column <unknown undefined>
} else {return (function() {if(equal_p_(dict_dash_ref(obj1,car(lst)),dict_dash_ref(obj2,car(lst)))) {return loop(cdr(lst)); // Line 360 Column 2
} else {return false; // Line <unknown undefined> Column <unknown undefined>
}})()
; // Line <unknown undefined> Column <unknown undefined>
}})()
; // Line <unknown undefined> Column <unknown undefined>
});
var o41 = keys1;
return loop(o41); // Line 360 Column 2
}))()); // Line <unknown undefined> Column <unknown undefined>
});
var o39 = keys(obj1);
var o40 = keys(obj2);
return o38(o39,o40); // Line 360 Column 2
}))(); // Line 360 Column 2
} else {return eq_p_(obj1,obj2); // Line 360 Column 2
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
return (function() {if(number_p_(obj)) {return ("" + obj); // Line <unknown undefined> Column <unknown undefined>
} else {return (function() {if(string_p_(obj)) {obj = obj["replace"](RegExp("\\\\","g"),"\\\\");
obj = obj["replace"](RegExp("\n","g"),"\\n");
obj = obj["replace"](RegExp("\r","g"),"\\r");
obj = obj["replace"](RegExp("\t","g"),"\\t");
obj = obj["replace"](RegExp("\"","g"),"\\\"");
return ("\"" + obj + "\""); // Line <unknown undefined> Column <unknown undefined>
} else {return (function() {if(key_p_(obj)) {return (":" + symbol_dash__gt_string(obj)); // Line <unknown undefined> Column <unknown undefined>
} else {return (function() {if(symbol_p_(obj)) {return symbol_dash__gt_string(obj); // Line 418 Column 2
} else {return (function() {if(boolean_p_(obj)) {return (function() {if(obj) {return "#t"; // Line <unknown undefined> Column <unknown undefined>
} else {return "#f"; // Line <unknown undefined> Column <unknown undefined>
}})()
; // Line <unknown undefined> Column <unknown undefined>
} else {return (function() {if(null_p_(obj)) {return "()"; // Line <unknown undefined> Column <unknown undefined>
} else {return (function() {if(function_p_(obj)) {return "<function>"; // Line <unknown undefined> Column <unknown undefined>
} else {return ("<unknown " + obj + ">"); // Line <unknown undefined> Column <unknown undefined>
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
return (function() {if(list_p_(obj)) {return (length(obj) + 1 + fold((function(el,acc){
return (acc + recur(el,false)); // Line <unknown undefined> Column <unknown undefined>
}),0,obj)); // Line <unknown undefined> Column <unknown undefined>
} else {return (function() {if(dict_p_(obj)) {return recur(dict_dash__gt_list(obj),false); // Line 448 Column 5
} else {return (function() {if(vector_p_(obj)) {return recur(vector_dash__gt_list(obj),false); // Line 448 Column 5
} else {return vector_dash_length(_per_inspect_dash_non_dash_sequence(obj)); // Line 448 Column 5
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
return (function() {if(list_p_(obj)) {return ((function() {var o46 = (function(sp,first){
disp("("); // Line 468 Column 2
for_dash_each((function(el){
(function() {if(not(first)) {return (function() {if((sp && not(no_dash_newlines))) {disp("\n"); // Line 468 Column 2
return pad(i); // Line 468 Column 2
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
} else {return (function() {if(vector_p_(obj)) {return ((function() {var o49 = (function(sp,first){
disp("["); // Line 468 Column 2
vector_dash_for_dash_each((function(el){
(function() {if(not(first)) {return (function() {if((sp && not(no_dash_newlines))) {disp("\n"); // Line 468 Column 2
return pad(i); // Line 468 Column 2
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
} else {return (function() {if(dict_p_(obj)) {return ((function() {var o52 = (function(sp,first){
disp("{"); // Line 468 Column 2
for_dash_each((function(k){
(function() {if(not(first)) {return (function() {if((sp && not(no_dash_newlines))) {disp("\n"); // Line 468 Column 2
return pad(i); // Line 468 Column 2
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
} else {return _per_inspect_dash_non_dash_sequence(obj); // Line 468 Column 2
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
var _per_breakpoints_dash_flag = true;
var breakpoint = (function(thunk_dash_msg){
_per_next_dash_thunk = thunk_dash_msg;
return debugger_dash_step(vector_dash_ref(thunk_dash_msg,1)); // Line 571 Column 3
});
var debugger_dash_step_p_ = false;
var start_dash_stepping = (function() {debugger_dash_step_p_ = true;
});
var stop_dash_stepping = (function() {debugger_dash_step_p_ = false;
});
var debugger_dash_stepping_p_ = (function() {return not(_eq__eq_(_per_next_dash_thunk,false)); // Line 581 Column 3
});
var enable_dash_breakpoints = (function() {_per_breakpoints_dash_flag = true;
});
var disable_dash_breakpoints = (function() {_per_breakpoints_dash_flag = false;
});
var debugger_dash_continue = (function() {return ((function() {var o55 = (function(thunk){
_per_next_dash_thunk = false;
return cps_dash_trampoline(thunk); // Line 590 Column 2
});
var o56 = vector_dash_ref(_per_next_dash_thunk,2)();
return o55(o56); // Line 590 Column 2
}))(); // Line 590 Column 2
});
var _per_next_dash_thunk = false;
var cps_dash_trampoline = (function(thunk_msg){
while(thunk_msg) {
     if(_per_breakpoints_dash_flag && (thunk_msg[0] || debugger_dash_step_p_)) {
       breakpoint(thunk_msg);
       break;
     }
     thunk_msg = thunk_msg[2](); }return false; // Line <unknown undefined> Column <unknown undefined>
});
var cps_dash_jump = (function(breakpoint,msg,to){
return vector(breakpoint,msg,to); // Line 617 Column 2
});
var cps_dash_halt = (function(v){
return list(list("\uFDD1lambda",_emptylst,v,false)); // Line 620 Column 4
});


var fs = require("fs");var ast = require("./ast");var chars_dash_whitespace = " \n\t\r";
var chars_dash_special = "(){}[],@'`:";
var chars_dash_delim = str(chars_dash_whitespace,chars_dash_special,";");
var _in_ = (function(str,char){
return number_p_(vector_dash_find(str,char)); // Line 9 Column 3
});
var vec_dash_getter = (function(i){
return (function(vec){
return vector_dash_ref(vec,i); // Line 13 Column 5
}); // Line <unknown undefined> Column <unknown undefined>
});
var read = (function(src){
var index = 0;
var len = vector_dash_length(src);
var lineno = 0;
var colno = 0;
var current = (function() {return (function() {if(finished()) {return ""; // Line <unknown undefined> Column <unknown undefined>
} else {return vector_dash_ref(src,index); // Line 24 Column 9
}})()
; // Line <unknown undefined> Column <unknown undefined>
});
var previous = (function() {return vector_dash_ref(src,(index - 1)); // Line 27 Column 5
});
var forward = (function() {index = (index + 1);
return (function() {if(_eq__eq_(previous(),"\n")) {lineno = (lineno + 1);
colno = 0;
} else {colno = (colno + 1);
}})()
; // Line <unknown undefined> Column <unknown undefined>
});
var back = (function() {index = (index - 1);
return (function() {if(_eq__eq_(current(),"\n")) {lineno = (lineno - 1);
}})()
; // Line <unknown undefined> Column <unknown undefined>
});
var finished = (function() {return (index >= len); // Line <unknown undefined> Column <unknown undefined>
});
var skip_dash_whitespace = (function() {return ((function() {var loop = (function() {return (function() {if(_in_(chars_dash_whitespace,current())) {forward(); // Line 48 Column 4
return loop(); // Line 48 Column 4
}})()
; // Line <unknown undefined> Column <unknown undefined>
});
return loop(); // Line 48 Column 4
}))(); // Line 48 Column 4
});
var parse_dash_string = (function(lineno,colno){
return ((function() {var loop = (function(s){
forward(); // Line 55 Column 4
return (function() {if(_eq__eq_(current(),"\\")) {forward(); // Line 55 Column 4
return loop(str(s,((function() {var o2 = (function(c){
return (function() {if(_eq__eq_(c,"n")) {return "\n"; // Line <unknown undefined> Column <unknown undefined>
} else {return (function() {if(_eq__eq_(c,"t")) {return "\t"; // Line <unknown undefined> Column <unknown undefined>
} else {return (function() {if(_eq__eq_(c,"r")) {return "\r"; // Line <unknown undefined> Column <unknown undefined>
} else {return c; // Line <unknown undefined> Column <unknown undefined>
}})()
; // Line <unknown undefined> Column <unknown undefined>
}})()
; // Line <unknown undefined> Column <unknown undefined>
}})()
; // Line <unknown undefined> Column <unknown undefined>
});
var o3 = current();
return o2(o3); // Line 55 Column 4
}))())); // Line 55 Column 4
} else {return (function() {if(_eq__eq_(current(),"\"")) {return make_dash_token("\uFDD1STRING",s,lineno,colno); // Line 55 Column 4
} else {return loop(str(s,current())); // Line 55 Column 4
}})()
; // Line <unknown undefined> Column <unknown undefined>
}})()
; // Line <unknown undefined> Column <unknown undefined>
});
var o1 = "";
return loop(o1); // Line 55 Column 4
}))(); // Line 55 Column 4
});
var parse_dash_token = (function(s,lineno,colno){
return (function() {if(s["match"](RegExp("^[-+]?[0-9]+$"))) {return make_dash_token("\uFDD1INTEGER",s,lineno,colno); // Line 71 Column 4
} else {return (function() {if(s["match"](RegExp("^[-+]?[0-9]+\\.[0-9]*$"))) {return make_dash_token("\uFDD1FLOAT",s,lineno,colno); // Line 71 Column 4
} else {return (function() {if(s["match"](RegExp("^[-+]?0x"))) {return ((function() {var o4 = (function(m,prefix){
return (function() {if(m) {return make_dash_token("\uFDD1HEX",str(prefix,vector_dash_ref(m,1)),lineno,colno); // Line 71 Column 4
} else {throw(str("invalid hex value: ",s)); // Line 71 Column 4
}})()
; // Line <unknown undefined> Column <unknown undefined>
});
var o5 = s["match"](RegExp("0x([0-9a-fA-F]+)$"));
var o6 = (function() {if(_eq__eq_(vector_dash_ref(s,0),"-")) {return "-"; // Line <unknown undefined> Column <unknown undefined>
} else {return ""; // Line <unknown undefined> Column <unknown undefined>
}})()
;
return o4(o5,o6); // Line 71 Column 4
}))(); // Line 71 Column 4
} else {return (function() {if((_eq__eq_(s,"#f") || _eq__eq_(s,"#t"))) {return make_dash_token("\uFDD1BOOLEAN",s,lineno,colno); // Line 71 Column 4
} else {return make_dash_token("\uFDD1SYMBOL",s,lineno,colno); // Line 71 Column 4
}})()
; // Line <unknown undefined> Column <unknown undefined>
}})()
; // Line <unknown undefined> Column <unknown undefined>
}})()
; // Line <unknown undefined> Column <unknown undefined>
}})()
; // Line <unknown undefined> Column <unknown undefined>
});
var parse_dash_comment = (function(lineno,colno){
return ((function() {var loop = (function(s){
forward(); // Line 84 Column 4
return (function() {if((finished() || _eq__eq_(current(),"\n"))) {return make_dash_token("\uFDD1COMMENT",s,lineno,colno); // Line 84 Column 4
} else {return loop(str(s,current())); // Line 84 Column 4
}})()
; // Line <unknown undefined> Column <unknown undefined>
});
var o7 = "";
return loop(o7); // Line 84 Column 4
}))(); // Line 84 Column 4
});
var unique_dash_obj = list(true);
var make_dash_token = (function(type,data,lineno,colno){
return vector(unique_dash_obj,type,data,lineno,colno); // Line 98 Column 4
});
var token_dash_type = vec_dash_getter(1);
var token_dash_data = vec_dash_getter(2);
var token_dash_lineno = vec_dash_getter(3);
var token_dash_colno = vec_dash_getter(4);
var token_p_ = (function(tok){
return (vector_p_(tok) && _eq__eq_(vector_dash_ref(tok,0),unique_dash_obj)); // Line <unknown undefined> Column <unknown undefined>
});
var get_dash_token = (function() {skip_dash_whitespace(); // Line 110 Column 5
return ((function() {var o8 = (function(c,lineno,colno){
return (function() {if(_in_(chars_dash_special,c)) {forward(); // Line 111 Column 4
return make_dash_token("\uFDD1SPECIAL",c,lineno,colno); // Line 111 Column 4
} else {return (function() {if(_eq__eq_(c,"\"")) {return ((function() {var o12 = (function(s){
forward(); // Line 111 Column 4
return s; // Line <unknown undefined> Column <unknown undefined>
});
var o13 = parse_dash_string(lineno,colno);
return o12(o13); // Line 111 Column 4
}))(); // Line 111 Column 4
} else {return (function() {if(_eq__eq_(c,";")) {return parse_dash_comment(lineno,colno); // Line 111 Column 4
} else {return (function() {if(_eq__eq_(c,"")) {return false; // Line <unknown undefined> Column <unknown undefined>
} else {return (function() {if(finished()) {return false; // Line <unknown undefined> Column <unknown undefined>
} else {return ((function() {var loop = (function(s){
return (function() {if((_in_(chars_dash_delim,current()) || finished())) {return parse_dash_token(s,lineno,colno); // Line 111 Column 4
} else {forward(); // Line 111 Column 4
return loop(str(s,previous())); // Line 111 Column 4
}})()
; // Line <unknown undefined> Column <unknown undefined>
});
var o14 = "";
return loop(o14); // Line 111 Column 4
}))(); // Line 111 Column 4
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
var o9 = current();
var o10 = lineno;
var o11 = colno;
return o8(o9,o10,o11); // Line 111 Column 4
}))(); // Line 111 Column 4
});
var token_dash__gt_exp = (function(token){
return ((function() {var o15 = (function(type,data){
return (function() {if(_eq__eq_(type,"\uFDD1STRING")) {return data; // Line <unknown undefined> Column <unknown undefined>
} else {return (function() {if(_eq__eq_(type,"\uFDD1SYMBOL")) {return string_dash__gt_symbol(data); // Line 138 Column 4
} else {return (function() {if(_eq__eq_(type,"\uFDD1BOOLEAN")) {return (function() {if(_eq__eq_(data,"#f")) {return false; // Line <unknown undefined> Column <unknown undefined>
} else {return true; // Line <unknown undefined> Column <unknown undefined>
}})()
; // Line <unknown undefined> Column <unknown undefined>
} else {return (function() {if(_eq__eq_(type,"\uFDD1INTEGER")) {return parseInt(data); // Line 138 Column 4
} else {return (function() {if(_eq__eq_(type,"\uFDD1FLOAT")) {return parseFloat(data); // Line 138 Column 4
} else {return (function() {if(_eq__eq_(type,"\uFDD1HEX")) {return parseInt(data,16); // Line 138 Column 4
} else {throw(str("cannot convert token to exp: ",token)); // Line 138 Column 4
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
var o16 = token_dash_type(token);
var o17 = token_dash_data(token);
return o15(o16,o17); // Line 138 Column 4
}))(); // Line 138 Column 4
});
var special_p_ = (function(t,chars){
return (token_p_(t) && _eq__eq_(token_dash_type(t),"\uFDD1SPECIAL") && _in_(chars,token_dash_data(t))); // Line <unknown undefined> Column <unknown undefined>
});
var compound_dash_start_p_ = (function(t){
return (special_p_(t,"(") || special_p_(t,"[") || special_p_(t,"{")); // Line <unknown undefined> Column <unknown undefined>
});
var compound_dash_end_p_ = (function(t){
return (special_p_(t,")") || special_p_(t,"]") || special_p_(t,"}")); // Line <unknown undefined> Column <unknown undefined>
});
var end_p_ = (function(t){
return (token_p_(t) && _eq__eq_(token_dash_type(t),"\uFDD1END")); // Line <unknown undefined> Column <unknown undefined>
});
var read_dash_exp = (function() {return ((function() {var o18 = (function(token){
return (function() {if(not(token)) {return make_dash_token("\uFDD1END",false,false,false); // Line 170 Column 4
} else {return (function() {if(compound_dash_end_p_(token)) {return token; // Line <unknown undefined> Column <unknown undefined>
} else {return (function() {if(compound_dash_start_p_(token)) {return ((function() {var loop = (function(lst,exp){
return (function() {if((end_p_(exp) || compound_dash_end_p_(exp))) {var in_dash_list_p_ = special_p_(token,"(");
var in_dash_vector_p_ = special_p_(token,"[");
var in_dash_dict_p_ = special_p_(token,"{");
return (function() {if((in_dash_list_p_ && special_p_(exp,")"))) {return ast["make-node"]("\uFDD1LIST",reverse(lst),token_dash_lineno(token),token_dash_colno(token)); // Line 170 Column 4
} else {return (function() {if((in_dash_vector_p_ && special_p_(exp,"]"))) {return ast["make-node"]("\uFDD1VECTOR",reverse(lst),token_dash_lineno(token),token_dash_colno(token)); // Line 170 Column 4
} else {return (function() {if((in_dash_dict_p_ && special_p_(exp,"}"))) {return ast["make-node"]("\uFDD1DICT",reverse(lst),token_dash_lineno(token),token_dash_colno(token)); // Line 170 Column 4
} else {throw(str("unterminated ",(function() {if(list_p_) {return "list"; // Line <unknown undefined> Column <unknown undefined>
} else {return (function() {if(vector_p_) {return "vector"; // Line <unknown undefined> Column <unknown undefined>
} else {return (function() {if(dict_p_) {return "dict"; // Line <unknown undefined> Column <unknown undefined>
} else {return false; // Line <unknown undefined> Column <unknown undefined>
}})()
; // Line <unknown undefined> Column <unknown undefined>
}})()
; // Line <unknown undefined> Column <unknown undefined>
}})()
)); // Line 170 Column 4
}})()
; // Line <unknown undefined> Column <unknown undefined>
}})()
; // Line <unknown undefined> Column <unknown undefined>
}})()
; // Line <unknown undefined> Column <unknown undefined>
} else {return loop(cons(exp,lst),read_dash_exp()); // Line 170 Column 4
}})()
; // Line <unknown undefined> Column <unknown undefined>
});
var o20 = _emptylst;
var o21 = read_dash_exp();
return loop(o20,o21); // Line 170 Column 4
}))(); // Line 170 Column 4
} else {return (function() {if(special_p_(token,"'")) {return ast["make-node"]("\uFDD1LIST",list(ast["make-node"]("\uFDD1ATOM","\uFDD1quote",token_dash_lineno(token),token_dash_colno(token)),read_dash_exp()),token_dash_lineno(token),token_dash_colno(token)); // Line 170 Column 4
} else {return (function() {if(special_p_(token,":")) {return ((function() {var o22 = (function(e){
(function() {if((not(ast["atom?"](e)) || not(symbol_p_(ast["node-data"](e))))) {throw(str("invalid key expression: ",ast["node-data"](e))); // Line 170 Column 4
}})()
; // Line <unknown undefined> Column <unknown undefined>
return ast["make-node"]("\uFDD1ATOM",symbol_dash__gt_key(ast["node-data"](e)),token_dash_lineno(token),token_dash_colno(token)); // Line 170 Column 4
});
var o23 = read_dash_exp();
return o22(o23); // Line 170 Column 4
}))(); // Line 170 Column 4
} else {return (function() {if(special_p_(token,"`")) {return ast["make-node"]("\uFDD1LIST",list(ast["make-node"]("\uFDD1ATOM","\uFDD1quasiquote",token_dash_lineno(token),token_dash_colno(token)),read_dash_exp()),token_dash_lineno(token),token_dash_colno(token)); // Line 170 Column 4
} else {return (function() {if(special_p_(token,",")) {return ((function() {var o24 = (function(next){
return (function() {if(_eq__eq_(next,"@")) {forward(); // Line 170 Column 4
return ast["make-node"]("\uFDD1LIST",list(ast["make-node"]("\uFDD1ATOM","\uFDD1unquote-splicing",token_dash_lineno(token),token_dash_colno(token)),read_dash_exp()),token_dash_lineno(token),token_dash_colno(token)); // Line 170 Column 4
} else {return ast["make-node"]("\uFDD1LIST",list(ast["make-node"]("\uFDD1ATOM","\uFDD1unquote",token_dash_lineno(token),token_dash_colno(token)),read_dash_exp()),token_dash_lineno(token),token_dash_colno(token)); // Line 170 Column 4
}})()
; // Line <unknown undefined> Column <unknown undefined>
});
var o25 = current();
return o24(o25); // Line 170 Column 4
}))(); // Line 170 Column 4
} else {return (function() {if(_eq__eq_(token_dash_type(token),"\uFDD1COMMENT")) {return read_dash_exp(); // Line 170 Column 4
} else {return ast["make-node"]("\uFDD1ATOM",token_dash__gt_exp(token),token_dash_lineno(token),token_dash_colno(token)); // Line 170 Column 4
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
var o19 = get_dash_token();
return o18(o19); // Line 170 Column 4
}))(); // Line 170 Column 4
});
return ((function() {var loop = (function(e_star_,e){
return (function() {if(end_p_(e)) {return (function() {if(_eq__eq_(length(e_star_),1)) {return car(e_star_); // Line 272 Column 2
} else {return ast["make-node"]("\uFDD1LIST",cons(ast["make-node"]("\uFDD1ATOM","\uFDD1begin",0,1),reverse(e_star_)),0,0); // Line 272 Column 2
}})()
; // Line <unknown undefined> Column <unknown undefined>
} else {return loop(cons(e,e_star_),read_dash_exp()); // Line 272 Column 2
}})()
; // Line <unknown undefined> Column <unknown undefined>
});
var o26 = _emptylst;
var o27 = read_dash_exp();
return loop(o26,o27); // Line 272 Column 2
}))(); // Line 272 Column 2
});
module["exports"] = dict("\uFDD0read",read);

