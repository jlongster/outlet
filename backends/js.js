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
return ((function() {var o1035622 = (function(res){
res.list = true;return res; // Line <unknown undefined> Column <unknown undefined>
});
var o5702088 = [obj, lst];
return o1035622(o5702088); // Line 106 Column 2
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
var o8974345 = lst;
var o5974537 = i;
return loop(o8974345,o5974537); // Line 127 Column 2
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
var o8434916 = lst1;
return loop(o8434916); // Line 149 Column 2
}))(); // Line 149 Column 2
});
var list_dash_find = (function(lst,val){
var rst = vector_dash__gt_list(Array.prototype.slice.call(arguments, 2));
return ((function() {var o7535563 = (function(access){
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
var o8822814 = lst;
return trampoline(loop(o8822814)); // Line 156 Column 2
}))(); // Line 156 Column 2
});
var o8526158 = (function() {if(null_p_(rst)) {return (function(x){
return x; // Line <unknown undefined> Column <unknown undefined>
}); // Line <unknown undefined> Column <unknown undefined>
} else {return car(rst); // Line 156 Column 2
}})()
;
return o7535563(o8526158); // Line 156 Column 2
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
var o1525844 = lst;
return trampoline(loop(o1525844)); // Line 171 Column 2
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
var o2057438 = 0;
return loop(o2057438); // Line 193 Column 2
}))(); // Line 193 Column 2
});
var make_dash_vector = (function(count,val){
return ((function() {var o7972055 = (function(v){
return ((function() {var loop = (function(i){
return (function() {if((i < count)) {return ((function() {vector_dash_put_excl_(v,i,val); // Line 202 Column 2
return vector("__tco_call",(function() {return loop((i + 1)); // Line 202 Column 2
})); // Line 202 Column 2
}))(); // Line 202 Column 2
} else {return v; // Line <unknown undefined> Column <unknown undefined>
}})()
; // Line <unknown undefined> Column <unknown undefined>
});
var o155750 = 0;
return trampoline(loop(o155750)); // Line 202 Column 2
}))(); // Line 202 Column 2
});
var o3898702 = new Array(count);
return o7972055(o3898702); // Line 202 Column 2
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
var o8119925 = cdr(vecs);
var o2383227 = car(vecs);
return trampoline(loop(o8119925,o2383227)); // Line 220 Column 2
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
var o2699933 = 0;
return trampoline(loop(o2699933)); // Line 234 Column 2
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
var o9074672 = 0;
return trampoline(loop(o9074672)); // Line 252 Column 2
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
var o1192047 = 0;
return trampoline(loop(o1192047)); // Line 260 Column 2
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
var o764674 = 0;
var o5225172 = acc;
return trampoline(loop(o764674,o5225172)); // Line 267 Column 2
}))(); // Line 267 Column 2
});
var dict = (function() {
var args = vector_dash__gt_list(Array.prototype.slice.call(arguments));
var res = {};
((function() {var loop = (function(lst){
return (function() {if(not(null_p_(lst))) {return ((function() {var o5894180 = (function(key,val){
dict_dash_put_excl_(res,key,val); // Line 279 Column 4
return vector("__tco_call",(function() {return loop(cddr(lst)); // Line 279 Column 4
})); // Line 279 Column 4
});
var o3911383 = car(lst);
var o61791 = cadr(lst);
return o5894180(o3911383,o61791); // Line 279 Column 4
}))(); // Line 279 Column 4
}})()
; // Line <unknown undefined> Column <unknown undefined>
});
var o1471291 = args;
return trampoline(loop(o1471291)); // Line 279 Column 4
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
return (function() {if(not(null_p_(lst))) {return ((function() {var o2491649 = (function(k){
dict_dash_put_excl_(res,k,func(dict_dash_ref(dct,k))); // Line 295 Column 2
return vector("__tco_call",(function() {return loop(cdr(lst)); // Line 295 Column 2
})); // Line 295 Column 2
});
var o1021267 = car(lst);
return o2491649(o1021267); // Line 295 Column 2
}))(); // Line 295 Column 2
}})()
; // Line <unknown undefined> Column <unknown undefined>
});
var o3356711 = keys(dct);
return trampoline(loop(o3356711)); // Line 295 Column 2
}))(); // Line 295 Column 2
return res; // Line <unknown undefined> Column <unknown undefined>
});
var dict_dash_merge = (function(){
var dcts = vector_dash__gt_list(Array.prototype.slice.call(arguments, 0));
return ((function() {var o6798675 = (function(res){
for_dash_each((function(dct){
return for_dash_each((function(k){
return dict_dash_put_excl_(res,k,dict_dash_ref(dct,k)); // Line 304 Column 2
}),keys(dct)); // Line 304 Column 2
}),dcts); // Line 304 Column 2
return res; // Line <unknown undefined> Column <unknown undefined>
});
var o5252310 = dict();
return o6798675(o5252310); // Line 304 Column 2
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
var o8066228 = keys(dct);
return trampoline(loop(o8066228)); // Line 314 Column 2
}))(); // Line 314 Column 2
return res; // Line <unknown undefined> Column <unknown undefined>
});
var dict_dash__gt_list = (function(dct){
return vector_dash__gt_list(dict_dash__gt_vector(dct)); // Line 323 Column 3
});
var keys = (function(dct){
return ((function() {var o6070761 = (function(res){
for(var k in dct) {
       res = cons(string_dash__gt_key(k), res);
    }return res; // Line <unknown undefined> Column <unknown undefined>
});
var o1742250 = _emptylst;
return o6070761(o1742250); // Line 326 Column 2
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
var o4314837 = keys;
var o1703717 = vals;
return trampoline(loop(o4314837,o1703717)); // Line 338 Column 2
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
var o9795183 = obj1;
var o6976631 = obj2;
return loop(o9795183,o6976631); // Line 358 Column 2
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
var o7390712 = 0;
return trampoline(loop(o7390712)); // Line 358 Column 2
}))(); // Line 358 Column 2
}})()
; // Line <unknown undefined> Column <unknown undefined>
}))(); // Line 358 Column 2
} else {return (function() {if((dict_p_(obj1) && dict_p_(obj2))) {return ((function() {return ((function() {var o3187292 = (function(keys1,keys2){
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
var o8273304 = keys1;
return trampoline(loop(o8273304)); // Line 358 Column 2
}))()); // Line <unknown undefined> Column <unknown undefined>
});
var o4013574 = keys(obj1);
var o5335432 = keys(obj2);
return o3187292(o4013574,o5335432); // Line 358 Column 2
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
return ((function() {var o8795553 = (function(parents){
return (function() {if(list_dash_find(parents,obj)) {return halt; // Line <unknown undefined> Column <unknown undefined>
} else {return func(obj,arg,(function(el,arg){
return _per_recur_dash_protect(el,arg,func,halt,cons(obj,parents)); // Line 433 Column 2
})); // Line 433 Column 2
}})()
; // Line <unknown undefined> Column <unknown undefined>
});
var o6784259 = (function() {if(null_p_(rest)) {return _emptylst; // Line <unknown undefined> Column <unknown undefined>
} else {return car(rest); // Line 433 Column 2
}})()
;
return o8795553(o6784259); // Line 433 Column 2
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
return ((function() {var o2537239 = (function(no_dash_newlines){
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
return (function() {if(list_p_(obj)) {return ((function() {return ((function() {var o4501797 = (function(sp,first){
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
var o8790461 = (_per_space(obj) > 30);
var o3721040 = true;
return o4501797(o8790461,o3721040); // Line 466 Column 2
}))(); // Line 466 Column 2
}))(); // Line 466 Column 2
} else {return (function() {if(vector_p_(obj)) {return ((function() {return ((function() {var o4177047 = (function(sp,first){
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
var o8899630 = (_per_space(obj) > 30);
var o706055 = true;
return o4177047(o8899630,o706055); // Line 466 Column 2
}))(); // Line 466 Column 2
}))(); // Line 466 Column 2
} else {return (function() {if(dict_p_(obj)) {return ((function() {return ((function() {var o175972 = (function(sp,first){
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
var o853722 = (_per_space(obj) > 30);
var o6061220 = true;
return o175972(o853722,o6061220); // Line 466 Column 2
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
var o8736667 = (function() {if(null_p_(rest)) {return false; // Line <unknown undefined> Column <unknown undefined>
} else {return car(rest); // Line 466 Column 2
}})()
;
return o2537239(o8736667); // Line 466 Column 2
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


var fs = require("fs");var ast = require("../ast");var should_dash_return_p_ = (function(form){
return not((ast["list?"](form) && (_eq__eq_(ast["first*"](form),"\uFDD1throw") || _eq__eq_(ast["first*"](form),"\uFDD1set!") || _eq__eq_(ast["first*"](form),"\uFDD1define")))); // Line 5 Column 3
});
var generator = (function() {var code = vector();
var make_dash_fresh = (function() {return generator(); // Line 14 Column 5
});
var write = (function(src){
var eol = vector_dash__gt_list(Array.prototype.slice.call(arguments, 1));
return code["push"]((src + (function() {if(null_p_(eol)) {return ""; // Line <unknown undefined> Column <unknown undefined>
} else {return "\n"; // Line <unknown undefined> Column <unknown undefined>
}})()
)); // Line 17 Column 5
});
var write_dash_runtime = (function(target){
var root = vector_dash__gt_list(Array.prototype.slice.call(arguments, 1));
return ((function() {var o4678910 = (function(root){
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
var o4114233 = (function() {if(null_p_(root)) {return str(__dirname,"/.."); // Line 20 Column 4
} else {return car(root); // Line 20 Column 4
}})()
;
return o4678910(o4114233); // Line 20 Column 4
}))(); // Line 20 Column 4
});
var inline_dash_writer = (function(str){
return ((function() {var o7624326 = (function(first){
return (function() {return (function() {if(first) {first = false;
} else {return write(str); // Line 36 Column 4
}})()
; // Line <unknown undefined> Column <unknown undefined>
}); // Line <unknown undefined> Column <unknown undefined>
});
var o6590961 = true;
return o7624326(o6590961); // Line 36 Column 4
}))(); // Line 36 Column 4
});
var terminate_dash_expr = (function(expr_p_){
var node = vector_dash__gt_list(Array.prototype.slice.call(arguments, 1));
return ((function() {var o8815889 = (function(node){
return (function() {if(not(expr_p_)) {return ((function() {return write(str("; ","// Line ",ast["node-lineno"](node)," Column ",ast["node-colno"](node)),true); // Line 43 Column 4
}))(); // Line 43 Column 4
}})()
; // Line <unknown undefined> Column <unknown undefined>
});
var o5060209 = (function() {if(null_p_(node)) {return false; // Line <unknown undefined> Column <unknown undefined>
} else {return car(node); // Line 43 Column 4
}})()
;
return o8815889(o5060209); // Line 43 Column 4
}))(); // Line 43 Column 4
});
var write_dash_number = (function(obj,expr_p_){
write(obj); // Line 55 Column 5
return terminate_dash_expr(expr_p_); // Line 56 Column 5
});
var write_dash_boolean = (function(obj,expr_p_){
(function() {if(obj) {return write("true"); // Line 60 Column 9
} else {return write("false"); // Line 61 Column 9
}})()
; // Line <unknown undefined> Column <unknown undefined>
return terminate_dash_expr(expr_p_); // Line 62 Column 5
});
var write_dash_empty_dash_list = (function(obj,expr_p_){
write("_emptylst"); // Line 67 Column 5
return terminate_dash_expr(expr_p_); // Line 68 Column 5
});
var write_dash_string = (function(obj,expr_p_){
return ((function() {var o9871078 = (function(str){
str = str["replace"](RegExp("\\\\","g"),"\\\\");
str = str["replace"](RegExp("\n","g"),"\\n");
str = str["replace"](RegExp("\r","g"),"\\r");
str = str["replace"](RegExp("\t","g"),"\\t");
str = str["replace"](RegExp("\"","g"),"\\\"");
write(("\"" + str + "\"")); // Line 71 Column 4
return terminate_dash_expr(expr_p_); // Line 71 Column 4
});
var o4364000 = obj;
return o9871078(o4364000); // Line 71 Column 4
}))(); // Line 71 Column 4
});
var write_dash_symbol = (function(obj,expr_p_){
write(("\"\\uFDD1" + obj["substring"](1) + "\"")); // Line 81 Column 5
return terminate_dash_expr(expr_p_); // Line 82 Column 5
});
var write_dash_key = (function(obj,expr_p_){
write(("\"\\uFDD0" + obj["substring"](1) + "\"")); // Line 85 Column 5
return terminate_dash_expr(expr_p_); // Line 86 Column 5
});
var write_dash_term = (function(node,expr_p_){
return ((function() {var o8995073 = (function(exp,exp){
var name = exp["substring"](1);
var parts = name["split"](".");
((function() {var o3845968 = (function(name){
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
var o8262498 = vector_dash_ref(parts,0);
return o3845968(o8262498); // Line 89 Column 4
}))(); // Line 89 Column 4
vector_dash_for_dash_each((function(part){
return write(str("[\"",part,"\"]")); // Line 89 Column 4
}),vector_dash_slice(parts,1)); // Line 89 Column 4
return terminate_dash_expr(expr_p_); // Line 89 Column 4
});
var o2013660 = ast["node-data"](node);
var o5648022 = (function() {if(_eq__eq_(o2013660,"\uFDD1var")) {return ((function() {return "\uFDD1_var_"; // Line <unknown undefined> Column <unknown undefined>
}))(); // Line 89 Column 4
} else {return (function() {if(_eq__eq_(o2013660,"\uFDD1in")) {return ((function() {return "\uFDD1_in_"; // Line <unknown undefined> Column <unknown undefined>
}))(); // Line 89 Column 4
} else {return ((function() {return o2013660; // Line <unknown undefined> Column <unknown undefined>
}))(); // Line 89 Column 4
}})()
; // Line <unknown undefined> Column <unknown undefined>
}})()
;
return o8995073(o2013660,o5648022); // Line 89 Column 4
}))(); // Line 89 Column 4
});
var write_dash_define = (function(lval,rval,compile){
write("var "); // Line 122 Column 5
return write_dash_set_excl_(lval,rval,compile); // Line 123 Column 5
});
var write_dash_set_excl_ = (function(lval,rval,compile){
write_dash_term(lval,true); // Line 126 Column 5
write(" = "); // Line 127 Column 5
compile(rval,true); // Line 128 Column 5
return write(";",true); // Line 131 Column 5
});
var write_dash_if = (function(cnd,tru,alt,expr_p_,compile){
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
var write_dash_lambda = (function(args,body,expr_p_,compile){
(function() {if(ast["list?"](args)) {return ((function() {var comma = inline_dash_writer(",");
var capture_dash_name = false;
var write_dash_args = (function(args){
return (function() {if(not(null_p_(args))) {return ((function() {var o4141786 = (function(arg){
return (function() {if(_eq__eq_(arg,"\uFDD1.")) {capture_dash_name = cadr(args);
} else {return ((function() {comma(); // Line 156 Column 4
write_dash_term(car(args),true); // Line 156 Column 4
return write_dash_args(cdr(args)); // Line 156 Column 4
}))(); // Line 156 Column 4
}})()
; // Line <unknown undefined> Column <unknown undefined>
});
var o1900552 = ast["node-data"](car(args));
return o4141786(o1900552); // Line 156 Column 4
}))(); // Line 156 Column 4
}})()
; // Line <unknown undefined> Column <unknown undefined>
});
write("(function("); // Line 156 Column 4
write_dash_args(ast["node-data"](args)); // Line 156 Column 4
write("){",true); // Line 156 Column 4
return (function() {if(capture_dash_name) {return ((function() {write("var "); // Line 156 Column 4
write_dash_term(capture_dash_name,true); // Line 156 Column 4
write(" = "); // Line 156 Column 4
write_dash_term(ast["make-atom"]("\uFDD1vector->list",capture_dash_name),true); // Line 156 Column 4
write("(Array.prototype.slice.call(arguments, "); // Line 156 Column 4
write((length(ast["node-data"](args)) - 2)); // Line 156 Column 4
return write("));",true); // Line 156 Column 4
}))(); // Line 156 Column 4
}})()
; // Line <unknown undefined> Column <unknown undefined>
}))(); // Line 156 Column 4
} else {return (function() {if(symbol_p_(ast["node-data"](args))) {return ((function() {write("(function() {",true); // Line 156 Column 4
write("var "); // Line 156 Column 4
write_dash_term(args,true); // Line 156 Column 4
write(" = "); // Line 156 Column 4
write_dash_term(ast["make-atom"]("\uFDD1vector->list",args),true); // Line 156 Column 4
return write("(Array.prototype.slice.call(arguments));",true); // Line 156 Column 4
}))(); // Line 156 Column 4
} else {return (function() {if(null_p_(ast["node-data"](args))) {return ((function() {return write("(function() {"); // Line 156 Column 4
}))(); // Line 156 Column 4
} else {return false; // Line <unknown undefined> Column <unknown undefined>
}})()
; // Line <unknown undefined> Column <unknown undefined>
}})()
; // Line <unknown undefined> Column <unknown undefined>
}})()
; // Line <unknown undefined> Column <unknown undefined>
((function() {var o1695024 = (function(i,len){
return for_dash_each((function(form){
(function() {if((_eq__eq_(i,(len - 1)) && should_dash_return_p_(form))) {return write("return "); // Line 195 Column 4
}})()
; // Line <unknown undefined> Column <unknown undefined>
compile(form); // Line 195 Column 4
i = (i + 1);
}),body); // Line 195 Column 4
});
var o1586449 = 0;
var o6303717 = length(body);
return o1695024(o1586449,o6303717); // Line 195 Column 4
}))(); // Line 195 Column 4
write("})"); // Line 206 Column 5
return terminate_dash_expr(expr_p_); // Line 207 Column 5
});
var write_dash_func_dash_call = (function(func,args,expr_p_,compile){
(function() {if((ast["list?"](func) && _eq__eq_(ast["first*"](func),"\uFDD1lambda"))) {return ((function() {write("("); // Line 214 Column 8
compile(func,true); // Line 214 Column 8
return write(")"); // Line 214 Column 8
}))(); // Line 214 Column 8
} else {return compile(func,true); // Line 220 Column 9
}})()
; // Line <unknown undefined> Column <unknown undefined>
write("("); // Line 223 Column 5
((function() {var o4090939 = (function(comma){
return for_dash_each((function(arg){
comma(); // Line 224 Column 4
return compile(arg,true); // Line 224 Column 4
}),args); // Line 224 Column 4
});
var o2870928 = inline_dash_writer(",");
return o4090939(o2870928); // Line 224 Column 4
}))(); // Line 224 Column 4
write(")"); // Line 229 Column 5
return terminate_dash_expr(expr_p_,func); // Line 231 Column 5
});
var write_dash_raw_dash_code = (function(node){
return write(ast["node-data"](node)); // Line 234 Column 5
});
var write_dash_op = (function(op,vals,expr_p_,compile){
write("("); // Line 237 Column 5
((function() {var o1681173 = (function(op_dash_writer){
return for_dash_each((function(arg){
op_dash_writer(); // Line 238 Column 4
return compile(arg,true); // Line 238 Column 4
}),vals); // Line 238 Column 4
});
var o1854140 = inline_dash_writer(str(" ",op," "));
return o1681173(o1854140); // Line 238 Column 4
}))(); // Line 238 Column 4
write(")"); // Line 244 Column 5
return terminate_dash_expr(expr_p_); // Line 245 Column 5
});
var make_dash_op_dash_writer = (function(str){
return (function(vals,expr_p_,compile){
return write_dash_op(str,vals,expr_p_,compile); // Line 249 Column 7
}); // Line <unknown undefined> Column <unknown undefined>
});
var write_dash_require = (function(args,expr_p_,compile){
return for_dash_each((function(el){
write("var "); // Line 253 Column 17
write_dash_term(ast["first"](el),true); // Line 254 Column 17
write(" = require("); // Line 255 Column 17
write_dash_string(ast["node-data"](cadr(ast["node-data"](el))),true); // Line 256 Column 17
return write(");"); // Line 258 Column 17
}),args); // Line 252 Column 5
});
return dict("\uFDD0write-runtime",write_dash_runtime,"\uFDD0write-number",write_dash_number,"\uFDD0write-string",write_dash_string,"\uFDD0write-boolean",write_dash_boolean,"\uFDD0write-term",write_dash_term,"\uFDD0write-symbol",write_dash_symbol,"\uFDD0write-key",write_dash_key,"\uFDD0write-empty-list",write_dash_empty_dash_list,"\uFDD0write-define",write_dash_define,"\uFDD0write-set!",write_dash_set_excl_,"\uFDD0write-if",write_dash_if,"\uFDD0write-lambda",write_dash_lambda,"\uFDD0write-func-call",write_dash_func_dash_call,"\uFDD0write-raw-code",write_dash_raw_dash_code,"\uFDD0write-require",write_dash_require,"\uFDD0write-and",make_dash_op_dash_writer("&&"),"\uFDD0write-or",make_dash_op_dash_writer("||"),"\uFDD0write-add",make_dash_op_dash_writer("+"),"\uFDD0write-subtract",make_dash_op_dash_writer("-"),"\uFDD0write-multiply",make_dash_op_dash_writer("*"),"\uFDD0write-divide",make_dash_op_dash_writer("/"),"\uFDD0write-gt",make_dash_op_dash_writer(">"),"\uFDD0write-lt",make_dash_op_dash_writer("<"),"\uFDD0write-gteq",make_dash_op_dash_writer(">="),"\uFDD0write-lteq",make_dash_op_dash_writer("<="),"\uFDD0write-mod",make_dash_op_dash_writer("%"),"\uFDD0write-rshift",make_dash_op_dash_writer(">>"),"\uFDD0write-lshift",make_dash_op_dash_writer("<<"),"\uFDD0write-bitwise-or",make_dash_op_dash_writer("|"),"\uFDD0write-bitwise-and",make_dash_op_dash_writer("&"),"\uFDD0make-fresh",make_dash_fresh,"\uFDD0get-code",(function() {return code["join"](""); // Line 295 Column 25
})); // Line 261 Column 2
});
module["exports"] = generator;

