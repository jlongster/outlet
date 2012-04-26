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


var fs = require("fs");var chars_dash_whitespace = " \n\t\r";
var chars_dash_special = "(){}[],@'`:";
var chars_dash_delim = str(chars_dash_whitespace,chars_dash_special,";");
var _in_ = (function(str,char){
return number_p_(vector_dash_find(str,char));
});
var read = (function(src){
var index = 0;
var len = vector_dash_length(src);
var current = (function() {return (function() {if(finished()) {return "";
} else {return vector_dash_ref(src,index);
}})()
;
});
var previous = (function() {return vector_dash_ref(src,(index - 1));
});
var forward = (function() {index = (index + 1);
});
var back = (function() {index = (index - 1);
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
var parse_dash_string = (function() {return ((function() {var loop = (function(s){
forward();
return (function() {if(_eq__eq_(current(),"\\")) {return ((function() {forward();
return loop(str(s,((function() {var o6950945 = (function(c){
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
var o3050294 = current();
return o6950945(o3050294);
}))()));
}))();
} else {return (function() {if(_eq__eq_(current(),"\"")) {return ((function() {return s;
}))();
} else {return ((function() {return loop(str(s,current()));
}))();
}})()
;
}})()
;
});
var o6074854 = "";
return loop(o6074854);
}))();
});
var parse_dash_token = (function(s){
return (function() {if(s["match"](RegExp("^[-+]?[0-9]+$"))) {return ((function() {return make_dash_token("\uFDD1INTEGER",s);
}))();
} else {return (function() {if(s["match"](RegExp("^[-+]?[0-9]+\\.[0-9]*$"))) {return ((function() {return make_dash_token("\uFDD1FLOAT",s);
}))();
} else {return (function() {if(s["match"](RegExp("^[-+]?0x"))) {return ((function() {return ((function() {var o5870535 = (function(m,prefix){
return (function() {if(m) {return make_dash_token("\uFDD1HEX",str(prefix,vector_dash_ref(m,1)));
} else {throw(str("invalid hex value: ",s));
}})()
;
});
var o1477625 = s["match"](RegExp("0x([0-9a-fA-F]+)$"));
var o150903 = (function() {if(_eq__eq_(vector_dash_ref(s,0),"-")) {return "-";
} else {return "";
}})()
;
return o5870535(o1477625,o150903);
}))();
}))();
} else {return (function() {if((_eq__eq_(s,"#f") || _eq__eq_(s,"#t"))) {return ((function() {return make_dash_token("\uFDD1BOOLEAN",s);
}))();
} else {return ((function() {return make_dash_token("\uFDD1SYMBOL",s);
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
var parse_dash_comment = (function() {return ((function() {var loop = (function(s){
forward();
return (function() {if((finished() || _eq__eq_(current(),"\n"))) {return make_dash_token("\uFDD1COMMENT",s);
} else {return vector("__tco_call",(function() {return loop(str(s,current()));
}));
}})()
;
});
var o8221403 = "";
return trampoline(loop(o8221403));
}))();
});
var unique_dash_obj = list(true);
var make_dash_token = (function(type,data){
return list(unique_dash_obj,type,data);
});
var token_dash_type = cadr;
var token_dash_data = caddr;
var token_p_ = (function(tok){
return (list_p_(tok) && _eq__eq_(car(tok),unique_dash_obj));
});
var get_dash_token = (function() {skip_dash_whitespace();
return ((function() {var o5863356 = (function(c){
return (function() {if(_in_(chars_dash_special,c)) {return ((function() {forward();
return make_dash_token("\uFDD1SPECIAL",c);
}))();
} else {return (function() {if(_eq__eq_(c,"\"")) {return ((function() {return ((function() {var o4556859 = (function(s){
forward();
return make_dash_token("\uFDD1STRING",s);
});
var o2297730 = parse_dash_string();
return o4556859(o2297730);
}))();
}))();
} else {return (function() {if(_eq__eq_(c,";")) {return ((function() {return parse_dash_comment();
}))();
} else {return (function() {if(_eq__eq_(c,"")) {return ((function() {return false;
}))();
} else {return (function() {if(finished()) {return ((function() {return false;
}))();
} else {return ((function() {return ((function() {var loop = (function(s){
return (function() {if((_in_(chars_dash_delim,current()) || finished())) {return ((function() {return parse_dash_token(s);
}))();
} else {return ((function() {forward();
return vector("__tco_call",(function() {return loop(str(s,previous()));
}));
}))();
}})()
;
});
var o5869474 = "";
return trampoline(loop(o5869474));
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
var o1175692 = current();
return o5863356(o1175692);
}))();
});
var token_dash__gt_exp = (function(token){
return ((function() {var o2447862 = (function(type,data){
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
var o9405959 = token_dash_type(token);
var o7176135 = token_dash_data(token);
return o2447862(o9405959,o7176135);
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
var read_dash_exp = (function() {return ((function() {var o5933914 = (function(token){
return (function() {if(not(token)) {return ((function() {return make_dash_token("\uFDD1END",false);
}))();
} else {return (function() {if(compound_dash_end_p_(token)) {return ((function() {return token;
}))();
} else {return (function() {if(compound_dash_start_p_(token)) {return ((function() {return ((function() {var loop = (function(lst,exp){
return (function() {if((end_p_(exp) || compound_dash_end_p_(exp))) {return ((function() {var in_dash_list_p_ = special_p_(token,"(");
var in_dash_vector_p_ = special_p_(token,"[");
var in_dash_dict_p_ = special_p_(token,"{");
return (function() {if((in_dash_list_p_ && special_p_(exp,")"))) {return ((function() {return reverse(lst);
}))();
} else {return (function() {if((in_dash_vector_p_ && special_p_(exp,"]"))) {return ((function() {return list_dash__gt_vector(reverse(lst));
}))();
} else {return (function() {if((in_dash_dict_p_ && special_p_(exp,"}"))) {return ((function() {return ((function() {var o3243748 = (function(i){
return apply(dict,map((function(el){
i = (i + 1);
return (function() {if(eq_p_(((i - 1) % 2),0)) {return (function() {if((list_p_(el) && eq_p_(car(el),"\uFDD1quote"))) {return cadr(el);
} else {return el;
}})()
;
} else {return el;
}})()
;
}),reverse(lst)));
});
var o3153755 = 0;
return o3243748(o3153755);
}))();
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
var o7439942 = _emptylst;
var o3394370 = read_dash_exp();
return trampoline(loop(o7439942,o3394370));
}))();
}))();
} else {return (function() {if((special_p_(token,"'") || special_p_(token,":"))) {return ((function() {return list("\uFDD1quote",read_dash_exp());
}))();
} else {return (function() {if(special_p_(token,"`")) {return ((function() {return list("\uFDD1quasiquote",read_dash_exp());
}))();
} else {return (function() {if(special_p_(token,",")) {return ((function() {return ((function() {var o8748134 = (function(next){
return (function() {if(_eq__eq_(next,"@")) {return ((function() {forward();
return list("\uFDD1unquote-splicing",read_dash_exp());
}))();
} else {return ((function() {return list("\uFDD1unquote",read_dash_exp());
}))();
}})()
;
});
var o6820752 = current();
return o8748134(o6820752);
}))();
}))();
} else {return ((function() {return (function() {if(_eq__eq_(token_dash_type(token),"\uFDD1COMMENT")) {return read_dash_exp();
} else {return token_dash__gt_exp(token);
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
});
var o5565212 = get_dash_token();
return o5933914(o5565212);
}))();
});
return ((function() {var loop = (function(e_star_,e){
return (function() {if(end_p_(e)) {return (function() {if(_eq__eq_(length(e_star_),1)) {return car(e_star_);
} else {return cons("\uFDD1begin",reverse(e_star_));
}})()
;
} else {return vector("__tco_call",(function() {return loop(cons(e,e_star_),read_dash_exp());
}));
}})()
;
});
var o3336459 = _emptylst;
var o3540485 = read_dash_exp();
return trampoline(loop(o3336459,o3540485));
}))();
});
module["exports"] = dict("\uFDD1read",read);

