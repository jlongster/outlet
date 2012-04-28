var __args = process.argv.slice(2);var util = require("util");var type = (function(obj){
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


var __compiler = require('/Users/james/projects/outlet/boot/backends/../compiler');
var __generator = require('/Users/james/projects/outlet/boot/backends/../backends/js');
var read = __compiler.read;
var vec_dash_getter = (function(i){
return (function(vec){
return vector_dash_ref(vec,i);
});
});
var unique_dash_obj = list(false);
var make_dash_node = (function(type,data,lineno,colno){
return vector(unique_dash_obj,type,data,lineno,colno);
});
var copy_dash_node = (function(node,data){
return make_dash_node(node_dash_type(node),data,node_dash_lineno(node),node_dash_colno(node));
});
var node_dash_type = vec_dash_getter(1);
var node_dash_data = vec_dash_getter(2);
var node_dash_lineno = vec_dash_getter(3);
var node_dash_colno = vec_dash_getter(4);
var assert_dash_node = (function(node){
return (function() {if(not((vector_p_(node) && _eq__eq_(vector_dash_ref(node,0),unique_dash_obj)))) {throw(str("not a node: ",node));
} else {return false;
}})()
;
});
var assert_dash_type = (function(node,type){
return (function() {if(not(_eq__eq_(node_dash_type(node),type))) {throw(str("expected node type ",type,": ",node));
} else {return false;
}})()
;
});
var is_dash_type_p_ = (function(node,type){
assert_dash_node(node);
return _eq__eq_(node_dash_type(node),type);
});
var is_dash_atom_p_ = (function(node){
return (is_dash_type_p_(node,"\uFDD1ATOM") || (is_dash_type_p_(node,"\uFDD1LIST") && null_p_(node_dash_data(node))));
});
var is_dash_list_p_ = (function(node){
return is_dash_type_p_(node,"\uFDD1LIST");
});
var is_dash_vector_p_ = (function(node){
return is_dash_type_p_(node,"\uFDD1VECTOR");
});
var is_dash_dict_p_ = (function(node){
return is_dash_type_p_(node,"\uFDD1DICT");
});
var is_dash_empty_dash_list_p_ = (function(node){
return (is_dash_list_p_(node) && null_p_(node_dash_data(node)));
});
var make_dash_atom = (function(type,parent){
return make_dash_node("\uFDD1ATOM",type,node_dash_lineno(parent),node_dash_colno(parent));
});
var make_dash_list = (function(){
var children = vector_dash__gt_list(Array.prototype.slice.call(arguments, 0));
return ((function() {var o1 = (function(first){
return make_dash_node("\uFDD1LIST",children,node_dash_lineno(first),node_dash_colno(first));
});
var o2 = car(children);
return o1(o2);
}))();
});
var prepend = (function(node,lst){
return make_dash_node("\uFDD1LIST",cons(node,node_dash_data(lst)),node_dash_lineno(node),node_dash_colno(node));
});
var map_dash_children = (function(func,lst){
return make_dash_node("\uFDD1LIST",map(func,node_dash_data(lst)),node_dash_lineno(lst),node_dash_colno(lst));
});
var first = (function(node){
return car(node_dash_data(node));
});
var first_star_ = (function(node){
return node_dash_data(car(node_dash_data(node)));
});
module["exports"] = dict("\uFDD1make-node",make_dash_node,"\uFDD1copy-node",copy_dash_node,"\uFDD1node-type",node_dash_type,"\uFDD1node-data",node_dash_data,"\uFDD1node-lineno",node_dash_lineno,"\uFDD1node-colno",node_dash_colno,"\uFDD1type?",is_dash_type_p_,"\uFDD1atom?",is_dash_atom_p_,"\uFDD1list?",is_dash_list_p_,"\uFDD1vector?",is_dash_vector_p_,"\uFDD1dict?",is_dash_dict_p_,"\uFDD1empty-list?",is_dash_empty_dash_list_p_,"\uFDD1make-list",make_dash_list,"\uFDD1make-atom",make_dash_atom,"\uFDD1prepend",prepend,"\uFDD1map-children",map_dash_children,"\uFDD1first",first,"\uFDD1first*",first_star_);

