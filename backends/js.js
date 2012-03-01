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


((function() {var fs = require("fs");var should_dash_return_p_ = (function(form){
return not((list_p_(form) && (eq_p_(car(form),string_dash__gt_symbol("throw")) || eq_p_(car(form),string_dash__gt_symbol("set_excl_")) || eq_p_(car(form),string_dash__gt_symbol("set")))));
});
var generator = (function() {var code = vector();
var make_dash_fresh = (function() {return generator();
});
var write = (function(src){
var eol = vector_dash_to_dash_list(Array.prototype.slice.call(arguments, 1));
return code.push((src + (function() {if(null_p_(eol)) {return "";
} else {return "\n";
}})()
));
});
var write_dash_runtime = (function(target){
return (function() {if(not(equal_p_(target,"no-runtime"))) {return ((function() {write(fs.readFileSync("runtime.js","utf-8"),true);
return (function() {if(not(equal_p_(target,"js-noeval"))) {return write(fs.readFileSync("runtime-eval.js","utf-8"),true);
} else {return false;
}})()
;
}))();
} else {return false;
}})()
;
});
var inline_dash_writer = (function(str){
return ((function(first){
return (function() {return (function() {if(first) {first = false;
} else {return write(str);
}})()
;
});
}))(true);
});
var terminate_dash_expr = (function(expr_p_){
return (function() {if(not(expr_p_)) {return write(";",true);
} else {return false;
}})()
;
});
var write_dash_number = (function(obj,top_p_){
write(obj);
return terminate_dash_expr(not(top_p_));
});
var write_dash_boolean = (function(obj,top_p_){
(function() {if(obj) {return write("true");
} else {return write("false");
}})()
;
return terminate_dash_expr(not(top_p_));
});
var write_dash_empty_dash_list = (function(obj,top_p_){
write("_emptylst");
return terminate_dash_expr(not(top_p_));
});
var write_dash_string = (function(obj,top_p_){
return ((function(str){
str = str.replace(RegExp("\\\\","g"),"\\\\");
str = str.replace(RegExp("\n","g"),"\\n");
str = str.replace(RegExp("\r","g"),"\\r");
str = str.replace(RegExp("\t","g"),"\\t");
str = str.replace(RegExp("\"","g"),"\\\"");
write(("\"" + str + "\""));
return terminate_dash_expr(not(top_p_));
}))(obj);
});
var write_dash_symbol = (function(obj,top_p_){
write(("string_dash__gt_symbol(\"" + obj.str + "\")"));
return terminate_dash_expr(not(top_p_));
});
var write_dash_term = (function(obj,top_p_){
write(obj.str);
return terminate_dash_expr(not(top_p_));
});
var write_dash_set = (function(lval,rval,parse){
write("var ");
return write_dash_set_excl_(lval,rval,parse);
});
var write_dash_set_excl_ = (function(lval,rval,parse){
write_dash_term(lval);
write(" = ");
parse(rval,true);
return write(";",true);
});
var write_dash_if = (function(pred,tru,expr_p_,parse){
var fal = vector_dash_to_dash_list(Array.prototype.slice.call(arguments, 4));
write("(function() {");
write("if(");
parse(pred,true);
write(") {");
(function() {if(should_dash_return_p_(tru)) {return write("return ");
} else {return false;
}})()
;
parse(tru);
write("}");
(function() {if(not(null_p_(fal))) {return ((function() {write(" else {");
(function() {if(should_dash_return_p_(car(fal))) {return write("return ");
} else {return false;
}})()
;
parse(car(fal));
return write("}");
}))();
} else {return false;
}})()
;
write("})()",true);
return terminate_dash_expr(expr_p_);
});
var write_dash_lambda = (function(args,body,expr_p_,parse){
(function() {if(list_p_(args)) {return ((function() {var comma = inline_dash_writer(",");
var capture_dash_name = false;
var write_dash_args = (function(args){
return (function() {if(not(null_p_(args))) {return ((function() {return (function() {if(eq_p_(car(args),string_dash__gt_symbol("."))) {capture_dash_name = cadr(args);
} else {return ((function() {comma();
write_dash_term(car(args));
return write_dash_args(cdr(args));
}))();
}})()
;
}))();
} else {return false;
}})()
;
});
write("(function(");
write_dash_args(args);
write("){",true);
return (function() {if(capture_dash_name) {return ((function() {write("var ");
write_dash_term(capture_dash_name);
write(" = ");
write_dash_term(string_dash__gt_symbol("vector_dash__gt_list"));
write("(Array.prototype.slice.call(arguments, ");
write((length(args) - 2));
return write("));",true);
}))();
} else {return false;
}})()
;
}))();
} else {return (function() {if(symbol_p_(args)) {return ((function() {write("(function() {",true);
write("var ");
write_dash_term(args);
write(" = ");
write_dash_term(string_dash__gt_symbol("vector_dash__gt_list"));
return write("(Array.prototype.slice.call(arguments));",true);
}))();
} else {return (function() {if(null_p_(args)) {return ((function() {return write("(function() {");
}))();
} else {return false;
}})()
;
}})()
;
}})()
;
((function(i,len){
return for_dash_each((function(form){
(function() {if((eq_p_(i,(len - 1)) && should_dash_return_p_(form))) {return write("return ");
} else {return false;
}})()
;
parse(form);
i = (i + 1);
}),body);
}))(0,length(body));
write("})");
return terminate_dash_expr(expr_p_);
});
var write_dash_func_dash_call = (function(func,args,expr_p_,parse){
(function() {if(symbol_p_(func)) {return write_dash_term(func);
} else {return (function() {if(eq_p_(car(func),string_dash__gt_symbol("lambda"))) {return ((function() {write("(");
parse(func,true);
return write(")");
}))();
} else {return parse(func,true);
}})()
;
}})()
;
write("(");
((function(comma){
return for_dash_each((function(arg){
comma();
return parse(arg,true);
}),args);
}))(inline_dash_writer(","));
write(")");
return terminate_dash_expr(expr_p_);
});
var write_dash_raw_dash_code = (function(code){
return write(code);
});
var write_dash_op = (function(op,vals,expr_p_,parse){
write("(");
((function(op_dash_writer){
return for_dash_each((function(arg){
op_dash_writer();
return parse(arg,true);
}),vals);
}))(inline_dash_writer(str(" ",op," ")));
write(")");
return terminate_dash_expr(expr_p_);
});
var make_dash_op_dash_writer = (function(str){
return (function(vals,expr_p_,parse){
return write_dash_op(str,vals,expr_p_,parse);
});
});
var write_dash_require = (function(args,expr_p_,parse){
return for_dash_each((function(el){
write("var ");
write_dash_term(car(el));
write(" = require(");
write_dash_string(cadr(el));
return write(");");
}),args);
});
return dict(string_dash__gt_symbol("write_dash_runtime"),write_dash_runtime,string_dash__gt_symbol("write_dash_number"),write_dash_number,string_dash__gt_symbol("write_dash_string"),write_dash_string,string_dash__gt_symbol("write_dash_boolean"),write_dash_boolean,string_dash__gt_symbol("write_dash_term"),write_dash_term,string_dash__gt_symbol("write_dash_symbol"),write_dash_symbol,string_dash__gt_symbol("write_dash_empty_dash_list"),write_dash_empty_dash_list,string_dash__gt_symbol("write_dash_set"),write_dash_set,string_dash__gt_symbol("write_dash_set_excl_"),write_dash_set_excl_,string_dash__gt_symbol("write_dash_if"),write_dash_if,string_dash__gt_symbol("write_dash_lambda"),write_dash_lambda,string_dash__gt_symbol("write_dash_func_dash_call"),write_dash_func_dash_call,string_dash__gt_symbol("write_dash_raw_dash_code"),write_dash_raw_dash_code,string_dash__gt_symbol("write_dash_require"),write_dash_require,string_dash__gt_symbol("write_dash_and"),make_dash_op_dash_writer("&&"),string_dash__gt_symbol("write_dash_or"),make_dash_op_dash_writer("||"),string_dash__gt_symbol("write_dash_add"),make_dash_op_dash_writer("+"),string_dash__gt_symbol("write_dash_subtract"),make_dash_op_dash_writer("-"),string_dash__gt_symbol("write_dash_multiply"),make_dash_op_dash_writer("*"),string_dash__gt_symbol("write_dash_divide"),make_dash_op_dash_writer("/"),string_dash__gt_symbol("write_dash_gt"),make_dash_op_dash_writer(">"),string_dash__gt_symbol("write_dash_lt"),make_dash_op_dash_writer("<"),string_dash__gt_symbol("write_dash_mod"),make_dash_op_dash_writer("%"),string_dash__gt_symbol("make_dash_fresh"),make_dash_fresh,string_dash__gt_symbol("get_dash_code"),(function() {return code.join("");
}));
});
module.exports = generator;
}))();

