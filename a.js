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
} else {return (function() {if((vector_p_(obj1) && vector_p_(obj2))) {return ((function() {return ((function() {var loop = (function(i){
return (function() {if(((i < obj1["length"]) && (i < obj2["length"]))) {return ((function() {return true;
}))();
} else {return (function() {if(((i < obj1["length"]) || (i < obj2["length"]))) {return ((function() {return false;
}))();
} else {return ((function() {return (function() {if(equal_p_(vector_dash_ref(obj1,i),vector_dash_ref(obj2,i))) {return loop((i + 1));
} else {return false;
}})()
;
}))();
}})()
;
}})()
;
});
var o39 = 0;
return loop(o39);
}))();
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


var __compiler = require('/Users/james/projects/outlet/backends/../compiler');
var __generator = require('/Users/james/projects/outlet/backends/../backends/js');
var read = __compiler.read;
((function() {true;
true;
true;
true;
var foo = (function(x,y,z){
return (x + y + z);
});
((function() {var o30 = (function(comp,res){
return (function() {if(not(comp(res,6))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),": ",util["inspect"](list("\uFDD1foo",1,2,3))," got ",util["inspect"](res)," but expected ",util["inspect"](6)));
} else {return false;
}})()
;
});
var o31 = _eq_;
var o32 = eval(__compiler["compile"](list("\uFDD1foo",1,2,3),__generator()));
return o30(o31,o32);
}))();
var bar = (function(t){
return (foo(1,2,3) * t);
});
((function() {var o33 = (function(comp,res){
return (function() {if(not(comp(res,30))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),": ",util["inspect"](list("\uFDD1bar",5))," got ",util["inspect"](res)," but expected ",util["inspect"](30)));
} else {return false;
}})()
;
});
var o34 = _eq_;
var o35 = eval(__compiler["compile"](list("\uFDD1bar",5),__generator()));
return o33(o34,o35);
}))();
((function() {var o36 = (function(comp,res){
return (function() {if(not(comp(res,42))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),": ",util["inspect"](list(list("\uFDD1lambda",list("\uFDD1x"),list("\uFDD1bar",list("\uFDD1+","\uFDD1x",2))),5))," got ",util["inspect"](res)," but expected ",util["inspect"](42)));
} else {return false;
}})()
;
});
var o37 = _eq_;
var o38 = eval(__compiler["compile"](list(list("\uFDD1lambda",list("\uFDD1x"),list("\uFDD1bar",list("\uFDD1+","\uFDD1x",2))),5),__generator()));
return o36(o37,o38);
}))();
var foo = (function(x,y,z){
return (x + y + z);
});
((function() {var o39 = (function(comp,res){
return (function() {if(not(comp(res,6))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),": ",util["inspect"](list("\uFDD1foo",1,2,3))," got ",util["inspect"](res)," but expected ",util["inspect"](6)));
} else {return false;
}})()
;
});
var o40 = _eq_;
var o41 = eval(__compiler["compile"](list("\uFDD1foo",1,2,3),__generator()));
return o39(o40,o41);
}))();
((function() {var o42 = (function(comp,res){
return (function() {if(not(comp(res,"onetwo"))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),": ",util["inspect"](list("\uFDD1str","one","two"))," got ",util["inspect"](res)," but expected ",util["inspect"]("onetwo")));
} else {return false;
}})()
;
});
var o43 = _eq_;
var o44 = eval(__compiler["compile"](list("\uFDD1str","one","two"),__generator()));
return o42(o43,o44);
}))();
((function() {var o45 = (function(comp,res){
return (function() {if(not(comp(res,"one2three#f"))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),": ",util["inspect"](list("\uFDD1str","one",2,list("\uFDD1quote","\uFDD1three"),false))," got ",util["inspect"](res)," but expected ",util["inspect"]("one2three#f")));
} else {return false;
}})()
;
});
var o46 = _eq_;
var o47 = eval(__compiler["compile"](list("\uFDD1str","one",2,list("\uFDD1quote","\uFDD1three"),false),__generator()));
return o45(o46,o47);
}))();
((function() {var o48 = (function(comp,res){
return (function() {if(not(comp(res,"(1 2 3)one"))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),": ",util["inspect"](list("\uFDD1str",list("\uFDD1quote",list(1,2,3)),"one"))," got ",util["inspect"](res)," but expected ",util["inspect"]("(1 2 3)one")));
} else {return false;
}})()
;
});
var o49 = _eq_;
var o50 = eval(__compiler["compile"](list("\uFDD1str",list("\uFDD1quote",list(1,2,3)),"one"),__generator()));
return o48(o49,o50);
}))();
((function() {var o51 = (function(comp,res){
return (function() {if(not(comp(res,"[1 2 3]one"))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),": ",util["inspect"](list("\uFDD1str",vector(1,2,3),"one"))," got ",util["inspect"](res)," but expected ",util["inspect"]("[1 2 3]one")));
} else {return false;
}})()
;
});
var o52 = _eq_;
var o53 = eval(__compiler["compile"](list("\uFDD1str",vector(1,2,3),"one"),__generator()));
return o51(o52,o53);
}))();
((function() {var o54 = (function(comp,res){
return (function() {if(not(comp(res,"\uFDD1foo"))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),": ",util["inspect"](list("\uFDD1string->symbol","foo"))," got ",util["inspect"](res)," but expected ",util["inspect"]("\uFDD1foo")));
} else {return false;
}})()
;
});
var o55 = _eq_;
var o56 = eval(__compiler["compile"](list("\uFDD1string->symbol","foo"),__generator()));
return o54(o55,o56);
}))();
((function() {var o57 = (function(comp,res){
return (function() {if(not(comp(res,"\uFDD1foo-?!><%="))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),": ",util["inspect"](list("\uFDD1string->symbol","foo-?!><%="))," got ",util["inspect"](res)," but expected ",util["inspect"]("\uFDD1foo-?!><%=")));
} else {return false;
}})()
;
});
var o58 = _eq_;
var o59 = eval(__compiler["compile"](list("\uFDD1string->symbol","foo-?!><%="),__generator()));
return o57(o58,o59);
}))();
((function() {var o60 = (function(comp,res){
return (function() {if(not(comp(res,"bar"))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),": ",util["inspect"](list("\uFDD1symbol->string",list("\uFDD1quote","\uFDD1bar")))," got ",util["inspect"](res)," but expected ",util["inspect"]("bar")));
} else {return false;
}})()
;
});
var o61 = _eq_;
var o62 = eval(__compiler["compile"](list("\uFDD1symbol->string",list("\uFDD1quote","\uFDD1bar")),__generator()));
return o60(o61,o62);
}))();
((function() {var o63 = (function(comp,res){
return (function() {if(not(comp(res,"bar-?!><%="))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),": ",util["inspect"](list("\uFDD1symbol->string",list("\uFDD1quote","\uFDD1bar-?!><%=")))," got ",util["inspect"](res)," but expected ",util["inspect"]("bar-?!><%=")));
} else {return false;
}})()
;
});
var o64 = _eq_;
var o65 = eval(__compiler["compile"](list("\uFDD1symbol->string",list("\uFDD1quote","\uFDD1bar-?!><%=")),__generator()));
return o63(o64,o65);
}))();
((function() {var o66 = (function(comp,res){
return (function() {if(not(comp(res,100))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),": ",util["inspect"](list(list("\uFDD1lambda",list("\uFDD1x"),list("\uFDD1set!","\uFDD1x",10),list("\uFDD1*","\uFDD1x","\uFDD1x")),5))," got ",util["inspect"](res)," but expected ",util["inspect"](100)));
} else {return false;
}})()
;
});
var o67 = _eq_;
var o68 = eval(__compiler["compile"](list(list("\uFDD1lambda",list("\uFDD1x"),list("\uFDD1set!","\uFDD1x",10),list("\uFDD1*","\uFDD1x","\uFDD1x")),5),__generator()));
return o66(o67,o68);
}))();
((function() {var o69 = (function(comp,res){
return (function() {if(not(comp(res,3))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),": ",util["inspect"](list("\uFDD1+",1,2))," got ",util["inspect"](res)," but expected ",util["inspect"](3)));
} else {return false;
}})()
;
});
var o70 = _eq_;
var o71 = eval(__compiler["compile"](list("\uFDD1+",1,2),__generator()));
return o69(o70,o71);
}))();
((function() {var o72 = (function(comp,res){
return (function() {if(not(comp(res,-1))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),": ",util["inspect"](list("\uFDD1-",1,2))," got ",util["inspect"](res)," but expected ",util["inspect"](-1)));
} else {return false;
}})()
;
});
var o73 = _eq_;
var o74 = eval(__compiler["compile"](list("\uFDD1-",1,2),__generator()));
return o72(o73,o74);
}))();
((function() {var o75 = (function(comp,res){
return (function() {if(not(comp(res,12))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),": ",util["inspect"](list("\uFDD1*",3,4))," got ",util["inspect"](res)," but expected ",util["inspect"](12)));
} else {return false;
}})()
;
});
var o76 = _eq_;
var o77 = eval(__compiler["compile"](list("\uFDD1*",3,4),__generator()));
return o75(o76,o77);
}))();
((function() {var o78 = (function(comp,res){
return (function() {if(not(comp(res,2.5))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),": ",util["inspect"](list("\uFDD1/",10,4))," got ",util["inspect"](res)," but expected ",util["inspect"](2.5)));
} else {return false;
}})()
;
});
var o79 = _eq_;
var o80 = eval(__compiler["compile"](list("\uFDD1/",10,4),__generator()));
return o78(o79,o80);
}))();
((function() {var o81 = (function(comp,res){
return (function() {if(not(comp(res,2))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),": ",util["inspect"](list("\uFDD1%",12,10))," got ",util["inspect"](res)," but expected ",util["inspect"](2)));
} else {return false;
}})()
;
});
var o82 = _eq_;
var o83 = eval(__compiler["compile"](list("\uFDD1%",12,10),__generator()));
return o81(o82,o83);
}))();
((function() {var o84 = (function(comp,res){
return (function() {if(not(comp(res,true))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),": ",util["inspect"](list("\uFDD1<",1,2))," got ",util["inspect"](res)," but expected ",util["inspect"](true)));
} else {return false;
}})()
;
});
var o85 = _eq_;
var o86 = eval(__compiler["compile"](list("\uFDD1<",1,2),__generator()));
return o84(o85,o86);
}))();
((function() {var o87 = (function(comp,res){
return (function() {if(not(comp(res,false))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),": ",util["inspect"](list("\uFDD1<",5,4))," got ",util["inspect"](res)," but expected ",util["inspect"](false)));
} else {return false;
}})()
;
});
var o88 = _eq_;
var o89 = eval(__compiler["compile"](list("\uFDD1<",5,4),__generator()));
return o87(o88,o89);
}))();
((function() {var o90 = (function(comp,res){
return (function() {if(not(comp(res,true))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),": ",util["inspect"](list("\uFDD1>",2,1))," got ",util["inspect"](res)," but expected ",util["inspect"](true)));
} else {return false;
}})()
;
});
var o91 = _eq_;
var o92 = eval(__compiler["compile"](list("\uFDD1>",2,1),__generator()));
return o90(o91,o92);
}))();
((function() {var o93 = (function(comp,res){
return (function() {if(not(comp(res,false))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),": ",util["inspect"](list("\uFDD1>",4,5))," got ",util["inspect"](res)," but expected ",util["inspect"](false)));
} else {return false;
}})()
;
});
var o94 = _eq_;
var o95 = eval(__compiler["compile"](list("\uFDD1>",4,5),__generator()));
return o93(o94,o95);
}))();
((function() {var o96 = (function(comp,res){
return (function() {if(not(comp(res,list(1,2,3)))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),": ",util["inspect"](list("\uFDD1list",1,2,3))," got ",util["inspect"](res)," but expected ",util["inspect"](list(1,2,3))));
} else {return false;
}})()
;
});
var o97 = _eq_;
var o98 = eval(__compiler["compile"](list("\uFDD1list",1,2,3),__generator()));
return o96(o97,o98);
}))();
((function() {var o99 = (function(comp,res){
return (function() {if(not(comp(res,list(1)))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),": ",util["inspect"](list("\uFDD1cons",1,list("\uFDD1quote",_emptylst)))," got ",util["inspect"](res)," but expected ",util["inspect"](list(1))));
} else {return false;
}})()
;
});
var o100 = _eq_;
var o101 = eval(__compiler["compile"](list("\uFDD1cons",1,list("\uFDD1quote",_emptylst)),__generator()));
return o99(o100,o101);
}))();
((function() {var o102 = (function(comp,res){
return (function() {if(not(comp(res,2))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),": ",util["inspect"](list("\uFDD1car",list("\uFDD1cons",2,list("\uFDD1cons",3,list("\uFDD1quote",_emptylst)))))," got ",util["inspect"](res)," but expected ",util["inspect"](2)));
} else {return false;
}})()
;
});
var o103 = _eq_;
var o104 = eval(__compiler["compile"](list("\uFDD1car",list("\uFDD1cons",2,list("\uFDD1cons",3,list("\uFDD1quote",_emptylst)))),__generator()));
return o102(o103,o104);
}))();
((function() {var o105 = (function(comp,res){
return (function() {if(not(comp(res,list(3)))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),": ",util["inspect"](list("\uFDD1cdr",list("\uFDD1cons",2,list("\uFDD1cons",3,list("\uFDD1quote",_emptylst)))))," got ",util["inspect"](res)," but expected ",util["inspect"](list(3))));
} else {return false;
}})()
;
});
var o106 = _eq_;
var o107 = eval(__compiler["compile"](list("\uFDD1cdr",list("\uFDD1cons",2,list("\uFDD1cons",3,list("\uFDD1quote",_emptylst)))),__generator()));
return o105(o106,o107);
}))();
var foo = list(list(1,2,3),list(4,5,6),list(7,8,9),10);
((function() {var o108 = (function(comp,res){
return (function() {if(not(comp(res,list(4,5,6)))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),": ",util["inspect"](list("\uFDD1cadr","\uFDD1foo"))," got ",util["inspect"](res)," but expected ",util["inspect"](list(4,5,6))));
} else {return false;
}})()
;
});
var o109 = _eq_;
var o110 = eval(__compiler["compile"](list("\uFDD1cadr","\uFDD1foo"),__generator()));
return o108(o109,o110);
}))();
((function() {var o111 = (function(comp,res){
return (function() {if(not(comp(res,list(list(7,8,9),10)))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),": ",util["inspect"](list("\uFDD1cddr","\uFDD1foo"))," got ",util["inspect"](res)," but expected ",util["inspect"](list(list(7,8,9),10))));
} else {return false;
}})()
;
});
var o112 = _eq_;
var o113 = eval(__compiler["compile"](list("\uFDD1cddr","\uFDD1foo"),__generator()));
return o111(o112,o113);
}))();
((function() {var o114 = (function(comp,res){
return (function() {if(not(comp(res,list(2,3)))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),": ",util["inspect"](list("\uFDD1cdar","\uFDD1foo"))," got ",util["inspect"](res)," but expected ",util["inspect"](list(2,3))));
} else {return false;
}})()
;
});
var o115 = _eq_;
var o116 = eval(__compiler["compile"](list("\uFDD1cdar","\uFDD1foo"),__generator()));
return o114(o115,o116);
}))();
((function() {var o117 = (function(comp,res){
return (function() {if(not(comp(res,list(7,8,9)))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),": ",util["inspect"](list("\uFDD1caddr","\uFDD1foo"))," got ",util["inspect"](res)," but expected ",util["inspect"](list(7,8,9))));
} else {return false;
}})()
;
});
var o118 = _eq_;
var o119 = eval(__compiler["compile"](list("\uFDD1caddr","\uFDD1foo"),__generator()));
return o117(o118,o119);
}))();
((function() {var o120 = (function(comp,res){
return (function() {if(not(comp(res,list(10)))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),": ",util["inspect"](list("\uFDD1cdddr","\uFDD1foo"))," got ",util["inspect"](res)," but expected ",util["inspect"](list(10))));
} else {return false;
}})()
;
});
var o121 = _eq_;
var o122 = eval(__compiler["compile"](list("\uFDD1cdddr","\uFDD1foo"),__generator()));
return o120(o121,o122);
}))();
((function() {var o123 = (function(comp,res){
return (function() {if(not(comp(res,2))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),": ",util["inspect"](list("\uFDD1cadar","\uFDD1foo"))," got ",util["inspect"](res)," but expected ",util["inspect"](2)));
} else {return false;
}})()
;
});
var o124 = _eq_;
var o125 = eval(__compiler["compile"](list("\uFDD1cadar","\uFDD1foo"),__generator()));
return o123(o124,o125);
}))();
((function() {var o126 = (function(comp,res){
return (function() {if(not(comp(res,list(3)))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),": ",util["inspect"](list("\uFDD1cddar","\uFDD1foo"))," got ",util["inspect"](res)," but expected ",util["inspect"](list(3))));
} else {return false;
}})()
;
});
var o127 = _eq_;
var o128 = eval(__compiler["compile"](list("\uFDD1cddar","\uFDD1foo"),__generator()));
return o126(o127,o128);
}))();
((function() {var o129 = (function(comp,res){
return (function() {if(not(comp(res,4))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),": ",util["inspect"](list("\uFDD1caadr","\uFDD1foo"))," got ",util["inspect"](res)," but expected ",util["inspect"](4)));
} else {return false;
}})()
;
});
var o130 = _eq_;
var o131 = eval(__compiler["compile"](list("\uFDD1caadr","\uFDD1foo"),__generator()));
return o129(o130,o131);
}))();
((function() {var o132 = (function(comp,res){
return (function() {if(not(comp(res,list(5,6)))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),": ",util["inspect"](list("\uFDD1cdadr","\uFDD1foo"))," got ",util["inspect"](res)," but expected ",util["inspect"](list(5,6))));
} else {return false;
}})()
;
});
var o133 = _eq_;
var o134 = eval(__compiler["compile"](list("\uFDD1cdadr","\uFDD1foo"),__generator()));
return o132(o133,o134);
}))();
((function() {var o135 = (function(comp,res){
return (function() {if(not(comp(res,"\uFDD1z"))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),": ",util["inspect"](list("\uFDD1list-ref",list("\uFDD1quote",list("\uFDD1x","\uFDD1y","\uFDD1z")),2))," got ",util["inspect"](res)," but expected ",util["inspect"]("\uFDD1z")));
} else {return false;
}})()
;
});
var o136 = _eq_;
var o137 = eval(__compiler["compile"](list("\uFDD1list-ref",list("\uFDD1quote",list("\uFDD1x","\uFDD1y","\uFDD1z")),2),__generator()));
return o135(o136,o137);
}))();
((function() {var o138 = (function(comp,res){
return (function() {if(not(comp(res,3))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),": ",util["inspect"](list("\uFDD1length",list("\uFDD1quote",list("\uFDD1x","\uFDD1y","\uFDD1z"))))," got ",util["inspect"](res)," but expected ",util["inspect"](3)));
} else {return false;
}})()
;
});
var o139 = _eq_;
var o140 = eval(__compiler["compile"](list("\uFDD1length",list("\uFDD1quote",list("\uFDD1x","\uFDD1y","\uFDD1z"))),__generator()));
return o138(o139,o140);
}))();
((function() {var o141 = (function(comp,res){
return (function() {if(not(comp(res,list(1,2,3,4)))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),": ",util["inspect"](list("\uFDD1list-append",list("\uFDD1quote",list(1,2)),list("\uFDD1quote",list(3,4))))," got ",util["inspect"](res)," but expected ",util["inspect"](list(1,2,3,4))));
} else {return false;
}})()
;
});
var o142 = _eq_;
var o143 = eval(__compiler["compile"](list("\uFDD1list-append",list("\uFDD1quote",list(1,2)),list("\uFDD1quote",list(3,4))),__generator()));
return o141(o142,o143);
}))();
((function() {var o144 = (function(comp,res){
return (function() {if(not(comp(res,list("\uFDD1z")))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),": ",util["inspect"](list("\uFDD1list-find",list("\uFDD1quote",list("\uFDD1x","\uFDD1y","\uFDD1z")),list("\uFDD1quote","\uFDD1z")))," got ",util["inspect"](res)," but expected ",util["inspect"](list("\uFDD1z"))));
} else {return false;
}})()
;
});
var o145 = _eq_;
var o146 = eval(__compiler["compile"](list("\uFDD1list-find",list("\uFDD1quote",list("\uFDD1x","\uFDD1y","\uFDD1z")),list("\uFDD1quote","\uFDD1z")),__generator()));
return o144(o145,o146);
}))();
((function() {var o147 = (function(comp,res){
return (function() {if(not(comp(res,false))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),": ",util["inspect"](list("\uFDD1list-find",list("\uFDD1quote",list("\uFDD1x","\uFDD1y","\uFDD1z")),list("\uFDD1quote","\uFDD1w")))," got ",util["inspect"](res)," but expected ",util["inspect"](false)));
} else {return false;
}})()
;
});
var o148 = _eq_;
var o149 = eval(__compiler["compile"](list("\uFDD1list-find",list("\uFDD1quote",list("\uFDD1x","\uFDD1y","\uFDD1z")),list("\uFDD1quote","\uFDD1w")),__generator()));
return o147(o148,o149);
}))();
((function() {var o150 = (function(comp,res){
return (function() {if(not(comp(res,false))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),": ",util["inspect"](list("\uFDD1list-find",list("\uFDD1quote",list(list(1,2),list(3,4))),list("\uFDD1quote",list(3,4))))," got ",util["inspect"](res)," but expected ",util["inspect"](false)));
} else {return false;
}})()
;
});
var o151 = _eq_;
var o152 = eval(__compiler["compile"](list("\uFDD1list-find",list("\uFDD1quote",list(list(1,2),list(3,4))),list("\uFDD1quote",list(3,4))),__generator()));
return o150(o151,o152);
}))();
((function() {var o153 = (function(comp,res){
return (function() {if(not(comp(res,list(list(3,4))))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),": ",util["inspect"](list("\uFDD1list-find",list("\uFDD1quote",list(list(1,2),list(3,4))),4,"\uFDD1cadr"))," got ",util["inspect"](res)," but expected ",util["inspect"](list(list(3,4)))));
} else {return false;
}})()
;
});
var o154 = _eq_;
var o155 = eval(__compiler["compile"](list("\uFDD1list-find",list("\uFDD1quote",list(list(1,2),list(3,4))),4,"\uFDD1cadr"),__generator()));
return o153(o154,o155);
}))();
((function() {var o156 = (function(comp,res){
return (function() {if(not(comp(res,list("\uFDD1z","\uFDD1y","\uFDD1x")))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),": ",util["inspect"](list("\uFDD1reverse",list("\uFDD1quote",list("\uFDD1x","\uFDD1y","\uFDD1z"))))," got ",util["inspect"](res)," but expected ",util["inspect"](list("\uFDD1z","\uFDD1y","\uFDD1x"))));
} else {return false;
}})()
;
});
var o157 = _eq_;
var o158 = eval(__compiler["compile"](list("\uFDD1reverse",list("\uFDD1quote",list("\uFDD1x","\uFDD1y","\uFDD1z"))),__generator()));
return o156(o157,o158);
}))();
((function() {var o159 = (function(comp,res){
return (function() {if(not(comp(res,list(1,2,3)))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),": ",util["inspect"](list("\uFDD1vector->list",vector(1,2,3)))," got ",util["inspect"](res)," but expected ",util["inspect"](list(1,2,3))));
} else {return false;
}})()
;
});
var o160 = _eq_;
var o161 = eval(__compiler["compile"](list("\uFDD1vector->list",vector(1,2,3)),__generator()));
return o159(o160,o161);
}))();
((function() {var o162 = (function(comp,res){
return (function() {if(not(comp(res,list(1,2,vector(1,2))))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),": ",util["inspect"](list("\uFDD1vector->list",vector(1,2,vector(1,2))))," got ",util["inspect"](res)," but expected ",util["inspect"](list(1,2,vector(1,2)))));
} else {return false;
}})()
;
});
var o163 = _eq_;
var o164 = eval(__compiler["compile"](list("\uFDD1vector->list",vector(1,2,vector(1,2))),__generator()));
return o162(o163,o164);
}))();
((function() {var o165 = (function(comp,res){
return (function() {if(not(comp(res,list(2,3,4)))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),": ",util["inspect"](list("\uFDD1map",list("\uFDD1lambda",list("\uFDD1el"),list("\uFDD1+","\uFDD1el",1)),list("\uFDD1quote",list(1,2,3))))," got ",util["inspect"](res)," but expected ",util["inspect"](list(2,3,4))));
} else {return false;
}})()
;
});
var o166 = _eq_;
var o167 = eval(__compiler["compile"](list("\uFDD1map",list("\uFDD1lambda",list("\uFDD1el"),list("\uFDD1+","\uFDD1el",1)),list("\uFDD1quote",list(1,2,3))),__generator()));
return o165(o166,o167);
}))();
((function() {var o168 = (function(comp,res){
return (function() {if(not(comp(res,18))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),": ",util["inspect"](list("\uFDD1fold",list("\uFDD1lambda",list("\uFDD1el","\uFDD1acc"),list("\uFDD1+","\uFDD1el","\uFDD1acc")),0,list("\uFDD1quote",list(5,6,7))))," got ",util["inspect"](res)," but expected ",util["inspect"](18)));
} else {return false;
}})()
;
});
var o169 = _eq_;
var o170 = eval(__compiler["compile"](list("\uFDD1fold",list("\uFDD1lambda",list("\uFDD1el","\uFDD1acc"),list("\uFDD1+","\uFDD1el","\uFDD1acc")),0,list("\uFDD1quote",list(5,6,7))),__generator()));
return o168(o169,o170);
}))();
var last = false;
for_dash_each((function(el){
return last = el;
}),list("\uFDD1one","\uFDD1two","\uFDD1three"));
((function() {var o171 = (function(comp,res){
return (function() {if(not(comp(res,"\uFDD1three"))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),": ",util["inspect"]("\uFDD1last")," got ",util["inspect"](res)," but expected ",util["inspect"]("\uFDD1three")));
} else {return false;
}})()
;
});
var o172 = _eq_;
var o173 = eval(__compiler["compile"]("\uFDD1last",__generator()));
return o171(o172,o173);
}))();
var foo = (function() {
var args = vector_dash__gt_list(Array.prototype.slice.call(arguments));
return args;
});
((function() {var o174 = (function(comp,res){
return (function() {if(not(comp(res,list(1,2,3)))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),": ",util["inspect"](list("\uFDD1foo",1,2,3))," got ",util["inspect"](res)," but expected ",util["inspect"](list(1,2,3))));
} else {return false;
}})()
;
});
var o175 = _eq_;
var o176 = eval(__compiler["compile"](list("\uFDD1foo",1,2,3),__generator()));
return o174(o175,o176);
}))();
((function() {var o177 = (function(comp,res){
return (function() {if(not(comp(res,vector(1,1,1,1,1)))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),": ",util["inspect"](list("\uFDD1make-vector",5,1))," got ",util["inspect"](res)," but expected ",util["inspect"](vector(1,1,1,1,1))));
} else {return false;
}})()
;
});
var o178 = _eq_;
var o179 = eval(__compiler["compile"](list("\uFDD1make-vector",5,1),__generator()));
return o177(o178,o179);
}))();
((function() {var o180 = (function(comp,res){
return (function() {if(not(comp(res,vector(1,"\uFDD1one","one",dict("\uFDD1one",1))))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),": ",util["inspect"](list("\uFDD1vector",1,list("\uFDD1quote","\uFDD1one"),"one",dict("\uFDD1one",1)))," got ",util["inspect"](res)," but expected ",util["inspect"](vector(1,"\uFDD1one","one",dict("\uFDD1one",1)))));
} else {return false;
}})()
;
});
var o181 = _eq_;
var o182 = eval(__compiler["compile"](list("\uFDD1vector",1,list("\uFDD1quote","\uFDD1one"),"one",dict("\uFDD1one",1)),__generator()));
return o180(o181,o182);
}))();
((function() {var o183 = (function(comp,res){
return (function() {if(not(comp(res,"one"))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),": ",util["inspect"](list("\uFDD1vector-ref",vector(1,list("\uFDD1quote","\uFDD1one"),"one"),2))," got ",util["inspect"](res)," but expected ",util["inspect"]("one")));
} else {return false;
}})()
;
});
var o184 = _eq_;
var o185 = eval(__compiler["compile"](list("\uFDD1vector-ref",vector(1,list("\uFDD1quote","\uFDD1one"),"one"),2),__generator()));
return o183(o184,o185);
}))();
var vec = vector(1,2,3,4);
vector_dash_put_excl_(vec,3,3);
((function() {var o186 = (function(comp,res){
return (function() {if(not(comp(res,vector(1,2,3,3)))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),": ",util["inspect"]("\uFDD1vec")," got ",util["inspect"](res)," but expected ",util["inspect"](vector(1,2,3,3))));
} else {return false;
}})()
;
});
var o187 = _eq_;
var o188 = eval(__compiler["compile"]("\uFDD1vec",__generator()));
return o186(o187,o188);
}))();
((function() {var o189 = (function(comp,res){
return (function() {if(not(comp(res,vector(1,2,3,4)))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),": ",util["inspect"](list("\uFDD1vector-concat",vector(1,2),vector(3,4)))," got ",util["inspect"](res)," but expected ",util["inspect"](vector(1,2,3,4))));
} else {return false;
}})()
;
});
var o190 = _eq_;
var o191 = eval(__compiler["compile"](list("\uFDD1vector-concat",vector(1,2),vector(3,4)),__generator()));
return o189(o190,o191);
}))();
((function() {var o192 = (function(comp,res){
return (function() {if(not(comp(res,vector(2,3,4)))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),": ",util["inspect"](list("\uFDD1vector-slice",vector(1,2,3,4),1))," got ",util["inspect"](res)," but expected ",util["inspect"](vector(2,3,4))));
} else {return false;
}})()
;
});
var o193 = _eq_;
var o194 = eval(__compiler["compile"](list("\uFDD1vector-slice",vector(1,2,3,4),1),__generator()));
return o192(o193,o194);
}))();
((function() {var o195 = (function(comp,res){
return (function() {if(not(comp(res,vector(2,3)))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),": ",util["inspect"](list("\uFDD1vector-slice",vector(1,2,3,4),1,2))," got ",util["inspect"](res)," but expected ",util["inspect"](vector(2,3))));
} else {return false;
}})()
;
});
var o196 = _eq_;
var o197 = eval(__compiler["compile"](list("\uFDD1vector-slice",vector(1,2,3,4),1,2),__generator()));
return o195(o196,o197);
}))();
var vec = vector(1,2,3,4);
vector_dash_push_excl_(vec,5);
((function() {var o198 = (function(comp,res){
return (function() {if(not(comp(res,vector(1,2,3,4,5)))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),": ",util["inspect"]("\uFDD1vec")," got ",util["inspect"](res)," but expected ",util["inspect"](vector(1,2,3,4,5))));
} else {return false;
}})()
;
});
var o199 = _eq_;
var o200 = eval(__compiler["compile"]("\uFDD1vec",__generator()));
return o198(o199,o200);
}))();
((function() {var o201 = (function(comp,res){
return (function() {if(not(comp(res,2))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),": ",util["inspect"](list("\uFDD1vector-find",list("\uFDD1quote",vector("\uFDD1x","\uFDD1y","\uFDD1z")),list("\uFDD1quote","\uFDD1z")))," got ",util["inspect"](res)," but expected ",util["inspect"](2)));
} else {return false;
}})()
;
});
var o202 = _eq_;
var o203 = eval(__compiler["compile"](list("\uFDD1vector-find",list("\uFDD1quote",vector("\uFDD1x","\uFDD1y","\uFDD1z")),list("\uFDD1quote","\uFDD1z")),__generator()));
return o201(o202,o203);
}))();
((function() {var o204 = (function(comp,res){
return (function() {if(not(comp(res,3))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),": ",util["inspect"](list("\uFDD1vector-length",vector(1,2,3)))," got ",util["inspect"](res)," but expected ",util["inspect"](3)));
} else {return false;
}})()
;
});
var o205 = _eq_;
var o206 = eval(__compiler["compile"](list("\uFDD1vector-length",vector(1,2,3)),__generator()));
return o204(o205,o206);
}))();
((function() {var o207 = (function(comp,res){
return (function() {if(not(comp(res,vector(1,2,3)))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),": ",util["inspect"](list("\uFDD1list->vector",list("\uFDD1quote",list(1,2,3))))," got ",util["inspect"](res)," but expected ",util["inspect"](vector(1,2,3))));
} else {return false;
}})()
;
});
var o208 = _eq_;
var o209 = eval(__compiler["compile"](list("\uFDD1list->vector",list("\uFDD1quote",list(1,2,3))),__generator()));
return o207(o208,o209);
}))();
((function() {var o210 = (function(comp,res){
return (function() {if(not(comp(res,vector(2,3,4,5)))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),": ",util["inspect"](list("\uFDD1vector-map",list("\uFDD1lambda",list("\uFDD1el"),list("\uFDD1+","\uFDD1el",1)),vector(1,2,3,4)))," got ",util["inspect"](res)," but expected ",util["inspect"](vector(2,3,4,5))));
} else {return false;
}})()
;
});
var o211 = _eq_;
var o212 = eval(__compiler["compile"](list("\uFDD1vector-map",list("\uFDD1lambda",list("\uFDD1el"),list("\uFDD1+","\uFDD1el",1)),vector(1,2,3,4)),__generator()));
return o210(o211,o212);
}))();
((function() {var o213 = (function(comp,res){
return (function() {if(not(comp(res,6))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),": ",util["inspect"](list("\uFDD1vector-fold",list("\uFDD1lambda",list("\uFDD1el","\uFDD1acc"),list("\uFDD1+","\uFDD1el","\uFDD1acc")),0,vector(1,2,3)))," got ",util["inspect"](res)," but expected ",util["inspect"](6)));
} else {return false;
}})()
;
});
var o214 = _eq_;
var o215 = eval(__compiler["compile"](list("\uFDD1vector-fold",list("\uFDD1lambda",list("\uFDD1el","\uFDD1acc"),list("\uFDD1+","\uFDD1el","\uFDD1acc")),0,vector(1,2,3)),__generator()));
return o213(o214,o215);
}))();
var last = false;
vector_dash_for_dash_each((function(el){
return last = el;
}),vector(4,5,6));
((function() {var o216 = (function(comp,res){
return (function() {if(not(comp(res,6))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),": ",util["inspect"]("\uFDD1last")," got ",util["inspect"](res)," but expected ",util["inspect"](6)));
} else {return false;
}})()
;
});
var o217 = _eq_;
var o218 = eval(__compiler["compile"]("\uFDD1last",__generator()));
return o216(o217,o218);
}))();
((function() {var o219 = (function(comp,res){
return (function() {if(not(comp(res,dict("\uFDD1one",1,"\uFDD1two",2)))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),": ",util["inspect"](list("\uFDD1dict",list("\uFDD1quote","\uFDD1one"),1,list("\uFDD1quote","\uFDD1two"),2))," got ",util["inspect"](res)," but expected ",util["inspect"](dict("\uFDD1one",1,"\uFDD1two",2))));
} else {return false;
}})()
;
});
var o220 = _eq_;
var o221 = eval(__compiler["compile"](list("\uFDD1dict",list("\uFDD1quote","\uFDD1one"),1,list("\uFDD1quote","\uFDD1two"),2),__generator()));
return o219(o220,o221);
}))();
((function() {var o222 = (function(comp,res){
return (function() {if(not(comp(res,1))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),": ",util["inspect"](list("\uFDD1dict-ref",dict("\uFDD1one",1,"\uFDD1two",2),list("\uFDD1quote","\uFDD1one")))," got ",util["inspect"](res)," but expected ",util["inspect"](1)));
} else {return false;
}})()
;
});
var o223 = _eq_;
var o224 = eval(__compiler["compile"](list("\uFDD1dict-ref",dict("\uFDD1two",2,"\uFDD1one",1),list("\uFDD1quote","\uFDD1one")),__generator()));
return o222(o223,o224);
}))();
var dct = dict("\uFDD1foo","bar","\uFDD1baz","bizz");
dict_dash_put_excl_(dct,"\uFDD1mumble","nimble");
((function() {var o225 = (function(comp,res){
return (function() {if(not(comp(res,dict("\uFDD1foo","bar","\uFDD1baz","bizz","\uFDD1mumble","nimble")))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),": ",util["inspect"]("\uFDD1dct")," got ",util["inspect"](res)," but expected ",util["inspect"](dict("\uFDD1foo","bar","\uFDD1baz","bizz","\uFDD1mumble","nimble"))));
} else {return false;
}})()
;
});
var o226 = _eq_;
var o227 = eval(__compiler["compile"]("\uFDD1dct",__generator()));
return o225(o226,o227);
}))();
((function() {var o228 = (function(comp,res){
return (function() {if(not(comp(res,dict("\uFDD1foo",2,"\uFDD1bar",3)))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),": ",util["inspect"](list("\uFDD1dict-map",list("\uFDD1lambda",list("\uFDD1el"),list("\uFDD1+","\uFDD1el",1)),dict("\uFDD1foo",1,"\uFDD1bar",2)))," got ",util["inspect"](res)," but expected ",util["inspect"](dict("\uFDD1foo",2,"\uFDD1bar",3))));
} else {return false;
}})()
;
});
var o229 = _eq_;
var o230 = eval(__compiler["compile"](list("\uFDD1dict-map",list("\uFDD1lambda",list("\uFDD1el"),list("\uFDD1+","\uFDD1el",1)),dict("\uFDD1bar",2,"\uFDD1foo",1)),__generator()));
return o228(o229,o230);
}))();
((function() {var o231 = (function(comp,res){
return (function() {if(not(comp(res,dict("\uFDD1one",1,"\uFDD1two",2,"\uFDD1three",3,"\uFDD1four",4)))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),": ",util["inspect"](list("\uFDD1dict-merge",dict("\uFDD1one",1,"\uFDD1two",2),dict("\uFDD1three",3,"\uFDD1four",4)))," got ",util["inspect"](res)," but expected ",util["inspect"](dict("\uFDD1one",1,"\uFDD1two",2,"\uFDD1three",3,"\uFDD1four",4))));
} else {return false;
}})()
;
});
var o232 = _eq_;
var o233 = eval(__compiler["compile"](list("\uFDD1dict-merge",dict("\uFDD1two",2,"\uFDD1one",1),dict("\uFDD1four",4,"\uFDD1three",3)),__generator()));
return o231(o232,o233);
}))();
((function() {var o234 = (function(comp,res){
return (function() {if(not(comp(res,true))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),": ",util["inspect"](list("\uFDD1let",list(list("\uFDD1vec",list("\uFDD1dict->vector",dict("\uFDD1one",1,"\uFDD1two",2)))),list("\uFDD1and",list("\uFDD1vector-find","\uFDD1vec",list("\uFDD1quote","\uFDD1one")),list("\uFDD1vector-find","\uFDD1vec",1),list("\uFDD1vector-find","\uFDD1vec",list("\uFDD1quote","\uFDD1two")),list("\uFDD1vector-find","\uFDD1vec",2))))," got ",util["inspect"](res)," but expected ",util["inspect"](true)));
} else {return false;
}})()
;
});
var o235 = (function(res,val){
return not(eq_p_(res,false));
});
var o236 = eval(__compiler["compile"](list("\uFDD1let",list(list("\uFDD1vec",list("\uFDD1dict->vector",dict("\uFDD1two",2,"\uFDD1one",1)))),list("\uFDD1and",list("\uFDD1vector-find","\uFDD1vec",list("\uFDD1quote","\uFDD1one")),list("\uFDD1vector-find","\uFDD1vec",1),list("\uFDD1vector-find","\uFDD1vec",list("\uFDD1quote","\uFDD1two")),list("\uFDD1vector-find","\uFDD1vec",2))),__generator()));
return o234(o235,o236);
}))();
((function() {var o237 = (function(comp,res){
return (function() {if(not(comp(res,true))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),": ",util["inspect"](list("\uFDD1let",list(list("\uFDD1lst",list("\uFDD1dict->list",dict("\uFDD1one",1,"\uFDD1two",2)))),list("\uFDD1and",list("\uFDD1list-find","\uFDD1lst",list("\uFDD1quote","\uFDD1one")),list("\uFDD1list-find","\uFDD1lst",1),list("\uFDD1list-find","\uFDD1lst",list("\uFDD1quote","\uFDD1two")),list("\uFDD1list-find","\uFDD1lst",2))))," got ",util["inspect"](res)," but expected ",util["inspect"](true)));
} else {return false;
}})()
;
});
var o238 = (function(res,val){
return not(eq_p_(res,false));
});
var o239 = eval(__compiler["compile"](list("\uFDD1let",list(list("\uFDD1lst",list("\uFDD1dict->list",dict("\uFDD1two",2,"\uFDD1one",1)))),list("\uFDD1and",list("\uFDD1list-find","\uFDD1lst",list("\uFDD1quote","\uFDD1one")),list("\uFDD1list-find","\uFDD1lst",1),list("\uFDD1list-find","\uFDD1lst",list("\uFDD1quote","\uFDD1two")),list("\uFDD1list-find","\uFDD1lst",2))),__generator()));
return o237(o238,o239);
}))();
((function() {var o240 = (function(k){
((function() {var o242 = (function(comp,res){
return (function() {if(not(comp(res,true))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),": ",util["inspect"](list("\uFDD1list-find","\uFDD1k",list("\uFDD1quote","\uFDD1foo")))," got ",util["inspect"](res)," but expected ",util["inspect"](true)));
} else {return false;
}})()
;
});
var o243 = (function(res,val){
return not(eq_p_(res,false));
});
var o244 = eval(__compiler["compile"](list("\uFDD1list-find","\uFDD1k",list("\uFDD1quote","\uFDD1foo")),__generator()));
return o242(o243,o244);
}))();
return ((function() {var o245 = (function(comp,res){
return (function() {if(not(comp(res,true))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),": ",util["inspect"](list("\uFDD1list-find","\uFDD1k",list("\uFDD1quote","\uFDD1bar")))," got ",util["inspect"](res)," but expected ",util["inspect"](true)));
} else {return false;
}})()
;
});
var o246 = (function(res,val){
return not(eq_p_(res,false));
});
var o247 = eval(__compiler["compile"](list("\uFDD1list-find","\uFDD1k",list("\uFDD1quote","\uFDD1bar")),__generator()));
return o245(o246,o247);
}))();
});
var o241 = keys(dict("\uFDD1foo",1,"\uFDD1bar",2));
return o240(o241);
}))();
((function() {var o248 = (function(v){
((function() {var o250 = (function(comp,res){
return (function() {if(not(comp(res,true))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),": ",util["inspect"](list("\uFDD1list-find","\uFDD1v",1))," got ",util["inspect"](res)," but expected ",util["inspect"](true)));
} else {return false;
}})()
;
});
var o251 = (function(res,val){
return not(eq_p_(res,false));
});
var o252 = eval(__compiler["compile"](list("\uFDD1list-find","\uFDD1v",1),__generator()));
return o250(o251,o252);
}))();
return ((function() {var o253 = (function(comp,res){
return (function() {if(not(comp(res,true))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),": ",util["inspect"](list("\uFDD1list-find","\uFDD1v",2))," got ",util["inspect"](res)," but expected ",util["inspect"](true)));
} else {return false;
}})()
;
});
var o254 = (function(res,val){
return not(eq_p_(res,false));
});
var o255 = eval(__compiler["compile"](list("\uFDD1list-find","\uFDD1v",2),__generator()));
return o253(o254,o255);
}))();
});
var o249 = vals(dict("\uFDD1foo",1,"\uFDD1bar",2));
return o248(o249);
}))();
((function() {var o256 = (function(dct){
((function() {var o258 = (function(comp,res){
return (function() {if(not(comp(res,1))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),": ",util["inspect"](list("\uFDD1dict-ref","\uFDD1dct",list("\uFDD1quote","\uFDD1foo")))," got ",util["inspect"](res)," but expected ",util["inspect"](1)));
} else {return false;
}})()
;
});
var o259 = _eq_;
var o260 = eval(__compiler["compile"](list("\uFDD1dict-ref","\uFDD1dct",list("\uFDD1quote","\uFDD1foo")),__generator()));
return o258(o259,o260);
}))();
return ((function() {var o261 = (function(comp,res){
return (function() {if(not(comp(res,2))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),": ",util["inspect"](list("\uFDD1dict-ref","\uFDD1dct",list("\uFDD1quote","\uFDD1bar")))," got ",util["inspect"](res)," but expected ",util["inspect"](2)));
} else {return false;
}})()
;
});
var o262 = _eq_;
var o263 = eval(__compiler["compile"](list("\uFDD1dict-ref","\uFDD1dct",list("\uFDD1quote","\uFDD1bar")),__generator()));
return o261(o262,o263);
}))();
});
var o257 = zip(list("\uFDD1foo","\uFDD1bar","\uFDD1baz"),list(1,2,3));
return o256(o257);
}))();
((function() {var o264 = (function(comp,res){
return (function() {if(not(comp(res,true))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),": ",util["inspect"](list("\uFDD1not",false))," got ",util["inspect"](res)," but expected ",util["inspect"](true)));
} else {return false;
}})()
;
});
var o265 = _eq_;
var o266 = eval(__compiler["compile"](list("\uFDD1not",false),__generator()));
return o264(o265,o266);
}))();
((function() {var o267 = (function(comp,res){
return (function() {if(not(comp(res,false))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),": ",util["inspect"](list("\uFDD1not",0))," got ",util["inspect"](res)," but expected ",util["inspect"](false)));
} else {return false;
}})()
;
});
var o268 = _eq_;
var o269 = eval(__compiler["compile"](list("\uFDD1not",0),__generator()));
return o267(o268,o269);
}))();
((function() {var o270 = (function(comp,res){
return (function() {if(not(comp(res,false))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),": ",util["inspect"](list("\uFDD1not","foo"))," got ",util["inspect"](res)," but expected ",util["inspect"](false)));
} else {return false;
}})()
;
});
var o271 = _eq_;
var o272 = eval(__compiler["compile"](list("\uFDD1not","foo"),__generator()));
return o270(o271,o272);
}))();
((function() {var o273 = (function(comp,res){
return (function() {if(not(comp(res,true))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),": ",util["inspect"](list("\uFDD1==",3,3))," got ",util["inspect"](res)," but expected ",util["inspect"](true)));
} else {return false;
}})()
;
});
var o274 = (function(res,val){
return not(eq_p_(res,false));
});
var o275 = eval(__compiler["compile"](list("\uFDD1==",3,3),__generator()));
return o273(o274,o275);
}))();
((function() {var o276 = (function(comp,res){
return (function() {if(not(comp(res,true))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),": ",util["inspect"](list("\uFDD1=",3,3))," got ",util["inspect"](res)," but expected ",util["inspect"](true)));
} else {return false;
}})()
;
});
var o277 = (function(res,val){
return not(eq_p_(res,false));
});
var o278 = eval(__compiler["compile"](list("\uFDD1=",3,3),__generator()));
return o276(o277,o278);
}))();
((function() {var o279 = (function(comp,res){
return (function() {if(not(comp(res,true))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),": ",util["inspect"](list("\uFDD1==","foo","foo"))," got ",util["inspect"](res)," but expected ",util["inspect"](true)));
} else {return false;
}})()
;
});
var o280 = (function(res,val){
return not(eq_p_(res,false));
});
var o281 = eval(__compiler["compile"](list("\uFDD1==","foo","foo"),__generator()));
return o279(o280,o281);
}))();
((function() {var o282 = (function(comp,res){
return (function() {if(not(comp(res,true))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),": ",util["inspect"](list("\uFDD1=","foo","foo"))," got ",util["inspect"](res)," but expected ",util["inspect"](true)));
} else {return false;
}})()
;
});
var o283 = (function(res,val){
return not(eq_p_(res,false));
});
var o284 = eval(__compiler["compile"](list("\uFDD1=","foo","foo"),__generator()));
return o282(o283,o284);
}))();
((function() {var o285 = (function(comp,res){
return (function() {if(not(comp(res,true))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),": ",util["inspect"](list("\uFDD1==",true,true))," got ",util["inspect"](res)," but expected ",util["inspect"](true)));
} else {return false;
}})()
;
});
var o286 = (function(res,val){
return not(eq_p_(res,false));
});
var o287 = eval(__compiler["compile"](list("\uFDD1==",true,true),__generator()));
return o285(o286,o287);
}))();
((function() {var o288 = (function(comp,res){
return (function() {if(not(comp(res,true))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),": ",util["inspect"](list("\uFDD1=",true,true))," got ",util["inspect"](res)," but expected ",util["inspect"](true)));
} else {return false;
}})()
;
});
var o289 = (function(res,val){
return not(eq_p_(res,false));
});
var o290 = eval(__compiler["compile"](list("\uFDD1=",true,true),__generator()));
return o288(o289,o290);
}))();
((function() {var o291 = (function(comp,res){
return (function() {if(not(comp(res,true))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),": ",util["inspect"](list("\uFDD1==",list("\uFDD1quote","\uFDD1foo"),list("\uFDD1quote","\uFDD1foo")))," got ",util["inspect"](res)," but expected ",util["inspect"](true)));
} else {return false;
}})()
;
});
var o292 = (function(res,val){
return not(eq_p_(res,false));
});
var o293 = eval(__compiler["compile"](list("\uFDD1==",list("\uFDD1quote","\uFDD1foo"),list("\uFDD1quote","\uFDD1foo")),__generator()));
return o291(o292,o293);
}))();
((function() {var o294 = (function(comp,res){
return (function() {if(not(comp(res,true))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),": ",util["inspect"](list("\uFDD1=",list("\uFDD1quote","\uFDD1foo"),list("\uFDD1quote","\uFDD1foo")))," got ",util["inspect"](res)," but expected ",util["inspect"](true)));
} else {return false;
}})()
;
});
var o295 = (function(res,val){
return not(eq_p_(res,false));
});
var o296 = eval(__compiler["compile"](list("\uFDD1=",list("\uFDD1quote","\uFDD1foo"),list("\uFDD1quote","\uFDD1foo")),__generator()));
return o294(o295,o296);
}))();
((function() {var o297 = (function(comp,res){
return (function() {if(not(comp(res,true))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),": ",util["inspect"](list("\uFDD1==",list("\uFDD1quote",_emptylst),list("\uFDD1quote",_emptylst)))," got ",util["inspect"](res)," but expected ",util["inspect"](true)));
} else {return false;
}})()
;
});
var o298 = (function(res,val){
return not(eq_p_(res,false));
});
var o299 = eval(__compiler["compile"](list("\uFDD1==",list("\uFDD1quote",_emptylst),list("\uFDD1quote",_emptylst)),__generator()));
return o297(o298,o299);
}))();
((function() {var o300 = (function(comp,res){
return (function() {if(not(comp(res,true))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),": ",util["inspect"](list("\uFDD1=",list("\uFDD1quote",_emptylst),list("\uFDD1quote",_emptylst)))," got ",util["inspect"](res)," but expected ",util["inspect"](true)));
} else {return false;
}})()
;
});
var o301 = (function(res,val){
return not(eq_p_(res,false));
});
var o302 = eval(__compiler["compile"](list("\uFDD1=",list("\uFDD1quote",_emptylst),list("\uFDD1quote",_emptylst)),__generator()));
return o300(o301,o302);
}))();
var foo = list(1,2,3);
((function() {var o303 = (function(comp,res){
return (function() {if(not(comp(res,true))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),": ",util["inspect"](list("\uFDD1==","\uFDD1foo","\uFDD1foo"))," got ",util["inspect"](res)," but expected ",util["inspect"](true)));
} else {return false;
}})()
;
});
var o304 = (function(res,val){
return not(eq_p_(res,false));
});
var o305 = eval(__compiler["compile"](list("\uFDD1==","\uFDD1foo","\uFDD1foo"),__generator()));
return o303(o304,o305);
}))();
((function() {var o306 = (function(comp,res){
return (function() {if(not(comp(res,false))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),": ",util["inspect"](list("\uFDD1==",list("\uFDD1quote",list(1,2,3)),list("\uFDD1quote",list(1,2,3))))," got ",util["inspect"](res)," but expected ",util["inspect"](false)));
} else {return false;
}})()
;
});
var o307 = _eq_;
var o308 = eval(__compiler["compile"](list("\uFDD1==",list("\uFDD1quote",list(1,2,3)),list("\uFDD1quote",list(1,2,3))),__generator()));
return o306(o307,o308);
}))();
((function() {var o309 = (function(comp,res){
return (function() {if(not(comp(res,true))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),": ",util["inspect"](list("\uFDD1=",list("\uFDD1quote",list(1,2,3)),list("\uFDD1quote",list(1,2,3))))," got ",util["inspect"](res)," but expected ",util["inspect"](true)));
} else {return false;
}})()
;
});
var o310 = (function(res,val){
return not(eq_p_(res,false));
});
var o311 = eval(__compiler["compile"](list("\uFDD1=",list("\uFDD1quote",list(1,2,3)),list("\uFDD1quote",list(1,2,3))),__generator()));
return o309(o310,o311);
}))();
var foo = vector(1,2,3);
((function() {var o312 = (function(comp,res){
return (function() {if(not(comp(res,true))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),": ",util["inspect"](list("\uFDD1==","\uFDD1foo","\uFDD1foo"))," got ",util["inspect"](res)," but expected ",util["inspect"](true)));
} else {return false;
}})()
;
});
var o313 = (function(res,val){
return not(eq_p_(res,false));
});
var o314 = eval(__compiler["compile"](list("\uFDD1==","\uFDD1foo","\uFDD1foo"),__generator()));
return o312(o313,o314);
}))();
((function() {var o315 = (function(comp,res){
return (function() {if(not(comp(res,false))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),": ",util["inspect"](list("\uFDD1==",vector(1,2,3),vector(1,2,3)))," got ",util["inspect"](res)," but expected ",util["inspect"](false)));
} else {return false;
}})()
;
});
var o316 = _eq_;
var o317 = eval(__compiler["compile"](list("\uFDD1==",vector(1,2,3),vector(1,2,3)),__generator()));
return o315(o316,o317);
}))();
((function() {var o318 = (function(comp,res){
return (function() {if(not(comp(res,true))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),": ",util["inspect"](list("\uFDD1=",vector(1,2,3),vector(1,2,3)))," got ",util["inspect"](res)," but expected ",util["inspect"](true)));
} else {return false;
}})()
;
});
var o319 = (function(res,val){
return not(eq_p_(res,false));
});
var o320 = eval(__compiler["compile"](list("\uFDD1=",vector(1,2,3),vector(1,2,3)),__generator()));
return o318(o319,o320);
}))();
var foo = dict("\uFDD1one",1);
((function() {var o321 = (function(comp,res){
return (function() {if(not(comp(res,true))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),": ",util["inspect"](list("\uFDD1==","\uFDD1foo","\uFDD1foo"))," got ",util["inspect"](res)," but expected ",util["inspect"](true)));
} else {return false;
}})()
;
});
var o322 = (function(res,val){
return not(eq_p_(res,false));
});
var o323 = eval(__compiler["compile"](list("\uFDD1==","\uFDD1foo","\uFDD1foo"),__generator()));
return o321(o322,o323);
}))();
((function() {var o324 = (function(comp,res){
return (function() {if(not(comp(res,false))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),": ",util["inspect"](list("\uFDD1==",dict("\uFDD1one",1),dict("\uFDD1one",1)))," got ",util["inspect"](res)," but expected ",util["inspect"](false)));
} else {return false;
}})()
;
});
var o325 = _eq_;
var o326 = eval(__compiler["compile"](list("\uFDD1==",dict("\uFDD1one",1),dict("\uFDD1one",1)),__generator()));
return o324(o325,o326);
}))();
((function() {var o327 = (function(comp,res){
return (function() {if(not(comp(res,true))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),": ",util["inspect"](list("\uFDD1=",dict("\uFDD1one",1),dict("\uFDD1one",1)))," got ",util["inspect"](res)," but expected ",util["inspect"](true)));
} else {return false;
}})()
;
});
var o328 = (function(res,val){
return not(eq_p_(res,false));
});
var o329 = eval(__compiler["compile"](list("\uFDD1=",dict("\uFDD1one",1),dict("\uFDD1one",1)),__generator()));
return o327(o328,o329);
}))();
true;
((function() {((function() {var o335 = (function(comp,res){
return (function() {if(not(comp(res,false))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),": ",util["inspect"](list("\uFDD1boolean?",5))," got ",util["inspect"](res)," but expected ",util["inspect"](false)));
} else {return false;
}})()
;
});
var o336 = _eq_;
var o337 = eval(__compiler["compile"](list("\uFDD1boolean?",5),__generator()));
return o335(o336,o337);
}))();
((function() {var o338 = (function(comp,res){
return (function() {if(not(comp(res,true))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),": ",util["inspect"](list("\uFDD1number?",5))," got ",util["inspect"](res)," but expected ",util["inspect"](true)));
} else {return false;
}})()
;
});
var o339 = _eq_;
var o340 = eval(__compiler["compile"](list("\uFDD1number?",5),__generator()));
return o338(o339,o340);
}))();
((function() {var o341 = (function(comp,res){
return (function() {if(not(comp(res,false))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),": ",util["inspect"](list("\uFDD1symbol?",5))," got ",util["inspect"](res)," but expected ",util["inspect"](false)));
} else {return false;
}})()
;
});
var o342 = _eq_;
var o343 = eval(__compiler["compile"](list("\uFDD1symbol?",5),__generator()));
return o341(o342,o343);
}))();
((function() {var o344 = (function(comp,res){
return (function() {if(not(comp(res,false))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),": ",util["inspect"](list("\uFDD1string?",5))," got ",util["inspect"](res)," but expected ",util["inspect"](false)));
} else {return false;
}})()
;
});
var o345 = _eq_;
var o346 = eval(__compiler["compile"](list("\uFDD1string?",5),__generator()));
return o344(o345,o346);
}))();
((function() {var o347 = (function(comp,res){
return (function() {if(not(comp(res,false))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),": ",util["inspect"](list("\uFDD1list?",5))," got ",util["inspect"](res)," but expected ",util["inspect"](false)));
} else {return false;
}})()
;
});
var o348 = _eq_;
var o349 = eval(__compiler["compile"](list("\uFDD1list?",5),__generator()));
return o347(o348,o349);
}))();
((function() {var o350 = (function(comp,res){
return (function() {if(not(comp(res,false))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),": ",util["inspect"](list("\uFDD1vector?",5))," got ",util["inspect"](res)," but expected ",util["inspect"](false)));
} else {return false;
}})()
;
});
var o351 = _eq_;
var o352 = eval(__compiler["compile"](list("\uFDD1vector?",5),__generator()));
return o350(o351,o352);
}))();
return ((function() {var o353 = (function(comp,res){
return (function() {if(not(comp(res,false))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),": ",util["inspect"](list("\uFDD1dict?",5))," got ",util["inspect"](res)," but expected ",util["inspect"](false)));
} else {return false;
}})()
;
});
var o354 = _eq_;
var o355 = eval(__compiler["compile"](list("\uFDD1dict?",5),__generator()));
return o353(o354,o355);
}))();
}))();
((function() {((function() {var o356 = (function(comp,res){
return (function() {if(not(comp(res,true))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),": ",util["inspect"](list("\uFDD1boolean?",true))," got ",util["inspect"](res)," but expected ",util["inspect"](true)));
} else {return false;
}})()
;
});
var o357 = _eq_;
var o358 = eval(__compiler["compile"](list("\uFDD1boolean?",true),__generator()));
return o356(o357,o358);
}))();
((function() {var o359 = (function(comp,res){
return (function() {if(not(comp(res,false))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),": ",util["inspect"](list("\uFDD1number?",true))," got ",util["inspect"](res)," but expected ",util["inspect"](false)));
} else {return false;
}})()
;
});
var o360 = _eq_;
var o361 = eval(__compiler["compile"](list("\uFDD1number?",true),__generator()));
return o359(o360,o361);
}))();
((function() {var o362 = (function(comp,res){
return (function() {if(not(comp(res,false))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),": ",util["inspect"](list("\uFDD1symbol?",true))," got ",util["inspect"](res)," but expected ",util["inspect"](false)));
} else {return false;
}})()
;
});
var o363 = _eq_;
var o364 = eval(__compiler["compile"](list("\uFDD1symbol?",true),__generator()));
return o362(o363,o364);
}))();
((function() {var o365 = (function(comp,res){
return (function() {if(not(comp(res,false))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),": ",util["inspect"](list("\uFDD1string?",true))," got ",util["inspect"](res)," but expected ",util["inspect"](false)));
} else {return false;
}})()
;
});
var o366 = _eq_;
var o367 = eval(__compiler["compile"](list("\uFDD1string?",true),__generator()));
return o365(o366,o367);
}))();
((function() {var o368 = (function(comp,res){
return (function() {if(not(comp(res,false))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),": ",util["inspect"](list("\uFDD1list?",true))," got ",util["inspect"](res)," but expected ",util["inspect"](false)));
} else {return false;
}})()
;
});
var o369 = _eq_;
var o370 = eval(__compiler["compile"](list("\uFDD1list?",true),__generator()));
return o368(o369,o370);
}))();
((function() {var o371 = (function(comp,res){
return (function() {if(not(comp(res,false))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),": ",util["inspect"](list("\uFDD1vector?",true))," got ",util["inspect"](res)," but expected ",util["inspect"](false)));
} else {return false;
}})()
;
});
var o372 = _eq_;
var o373 = eval(__compiler["compile"](list("\uFDD1vector?",true),__generator()));
return o371(o372,o373);
}))();
return ((function() {var o374 = (function(comp,res){
return (function() {if(not(comp(res,false))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),": ",util["inspect"](list("\uFDD1dict?",true))," got ",util["inspect"](res)," but expected ",util["inspect"](false)));
} else {return false;
}})()
;
});
var o375 = _eq_;
var o376 = eval(__compiler["compile"](list("\uFDD1dict?",true),__generator()));
return o374(o375,o376);
}))();
}))();
((function() {((function() {var o377 = (function(comp,res){
return (function() {if(not(comp(res,false))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),": ",util["inspect"](list("\uFDD1boolean?",list("\uFDD1quote","\uFDD1foo")))," got ",util["inspect"](res)," but expected ",util["inspect"](false)));
} else {return false;
}})()
;
});
var o378 = _eq_;
var o379 = eval(__compiler["compile"](list("\uFDD1boolean?",list("\uFDD1quote","\uFDD1foo")),__generator()));
return o377(o378,o379);
}))();
((function() {var o380 = (function(comp,res){
return (function() {if(not(comp(res,false))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),": ",util["inspect"](list("\uFDD1number?",list("\uFDD1quote","\uFDD1foo")))," got ",util["inspect"](res)," but expected ",util["inspect"](false)));
} else {return false;
}})()
;
});
var o381 = _eq_;
var o382 = eval(__compiler["compile"](list("\uFDD1number?",list("\uFDD1quote","\uFDD1foo")),__generator()));
return o380(o381,o382);
}))();
((function() {var o383 = (function(comp,res){
return (function() {if(not(comp(res,true))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),": ",util["inspect"](list("\uFDD1symbol?",list("\uFDD1quote","\uFDD1foo")))," got ",util["inspect"](res)," but expected ",util["inspect"](true)));
} else {return false;
}})()
;
});
var o384 = _eq_;
var o385 = eval(__compiler["compile"](list("\uFDD1symbol?",list("\uFDD1quote","\uFDD1foo")),__generator()));
return o383(o384,o385);
}))();
((function() {var o386 = (function(comp,res){
return (function() {if(not(comp(res,false))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),": ",util["inspect"](list("\uFDD1string?",list("\uFDD1quote","\uFDD1foo")))," got ",util["inspect"](res)," but expected ",util["inspect"](false)));
} else {return false;
}})()
;
});
var o387 = _eq_;
var o388 = eval(__compiler["compile"](list("\uFDD1string?",list("\uFDD1quote","\uFDD1foo")),__generator()));
return o386(o387,o388);
}))();
((function() {var o389 = (function(comp,res){
return (function() {if(not(comp(res,false))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),": ",util["inspect"](list("\uFDD1list?",list("\uFDD1quote","\uFDD1foo")))," got ",util["inspect"](res)," but expected ",util["inspect"](false)));
} else {return false;
}})()
;
});
var o390 = _eq_;
var o391 = eval(__compiler["compile"](list("\uFDD1list?",list("\uFDD1quote","\uFDD1foo")),__generator()));
return o389(o390,o391);
}))();
((function() {var o392 = (function(comp,res){
return (function() {if(not(comp(res,false))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),": ",util["inspect"](list("\uFDD1vector?",list("\uFDD1quote","\uFDD1foo")))," got ",util["inspect"](res)," but expected ",util["inspect"](false)));
} else {return false;
}})()
;
});
var o393 = _eq_;
var o394 = eval(__compiler["compile"](list("\uFDD1vector?",list("\uFDD1quote","\uFDD1foo")),__generator()));
return o392(o393,o394);
}))();
return ((function() {var o395 = (function(comp,res){
return (function() {if(not(comp(res,false))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),": ",util["inspect"](list("\uFDD1dict?",list("\uFDD1quote","\uFDD1foo")))," got ",util["inspect"](res)," but expected ",util["inspect"](false)));
} else {return false;
}})()
;
});
var o396 = _eq_;
var o397 = eval(__compiler["compile"](list("\uFDD1dict?",list("\uFDD1quote","\uFDD1foo")),__generator()));
return o395(o396,o397);
}))();
}))();
((function() {((function() {var o398 = (function(comp,res){
return (function() {if(not(comp(res,false))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),": ",util["inspect"](list("\uFDD1boolean?","foo"))," got ",util["inspect"](res)," but expected ",util["inspect"](false)));
} else {return false;
}})()
;
});
var o399 = _eq_;
var o400 = eval(__compiler["compile"](list("\uFDD1boolean?","foo"),__generator()));
return o398(o399,o400);
}))();
((function() {var o401 = (function(comp,res){
return (function() {if(not(comp(res,false))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),": ",util["inspect"](list("\uFDD1number?","foo"))," got ",util["inspect"](res)," but expected ",util["inspect"](false)));
} else {return false;
}})()
;
});
var o402 = _eq_;
var o403 = eval(__compiler["compile"](list("\uFDD1number?","foo"),__generator()));
return o401(o402,o403);
}))();
((function() {var o404 = (function(comp,res){
return (function() {if(not(comp(res,false))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),": ",util["inspect"](list("\uFDD1symbol?","foo"))," got ",util["inspect"](res)," but expected ",util["inspect"](false)));
} else {return false;
}})()
;
});
var o405 = _eq_;
var o406 = eval(__compiler["compile"](list("\uFDD1symbol?","foo"),__generator()));
return o404(o405,o406);
}))();
((function() {var o407 = (function(comp,res){
return (function() {if(not(comp(res,true))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),": ",util["inspect"](list("\uFDD1string?","foo"))," got ",util["inspect"](res)," but expected ",util["inspect"](true)));
} else {return false;
}})()
;
});
var o408 = _eq_;
var o409 = eval(__compiler["compile"](list("\uFDD1string?","foo"),__generator()));
return o407(o408,o409);
}))();
((function() {var o410 = (function(comp,res){
return (function() {if(not(comp(res,false))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),": ",util["inspect"](list("\uFDD1list?","foo"))," got ",util["inspect"](res)," but expected ",util["inspect"](false)));
} else {return false;
}})()
;
});
var o411 = _eq_;
var o412 = eval(__compiler["compile"](list("\uFDD1list?","foo"),__generator()));
return o410(o411,o412);
}))();
((function() {var o413 = (function(comp,res){
return (function() {if(not(comp(res,false))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),": ",util["inspect"](list("\uFDD1vector?","foo"))," got ",util["inspect"](res)," but expected ",util["inspect"](false)));
} else {return false;
}})()
;
});
var o414 = _eq_;
var o415 = eval(__compiler["compile"](list("\uFDD1vector?","foo"),__generator()));
return o413(o414,o415);
}))();
return ((function() {var o416 = (function(comp,res){
return (function() {if(not(comp(res,false))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),": ",util["inspect"](list("\uFDD1dict?","foo"))," got ",util["inspect"](res)," but expected ",util["inspect"](false)));
} else {return false;
}})()
;
});
var o417 = _eq_;
var o418 = eval(__compiler["compile"](list("\uFDD1dict?","foo"),__generator()));
return o416(o417,o418);
}))();
}))();
((function() {((function() {var o419 = (function(comp,res){
return (function() {if(not(comp(res,false))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),": ",util["inspect"](list("\uFDD1boolean?",list("\uFDD1quote",list(1,2,3))))," got ",util["inspect"](res)," but expected ",util["inspect"](false)));
} else {return false;
}})()
;
});
var o420 = _eq_;
var o421 = eval(__compiler["compile"](list("\uFDD1boolean?",list("\uFDD1quote",list(1,2,3))),__generator()));
return o419(o420,o421);
}))();
((function() {var o422 = (function(comp,res){
return (function() {if(not(comp(res,false))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),": ",util["inspect"](list("\uFDD1number?",list("\uFDD1quote",list(1,2,3))))," got ",util["inspect"](res)," but expected ",util["inspect"](false)));
} else {return false;
}})()
;
});
var o423 = _eq_;
var o424 = eval(__compiler["compile"](list("\uFDD1number?",list("\uFDD1quote",list(1,2,3))),__generator()));
return o422(o423,o424);
}))();
((function() {var o425 = (function(comp,res){
return (function() {if(not(comp(res,false))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),": ",util["inspect"](list("\uFDD1symbol?",list("\uFDD1quote",list(1,2,3))))," got ",util["inspect"](res)," but expected ",util["inspect"](false)));
} else {return false;
}})()
;
});
var o426 = _eq_;
var o427 = eval(__compiler["compile"](list("\uFDD1symbol?",list("\uFDD1quote",list(1,2,3))),__generator()));
return o425(o426,o427);
}))();
((function() {var o428 = (function(comp,res){
return (function() {if(not(comp(res,false))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),": ",util["inspect"](list("\uFDD1string?",list("\uFDD1quote",list(1,2,3))))," got ",util["inspect"](res)," but expected ",util["inspect"](false)));
} else {return false;
}})()
;
});
var o429 = _eq_;
var o430 = eval(__compiler["compile"](list("\uFDD1string?",list("\uFDD1quote",list(1,2,3))),__generator()));
return o428(o429,o430);
}))();
((function() {var o431 = (function(comp,res){
return (function() {if(not(comp(res,true))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),": ",util["inspect"](list("\uFDD1list?",list("\uFDD1quote",list(1,2,3))))," got ",util["inspect"](res)," but expected ",util["inspect"](true)));
} else {return false;
}})()
;
});
var o432 = _eq_;
var o433 = eval(__compiler["compile"](list("\uFDD1list?",list("\uFDD1quote",list(1,2,3))),__generator()));
return o431(o432,o433);
}))();
((function() {var o434 = (function(comp,res){
return (function() {if(not(comp(res,false))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),": ",util["inspect"](list("\uFDD1vector?",list("\uFDD1quote",list(1,2,3))))," got ",util["inspect"](res)," but expected ",util["inspect"](false)));
} else {return false;
}})()
;
});
var o435 = _eq_;
var o436 = eval(__compiler["compile"](list("\uFDD1vector?",list("\uFDD1quote",list(1,2,3))),__generator()));
return o434(o435,o436);
}))();
return ((function() {var o437 = (function(comp,res){
return (function() {if(not(comp(res,false))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),": ",util["inspect"](list("\uFDD1dict?",list("\uFDD1quote",list(1,2,3))))," got ",util["inspect"](res)," but expected ",util["inspect"](false)));
} else {return false;
}})()
;
});
var o438 = _eq_;
var o439 = eval(__compiler["compile"](list("\uFDD1dict?",list("\uFDD1quote",list(1,2,3))),__generator()));
return o437(o438,o439);
}))();
}))();
((function() {((function() {var o440 = (function(comp,res){
return (function() {if(not(comp(res,false))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),": ",util["inspect"](list("\uFDD1boolean?",vector(1,2,3)))," got ",util["inspect"](res)," but expected ",util["inspect"](false)));
} else {return false;
}})()
;
});
var o441 = _eq_;
var o442 = eval(__compiler["compile"](list("\uFDD1boolean?",vector(1,2,3)),__generator()));
return o440(o441,o442);
}))();
((function() {var o443 = (function(comp,res){
return (function() {if(not(comp(res,false))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),": ",util["inspect"](list("\uFDD1number?",vector(1,2,3)))," got ",util["inspect"](res)," but expected ",util["inspect"](false)));
} else {return false;
}})()
;
});
var o444 = _eq_;
var o445 = eval(__compiler["compile"](list("\uFDD1number?",vector(1,2,3)),__generator()));
return o443(o444,o445);
}))();
((function() {var o446 = (function(comp,res){
return (function() {if(not(comp(res,false))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),": ",util["inspect"](list("\uFDD1symbol?",vector(1,2,3)))," got ",util["inspect"](res)," but expected ",util["inspect"](false)));
} else {return false;
}})()
;
});
var o447 = _eq_;
var o448 = eval(__compiler["compile"](list("\uFDD1symbol?",vector(1,2,3)),__generator()));
return o446(o447,o448);
}))();
((function() {var o449 = (function(comp,res){
return (function() {if(not(comp(res,false))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),": ",util["inspect"](list("\uFDD1string?",vector(1,2,3)))," got ",util["inspect"](res)," but expected ",util["inspect"](false)));
} else {return false;
}})()
;
});
var o450 = _eq_;
var o451 = eval(__compiler["compile"](list("\uFDD1string?",vector(1,2,3)),__generator()));
return o449(o450,o451);
}))();
((function() {var o452 = (function(comp,res){
return (function() {if(not(comp(res,false))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),": ",util["inspect"](list("\uFDD1list?",vector(1,2,3)))," got ",util["inspect"](res)," but expected ",util["inspect"](false)));
} else {return false;
}})()
;
});
var o453 = _eq_;
var o454 = eval(__compiler["compile"](list("\uFDD1list?",vector(1,2,3)),__generator()));
return o452(o453,o454);
}))();
((function() {var o455 = (function(comp,res){
return (function() {if(not(comp(res,true))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),": ",util["inspect"](list("\uFDD1vector?",vector(1,2,3)))," got ",util["inspect"](res)," but expected ",util["inspect"](true)));
} else {return false;
}})()
;
});
var o456 = _eq_;
var o457 = eval(__compiler["compile"](list("\uFDD1vector?",vector(1,2,3)),__generator()));
return o455(o456,o457);
}))();
return ((function() {var o458 = (function(comp,res){
return (function() {if(not(comp(res,false))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),": ",util["inspect"](list("\uFDD1dict?",vector(1,2,3)))," got ",util["inspect"](res)," but expected ",util["inspect"](false)));
} else {return false;
}})()
;
});
var o459 = _eq_;
var o460 = eval(__compiler["compile"](list("\uFDD1dict?",vector(1,2,3)),__generator()));
return o458(o459,o460);
}))();
}))();
((function() {((function() {var o461 = (function(comp,res){
return (function() {if(not(comp(res,false))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),": ",util["inspect"](list("\uFDD1boolean?",dict("\uFDD1one",1)))," got ",util["inspect"](res)," but expected ",util["inspect"](false)));
} else {return false;
}})()
;
});
var o462 = _eq_;
var o463 = eval(__compiler["compile"](list("\uFDD1boolean?",dict("\uFDD1one",1)),__generator()));
return o461(o462,o463);
}))();
((function() {var o464 = (function(comp,res){
return (function() {if(not(comp(res,false))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),": ",util["inspect"](list("\uFDD1number?",dict("\uFDD1one",1)))," got ",util["inspect"](res)," but expected ",util["inspect"](false)));
} else {return false;
}})()
;
});
var o465 = _eq_;
var o466 = eval(__compiler["compile"](list("\uFDD1number?",dict("\uFDD1one",1)),__generator()));
return o464(o465,o466);
}))();
((function() {var o467 = (function(comp,res){
return (function() {if(not(comp(res,false))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),": ",util["inspect"](list("\uFDD1symbol?",dict("\uFDD1one",1)))," got ",util["inspect"](res)," but expected ",util["inspect"](false)));
} else {return false;
}})()
;
});
var o468 = _eq_;
var o469 = eval(__compiler["compile"](list("\uFDD1symbol?",dict("\uFDD1one",1)),__generator()));
return o467(o468,o469);
}))();
((function() {var o470 = (function(comp,res){
return (function() {if(not(comp(res,false))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),": ",util["inspect"](list("\uFDD1string?",dict("\uFDD1one",1)))," got ",util["inspect"](res)," but expected ",util["inspect"](false)));
} else {return false;
}})()
;
});
var o471 = _eq_;
var o472 = eval(__compiler["compile"](list("\uFDD1string?",dict("\uFDD1one",1)),__generator()));
return o470(o471,o472);
}))();
((function() {var o473 = (function(comp,res){
return (function() {if(not(comp(res,false))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),": ",util["inspect"](list("\uFDD1list?",dict("\uFDD1one",1)))," got ",util["inspect"](res)," but expected ",util["inspect"](false)));
} else {return false;
}})()
;
});
var o474 = _eq_;
var o475 = eval(__compiler["compile"](list("\uFDD1list?",dict("\uFDD1one",1)),__generator()));
return o473(o474,o475);
}))();
((function() {var o476 = (function(comp,res){
return (function() {if(not(comp(res,false))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),": ",util["inspect"](list("\uFDD1vector?",dict("\uFDD1one",1)))," got ",util["inspect"](res)," but expected ",util["inspect"](false)));
} else {return false;
}})()
;
});
var o477 = _eq_;
var o478 = eval(__compiler["compile"](list("\uFDD1vector?",dict("\uFDD1one",1)),__generator()));
return o476(o477,o478);
}))();
return ((function() {var o479 = (function(comp,res){
return (function() {if(not(comp(res,true))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),": ",util["inspect"](list("\uFDD1dict?",dict("\uFDD1one",1)))," got ",util["inspect"](res)," but expected ",util["inspect"](true)));
} else {return false;
}})()
;
});
var o480 = _eq_;
var o481 = eval(__compiler["compile"](list("\uFDD1dict?",dict("\uFDD1one",1)),__generator()));
return o479(o480,o481);
}))();
}))();
((function() {var o482 = (function(comp,res){
return (function() {if(not(comp(res,1))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),": ",util["inspect"](list("\uFDD1if",true,1,2))," got ",util["inspect"](res)," but expected ",util["inspect"](1)));
} else {return false;
}})()
;
});
var o483 = _eq_;
var o484 = eval(__compiler["compile"](list("\uFDD1if",true,1,2),__generator()));
return o482(o483,o484);
}))();
((function() {var o485 = (function(comp,res){
return (function() {if(not(comp(res,2))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),": ",util["inspect"](list("\uFDD1if",false,1,2))," got ",util["inspect"](res)," but expected ",util["inspect"](2)));
} else {return false;
}})()
;
});
var o486 = _eq_;
var o487 = eval(__compiler["compile"](list("\uFDD1if",false,1,2),__generator()));
return o485(o486,o487);
}))();
((function() {var o488 = (function(comp,res){
return (function() {if(not(comp(res,10))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),": ",util["inspect"](list("\uFDD1if","\uFDD1true",list("\uFDD1begin",list("\uFDD1define","\uFDD1a",5),list("\uFDD1*","\uFDD1a",2))))," got ",util["inspect"](res)," but expected ",util["inspect"](10)));
} else {return false;
}})()
;
});
var o489 = _eq_;
var o490 = eval(__compiler["compile"](list("\uFDD1if","\uFDD1true",list("\uFDD1begin",list("\uFDD1define","\uFDD1a",5),list("\uFDD1*","\uFDD1a",2))),__generator()));
return o488(o489,o490);
}))();
var x = 3;
((function() {var o491 = (function(comp,res){
return (function() {if(not(comp(res,"\uFDD1three"))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),": ",util["inspect"](list("\uFDD1cond",list(list("\uFDD1eq?","\uFDD1x",0),list("\uFDD1quote","\uFDD1zero")),list(list("\uFDD1eq?","\uFDD1x",1),list("\uFDD1quote","\uFDD1one")),list(list("\uFDD1eq?","\uFDD1x",2),list("\uFDD1quote","\uFDD1two")),list(list("\uFDD1eq?","\uFDD1x",3),list("\uFDD1quote","\uFDD1three"))))," got ",util["inspect"](res)," but expected ",util["inspect"]("\uFDD1three")));
} else {return false;
}})()
;
});
var o492 = _eq_;
var o493 = eval(__compiler["compile"](list("\uFDD1cond",list(list("\uFDD1eq?","\uFDD1x",0),list("\uFDD1quote","\uFDD1zero")),list(list("\uFDD1eq?","\uFDD1x",1),list("\uFDD1quote","\uFDD1one")),list(list("\uFDD1eq?","\uFDD1x",2),list("\uFDD1quote","\uFDD1two")),list(list("\uFDD1eq?","\uFDD1x",3),list("\uFDD1quote","\uFDD1three"))),__generator()));
return o491(o492,o493);
}))();
((function() {var o494 = (function(comp,res){
return (function() {if(not(comp(res,"\uFDD1none"))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),": ",util["inspect"](list("\uFDD1cond",list(list("\uFDD1eq?","\uFDD1x",0),list("\uFDD1quote","\uFDD1zero")),list(list("\uFDD1eq?","\uFDD1x",1),list("\uFDD1quote","\uFDD1one")),list(list("\uFDD1eq?","\uFDD1x",2),list("\uFDD1quote","\uFDD1two")),list("\uFDD1else",list("\uFDD1quote","\uFDD1none"))))," got ",util["inspect"](res)," but expected ",util["inspect"]("\uFDD1none")));
} else {return false;
}})()
;
});
var o495 = _eq_;
var o496 = eval(__compiler["compile"](list("\uFDD1cond",list(list("\uFDD1eq?","\uFDD1x",0),list("\uFDD1quote","\uFDD1zero")),list(list("\uFDD1eq?","\uFDD1x",1),list("\uFDD1quote","\uFDD1one")),list(list("\uFDD1eq?","\uFDD1x",2),list("\uFDD1quote","\uFDD1two")),list("\uFDD1else",list("\uFDD1quote","\uFDD1none"))),__generator()));
return o494(o495,o496);
}))();
var func = (function() {(function() {if(true) {return "yes";
} else {return "no";
}})()
;
return (1 + 2);
});
((function() {var o497 = (function(comp,res){
return (function() {if(not(comp(res,3))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),": ",util["inspect"](list("\uFDD1func"))," got ",util["inspect"](res)," but expected ",util["inspect"](3)));
} else {return false;
}})()
;
});
var o498 = _eq_;
var o499 = eval(__compiler["compile"](list("\uFDD1func"),__generator()));
return o497(o498,o499);
}))();
var faz = (function() {return ((function() {var o500 = (function(x){
(2 + 3);
return x = 3;
});
var o501 = 1;
return o500(o501);
}))();
});
((function() {var o502 = (function(comp,res){
return (function() {if(not(comp(res,undefined))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),": ",util["inspect"](list("\uFDD1faz"))," got ",util["inspect"](res)," but expected ",util["inspect"](undefined)));
} else {return false;
}})()
;
});
var o503 = _eq_;
var o504 = eval(__compiler["compile"](list("\uFDD1faz"),__generator()));
return o502(o503,o504);
}))();
var buz = (function() {(2 + 3);
var a = 4;
});
((function() {var o505 = (function(comp,res){
return (function() {if(not(comp(res,undefined))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),": ",util["inspect"](list("\uFDD1buz"))," got ",util["inspect"](res)," but expected ",util["inspect"](undefined)));
} else {return false;
}})()
;
});
var o506 = _eq_;
var o507 = eval(__compiler["compile"](list("\uFDD1buz"),__generator()));
return o505(o506,o507);
}))();
((function() {var o508 = (function(comp,res){
return (function() {if(not(comp(res,true))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),": ",util["inspect"](list("\uFDD1not",list("\uFDD1list?",0)))," got ",util["inspect"](res)," but expected ",util["inspect"](true)));
} else {return false;
}})()
;
});
var o509 = _eq_;
var o510 = eval(__compiler["compile"](list("\uFDD1not",list("\uFDD1list?",0)),__generator()));
return o508(o509,o510);
}))();
((function() {var o511 = (function(x,y){
return ((function() {var o514 = (function(comp,res){
return (function() {if(not(comp(res,1))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),": ",util["inspect"]("\uFDD1y")," got ",util["inspect"](res)," but expected ",util["inspect"](1)));
} else {return false;
}})()
;
});
var o515 = _eq_;
var o516 = eval(__compiler["compile"]("\uFDD1y",__generator()));
return o514(o515,o516);
}))();
});
var o512 = 0;
var o513 = (o512 + 1);
return o511(o512,o513);
}))();
var foo = 5;
((function() {var o517 = (function(baz,bar){
return ((function() {var o520 = (function(comp,res){
return (function() {if(not(comp(res,25))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),": ",util["inspect"](list("\uFDD1bar"))," got ",util["inspect"](res)," but expected ",util["inspect"](25)));
} else {return false;
}})()
;
});
var o521 = _eq_;
var o522 = eval(__compiler["compile"](list("\uFDD1bar"),__generator()));
return o520(o521,o522);
}))();
});
var o518 = foo;
var o519 = (function() {return (o518 * 5);
});
return o517(o518,o519);
}))();
var foo = 5;
((function() {var o523 = (function(foo,bar){
((function() {var o526 = (function(comp,res){
return (function() {if(not(comp(res,5))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),": ",util["inspect"]("\uFDD1foo")," got ",util["inspect"](res)," but expected ",util["inspect"](5)));
} else {return false;
}})()
;
});
var o527 = _eq_;
var o528 = eval(__compiler["compile"]("\uFDD1foo",__generator()));
return o526(o527,o528);
}))();
((function() {var o529 = (function(comp,res){
return (function() {if(not(comp(res,6))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),": ",util["inspect"]("\uFDD1bar")," got ",util["inspect"](res)," but expected ",util["inspect"](6)));
} else {return false;
}})()
;
});
var o530 = _eq_;
var o531 = eval(__compiler["compile"]("\uFDD1bar",__generator()));
return o529(o530,o531);
}))();
foo = 6;
return ((function() {var o532 = (function(comp,res){
return (function() {if(not(comp(res,6))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),": ",util["inspect"]("\uFDD1foo")," got ",util["inspect"](res)," but expected ",util["inspect"](6)));
} else {return false;
}})()
;
});
var o533 = _eq_;
var o534 = eval(__compiler["compile"]("\uFDD1foo",__generator()));
return o532(o533,o534);
}))();
});
var o524 = foo;
var o525 = (o524 + 1);
return o523(o524,o525);
}))();
return ((function() {var o535 = (function(comp,res){
return (function() {if(not(comp(res,5))) {throw(str("FAILURE with ",inspect("\uFDD1eval"),": ",util["inspect"]("\uFDD1foo")," got ",util["inspect"](res)," but expected ",util["inspect"](5)));
} else {return false;
}})()
;
});
var o536 = _eq_;
var o537 = eval(__compiler["compile"]("\uFDD1foo",__generator()));
return o535(o536,o537);
}))();
}))();

