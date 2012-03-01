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
return (!!obj && not(eq_p_(obj.list,undefined)));
});
var vector_p_ = (function(obj){
return (not(list_p_(obj)) && not(null_p_(obj)) && !!obj && eq_p_(typeof obj,"object") && not(eq_p_(obj.length,undefined)));
});
var dict_p_ = (function(obj){
return (not(symbol_p_(obj)) && !!obj && eq_p_(typeof obj,"object") && eq_p_(obj.length,undefined));
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
return ((function() {var loop = (function(lst){
return (function() {if(null_p_(lst)) {return false;
} else {return (function() {if(eq_p_(car(lst),val)) {return lst;
} else {return loop(cdr(lst));
}})()
;
}})()
;
});
var o10 = lst;
return loop(o10);
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
var o11 = 0;
return loop(o11);
}))();
});
var vector_dash_to_dash_list = vector_dash__gt_list;
var make_dash_vector = (function(count,val){
return ((function() {var o12 = (function(v){
return ((function() {var loop = (function(i){
return (function() {if((i < count)) {return ((function() {vector_dash_put_excl_(v,i,val);
return loop((i + 1));
}))();
} else {return v;
}})()
;
});
var o14 = 0;
return loop(o14);
}))();
});
var o13 = new Array(count);
return o12(o13);
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
var o15 = 0;
return loop(o15);
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
var o16 = 0;
return loop(o16);
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
var o17 = 0;
return loop(o17);
}))();
});
var vector_dash_fold = (function(func,acc,vec){
return ((function() {var loop = (function(i,acc){
return (function() {if((i < vector_dash_length(vec))) {return loop((i + 1),func(vector_dash_ref(vec,i),acc));
} else {return acc;
}})()
;
});
var o18 = 0;
var o19 = acc;
return loop(o18,o19);
}))();
});
var dict = (function() {
var args = vector_dash__gt_list(Array.prototype.slice.call(arguments));
var res = {};
((function() {var loop = (function(lst){
return (function() {if(not(null_p_(lst))) {return ((function() {var o21 = (function(key,val){
dict_dash_put_excl_(res,key,val);
return loop(cddr(lst));
});
var o22 = car(lst);
var o23 = cadr(lst);
return o21(o22,o23);
}))();
} else {return false;
}})()
;
});
var o20 = args;
return loop(o20);
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
return (function() {if(not(null_p_(lst))) {return ((function() {var o25 = (function(k){
dict_dash_put_excl_(res,k,func(dict_dash_ref(dct,k)));
return loop(cdr(lst));
});
var o26 = car(lst);
return o25(o26);
}))();
} else {return false;
}})()
;
});
var o24 = keys(dct);
return loop(o24);
}))();
return res;
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
var o27 = keys(dct);
return loop(o27);
}))();
return res;
});
var dict_dash__gt_list = (function(dct){
return vector_dash__gt_list(dict_dash__gt_vector(dct));
});
var keys = (function(dct){
return ((function() {var o28 = (function(res){
for(var k in dct) {
       res = cons(string_dash__gt_symbol(k), res);
    }return res;
});
var o29 = _emptylst;
return o28(o29);
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
var o30 = keys;
var o31 = vals;
return loop(o30,o31);
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
var o32 = obj1;
var o33 = obj2;
return loop(o32,o33);
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
var o34 = 0;
return loop(o34);
}))();
}))();
} else {return (function() {if((dict_p_(obj1) && dict_p_(obj2))) {return ((function() {return ((function() {var o35 = (function(keys1,keys2){
return (eq_p_(length(keys1),length(keys2)) && ((function() {var loop = (function(lst){
return (function() {if(null_p_(lst)) {return true;
} else {return (function() {if(equal_p_(dict_dash_ref(obj1,car(lst)),dict_dash_ref(obj2,car(lst)))) {return loop(cdr(lst));
} else {return false;
}})()
;
}})()
;
});
var o38 = keys1;
return loop(o38);
}))());
});
var o36 = keys(obj1);
var o37 = keys(obj2);
return o35(o36,o37);
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
return ((function() {var o39 = (function(i){
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
} else {return (function() {if(list_p_(obj)) {return ((function() {return ((function() {var o41 = (function(node,childr,sp){
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
var o42 = car(obj);
var o43 = cdr(obj);
var o44 = (space(obj) > 30);
return o41(o42,o43,o44);
}))();
}))();
} else {return (function() {if(vector_p_(obj)) {return ((function() {return ((function() {var o45 = (function(first,rest,sp){
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
var o46 = vector_dash_ref(obj,0);
var o47 = vector_dash_slice(obj,1);
var o48 = (space(obj) > 30);
return o45(o46,o47,o48);
}))();
}))();
} else {return (function() {if(dict_p_(obj)) {return ((function() {disp("{");
((function() {var o49 = (function(lst,sp){
return ((function() {var loop = (function(lst,first){
return (function() {if(not(null_p_(lst))) {return ((function() {var o54 = (function(key,val){
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
var o55 = car(lst);
var o56 = cadr(lst);
return o54(o55,o56);
}))();
} else {return false;
}})()
;
});
var o52 = lst;
var o53 = true;
return loop(o52,o53);
}))();
});
var o50 = dict_dash__gt_list(obj);
var o51 = (space(obj) > 30);
return o49(o50,o51);
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
});
var o40 = (function() {if(null_p_(rest)) {return 1;
} else {return car(rest);
}})()
;
return o39(o40);
}))();
});
var apply = (function(func,args){
return func.apply(null,list_dash__gt_vector(args));
});
var _gensym = 0;
var gensym = (function() {_gensym = (_gensym + 1);
return string_dash__gt_symbol(("o" + _gensym));
});


((function() {var util = require("util");var fs = require("fs");var reader = require("./parser");var grammar = require("./grammar");var js = require("./backends/js");var application_p_ = (function(form){
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
return ((function(i){
return ((function(e1){
return e1(form,e1);
}))((function(x,e2){
return (function() {if(not((i < n))) {return x;
} else {return ((function() {(function() {if((list_p_(x) && expander_p_(car(x)) && not(eq_p_(car(x),string_dash__gt_symbol("lambda"))))) {i = (i + 1);
} else {return false;
}})()
;
return initial_dash_expander(x,e2);
}))();
}})()
;
}));
}))(0);
});
var initial_dash_expander = (function(form,e){
return (function() {if(symbol_p_(form)) {return ((function() {return form;
}))();
} else {return (function() {if(literal_p_(form)) {return ((function() {return form;
}))();
} else {return (function() {if(vector_p_(form)) {return ((function() {return form;
}))();
} else {return (function() {if(dict_p_(form)) {return ((function() {return form;
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
return ((function(sig){
return ((function(name,arg_dash_names,body){
install_dash_expander(name,make_dash_expander(arg_dash_names,body));
return true;
}))(car(sig),cdr(sig),cddr(form));
}))(cadr(form));
}));
var make_dash_expander = (function(arg_dash_names,body){
assert(eq_p_(length(arg_dash_names),2),"define-expander functions must take two arguments");
return eval(__compiler.compile(compile(list_dash_append(list(string_dash__gt_symbol("lambda"),arg_dash_names),((function(o1){
return (function() {if(vector_p_(o1)) {return vector_dash_to_dash_list(o1);
} else {return o1;
}})()
;
}))(body)),macro_dash_generator.make_dash_fresh()),__generator()));
});
install_dash_expander(string_dash__gt_symbol("define_dash_macro"),(function(form,e){
return ((function(sig){
return ((function(name,pattern,body){
install_dash_macro(name,pattern,body);
return true;
}))(car(sig),cdr(sig),cddr(form));
}))(cadr(form));
}));
var macro_dash_generator = false;
var install_dash_macro = (function(name,pattern,body){
return install_dash_expander(name,make_dash_macro(pattern,body));
});
var make_dash_macro = (function(pattern,body){
return ((function(x,e){
return ((function(src){
return eval(compile(src,macro_dash_generator.make_dash_fresh()));
}))(list(string_dash__gt_symbol("lambda"),list(x,e),list(e,list_dash_append(list(string_dash__gt_symbol("let"),destructure(pattern,list(string_dash__gt_symbol("cdr"),x),_emptylst)),((function(o2){
return (function() {if(vector_p_(o2)) {return vector_dash_to_dash_list(o2);
} else {return o2;
}})()
;
}))(body)),e)));
}))(gensym(),gensym());
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
return list_dash_append(list(string_dash__gt_symbol("lambda"),car(cdr(form))),((function(o3){
return (function() {if(vector_p_(o3)) {return vector_dash_to_dash_list(o3);
} else {return o3;
}})()
;
}))(map((function(subform){
return e(subform,e);
}),cdr(cdr(form)))));
}));
install_dash_expander(string_dash__gt_symbol("cond"),(function(form,e){
return (function() {if(null_p_(cdr(form))) {return false;
} else {return ((function(forms){
return ((function(f){
return (function() {if(eq_p_(car(f),string_dash__gt_symbol("else"))) {return e(list_dash_append(list(string_dash__gt_symbol("begin")),((function(o4){
return (function() {if(vector_p_(o4)) {return vector_dash_to_dash_list(o4);
} else {return o4;
}})()
;
}))(cdr(f))),e);
} else {return e(list(string_dash__gt_symbol("if"),car(f),list_dash_append(list(string_dash__gt_symbol("begin")),((function(o5){
return (function() {if(vector_p_(o5)) {return vector_dash_to_dash_list(o5);
} else {return o5;
}})()
;
}))(cdr(f))),list_dash_append(list(string_dash__gt_symbol("cond")),((function(o6){
return (function() {if(vector_p_(o6)) {return vector_dash_to_dash_list(o6);
} else {return o6;
}})()
;
}))(cdr(forms)))),e);
}})()
;
}))(car(forms));
}))(cdr(form));
}})()
;
}));
install_dash_expander(string_dash__gt_symbol("begin"),(function(form,e){
return e(list(list_dash_append(list(string_dash__gt_symbol("lambda"),_emptylst),((function(o7){
return (function() {if(vector_p_(o7)) {return vector_dash_to_dash_list(o7);
} else {return o7;
}})()
;
}))(cdr(form)))),e);
}));
install_dash_expander(string_dash__gt_symbol("define"),(function(form,e){
return ((function(sig){
return (function() {if(list_p_(sig)) {return ((function() {return e(list(string_dash__gt_symbol("set"),car(sig),list_dash_append(list(string_dash__gt_symbol("lambda"),cdr(sig)),((function(o8){
return (function() {if(vector_p_(o8)) {return vector_dash_to_dash_list(o8);
} else {return o8;
}})()
;
}))(cddr(form)))),e);
}))();
} else {return (function() {if(symbol_p_(sig)) {return ((function() {return e(list(string_dash__gt_symbol("set"),sig,caddr(form)),e);
}))();
} else {return ((function() {throw(str("define requires a list"," or symbol to operate on: ",inspect(form)));
}))();
}})()
;
}})()
;
}))(cadr(form));
}));
install_dash_expander(string_dash__gt_symbol("let"),(function(form,e){
return ((function(name,forms){
assert((list_p_(forms) && list_p_(car(forms))),"invalid let");
return ((function(syms){
return ((function(body,symvals){
return e(list(list_dash_append(list(string_dash__gt_symbol("lambda"),_emptylst,list_dash_append(list(string_dash__gt_symbol("define"),list_dash_append(list(name),((function(o9){
return (function() {if(vector_p_(o9)) {return vector_dash_to_dash_list(o9);
} else {return o9;
}})()
;
}))(map(car,forms)))),((function(o10){
return (function() {if(vector_p_(o10)) {return vector_dash_to_dash_list(o10);
} else {return o10;
}})()
;
}))(body))),((function(o11){
return (function() {if(vector_p_(o11)) {return vector_dash_to_dash_list(o11);
} else {return o11;
}})()
;
}))(list_dash_append(map((function(k){
return list(string_dash__gt_symbol("define"),k,dict_dash_ref(symvals,k));
}),syms),list(list_dash_append(list(name),((function(o12){
return (function() {if(vector_p_(o12)) {return vector_dash_to_dash_list(o12);
} else {return o12;
}})()
;
}))(syms))))))),e);
}))((function() {if(symbol_p_(cadr(form))) {return cdddr(form);
} else {return cddr(form);
}})()
,zip(syms,map(cadr,forms)));
}))(map((function(el){
return gensym();
}),forms));
}))((function() {if(symbol_p_(cadr(form))) {return cadr(form);
} else {return gensym();
}})()
,(function() {if(symbol_p_(cadr(form))) {return caddr(form);
} else {return cadr(form);
}})()
);
}));
install_dash_expander(string_dash__gt_symbol("quote"),(function(form,e){
return ((function(src){
return ((function(q){
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
}))((function(el){
return e(list(string_dash__gt_symbol("quote"),el),e);
}));
}))(cadr(form));
}));
install_dash_expander(string_dash__gt_symbol("quasiquote"),(function(form,e){
return ((function(src){
return (function() {if(symbol_p_(src)) {return ((function() {return list(string_dash__gt_symbol("quote"),src);
}))();
} else {return (function() {if(literal_p_(src)) {return ((function() {return src;
}))();
} else {return (function() {if(vector_p_(src)) {return ((function() {return list(string_dash__gt_symbol("list_dash__gt_vector"),unquote_dash_splice_dash_expand(vector_dash_to_dash_list(src),e));
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
}))(cadr(form));
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
} else {return ((function(el){
return (function() {if((list_p_(el) && eq_p_(car(el),string_dash__gt_symbol("unquote_dash_splicing")))) {return ((function(src){
return quote_dash_splice(cdr(lst),cons(e(src,e),list_dash_push(lst_dash_acc,acc)),_emptylst);
}))((function() {if(literal_p_(cadr(el))) {return ((function() {return list(string_dash__gt_symbol("list"),cadr(el));
}))();
} else {return (function() {if(vector_p_(cadr(el))) {return ((function() {return list(string_dash__gt_symbol("vector_dash_to_dash_list"),cadr(el));
}))();
} else {return (function() {if(dict_p_(cadr(el))) {return ((function() {pp(el);
throw("cannot splice dict");
}))();
} else {return ((function() {return ((function(v){
return list(string_dash__gt_symbol("let"),list(list(v,cadr(el))),list(string_dash__gt_symbol("if"),list(string_dash__gt_symbol("vector_p_"),v),list(string_dash__gt_symbol("vector_dash_to_dash_list"),v),v));
}))(gensym());
}))();
}})()
;
}})()
;
}})()
);
} else {return quote_dash_splice(cdr(lst),lst_dash_acc,cons(e(list(string_dash__gt_symbol("quasiquote"),el),e),acc));
}})()
;
}))(car(lst));
}})()
;
});
return ((function(res){
return (function() {if(eq_p_(length(res),1)) {return car(res);
} else {return cons(string_dash__gt_symbol("list_dash_append"),reverse(res));
}})()
;
}))(quote_dash_splice(lst,_emptylst,_emptylst));
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
var expr_p_ = vector_dash_to_dash_list(Array.prototype.slice.call(arguments, 2));
return ((function(expr_p_,_per_parse){
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
return ((function(args){
return generator.write_dash_lambda(args,cddr(form),expr_p_,_per_parse);
}))(cadr(form));
});
var parse_dash_func_dash_call = (function(form){
return ((function(func){
assert((symbol_p_(func) || list_p_(func)),str("operator is not a procedure: ",inspect(form)));
return generator.write_dash_func_dash_call(func,cdr(form),expr_p_,_per_parse);
}))(car(form));
});
var parse_dash_quoted = (function(form){
return ((function(src){
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
}))(cadr(form));
});
var parse_dash_list = (function(form){
return ((function(first){
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
}))(car(form));
});
var parse_dash_vector = (function(vec){
return parse_dash_list(cons(string_dash__gt_symbol("vector"),vector_dash_to_dash_list(vec)));
});
var parse_dash_dict = (function(dict){
return ((function(lst,i){
return ((function(qlst){
return parse_dash_list(cons(string_dash__gt_symbol("dict"),qlst));
}))(map((function(el){
i = (i + 1);
return (function() {if(eq_p_(((i - 1) % 2),0)) {return list(string_dash__gt_symbol("quote"),el);
} else {return el;
}})()
;
}),lst));
}))(dict_dash__gt_list(dict),0);
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
}))(opt(expr_p_,false),(function(form){
var expr_p_ = vector_dash_to_dash_list(Array.prototype.slice.call(arguments, 1));
return parse(form,generator,opt(expr_p_,false));
}));
});
var read = (function(src){
return reader(grammar,src,vector());
});
var compile = (function(src,generator){
(function() {if(not(macro_dash_generator)) {macro_dash_generator = generator;
} else {return false;
}})()
;
return ((function(forms){
(function() {if(eq_p_(car(forms),string_dash__gt_symbol("begin"))) {return for_dash_each((function(form){
return parse(expand(form),generator);
}),cdr(forms));
} else {return parse(expand(forms),generator);
}})()
;
return generator.get_dash_code();
}))((function() {if(string_p_(src)) {return read(src);
} else {return src;
}})()
);
});
module.exports = dict(string_dash__gt_symbol("read"),read,string_dash__gt_symbol("expand"),expand,string_dash__gt_symbol("parse"),parse,string_dash__gt_symbol("compile"),compile,string_dash__gt_symbol("install_dash_expander"),install_dash_expander,string_dash__gt_symbol("expand_dash_once"),expand_dash_once,string_dash__gt_symbol("expand_dash_nth"),expand_dash_nth,string_dash__gt_symbol("set_dash_macro_dash_generator"),(function(g){
return (function() {if(not(macro_dash_generator)) {macro_dash_generator = g;
} else {return false;
}})()
;
}));
}))();

