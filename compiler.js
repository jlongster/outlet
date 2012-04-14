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
var list_dash_append = (function(lst1,lst2){
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
} else {return ((function() {throw("%inspect-non-sequence: unexpected type");
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
var _gensym = 0;
var gensym = (function() {_gensym = (_gensym + 1);
return string_dash__gt_symbol(("o" + _gensym));
});


var util = require("util");var fs = require("fs");var reader = require("./parser");var grammar = require("./grammar");var js = require("./backends/js");var application_p_ = (function(form){
return (list_p_(form) && not(expander_p_(car(form))));
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
var _expanders_ = dict();
var expander_dash_function = (function(name){
return dict_dash_ref(_expanders_,name);
});
var install_dash_expander = (function(name,func){
return dict_dash_put_excl_(_expanders_,name,func);
});
var expander_p_ = (function(name){
return (symbol_p_(name) && not(eq_p_(dict_dash_ref(_expanders_,name),undefined)));
});
var expand = (function(form){
return initial_dash_expander(form,initial_dash_expander);
});
var expand_dash_once = (function(form){
return initial_dash_expander(form,(function(x,e){
return x;
}));
});
var expand_dash_nth = (function(form,n){
return ((function() {var o1 = (function(i){
return ((function() {var o3 = (function(e1){
return e1(form,e1);
});
var o4 = (function(x,e2){
return (function() {if(not((i < n))) {return x;
} else {return ((function() {(function() {if((list_p_(x) && expander_p_(car(x)) && not(eq_p_(car(x),"\uFDD1lambda")))) {i = (i + 1);
} else {return false;
}})()
;
return initial_dash_expander(x,e2);
}))();
}})()
;
});
return o3(o4);
}))();
});
var o2 = 0;
return o1(o2);
}))();
});
var initial_dash_expander = (function(form,e){
return (function() {if(symbol_p_(form)) {return ((function() {return form;
}))();
} else {return (function() {if(literal_p_(form)) {return ((function() {return form;
}))();
} else {return (function() {if(vector_p_(form)) {return ((function() {return vector_dash_map((function(el){
return e(el,e);
}),form);
}))();
} else {return (function() {if(dict_p_(form)) {return ((function() {return dict_dash_map((function(el){
return e(el,e);
}),form);
}))();
} else {return (function() {if(expander_p_(car(form))) {return ((function() {return expander_dash_function(car(form))(form,e);
}))();
} else {return ((function() {return map((function(subform){
return e(subform,e);
}),form);
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
install_dash_expander("\uFDD1define-expander",(function(form,e){
return ((function() {var o5 = (function(sig){
return ((function() {var o7 = (function(name,arg_dash_names,body){
install_dash_expander(name,make_dash_expander(arg_dash_names,body));
return true;
});
var o8 = car(sig);
var o9 = cdr(sig);
var o10 = cddr(form);
return o7(o8,o9,o10);
}))();
});
var o6 = cadr(form);
return o5(o6);
}))();
}));
var make_dash_expander = (function(arg_dash_names,body){
assert(eq_p_(length(arg_dash_names),2),"define-expander functions must take two arguments");
return eval(__compiler["compile"](compile(list_dash_append(list("\uFDD1lambda",arg_dash_names),((function() {var o12 = (function(o11){
return (function() {if(vector_p_(o11)) {return vector_dash__gt_list(o11);
} else {return o11;
}})()
;
});
var o13 = body;
return o12(o13);
}))()),macro_dash_generator["make-fresh"]()),__generator()));
});
install_dash_expander("\uFDD1define-macro",(function(form,e){
return ((function() {var o14 = (function(sig){
return ((function() {var o16 = (function(name,pattern,body){
install_dash_macro(name,pattern,body);
return true;
});
var o17 = car(sig);
var o18 = cdr(sig);
var o19 = cddr(form);
return o16(o17,o18,o19);
}))();
});
var o15 = cadr(form);
return o14(o15);
}))();
}));
var macro_dash_generator = false;
var install_dash_macro = (function(name,pattern,body){
return install_dash_expander(name,make_dash_macro(pattern,body));
});
var make_dash_macro = (function(pattern,body){
return ((function() {var o20 = (function(x,e){
return ((function() {var o23 = (function(src){
return eval(compile(src,macro_dash_generator["make-fresh"]()));
});
var o24 = list("\uFDD1lambda",list(x,e),list(e,list_dash_append(list("\uFDD1let",destructure(pattern,list("\uFDD1cdr",x),_emptylst)),((function() {var o26 = (function(o25){
return (function() {if(vector_p_(o25)) {return vector_dash__gt_list(o25);
} else {return o25;
}})()
;
});
var o27 = body;
return o26(o27);
}))()),e));
return o23(o24);
}))();
});
var o21 = gensym();
var o22 = gensym();
return o20(o21,o22);
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
install_dash_expander("\uFDD1lambda",(function(form,e){
return list_dash_append(list("\uFDD1lambda",car(cdr(form))),((function() {var o29 = (function(o28){
return (function() {if(vector_p_(o28)) {return vector_dash__gt_list(o28);
} else {return o28;
}})()
;
});
var o30 = map((function(subform){
return e(subform,e);
}),cdr(cdr(form)));
return o29(o30);
}))());
}));
install_dash_expander("\uFDD1cond",(function(form,e){
return (function() {if(null_p_(cdr(form))) {return false;
} else {return ((function() {var o31 = (function(forms){
return ((function() {var o33 = (function(f){
return (function() {if(eq_p_(car(f),"\uFDD1else")) {return e(list_dash_append(list("\uFDD1begin"),((function() {var o36 = (function(o35){
return (function() {if(vector_p_(o35)) {return vector_dash__gt_list(o35);
} else {return o35;
}})()
;
});
var o37 = cdr(f);
return o36(o37);
}))()),e);
} else {return e(list("\uFDD1if",car(f),list_dash_append(list("\uFDD1begin"),((function() {var o39 = (function(o38){
return (function() {if(vector_p_(o38)) {return vector_dash__gt_list(o38);
} else {return o38;
}})()
;
});
var o40 = cdr(f);
return o39(o40);
}))()),list_dash_append(list("\uFDD1cond"),((function() {var o42 = (function(o41){
return (function() {if(vector_p_(o41)) {return vector_dash__gt_list(o41);
} else {return o41;
}})()
;
});
var o43 = cdr(forms);
return o42(o43);
}))())),e);
}})()
;
});
var o34 = car(forms);
return o33(o34);
}))();
});
var o32 = cdr(form);
return o31(o32);
}))();
}})()
;
}));
install_dash_expander("\uFDD1begin",(function(form,e){
return e(list(list_dash_append(list("\uFDD1lambda",_emptylst),((function() {var o45 = (function(o44){
return (function() {if(vector_p_(o44)) {return vector_dash__gt_list(o44);
} else {return o44;
}})()
;
});
var o46 = cdr(form);
return o45(o46);
}))())),e);
}));
install_dash_expander("\uFDD1define",(function(form,e){
return ((function() {var o47 = (function(sig){
return (function() {if(list_p_(sig)) {return ((function() {return e(list("\uFDD1set",car(sig),list_dash_append(list("\uFDD1lambda",cdr(sig)),((function() {var o50 = (function(o49){
return (function() {if(vector_p_(o49)) {return vector_dash__gt_list(o49);
} else {return o49;
}})()
;
});
var o51 = cddr(form);
return o50(o51);
}))())),e);
}))();
} else {return (function() {if(symbol_p_(sig)) {return ((function() {return e(list("\uFDD1set",sig,caddr(form)),e);
}))();
} else {return ((function() {throw(str("define requires a list"," or symbol to operate on: ",inspect(form)));
}))();
}})()
;
}})()
;
});
var o48 = cadr(form);
return o47(o48);
}))();
}));
install_dash_expander("\uFDD1let",(function(form,e){
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
} else {return ((function() {var o56 = (function(sym,name,code){
return vector("__tco_call",(function() {return loop(cdr(lst),cdr(forms),dict_dash_merge(vars,dict(name,sym)),cons(list("\uFDD1define",car(lst),fold((function(el,acc){
return replace(acc,el,dict_dash_ref(vars,el));
}),code,keys(vars))),acc));
}));
});
var o57 = car(lst);
var o58 = car(car(forms));
var o59 = cadar(forms);
return o56(o57,o58,o59);
}))();
}})()
;
});
var o52 = syms;
var o53 = exprs;
var o54 = dict();
var o55 = _emptylst;
return trampoline(loop(o52,o53,o54,o55));
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
return ((function() {var o60 = (function(rexprs){
return ((function() {var o62 = (function(bottom){
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
var o63 = car(rexprs);
return o62(o63);
}))();
});
var o61 = reverse(exprs);
return o60(o61);
}))();
});
var tco_dash_call_p_ = (function(name,expr){
var _tco_p_ = (function(expr){
return (list_p_(expr) && _eq_(car(expr),"\uFDD1vector") && _eq_(cadr(expr),"__tco_call") && ((function() {var o64 = (function(lamb){
return ((function() {var o66 = (function(body){
return _eq_(car(body),name);
});
var o67 = caddr(lamb);
return o66(o67);
}))();
});
var o65 = caddr(expr);
return o64(o65);
}))());
});
return (function() {if(list_p_(expr)) {return (_tco_p_(expr) || fold((function(el,acc){
return (acc || tco_dash_call_p_(name,el));
}),false,expr));
} else {return false;
}})()
;
});
return ((function() {var o68 = (function(name,forms){
assert((null_p_(forms) || (list_p_(forms) && list_p_(car(forms)))),str("invalid let: ",form));
return ((function() {var o71 = (function(syms,body){
return ((function() {var o74 = (function(tco_dash_ed){
return e(list(list_dash_append(list("\uFDD1lambda",_emptylst,list_dash_append(list("\uFDD1define",list_dash_append(list(name),((function() {var o77 = (function(o76){
return (function() {if(vector_p_(o76)) {return vector_dash__gt_list(o76);
} else {return o76;
}})()
;
});
var o78 = map(car,forms);
return o77(o78);
}))())),((function() {var o80 = (function(o79){
return (function() {if(vector_p_(o79)) {return vector_dash__gt_list(o79);
} else {return o79;
}})()
;
});
var o81 = tco_dash_ed;
return o80(o81);
}))())),((function() {var o83 = (function(o82){
return (function() {if(vector_p_(o82)) {return vector_dash__gt_list(o82);
} else {return o82;
}})()
;
});
var o84 = list_dash_append(generate_dash_defs(syms,forms),(function() {if(tco_dash_call_p_(name,tco_dash_ed)) {return list(list("\uFDD1trampoline",list_dash_append(list(name),((function() {var o86 = (function(o85){
return (function() {if(vector_p_(o85)) {return vector_dash__gt_list(o85);
} else {return o85;
}})()
;
});
var o87 = syms;
return o86(o87);
}))())));
} else {return list(list_dash_append(list(name),((function() {var o89 = (function(o88){
return (function() {if(vector_p_(o88)) {return vector_dash__gt_list(o88);
} else {return o88;
}})()
;
});
var o90 = syms;
return o89(o90);
}))()));
}})()
);
return o83(o84);
}))())),e);
});
var o75 = tco(body,name);
return o74(o75);
}))();
});
var o72 = map((function(el){
return gensym();
}),forms);
var o73 = (function() {if(symbol_p_(cadr(form))) {return cdddr(form);
} else {return cddr(form);
}})()
;
return o71(o72,o73);
}))();
});
var o69 = (function() {if(symbol_p_(cadr(form))) {return cadr(form);
} else {return gensym();
}})()
;
var o70 = (function() {if(symbol_p_(cadr(form))) {return caddr(form);
} else {return cadr(form);
}})()
;
return o68(o69,o70);
}))();
}));
install_dash_expander("\uFDD1quote",(function(form,e){
return ((function() {var o91 = (function(src){
return ((function() {var o93 = (function(q){
return (function() {if(symbol_p_(src)) {return ((function() {return list("\uFDD1quote",src);
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
var o94 = (function(el){
return e(list("\uFDD1quote",el),e);
});
return o93(o94);
}))();
});
var o92 = cadr(form);
return o91(o92);
}))();
}));
install_dash_expander("\uFDD1quasiquote",(function(form,e){
return ((function() {var o95 = (function(src){
return (function() {if(symbol_p_(src)) {return ((function() {return list("\uFDD1quote",src);
}))();
} else {return (function() {if(literal_p_(src)) {return ((function() {return src;
}))();
} else {return (function() {if(vector_p_(src)) {return ((function() {return list("\uFDD1list->vector",unquote_dash_splice_dash_expand(vector_dash__gt_list(src),e));
}))();
} else {return (function() {if(dict_p_(src)) {return ((function() {return dict_dash_map((function(el){
return (function() {if((list_p_(el) && eq_p_(car(src),"\uFDD1unquote"))) {return e(cadr(el),e);
} else {return e(list("\uFDD1quasiquote",el),e);
}})()
;
}),src);
}))();
} else {return (function() {if(list_p_(src)) {return ((function() {return (function() {if(eq_p_(car(src),"\uFDD1unquote")) {return e(cadr(src),e);
} else {return unquote_dash_splice_dash_expand(src,e);
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
var o96 = cadr(form);
return o95(o96);
}))();
}));
var unquote_dash_splice_dash_expand = (function(lst,e){
var list_dash_push = (function(lst,item){
return (function() {if(null_p_(item)) {return lst;
} else {return cons(cons("\uFDD1list",reverse(item)),lst);
}})()
;
});
var quote_dash_splice = (function(lst,lst_dash_acc,acc){
return (function() {if(null_p_(lst)) {return list_dash_push(lst_dash_acc,acc);
} else {return ((function() {var o97 = (function(el){
return (function() {if((list_p_(el) && eq_p_(car(el),"\uFDD1unquote-splicing"))) {return ((function() {var o99 = (function(src){
return quote_dash_splice(cdr(lst),cons(e(src,e),list_dash_push(lst_dash_acc,acc)),_emptylst);
});
var o100 = (function() {if(literal_p_(cadr(el))) {return ((function() {return list("\uFDD1list",cadr(el));
}))();
} else {return (function() {if(vector_p_(cadr(el))) {return ((function() {return list("\uFDD1vector->list",cadr(el));
}))();
} else {return (function() {if(dict_p_(cadr(el))) {return ((function() {pp(el);
throw("cannot splice dict");
}))();
} else {return ((function() {return ((function() {var o101 = (function(v){
return list("\uFDD1let",list(list(v,cadr(el))),list("\uFDD1if",list("\uFDD1vector?",v),list("\uFDD1vector->list",v),v));
});
var o102 = gensym();
return o101(o102);
}))();
}))();
}})()
;
}})()
;
}})()
;
return o99(o100);
}))();
} else {return quote_dash_splice(cdr(lst),lst_dash_acc,cons(e(list("\uFDD1quasiquote",el),e),acc));
}})()
;
});
var o98 = car(lst);
return o97(o98);
}))();
}})()
;
});
return ((function() {var o103 = (function(res){
return (function() {if(eq_p_(length(res),1)) {return car(res);
} else {return cons("\uFDD1list-append",reverse(res));
}})()
;
});
var o104 = quote_dash_splice(lst,_emptylst,_emptylst);
return o103(o104);
}))();
});
install_dash_expander("\uFDD1eval",(function(form,e){
return list("\uFDD1eval",list("\uFDD1__compiler.compile",e(cadr(form),e),list("\uFDD1__generator")));
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
return ((function() {var o105 = (function(expr_p_,_per_parse){
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
return ((function() {var o108 = (function(args){
return generator["write-lambda"](args,cddr(form),expr_p_,_per_parse);
});
var o109 = cadr(form);
return o108(o109);
}))();
});
var parse_dash_func_dash_call = (function(form){
return ((function() {var o110 = (function(func){
assert((symbol_p_(func) || list_p_(func)),str("operator is not a procedure: ",inspect(form)));
return generator["write-func-call"](func,cdr(form),expr_p_,_per_parse);
});
var o111 = car(form);
return o110(o111);
}))();
});
var parse_dash_quoted = (function(form){
return ((function() {var o112 = (function(src){
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
var o113 = cadr(form);
return o112(o113);
}))();
});
var parse_dash_list = (function(form){
return ((function() {var o114 = (function(first){
return (function() {if(eq_p_(first,"\uFDD1if")) {return ((function() {return parse_dash_if(form);
}))();
} else {return (function() {if(eq_p_(first,"\uFDD1lambda")) {return ((function() {return parse_dash_lambda(form);
}))();
} else {return (function() {if(eq_p_(first,"\uFDD1quote")) {return ((function() {return parse_dash_quoted(form);
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
var o115 = car(form);
return o114(o115);
}))();
});
var parse_dash_vector = (function(vec){
return parse_dash_list(cons("\uFDD1vector",vector_dash__gt_list(vec)));
});
var parse_dash_dict = (function(dict){
return ((function() {var o116 = (function(lst,i){
return ((function() {var o119 = (function(qlst){
return parse_dash_list(cons("\uFDD1dict",qlst));
});
var o120 = map((function(el){
i = (i + 1);
return (function() {if(eq_p_(((i - 1) % 2),0)) {return list("\uFDD1quote",el);
} else {return el;
}})()
;
}),lst);
return o119(o120);
}))();
});
var o117 = dict_dash__gt_list(dict);
var o118 = 0;
return o116(o117,o118);
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
var o106 = opt(expr_p_,false);
var o107 = (function(form){
var o106 = vector_dash__gt_list(Array.prototype.slice.call(arguments, 1));
return parse(form,generator,opt(o106,false));
});
return o105(o106,o107);
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
return ((function() {var o121 = (function(forms){
(function() {if(eq_p_(car(forms),"\uFDD1begin")) {return for_dash_each((function(form){
return parse(expand(form),generator);
}),cdr(forms));
} else {return parse(expand(forms),generator);
}})()
;
return generator["get-code"]();
});
var o122 = (function() {if(string_p_(src)) {return read(src);
} else {return src;
}})()
;
return o121(o122);
}))();
});
module["exports"] = dict("\uFDD1read",read,"\uFDD1expand",expand,"\uFDD1parse",parse,"\uFDD1compile",compile,"\uFDD1install-expander",install_dash_expander,"\uFDD1expand-once",expand_dash_once,"\uFDD1expand-nth",expand_dash_nth,"\uFDD1pp",pp,"\uFDD1set-macro-generator",(function(g){
return (function() {if(not(macro_dash_generator)) {macro_dash_generator = g;
} else {return false;
}})()
;
}));

