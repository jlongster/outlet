var util = require("util");var type = (function(obj){
return (function() {if(number_p_(obj)) {return ((function() {return string_dash__gt_symbol("number");
}))();
} else {return (function() {if(boolean_p_(obj)) {return ((function() {return string_dash__gt_symbol("boolean");
}))();
} else {return (function() {if(string_p_(obj)) {return ((function() {return string_dash__gt_symbol("string");
}))();
} else {return (function() {if(null_p_(obj)) {return ((function() {return string_dash__gt_symbol("null");
}))();
} else {return (function() {if(list_p_(obj)) {return ((function() {return string_dash__gt_symbol("list");
}))();
} else {return (function() {if(vector_p_(obj)) {return ((function() {return string_dash__gt_symbol("vector");
}))();
} else {return (function() {if(dict_p_(obj)) {return ((function() {return string_dash__gt_symbol("dict");
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
return eq_p_(typeof obj,"number");
});
var string_p_ = (function(obj){
return eq_p_(typeof obj,"string");
});
var symbol_p_ = (function(obj){
return (!!obj && obj.str !== undefined && obj.symbol !== undefined);
});
var boolean_p_ = (function(obj){
return (eq_p_(obj,true) || eq_p_(obj,false));
});
var null_p_ = (function(obj){
return (!!obj && not(eq_p_(obj.length,undefined)) && eq_p_(obj.length,1) && eq_p_(vector_dash_ref(obj,0),null));
});
var list_p_ = (function(obj){
return (!!obj && not(eq_p_(obj.length,undefined)) && not(eq_p_(obj.list,undefined)));
});
var vector_p_ = (function(obj){
return (not(list_p_(obj)) && not(null_p_(obj)) && !!obj && eq_p_(typeof obj,"object") && not(eq_p_(obj.length,undefined)));
});
var dict_p_ = (function(obj){
return (not(symbol_p_(obj)) && !!obj && eq_p_(typeof obj,"object") && eq_p_(obj.length,undefined));
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
return (acc + inspect(el));
}),"",args);
});
var string_dash__gt_symbol = (function(str){
return ((function() {var o1 = (function(s){
s = s.replace(RegExp("-","g"),"_dash_");
s = s.replace(RegExp("\\?","g"),"_p_");
s = s.replace(RegExp("\\!","g"),"_excl_");
s = s.replace(RegExp(">","g"),"_gt_");
s = s.replace(RegExp("<","g"),"_lt_");
s = s.replace(RegExp("%","g"),"_per_");
s = s.replace(RegExp("=","g"),"_eq_");
return {str:s, symbol:true}});
var o2 = str;
return o1(o2);
}))();
});
var symbol_dash__gt_string = (function(sym){
return ((function() {var o3 = (function(s){
s = s.replace(RegExp("_dash_","g"),"-");
s = s.replace(RegExp("_p_","g"),"?");
s = s.replace(RegExp("_excl_","g"),"!");
s = s.replace(RegExp("_gt_","g"),">");
s = s.replace(RegExp("_lt_","g"),"<");
s = s.replace(RegExp("_per_","g"),"%");
s = s.replace(RegExp("_eq_","g"),"=");
return s;
});
var o4 = sym.str;
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
} else {return loop(cdr(lst));
}})()
;
}})()
;
});
var o12 = lst;
return loop(o12);
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
return (function() {if(not(null_p_(lst))) {return ((function() {func(car(lst));
return for_dash_each(func,cdr(lst));
}))();
} else {return false;
}})()
;
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
var o13 = 0;
return loop(o13);
}))();
});
var make_dash_vector = (function(count,val){
return ((function() {var o14 = (function(v){
return ((function() {var loop = (function(i){
return (function() {if((i < count)) {return ((function() {vector_dash_put_excl_(v,i,val);
return loop((i + 1));
}))();
} else {return v;
}})()
;
});
var o16 = 0;
return loop(o16);
}))();
});
var o15 = new Array(count);
return o14(o15);
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
} else {return loop((i + 1));
}})()
;
} else {return false;
}})()
;
});
var o17 = 0;
return loop(o17);
}))();
});
var vector_dash_length = (function(vec){
return vec.length;
});
var list_dash__gt_vector = (function(lst){
var res = [];
for_dash_each((function(el){
return res.push(el);
}),lst);
return res;
});
var vector_dash_map = (function(func,vec){
var res = [];
((function() {var loop = (function(i){
return (function() {if((i < vec.length)) {return ((function() {res.push(func(vector_dash_ref(vec,i)));
return loop((i + 1));
}))();
} else {return false;
}})()
;
});
var o18 = 0;
return loop(o18);
}))();
return res;
});
var vector_dash_for_dash_each = (function(func,vec){
return ((function() {var loop = (function(i){
return (function() {if((i < vec.length)) {return ((function() {func(vector_dash_ref(vec,i));
return loop((i + 1));
}))();
} else {return false;
}})()
;
});
var o19 = 0;
return loop(o19);
}))();
});
var vector_dash_fold = (function(func,acc,vec){
return ((function() {var loop = (function(i,acc){
return (function() {if((i < vector_dash_length(vec))) {return loop((i + 1),func(vector_dash_ref(vec,i),acc));
} else {return acc;
}})()
;
});
var o20 = 0;
var o21 = acc;
return loop(o20,o21);
}))();
});
var dict = (function() {
var args = vector_dash__gt_list(Array.prototype.slice.call(arguments));
var res = {};
((function() {var loop = (function(lst){
return (function() {if(not(null_p_(lst))) {return ((function() {var o23 = (function(key,val){
dict_dash_put_excl_(res,key,val);
return loop(cddr(lst));
});
var o24 = car(lst);
var o25 = cadr(lst);
return o23(o24,o25);
}))();
} else {return false;
}})()
;
});
var o22 = args;
return loop(o22);
}))();
return res;
});
var dict_dash_put_excl_ = (function(dct,k,v){
return dct[k.str] = v});
var dict_dash_ref = (function(dct,k){
return dct[k.str]});
var dict_dash_map = (function(func,dct){
var res = dict();
((function() {var loop = (function(lst){
return (function() {if(not(null_p_(lst))) {return ((function() {var o27 = (function(k){
dict_dash_put_excl_(res,k,func(dict_dash_ref(dct,k)));
return loop(cdr(lst));
});
var o28 = car(lst);
return o27(o28);
}))();
} else {return false;
}})()
;
});
var o26 = keys(dct);
return loop(o26);
}))();
return res;
});
var dict_dash_merge = (function(dct1,dct2){
return ((function() {var o29 = (function(res){
map((function(k){
return dict_dash_put_excl_(res,k,dict_dash_ref(dct1,k));
}),keys(dct1));
map((function(k){
return dict_dash_put_excl_(res,k,dict_dash_ref(dct2,k));
}),keys(dct2));
return res;
});
var o30 = dict();
return o29(o30);
}))();
});
var dict_dash__gt_vector = (function(dct){
var res = vector();
((function() {var loop = (function(lst){
return (function() {if(not(null_p_(lst))) {return ((function() {vector_dash_push_excl_(res,car(lst));
vector_dash_push_excl_(res,dict_dash_ref(dct,car(lst)));
return loop(cdr(lst));
}))();
} else {return false;
}})()
;
});
var o31 = keys(dct);
return loop(o31);
}))();
return res;
});
var dict_dash__gt_list = (function(dct){
return vector_dash__gt_list(dict_dash__gt_vector(dct));
});
var keys = (function(dct){
return ((function() {var o32 = (function(res){
for(var k in dct) {
       res = cons(string_dash__gt_symbol(k), res);
    }return res;
});
var o33 = _emptylst;
return o32(o33);
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
return loop(cdr(ks),cdr(vs));
}))();
} else {return false;
}})()
;
});
var o34 = keys;
var o35 = vals;
return loop(o34,o35);
}))();
return res;
});
var not = (function(obj){
return (typeof obj !== 'number' && !obj);
});
var _eq__eq_ = (function(obj1,obj2){
return (function() {if((symbol_p_(obj1) && symbol_p_(obj2))) {return obj1.str === obj2.str} else {return obj1 === obj2}})()
;
});
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
var o36 = obj1;
var o37 = obj2;
return loop(o36,o37);
}))();
}))();
} else {return (function() {if((vector_p_(obj1) && vector_p_(obj2))) {return ((function() {return ((function() {var loop = (function(i){
return (function() {if(((i < obj1.length) && (i < obj2.length))) {return ((function() {return true;
}))();
} else {return (function() {if(((i < obj1.length) || (i < obj2.length))) {return ((function() {return false;
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
var o38 = 0;
return loop(o38);
}))();
}))();
} else {return (function() {if((dict_p_(obj1) && dict_p_(obj2))) {return ((function() {return ((function() {var o39 = (function(keys1,keys2){
return (eq_p_(length(keys1),length(keys2)) && ((function() {var loop = (function(lst){
return (function() {if(null_p_(lst)) {return true;
} else {return (function() {if(equal_p_(dict_dash_ref(obj1,car(lst)),dict_dash_ref(obj2,car(lst)))) {return loop(cdr(lst));
} else {return false;
}})()
;
}})()
;
});
var o42 = keys1;
return loop(o42);
}))());
});
var o40 = keys(obj1);
var o41 = keys(obj2);
return o39(o40,o41);
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
var display = (function(msg){
return console.log(msg);
});
var pp = (function(obj){
return display(str(inspect(obj),"\n"));
});
var inspect = (function(obj){
var rest = vector_dash__gt_list(Array.prototype.slice.call(arguments, 1));
var space = (function(obj){
return (function() {if((literal_p_(obj) || symbol_p_(obj))) {return ((function() {return vector_dash_length(inspect(obj));
}))();
} else {return (function() {if(list_p_(obj)) {return ((function() {return (length(obj) + 1 + fold((function(el,acc){
return (acc + space(el));
}),0,obj));
}))();
} else {return (function() {if(dict_p_(obj)) {return ((function() {return space(dict_dash__gt_list(obj));
}))();
} else {return (function() {if(vector_p_(obj)) {return ((function() {return space(vector_dash__gt_list(obj));
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
});
return ((function() {var o43 = (function(i){
var buffer = "";
var get_dash_buffer = (function() {return buffer;
});
var disp = (function(str){
buffer = (buffer + str);
});
var pad = (function(n){
return vector_dash_for_dash_each((function(_){
return disp(" ");
}),make_dash_vector(n));
});
return (function() {if(number_p_(obj)) {return ((function() {return ("" + obj);
}))();
} else {return (function() {if(string_p_(obj)) {return ((function() {return obj;
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
} else {return (function() {if(list_p_(obj)) {return ((function() {return ((function() {var o45 = (function(node,childr,sp){
disp("(");
disp(inspect(node,(i + 1)));
for_dash_each((function(item){
(function() {if(sp) {return ((function() {disp("\n");
return pad(i);
}))();
} else {return disp(" ");
}})()
;
return disp(inspect(item,(i + 1)));
}),childr);
disp(")");
return get_dash_buffer();
});
var o46 = car(obj);
var o47 = cdr(obj);
var o48 = (space(obj) > 30);
return o45(o46,o47,o48);
}))();
}))();
} else {return (function() {if(vector_p_(obj)) {return ((function() {return ((function() {var o49 = (function(first,rest,sp){
disp("[");
disp(inspect(first,(i + 1)));
vector_dash_for_dash_each((function(item){
(function() {if(sp) {return ((function() {disp("\n");
return pad(i);
}))();
} else {return disp(" ");
}})()
;
return disp(inspect(item,(i + 1)));
}),rest);
disp("]");
return get_dash_buffer();
});
var o50 = vector_dash_ref(obj,0);
var o51 = vector_dash_slice(obj,1);
var o52 = (space(obj) > 30);
return o49(o50,o51,o52);
}))();
}))();
} else {return (function() {if(dict_p_(obj)) {return ((function() {disp("{");
((function() {var o53 = (function(lst,sp){
return ((function() {var loop = (function(lst,first){
return (function() {if(not(null_p_(lst))) {return ((function() {var o58 = (function(key,val){
(function() {if(not(first)) {return (function() {if(sp) {return ((function() {disp("\n");
return pad(i);
}))();
} else {return disp(" ");
}})()
;
} else {return false;
}})()
;
disp(":");
disp(inspect(key,i));
disp(" ");
disp(inspect(val,(i + 1 + vector_dash_length(symbol_dash__gt_string(key)))));
return loop(cddr(lst),false);
});
var o59 = car(lst);
var o60 = cadr(lst);
return o58(o59,o60);
}))();
} else {return false;
}})()
;
});
var o56 = lst;
var o57 = true;
return loop(o56,o57);
}))();
});
var o54 = dict_dash__gt_list(obj);
var o55 = (space(obj) > 30);
return o53(o54,o55);
}))();
disp("}");
return get_dash_buffer();
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
}})()
;
}})()
;
});
var o44 = (function() {if(null_p_(rest)) {return 1;
} else {return car(rest);
}})()
;
return o43(o44);
}))();
});
var apply = (function(func,args){
return func.apply(null,list_dash__gt_vector(args));
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
} else {return ((function() {(function() {if((list_p_(x) && expander_p_(car(x)) && not(eq_p_(car(x),string_dash__gt_symbol("lambda"))))) {i = (i + 1);
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
install_dash_expander(string_dash__gt_symbol("define_dash_expander"),(function(form,e){
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
return eval(__compiler.compile(compile(list_dash_append(list(string_dash__gt_symbol("lambda"),arg_dash_names),((function() {var o12 = (function(o11){
return (function() {if(vector_p_(o11)) {return vector_dash__gt_list(o11);
} else {return o11;
}})()
;
});
var o13 = body;
return o12(o13);
}))()),macro_dash_generator.make_dash_fresh()),__generator()));
});
install_dash_expander(string_dash__gt_symbol("define_dash_macro"),(function(form,e){
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
return eval(compile(src,macro_dash_generator.make_dash_fresh()));
});
var o24 = list(string_dash__gt_symbol("lambda"),list(x,e),list(e,list_dash_append(list(string_dash__gt_symbol("let"),destructure(pattern,list(string_dash__gt_symbol("cdr"),x),_emptylst)),((function() {var o26 = (function(o25){
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
} else {return (function() {if(eq_p_(car(pattern),string_dash__gt_symbol("."))) {return ((function() {return cons(list(cadr(pattern),access),bindings);
}))();
} else {return ((function() {return cons(list(car(pattern),list(string_dash__gt_symbol("car"),access)),destructure(cdr(pattern),list(string_dash__gt_symbol("cdr"),access),bindings));
}))();
}})()
;
}})()
;
});
install_dash_expander(string_dash__gt_symbol("lambda"),(function(form,e){
return list_dash_append(list(string_dash__gt_symbol("lambda"),car(cdr(form))),((function() {var o29 = (function(o28){
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
install_dash_expander(string_dash__gt_symbol("cond"),(function(form,e){
return (function() {if(null_p_(cdr(form))) {return false;
} else {return ((function() {var o31 = (function(forms){
return ((function() {var o33 = (function(f){
return (function() {if(eq_p_(car(f),string_dash__gt_symbol("else"))) {return e(list_dash_append(list(string_dash__gt_symbol("begin")),((function() {var o36 = (function(o35){
return (function() {if(vector_p_(o35)) {return vector_dash__gt_list(o35);
} else {return o35;
}})()
;
});
var o37 = cdr(f);
return o36(o37);
}))()),e);
} else {return e(list(string_dash__gt_symbol("if"),car(f),list_dash_append(list(string_dash__gt_symbol("begin")),((function() {var o39 = (function(o38){
return (function() {if(vector_p_(o38)) {return vector_dash__gt_list(o38);
} else {return o38;
}})()
;
});
var o40 = cdr(f);
return o39(o40);
}))()),list_dash_append(list(string_dash__gt_symbol("cond")),((function() {var o42 = (function(o41){
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
install_dash_expander(string_dash__gt_symbol("begin"),(function(form,e){
return e(list(list_dash_append(list(string_dash__gt_symbol("lambda"),_emptylst),((function() {var o45 = (function(o44){
return (function() {if(vector_p_(o44)) {return vector_dash__gt_list(o44);
} else {return o44;
}})()
;
});
var o46 = cdr(form);
return o45(o46);
}))())),e);
}));
install_dash_expander(string_dash__gt_symbol("define"),(function(form,e){
return ((function() {var o47 = (function(sig){
return (function() {if(list_p_(sig)) {return ((function() {return e(list(string_dash__gt_symbol("set"),car(sig),list_dash_append(list(string_dash__gt_symbol("lambda"),cdr(sig)),((function() {var o50 = (function(o49){
return (function() {if(vector_p_(o49)) {return vector_dash__gt_list(o49);
} else {return o49;
}})()
;
});
var o51 = cddr(form);
return o50(o51);
}))())),e);
}))();
} else {return (function() {if(symbol_p_(sig)) {return ((function() {return e(list(string_dash__gt_symbol("set"),sig,caddr(form)),e);
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
install_dash_expander(string_dash__gt_symbol("let"),(function(form,e){
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
return loop(cdr(lst),cdr(forms),dict_dash_merge(vars,dict(name,sym)),cons(list(string_dash__gt_symbol("define"),car(lst),fold((function(el,acc){
return replace(acc,el,dict_dash_ref(vars,el));
}),code,keys(vars))),acc));
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
return loop(o52,o53,o54,o55);
}))());
});
return ((function() {var o60 = (function(name,forms){
assert((list_p_(forms) && list_p_(car(forms))),"invalid let");
return ((function() {var o63 = (function(syms,body){
return e(list(list_dash_append(list(string_dash__gt_symbol("lambda"),_emptylst,list_dash_append(list(string_dash__gt_symbol("define"),list_dash_append(list(name),((function() {var o67 = (function(o66){
return (function() {if(vector_p_(o66)) {return vector_dash__gt_list(o66);
} else {return o66;
}})()
;
});
var o68 = map(car,forms);
return o67(o68);
}))())),((function() {var o70 = (function(o69){
return (function() {if(vector_p_(o69)) {return vector_dash__gt_list(o69);
} else {return o69;
}})()
;
});
var o71 = body;
return o70(o71);
}))())),((function() {var o73 = (function(o72){
return (function() {if(vector_p_(o72)) {return vector_dash__gt_list(o72);
} else {return o72;
}})()
;
});
var o74 = list_dash_append(generate_dash_defs(syms,forms),list(list_dash_append(list(name),((function() {var o76 = (function(o75){
return (function() {if(vector_p_(o75)) {return vector_dash__gt_list(o75);
} else {return o75;
}})()
;
});
var o77 = syms;
return o76(o77);
}))())));
return o73(o74);
}))())),e);
});
var o64 = map((function(el){
return gensym();
}),forms);
var o65 = (function() {if(symbol_p_(cadr(form))) {return cdddr(form);
} else {return cddr(form);
}})()
;
return o63(o64,o65);
}))();
});
var o61 = (function() {if(symbol_p_(cadr(form))) {return cadr(form);
} else {return gensym();
}})()
;
var o62 = (function() {if(symbol_p_(cadr(form))) {return caddr(form);
} else {return cadr(form);
}})()
;
return o60(o61,o62);
}))();
}));
install_dash_expander(string_dash__gt_symbol("quote"),(function(form,e){
return ((function() {var o78 = (function(src){
return ((function() {var o80 = (function(q){
return (function() {if(symbol_p_(src)) {return ((function() {return list(string_dash__gt_symbol("quote"),src);
}))();
} else {return (function() {if(literal_p_(src)) {return ((function() {return src;
}))();
} else {return (function() {if(vector_p_(src)) {return ((function() {return vector_dash_map(q,src);
}))();
} else {return (function() {if(dict_p_(src)) {return ((function() {return dict_dash_map(q,src);
}))();
} else {return (function() {if(list_p_(src)) {return ((function() {return cons(string_dash__gt_symbol("list"),map(q,src));
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
var o81 = (function(el){
return e(list(string_dash__gt_symbol("quote"),el),e);
});
return o80(o81);
}))();
});
var o79 = cadr(form);
return o78(o79);
}))();
}));
install_dash_expander(string_dash__gt_symbol("quasiquote"),(function(form,e){
return ((function() {var o82 = (function(src){
return (function() {if(symbol_p_(src)) {return ((function() {return list(string_dash__gt_symbol("quote"),src);
}))();
} else {return (function() {if(literal_p_(src)) {return ((function() {return src;
}))();
} else {return (function() {if(vector_p_(src)) {return ((function() {return list(string_dash__gt_symbol("list_dash__gt_vector"),unquote_dash_splice_dash_expand(vector_dash__gt_list(src),e));
}))();
} else {return (function() {if(dict_p_(src)) {return ((function() {return dict_dash_map((function(el){
return (function() {if((list_p_(el) && eq_p_(car(src),string_dash__gt_symbol("unquote")))) {return e(cadr(el),e);
} else {return e(list(string_dash__gt_symbol("quasiquote"),el),e);
}})()
;
}),src);
}))();
} else {return (function() {if(list_p_(src)) {return ((function() {return (function() {if(eq_p_(car(src),string_dash__gt_symbol("unquote"))) {return e(cadr(src),e);
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
var o83 = cadr(form);
return o82(o83);
}))();
}));
var unquote_dash_splice_dash_expand = (function(lst,e){
var list_dash_push = (function(lst,item){
return (function() {if(null_p_(item)) {return lst;
} else {return cons(cons(string_dash__gt_symbol("list"),reverse(item)),lst);
}})()
;
});
var quote_dash_splice = (function(lst,lst_dash_acc,acc){
return (function() {if(null_p_(lst)) {return list_dash_push(lst_dash_acc,acc);
} else {return ((function() {var o84 = (function(el){
return (function() {if((list_p_(el) && eq_p_(car(el),string_dash__gt_symbol("unquote_dash_splicing")))) {return ((function() {var o86 = (function(src){
return quote_dash_splice(cdr(lst),cons(e(src,e),list_dash_push(lst_dash_acc,acc)),_emptylst);
});
var o87 = (function() {if(literal_p_(cadr(el))) {return ((function() {return list(string_dash__gt_symbol("list"),cadr(el));
}))();
} else {return (function() {if(vector_p_(cadr(el))) {return ((function() {return list(string_dash__gt_symbol("vector_dash__gt_list"),cadr(el));
}))();
} else {return (function() {if(dict_p_(cadr(el))) {return ((function() {pp(el);
throw("cannot splice dict");
}))();
} else {return ((function() {return ((function() {var o88 = (function(v){
return list(string_dash__gt_symbol("let"),list(list(v,cadr(el))),list(string_dash__gt_symbol("if"),list(string_dash__gt_symbol("vector_p_"),v),list(string_dash__gt_symbol("vector_dash__gt_list"),v),v));
});
var o89 = gensym();
return o88(o89);
}))();
}))();
}})()
;
}})()
;
}})()
;
return o86(o87);
}))();
} else {return quote_dash_splice(cdr(lst),lst_dash_acc,cons(e(list(string_dash__gt_symbol("quasiquote"),el),e),acc));
}})()
;
});
var o85 = car(lst);
return o84(o85);
}))();
}})()
;
});
return ((function() {var o90 = (function(res){
return (function() {if(eq_p_(length(res),1)) {return car(res);
} else {return cons(string_dash__gt_symbol("list_dash_append"),reverse(res));
}})()
;
});
var o91 = quote_dash_splice(lst,_emptylst,_emptylst);
return o90(o91);
}))();
});
install_dash_expander(string_dash__gt_symbol("eval"),(function(form,e){
return list(string_dash__gt_symbol("eval"),list(string_dash__gt_symbol("__compiler.compile"),e(cadr(form),e),list(string_dash__gt_symbol("__generator"))));
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
install_dash_native(string_dash__gt_symbol("and"),string_dash__gt_symbol("write_dash_and"),verify_dash_not_dash_single);
install_dash_native(string_dash__gt_symbol("or"),string_dash__gt_symbol("write_dash_or"),verify_dash_not_dash_single);
install_dash_native(string_dash__gt_symbol("+"),string_dash__gt_symbol("write_dash_add"),verify_dash_not_dash_single);
install_dash_native(string_dash__gt_symbol("_dash_"),string_dash__gt_symbol("write_dash_subtract"),verify_dash_not_dash_single);
install_dash_native(string_dash__gt_symbol("*"),string_dash__gt_symbol("write_dash_multiply"),verify_dash_not_dash_single);
install_dash_native(string_dash__gt_symbol("/"),string_dash__gt_symbol("write_dash_divide"),verify_dash_not_dash_single);
install_dash_native(string_dash__gt_symbol("_gt_"),string_dash__gt_symbol("write_dash_gt"),verify_dash_not_dash_single);
install_dash_native(string_dash__gt_symbol("_lt_"),string_dash__gt_symbol("write_dash_lt"),verify_dash_not_dash_single);
install_dash_native(string_dash__gt_symbol("_per_"),string_dash__gt_symbol("write_dash_mod"),verify_dash_not_dash_single);
install_dash_native(string_dash__gt_symbol("require"),string_dash__gt_symbol("write_dash_require"),(function(form){
verify_dash_not_dash_single(form);
return for_dash_each((function(el){
return assert((list_p_(el) && eq_p_(length(el),2)),str("require needs a list of ","2 element lists: ",inspect(el)));
}),cdr(form));
}));
var parse = (function(form,generator){
var expr_p_ = vector_dash__gt_list(Array.prototype.slice.call(arguments, 2));
return ((function() {var o92 = (function(expr_p_,_per_parse){
var parse_dash_literal = (function(form){
return (function() {if(number_p_(form)) {return ((function() {return generator.write_dash_number(form,not(expr_p_));
}))();
} else {return (function() {if(string_p_(form)) {return ((function() {return generator.write_dash_string(form,not(expr_p_));
}))();
} else {return (function() {if(boolean_p_(form)) {return ((function() {return generator.write_dash_boolean(form,not(expr_p_));
}))();
} else {return (function() {if(null_p_(form)) {return ((function() {return generator.write_dash_empty_dash_list(form,not(expr_p_));
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
return (function() {if(eq_p_(car(form),string_dash__gt_symbol("set"))) {return generator.write_dash_set;
} else {return generator.write_dash_set_excl_;
}})()
(cadr(form),caddr(form),_per_parse);
});
var parse_dash_if = (function(form){
assert((length(form) > 2),str("`if` has no branches: ",inspect(form)));
return generator.write_dash_if(cadr(form),caddr(form),expr_p_,_per_parse,(function() {if(null_p_(cdddr(form))) {return false;
} else {return car(cdddr(form));
}})()
);
});
var parse_dash_lambda = (function(form){
assert((null_p_(cadr(form)) || list_p_(cadr(form)) || symbol_p_(cadr(form))),"lambda expects a list or symbol for arguments");
return ((function() {var o95 = (function(args){
return generator.write_dash_lambda(args,cddr(form),expr_p_,_per_parse);
});
var o96 = cadr(form);
return o95(o96);
}))();
});
var parse_dash_func_dash_call = (function(form){
return ((function() {var o97 = (function(func){
assert((symbol_p_(func) || list_p_(func)),str("operator is not a procedure: ",inspect(form)));
return generator.write_dash_func_dash_call(func,cdr(form),expr_p_,_per_parse);
});
var o98 = car(form);
return o97(o98);
}))();
});
var parse_dash_quoted = (function(form){
return ((function() {var o99 = (function(src){
return (function() {if(symbol_p_(src)) {return ((function() {return generator.write_dash_symbol(src,not(expr_p_));
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
var o100 = cadr(form);
return o99(o100);
}))();
});
var parse_dash_list = (function(form){
return ((function() {var o101 = (function(first){
return (function() {if(eq_p_(first,string_dash__gt_symbol("if"))) {return ((function() {return parse_dash_if(form);
}))();
} else {return (function() {if(eq_p_(first,string_dash__gt_symbol("lambda"))) {return ((function() {return parse_dash_lambda(form);
}))();
} else {return (function() {if(eq_p_(first,string_dash__gt_symbol("quote"))) {return ((function() {return parse_dash_quoted(form);
}))();
} else {return (function() {if((eq_p_(first,string_dash__gt_symbol("set_excl_")) || eq_p_(first,string_dash__gt_symbol("set")))) {return ((function() {return parse_dash_set(form);
}))();
} else {return (function() {if(eq_p_(first,string_dash__gt_symbol("_per_raw"))) {return ((function() {assert(string_p_(cadr(form)),"%raw expects a string");
return generator.write_dash_raw_dash_code(cadr(form));
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
var o102 = car(form);
return o101(o102);
}))();
});
var parse_dash_vector = (function(vec){
return parse_dash_list(cons(string_dash__gt_symbol("vector"),vector_dash__gt_list(vec)));
});
var parse_dash_dict = (function(dict){
return ((function() {var o103 = (function(lst,i){
return ((function() {var o106 = (function(qlst){
return parse_dash_list(cons(string_dash__gt_symbol("dict"),qlst));
});
var o107 = map((function(el){
i = (i + 1);
return (function() {if(eq_p_(((i - 1) % 2),0)) {return list(string_dash__gt_symbol("quote"),el);
} else {return el;
}})()
;
}),lst);
return o106(o107);
}))();
});
var o104 = dict_dash__gt_list(dict);
var o105 = 0;
return o103(o104,o105);
}))();
});
return (function() {if(symbol_p_(form)) {return ((function() {return generator.write_dash_term(form,not(expr_p_));
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
var o93 = opt(expr_p_,false);
var o94 = (function(form){
var expr_p_ = vector_dash__gt_list(Array.prototype.slice.call(arguments, 1));
return parse(form,generator,opt(expr_p_,false));
});
return o92(o93,o94);
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
return ((function() {var o108 = (function(forms){
(function() {if(eq_p_(car(forms),string_dash__gt_symbol("begin"))) {return for_dash_each((function(form){
return parse(expand(form),generator);
}),cdr(forms));
} else {return parse(expand(forms),generator);
}})()
;
return generator.get_dash_code();
});
var o109 = (function() {if(string_p_(src)) {return read(src);
} else {return src;
}})()
;
return o108(o109);
}))();
});
module.exports = dict(string_dash__gt_symbol("read"),read,string_dash__gt_symbol("expand"),expand,string_dash__gt_symbol("parse"),parse,string_dash__gt_symbol("compile"),compile,string_dash__gt_symbol("install_dash_expander"),install_dash_expander,string_dash__gt_symbol("expand_dash_once"),expand_dash_once,string_dash__gt_symbol("expand_dash_nth"),expand_dash_nth,string_dash__gt_symbol("pp"),pp,string_dash__gt_symbol("set_dash_macro_dash_generator"),(function(g){
return (function() {if(not(macro_dash_generator)) {macro_dash_generator = g;
} else {return false;
}})()
;
}));

