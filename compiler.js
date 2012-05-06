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
return ((function() {var o3955080 = (function(res){
res.list = true;return res; // Line <unknown undefined> Column <unknown undefined>
});
var o3546089 = [obj, lst];
return o3955080(o3546089); // Line 106 Column 2
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
var o1689897 = lst;
var o3063060 = i;
return loop(o1689897,o3063060); // Line 127 Column 2
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
var o2101204 = lst1;
return loop(o2101204); // Line 149 Column 2
}))(); // Line 149 Column 2
});
var list_dash_find = (function(lst,val){
var rst = vector_dash__gt_list(Array.prototype.slice.call(arguments, 2));
return ((function() {var o5140158 = (function(access){
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
var o1877670 = lst;
return trampoline(loop(o1877670)); // Line 156 Column 2
}))(); // Line 156 Column 2
});
var o1127293 = (function() {if(null_p_(rst)) {return (function(x){
return x; // Line <unknown undefined> Column <unknown undefined>
}); // Line <unknown undefined> Column <unknown undefined>
} else {return car(rst); // Line 156 Column 2
}})()
;
return o5140158(o1127293); // Line 156 Column 2
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
var o7498103 = lst;
return trampoline(loop(o7498103)); // Line 171 Column 2
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
var o7473768 = 0;
return loop(o7473768); // Line 193 Column 2
}))(); // Line 193 Column 2
});
var make_dash_vector = (function(count,val){
return ((function() {var o7346161 = (function(v){
return ((function() {var loop = (function(i){
return (function() {if((i < count)) {return ((function() {vector_dash_put_excl_(v,i,val); // Line 202 Column 2
return vector("__tco_call",(function() {return loop((i + 1)); // Line 202 Column 2
})); // Line 202 Column 2
}))(); // Line 202 Column 2
} else {return v; // Line <unknown undefined> Column <unknown undefined>
}})()
; // Line <unknown undefined> Column <unknown undefined>
});
var o7068900 = 0;
return trampoline(loop(o7068900)); // Line 202 Column 2
}))(); // Line 202 Column 2
});
var o7766039 = new Array(count);
return o7346161(o7766039); // Line 202 Column 2
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
} else {return vector("__tco_call",(function() {return loop(cdr(lst),res["concat"](car(lst))); // Line 220 Column 2
})); // Line 220 Column 2
}})()
; // Line <unknown undefined> Column <unknown undefined>
});
var o8830021 = cdr(vecs);
var o7287328 = car(vecs);
return trampoline(loop(o8830021,o7287328)); // Line 220 Column 2
}))(); // Line 220 Column 2
});
var vector_dash_slice = (function(vec,start,end){
return vec.slice(start, end)});
var vector_dash_push_excl_ = (function(vec,obj){
return vec.push(obj)});
var vector_dash_find = (function(vec,val){
return ((function() {var loop = (function(i){
return (function() {if((i < vec.length)) {return (function() {if(eq_p_(vector_dash_ref(vec,i),val)) {return i; // Line <unknown undefined> Column <unknown undefined>
} else {return vector("__tco_call",(function() {return loop((i + 1)); // Line 234 Column 2
})); // Line 234 Column 2
}})()
; // Line <unknown undefined> Column <unknown undefined>
} else {return false; // Line <unknown undefined> Column <unknown undefined>
}})()
; // Line <unknown undefined> Column <unknown undefined>
});
var o5369550 = 0;
return trampoline(loop(o5369550)); // Line 234 Column 2
}))(); // Line 234 Column 2
});
var vector_dash_length = (function(vec){
return vec["length"]; // Line <unknown undefined> Column <unknown undefined>
});
var list_dash__gt_vector = (function(lst){
var res = [];
for_dash_each((function(el){
return res["push"](el); // Line 246 Column 15
}),lst); // Line 245 Column 3
return res; // Line <unknown undefined> Column <unknown undefined>
});
var vector_dash_map = (function(func,vec){
var res = [];
((function() {var loop = (function(i){
return (function() {if((i < vec["length"])) {return ((function() {res["push"](func(vector_dash_ref(vec,i))); // Line 252 Column 2
return vector("__tco_call",(function() {return loop((i + 1)); // Line 252 Column 2
})); // Line 252 Column 2
}))(); // Line 252 Column 2
}})()
; // Line <unknown undefined> Column <unknown undefined>
});
var o6084059 = 0;
return trampoline(loop(o6084059)); // Line 252 Column 2
}))(); // Line 252 Column 2
return res; // Line <unknown undefined> Column <unknown undefined>
});
var vector_dash_for_dash_each = (function(func,vec){
return ((function() {var loop = (function(i){
return (function() {if((i < vec["length"])) {return ((function() {func(vector_dash_ref(vec,i)); // Line 260 Column 2
return vector("__tco_call",(function() {return loop((i + 1)); // Line 260 Column 2
})); // Line 260 Column 2
}))(); // Line 260 Column 2
}})()
; // Line <unknown undefined> Column <unknown undefined>
});
var o4264542 = 0;
return trampoline(loop(o4264542)); // Line 260 Column 2
}))(); // Line 260 Column 2
});
var vector_dash_fold = (function(func,acc,vec){
return ((function() {var loop = (function(i,acc){
return (function() {if((i < vector_dash_length(vec))) {return vector("__tco_call",(function() {return loop((i + 1),func(vector_dash_ref(vec,i),acc)); // Line 267 Column 2
})); // Line 267 Column 2
} else {return acc; // Line <unknown undefined> Column <unknown undefined>
}})()
; // Line <unknown undefined> Column <unknown undefined>
});
var o5825187 = 0;
var o2315585 = acc;
return trampoline(loop(o5825187,o2315585)); // Line 267 Column 2
}))(); // Line 267 Column 2
});
var dict = (function() {
var args = vector_dash__gt_list(Array.prototype.slice.call(arguments));
var res = {};
((function() {var loop = (function(lst){
return (function() {if(not(null_p_(lst))) {return ((function() {var o6623511 = (function(key,val){
dict_dash_put_excl_(res,key,val); // Line 279 Column 4
return vector("__tco_call",(function() {return loop(cddr(lst)); // Line 279 Column 4
})); // Line 279 Column 4
});
var o3002806 = car(lst);
var o4910399 = cadr(lst);
return o6623511(o3002806,o4910399); // Line 279 Column 4
}))(); // Line 279 Column 4
}})()
; // Line <unknown undefined> Column <unknown undefined>
});
var o6173226 = args;
return trampoline(loop(o6173226)); // Line 279 Column 4
}))(); // Line 279 Column 4
return res; // Line <unknown undefined> Column <unknown undefined>
});
var dict_dash_put_excl_ = (function(dct,k,v){
return dct[k.substring(1)] = v});
var dict_dash_ref = (function(dct,k){
return dct[k.substring(1)]});
var dict_dash_map = (function(func,dct){
var res = dict();
((function() {var loop = (function(lst){
return (function() {if(not(null_p_(lst))) {return ((function() {var o2589073 = (function(k){
dict_dash_put_excl_(res,k,func(dict_dash_ref(dct,k))); // Line 295 Column 2
return vector("__tco_call",(function() {return loop(cdr(lst)); // Line 295 Column 2
})); // Line 295 Column 2
});
var o5223309 = car(lst);
return o2589073(o5223309); // Line 295 Column 2
}))(); // Line 295 Column 2
}})()
; // Line <unknown undefined> Column <unknown undefined>
});
var o3853216 = keys(dct);
return trampoline(loop(o3853216)); // Line 295 Column 2
}))(); // Line 295 Column 2
return res; // Line <unknown undefined> Column <unknown undefined>
});
var dict_dash_merge = (function(){
var dcts = vector_dash__gt_list(Array.prototype.slice.call(arguments, 0));
return ((function() {var o9217850 = (function(res){
for_dash_each((function(dct){
return for_dash_each((function(k){
return dict_dash_put_excl_(res,k,dict_dash_ref(dct,k)); // Line 304 Column 2
}),keys(dct)); // Line 304 Column 2
}),dcts); // Line 304 Column 2
return res; // Line <unknown undefined> Column <unknown undefined>
});
var o8657988 = dict();
return o9217850(o8657988); // Line 304 Column 2
}))(); // Line 304 Column 2
});
var dict_dash__gt_vector = (function(dct){
var res = vector();
((function() {var loop = (function(lst){
return (function() {if(not(null_p_(lst))) {return ((function() {vector_dash_push_excl_(res,car(lst)); // Line 314 Column 2
vector_dash_push_excl_(res,dict_dash_ref(dct,car(lst))); // Line 314 Column 2
return vector("__tco_call",(function() {return loop(cdr(lst)); // Line 314 Column 2
})); // Line 314 Column 2
}))(); // Line 314 Column 2
}})()
; // Line <unknown undefined> Column <unknown undefined>
});
var o9965556 = keys(dct);
return trampoline(loop(o9965556)); // Line 314 Column 2
}))(); // Line 314 Column 2
return res; // Line <unknown undefined> Column <unknown undefined>
});
var dict_dash__gt_list = (function(dct){
return vector_dash__gt_list(dict_dash__gt_vector(dct)); // Line 323 Column 3
});
var keys = (function(dct){
return ((function() {var o7104763 = (function(res){
for(var k in dct) {
       res = cons(string_dash__gt_key(k), res);
    }return res; // Line <unknown undefined> Column <unknown undefined>
});
var o2588167 = _emptylst;
return o7104763(o2588167); // Line 326 Column 2
}))(); // Line 326 Column 2
});
var vals = (function(dct){
return map((function(k){
return dict_dash_ref(dct,k); // Line 333 Column 20
}),keys(dct)); // Line 333 Column 3
});
var zip = (function(keys,vals){
var res = dict();
((function() {var loop = (function(ks,vs){
return (function() {if(not(null_p_(ks))) {return ((function() {dict_dash_put_excl_(res,car(ks),car(vs)); // Line 338 Column 2
return vector("__tco_call",(function() {return loop(cdr(ks),cdr(vs)); // Line 338 Column 2
})); // Line 338 Column 2
}))(); // Line 338 Column 2
}})()
; // Line <unknown undefined> Column <unknown undefined>
});
var o4521263 = keys;
var o8849665 = vals;
return trampoline(loop(o4521263,o8849665)); // Line 338 Column 2
}))(); // Line 338 Column 2
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
}))(); // Line 358 Column 2
} else {return (function() {if((n1 || n2)) {return ((function() {return false; // Line <unknown undefined> Column <unknown undefined>
}))(); // Line 358 Column 2
} else {return ((function() {return (function() {if(equal_p_(car(lst1),car(lst2))) {return loop(cdr(lst1),cdr(lst2)); // Line 358 Column 2
} else {return false; // Line <unknown undefined> Column <unknown undefined>
}})()
; // Line <unknown undefined> Column <unknown undefined>
}))(); // Line 358 Column 2
}})()
; // Line <unknown undefined> Column <unknown undefined>
}})()
; // Line <unknown undefined> Column <unknown undefined>
});
var o1836732 = obj1;
var o2644751 = obj2;
return loop(o1836732,o2644751); // Line 358 Column 2
}))(); // Line 358 Column 2
}))(); // Line 358 Column 2
} else {return (function() {if((vector_p_(obj1) && vector_p_(obj2))) {return ((function() {return (function() {if(not(_eq_(obj1["length"],obj2["length"]))) {return false; // Line <unknown undefined> Column <unknown undefined>
} else {return ((function() {var loop = (function(i){
return (function() {if((i < obj1["length"])) {return (function() {if(_eq_(vector_dash_ref(obj1,i),vector_dash_ref(obj2,i))) {return vector("__tco_call",(function() {return loop((i + 1)); // Line 358 Column 2
})); // Line 358 Column 2
} else {return false; // Line <unknown undefined> Column <unknown undefined>
}})()
; // Line <unknown undefined> Column <unknown undefined>
} else {return true; // Line <unknown undefined> Column <unknown undefined>
}})()
; // Line <unknown undefined> Column <unknown undefined>
});
var o2368526 = 0;
return trampoline(loop(o2368526)); // Line 358 Column 2
}))(); // Line 358 Column 2
}})()
; // Line <unknown undefined> Column <unknown undefined>
}))(); // Line 358 Column 2
} else {return (function() {if((dict_p_(obj1) && dict_p_(obj2))) {return ((function() {return ((function() {var o17096 = (function(keys1,keys2){
return (eq_p_(length(keys1),length(keys2)) && ((function() {var loop = (function(lst){
return (function() {if(null_p_(lst)) {return true; // Line <unknown undefined> Column <unknown undefined>
} else {return (function() {if(equal_p_(dict_dash_ref(obj1,car(lst)),dict_dash_ref(obj2,car(lst)))) {return vector("__tco_call",(function() {return loop(cdr(lst)); // Line 358 Column 2
})); // Line 358 Column 2
} else {return false; // Line <unknown undefined> Column <unknown undefined>
}})()
; // Line <unknown undefined> Column <unknown undefined>
}})()
; // Line <unknown undefined> Column <unknown undefined>
});
var o344353 = keys1;
return trampoline(loop(o344353)); // Line 358 Column 2
}))()); // Line <unknown undefined> Column <unknown undefined>
});
var o9457881 = keys(obj1);
var o2408281 = keys(obj2);
return o17096(o9457881,o2408281); // Line 358 Column 2
}))(); // Line 358 Column 2
}))(); // Line 358 Column 2
} else {return ((function() {return eq_p_(obj1,obj2); // Line 358 Column 2
}))(); // Line 358 Column 2
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
return util["print"](msg); // Line 406 Column 3
});
var println = (function(msg){
return util["puts"](msg); // Line 409 Column 3
});
var pp = (function(obj){
return println(inspect(obj)); // Line 412 Column 3
});
var _per_inspect_dash_non_dash_sequence = (function(obj){
return (function() {if(number_p_(obj)) {return ((function() {return ("" + obj); // Line <unknown undefined> Column <unknown undefined>
}))(); // Line 416 Column 2
} else {return (function() {if(string_p_(obj)) {return ((function() {obj = obj["replace"](RegExp("\\\\","g"),"\\\\");
obj = obj["replace"](RegExp("\n","g"),"\\n");
obj = obj["replace"](RegExp("\r","g"),"\\r");
obj = obj["replace"](RegExp("\t","g"),"\\t");
obj = obj["replace"](RegExp("\"","g"),"\\\"");
return ("\"" + obj + "\""); // Line <unknown undefined> Column <unknown undefined>
}))(); // Line 416 Column 2
} else {return (function() {if(key_p_(obj)) {return ((function() {return (":" + symbol_dash__gt_string(obj)); // Line <unknown undefined> Column <unknown undefined>
}))(); // Line 416 Column 2
} else {return (function() {if(symbol_p_(obj)) {return ((function() {return symbol_dash__gt_string(obj); // Line 416 Column 2
}))(); // Line 416 Column 2
} else {return (function() {if(boolean_p_(obj)) {return ((function() {return (function() {if(obj) {return "#t"; // Line <unknown undefined> Column <unknown undefined>
} else {return "#f"; // Line <unknown undefined> Column <unknown undefined>
}})()
; // Line <unknown undefined> Column <unknown undefined>
}))(); // Line 416 Column 2
} else {return (function() {if(null_p_(obj)) {return ((function() {return "()"; // Line <unknown undefined> Column <unknown undefined>
}))(); // Line 416 Column 2
} else {return (function() {if(function_p_(obj)) {return ((function() {return "<function>"; // Line <unknown undefined> Column <unknown undefined>
}))(); // Line 416 Column 2
} else {return ((function() {return ("<unknown " + obj + ">"); // Line <unknown undefined> Column <unknown undefined>
}))(); // Line 416 Column 2
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
return ((function() {var o3967415 = (function(parents){
return (function() {if(list_dash_find(parents,obj)) {return halt; // Line <unknown undefined> Column <unknown undefined>
} else {return func(obj,arg,(function(el,arg){
return _per_recur_dash_protect(el,arg,func,halt,cons(obj,parents)); // Line 433 Column 2
})); // Line 433 Column 2
}})()
; // Line <unknown undefined> Column <unknown undefined>
});
var o4827448 = (function() {if(null_p_(rest)) {return _emptylst; // Line <unknown undefined> Column <unknown undefined>
} else {return car(rest); // Line 433 Column 2
}})()
;
return o3967415(o4827448); // Line 433 Column 2
}))(); // Line 433 Column 2
});
var _per_space = (function(obj){
return _per_recur_dash_protect(obj,false,(function(obj,arg,recur){
return (function() {if(list_p_(obj)) {return ((function() {return (length(obj) + 1 + fold((function(el,acc){
return (acc + recur(el,false)); // Line <unknown undefined> Column <unknown undefined>
}),0,obj)); // Line <unknown undefined> Column <unknown undefined>
}))(); // Line 446 Column 5
} else {return (function() {if(dict_p_(obj)) {return ((function() {return recur(dict_dash__gt_list(obj),false); // Line 446 Column 5
}))(); // Line 446 Column 5
} else {return (function() {if(vector_p_(obj)) {return ((function() {return recur(vector_dash__gt_list(obj),false); // Line 446 Column 5
}))(); // Line 446 Column 5
} else {return ((function() {return vector_dash_length(_per_inspect_dash_non_dash_sequence(obj)); // Line 446 Column 5
}))(); // Line 446 Column 5
}})()
; // Line <unknown undefined> Column <unknown undefined>
}})()
; // Line <unknown undefined> Column <unknown undefined>
}})()
; // Line <unknown undefined> Column <unknown undefined>
}),vector_dash_length("<circular>")); // Line 442 Column 3
});
var inspect = (function(obj){
var rest = vector_dash__gt_list(Array.prototype.slice.call(arguments, 1));
return ((function() {var o349995 = (function(no_dash_newlines){
return _per_recur_dash_protect(obj,1,(function(obj,i,recur){
var buffer = "";
var get_dash_buffer = (function() {return buffer; // Line <unknown undefined> Column <unknown undefined>
});
var disp = (function(s){
buffer = (buffer + s);
});
var pad = (function(n){
return vector_dash_for_dash_each((function(_){
return disp(" "); // Line 466 Column 2
}),make_dash_vector(n)); // Line 466 Column 2
});
return (function() {if(list_p_(obj)) {return ((function() {return ((function() {var o5783631 = (function(sp,first){
disp("("); // Line 466 Column 2
for_dash_each((function(el){
(function() {if(not(first)) {return (function() {if((sp && not(no_dash_newlines))) {return ((function() {disp("\n"); // Line 466 Column 2
return pad(i); // Line 466 Column 2
}))(); // Line 466 Column 2
} else {return disp(" "); // Line 466 Column 2
}})()
; // Line <unknown undefined> Column <unknown undefined>
}})()
; // Line <unknown undefined> Column <unknown undefined>
disp(recur(el,(i + 1))); // Line 466 Column 2
first = false;
}),obj); // Line 466 Column 2
disp(")"); // Line 466 Column 2
return get_dash_buffer(); // Line 466 Column 2
});
var o833723 = (_per_space(obj) > 30);
var o2365884 = true;
return o5783631(o833723,o2365884); // Line 466 Column 2
}))(); // Line 466 Column 2
}))(); // Line 466 Column 2
} else {return (function() {if(vector_p_(obj)) {return ((function() {return ((function() {var o3506550 = (function(sp,first){
disp("["); // Line 466 Column 2
vector_dash_for_dash_each((function(el){
(function() {if(not(first)) {return (function() {if((sp && not(no_dash_newlines))) {return ((function() {disp("\n"); // Line 466 Column 2
return pad(i); // Line 466 Column 2
}))(); // Line 466 Column 2
} else {return disp(" "); // Line 466 Column 2
}})()
; // Line <unknown undefined> Column <unknown undefined>
}})()
; // Line <unknown undefined> Column <unknown undefined>
disp(recur(el,(i + 1))); // Line 466 Column 2
first = false;
}),obj); // Line 466 Column 2
disp("]"); // Line 466 Column 2
return get_dash_buffer(); // Line 466 Column 2
});
var o3516687 = (_per_space(obj) > 30);
var o7858367 = true;
return o3506550(o3516687,o7858367); // Line 466 Column 2
}))(); // Line 466 Column 2
}))(); // Line 466 Column 2
} else {return (function() {if(dict_p_(obj)) {return ((function() {return ((function() {var o97325 = (function(sp,first){
disp("{"); // Line 466 Column 2
for_dash_each((function(k){
(function() {if(not(first)) {return (function() {if((sp && not(no_dash_newlines))) {return ((function() {disp("\n"); // Line 466 Column 2
return pad(i); // Line 466 Column 2
}))(); // Line 466 Column 2
} else {return disp(" "); // Line 466 Column 2
}})()
; // Line <unknown undefined> Column <unknown undefined>
}})()
; // Line <unknown undefined> Column <unknown undefined>
disp(recur(k,i)); // Line 466 Column 2
disp(" "); // Line 466 Column 2
disp(recur(dict_dash_ref(obj,k),(i + 3 + vector_dash_length(symbol_dash__gt_string(k))))); // Line 466 Column 2
first = false;
}),keys(obj)); // Line 466 Column 2
disp("}"); // Line 466 Column 2
return get_dash_buffer(); // Line 466 Column 2
});
var o8540592 = (_per_space(obj) > 30);
var o5357898 = true;
return o97325(o8540592,o5357898); // Line 466 Column 2
}))(); // Line 466 Column 2
}))(); // Line 466 Column 2
} else {return ((function() {return _per_inspect_dash_non_dash_sequence(obj); // Line 466 Column 2
}))(); // Line 466 Column 2
}})()
; // Line <unknown undefined> Column <unknown undefined>
}})()
; // Line <unknown undefined> Column <unknown undefined>
}})()
; // Line <unknown undefined> Column <unknown undefined>
}),"<circular>"); // Line 466 Column 2
});
var o5715310 = (function() {if(null_p_(rest)) {return false; // Line <unknown undefined> Column <unknown undefined>
} else {return car(rest); // Line 466 Column 2
}})()
;
return o349995(o5715310); // Line 466 Column 2
}))(); // Line 466 Column 2
});
var apply = (function(func,args){
return func.apply(null,list_dash__gt_vector(args)); // Line 540 Column 3
});
var trampoline_dash_result_p_ = (function(value){
return (vector_p_(value) && _eq_(vector_dash_ref(value,0),"__tco_call")); // Line <unknown undefined> Column <unknown undefined>
});
var trampoline = (function(value){
while(trampoline_dash_result_p_(value)) { value = value[1](); }return value; // Line <unknown undefined> Column <unknown undefined>
});
var gensym = (function() {return string_dash__gt_symbol(("o" + Math["floor"]((Math["random"]() * 10000000)))); // Line 554 Column 3
});


var reader = require("./reader");var ast = require("./ast");var js = require("./backends/js");var fs = require("fs");var self_dash_evaluating_p_ = (function(exp){
return (number_p_(exp) || string_p_(exp) || boolean_p_(exp) || null_p_(exp) || key_p_(exp)); // Line <unknown undefined> Column <unknown undefined>
});
var alternating_dash_map = (function(func,lst){
var former_p_ = vector_dash__gt_list(Array.prototype.slice.call(arguments, 2));
return ((function() {var loop = (function(lst,acc){
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
var o7504014 = lst;
var o4915313 = _emptylst;
return trampoline(loop(o7504014,o4915313)); // Line 16 Column 2
}))(); // Line 16 Column 2
});
var opt = (function(arg,def){
return (function() {if(null_p_(arg)) {return def; // Line <unknown undefined> Column <unknown undefined>
} else {return car(arg); // Line 31 Column 23
}})()
; // Line <unknown undefined> Column <unknown undefined>
});
var assert = (function(cnd,msg){
return (function() {if(not(cnd)) {throw(msg); // Line 35 Column 7
}})()
; // Line <unknown undefined> Column <unknown undefined>
});
var expand = (function(node){
return (function() {if(ast["atom?"](node)) {return ((function() {return node; // Line <unknown undefined> Column <unknown undefined>
}))(); // Line 40 Column 2
} else {return (function() {if(ast["vector?"](node)) {return ((function() {return ast["copy-node"](node,map((function(e){
return expand(e); // Line 40 Column 2
}),ast["node-data"](node))); // Line 40 Column 2
}))(); // Line 40 Column 2
} else {return (function() {if(ast["dict?"](node)) {return ((function() {return ast["copy-node"](node,map((function(e){
return expand(e); // Line 40 Column 2
}),ast["node-data"](node))); // Line 40 Column 2
}))(); // Line 40 Column 2
} else {return (function() {if((_eq__eq_(ast["first*"](node),"\uFDD1quote") || _eq__eq_(ast["first*"](node),"\uFDD1quasiquote"))) {return ((function() {return node; // Line <unknown undefined> Column <unknown undefined>
}))(); // Line 40 Column 2
} else {return (function() {if(_eq__eq_(ast["first*"](node),"\uFDD1lambda")) {return ((function() {return ast["copy-node"](node,cons(ast["first"](node),cons(cadr(ast["node-data"](node)),map((function(e){
return expand(e); // Line 40 Column 2
}),cddr(ast["node-data"](node)))))); // Line 40 Column 2
}))(); // Line 40 Column 2
} else {return (function() {if(macro_p_(ast["first*"](node))) {return ((function() {return ((function() {var o5028890 = (function(res){
return expand(sourcify(res,ast["node-lineno"](node),ast["node-colno"](node))); // Line 40 Column 2
});
var o2771595 = macro_dash_function(ast["first*"](node))(desourcify(node));
return o5028890(o2771595); // Line 40 Column 2
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
return dict_dash_ref(_per_macros,name); // Line 72 Column 3
});
var install_dash_macro = (function(name,f){
return dict_dash_put_excl_(_per_macros,name,f); // Line 75 Column 3
});
var macro_p_ = (function(name){
return (symbol_p_(name) && dict_dash_ref(_per_macros,symbol_dash__gt_key(name)) && true); // Line <unknown undefined> Column <unknown undefined>
});
var macro_dash_generator = false;
var make_dash_macro = (function(pattern,body){
return ((function() {var o4010888 = (function(x){
return ((function() {var o3266144 = (function(s,p){
return eval(p); // Line 85 Column 2
});
var o9446310 = list("\uFDD1lambda",list(x),list("\uFDD1apply",list_dash_append(list("\uFDD1lambda",pattern),body),list("\uFDD1cdr",x)));
var o8620044 = compile_dash_program(o9446310,macro_dash_generator["make-fresh"]());
return o3266144(o9446310,o8620044); // Line 85 Column 2
}))(); // Line 85 Column 2
});
var o6425636 = gensym();
return o4010888(o6425636); // Line 85 Column 2
}))(); // Line 85 Column 2
});
var sourcify = (function(exp,lineno,colno){
return (function() {if((self_dash_evaluating_p_(exp) || symbol_p_(exp))) {return ((function() {return ast["make-node"]("\uFDD1ATOM",exp,lineno,colno); // Line 96 Column 2
}))(); // Line 96 Column 2
} else {return (function() {if(vector_p_(exp)) {return ((function() {return ast["make-node"]("\uFDD1VECTOR",map((function(e){
return sourcify(e,lineno,colno); // Line 96 Column 2
}),vector_dash__gt_list(exp)),lineno,colno); // Line 96 Column 2
}))(); // Line 96 Column 2
} else {return (function() {if(dict_p_(exp)) {return ((function() {return ast["make-node"]("\uFDD1DICT",map((function(e){
return sourcify(e,lineno,colno); // Line 96 Column 2
}),dict_dash__gt_list(exp)),lineno,colno); // Line 96 Column 2
}))(); // Line 96 Column 2
} else {return ((function() {return ast["make-node"]("\uFDD1LIST",map((function(e){
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
return ((function() {var o7152116 = (function(sig){
return ((function() {var o7983529 = (function(name,pattern,body){
install_dash_macro(name,make_dash_macro(pattern,body)); // Line 129 Column 3
return false; // Line <unknown undefined> Column <unknown undefined>
});
var o6411971 = car(sig);
var o2038139 = cdr(sig);
var o2198960 = cddr(form);
return o7983529(o6411971,o2038139,o2198960); // Line 129 Column 3
}))(); // Line 129 Column 3
});
var o5869508 = cadr(form);
return o7152116(o5869508); // Line 129 Column 3
}))(); // Line 129 Column 3
})); // Line 126 Column 1
install_dash_macro("\uFDD1begin",(function(form){
return list(list_dash_append(list("\uFDD1lambda",_emptylst),cdr(form))); // Line 140 Column 5
})); // Line 137 Column 1
install_dash_macro("\uFDD1cond",(function(form){
return (function() {if(null_p_(cdr(form))) {return false; // Line <unknown undefined> Column <unknown undefined>
} else {return ((function() {var o2812377 = (function(forms){
return ((function() {var o8650195 = (function(f){
return (function() {if(eq_p_(car(f),"\uFDD1else")) {return list_dash_append(list("\uFDD1begin"),cdr(f)); // Line 147 Column 7
} else {return list("\uFDD1if",car(f),list_dash_append(list("\uFDD1begin"),cdr(f)),list_dash_append(list("\uFDD1cond"),cdr(forms))); // Line 147 Column 7
}})()
; // Line <unknown undefined> Column <unknown undefined>
});
var o9119515 = car(forms);
return o8650195(o9119515); // Line 147 Column 7
}))(); // Line 147 Column 7
});
var o9075499 = cdr(form);
return o2812377(o9075499); // Line 147 Column 7
}))(); // Line 147 Column 7
}})()
; // Line <unknown undefined> Column <unknown undefined>
})); // Line 142 Column 1
install_dash_macro("\uFDD1let",(function(form){
var replace = (function(expr,old,sym){
return (function() {if(symbol_p_(expr)) {return ((function() {return (function() {if(_eq__eq_(expr,old)) {return sym; // Line <unknown undefined> Column <unknown undefined>
} else {return expr; // Line <unknown undefined> Column <unknown undefined>
}})()
; // Line <unknown undefined> Column <unknown undefined>
}))(); // Line 160 Column 5
} else {return (function() {if(literal_p_(expr)) {return ((function() {return expr; // Line <unknown undefined> Column <unknown undefined>
}))(); // Line 160 Column 5
} else {return (function() {if(dict_p_(expr)) {return ((function() {return dict_dash_map((function(e){
return replace(e,old,sym); // Line 160 Column 5
}),expr); // Line 160 Column 5
}))(); // Line 160 Column 5
} else {return (function() {if(vector_p_(expr)) {return ((function() {return vector_dash_map((function(e){
return replace(e,old,sym); // Line 160 Column 5
}),expr); // Line 160 Column 5
}))(); // Line 160 Column 5
} else {return (function() {if(list_p_(expr)) {return ((function() {return map((function(e){
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
return reverse(((function() {var loop = (function(lst,forms,vars,acc){
return (function() {if(null_p_(lst)) {return acc; // Line <unknown undefined> Column <unknown undefined>
} else {return ((function() {var o3439665 = (function(sym,name,code){
return vector("__tco_call",(function() {return loop(cdr(lst),cdr(forms),dict_dash_merge(vars,dict(name,sym)),cons(list("\uFDD1define",car(lst),fold((function(el,acc){
return replace(acc,key_dash__gt_symbol(el),dict_dash_ref(vars,el)); // Line 174 Column 6
}),code,keys(vars))),acc)); // Line 174 Column 6
})); // Line 174 Column 6
});
var o7609696 = car(lst);
var o7338149 = car(car(forms));
var o8633155 = cadar(forms);
return o3439665(o7609696,o7338149,o8633155); // Line 174 Column 6
}))(); // Line 174 Column 6
}})()
; // Line <unknown undefined> Column <unknown undefined>
});
var o3290574 = syms;
var o8648122 = exprs;
var o1956860 = dict();
var o9023710 = _emptylst;
return trampoline(loop(o3290574,o8648122,o1956860,o9023710)); // Line 174 Column 6
}))()); // Line 173 Column 6
});
var tco = (function(exprs,exit){
var if_p_ = (function(expr){
return (list_p_(expr) && _eq__eq_(car(expr),"\uFDD1if")); // Line <unknown undefined> Column <unknown undefined>
});
var let_p_ = (function(expr){
return (list_p_(expr) && _eq__eq_(car(expr),"\uFDD1let")); // Line <unknown undefined> Column <unknown undefined>
});
var begin_p_ = (function(expr){
return (list_p_(expr) && _eq__eq_(car(expr),"\uFDD1begin")); // Line <unknown undefined> Column <unknown undefined>
});
var tco_p_ = (function(expr){
return (list_p_(expr) && _eq__eq_(car(expr),exit)); // Line <unknown undefined> Column <unknown undefined>
});
var process_dash_if = (function(expr,transform){
return (function() {if(null_p_(cdddr(expr))) {return list("\uFDD1if",cadr(expr),transform(caddr(expr))); // Line 212 Column 13
} else {return list("\uFDD1if",cadr(expr),transform(caddr(expr)),transform(car(cdddr(expr)))); // Line 214 Column 13
}})()
; // Line <unknown undefined> Column <unknown undefined>
});
return ((function() {var o1929092 = (function(rexprs){
return ((function() {var o6803646 = (function(bottom){
return (function() {if(if_p_(bottom)) {return ((function() {return reverse(cons(process_dash_if(bottom,(function(expr){
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
var o3312712 = car(rexprs);
return o6803646(o3312712); // Line 218 Column 5
}))(); // Line 218 Column 5
});
var o4348081 = reverse(exprs);
return o1929092(o4348081); // Line 218 Column 5
}))(); // Line 218 Column 5
});
var tco_dash_call_p_ = (function(name,expr){
var _tco_p_ = (function(expr){
return (list_p_(expr) && _eq_(car(expr),"\uFDD1vector") && _eq_(cadr(expr),"__tco_call") && ((function() {var o2296701 = (function(lamb){
return ((function() {var o6003113 = (function(body){
return _eq_(car(body),name); // Line 247 Column 12
});
var o515374 = caddr(lamb);
return o6003113(o515374); // Line 247 Column 12
}))(); // Line 247 Column 12
});
var o3913517 = caddr(expr);
return o2296701(o3913517); // Line 247 Column 12
}))()); // Line <unknown undefined> Column <unknown undefined>
});
return (function() {if(list_p_(expr)) {return (_tco_p_(expr) || fold((function(el,acc){
return (acc || tco_dash_call_p_(name,el)); // Line <unknown undefined> Column <unknown undefined>
}),false,expr)); // Line <unknown undefined> Column <unknown undefined>
} else {return false; // Line <unknown undefined> Column <unknown undefined>
}})()
; // Line <unknown undefined> Column <unknown undefined>
});
return ((function() {var o6161223 = (function(name,forms){
assert((null_p_(forms) || (list_p_(forms) && list_p_(car(forms)))),str("invalid let: ",form)); // Line 262 Column 3
return ((function() {var o3596650 = (function(syms,body){
return ((function() {var o5729073 = (function(tco_dash_ed){
return list(list_dash_append(list("\uFDD1lambda",_emptylst,list_dash_append(list("\uFDD1define",list_dash_append(list(name),map(car,forms))),tco_dash_ed)),list_dash_append(generate_dash_defs(syms,forms),(function() {if(tco_dash_call_p_(name,tco_dash_ed)) {return list(list("\uFDD1trampoline",list_dash_append(list(name),syms))); // Line 262 Column 3
} else {return list(list_dash_append(list(name),syms)); // Line 262 Column 3
}})()
))); // Line 262 Column 3
});
var o1800664 = tco(body,name);
return o5729073(o1800664); // Line 262 Column 3
}))(); // Line 262 Column 3
});
var o7218779 = map((function(el){
return gensym(); // Line 262 Column 3
}),forms);
var o2688481 = (function() {if(symbol_p_(cadr(form))) {return cdddr(form); // Line 262 Column 3
} else {return cddr(form); // Line 262 Column 3
}})()
;
return o3596650(o7218779,o2688481); // Line 262 Column 3
}))(); // Line 262 Column 3
});
var o5850852 = (function() {if(symbol_p_(cadr(form))) {return cadr(form); // Line 262 Column 3
} else {return gensym(); // Line 262 Column 3
}})()
;
var o3359929 = (function() {if(symbol_p_(cadr(form))) {return caddr(form); // Line 262 Column 3
} else {return cadr(form); // Line 262 Column 3
}})()
;
return o6161223(o5850852,o3359929); // Line 262 Column 3
}))(); // Line 262 Column 3
})); // Line 156 Column 1
install_dash_macro("\uFDD1eval",(function(form){
return list(list("\uFDD1%raw","eval"),list("\uFDD1__compiler.compile-program",cadr(form),list("\uFDD1__generator"))); // Line 295 Column 5
})); // Line 292 Column 1
var _natives_ = dict();
var native_dash_function = (function(name){
return dict_dash_ref(_natives_,name); // Line 311 Column 3
});
var install_dash_native = (function(name,func,validator){
return dict_dash_put_excl_(_natives_,name,(function(node,gen,expr_p_,compile_star_){
validator(node); // Line 317 Column 16
return dict_dash_ref(gen,func)(cdr(ast["node-data"](node)),expr_p_,compile_star_); // Line 318 Column 16
})); // Line 314 Column 3
});
var native_p_ = (function(name){
return (symbol_p_(name) && not(eq_p_(dict_dash_ref(_natives_,symbol_dash__gt_key(name))),undefined)); // Line <unknown undefined> Column <unknown undefined>
});
var verify_dash_not_dash_single = (function(node){
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
verify_dash_not_dash_single(node); // Line 348 Column 19
return for_dash_each((function(el){
return assert((ast["list?"](el) && eq_p_(length(ast["node-data"](el)),2)),str("require needs a list of ","2 element lists: ",inspect(desourcify(el)))); // Line 351 Column 22
}),cdr(ast["node-data"](node))); // Line 349 Column 19
})); // Line 346 Column 1
var apply_dash_node = (function(func_dash_name,node){
var quoted_p_ = vector_dash__gt_list(Array.prototype.slice.call(arguments, 2));
return ((function() {var o5144610 = (function(quoted_p_){
return ast["prepend"](ast["make-atom"](func_dash_name,node),(function() {if(quoted_p_) {return ast["map-children"]((function(e){
return ast["make-list"](ast["make-atom"]("\uFDD1quote",node),e); // Line 363 Column 2
}),node); // Line 363 Column 2
} else {return node; // Line <unknown undefined> Column <unknown undefined>
}})()
); // Line 363 Column 2
});
var o4690507 = opt(quoted_p_,false);
return o5144610(o4690507); // Line 363 Column 2
}))(); // Line 363 Column 2
});
var apply_dash_w_slash_unquote = (function(func_dash_name,node){
return ast["prepend"](ast["make-atom"](func_dash_name,node),ast["map-children"]((function(e){
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
var make_dash_splice = (function(lst){
return (function() {if((self_dash_evaluating_p_(lst) || symbol_p_(lst))) {return apply_dash_w_slash_unquote(func_dash_name,ast["make-list*"](list(lst))); // Line 393 Column 9
} else {return apply_dash_w_slash_unquote(func_dash_name,ast["make-list*"](lst)); // Line 394 Column 9
}})()
; // Line <unknown undefined> Column <unknown undefined>
});
return ((function() {var loop = (function(nodes,slices,acc){
return (function() {if(null_p_(nodes)) {return reverse((function() {if(null_p_(acc)) {return slices; // Line <unknown undefined> Column <unknown undefined>
} else {return cons(make_dash_splice(reverse(acc)),slices); // Line 396 Column 2
}})()
); // Line 396 Column 2
} else {return ((function() {var o1715578 = (function(node){
return (function() {if((ast["list?"](node) && _eq__eq_(ast["first*"](node),"\uFDD1unquote-splicing"))) {return ((function() {var o3766871 = (function(el){
return vector("__tco_call",(function() {return loop(cdr(nodes),cons(el,(function() {if(null_p_(acc)) {return slices; // Line <unknown undefined> Column <unknown undefined>
} else {return cons(make_dash_splice(reverse(acc)),slices); // Line 396 Column 2
}})()
),_emptylst); // Line 396 Column 2
})); // Line 396 Column 2
});
var o4820578 = cadr(ast["node-data"](node));
return o3766871(o4820578); // Line 396 Column 2
}))(); // Line 396 Column 2
} else {return vector("__tco_call",(function() {return loop(cdr(nodes),slices,cons(node,acc)); // Line 396 Column 2
})); // Line 396 Column 2
}})()
; // Line <unknown undefined> Column <unknown undefined>
});
var o6253446 = car(nodes);
return o1715578(o6253446); // Line 396 Column 2
}))(); // Line 396 Column 2
}})()
; // Line <unknown undefined> Column <unknown undefined>
});
var o3113071 = lst;
var o2359439 = _emptylst;
var o5641899 = _emptylst;
return trampoline(loop(o3113071,o2359439,o5641899)); // Line 396 Column 2
}))(); // Line 396 Column 2
});
var quasiquote_dash_split = (function(append_dash_name,func_dash_name,node){
return ((function() {var o1096420 = (function(slices){
return (function() {if(_eq__eq_(length(slices),1)) {return car(slices); // Line 421 Column 2
} else {return apply_dash_node(append_dash_name,ast["make-list*"](slices)); // Line 421 Column 2
}})()
; // Line <unknown undefined> Column <unknown undefined>
});
var o4838310 = split_dash_splices(ast["node-data"](node),func_dash_name);
return o1096420(o4838310); // Line 421 Column 2
}))(); // Line 421 Column 2
});
var compile_dash_object = (function(node,generator,quoted_p_,expr_p_){
return ((function() {var o9605286 = (function(exp){
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
var o8584967 = ast["node-data"](node);
return o9605286(o8584967); // Line 427 Column 2
}))(); // Line 427 Column 2
});
var compile_dash_quasi = (function(node,generator,expr_p_){
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
var expr_p_ = vector_dash__gt_list(Array.prototype.slice.call(arguments, 2));
return generator["write-term"](node,opt(expr_p_,false)); // Line 457 Column 3
});
var compile_dash_if = (function(node,generator,expr_p_,compile_star_){
return ((function() {var o83744 = (function(nodes,cnd,tru,alt){
return generator["write-if"](cnd,tru,alt,expr_p_,compile_star_); // Line 460 Column 2
});
var o5469385 = ast["node-data"](node);
var o8280774 = cadr(o5469385);
var o7788770 = caddr(o5469385);
var o685480 = (function() {if(null_p_(cdddr(o5469385))) {return false; // Line <unknown undefined> Column <unknown undefined>
} else {return car(cdddr(o5469385)); // Line 460 Column 2
}})()
;
return o83744(o5469385,o8280774,o7788770,o685480); // Line 460 Column 2
}))(); // Line 460 Column 2
});
var compile_dash_lambda = (function(node,generator,expr_p_,compile_star_){
return ((function() {var o4848319 = (function(nodes,args,body){
return generator["write-lambda"](args,body,expr_p_,compile_star_); // Line 469 Column 2
});
var o2817851 = ast["node-data"](node);
var o8099633 = cadr(o2817851);
var o6472209 = cddr(o2817851);
return o4848319(o2817851,o8099633,o6472209); // Line 469 Column 2
}))(); // Line 469 Column 2
});
var compile_dash_set_excl_ = (function(node,generator,compile_star_){
return generator["write-set!"](cadr(ast["node-data"](node)),caddr(ast["node-data"](node)),compile_star_); // Line 475 Column 3
});
var compile_dash_define = (function(node,generator,compile_star_){
return ((function() {var o3425053 = (function(target){
return (function() {if(ast["list?"](target)) {return ((function() {var o7541945 = (function(name,args,body){
return generator["write-define"](name,ast["make-list*"](cons(ast["make-atom"]("\uFDD1lambda",name),cons((function() {if(null_p_(args)) {return ast["make-empty-list"](name); // Line 480 Column 2
} else {return ast["make-list*"](args); // Line 480 Column 2
}})()
,body))),compile_star_); // Line 480 Column 2
});
var o8185827 = ast["first"](target);
var o3385196 = cdr(ast["node-data"](target));
var o9883855 = cddr(ast["node-data"](node));
return o7541945(o8185827,o3385196,o9883855); // Line 480 Column 2
}))(); // Line 480 Column 2
} else {return generator["write-define"](target,caddr(ast["node-data"](node)),compile_star_); // Line 480 Column 2
}})()
; // Line <unknown undefined> Column <unknown undefined>
});
var o9227341 = cadr(ast["node-data"](node));
return o3425053(o9227341); // Line 480 Column 2
}))(); // Line 480 Column 2
});
var compile = (function(node,generator){
var expr_p_ = vector_dash__gt_list(Array.prototype.slice.call(arguments, 2));
var compile_star_ = (function(node){
var expr_p_ = vector_dash__gt_list(Array.prototype.slice.call(arguments, 1));
return compile(node,generator,opt(expr_p_,false)); // Line 500 Column 5
});
return ((function() {var o1138872 = (function(expr_p_){
return (function() {if(self_dash_evaluating_p_(ast["node-data"](node))) {return ((function() {return compile_dash_object(node,generator,false,expr_p_); // Line 502 Column 2
}))(); // Line 502 Column 2
} else {return (function() {if(symbol_p_(ast["node-data"](node))) {return ((function() {return compile_dash_reference(node,generator,expr_p_); // Line 502 Column 2
}))(); // Line 502 Column 2
} else {return (function() {if(ast["vector?"](node)) {return ((function() {return compile_dash_object(node,generator,false,expr_p_); // Line 502 Column 2
}))(); // Line 502 Column 2
} else {return (function() {if(ast["dict?"](node)) {return ((function() {return compile_dash_object(node,generator,false,expr_p_); // Line 502 Column 2
}))(); // Line 502 Column 2
} else {return (function() {if(ast["list?"](node)) {return ((function() {return ((function() {var o472360 = (function(sym){
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
var o747573 = ast["first*"](node);
return o472360(o747573); // Line 502 Column 2
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
var o1621022 = opt(expr_p_,false);
return o1138872(o1621022); // Line 502 Column 2
}))(); // Line 502 Column 2
});
var compile_dash_program = (function(src,generator){
(function() {if(not(macro_dash_generator)) {macro_dash_generator = generator;
}})()
; // Line <unknown undefined> Column <unknown undefined>
return ((function() {var o4833361 = (function(exp){
(function() {if((ast["type?"](exp,"\uFDD1LIST") && _eq__eq_(ast["first*"](exp),"\uFDD1begin"))) {return for_dash_each((function(e){
return compile(expand(e),generator); // Line 540 Column 2
}),cdr(ast["node-data"](exp))); // Line 540 Column 2
} else {return compile(expand(exp),generator); // Line 540 Column 2
}})()
; // Line <unknown undefined> Column <unknown undefined>
return generator["get-code"](); // Line 540 Column 2
});
var o7496294 = (function() {if(string_p_(src)) {return reader["read"](src); // Line 540 Column 2
} else {return sourcify(src,0,0); // Line 540 Column 2
}})()
;
return o4833361(o7496294); // Line 540 Column 2
}))(); // Line 540 Column 2
});
module["exports"] = dict("\uFDD0read",(function(e){
return desourcify(reader["read"](e)); // Line 552 Column 41
}),"\uFDD0expand",expand,"\uFDD0compile",compile,"\uFDD0compile-program",compile_dash_program,"\uFDD0desourcify",desourcify,"\uFDD0sourcify",sourcify,"\uFDD0pp",pp,"\uFDD0set-macro-generator",(function(g){
return (function() {if(not(macro_dash_generator)) {macro_dash_generator = g;
}})()
; // Line <unknown undefined> Column <unknown undefined>
}));

