var util = require("util");var type = (function(obj){
return (function() {if(number_p_(obj)) {return ((function() {return "\uFDD1number";
}))();
} else {return (function() {if(boolean_p_(obj)) {return ((function() {return "\uFDD1boolean";
}))();
} else {return (function() {if(string_p_(obj)) {return ((function() {return "\uFDD1string";
}))();
} else {return (function() {if(null_p_(obj)) {return ((function() {return "\uFDD1null";
}))();
} else {return (function() {if(list_p_(obj)) {return ((function() {return "\uFDD1list";
}))();
} else {return (function() {if(vector_p_(obj)) {return ((function() {return "\uFDD1vector";
}))();
} else {return (function() {if(dict_p_(obj)) {return ((function() {return "\uFDD1dict";
}))();
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
return (function() {if(null_p_(lst)) {return ((function() {return false;
}))();
} else {return (function() {if(eq_p_(i,0)) {return ((function() {return car(lst);
}))();
} else {return ((function() {return loop(cdr(lst),(i - 1));
}))();
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
} else {return vector("__tco_call",(function() {return loop(cdr(lst));
}));
}})()
;
}})()
;
});
var o8 = lst;
return trampoline(loop(o8));
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
return (function() {if(not(null_p_(lst))) {return ((function() {func(car(lst));
return vector("__tco_call",(function() {return loop(cdr(lst));
}));
}))();
} else {return false;
}})()
;
});
var o9 = lst;
return trampoline(loop(o9));
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
var make_dash_vector = (function(count,val){
return ((function() {var o11 = (function(v){
return ((function() {var loop = (function(i){
return (function() {if((i < count)) {return ((function() {vector_dash_put_excl_(v,i,val);
return vector("__tco_call",(function() {return loop((i + 1));
}));
}))();
} else {return v;
}})()
;
});
var o13 = 0;
return trampoline(loop(o13));
}))();
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
} else {return vector("__tco_call",(function() {return loop(cdr(lst),res["concat"](car(lst)));
}));
}})()
;
});
var o14 = cdr(vecs);
var o15 = car(vecs);
return trampoline(loop(o14,o15));
}))();
});
var vector_dash_slice = (function(vec,start,end){
return vec.slice(start, end)});
var vector_dash_push_excl_ = (function(vec,obj){
return vec.push(obj)});
var vector_dash_find = (function(vec,val){
return ((function() {var loop = (function(i){
return (function() {if((i < vec.length)) {return (function() {if(eq_p_(vector_dash_ref(vec,i),val)) {return i;
} else {return vector("__tco_call",(function() {return loop((i + 1));
}));
}})()
;
} else {return false;
}})()
;
});
var o16 = 0;
return trampoline(loop(o16));
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
return (function() {if((i < vec["length"])) {return ((function() {res["push"](func(vector_dash_ref(vec,i)));
return vector("__tco_call",(function() {return loop((i + 1));
}));
}))();
} else {return false;
}})()
;
});
var o17 = 0;
return trampoline(loop(o17));
}))();
return res;
});
var vector_dash_for_dash_each = (function(func,vec){
return ((function() {var loop = (function(i){
return (function() {if((i < vec["length"])) {return ((function() {func(vector_dash_ref(vec,i));
return vector("__tco_call",(function() {return loop((i + 1));
}));
}))();
} else {return false;
}})()
;
});
var o18 = 0;
return trampoline(loop(o18));
}))();
});
var vector_dash_fold = (function(func,acc,vec){
return ((function() {var loop = (function(i,acc){
return (function() {if((i < vector_dash_length(vec))) {return vector("__tco_call",(function() {return loop((i + 1),func(vector_dash_ref(vec,i),acc));
}));
} else {return acc;
}})()
;
});
var o19 = 0;
var o20 = acc;
return trampoline(loop(o19,o20));
}))();
});
var dict = (function() {
var args = vector_dash__gt_list(Array.prototype.slice.call(arguments));
var res = {};
((function() {var loop = (function(lst){
return (function() {if(not(null_p_(lst))) {return ((function() {var o22 = (function(key,val){
dict_dash_put_excl_(res,key,val);
return vector("__tco_call",(function() {return loop(cddr(lst));
}));
});
var o23 = car(lst);
var o24 = cadr(lst);
return o22(o23,o24);
}))();
} else {return false;
}})()
;
});
var o21 = args;
return trampoline(loop(o21));
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
return vector("__tco_call",(function() {return loop(cdr(lst));
}));
});
var o27 = car(lst);
return o26(o27);
}))();
} else {return false;
}})()
;
});
var o25 = keys(dct);
return trampoline(loop(o25));
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
return (function() {if(not(null_p_(lst))) {return ((function() {vector_dash_push_excl_(res,car(lst));
vector_dash_push_excl_(res,dict_dash_ref(dct,car(lst)));
return vector("__tco_call",(function() {return loop(cdr(lst));
}));
}))();
} else {return false;
}})()
;
});
var o30 = keys(dct);
return trampoline(loop(o30));
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
return (function() {if(not(null_p_(ks))) {return ((function() {dict_dash_put_excl_(res,car(ks),car(vs));
return vector("__tco_call",(function() {return loop(cdr(ks),cdr(vs));
}));
}))();
} else {return false;
}})()
;
});
var o33 = keys;
var o34 = vals;
return trampoline(loop(o33,o34));
}))();
return res;
});
var not = (function(obj){
return (typeof obj !== 'number' && !obj);
});
var _eq__eq_ = (function(obj1,obj2){
return obj1 === obj2});
var _eq_ = (function(obj1,obj2){
return (function() {if((list_p_(obj1) && list_p_(obj2))) {return ((function() {return ((function() {var loop = (function(lst1,lst2){
var n1 = null_p_(lst1);
var n2 = null_p_(lst2);
return (function() {if((n1 && n2)) {return ((function() {return true;
}))();
} else {return (function() {if((n1 || n2)) {return ((function() {return false;
}))();
} else {return ((function() {return (function() {if(equal_p_(car(lst1),car(lst2))) {return loop(cdr(lst1),cdr(lst2));
} else {return false;
}})()
;
}))();
}})()
;
}})()
;
});
var o35 = obj1;
var o36 = obj2;
return loop(o35,o36);
}))();
}))();
} else {return (function() {if((vector_p_(obj1) && vector_p_(obj2))) {return ((function() {return (function() {if(not(_eq_(obj1["length"],obj2["length"]))) {return false;
} else {return ((function() {var loop = (function(i){
return (function() {if((i < obj1["length"])) {return (function() {if(_eq_(vector_dash_ref(obj1,i),vector_dash_ref(obj2,i))) {return vector("__tco_call",(function() {return loop((i + 1));
}));
} else {return false;
}})()
;
} else {return true;
}})()
;
});
var o37 = 0;
return trampoline(loop(o37));
}))();
}})()
;
}))();
} else {return (function() {if((dict_p_(obj1) && dict_p_(obj2))) {return ((function() {return ((function() {var o38 = (function(keys1,keys2){
return (eq_p_(length(keys1),length(keys2)) && ((function() {var loop = (function(lst){
return (function() {if(null_p_(lst)) {return true;
} else {return (function() {if(equal_p_(dict_dash_ref(obj1,car(lst)),dict_dash_ref(obj2,car(lst)))) {return vector("__tco_call",(function() {return loop(cdr(lst));
}));
} else {return false;
}})()
;
}})()
;
});
var o41 = keys1;
return trampoline(loop(o41));
}))());
});
var o39 = keys(obj1);
var o40 = keys(obj2);
return o38(o39,o40);
}))();
}))();
} else {return ((function() {return eq_p_(obj1,obj2);
}))();
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
return (function() {if(number_p_(obj)) {return ((function() {return ("" + obj);
}))();
} else {return (function() {if(string_p_(obj)) {return ((function() {obj = obj["replace"](RegExp("\\\\","g"),"\\\\");
obj = obj["replace"](RegExp("\n","g"),"\\n");
obj = obj["replace"](RegExp("\r","g"),"\\r");
obj = obj["replace"](RegExp("\t","g"),"\\t");
obj = obj["replace"](RegExp("\"","g"),"\\\"");
return ("\"" + obj + "\"");
}))();
} else {return (function() {if(key_p_(obj)) {return ((function() {return (":" + symbol_dash__gt_string(obj));
}))();
} else {return (function() {if(symbol_p_(obj)) {return ((function() {return symbol_dash__gt_string(obj);
}))();
} else {return (function() {if(boolean_p_(obj)) {return ((function() {return (function() {if(obj) {return "#t";
} else {return "#f";
}})()
;
}))();
} else {return (function() {if(null_p_(obj)) {return ((function() {return "()";
}))();
} else {return (function() {if(function_p_(obj)) {return ((function() {return "<function>";
}))();
} else {return ((function() {return ("<unknown " + obj + ">");
}))();
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
return (function() {if(list_p_(obj)) {return ((function() {return (length(obj) + 1 + fold((function(el,acc){
return (acc + recur(el,false));
}),0,obj));
}))();
} else {return (function() {if(dict_p_(obj)) {return ((function() {return recur(dict_dash__gt_list(obj),false);
}))();
} else {return (function() {if(vector_p_(obj)) {return ((function() {return recur(vector_dash__gt_list(obj),false);
}))();
} else {return ((function() {return vector_dash_length(_per_inspect_dash_non_dash_sequence(obj));
}))();
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
return (function() {if(list_p_(obj)) {return ((function() {return ((function() {var o46 = (function(sp,first){
disp("(");
for_dash_each((function(el){
(function() {if(not(first)) {return (function() {if((sp && not(no_dash_newlines))) {return ((function() {disp("\n");
return pad(i);
}))();
} else {return disp(" ");
}})()
;
} else {return false;
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
}))();
} else {return (function() {if(vector_p_(obj)) {return ((function() {return ((function() {var o49 = (function(sp,first){
disp("[");
vector_dash_for_dash_each((function(el){
(function() {if(not(first)) {return (function() {if((sp && not(no_dash_newlines))) {return ((function() {disp("\n");
return pad(i);
}))();
} else {return disp(" ");
}})()
;
} else {return false;
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
}))();
} else {return (function() {if(dict_p_(obj)) {return ((function() {return ((function() {var o52 = (function(sp,first){
disp("{");
for_dash_each((function(k){
(function() {if(not(first)) {return (function() {if((sp && not(no_dash_newlines))) {return ((function() {disp("\n");
return pad(i);
}))();
} else {return disp(" ");
}})()
;
} else {return false;
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
}))();
} else {return ((function() {return _per_inspect_dash_non_dash_sequence(obj);
}))();
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
var gensym = (function() {return string_dash__gt_symbol(("o" + Math["floor"]((Math["random"]() * 10000000))));
});


var reader = require("./reader");var ast = require("./ast");var js = require("./backends/js");var fs = require("fs");var self_dash_evaluating_p_ = (function(exp){
return (number_p_(exp) || string_p_(exp) || boolean_p_(exp) || null_p_(exp) || key_p_(exp));
});
var alternating_dash_map = (function(func,lst){
var former_p_ = vector_dash__gt_list(Array.prototype.slice.call(arguments, 2));
return ((function() {var loop = (function(lst,acc){
return (function() {if((null_p_(lst) || null_p_(cdr(lst)))) {return acc;
} else {return vector("__tco_call",(function() {return loop(cddr(lst),cons((function() {if(not(null_p_(former_p_))) {return func(car(lst));
} else {return car(lst);
}})()
,cons((function() {if(null_p_(former_p_)) {return func(cadr(lst));
} else {return cadr(lst);
}})()
,acc)));
}));
}})()
;
});
var o1 = lst;
var o2 = _emptylst;
return trampoline(loop(o1,o2));
}))();
});
var opt = (function(arg,def){
return (function() {if(null_p_(arg)) {return def;
} else {return car(arg);
}})()
;
});
var assert = (function(cnd,msg){
return (function() {if(not(cnd)) {throw(msg);
} else {return false;
}})()
;
});
var expand = (function(node){
return (function() {if(ast["atom?"](node)) {return ((function() {return node;
}))();
} else {return (function() {if(ast["vector?"](node)) {return ((function() {return ast["copy-node"](node,map((function(e){
return expand(e);
}),ast["node-data"](node)));
}))();
} else {return (function() {if(ast["dict?"](node)) {return ((function() {return ast["copy-node"](node,map((function(e){
return expand(e);
}),ast["node-data"](node)));
}))();
} else {return (function() {if((_eq__eq_(ast["first*"](node),"\uFDD1quote") || _eq__eq_(ast["first*"](node),"\uFDD1quasiquote"))) {return ((function() {return node;
}))();
} else {return (function() {if(_eq__eq_(ast["first*"](node),"\uFDD1lambda")) {return ((function() {return ast["copy-node"](node,cons(ast["first"](node),cons(cadr(ast["node-data"](node)),map((function(e){
return expand(e);
}),cddr(ast["node-data"](node))))));
}))();
} else {return (function() {if(macro_p_(ast["first*"](node))) {return ((function() {return ((function() {var o3 = (function(res){
return expand(sourcify(res,ast["node-lineno"](node),ast["node-colno"](node)));
});
var o4 = macro_dash_function(ast["first*"](node))(desourcify(node));
return o3(o4);
}))();
}))();
} else {return ((function() {return ast["copy-node"](node,map(expand,ast["node-data"](node)));
}))();
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
var _per_macros = dict();
var macro_dash_function = (function(name){
return dict_dash_ref(_per_macros,name);
});
var install_dash_macro = (function(name,f){
return dict_dash_put_excl_(_per_macros,name,f);
});
var macro_p_ = (function(name){
return (symbol_p_(name) && dict_dash_ref(_per_macros,name) && true);
});
var macro_dash_generator = false;
var make_dash_macro = (function(pattern,body){
return ((function() {var o5 = (function(x){
return ((function() {var o7 = (function(s,p){
return eval(p);
});
var o8 = list("\uFDD1lambda",list(x),list_dash_append(list("\uFDD1let",destructure(pattern,list("\uFDD1cdr",x),_emptylst)),((function() {var o11 = (function(o10){
return (function() {if(vector_p_(o10)) {return vector_dash__gt_list(o10);
} else {return o10;
}})()
;
});
var o12 = body;
return o11(o12);
}))()));
var o9 = compile_dash_program(o8,macro_dash_generator["make-fresh"]());
return o7(o8,o9);
}))();
});
var o6 = gensym();
return o5(o6);
}))();
});
var destructure = (function(pattern,access,bindings){
return (function() {if(null_p_(pattern)) {return ((function() {return bindings;
}))();
} else {return (function() {if(eq_p_(car(pattern),"\uFDD1.")) {return ((function() {return cons(list(cadr(pattern),access),bindings);
}))();
} else {return ((function() {return cons(list(car(pattern),list("\uFDD1car",access)),destructure(cdr(pattern),list("\uFDD1cdr",access),bindings));
}))();
}})()
;
}})()
;
});
var sourcify = (function(exp,lineno,colno){
return (function() {if((self_dash_evaluating_p_(exp) || symbol_p_(exp))) {return ((function() {return ast["make-node"]("\uFDD1ATOM",exp,lineno,colno);
}))();
} else {return (function() {if(vector_p_(exp)) {return ((function() {return ast["make-node"]("\uFDD1VECTOR",map((function(e){
return sourcify(e,lineno,colno);
}),vector_dash__gt_list(exp)),lineno,colno);
}))();
} else {return (function() {if(dict_p_(exp)) {return ((function() {return ast["make-node"]("\uFDD1DICT",map((function(e){
return sourcify(e,lineno,colno);
}),dict_dash__gt_list(exp)),lineno,colno);
}))();
} else {return ((function() {return ast["make-node"]("\uFDD1LIST",map((function(e){
return sourcify(e,lineno,colno);
}),exp),lineno,colno);
}))();
}})()
;
}})()
;
}})()
;
});
var desourcify = (function(node){
return (function() {if(ast["atom?"](node)) {return ((function() {return ast["node-data"](node);
}))();
} else {return (function() {if(ast["vector?"](node)) {return ((function() {return list_dash__gt_vector(map(desourcify,ast["node-data"](node)));
}))();
} else {return (function() {if(ast["dict?"](node)) {return ((function() {return apply(dict,map(desourcify,ast["node-data"](node)));
}))();
} else {return (function() {if(ast["list?"](node)) {return ((function() {return map(desourcify,ast["node-data"](node));
}))();
} else {return ((function() {throw(str("unknown node type: ",node));
}))();
}})()
;
}})()
;
}})()
;
}})()
;
});
install_dash_macro("\uFDD1define-macro",(function(form){
return ((function() {var o13 = (function(sig){
return ((function() {var o15 = (function(name,pattern,body){
install_dash_macro(name,make_dash_macro(pattern,body));
return false;
});
var o16 = car(sig);
var o17 = cdr(sig);
var o18 = cddr(form);
return o15(o16,o17,o18);
}))();
});
var o14 = cadr(form);
return o13(o14);
}))();
}));
install_dash_macro("\uFDD1begin",(function(form){
return list(list_dash_append(list("\uFDD1lambda",_emptylst),((function() {var o20 = (function(o19){
return (function() {if(vector_p_(o19)) {return vector_dash__gt_list(o19);
} else {return o19;
}})()
;
});
var o21 = cdr(form);
return o20(o21);
}))()));
}));
install_dash_macro("\uFDD1cond",(function(form){
return (function() {if(null_p_(cdr(form))) {return false;
} else {return ((function() {var o22 = (function(forms){
return ((function() {var o24 = (function(f){
return (function() {if(eq_p_(car(f),"\uFDD1else")) {return list_dash_append(list("\uFDD1begin"),((function() {var o27 = (function(o26){
return (function() {if(vector_p_(o26)) {return vector_dash__gt_list(o26);
} else {return o26;
}})()
;
});
var o28 = cdr(f);
return o27(o28);
}))());
} else {return list("\uFDD1if",car(f),list_dash_append(list("\uFDD1begin"),((function() {var o30 = (function(o29){
return (function() {if(vector_p_(o29)) {return vector_dash__gt_list(o29);
} else {return o29;
}})()
;
});
var o31 = cdr(f);
return o30(o31);
}))()),list_dash_append(list("\uFDD1cond"),((function() {var o33 = (function(o32){
return (function() {if(vector_p_(o32)) {return vector_dash__gt_list(o32);
} else {return o32;
}})()
;
});
var o34 = cdr(forms);
return o33(o34);
}))()));
}})()
;
});
var o25 = car(forms);
return o24(o25);
}))();
});
var o23 = cdr(form);
return o22(o23);
}))();
}})()
;
}));
install_dash_macro("\uFDD1let",(function(form){
var replace = (function(expr,old,sym){
return (function() {if(symbol_p_(expr)) {return ((function() {return (function() {if(_eq__eq_(expr,old)) {return sym;
} else {return expr;
}})()
;
}))();
} else {return (function() {if(literal_p_(expr)) {return ((function() {return expr;
}))();
} else {return (function() {if(dict_p_(expr)) {return ((function() {return dict_dash_map((function(e){
return replace(e,old,sym);
}),expr);
}))();
} else {return (function() {if(vector_p_(expr)) {return ((function() {return vector_dash_map((function(e){
return replace(e,old,sym);
}),expr);
}))();
} else {return (function() {if(list_p_(expr)) {return ((function() {return map((function(e){
return replace(e,old,sym);
}),expr);
}))();
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
});
var generate_dash_defs = (function(syms,exprs){
return reverse(((function() {var loop = (function(lst,forms,vars,acc){
return (function() {if(null_p_(lst)) {return acc;
} else {return ((function() {var o39 = (function(sym,name,code){
return vector("__tco_call",(function() {return loop(cdr(lst),cdr(forms),dict_dash_merge(vars,dict(name,sym)),cons(list("\uFDD1define",car(lst),fold((function(el,acc){
return replace(acc,key_dash__gt_symbol(el),dict_dash_ref(vars,el));
}),code,keys(vars))),acc));
}));
});
var o40 = car(lst);
var o41 = car(car(forms));
var o42 = cadar(forms);
return o39(o40,o41,o42);
}))();
}})()
;
});
var o35 = syms;
var o36 = exprs;
var o37 = dict();
var o38 = _emptylst;
return trampoline(loop(o35,o36,o37,o38));
}))());
});
var tco = (function(exprs,exit){
var if_p_ = (function(expr){
return (list_p_(expr) && _eq__eq_(car(expr),"\uFDD1if"));
});
var let_p_ = (function(expr){
return (list_p_(expr) && _eq__eq_(car(expr),"\uFDD1let"));
});
var begin_p_ = (function(expr){
return (list_p_(expr) && _eq__eq_(car(expr),"\uFDD1begin"));
});
var tco_p_ = (function(expr){
return (list_p_(expr) && _eq__eq_(car(expr),exit));
});
var process_dash_if = (function(expr,transform){
return (function() {if(null_p_(cdddr(expr))) {return list("\uFDD1if",cadr(expr),transform(caddr(expr)));
} else {return list("\uFDD1if",cadr(expr),transform(caddr(expr)),transform(car(cdddr(expr))));
}})()
;
});
return ((function() {var o43 = (function(rexprs){
return ((function() {var o45 = (function(bottom){
return (function() {if(if_p_(bottom)) {return ((function() {return reverse(cons(process_dash_if(bottom,(function(expr){
return (function() {if(begin_p_(expr)) {return ((function() {return tco(expr,exit);
}))();
} else {return (function() {if(let_p_(expr)) {return ((function() {return tco(expr,exit);
}))();
} else {return ((function() {return car(tco(list(expr),exit));
}))();
}})()
;
}})()
;
})),cdr(rexprs)));
}))();
} else {return (function() {if(let_p_(bottom)) {return ((function() {return reverse(cons(tco(bottom,exit),cdr(rexprs)));
}))();
} else {return ((function() {return (function() {if(tco_p_(bottom)) {return reverse(cons(list("\uFDD1vector","__tco_call",list("\uFDD1lambda",_emptylst,bottom)),cdr(rexprs)));
} else {return exprs;
}})()
;
}))();
}})()
;
}})()
;
});
var o46 = car(rexprs);
return o45(o46);
}))();
});
var o44 = reverse(exprs);
return o43(o44);
}))();
});
var tco_dash_call_p_ = (function(name,expr){
var _tco_p_ = (function(expr){
return (list_p_(expr) && _eq_(car(expr),"\uFDD1vector") && _eq_(cadr(expr),"__tco_call") && ((function() {var o47 = (function(lamb){
return ((function() {var o49 = (function(body){
return _eq_(car(body),name);
});
var o50 = caddr(lamb);
return o49(o50);
}))();
});
var o48 = caddr(expr);
return o47(o48);
}))());
});
return (function() {if(list_p_(expr)) {return (_tco_p_(expr) || fold((function(el,acc){
return (acc || tco_dash_call_p_(name,el));
}),false,expr));
} else {return false;
}})()
;
});
return ((function() {var o51 = (function(name,forms){
assert((null_p_(forms) || (list_p_(forms) && list_p_(car(forms)))),str("invalid let: ",form));
return ((function() {var o54 = (function(syms,body){
return ((function() {var o57 = (function(tco_dash_ed){
return list(list_dash_append(list("\uFDD1lambda",_emptylst,list_dash_append(list("\uFDD1define",list_dash_append(list(name),((function() {var o60 = (function(o59){
return (function() {if(vector_p_(o59)) {return vector_dash__gt_list(o59);
} else {return o59;
}})()
;
});
var o61 = map(car,forms);
return o60(o61);
}))())),((function() {var o63 = (function(o62){
return (function() {if(vector_p_(o62)) {return vector_dash__gt_list(o62);
} else {return o62;
}})()
;
});
var o64 = tco_dash_ed;
return o63(o64);
}))())),((function() {var o66 = (function(o65){
return (function() {if(vector_p_(o65)) {return vector_dash__gt_list(o65);
} else {return o65;
}})()
;
});
var o67 = list_dash_append(generate_dash_defs(syms,forms),(function() {if(tco_dash_call_p_(name,tco_dash_ed)) {return list(list("\uFDD1trampoline",list_dash_append(list(name),((function() {var o69 = (function(o68){
return (function() {if(vector_p_(o68)) {return vector_dash__gt_list(o68);
} else {return o68;
}})()
;
});
var o70 = syms;
return o69(o70);
}))())));
} else {return list(list_dash_append(list(name),((function() {var o72 = (function(o71){
return (function() {if(vector_p_(o71)) {return vector_dash__gt_list(o71);
} else {return o71;
}})()
;
});
var o73 = syms;
return o72(o73);
}))()));
}})()
);
return o66(o67);
}))()));
});
var o58 = tco(body,name);
return o57(o58);
}))();
});
var o55 = map((function(el){
return gensym();
}),forms);
var o56 = (function() {if(symbol_p_(cadr(form))) {return cdddr(form);
} else {return cddr(form);
}})()
;
return o54(o55,o56);
}))();
});
var o52 = (function() {if(symbol_p_(cadr(form))) {return cadr(form);
} else {return gensym();
}})()
;
var o53 = (function() {if(symbol_p_(cadr(form))) {return caddr(form);
} else {return cadr(form);
}})()
;
return o51(o52,o53);
}))();
}));
install_dash_macro("\uFDD1eval",(function(form){
return list(list("\uFDD1%raw","eval"),list("\uFDD1__compiler.compile-program",cadr(form),list("\uFDD1__generator")));
}));
var _natives_ = dict();
var native_dash_function = (function(name){
return dict_dash_ref(_natives_,name);
});
var install_dash_native = (function(name,func,validator){
return dict_dash_put_excl_(_natives_,name,(function(node,gen,expr_p_,compile_star_){
validator(node);
return dict_dash_ref(gen,func)(cdr(ast["node-data"](node)),expr_p_,compile_star_);
}));
});
var native_p_ = (function(name){
return (symbol_p_(name) && not(eq_p_(dict_dash_ref(_natives_,name)),undefined));
});
var verify_dash_not_dash_single = (function(node){
return assert((length(ast["node-data"](node)) > 1),str("form requires at least one operand:",inspect(desourcify(node))));
});
install_dash_native("\uFDD1and","\uFDD1write-and",verify_dash_not_dash_single);
install_dash_native("\uFDD1or","\uFDD1write-or",verify_dash_not_dash_single);
install_dash_native("\uFDD1+","\uFDD1write-add",verify_dash_not_dash_single);
install_dash_native("\uFDD1-","\uFDD1write-subtract",verify_dash_not_dash_single);
install_dash_native("\uFDD1*","\uFDD1write-multiply",verify_dash_not_dash_single);
install_dash_native("\uFDD1/","\uFDD1write-divide",verify_dash_not_dash_single);
install_dash_native("\uFDD1>","\uFDD1write-gt",verify_dash_not_dash_single);
install_dash_native("\uFDD1<","\uFDD1write-lt",verify_dash_not_dash_single);
install_dash_native("\uFDD1<=","\uFDD1write-lteq",verify_dash_not_dash_single);
install_dash_native("\uFDD1>=","\uFDD1write-gteq",verify_dash_not_dash_single);
install_dash_native("\uFDD1>>","\uFDD1write-rshift",verify_dash_not_dash_single);
install_dash_native("\uFDD1<<","\uFDD1write-lshift",verify_dash_not_dash_single);
install_dash_native("\uFDD1bitwise-or","\uFDD1write-bitwise-or",verify_dash_not_dash_single);
install_dash_native("\uFDD1bitwise-and","\uFDD1write-bitwise-and",verify_dash_not_dash_single);
install_dash_native("\uFDD1%","\uFDD1write-mod",verify_dash_not_dash_single);
install_dash_native("\uFDD1require","\uFDD1write-require",(function(node){
verify_dash_not_dash_single(node);
return for_dash_each((function(el){
return assert((ast["list?"](el) && eq_p_(length(ast["node-data"](el)),2)),str("require needs a list of ","2 element lists: ",inspect(desourcify(el))));
}),cdr(ast["node-data"](node)));
}));
var apply_dash_node = (function(func_dash_name,node){
var quoted_p_ = vector_dash__gt_list(Array.prototype.slice.call(arguments, 2));
return ((function() {var o74 = (function(quoted_p_){
return ast["prepend"](ast["make-atom"](func_dash_name,node),(function() {if(quoted_p_) {return ast["map-children"]((function(e){
return ast["make-list"](ast["make-atom"]("\uFDD1quote",node),e);
}),node);
} else {return node;
}})()
);
});
var o75 = opt(quoted_p_,false);
return o74(o75);
}))();
});
var apply_dash_w_slash_unquote = (function(func_dash_name,node){
return ast["prepend"](ast["make-atom"](func_dash_name,node),ast["map-children"]((function(e){
return (function() {if((ast["list?"](e) && _eq__eq_(ast["first*"](e),"\uFDD1unquote"))) {return cadr(ast["node-data"](e));
} else {return (function() {if((ast["list?"](e) && _eq__eq_(ast["first*"](e),"\uFDD1key"))) {return ast["make-list"](ast["make-atom"]("\uFDD1quasiquote",node),cadr(ast["node-data"](e)));
} else {return ast["make-list"](ast["make-atom"]("\uFDD1quasiquote",node),e);
}})()
;
}})()
;
}),node));
});
var split_dash_splices = (function(lst,func_dash_name){
var make_dash_splice = (function(lst){
return (function() {if((self_dash_evaluating_p_(lst) || symbol_p_(lst))) {return apply_dash_w_slash_unquote(func_dash_name,ast["make-list*"](list(lst)));
} else {return apply_dash_w_slash_unquote(func_dash_name,ast["make-list*"](lst));
}})()
;
});
return ((function() {var loop = (function(nodes,slices,acc){
return (function() {if(null_p_(nodes)) {return reverse((function() {if(null_p_(acc)) {return slices;
} else {return cons(make_dash_splice(reverse(acc)),slices);
}})()
);
} else {return ((function() {var o79 = (function(node){
return (function() {if((ast["list?"](node) && _eq__eq_(ast["first*"](node),"\uFDD1unquote-splicing"))) {return ((function() {var o81 = (function(el){
return vector("__tco_call",(function() {return loop(cdr(nodes),cons(el,(function() {if(null_p_(acc)) {return slices;
} else {return cons(make_dash_splice(reverse(acc)),slices);
}})()
),_emptylst);
}));
});
var o82 = cadr(ast["node-data"](node));
return o81(o82);
}))();
} else {return vector("__tco_call",(function() {return loop(cdr(nodes),slices,cons(node,acc));
}));
}})()
;
});
var o80 = car(nodes);
return o79(o80);
}))();
}})()
;
});
var o76 = lst;
var o77 = _emptylst;
var o78 = _emptylst;
return trampoline(loop(o76,o77,o78));
}))();
});
var quasiquote_dash_split = (function(append_dash_name,func_dash_name,node){
return ((function() {var o83 = (function(slices){
return (function() {if(_eq__eq_(length(slices),1)) {return car(slices);
} else {return apply_dash_node(append_dash_name,ast["make-list*"](slices));
}})()
;
});
var o84 = split_dash_splices(ast["node-data"](node),func_dash_name);
return o83(o84);
}))();
});
var compile_dash_object = (function(node,generator,quoted_p_,expr_p_){
return ((function() {var o85 = (function(exp){
return (function() {if(key_p_(exp)) {return ((function() {return generator["write-key"](exp,expr_p_);
}))();
} else {return (function() {if(symbol_p_(exp)) {return ((function() {return generator["write-symbol"](exp,expr_p_);
}))();
} else {return (function() {if(number_p_(exp)) {return ((function() {return generator["write-number"](exp,expr_p_);
}))();
} else {return (function() {if(boolean_p_(exp)) {return ((function() {return generator["write-boolean"](exp,expr_p_);
}))();
} else {return (function() {if(string_p_(exp)) {return ((function() {return generator["write-string"](exp,expr_p_);
}))();
} else {return (function() {if(null_p_(exp)) {return ((function() {return generator["write-empty-list"](exp,expr_p_);
}))();
} else {return (function() {if(ast["list?"](node)) {return ((function() {return compile(apply_dash_node("\uFDD1list",node,quoted_p_),generator,expr_p_);
}))();
} else {return (function() {if(ast["dict?"](node)) {return ((function() {return compile(apply_dash_node("\uFDD1dict",node,quoted_p_),generator,expr_p_);
}))();
} else {return (function() {if(ast["vector?"](node)) {return ((function() {return compile(apply_dash_node("\uFDD1vector",node,quoted_p_),generator,expr_p_);
}))();
} else {return ((function() {throw(str("compile-object: unknown type: ",exp));
}))();
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
}})()
;
}})()
;
});
var o86 = ast["node-data"](node);
return o85(o86);
}))();
});
var compile_dash_quasi = (function(node,generator,expr_p_){
return (function() {if(ast["list?"](node)) {return ((function() {return compile(quasiquote_dash_split("\uFDD1list-append","\uFDD1list",node),generator,expr_p_);
}))();
} else {return (function() {if(ast["vector?"](node)) {return ((function() {return compile(quasiquote_dash_split("\uFDD1vector-concat","\uFDD1vector",node),generator,expr_p_);
}))();
} else {return (function() {if(ast["dict?"](node)) {return ((function() {return compile(quasiquote_dash_split("\uFDD1dict-merge","\uFDD1dict",node),generator,expr_p_);
}))();
} else {return ((function() {return compile_dash_object(node,generator,true,expr_p_);
}))();
}})()
;
}})()
;
}})()
;
});
var compile_dash_reference = (function(node,generator){
var expr_p_ = vector_dash__gt_list(Array.prototype.slice.call(arguments, 2));
return generator["write-term"](node,opt(expr_p_,false));
});
var compile_dash_if = (function(node,generator,expr_p_,compile_star_){
return ((function() {var o87 = (function(nodes,cnd,tru,alt){
return generator["write-if"](cnd,tru,alt,expr_p_,compile_star_);
});
var o88 = ast["node-data"](node);
var o89 = cadr(o88);
var o90 = caddr(o88);
var o91 = (function() {if(null_p_(cdddr(o88))) {return false;
} else {return car(cdddr(o88));
}})()
;
return o87(o88,o89,o90,o91);
}))();
});
var compile_dash_lambda = (function(node,generator,expr_p_,compile_star_){
return ((function() {var o92 = (function(nodes,args,body){
return generator["write-lambda"](args,body,expr_p_,compile_star_);
});
var o93 = ast["node-data"](node);
var o94 = cadr(o93);
var o95 = cddr(o93);
return o92(o93,o94,o95);
}))();
});
var compile_dash_set_excl_ = (function(node,generator,compile_star_){
return generator["write-set!"](cadr(ast["node-data"](node)),caddr(ast["node-data"](node)),compile_star_);
});
var compile_dash_define = (function(node,generator,compile_star_){
return ((function() {var o96 = (function(target){
return (function() {if(ast["list?"](target)) {return ((function() {var o98 = (function(name,args,body){
return generator["write-define"](name,ast["make-list*"](cons(ast["make-atom"]("\uFDD1lambda",name),cons((function() {if(null_p_(args)) {return ast["make-empty-list"](name);
} else {return ast["make-list*"](args);
}})()
,body))),compile_star_);
});
var o99 = ast["first"](target);
var o100 = cdr(ast["node-data"](target));
var o101 = cddr(ast["node-data"](node));
return o98(o99,o100,o101);
}))();
} else {return generator["write-define"](target,caddr(ast["node-data"](node)),compile_star_);
}})()
;
});
var o97 = cadr(ast["node-data"](node));
return o96(o97);
}))();
});
var compile = (function(node,generator){
var expr_p_ = vector_dash__gt_list(Array.prototype.slice.call(arguments, 2));
var compile_star_ = (function(node){
var expr_p_ = vector_dash__gt_list(Array.prototype.slice.call(arguments, 1));
return compile(node,generator,opt(expr_p_,false));
});
return ((function() {var o102 = (function(expr_p_){
return (function() {if(self_dash_evaluating_p_(ast["node-data"](node))) {return ((function() {return compile_dash_object(node,generator,false,expr_p_);
}))();
} else {return (function() {if(symbol_p_(ast["node-data"](node))) {return ((function() {return compile_dash_reference(node,generator,expr_p_);
}))();
} else {return (function() {if(ast["vector?"](node)) {return ((function() {return compile_dash_object(node,generator,false,expr_p_);
}))();
} else {return (function() {if(ast["dict?"](node)) {return ((function() {return compile_dash_object(node,generator,false,expr_p_);
}))();
} else {return (function() {if(ast["list?"](node)) {return ((function() {return ((function() {var o104 = (function(sym){
return (function() {if(_eq__eq_(sym,"\uFDD1quote")) {return ((function() {return compile_dash_object(cadr(ast["node-data"](node)),generator,true,expr_p_);
}))();
} else {return (function() {if(_eq__eq_(sym,"\uFDD1quasiquote")) {return ((function() {return compile_dash_quasi(cadr(ast["node-data"](node)),generator,expr_p_);
}))();
} else {return (function() {if(_eq__eq_(sym,"\uFDD1if")) {return ((function() {return compile_dash_if(node,generator,expr_p_,compile_star_);
}))();
} else {return (function() {if(_eq__eq_(sym,"\uFDD1lambda")) {return ((function() {return compile_dash_lambda(node,generator,expr_p_,compile_star_);
}))();
} else {return (function() {if(_eq__eq_(sym,"\uFDD1set!")) {return ((function() {return compile_dash_set_excl_(node,generator,compile_star_);
}))();
} else {return (function() {if(_eq__eq_(sym,"\uFDD1define")) {return ((function() {return compile_dash_define(node,generator,compile_star_);
}))();
} else {return (function() {if(_eq__eq_(sym,"\uFDD1%raw")) {return ((function() {return generator["write-raw-code"](cadr(ast["node-data"](node)));
}))();
} else {return (function() {if(native_p_(sym)) {return ((function() {return native_dash_function(sym)(node,generator,expr_p_,compile_star_);
}))();
} else {return ((function() {(function() {if(not((symbol_p_(ast["first*"](node)) || list_p_(ast["first*"](node))))) {throw(str("operator is not a procedure: ",ast["first*"](node)));
} else {return false;
}})()
;
return generator["write-func-call"](ast["first"](node),cdr(ast["node-data"](node)),expr_p_,compile_star_);
}))();
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
}})()
;
});
var o105 = ast["first*"](node);
return o104(o105);
}))();
}))();
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
});
var o103 = opt(expr_p_,false);
return o102(o103);
}))();
});
var compile_dash_program = (function(src,generator){
(function() {if(not(macro_dash_generator)) {macro_dash_generator = generator;
} else {return false;
}})()
;
return ((function() {var o106 = (function(exp){
(function() {if((ast["type?"](exp,"\uFDD1LIST") && _eq__eq_(ast["first*"](exp),"\uFDD1begin"))) {return for_dash_each((function(e){
return compile(expand(e),generator);
}),cdr(ast["node-data"](exp)));
} else {return compile(expand(exp),generator);
}})()
;
return generator["get-code"]();
});
var o107 = (function() {if(string_p_(src)) {return reader["read"](src);
} else {return sourcify(src,0,0);
}})()
;
return o106(o107);
}))();
});
module["exports"] = dict("\uFDD1read",(function(e){
return desourcify(reader["read"](e));
}),"\uFDD1expand",expand,"\uFDD1compile",compile,"\uFDD1compile-program",compile_dash_program,"\uFDD1desourcify",desourcify,"\uFDD1sourcify",sourcify,"\uFDD1pp",pp,"\uFDD1set-macro-generator",(function(g){
return (function() {if(not(macro_dash_generator)) {macro_dash_generator = g;
} else {return false;
}})()
;
}));

