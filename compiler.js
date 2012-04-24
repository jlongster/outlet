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
return (_eq__eq_(typeof obj,"string") && not(_eq__eq_(obj[0],"\uFDD1")));
});
var symbol_p_ = (function(obj){
return (_eq__eq_(typeof obj,"string") && _eq__eq_(obj[0],"\uFDD1"));
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
return (number_p_(x) || string_p_(x) || boolean_p_(x) || null_p_(x));
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
var string_dash__gt_symbol = (function(str){
return ((function() {var o1 = (function(s){
return ("\uFDD1" + s);
});
var o2 = str;
return o1(o2);
}))();
});
var symbol_dash__gt_string = (function(sym){
return ((function() {var o3 = (function(s){
return s;
});
var o4 = sym["substring"](1);
return o3(o4);
}))();
});
var _emptylst = [null];
var list = (function() {
var args = vector_dash__gt_list(Array.prototype.slice.call(arguments));
return args;
});
var cons = (function(obj,lst){
return ((function() {var o5 = (function(res){
res.list = true;return res;
});
var o6 = [obj, lst];
return o5(o6);
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
var o7 = lst;
var o8 = i;
return loop(o7,o8);
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
var o9 = lst1;
return loop(o9);
}))();
});
var list_dash_find = (function(lst,val){
var rst = vector_dash__gt_list(Array.prototype.slice.call(arguments, 2));
return ((function() {var o10 = (function(access){
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
var o12 = lst;
return trampoline(loop(o12));
}))();
});
var o11 = (function() {if(null_p_(rst)) {return (function(x){
return x;
});
} else {return car(rst);
}})()
;
return o10(o11);
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
var o13 = lst;
return trampoline(loop(o13));
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
var o14 = 0;
return loop(o14);
}))();
});
var make_dash_vector = (function(count,val){
return ((function() {var o15 = (function(v){
return ((function() {var loop = (function(i){
return (function() {if((i < count)) {return ((function() {vector_dash_put_excl_(v,i,val);
return vector("__tco_call",(function() {return loop((i + 1));
}));
}))();
} else {return v;
}})()
;
});
var o17 = 0;
return trampoline(loop(o17));
}))();
});
var o16 = new Array(count);
return o15(o16);
}))();
});
var vector = (function() {return Array.prototype.slice.call(arguments)});
var vector_dash_ref = (function(vec,i){
return vec[i]});
var vector_dash_put_excl_ = (function(vec,i,obj){
return vec[i] = obj});
var vector_dash_concat = (function(vec1,vec2){
return vec1.concat(vec2)});
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
var o18 = 0;
return trampoline(loop(o18));
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
var o19 = 0;
return trampoline(loop(o19));
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
var o20 = 0;
return trampoline(loop(o20));
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
var o21 = 0;
var o22 = acc;
return trampoline(loop(o21,o22));
}))();
});
var dict = (function() {
var args = vector_dash__gt_list(Array.prototype.slice.call(arguments));
var res = {};
((function() {var loop = (function(lst){
return (function() {if(not(null_p_(lst))) {return ((function() {var o24 = (function(key,val){
dict_dash_put_excl_(res,key,val);
return vector("__tco_call",(function() {return loop(cddr(lst));
}));
});
var o25 = car(lst);
var o26 = cadr(lst);
return o24(o25,o26);
}))();
} else {return false;
}})()
;
});
var o23 = args;
return trampoline(loop(o23));
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
return (function() {if(not(null_p_(lst))) {return ((function() {var o28 = (function(k){
dict_dash_put_excl_(res,k,func(dict_dash_ref(dct,k)));
return vector("__tco_call",(function() {return loop(cdr(lst));
}));
});
var o29 = car(lst);
return o28(o29);
}))();
} else {return false;
}})()
;
});
var o27 = keys(dct);
return trampoline(loop(o27));
}))();
return res;
});
var dict_dash_merge = (function(dct1,dct2){
return ((function() {var o30 = (function(res){
map((function(k){
return dict_dash_put_excl_(res,k,dict_dash_ref(dct1,k));
}),keys(dct1));
map((function(k){
return dict_dash_put_excl_(res,k,dict_dash_ref(dct2,k));
}),keys(dct2));
return res;
});
var o31 = dict();
return o30(o31);
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
var o32 = keys(dct);
return trampoline(loop(o32));
}))();
return res;
});
var dict_dash__gt_list = (function(dct){
return vector_dash__gt_list(dict_dash__gt_vector(dct));
});
var keys = (function(dct){
return ((function() {var o33 = (function(res){
for(var k in dct) {
       res = cons(string_dash__gt_symbol(k), res);
    }return res;
});
var o34 = _emptylst;
return o33(o34);
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
var o35 = keys;
var o36 = vals;
return trampoline(loop(o35,o36));
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
var o37 = obj1;
var o38 = obj2;
return loop(o37,o38);
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
var o39 = 0;
return trampoline(loop(o39));
}))();
}})()
;
}))();
} else {return (function() {if((dict_p_(obj1) && dict_p_(obj2))) {return ((function() {return ((function() {var o40 = (function(keys1,keys2){
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
var o43 = keys1;
return trampoline(loop(o43));
}))());
});
var o41 = keys(obj1);
var o42 = keys(obj2);
return o40(o41,o42);
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
});
var _per_recur_dash_protect = (function(obj,arg,func,halt){
var rest = vector_dash__gt_list(Array.prototype.slice.call(arguments, 4));
return ((function() {var o44 = (function(parents){
return (function() {if(list_dash_find(parents,obj)) {return halt;
} else {return func(obj,arg,(function(el,arg){
return _per_recur_dash_protect(el,arg,func,halt,cons(obj,parents));
}));
}})()
;
});
var o45 = (function() {if(null_p_(rest)) {return _emptylst;
} else {return car(rest);
}})()
;
return o44(o45);
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
return ((function() {var o46 = (function(no_dash_newlines){
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
return (function() {if(list_p_(obj)) {return ((function() {return ((function() {var o48 = (function(sp,first){
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
var o49 = (_per_space(obj) > 30);
var o50 = true;
return o48(o49,o50);
}))();
}))();
} else {return (function() {if(vector_p_(obj)) {return ((function() {return ((function() {var o51 = (function(sp,first){
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
var o52 = (_per_space(obj) > 30);
var o53 = true;
return o51(o52,o53);
}))();
}))();
} else {return (function() {if(dict_p_(obj)) {return ((function() {return ((function() {var o54 = (function(sp,first){
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
disp(":");
disp(recur(k,i));
disp(" ");
disp(recur(dict_dash_ref(obj,k),(i + 3 + vector_dash_length(symbol_dash__gt_string(k)))));
first = false;
}),keys(obj));
disp("}");
return get_dash_buffer();
});
var o55 = (_per_space(obj) > 30);
var o56 = true;
return o54(o55,o56);
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
var o47 = (function() {if(null_p_(rest)) {return false;
} else {return car(rest);
}})()
;
return o46(o47);
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


var util = require("util");var fs = require("fs");var reader = require("./parser");var grammar = require("./grammar");var js = require("./backends/js");var application_p_ = (function(form){
return (list_p_(form) && not(macro_p_(car(form))));
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
var expand = (function(exp){
return (function() {if((symbol_p_(exp) || literal_p_(exp))) {return ((function() {return exp;
}))();
} else {return (function() {if(vector_p_(exp)) {return ((function() {return vector_dash_map((function(e){
return expand(e);
}),exp);
}))();
} else {return (function() {if(dict_p_(exp)) {return ((function() {return dict_dash_map((function(e){
return expand(e);
}),exp);
}))();
} else {return (function() {if(eq_p_(car(exp),"\uFDD1lambda")) {return ((function() {return list_dash_append(list("\uFDD1lambda",cadr(exp)),((function() {var o2 = (function(o1){
return (function() {if(vector_p_(o1)) {return vector_dash__gt_list(o1);
} else {return o1;
}})()
;
});
var o3 = map(expand,cddr(exp));
return o2(o3);
}))());
}))();
} else {return (function() {if(macro_p_(car(exp))) {return ((function() {return expand(macro_dash_function(car(exp))(exp));
}))();
} else {return ((function() {return map(expand,exp);
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
return ((function() {var o4 = (function(x){
return eval(compile(list("\uFDD1lambda",list(x),list_dash_append(list("\uFDD1let",destructure(pattern,list("\uFDD1cdr",x),_emptylst)),((function() {var o7 = (function(o6){
return (function() {if(vector_p_(o6)) {return vector_dash__gt_list(o6);
} else {return o6;
}})()
;
});
var o8 = body;
return o7(o8);
}))())),macro_dash_generator["make-fresh"]()));
});
var o5 = gensym();
return o4(o5);
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
install_dash_macro("\uFDD1define-macro",(function(form){
return ((function() {var o9 = (function(sig){
return ((function() {var o11 = (function(name,pattern,body){
install_dash_macro(name,make_dash_macro(pattern,body));
return false;
});
var o12 = car(sig);
var o13 = cdr(sig);
var o14 = cddr(form);
return o11(o12,o13,o14);
}))();
});
var o10 = cadr(form);
return o9(o10);
}))();
}));
install_dash_macro("\uFDD1cond",(function(form){
return (function() {if(null_p_(cdr(form))) {return false;
} else {return ((function() {var o15 = (function(forms){
return ((function() {var o17 = (function(f){
return (function() {if(eq_p_(car(f),"\uFDD1else")) {return list_dash_append(list("\uFDD1begin"),((function() {var o20 = (function(o19){
return (function() {if(vector_p_(o19)) {return vector_dash__gt_list(o19);
} else {return o19;
}})()
;
});
var o21 = cdr(f);
return o20(o21);
}))());
} else {return list("\uFDD1if",car(f),list_dash_append(list("\uFDD1begin"),((function() {var o23 = (function(o22){
return (function() {if(vector_p_(o22)) {return vector_dash__gt_list(o22);
} else {return o22;
}})()
;
});
var o24 = cdr(f);
return o23(o24);
}))()),list_dash_append(list("\uFDD1cond"),((function() {var o26 = (function(o25){
return (function() {if(vector_p_(o25)) {return vector_dash__gt_list(o25);
} else {return o25;
}})()
;
});
var o27 = cdr(forms);
return o26(o27);
}))()));
}})()
;
});
var o18 = car(forms);
return o17(o18);
}))();
});
var o16 = cdr(form);
return o15(o16);
}))();
}})()
;
}));
install_dash_macro("\uFDD1begin",(function(form){
return list(list_dash_append(list("\uFDD1lambda",_emptylst),((function() {var o29 = (function(o28){
return (function() {if(vector_p_(o28)) {return vector_dash__gt_list(o28);
} else {return o28;
}})()
;
});
var o30 = cdr(form);
return o29(o30);
}))()));
}));
install_dash_macro("\uFDD1define",(function(form){
return ((function() {var o31 = (function(sig){
return (function() {if(list_p_(sig)) {return ((function() {return list("\uFDD1set",car(sig),list_dash_append(list("\uFDD1lambda",cdr(sig)),((function() {var o34 = (function(o33){
return (function() {if(vector_p_(o33)) {return vector_dash__gt_list(o33);
} else {return o33;
}})()
;
});
var o35 = cddr(form);
return o34(o35);
}))()));
}))();
} else {return (function() {if(symbol_p_(sig)) {return ((function() {return list("\uFDD1set",sig,caddr(form));
}))();
} else {return ((function() {throw(str("define requires a list"," or symbol to operate on: ",inspect(form)));
}))();
}})()
;
}})()
;
});
var o32 = cadr(form);
return o31(o32);
}))();
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
} else {return ((function() {var o40 = (function(sym,name,code){
return vector("__tco_call",(function() {return loop(cdr(lst),cdr(forms),dict_dash_merge(vars,dict(name,sym)),cons(list("\uFDD1define",car(lst),fold((function(el,acc){
return replace(acc,el,dict_dash_ref(vars,el));
}),code,keys(vars))),acc));
}));
});
var o41 = car(lst);
var o42 = car(car(forms));
var o43 = cadar(forms);
return o40(o41,o42,o43);
}))();
}})()
;
});
var o36 = syms;
var o37 = exprs;
var o38 = dict();
var o39 = _emptylst;
return trampoline(loop(o36,o37,o38,o39));
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
return ((function() {var o44 = (function(rexprs){
return ((function() {var o46 = (function(bottom){
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
var o47 = car(rexprs);
return o46(o47);
}))();
});
var o45 = reverse(exprs);
return o44(o45);
}))();
});
var tco_dash_call_p_ = (function(name,expr){
var _tco_p_ = (function(expr){
return (list_p_(expr) && _eq_(car(expr),"\uFDD1vector") && _eq_(cadr(expr),"__tco_call") && ((function() {var o48 = (function(lamb){
return ((function() {var o50 = (function(body){
return _eq_(car(body),name);
});
var o51 = caddr(lamb);
return o50(o51);
}))();
});
var o49 = caddr(expr);
return o48(o49);
}))());
});
return (function() {if(list_p_(expr)) {return (_tco_p_(expr) || fold((function(el,acc){
return (acc || tco_dash_call_p_(name,el));
}),false,expr));
} else {return false;
}})()
;
});
return ((function() {var o52 = (function(name,forms){
assert((null_p_(forms) || (list_p_(forms) && list_p_(car(forms)))),str("invalid let: ",form));
return ((function() {var o55 = (function(syms,body){
return ((function() {var o58 = (function(tco_dash_ed){
return list(list_dash_append(list("\uFDD1lambda",_emptylst,list_dash_append(list("\uFDD1define",list_dash_append(list(name),((function() {var o61 = (function(o60){
return (function() {if(vector_p_(o60)) {return vector_dash__gt_list(o60);
} else {return o60;
}})()
;
});
var o62 = map(car,forms);
return o61(o62);
}))())),((function() {var o64 = (function(o63){
return (function() {if(vector_p_(o63)) {return vector_dash__gt_list(o63);
} else {return o63;
}})()
;
});
var o65 = tco_dash_ed;
return o64(o65);
}))())),((function() {var o67 = (function(o66){
return (function() {if(vector_p_(o66)) {return vector_dash__gt_list(o66);
} else {return o66;
}})()
;
});
var o68 = list_dash_append(generate_dash_defs(syms,forms),(function() {if(tco_dash_call_p_(name,tco_dash_ed)) {return list(list("\uFDD1trampoline",list_dash_append(list(name),((function() {var o70 = (function(o69){
return (function() {if(vector_p_(o69)) {return vector_dash__gt_list(o69);
} else {return o69;
}})()
;
});
var o71 = syms;
return o70(o71);
}))())));
} else {return list(list_dash_append(list(name),((function() {var o73 = (function(o72){
return (function() {if(vector_p_(o72)) {return vector_dash__gt_list(o72);
} else {return o72;
}})()
;
});
var o74 = syms;
return o73(o74);
}))()));
}})()
);
return o67(o68);
}))()));
});
var o59 = tco(body,name);
return o58(o59);
}))();
});
var o56 = map((function(el){
return gensym();
}),forms);
var o57 = (function() {if(symbol_p_(cadr(form))) {return cdddr(form);
} else {return cddr(form);
}})()
;
return o55(o56,o57);
}))();
});
var o53 = (function() {if(symbol_p_(cadr(form))) {return cadr(form);
} else {return gensym();
}})()
;
var o54 = (function() {if(symbol_p_(cadr(form))) {return caddr(form);
} else {return cadr(form);
}})()
;
return o52(o53,o54);
}))();
}));
install_dash_macro("\uFDD1quote",(function(form){
return ((function() {var o75 = (function(src){
return ((function() {var o77 = (function(q){
return (function() {if(symbol_p_(src)) {return ((function() {return list("\uFDD1%quoted",src);
}))();
} else {return (function() {if(literal_p_(src)) {return ((function() {return src;
}))();
} else {return (function() {if(vector_p_(src)) {return ((function() {return vector_dash_map(q,src);
}))();
} else {return (function() {if(dict_p_(src)) {return ((function() {return dict_dash_map(q,src);
}))();
} else {return (function() {if(list_p_(src)) {return ((function() {return cons("\uFDD1list",map(q,src));
}))();
} else {return ((function() {throw(str("invalid type of expression: ",inspect(src)));
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
});
var o78 = (function(e){
return list("\uFDD1quote",e);
});
return o77(o78);
}))();
});
var o76 = cadr(form);
return o75(o76);
}))();
}));
install_dash_macro("\uFDD1quasiquote",(function(form){
return ((function() {var o79 = (function(src){
return (function() {if(symbol_p_(src)) {return ((function() {return list("\uFDD1%quoted",src);
}))();
} else {return (function() {if(literal_p_(src)) {return ((function() {return src;
}))();
} else {return (function() {if(vector_p_(src)) {return ((function() {return list("\uFDD1list->vector",unquote_dash_splice_dash_expand(vector_dash__gt_list(src)));
}))();
} else {return (function() {if(dict_p_(src)) {return ((function() {return dict_dash_map((function(el){
return (function() {if((list_p_(el) && eq_p_(car(src),"\uFDD1unquote"))) {return cadr(el);
} else {return list("\uFDD1quasiquote",el);
}})()
;
}),src);
}))();
} else {return (function() {if(list_p_(src)) {return ((function() {return (function() {if(eq_p_(car(src),"\uFDD1unquote")) {return cadr(src);
} else {return unquote_dash_splice_dash_expand(src);
}})()
;
}))();
} else {return ((function() {throw(str("invalid type of expression: ",inspect(src)));
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
});
var o80 = cadr(form);
return o79(o80);
}))();
}));
var unquote_dash_splice_dash_expand = (function(lst){
var list_dash_push = (function(lst,item){
return (function() {if(null_p_(item)) {return lst;
} else {return cons(cons("\uFDD1list",reverse(item)),lst);
}})()
;
});
var quote_dash_splice = (function(lst,lst_dash_acc,acc){
return (function() {if(null_p_(lst)) {return list_dash_push(lst_dash_acc,acc);
} else {return ((function() {var o81 = (function(el){
return (function() {if((list_p_(el) && eq_p_(car(el),"\uFDD1unquote-splicing"))) {return ((function() {var o83 = (function(src){
return quote_dash_splice(cdr(lst),cons(src,list_dash_push(lst_dash_acc,acc)),_emptylst);
});
var o84 = (function() {if(literal_p_(cadr(el))) {return ((function() {return list("\uFDD1list",cadr(el));
}))();
} else {return (function() {if(vector_p_(cadr(el))) {return ((function() {return list("\uFDD1vector->list",cadr(el));
}))();
} else {return (function() {if(dict_p_(cadr(el))) {return ((function() {pp(el);
throw("cannot splice dict");
}))();
} else {return ((function() {return ((function() {var o85 = (function(v){
return list("\uFDD1let",list(list(v,cadr(el))),list("\uFDD1if",list("\uFDD1vector?",v),list("\uFDD1vector->list",v),v));
});
var o86 = gensym();
return o85(o86);
}))();
}))();
}})()
;
}})()
;
}})()
;
return o83(o84);
}))();
} else {return quote_dash_splice(cdr(lst),lst_dash_acc,cons(list("\uFDD1quasiquote",el),acc));
}})()
;
});
var o82 = car(lst);
return o81(o82);
}))();
}})()
;
});
return ((function() {var o87 = (function(res){
return (function() {if(eq_p_(length(res),1)) {return car(res);
} else {return cons("\uFDD1list-append",reverse(res));
}})()
;
});
var o88 = quote_dash_splice(lst,_emptylst,_emptylst);
return o87(o88);
}))();
});
install_dash_macro("\uFDD1eval",(function(form){
return list(list("\uFDD1%raw","eval"),list("\uFDD1__compiler.compile",cadr(form),list("\uFDD1__generator")));
}));
var _natives_ = dict();
var native_dash_function = (function(name){
return dict_dash_ref(_natives_,name);
});
var install_dash_native = (function(name,func,validator){
return dict_dash_put_excl_(_natives_,name,(function(form,gen,expr_p_,parse){
validator(form);
return dict_dash_ref(gen,func)(cdr(form),expr_p_,parse);
}));
});
var native_p_ = (function(name){
return (symbol_p_(name) && not(eq_p_(dict_dash_ref(_natives_,name)),undefined));
});
var verify_dash_not_dash_single = (function(form){
return assert((length(form) > 1),str("form requires at least one operand:",inspect(form)));
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
install_dash_native("\uFDD1require","\uFDD1write-require",(function(form){
verify_dash_not_dash_single(form);
return for_dash_each((function(el){
return assert((list_p_(el) && eq_p_(length(el),2)),str("require needs a list of ","2 element lists: ",inspect(el)));
}),cdr(form));
}));
var parse = (function(form,generator){
var expr_p_ = vector_dash__gt_list(Array.prototype.slice.call(arguments, 2));
return ((function() {var o89 = (function(expr_p_,_per_parse){
var parse_dash_literal = (function(form){
return (function() {if(number_p_(form)) {return ((function() {return generator["write-number"](form,not(expr_p_));
}))();
} else {return (function() {if(string_p_(form)) {return ((function() {return generator["write-string"](form,not(expr_p_));
}))();
} else {return (function() {if(boolean_p_(form)) {return ((function() {return generator["write-boolean"](form,not(expr_p_));
}))();
} else {return (function() {if(null_p_(form)) {return ((function() {return generator["write-empty-list"](form,not(expr_p_));
}))();
} else {return ((function() {throw(str("Invalid literal: ",inspect(form)));
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
var parse_dash_set = (function(form){
assert(not(expr_p_),str("set{!} cannot be an expression: ",inspect(form)));
assert(symbol_p_(cadr(form)),"set{!} expects a symbol to operate on");
return (function() {if(eq_p_(car(form),"\uFDD1set")) {return generator["write-set"];
} else {return generator["write-set!"];
}})()
(cadr(form),caddr(form),_per_parse);
});
var parse_dash_if = (function(form){
assert((length(form) > 2),str("`if` has no branches: ",inspect(form)));
return generator["write-if"](cadr(form),caddr(form),expr_p_,_per_parse,(function() {if(null_p_(cdddr(form))) {return false;
} else {return car(cdddr(form));
}})()
);
});
var parse_dash_lambda = (function(form){
assert((null_p_(cadr(form)) || list_p_(cadr(form)) || symbol_p_(cadr(form))),"lambda expects a list or symbol for arguments");
return ((function() {var o92 = (function(args){
return generator["write-lambda"](args,cddr(form),expr_p_,_per_parse);
});
var o93 = cadr(form);
return o92(o93);
}))();
});
var parse_dash_func_dash_call = (function(form){
return ((function() {var o94 = (function(func){
assert((symbol_p_(func) || list_p_(func)),str("operator is not a procedure: ",inspect(form)));
return generator["write-func-call"](func,cdr(form),expr_p_,_per_parse);
});
var o95 = car(form);
return o94(o95);
}))();
});
var parse_dash_quoted = (function(form){
return ((function() {var o96 = (function(src){
return (function() {if(symbol_p_(src)) {return ((function() {return generator["write-symbol"](src,not(expr_p_));
}))();
} else {return (function() {if(literal_p_(src)) {return ((function() {return parse_dash_literal(src);
}))();
} else {return ((function() {throw(str("unexpected type of object in quote, ","literal expected: ",inspect(form)));
}))();
}})()
;
}})()
;
});
var o97 = cadr(form);
return o96(o97);
}))();
});
var parse_dash_list = (function(form){
return ((function() {var o98 = (function(first){
return (function() {if(eq_p_(first,"\uFDD1if")) {return ((function() {return parse_dash_if(form);
}))();
} else {return (function() {if(eq_p_(first,"\uFDD1lambda")) {return ((function() {return parse_dash_lambda(form);
}))();
} else {return (function() {if(eq_p_(first,"\uFDD1%quoted")) {return ((function() {return parse_dash_quoted(form);
}))();
} else {return (function() {if((eq_p_(first,"\uFDD1set!") || eq_p_(first,"\uFDD1set"))) {return ((function() {return parse_dash_set(form);
}))();
} else {return (function() {if(eq_p_(first,"\uFDD1%raw")) {return ((function() {assert(string_p_(cadr(form)),"%raw expects a string");
return generator["write-raw-code"](cadr(form));
}))();
} else {return (function() {if(native_p_(first)) {return ((function() {return native_dash_function(first)(form,generator,expr_p_,_per_parse);
}))();
} else {return ((function() {return parse_dash_func_dash_call(form);
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
var o99 = car(form);
return o98(o99);
}))();
});
var parse_dash_vector = (function(vec){
return parse_dash_list(cons("\uFDD1vector",vector_dash__gt_list(vec)));
});
var parse_dash_dict = (function(dict){
return ((function() {var o100 = (function(lst,i){
return ((function() {var o103 = (function(qlst){
return parse_dash_list(cons("\uFDD1dict",qlst));
});
var o104 = map((function(el){
i = (i + 1);
return (function() {if(eq_p_(((i - 1) % 2),0)) {return list("\uFDD1%quoted",el);
} else {return el;
}})()
;
}),lst);
return o103(o104);
}))();
});
var o101 = dict_dash__gt_list(dict);
var o102 = 0;
return o100(o101,o102);
}))();
});
return (function() {if(symbol_p_(form)) {return ((function() {return generator["write-term"](form,not(expr_p_));
}))();
} else {return (function() {if(literal_p_(form)) {return ((function() {return parse_dash_literal(form);
}))();
} else {return (function() {if(list_p_(form)) {return ((function() {return parse_dash_list(form);
}))();
} else {return (function() {if(vector_p_(form)) {return ((function() {return parse_dash_vector(form);
}))();
} else {return (function() {if(dict_p_(form)) {return ((function() {return parse_dash_dict(form);
}))();
} else {return ((function() {throw(str("Unkown thing: ",form));
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
});
var o90 = opt(expr_p_,false);
var o91 = (function(form){
var o90 = vector_dash__gt_list(Array.prototype.slice.call(arguments, 1));
return parse(form,generator,opt(o90,false));
});
return o89(o90,o91);
}))();
});
var read = (function(src){
return reader(grammar,src,vector());
});
var compile = (function(src,generator){
(function() {if(not(macro_dash_generator)) {macro_dash_generator = generator;
} else {return false;
}})()
;
return ((function() {var o105 = (function(forms){
(function() {if(eq_p_(car(forms),"\uFDD1begin")) {return for_dash_each((function(form){
return parse(expand(form),generator);
}),cdr(forms));
} else {return parse(expand(forms),generator);
}})()
;
return generator["get-code"]();
});
var o106 = (function() {if(string_p_(src)) {return read(src);
} else {return src;
}})()
;
return o105(o106);
}))();
});
module["exports"] = dict("\uFDD1read",read,"\uFDD1expand",expand,"\uFDD1parse",parse,"\uFDD1compile",compile,"\uFDD1install-macro",install_dash_macro,"\uFDD1pp",pp,"\uFDD1set-macro-generator",(function(g){
return (function() {if(not(macro_dash_generator)) {macro_dash_generator = g;
} else {return false;
}})()
;
}));

