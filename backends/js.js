var util = require("util");var type = (function(obj){
return (function() {if(number_p_(obj)) {return "\uFDD1number"; 
} else {return (function() {if(boolean_p_(obj)) {return "\uFDD1boolean"; 
} else {return (function() {if(string_p_(obj)) {return "\uFDD1string"; 
} else {return (function() {if(null_p_(obj)) {return "\uFDD1null"; 
} else {return (function() {if(list_p_(obj)) {return "\uFDD1list"; 
} else {return (function() {if(vector_p_(obj)) {return "\uFDD1vector"; 
} else {return (function() {if(dict_p_(obj)) {return "\uFDD1dict"; 
} else {return false; 
}})()
; 
}})()
; 
}})()
; 
}})()
; 
}})()
; 
}})()
; 
}})()
; 
});
var number_p_ = (function(obj){
return _eq__eq_(typeof obj,"number"); 
});
var string_p_ = (function(obj){
return (_eq__eq_(typeof obj,"string") && not(_eq__eq_(obj[0],"\uFDD0")) && not(_eq__eq_(obj[0],"\uFDD1"))); 
});
var symbol_p_ = (function(obj){
return ((_eq__eq_(typeof obj,"string") && _eq__eq_(obj[0],"\uFDD1"))); 
});
var key_p_ = (function(obj){
return (_eq__eq_(typeof obj,"string") && _eq__eq_(obj[0],"\uFDD0")); 
});
var boolean_p_ = (function(obj){
return (eq_p_(obj,true) || eq_p_(obj,false)); 
});
var null_p_ = (function(obj){
return (!!obj && not(eq_p_(obj["length"],undefined)) && eq_p_(obj["length"],1) && eq_p_(vector_dash_ref(obj,0),null)); 
});
var list_p_ = (function(obj){
return (!!obj && not(eq_p_(obj["length"],undefined)) && not(eq_p_(obj["list"],undefined))); 
});
var vector_p_ = (function(obj){
return (not(list_p_(obj)) && not(null_p_(obj)) && !!obj && eq_p_(typeof obj,"object") && not(eq_p_(obj["length"],undefined))); 
});
var dict_p_ = (function(obj){
return (not(symbol_p_(obj)) && !!obj && eq_p_(typeof obj,"object") && eq_p_(obj["length"],undefined)); 
});
var function_p_ = (function(obj){
return eq_p_(typeof obj,"function"); 
});
var literal_p_ = (function(x){
return (key_p_(x) || number_p_(x) || string_p_(x) || boolean_p_(x) || null_p_(x)); 
});
var str = (function() {
var args = vector_dash__gt_list(Array.prototype.slice.call(arguments));
return fold((function(el,acc){
return (acc + (function() {if(string_p_(el)) {return el; 
} else {return inspect(el); 
}})()
); 
}),"",args); 
});
var symbol_dash__gt_key = (function(sym){
return ("\uFDD0" + sym["substring"](1)); 
});
var key_dash__gt_symbol = (function(sym){
return ("\uFDD1" + sym["substring"](1)); 
});
var string_dash__gt_key = (function(str){
return ("\uFDD0" + str); 
});
var key_dash__gt_string = (function(key){
return key["substring"](1); 
});
var string_dash__gt_symbol = (function(str){
return ("\uFDD1" + str); 
});
var symbol_dash__gt_string = (function(sym){
return sym["substring"](1); 
});
var _emptylst = [null];
var list = (function() {
var args = vector_dash__gt_list(Array.prototype.slice.call(arguments));
return args; 
});
var cons = (function(obj,lst){
return ((function() {var o1 = (function(res){
res.list = true;return res; 
});
var o2 = [obj, lst];
return o1(o2); 
}))(); 
});
var car = (function(lst){
return lst[0]});
var cdr = (function(lst){
return lst[1]});
var cadr = (function(lst){
return car(cdr(lst)); 
});
var cddr = (function(lst){
return cdr(cdr(lst)); 
});
var cdar = (function(lst){
return cdr(car(lst)); 
});
var caddr = (function(lst){
return car(cdr(cdr(lst))); 
});
var cdddr = (function(lst){
return cdr(cdr(cdr(lst))); 
});
var cadar = (function(lst){
return car(cdr(car(lst))); 
});
var cddar = (function(lst){
return cdr(cdr(car(lst))); 
});
var caadr = (function(lst){
return car(car(cdr(lst))); 
});
var cdadr = (function(lst){
return cdr(car(cdr(lst))); 
});
var list_dash_ref = (function(lst,i){
return ((function() {var loop = (function(lst,i){
return (function() {if(null_p_(lst)) {return false; 
} else {return (function() {if(eq_p_(i,0)) {return car(lst); 
} else {return loop(cdr(lst),(i - 1)); 
}})()
; 
}})()
; 
});
var o3 = lst;
var o4 = i;
return loop(o3,o4); 
}))(); 
});
var length = (function(lst){
return fold((function(el,acc){
return (acc + 1); 
}),0,lst); 
});
var list_dash_append = (function(){
var lsts = vector_dash__gt_list(Array.prototype.slice.call(arguments, 0));
var l_star_ = (function() {if(null_p_(lsts)) {return _emptylst; 
} else {return lsts; 
}})()
;
return (function() {if(null_p_(l_star_)) {return _emptylst; 
} else {return (function() {if(null_p_(cdr(l_star_))) {return car(l_star_); 
} else {return _list_dash_append(car(l_star_),apply(list_dash_append,cdr(l_star_))); 
}})()
; 
}})()
; 
});
var _list_dash_append = (function(lst1,lst2){
return ((function() {var loop = (function(lst){
return (function() {if(null_p_(lst)) {return lst2; 
} else {return cons(car(lst),loop(cdr(lst))); 
}})()
; 
});
var o5 = lst1;
return loop(o5); 
}))(); 
});
var list_dash_find = (function(lst,val){
var rst = vector_dash__gt_list(Array.prototype.slice.call(arguments, 2));
return ((function() {var o6 = (function(access){
return ((function() {var loop = (function(lst){
return (function() {if(null_p_(lst)) {return false; 
} else {return (function() {if(_eq__eq_(access(car(lst)),val)) {return lst; 
} else {return loop(cdr(lst)); 
}})()
; 
}})()
; 
});
var o8 = lst;
return loop(o8); 
}))(); 
});
var o7 = (function() {if(null_p_(rst)) {return (function(x){
return x; 
}); 
} else {return car(rst); 
}})()
;
return o6(o7); 
}))(); 
});
var map = (function(func,lst){
return (function() {if(null_p_(lst)) {return _emptylst; 
} else {return cons(func(car(lst)),map(func,cdr(lst))); 
}})()
; 
});
var for_dash_each = (function(func,lst){
return ((function() {var loop = (function(lst){
return (function() {if(not(null_p_(lst))) {func(car(lst)); 
return loop(cdr(lst)); 
}})()
; 
});
var o9 = lst;
return loop(o9); 
}))(); 
});
var fold = (function(func,acc,lst){
return (function() {if(null_p_(lst)) {return acc; 
} else {return fold(func,func(car(lst),acc),cdr(lst)); 
}})()
; 
});
var reverse = (function(lst){
return (function() {if(null_p_(lst)) {return _emptylst; 
} else {return list_dash_append(reverse(cdr(lst)),list(car(lst))); 
}})()
; 
});
var vector_dash__gt_list = (function(vec){
return ((function() {var loop = (function(i){
return (function() {if((i < vec.length)) {return cons(vector_dash_ref(vec,i),loop((i + 1))); 
} else {return _emptylst}})()
; 
});
var o10 = 0;
return loop(o10); 
}))(); 
});
var make_dash_vector = (function(count){
var val = arguments[1] || false;
return ((function() {var o11 = (function(v){
return (function() {if(val) {return ((function() {var loop = (function(i){
return (function() {if((i < count)) {vector_dash_put_excl_(v,i,val); 
return loop((i + 1)); 
} else {return v; 
}})()
; 
});
var o13 = 0;
return loop(o13); 
}))(); 
} else {return v; 
}})()
; 
});
var o12 = new Array(count);
return o11(o12); 
}))(); 
});
var vector = (function() {return Array.prototype.slice.call(arguments)});
var vector_dash_ref = (function(vec,i){
return vec[i]});
var vector_dash_put_excl_ = (function(vec,i,obj){
return vec[i] = obj});
var vector_dash_concat = (function(){
var vecs = vector_dash__gt_list(Array.prototype.slice.call(arguments, 0));
return ((function() {var loop = (function(lst,res){
return (function() {if(null_p_(lst)) {return res; 
} else {return loop(cdr(lst),res["concat"](car(lst))); 
}})()
; 
});
var o14 = cdr(vecs);
var o15 = car(vecs);
return loop(o14,o15); 
}))(); 
});
var vector_dash_slice = (function(vec,start){
var end = arguments[2] || false;
return vec.slice(start, end || undefined)});
var vector_dash_push_excl_ = (function(vec,obj){
return vec.push(obj)});
var vector_dash_find = (function(vec,val){
return ((function() {var loop = (function(i){
return (function() {if((i < vec.length)) {return (function() {if(eq_p_(vector_dash_ref(vec,i),val)) {return i; 
} else {return loop((i + 1)); 
}})()
; 
} else {return false; 
}})()
; 
});
var o16 = 0;
return loop(o16); 
}))(); 
});
var vector_dash_length = (function(vec){
return vec["length"]; 
});
var list_dash__gt_vector = (function(lst){
var res = [];
for_dash_each((function(el){
return res["push"](el); 
}),lst); 
return res; 
});
var vector_dash_map = (function(func,vec){
var res = [];
((function() {var loop = (function(i){
return (function() {if((i < vec["length"])) {res["push"](func(vector_dash_ref(vec,i))); 
return loop((i + 1)); 
}})()
; 
});
var o17 = 0;
return loop(o17); 
}))(); 
return res; 
});
var vector_dash_for_dash_each = (function(func,vec){
return ((function() {var loop = (function(i){
return (function() {if((i < vec["length"])) {func(vector_dash_ref(vec,i)); 
return loop((i + 1)); 
}})()
; 
});
var o18 = 0;
return loop(o18); 
}))(); 
});
var vector_dash_fold = (function(func,acc,vec){
return ((function() {var loop = (function(i,acc){
return (function() {if((i < vector_dash_length(vec))) {return loop((i + 1),func(vector_dash_ref(vec,i),acc)); 
} else {return acc; 
}})()
; 
});
var o19 = 0;
var o20 = acc;
return loop(o19,o20); 
}))(); 
});
var dict = (function() {
var args = vector_dash__gt_list(Array.prototype.slice.call(arguments));
var res = {};
((function() {var loop = (function(lst){
return (function() {if(not(null_p_(lst))) {return ((function() {var o22 = (function(key,val){
dict_dash_put_excl_(res,key,val); 
return loop(cddr(lst)); 
});
var o23 = car(lst);
var o24 = cadr(lst);
return o22(o23,o24); 
}))(); 
}})()
; 
});
var o21 = args;
return loop(o21); 
}))(); 
return res; 
});
var dict_dash_put_excl_ = (function(dct,k,v){
return dct[k.substring(1)] = v});
var dict_dash_ref = (function(dct,k){
return dct[k.substring(1)]});
var dict_dash_map = (function(func,dct){
var res = dict();
((function() {var loop = (function(lst){
return (function() {if(not(null_p_(lst))) {return ((function() {var o26 = (function(k){
dict_dash_put_excl_(res,k,func(dict_dash_ref(dct,k))); 
return loop(cdr(lst)); 
});
var o27 = car(lst);
return o26(o27); 
}))(); 
}})()
; 
});
var o25 = keys(dct);
return loop(o25); 
}))(); 
return res; 
});
var dict_dash_merge = (function(){
var dcts = vector_dash__gt_list(Array.prototype.slice.call(arguments, 0));
return ((function() {var o28 = (function(res){
for_dash_each((function(dct){
return for_dash_each((function(k){
return dict_dash_put_excl_(res,k,dict_dash_ref(dct,k)); 
}),keys(dct)); 
}),dcts); 
return res; 
});
var o29 = dict();
return o28(o29); 
}))(); 
});
var dict_dash__gt_vector = (function(dct){
var res = vector();
((function() {var loop = (function(lst){
return (function() {if(not(null_p_(lst))) {vector_dash_push_excl_(res,car(lst)); 
vector_dash_push_excl_(res,dict_dash_ref(dct,car(lst))); 
return loop(cdr(lst)); 
}})()
; 
});
var o30 = keys(dct);
return loop(o30); 
}))(); 
return res; 
});
var dict_dash__gt_list = (function(dct){
return vector_dash__gt_list(dict_dash__gt_vector(dct)); 
});
var keys = (function(dct){
return ((function() {var o31 = (function(res){
for(var k in dct) {
       res = cons(string_dash__gt_key(k), res);
    }return res; 
});
var o32 = _emptylst;
return o31(o32); 
}))(); 
});
var vals = (function(dct){
return map((function(k){
return dict_dash_ref(dct,k); 
}),keys(dct)); 
});
var zip = (function(keys,vals){
var res = dict();
((function() {var loop = (function(ks,vs){
return (function() {if(not(null_p_(ks))) {dict_dash_put_excl_(res,car(ks),car(vs)); 
return loop(cdr(ks),cdr(vs)); 
}})()
; 
});
var o33 = keys;
var o34 = vals;
return loop(o33,o34); 
}))(); 
return res; 
});
var not = (function(obj){
return (typeof obj !== 'number' && !obj); 
});
var _eq__eq_ = (function(obj1,obj2){
return obj1 === obj2});
var _eq_ = (function(obj1,obj2){
return (function() {if((list_p_(obj1) && list_p_(obj2))) {return ((function() {var loop = (function(lst1,lst2){
var n1 = null_p_(lst1);
var n2 = null_p_(lst2);
return (function() {if((n1 && n2)) {return true; 
} else {return (function() {if((n1 || n2)) {return false; 
} else {return (function() {if(equal_p_(car(lst1),car(lst2))) {return loop(cdr(lst1),cdr(lst2)); 
} else {return false; 
}})()
; 
}})()
; 
}})()
; 
});
var o35 = obj1;
var o36 = obj2;
return loop(o35,o36); 
}))(); 
} else {return (function() {if((vector_p_(obj1) && vector_p_(obj2))) {return (function() {if(not(_eq_(obj1["length"],obj2["length"]))) {return false; 
} else {return ((function() {var loop = (function(i){
return (function() {if((i < obj1["length"])) {return (function() {if(_eq_(vector_dash_ref(obj1,i),vector_dash_ref(obj2,i))) {return loop((i + 1)); 
} else {return false; 
}})()
; 
} else {return true; 
}})()
; 
});
var o37 = 0;
return loop(o37); 
}))(); 
}})()
; 
} else {return (function() {if((dict_p_(obj1) && dict_p_(obj2))) {return ((function() {var o38 = (function(keys1,keys2){
return (eq_p_(length(keys1),length(keys2)) && ((function() {var loop = (function(lst){
return (function() {if(null_p_(lst)) {return true; 
} else {return (function() {if(equal_p_(dict_dash_ref(obj1,car(lst)),dict_dash_ref(obj2,car(lst)))) {return loop(cdr(lst)); 
} else {return false; 
}})()
; 
}})()
; 
});
var o41 = keys1;
return loop(o41); 
}))()); 
});
var o39 = keys(obj1);
var o40 = keys(obj2);
return o38(o39,o40); 
}))(); 
} else {return eq_p_(obj1,obj2); 
}})()
; 
}})()
; 
}})()
; 
});
var eq_p_ = _eq__eq_;
var equal_p_ = _eq_;
var print = (function(msg){
return util["print"](msg); 
});
var println = (function(msg){
return util["puts"](msg); 
});
var pp = (function(obj){
return println(inspect(obj)); 
});
var _per_inspect_dash_non_dash_sequence = (function(obj){
return (function() {if(number_p_(obj)) {return ("" + obj); 
} else {return (function() {if(string_p_(obj)) {obj = obj["replace"](RegExp("\\\\","g"),"\\\\");
obj = obj["replace"](RegExp("\n","g"),"\\n");
obj = obj["replace"](RegExp("\r","g"),"\\r");
obj = obj["replace"](RegExp("\t","g"),"\\t");
obj = obj["replace"](RegExp("\"","g"),"\\\"");
return ("\"" + obj + "\""); 
} else {return (function() {if(key_p_(obj)) {return (":" + symbol_dash__gt_string(obj)); 
} else {return (function() {if(symbol_p_(obj)) {return symbol_dash__gt_string(obj); 
} else {return (function() {if(boolean_p_(obj)) {return (function() {if(obj) {return "#t"; 
} else {return "#f"; 
}})()
; 
} else {return (function() {if(null_p_(obj)) {return "()"; 
} else {return (function() {if(function_p_(obj)) {return "<function>"; 
} else {return ("<unknown " + obj + ">"); 
}})()
; 
}})()
; 
}})()
; 
}})()
; 
}})()
; 
}})()
; 
}})()
; 
});
var _per_recur_dash_protect = (function(obj,arg,func,halt){
var rest = vector_dash__gt_list(Array.prototype.slice.call(arguments, 4));
return ((function() {var o42 = (function(parents){
return (function() {if(list_dash_find(parents,obj)) {return halt; 
} else {return func(obj,arg,(function(el,arg){
return _per_recur_dash_protect(el,arg,func,halt,cons(obj,parents)); 
})); 
}})()
; 
});
var o43 = (function() {if(null_p_(rest)) {return _emptylst; 
} else {return car(rest); 
}})()
;
return o42(o43); 
}))(); 
});
var _per_space = (function(obj){
return _per_recur_dash_protect(obj,false,(function(obj,arg,recur){
return (function() {if(list_p_(obj)) {return (length(obj) + 1 + fold((function(el,acc){
return (acc + recur(el,false)); 
}),0,obj)); 
} else {return (function() {if(dict_p_(obj)) {return recur(dict_dash__gt_list(obj),false); 
} else {return (function() {if(vector_p_(obj)) {return recur(vector_dash__gt_list(obj),false); 
} else {return vector_dash_length(_per_inspect_dash_non_dash_sequence(obj)); 
}})()
; 
}})()
; 
}})()
; 
}),vector_dash_length("<circular>")); 
});
var inspect = (function(obj){
var rest = vector_dash__gt_list(Array.prototype.slice.call(arguments, 1));
return ((function() {var o44 = (function(no_dash_newlines){
return _per_recur_dash_protect(obj,1,(function(obj,i,recur){
var buffer = "";
var get_dash_buffer = (function() {return buffer; 
});
var disp = (function(s){
buffer = (buffer + s);
});
var pad = (function(n){
return vector_dash_for_dash_each((function(_){
return disp(" "); 
}),make_dash_vector(n)); 
});
return (function() {if(list_p_(obj)) {return ((function() {var o46 = (function(sp,first){
disp("("); 
for_dash_each((function(el){
(function() {if(not(first)) {return (function() {if((sp && not(no_dash_newlines))) {disp("\n"); 
return pad(i); 
} else {return disp(" "); 
}})()
; 
}})()
; 
disp(recur(el,(i + 1))); 
first = false;
}),obj); 
disp(")"); 
return get_dash_buffer(); 
});
var o47 = (_per_space(obj) > 30);
var o48 = true;
return o46(o47,o48); 
}))(); 
} else {return (function() {if(vector_p_(obj)) {return ((function() {var o49 = (function(sp,first){
disp("["); 
vector_dash_for_dash_each((function(el){
(function() {if(not(first)) {return (function() {if((sp && not(no_dash_newlines))) {disp("\n"); 
return pad(i); 
} else {return disp(" "); 
}})()
; 
}})()
; 
disp(recur(el,(i + 1))); 
first = false;
}),obj); 
disp("]"); 
return get_dash_buffer(); 
});
var o50 = (_per_space(obj) > 30);
var o51 = true;
return o49(o50,o51); 
}))(); 
} else {return (function() {if(dict_p_(obj)) {return ((function() {var o52 = (function(sp,first){
disp("{"); 
for_dash_each((function(k){
(function() {if(not(first)) {return (function() {if((sp && not(no_dash_newlines))) {disp("\n"); 
return pad(i); 
} else {return disp(" "); 
}})()
; 
}})()
; 
disp(recur(k,i)); 
disp(" "); 
disp(recur(dict_dash_ref(obj,k),(i + 3 + vector_dash_length(symbol_dash__gt_string(k))))); 
first = false;
}),keys(obj)); 
disp("}"); 
return get_dash_buffer(); 
});
var o53 = (_per_space(obj) > 30);
var o54 = true;
return o52(o53,o54); 
}))(); 
} else {return _per_inspect_dash_non_dash_sequence(obj); 
}})()
; 
}})()
; 
}})()
; 
}),"<circular>"); 
});
var o45 = (function() {if(null_p_(rest)) {return false; 
} else {return car(rest); 
}})()
;
return o44(o45); 
}))(); 
});
var apply = (function(func,args){
return func.apply(null,list_dash__gt_vector(args)); 
});
var trampoline_dash_result_p_ = (function(value){
return (vector_p_(value) && _eq_(vector_dash_ref(value,0),"__tco_call")); 
});
var trampoline = (function(value){
while(trampoline_dash_result_p_(value)) { value = value[1](); }return value; 
});
var _per_gensym_dash_base = 0;
var gensym_dash_fresh = (function() {_per_gensym_dash_base = 10000;
});
var gensym = (function() {_per_gensym_dash_base = (_per_gensym_dash_base + 1);
return string_dash__gt_symbol(("o" + _per_gensym_dash_base)); 
});
var _per_breakpoints_dash_flag = true;
var breakpoint = (function(thunk_dash_msg){
_per_next_dash_thunk = thunk_dash_msg;
return debugger_dash_step(vector_dash_ref(thunk_dash_msg,1)); 
});
var debugger_dash_step_p_ = false;
var start_dash_stepping = (function() {debugger_dash_step_p_ = true;
});
var stop_dash_stepping = (function() {debugger_dash_step_p_ = false;
});
var debugger_dash_stepping_p_ = (function() {return not(_eq__eq_(_per_next_dash_thunk,false)); 
});
var enable_dash_breakpoints = (function() {_per_breakpoints_dash_flag = true;
});
var disable_dash_breakpoints = (function() {_per_breakpoints_dash_flag = false;
});
var debugger_dash_continue = (function() {return ((function() {var o55 = (function(thunk){
_per_next_dash_thunk = false;
return cps_dash_trampoline(thunk); 
});
var o56 = vector_dash_ref(_per_next_dash_thunk,2)();
return o55(o56); 
}))(); 
});
var _per_next_dash_thunk = false;
var cps_dash_trampoline = (function(thunk_msg){
while(thunk_msg) {
     if(_per_breakpoints_dash_flag && (thunk_msg[0] || debugger_dash_step_p_)) {
       breakpoint(thunk_msg);
       break;
     }
     thunk_msg = thunk_msg[2](); }return false; 
});
var cps_dash_jump = (function(breakpoint,msg,to){
return vector(breakpoint,msg,to); 
});
var cps_dash_halt = (function(v){
return list(list("\uFDD1lambda",_emptylst,v,false)); 
});


var fs = require("fs");var ast = require("../ast");var should_dash_return_p_ = (function(form){
return not((ast["list?"](form) && (_eq__eq_(ast["first*"](form),"\uFDD1throw") || _eq__eq_(ast["first*"](form),"\uFDD1set!") || _eq__eq_(ast["first*"](form),"\uFDD1define") || _eq__eq_(ast["first*"](form),"\uFDD1begin")))); 
});
var generator = (function(){
var optimizations = arguments[0] || false;
var code = vector();
(function() {if(not(optimizations)) {optimizations = 0;
}})()
; 
var make_dash_fresh = (function() {return generator(); 
});
var write = (function(src){
var eol = vector_dash__gt_list(Array.prototype.slice.call(arguments, 1));
return code["push"]((src + (function() {if(null_p_(eol)) {return ""; 
} else {return "\n"; 
}})()
)); 
});
var write_dash_runtime = (function(target){
var root = vector_dash__gt_list(Array.prototype.slice.call(arguments, 1));
return ((function() {var o1 = (function(root){
return (function() {if(not(equal_p_(target,"no-runtime"))) {(function() {if(not(equal_p_(target,"js-onlyeval"))) {return write(fs["readFileSync"](str(root,"/runtime.js"),"utf-8"),true); 
}})()
; 
return (function() {if(not(equal_p_(target,"js-noeval"))) {write(str("var __compiler = require('",root,"/compiler');"),true); 
write(str("var __generator = require('",root,"/backends/js');"),true); 
return write("var read = __compiler.read;",true); 
}})()
; 
}})()
; 
});
var o2 = (function() {if(null_p_(root)) {return str(__dirname,"/.."); 
} else {return car(root); 
}})()
;
return o1(o2); 
}))(); 
});
var inline_dash_writer = (function(str){
return ((function() {var o3 = (function(first){
return (function() {return (function() {if(first) {first = false;
} else {return write(str); 
}})()
; 
}); 
});
var o4 = true;
return o3(o4); 
}))(); 
});
var terminate_dash_expr = (function(expr_p_){
var node = vector_dash__gt_list(Array.prototype.slice.call(arguments, 1));
return ((function() {var o5 = (function(node){
return (function() {if(not(expr_p_)) {return write(str("; ","// Line ",ast["node-lineno"](node)," Column ",ast["node-colno"](node)),true); 
}})()
; 
});
var o6 = (function() {if(null_p_(node)) {return false; 
} else {return car(node); 
}})()
;
return o5(o6); 
}))(); 
});
var write_dash_number = (function(obj,expr_p_){
write(obj); 
return terminate_dash_expr(expr_p_); 
});
var write_dash_boolean = (function(obj,expr_p_){
(function() {if(obj) {return write("true"); 
} else {return write("false"); 
}})()
; 
return terminate_dash_expr(expr_p_); 
});
var write_dash_empty_dash_list = (function(obj,expr_p_){
write("_emptylst"); 
return terminate_dash_expr(expr_p_); 
});
var write_dash_string = (function(obj,expr_p_){
return ((function() {var o7 = (function(str){
str = str["replace"](RegExp("\\\\","g"),"\\\\");
str = str["replace"](RegExp("\n","g"),"\\n");
str = str["replace"](RegExp("\r","g"),"\\r");
str = str["replace"](RegExp("\t","g"),"\\t");
str = str["replace"](RegExp("\"","g"),"\\\"");
write(("\"" + str + "\"")); 
return terminate_dash_expr(expr_p_); 
});
var o8 = obj;
return o7(o8); 
}))(); 
});
var write_dash_symbol = (function(obj,expr_p_){
write(("\"\\uFDD1" + obj["substring"](1) + "\"")); 
return terminate_dash_expr(expr_p_); 
});
var write_dash_key = (function(obj,expr_p_){
write(("\"\\uFDD0" + obj["substring"](1) + "\"")); 
return terminate_dash_expr(expr_p_); 
});
var write_dash_term = (function(node,expr_p_){
return ((function() {var o9 = (function(exp,exp){
var name = exp["substring"](1);
var parts = name["split"](".");
((function() {var o12 = (function(name){
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
return write(name); 
});
var o13 = vector_dash_ref(parts,0);
return o12(o13); 
}))(); 
vector_dash_for_dash_each((function(part){
return write(str("[\"",part,"\"]")); 
}),vector_dash_slice(parts,1)); 
return terminate_dash_expr(expr_p_); 
});
var o10 = ast["node-data"](node);
var o11 = (function() {if(_eq__eq_(o10,"\uFDD1var")) {return "\uFDD1_var_"; 
} else {return (function() {if(_eq__eq_(o10,"\uFDD1in")) {return "\uFDD1_in_"; 
} else {return o10; 
}})()
; 
}})()
;
return o9(o10,o11); 
}))(); 
});
var write_dash_define = (function(lval,rval,compile){
write("var "); 
return write_dash_set_excl_(lval,rval,compile); 
});
var write_dash_set_excl_ = (function(lval,rval,compile){
write_dash_term(lval,true); 
write(" = "); 
compile(rval,true); 
return write(";",true); 
});
var write_dash_if = (function(cnd,tru,alt,expr_p_,compile){
write("(function() {"); 
write("if("); 
compile(cnd,true); 
write(") {"); 
(function() {if(should_dash_return_p_(tru)) {return write("return "); 
}})()
; 
compile(tru); 
write("}"); 
(function() {if(alt) {write(" else {"); 
(function() {if(should_dash_return_p_(alt)) {return write("return "); 
}})()
; 
compile(alt); 
return write("}"); 
}})()
; 
write("})()",true); 
return terminate_dash_expr(expr_p_); 
});
var write_dash_lambda = (function(node,expr_p_,compile){
var name = car(ast["node-data"](node));
var args = cadr(ast["node-data"](node));
var body = cddr(ast["node-data"](node));
(function() {if(ast["list?"](args)) {var comma = inline_dash_writer(",");
var capture_dash_name = false;
var opt_dash_args = false;
var arg_dash_min = length(ast["node-data"](args));
var arg_dash_max = arg_dash_min;
var write_dash_args = (function(args,i){
return (function() {if(not(null_p_(args))) {return ((function() {var o14 = (function(arg){
return (function() {if(_eq__eq_(arg,"\uFDD1.")) {capture_dash_name = cadr(args);
arg_dash_min = i;
arg_dash_max = false;
} else {return (function() {if(_eq__eq_(arg,"\uFDD1&")) {opt_dash_args = cdr(args);
arg_dash_min = i;
arg_dash_max = (arg_dash_max - 1);
} else {comma(); 
write_dash_term(car(args),true); 
return write_dash_args(cdr(args),(i + 1)); 
}})()
; 
}})()
; 
});
var o15 = ast["node-data"](car(args));
return o14(o15); 
}))(); 
}})()
; 
});
write("(function("); 
write_dash_args(ast["node-data"](args),0); 
write("){",true); 
(function() {if((optimizations < 1)) {write(str("if(arguments.length < ",arg_dash_min,") {"),true); 
write(str("throw Error(\"",(ast["node-extra"](name) || "lambda"),": not enough arguments\")"),true); 
write("}",true); 
return (function() {if(arg_dash_max) {write(str("else if(arguments.length > ",arg_dash_max,") {"),true); 
write(str("throw Error(\"",(ast["node-extra"](name) || "lambda"),": too many arguments\");"),true); 
return write("}",true); 
}})()
; 
}})()
; 
return (function() {if(capture_dash_name) {write("var "); 
write_dash_term(capture_dash_name,true); 
write(" = "); 
write_dash_term(ast["make-atom"]("\uFDD1vector->list",capture_dash_name),true); 
return write(str("(Array.prototype.slice.call(arguments, ",arg_dash_min,"));"),true); 
} else {return (function() {if(opt_dash_args) {return fold((function(arg,i){
write("var "); 
write_dash_term(arg,true); 
write(str(" = arguments[",i,"] || false;"),true); 
return (i + 1); 
}),arg_dash_min,opt_dash_args); 
} else {return false; 
}})()
; 
}})()
; 
} else {return (function() {if(symbol_p_(ast["node-data"](args))) {write("(function() {",true); 
write("var "); 
write_dash_term(args,true); 
write(" = "); 
write_dash_term(ast["make-atom"]("\uFDD1vector->list",args),true); 
return write("(Array.prototype.slice.call(arguments));",true); 
} else {return (function() {if(null_p_(ast["node-data"](args))) {return write("(function() {"); 
} else {return false; 
}})()
; 
}})()
; 
}})()
; 
write_dash_statements(body,compile); 
write("})"); 
return terminate_dash_expr(expr_p_); 
});
var write_dash_statements = (function(expr_star_,compile){
return ((function() {var o16 = (function(i,len){
return for_dash_each((function(form){
(function() {if((_eq__eq_(i,(len - 1)) && should_dash_return_p_(form))) {return write("return "); 
}})()
; 
compile(form); 
i = (i + 1);
}),expr_star_); 
});
var o17 = 0;
var o18 = length(expr_star_);
return o16(o17,o18); 
}))(); 
});
var write_dash_func_dash_call = (function(func,args,expr_p_,compile){
(function() {if((ast["list?"](func) && _eq__eq_(ast["first*"](func),"\uFDD1lambda"))) {write("("); 
compile(func,true); 
return write(")"); 
} else {return compile(func,true); 
}})()
; 
write("("); 
((function() {var o19 = (function(comma){
return for_dash_each((function(arg){
comma(); 
return compile(arg,true); 
}),args); 
});
var o20 = inline_dash_writer(",");
return o19(o20); 
}))(); 
write(")"); 
return terminate_dash_expr(expr_p_,func); 
});
var write_dash_raw_dash_code = (function(node){
return write(ast["node-data"](node)); 
});
var write_dash_op = (function(op,vals,expr_p_,compile){
write("("); 
((function() {var o21 = (function(op_dash_writer){
return for_dash_each((function(arg){
op_dash_writer(); 
return compile(arg,true); 
}),vals); 
});
var o22 = inline_dash_writer(str(" ",op," "));
return o21(o22); 
}))(); 
write(")"); 
return terminate_dash_expr(expr_p_); 
});
var make_dash_op_dash_writer = (function(str){
return (function(vals,expr_p_,compile){
return write_dash_op(str,vals,expr_p_,compile); 
}); 
});
var write_dash_require = (function(args,expr_p_,compile){
return for_dash_each((function(el){
write("var "); 
write_dash_term(ast["first"](el),true); 
write(" = require("); 
write_dash_string(ast["node-data"](cadr(ast["node-data"](el))),true); 
return write(");"); 
}),args); 
});
return dict("\uFDD0write-runtime",write_dash_runtime,"\uFDD0write-number",write_dash_number,"\uFDD0write-string",write_dash_string,"\uFDD0write-boolean",write_dash_boolean,"\uFDD0write-term",write_dash_term,"\uFDD0write-symbol",write_dash_symbol,"\uFDD0write-key",write_dash_key,"\uFDD0write-empty-list",write_dash_empty_dash_list,"\uFDD0write-define",write_dash_define,"\uFDD0write-set!",write_dash_set_excl_,"\uFDD0write-if",write_dash_if,"\uFDD0write-lambda",write_dash_lambda,"\uFDD0write-statements",write_dash_statements,"\uFDD0write-func-call",write_dash_func_dash_call,"\uFDD0write-raw-code",write_dash_raw_dash_code,"\uFDD0write-require",write_dash_require,"\uFDD0write-and",make_dash_op_dash_writer("&&"),"\uFDD0write-or",make_dash_op_dash_writer("||"),"\uFDD0write-add",make_dash_op_dash_writer("+"),"\uFDD0write-subtract",make_dash_op_dash_writer("-"),"\uFDD0write-multiply",make_dash_op_dash_writer("*"),"\uFDD0write-divide",make_dash_op_dash_writer("/"),"\uFDD0write-gt",make_dash_op_dash_writer(">"),"\uFDD0write-lt",make_dash_op_dash_writer("<"),"\uFDD0write-gteq",make_dash_op_dash_writer(">="),"\uFDD0write-lteq",make_dash_op_dash_writer("<="),"\uFDD0write-mod",make_dash_op_dash_writer("%"),"\uFDD0write-rshift",make_dash_op_dash_writer(">>"),"\uFDD0write-lshift",make_dash_op_dash_writer("<<"),"\uFDD0write-bitwise-or",make_dash_op_dash_writer("|"),"\uFDD0write-bitwise-and",make_dash_op_dash_writer("&"),"\uFDD0make-fresh",make_dash_fresh,"\uFDD0get-code",(function() {return code["join"](""); 
})); 
});
module["exports"] = generator;

