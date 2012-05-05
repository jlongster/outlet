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
var symbol_dash__gt_key = (function(sym){
return ("\uFDD0" + sym["substring"](1));
});
var string_dash__gt_key = (function(str){
return ("\uFDD0" + str);
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


var fs = require("fs");var ast = require("./ast");var chars_dash_whitespace = " \n\t\r";
var chars_dash_special = "(){}[],@'`:";
var chars_dash_delim = str(chars_dash_whitespace,chars_dash_special,";");
var _in_ = (function(str,char){
return number_p_(vector_dash_find(str,char));
});
var vec_dash_getter = (function(i){
return (function(vec){
return vector_dash_ref(vec,i);
});
});
var read = (function(src){
var index = 0;
var len = vector_dash_length(src);
var lineno = 0;
var colno = 0;
var current = (function() {return (function() {if(finished()) {return "";
} else {return vector_dash_ref(src,index);
}})()
;
});
var previous = (function() {return vector_dash_ref(src,(index - 1));
});
var forward = (function() {index = (index + 1);
return (function() {if(_eq__eq_(previous(),"\n")) {return ((function() {lineno = (lineno + 1);
colno = 0;
}))();
} else {colno = (colno + 1);
}})()
;
});
var back = (function() {index = (index - 1);
return (function() {if(_eq__eq_(current(),"\n")) {lineno = (lineno - 1);
} else {return false;
}})()
;
});
var finished = (function() {return (index >= len);
});
var skip_dash_whitespace = (function() {return ((function() {var loop = (function() {return (function() {if(_in_(chars_dash_whitespace,current())) {return ((function() {forward();
return vector("__tco_call",(function() {return loop();
}));
}))();
} else {return false;
}})()
;
});
return trampoline(loop());
}))();
});
var parse_dash_string = (function(lineno,colno){
return ((function() {var loop = (function(s){
forward();
return (function() {if(_eq__eq_(current(),"\\")) {return ((function() {forward();
return loop(str(s,((function() {var o2 = (function(c){
return (function() {if(_eq__eq_(c,"n")) {return ((function() {return "\n";
}))();
} else {return (function() {if(_eq__eq_(c,"t")) {return ((function() {return "\t";
}))();
} else {return (function() {if(_eq__eq_(c,"r")) {return ((function() {return "\r";
}))();
} else {return ((function() {return c;
}))();
}})()
;
}})()
;
}})()
;
});
var o3 = current();
return o2(o3);
}))()));
}))();
} else {return (function() {if(_eq__eq_(current(),"\"")) {return ((function() {return make_dash_token("\uFDD1STRING",s,lineno,colno);
}))();
} else {return ((function() {return loop(str(s,current()));
}))();
}})()
;
}})()
;
});
var o1 = "";
return loop(o1);
}))();
});
var parse_dash_token = (function(s,lineno,colno){
return (function() {if(s["match"](RegExp("^[-+]?[0-9]+$"))) {return ((function() {return make_dash_token("\uFDD1INTEGER",s,lineno,colno);
}))();
} else {return (function() {if(s["match"](RegExp("^[-+]?[0-9]+\\.[0-9]*$"))) {return ((function() {return make_dash_token("\uFDD1FLOAT",s,lineno,colno);
}))();
} else {return (function() {if(s["match"](RegExp("^[-+]?0x"))) {return ((function() {return ((function() {var o4 = (function(m,prefix){
return (function() {if(m) {return make_dash_token("\uFDD1HEX",str(prefix,vector_dash_ref(m,1)),lineno,colno);
} else {throw(str("invalid hex value: ",s));
}})()
;
});
var o5 = s["match"](RegExp("0x([0-9a-fA-F]+)$"));
var o6 = (function() {if(_eq__eq_(vector_dash_ref(s,0),"-")) {return "-";
} else {return "";
}})()
;
return o4(o5,o6);
}))();
}))();
} else {return (function() {if((_eq__eq_(s,"#f") || _eq__eq_(s,"#t"))) {return ((function() {return make_dash_token("\uFDD1BOOLEAN",s,lineno,colno);
}))();
} else {return ((function() {return make_dash_token("\uFDD1SYMBOL",s,lineno,colno);
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
var parse_dash_comment = (function(lineno,colno){
return ((function() {var loop = (function(s){
forward();
return (function() {if((finished() || _eq__eq_(current(),"\n"))) {return make_dash_token("\uFDD1COMMENT",s,lineno,colno);
} else {return vector("__tco_call",(function() {return loop(str(s,current()));
}));
}})()
;
});
var o7 = "";
return trampoline(loop(o7));
}))();
});
var unique_dash_obj = list(true);
var make_dash_token = (function(type,data,lineno,colno){
return vector(unique_dash_obj,type,data,lineno,colno);
});
var token_dash_type = vec_dash_getter(1);
var token_dash_data = vec_dash_getter(2);
var token_dash_lineno = vec_dash_getter(3);
var token_dash_colno = vec_dash_getter(4);
var token_p_ = (function(tok){
return (vector_p_(tok) && _eq__eq_(vector_dash_ref(tok,0),unique_dash_obj));
});
var get_dash_token = (function() {skip_dash_whitespace();
return ((function() {var o8 = (function(c,lineno,colno){
return (function() {if(_in_(chars_dash_special,c)) {return ((function() {forward();
return make_dash_token("\uFDD1SPECIAL",c,lineno,colno);
}))();
} else {return (function() {if(_eq__eq_(c,"\"")) {return ((function() {return ((function() {var o12 = (function(s){
forward();
return s;
});
var o13 = parse_dash_string(lineno,colno);
return o12(o13);
}))();
}))();
} else {return (function() {if(_eq__eq_(c,";")) {return ((function() {return parse_dash_comment(lineno,colno);
}))();
} else {return (function() {if(_eq__eq_(c,"")) {return ((function() {return false;
}))();
} else {return (function() {if(finished()) {return ((function() {return false;
}))();
} else {return ((function() {return ((function() {var loop = (function(s){
return (function() {if((_in_(chars_dash_delim,current()) || finished())) {return parse_dash_token(s,lineno,colno);
} else {return ((function() {forward();
return vector("__tco_call",(function() {return loop(str(s,previous()));
}));
}))();
}})()
;
});
var o14 = "";
return trampoline(loop(o14));
}))();
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
var o9 = current();
var o10 = lineno;
var o11 = colno;
return o8(o9,o10,o11);
}))();
});
var token_dash__gt_exp = (function(token){
return ((function() {var o15 = (function(type,data){
return (function() {if(_eq__eq_(type,"\uFDD1STRING")) {return ((function() {return data;
}))();
} else {return (function() {if(_eq__eq_(type,"\uFDD1SYMBOL")) {return ((function() {return string_dash__gt_symbol(data);
}))();
} else {return (function() {if(_eq__eq_(type,"\uFDD1BOOLEAN")) {return ((function() {return (function() {if(_eq__eq_(data,"#f")) {return false;
} else {return true;
}})()
;
}))();
} else {return (function() {if(_eq__eq_(type,"\uFDD1INTEGER")) {return ((function() {return parseInt(data);
}))();
} else {return (function() {if(_eq__eq_(type,"\uFDD1FLOAT")) {return ((function() {return parseFloat(data);
}))();
} else {return (function() {if(_eq__eq_(type,"\uFDD1HEX")) {return ((function() {return parseInt(data,16);
}))();
} else {return ((function() {throw(str("cannot convert token to exp: ",token));
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
var o16 = token_dash_type(token);
var o17 = token_dash_data(token);
return o15(o16,o17);
}))();
});
var special_p_ = (function(t,chars){
return (token_p_(t) && _eq__eq_(token_dash_type(t),"\uFDD1SPECIAL") && _in_(chars,token_dash_data(t)));
});
var compound_dash_start_p_ = (function(t){
return (special_p_(t,"(") || special_p_(t,"[") || special_p_(t,"{"));
});
var compound_dash_end_p_ = (function(t){
return (special_p_(t,")") || special_p_(t,"]") || special_p_(t,"}"));
});
var end_p_ = (function(t){
return (token_p_(t) && _eq__eq_(token_dash_type(t),"\uFDD1END"));
});
var read_dash_exp = (function() {return ((function() {var o18 = (function(token){
return (function() {if(not(token)) {return ((function() {return make_dash_token("\uFDD1END",false);
}))();
} else {return (function() {if(compound_dash_end_p_(token)) {return ((function() {return token;
}))();
} else {return (function() {if(compound_dash_start_p_(token)) {return ((function() {return ((function() {var loop = (function(lst,exp){
return (function() {if((end_p_(exp) || compound_dash_end_p_(exp))) {return ((function() {var in_dash_list_p_ = special_p_(token,"(");
var in_dash_vector_p_ = special_p_(token,"[");
var in_dash_dict_p_ = special_p_(token,"{");
return (function() {if((in_dash_list_p_ && special_p_(exp,")"))) {return ((function() {return ast["make-node"]("\uFDD1LIST",reverse(lst),token_dash_lineno(token),token_dash_colno(token));
}))();
} else {return (function() {if((in_dash_vector_p_ && special_p_(exp,"]"))) {return ((function() {return ast["make-node"]("\uFDD1VECTOR",reverse(lst),token_dash_lineno(token),token_dash_colno(token));
}))();
} else {return (function() {if((in_dash_dict_p_ && special_p_(exp,"}"))) {return ((function() {return ast["make-node"]("\uFDD1DICT",reverse(lst),token_dash_lineno(token),token_dash_colno(token));
}))();
} else {return ((function() {throw(str("unterminated ",(function() {if(list_p_) {return ((function() {return "list";
}))();
} else {return (function() {if(vector_p_) {return ((function() {return "vector";
}))();
} else {return (function() {if(dict_p_) {return ((function() {return "dict";
}))();
} else {return false;
}})()
;
}})()
;
}})()
));
}))();
}})()
;
}})()
;
}})()
;
}))();
} else {return ((function() {return vector("__tco_call",(function() {return loop(cons(exp,lst),read_dash_exp());
}));
}))();
}})()
;
});
var o20 = _emptylst;
var o21 = read_dash_exp();
return trampoline(loop(o20,o21));
}))();
}))();
} else {return (function() {if(special_p_(token,"'")) {return ((function() {return ast["make-node"]("\uFDD1LIST",list(ast["make-node"]("\uFDD1ATOM","\uFDD1quote",token_dash_lineno(token),token_dash_colno(token)),read_dash_exp()),token_dash_lineno(token),token_dash_colno(token));
}))();
} else {return (function() {if(special_p_(token,":")) {return ((function() {return ((function() {var o22 = (function(e){
(function() {if((not(ast["atom?"](e)) || not(symbol_p_(ast["node-data"](e))))) {throw(str("invalid key expression: ",ast["node-data"](e)));
} else {return false;
}})()
;
return ast["make-node"]("\uFDD1ATOM",symbol_dash__gt_key(ast["node-data"](e)),token_dash_lineno(token),token_dash_colno(token));
});
var o23 = read_dash_exp();
return o22(o23);
}))();
}))();
} else {return (function() {if(special_p_(token,"`")) {return ((function() {return ast["make-node"]("\uFDD1LIST",list(ast["make-node"]("\uFDD1ATOM","\uFDD1quasiquote",token_dash_lineno(token),token_dash_colno(token)),read_dash_exp()),token_dash_lineno(token),token_dash_colno(token));
}))();
} else {return (function() {if(special_p_(token,",")) {return ((function() {return ((function() {var o24 = (function(next){
return (function() {if(_eq__eq_(next,"@")) {return ((function() {forward();
return ast["make-node"]("\uFDD1LIST",list(ast["make-node"]("\uFDD1ATOM","\uFDD1unquote-splicing",token_dash_lineno(token),token_dash_colno(token)),read_dash_exp()),token_dash_lineno(token),token_dash_colno(token));
}))();
} else {return ((function() {return ast["make-node"]("\uFDD1LIST",list(ast["make-node"]("\uFDD1ATOM","\uFDD1unquote",token_dash_lineno(token),token_dash_colno(token)),read_dash_exp()),token_dash_lineno(token),token_dash_colno(token));
}))();
}})()
;
});
var o25 = current();
return o24(o25);
}))();
}))();
} else {return ((function() {return (function() {if(_eq__eq_(token_dash_type(token),"\uFDD1COMMENT")) {return read_dash_exp();
} else {return ast["make-node"]("\uFDD1ATOM",token_dash__gt_exp(token),token_dash_lineno(token),token_dash_colno(token));
}})()
;
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
var o19 = get_dash_token();
return o18(o19);
}))();
});
return ((function() {var loop = (function(e_star_,e){
return (function() {if(end_p_(e)) {return (function() {if(_eq__eq_(length(e_star_),1)) {return car(e_star_);
} else {return ast["make-node"]("\uFDD1LIST",cons(ast["make-node"]("\uFDD1ATOM","\uFDD1begin",0,1),reverse(e_star_)),0,0);
}})()
;
} else {return vector("__tco_call",(function() {return loop(cons(e,e_star_),read_dash_exp());
}));
}})()
;
});
var o26 = _emptylst;
var o27 = read_dash_exp();
return trampoline(loop(o26,o27));
}))();
});
module["exports"] = dict("\uFDD1read",read);

