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
return ((function() {var o4186151 = (function(s){
return ("\uFDD1" + s);
});
var o3106145 = str;
return o4186151(o3106145);
}))();
});
var symbol_dash__gt_string = (function(sym){
return ((function() {var o4656537 = (function(s){
return s;
});
var o3556322 = sym["substring"](1);
return o4656537(o3556322);
}))();
});
var _emptylst = [null];
var list = (function() {
var args = vector_dash__gt_list(Array.prototype.slice.call(arguments));
return args;
});
var cons = (function(obj,lst){
return ((function() {var o3121196 = (function(res){
res.list = true;return res;
});
var o1454807 = [obj, lst];
return o3121196(o1454807);
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
var o9753986 = lst;
var o4780105 = i;
return loop(o9753986,o4780105);
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
var o8306228 = lst1;
return loop(o8306228);
}))();
});
var list_dash_find = (function(lst,val){
var rst = vector_dash__gt_list(Array.prototype.slice.call(arguments, 2));
return ((function() {var o203009 = (function(access){
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
var o2232088 = lst;
return trampoline(loop(o2232088));
}))();
});
var o4399736 = (function() {if(null_p_(rst)) {return (function(x){
return x;
});
} else {return car(rst);
}})()
;
return o203009(o4399736);
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
var o6186219 = lst;
return trampoline(loop(o6186219));
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
var o7327148 = 0;
return loop(o7327148);
}))();
});
var make_dash_vector = (function(count,val){
return ((function() {var o8877403 = (function(v){
return ((function() {var loop = (function(i){
return (function() {if((i < count)) {return ((function() {vector_dash_put_excl_(v,i,val);
return vector("__tco_call",(function() {return loop((i + 1));
}));
}))();
} else {return v;
}})()
;
});
var o8658606 = 0;
return trampoline(loop(o8658606));
}))();
});
var o1016185 = new Array(count);
return o8877403(o1016185);
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
var o7196220 = 0;
return trampoline(loop(o7196220));
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
var o9349468 = 0;
return trampoline(loop(o9349468));
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
var o5001813 = 0;
return trampoline(loop(o5001813));
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
var o7004050 = 0;
var o5149008 = acc;
return trampoline(loop(o7004050,o5149008));
}))();
});
var dict = (function() {
var args = vector_dash__gt_list(Array.prototype.slice.call(arguments));
var res = {};
((function() {var loop = (function(lst){
return (function() {if(not(null_p_(lst))) {return ((function() {var o2445869 = (function(key,val){
dict_dash_put_excl_(res,key,val);
return vector("__tco_call",(function() {return loop(cddr(lst));
}));
});
var o9244957 = car(lst);
var o6280754 = cadr(lst);
return o2445869(o9244957,o6280754);
}))();
} else {return false;
}})()
;
});
var o7697355 = args;
return trampoline(loop(o7697355));
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
return (function() {if(not(null_p_(lst))) {return ((function() {var o3161808 = (function(k){
dict_dash_put_excl_(res,k,func(dict_dash_ref(dct,k)));
return vector("__tco_call",(function() {return loop(cdr(lst));
}));
});
var o2807890 = car(lst);
return o3161808(o2807890);
}))();
} else {return false;
}})()
;
});
var o778374 = keys(dct);
return trampoline(loop(o778374));
}))();
return res;
});
var dict_dash_merge = (function(dct1,dct2){
return ((function() {var o9182488 = (function(res){
map((function(k){
return dict_dash_put_excl_(res,k,dict_dash_ref(dct1,k));
}),keys(dct1));
map((function(k){
return dict_dash_put_excl_(res,k,dict_dash_ref(dct2,k));
}),keys(dct2));
return res;
});
var o9021789 = dict();
return o9182488(o9021789);
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
var o9904785 = keys(dct);
return trampoline(loop(o9904785));
}))();
return res;
});
var dict_dash__gt_list = (function(dct){
return vector_dash__gt_list(dict_dash__gt_vector(dct));
});
var keys = (function(dct){
return ((function() {var o1910667 = (function(res){
for(var k in dct) {
       res = cons(string_dash__gt_symbol(k), res);
    }return res;
});
var o8719991 = _emptylst;
return o1910667(o8719991);
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
var o6226195 = keys;
var o5231270 = vals;
return trampoline(loop(o6226195,o5231270));
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
var o6158681 = obj1;
var o9765344 = obj2;
return loop(o6158681,o9765344);
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
var o4512711 = 0;
return trampoline(loop(o4512711));
}))();
}})()
;
}))();
} else {return (function() {if((dict_p_(obj1) && dict_p_(obj2))) {return ((function() {return ((function() {var o8436446 = (function(keys1,keys2){
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
var o1558241 = keys1;
return trampoline(loop(o1558241));
}))());
});
var o3616191 = keys(obj1);
var o5529170 = keys(obj2);
return o8436446(o3616191,o5529170);
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
return ((function() {var o3880803 = (function(parents){
return (function() {if(list_dash_find(parents,obj)) {return halt;
} else {return func(obj,arg,(function(el,arg){
return _per_recur_dash_protect(el,arg,func,halt,cons(obj,parents));
}));
}})()
;
});
var o4234406 = (function() {if(null_p_(rest)) {return _emptylst;
} else {return car(rest);
}})()
;
return o3880803(o4234406);
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
return ((function() {var o8018659 = (function(no_dash_newlines){
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
return (function() {if(list_p_(obj)) {return ((function() {return ((function() {var o9146244 = (function(sp,first){
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
var o8181040 = (_per_space(obj) > 30);
var o6699912 = true;
return o9146244(o8181040,o6699912);
}))();
}))();
} else {return (function() {if(vector_p_(obj)) {return ((function() {return ((function() {var o1167197 = (function(sp,first){
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
var o3528151 = (_per_space(obj) > 30);
var o6082576 = true;
return o1167197(o3528151,o6082576);
}))();
}))();
} else {return (function() {if(dict_p_(obj)) {return ((function() {return ((function() {var o9354282 = (function(sp,first){
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
var o2521055 = (_per_space(obj) > 30);
var o4140997 = true;
return o9354282(o2521055,o4140997);
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
var o7706732 = (function() {if(null_p_(rest)) {return false;
} else {return car(rest);
}})()
;
return o8018659(o7706732);
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


var util = require("util");var fs = require("fs");var reader = require("./reader");var grammar = require("./grammar");var js = require("./backends/js");var application_p_ = (function(form){
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
} else {return (function() {if(eq_p_(car(exp),"\uFDD1lambda")) {return ((function() {return list_dash_append(list("\uFDD1lambda",cadr(exp)),((function() {var o5368238 = (function(o9552852){
return (function() {if(vector_p_(o9552852)) {return vector_dash__gt_list(o9552852);
} else {return o9552852;
}})()
;
});
var o227138 = map(expand,cddr(exp));
return o5368238(o227138);
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
return ((function() {var o395882 = (function(x){
return eval(compile(list("\uFDD1lambda",list(x),list_dash_append(list("\uFDD1let",destructure(pattern,list("\uFDD1cdr",x),_emptylst)),((function() {var o3860517 = (function(o3304004){
return (function() {if(vector_p_(o3304004)) {return vector_dash__gt_list(o3304004);
} else {return o3304004;
}})()
;
});
var o399904 = body;
return o3860517(o399904);
}))())),macro_dash_generator["make-fresh"]()));
});
var o8572149 = gensym();
return o395882(o8572149);
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
return ((function() {var o7655497 = (function(sig){
return ((function() {var o5939160 = (function(name,pattern,body){
install_dash_macro(name,make_dash_macro(pattern,body));
return false;
});
var o4035633 = car(sig);
var o397529 = cdr(sig);
var o8213582 = cddr(form);
return o5939160(o4035633,o397529,o8213582);
}))();
});
var o7841759 = cadr(form);
return o7655497(o7841759);
}))();
}));
install_dash_macro("\uFDD1cond",(function(form){
return (function() {if(null_p_(cdr(form))) {return false;
} else {return ((function() {var o9549788 = (function(forms){
return ((function() {var o8536672 = (function(f){
return (function() {if(eq_p_(car(f),"\uFDD1else")) {return list_dash_append(list("\uFDD1begin"),((function() {var o2011873 = (function(o7630444){
return (function() {if(vector_p_(o7630444)) {return vector_dash__gt_list(o7630444);
} else {return o7630444;
}})()
;
});
var o4597065 = cdr(f);
return o2011873(o4597065);
}))());
} else {return list("\uFDD1if",car(f),list_dash_append(list("\uFDD1begin"),((function() {var o8631868 = (function(o958333){
return (function() {if(vector_p_(o958333)) {return vector_dash__gt_list(o958333);
} else {return o958333;
}})()
;
});
var o2964847 = cdr(f);
return o8631868(o2964847);
}))()),list_dash_append(list("\uFDD1cond"),((function() {var o8555329 = (function(o501919){
return (function() {if(vector_p_(o501919)) {return vector_dash__gt_list(o501919);
} else {return o501919;
}})()
;
});
var o5929987 = cdr(forms);
return o8555329(o5929987);
}))()));
}})()
;
});
var o3069528 = car(forms);
return o8536672(o3069528);
}))();
});
var o8333745 = cdr(form);
return o9549788(o8333745);
}))();
}})()
;
}));
install_dash_macro("\uFDD1begin",(function(form){
return list(list_dash_append(list("\uFDD1lambda",_emptylst),((function() {var o1397784 = (function(o1820016){
return (function() {if(vector_p_(o1820016)) {return vector_dash__gt_list(o1820016);
} else {return o1820016;
}})()
;
});
var o2166411 = cdr(form);
return o1397784(o2166411);
}))()));
}));
install_dash_macro("\uFDD1define",(function(form){
return ((function() {var o6406612 = (function(sig){
return (function() {if(list_p_(sig)) {return ((function() {return list("\uFDD1set",car(sig),list_dash_append(list("\uFDD1lambda",cdr(sig)),((function() {var o7686359 = (function(o9299628){
return (function() {if(vector_p_(o9299628)) {return vector_dash__gt_list(o9299628);
} else {return o9299628;
}})()
;
});
var o5638258 = cddr(form);
return o7686359(o5638258);
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
var o5616312 = cadr(form);
return o6406612(o5616312);
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
} else {return ((function() {var o4650561 = (function(sym,name,code){
return vector("__tco_call",(function() {return loop(cdr(lst),cdr(forms),dict_dash_merge(vars,dict(name,sym)),cons(list("\uFDD1define",car(lst),fold((function(el,acc){
return replace(acc,el,dict_dash_ref(vars,el));
}),code,keys(vars))),acc));
}));
});
var o166025 = car(lst);
var o20762 = car(car(forms));
var o7852921 = cadar(forms);
return o4650561(o166025,o20762,o7852921);
}))();
}})()
;
});
var o7677664 = syms;
var o8717454 = exprs;
var o6948942 = dict();
var o8933610 = _emptylst;
return trampoline(loop(o7677664,o8717454,o6948942,o8933610));
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
return ((function() {var o2231163 = (function(rexprs){
return ((function() {var o6357479 = (function(bottom){
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
var o5064541 = car(rexprs);
return o6357479(o5064541);
}))();
});
var o4842638 = reverse(exprs);
return o2231163(o4842638);
}))();
});
var tco_dash_call_p_ = (function(name,expr){
var _tco_p_ = (function(expr){
return (list_p_(expr) && _eq_(car(expr),"\uFDD1vector") && _eq_(cadr(expr),"__tco_call") && ((function() {var o4226809 = (function(lamb){
return ((function() {var o4456793 = (function(body){
return _eq_(car(body),name);
});
var o8179230 = caddr(lamb);
return o4456793(o8179230);
}))();
});
var o3119685 = caddr(expr);
return o4226809(o3119685);
}))());
});
return (function() {if(list_p_(expr)) {return (_tco_p_(expr) || fold((function(el,acc){
return (acc || tco_dash_call_p_(name,el));
}),false,expr));
} else {return false;
}})()
;
});
return ((function() {var o3327706 = (function(name,forms){
assert((null_p_(forms) || (list_p_(forms) && list_p_(car(forms)))),str("invalid let: ",form));
return ((function() {var o7783800 = (function(syms,body){
return ((function() {var o220386 = (function(tco_dash_ed){
return list(list_dash_append(list("\uFDD1lambda",_emptylst,list_dash_append(list("\uFDD1define",list_dash_append(list(name),((function() {var o8366516 = (function(o8835851){
return (function() {if(vector_p_(o8835851)) {return vector_dash__gt_list(o8835851);
} else {return o8835851;
}})()
;
});
var o8505555 = map(car,forms);
return o8366516(o8505555);
}))())),((function() {var o3339657 = (function(o5453003){
return (function() {if(vector_p_(o5453003)) {return vector_dash__gt_list(o5453003);
} else {return o5453003;
}})()
;
});
var o6289497 = tco_dash_ed;
return o3339657(o6289497);
}))())),((function() {var o9455982 = (function(o6127839){
return (function() {if(vector_p_(o6127839)) {return vector_dash__gt_list(o6127839);
} else {return o6127839;
}})()
;
});
var o1636470 = list_dash_append(generate_dash_defs(syms,forms),(function() {if(tco_dash_call_p_(name,tco_dash_ed)) {return list(list("\uFDD1trampoline",list_dash_append(list(name),((function() {var o9608172 = (function(o8130212){
return (function() {if(vector_p_(o8130212)) {return vector_dash__gt_list(o8130212);
} else {return o8130212;
}})()
;
});
var o5508548 = syms;
return o9608172(o5508548);
}))())));
} else {return list(list_dash_append(list(name),((function() {var o2351634 = (function(o1696093){
return (function() {if(vector_p_(o1696093)) {return vector_dash__gt_list(o1696093);
} else {return o1696093;
}})()
;
});
var o3743565 = syms;
return o2351634(o3743565);
}))()));
}})()
);
return o9455982(o1636470);
}))()));
});
var o8826438 = tco(body,name);
return o220386(o8826438);
}))();
});
var o9110082 = map((function(el){
return gensym();
}),forms);
var o5995953 = (function() {if(symbol_p_(cadr(form))) {return cdddr(form);
} else {return cddr(form);
}})()
;
return o7783800(o9110082,o5995953);
}))();
});
var o807134 = (function() {if(symbol_p_(cadr(form))) {return cadr(form);
} else {return gensym();
}})()
;
var o2344940 = (function() {if(symbol_p_(cadr(form))) {return caddr(form);
} else {return cadr(form);
}})()
;
return o3327706(o807134,o2344940);
}))();
}));
install_dash_macro("\uFDD1quote",(function(form){
return ((function() {var o5738248 = (function(src){
return ((function() {var o1937589 = (function(q){
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
var o5707129 = (function(e){
return list("\uFDD1quote",e);
});
return o1937589(o5707129);
}))();
});
var o1480059 = cadr(form);
return o5738248(o1480059);
}))();
}));
install_dash_macro("\uFDD1quasiquote",(function(form){
return ((function() {var o1478945 = (function(src){
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
var o8228466 = cadr(form);
return o1478945(o8228466);
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
} else {return ((function() {var o8675311 = (function(el){
return (function() {if((list_p_(el) && eq_p_(car(el),"\uFDD1unquote-splicing"))) {return ((function() {var o4746195 = (function(src){
return quote_dash_splice(cdr(lst),cons(src,list_dash_push(lst_dash_acc,acc)),_emptylst);
});
var o3193156 = (function() {if(literal_p_(cadr(el))) {return ((function() {return list("\uFDD1list",cadr(el));
}))();
} else {return (function() {if(vector_p_(cadr(el))) {return ((function() {return list("\uFDD1vector->list",cadr(el));
}))();
} else {return (function() {if(dict_p_(cadr(el))) {return ((function() {pp(el);
throw("cannot splice dict");
}))();
} else {return ((function() {return ((function() {var o2714698 = (function(v){
return list("\uFDD1let",list(list(v,cadr(el))),list("\uFDD1if",list("\uFDD1vector?",v),list("\uFDD1vector->list",v),v));
});
var o9062933 = gensym();
return o2714698(o9062933);
}))();
}))();
}})()
;
}})()
;
}})()
;
return o4746195(o3193156);
}))();
} else {return quote_dash_splice(cdr(lst),lst_dash_acc,cons(list("\uFDD1quasiquote",el),acc));
}})()
;
});
var o6154861 = car(lst);
return o8675311(o6154861);
}))();
}})()
;
});
return ((function() {var o925568 = (function(res){
return (function() {if(eq_p_(length(res),1)) {return car(res);
} else {return cons("\uFDD1list-append",reverse(res));
}})()
;
});
var o6920350 = quote_dash_splice(lst,_emptylst,_emptylst);
return o925568(o6920350);
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
return ((function() {var o3269406 = (function(expr_p_,_per_parse){
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
return ((function() {var o3114428 = (function(args){
return generator["write-lambda"](args,cddr(form),expr_p_,_per_parse);
});
var o4391666 = cadr(form);
return o3114428(o4391666);
}))();
});
var parse_dash_func_dash_call = (function(form){
return ((function() {var o5267730 = (function(func){
assert((symbol_p_(func) || list_p_(func)),str("operator is not a procedure: ",inspect(form)));
return generator["write-func-call"](func,cdr(form),expr_p_,_per_parse);
});
var o2733601 = car(form);
return o5267730(o2733601);
}))();
});
var parse_dash_quoted = (function(form){
return ((function() {var o9109078 = (function(src){
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
var o8555045 = cadr(form);
return o9109078(o8555045);
}))();
});
var parse_dash_list = (function(form){
return ((function() {var o6936101 = (function(first){
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
var o9797041 = car(form);
return o6936101(o9797041);
}))();
});
var parse_dash_vector = (function(vec){
return parse_dash_list(cons("\uFDD1vector",vector_dash__gt_list(vec)));
});
var parse_dash_dict = (function(dict){
return ((function() {var o1197237 = (function(lst,i){
return ((function() {var o5285644 = (function(qlst){
return parse_dash_list(cons("\uFDD1dict",qlst));
});
var o2085130 = map((function(el){
i = (i + 1);
return (function() {if(eq_p_(((i - 1) % 2),0)) {return list("\uFDD1%quoted",el);
} else {return el;
}})()
;
}),lst);
return o5285644(o2085130);
}))();
});
var o5766248 = dict_dash__gt_list(dict);
var o3109129 = 0;
return o1197237(o5766248,o3109129);
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
var o6046205 = opt(expr_p_,false);
var o8710599 = (function(form){
var o6046205 = vector_dash__gt_list(Array.prototype.slice.call(arguments, 1));
return parse(form,generator,opt(o6046205,false));
});
return o3269406(o6046205,o8710599);
}))();
});
var read = (function(src){
return reader["read"](src);
});
var compile = (function(src,generator){
(function() {if(not(macro_dash_generator)) {macro_dash_generator = generator;
} else {return false;
}})()
;
return ((function() {var o2297493 = (function(forms){
(function() {if(eq_p_(car(forms),"\uFDD1begin")) {return for_dash_each((function(form){
return parse(expand(form),generator);
}),cdr(forms));
} else {return parse(expand(forms),generator);
}})()
;
return generator["get-code"]();
});
var o6815350 = (function() {if(string_p_(src)) {return read(src);
} else {return src;
}})()
;
return o2297493(o6815350);
}))();
});
module["exports"] = dict("\uFDD1read",read,"\uFDD1expand",expand,"\uFDD1parse",parse,"\uFDD1compile",compile,"\uFDD1install-macro",install_dash_macro,"\uFDD1pp",pp,"\uFDD1set-macro-generator",(function(g){
return (function() {if(not(macro_dash_generator)) {macro_dash_generator = g;
} else {return false;
}})()
;
}));

