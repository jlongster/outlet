var __util = require('util');

var _emptylst = [null];

function string_dash__gt_symbol(str) {
    str = str.replace(/-/g, '_dash_');
    str = str.replace(/\?/g, '_p_');
    str = str.replace(/\!/g, '_excl_');
    str = str.replace(/>/g, '_gt_');
    str = str.replace(/</g, '_lt_');
    str = str.replace(/%/g, '_per_');

    return {
        str: str,
        symbol: true
    };
}

function map(func, lst) {
    if(null_p_(lst)) {
        return _emptylst;
    }
    else {
        return cons(func(car(lst)),
                    map(func, cdr(lst)));
    }
}

function for_dash_each(func, lst) {
    if(!null_p_(lst)) {
        func(car(lst));
        for_dash_each(func, cdr(lst));
    }
}

function make_dash_vector(i) {
    return new Array(i);
}

function vector_dash_map(func, vec) {
    var res = [];

    for(var i=0, len=vec.length; i<len; i++) {
        res.push(func(vec[i]));
    }

    return res;
}

function vector_dash_for_dash_each(func, vec) {
    for(var i=0, len=vec.length; i<len; i++) {
        func(vec[i]);
    }
}

function display(msg) {
    __util.print(msg);
}

function pp(obj) {
    display(inspect(obj) + '\n');
}

function inspect(obj) {
    return __util.inspect(obj, null, 20);
}

function not(v) {
    return (typeof(v) != 'number' &&
            !v);
}

function eq_p_(v1, v2) {
    if(symbol_p_(v1) && symbol_p_(v2)) {
        return v1.str == v2.str;
    }

    return v1 === v2;
}

function equal_p_(v1, v2) {
    if(list_p_(v1) && list_p_(v2)) {
        function l(lst1, lst2) {
            var n1 = null_p_(lst1);
            var n2 = null_p_(lst2);

            if(n1 && n2) {
                return true;
            }
            else if(n1 || n2) {
                return false
            }
            else if(equal_p_(car(lst1), car(lst2))) {
                return l(cdr(lst1), cdr(lst2));
            }

            return false;
        }

        return l(v1, v2);
    }
    else if(vector_p_(v1) && vector_p_(v2)) {
        for(var i=0, len=v1.length; i<len; i++) {
            if(!equal_p_(v1[i], v2[i])) {
                return false;
            }
        }
        return true;
    }
    else if(map_p_(v1) && map_p_(v2)) {
        for(var k in v1) {
            if(!equal_p_(v1[k], v2[k])) {
                return false;
            }
        }
        return true;
    }
    else if(symbol_p_(v1) && symbol_p_(v2)) {
        return v1.str == v2.str;
    }
    return v1 == v2;
}

function null_p_(arr) {
    return arr.length === 1 && arr[0] === null;
}

function cons(v1, v2) {
    var lst = [v1, v2];
    lst.list = true;
    return lst;
}

function car(arr) {
    return arr[0];
}

function cdr(arr) {
    return arr[1];
}

function cadr(lst) {
    return car(cdr(lst));
}

function cddr(lst) {
    return cdr(cdr(lst));
}

function caddr(lst) {
    return car(cdr(cdr(lst)));
}

function cdddr(lst) {
    return cdr(cdr(cdr(lst)));
}

function cadddr(lst) {
    return car(cdr(cdr(cdr(lst))));
}

function cddddr(lst) {
    return cdr(cdr(cdr(cdr(lst))));
}

function length(lst) {
    var i=0;
    for_dash_each(function(obj) { i++; },
                  lst);
    return i;
}

function reverse(lst) {
    if(null_p_(lst)) {
        return _emptylst;
    }
    return list_dash_append(reverse(cdr(lst)), list(car(lst)));
}

function make_dash_list(arr) {
    arr.list = true;
    return arr;
}

function list() {
    return vector_dash_to_dash_list(
        Array.prototype.slice.call(arguments)
    );
}

function vector_dash_to_dash_list(vec) {
    function l(v, i) {
        if(i < v.length) {
            return cons(v[i], l(v, i+1));
        }
        else {
            return _emptylst;
        }
    }

    return l(vec, 0);
}

function list_dash_to_dash_vector(lst) {
    var res = [];

    function m(lst) {
        if(!null_p_(lst)) {
            res.push(car(lst));
            m(cdr(lst));
        }
    };

    m(lst);
    return res;
}

function vector_dash_ref(arr, i) {
    return arr[i];
}

function vector_dash_set_excl_(arr, i, v) {
    arr[i] = v;
}

function vector_dash_concat(arr1, arr2) {
    return arr1.concat(arr2);
}

function vector() {
    return Array.prototype.slice.call(arguments);
}

function vector_dash_push(vec, val) {
    vec.push(val);
}

function hash_dash_map() {
    var keyvals = Array.prototype.slice.call(arguments);
    var res = {};

    for(var i=0, len=keyvals.length; i<len; i+=2) {
        var key = keyvals[i];

        // Ignore this, it's only to support the compiler for now...
        if(key.children &&
           key.children.length > 0 &&
           key.children[0].data &&
           key.children[0].data.str &&
           key.children[0].data.str == 'quote') {
            key = key.children[1].data.str;
        }
        else if(key.str) {
            key = key.str;
        }

        res[key] = keyvals[i+1];
    }

    return res;
}

function hash_dash_map_dash_map(func, m) {
    var res = {};
    for(var k in m) {
        res[k] = func(m[k]);
    }
    return res;
}

function hash_dash_map_dash_to_dash_vec(obj) {
    var res = [];
    for(var k in obj) {
        res.push(vector_to_list([string_dash__gt_symbol('quote'),
                                 string_dash__gt_symbol(k)]));
        res.push(obj[k]);
    }
    return res;
}

function object_dash_ref(obj, key) {
    return obj[key];
}

function number_p_(obj) {
    return typeof obj == 'number';
}

function symbol_p_(obj) {
    return obj && obj.str && obj.symbol;
}

function string_p_(obj) {
    return typeof obj == 'string';
}

function boolean_p_(obj) {
    return obj === true || obj === false;
}

function list_p_(obj) {
    return obj && obj.list;
}

function vector_p_(obj) {
    return obj && typeof obj == 'object' && obj.length !== undefined;
}

function map_p_(obj) {
    return obj && typeof obj == 'object' && obj.length === undefined;
}

function _dash__gt_string(obj) {
    if(number_p_(obj)) {
        return '' + obj;
    }
    else if(string_p_(obj)) {
        return '"' + obj.replace(/"/g, "\\\"") + '"';
    }
    else if(symbol_p_(obj)) {
        return obj.str;
    }
    else if(boolean_p_(obj)) {
        if(obj) {
            return '#t';
        }
        else {
            return '#f';
        }
    }
    else if(list_p_(obj)) {
        return '(' + 
            map(function(obj) { return _dash__gt_string(obj); },
                obj).join(' ') +
            ')';
    }
    else if(vector_p_(obj)) {
        return '[' +
            vector_dash_map(function(obj) { return _dash__gt_string(obj); },
                       obj).join(' ') +
            ']';
    }
    else if(map_p_(obj)) {
        var res = [];
        for(var k in obj) {
            res.push(k + ': ' + __util.inspect(obj[k], null, 10));
        }
        return '{' + res.join(', ') + '}';
    }
}

function list_dash_append(lst1, lst2) {
    function loop(lst) {
        if(null_p_(lst)) {
            return lst2;
        }
        else {
            return cons(car(lst), loop(cdr(lst)));
        }
    };

    if(null_p_(lst1)) {
        return lst2;
    }
    else {
        return loop(lst1);
    }
}

function string_dash_append() {
    return Array.prototype.slice.call(arguments).join('');
}

function unquote_splice(lst) {
    // if(!lst.length || lst.length != 2 || lst[1].length === undefined) {
    //     return lst;
    // }

    if(null_p_(lst)) {
        return _emptylst;
    }
    else {
        var elem = car(lst);
        var rest = unquote_splice(cdr(lst));

        if(elem.please_splice) {
            if(!list_p_(elem.data) && !null_p_(elem.data)) {
                throw ("Lists can only splice lists, unexpected object: " +
                       __gt_string(elem.data));
            }

            // do we need to unquote_splice elem.data?
            return list_dash_append(elem.data, rest);
        }
        else {
            return cons(elem, rest);
        }
    }
}

function unquote_splice_vec(vec) {
    var ret = [];
    for(var i=0, len=vec.length; i<len; i++) {
        var obj = vec[i];

        if(obj && obj.please_splice) {
            if(!vector_p_(obj.data)) {
                throw ("Vectors can only splice vectors, unexpected object: " +
                       obj.data);
            }
            ret = ret.concat(obj.data);
        }
        else {
            ret.push(obj);
        }
    }

    return ret;
}

function unquote_splice_map(obj) {
    // this is expensive, but I don't really care. this will all be
    // rewritten soon enough anyway.
    var res = {};

    for(var k in obj) {
        var prop = obj[k];
        if(prop && prop.please_splice) {
            if(!map_p_(prop.data)) {
                throw ("Maps can only splice maps, unexpected object: " +
                       prop.data);
            }

            for(j in prop.data) {
                res[j] = prop.data[j];
            }
        }
        else if(k != '__unquote_splicing') {
            res[k] = prop;
        }
    }

    return res;
}
var sys_dash_util = require("util");
var fs = require("fs");
var reader = require("./parser");
var grammar = require("./grammar");
var js = require("./backends/js");
var _gensym = 0;var gensym = function(){
_gensym = (_gensym+1);return string_dash__gt_symbol(("o"+_gensym));}
;var literal_p_ = function(x){
return (number_p_(x)||string_p_(x)||boolean_p_(x)||null_p_(x))}
;var keyword_p_ = function(x){
return eq_p_(x,string_dash__gt_symbol("set_excl_"));}
;var application_p_ = function(form){
return (list_p_(form)&&not(expander_p_(car(form))))}
;var ref = function(obj,name){
return object_dash_ref(obj,symbol_dash__gt_string(name));}
;var put_excl_ = vector_dash_set_excl_;var opt = function(arg,def){
return (function() {if(null_p_(arg)) { return def} else { return car(arg);}})();
}
;var pretty = function(lst){
var i = vector_dash_to_dash_list(Array.prototype.slice.call(arguments, 1));
var pad = function(n){
return vector_dash_for_dash_each(function(_){
return display(" ");}
,make_dash_vector((n*2)));}
;return (function(i){
pad(i);return (function() {if(null_p_(lst)) { return (function(){
return display("()");}
)();} else { return (function() {if(list_p_(lst)) { return (function(){
return (function(node,childr){
display("(");(function() {if(list_p_(node)) { return pretty(node,(i+1));} else { return display(_dash__gt_string(node));}})();
for_dash_each(function(item){
display("\n");pad(i);return pretty(item,(i+1));}
,childr);return display(")");}
)(car(lst),cdr(lst));}
)();} else { return (function(){
return display(_dash__gt_string(lst));}
)();}})();
}})();
}
)((function() {if(null_p_(i)) { return 0} else { return car(i);}})()
);}
;var symbol_dash__gt_string = function(sym){
return sym.str}
;var _expanders_ = unquote_splice_map({});var expander_dash_function = function(name){
return ref(_expanders_,name);}
;var install_dash_expander = function(name,func){
return put_excl_(_expanders_,symbol_dash__gt_string(name),func);}
;var expander_p_ = function(name){
return not(eq_p_(ref(_expanders_,name),undefined));}
;var expand = function(form){
return initial_dash_expander(form,initial_dash_expander);}
;var expand_dash_once = function(form){
return initial_dash_expander(form,function(x,e){
return x}
);}
;var initial_dash_expander = function(form,e){
return (function() {if(symbol_p_(form)) { return (function(){
return form}
)();} else { return (function() {if(literal_p_(form)) { return (function(){
return form}
)();} else { return (function() {if(expander_p_(car(form))) { return (function(){
return (expander_dash_function(car(form)))(form,e);}
)();} else { return (function(){
return map(function(subform){
return e(subform,e);}
,form);}
)();}})();
}})();
}})();
}
;install_dash_expander(string_dash__gt_symbol("define_dash_macro"),function(form,e){
return (function(sig){
return (function(keyword,pattern,body){
return e(unquote_splice(make_dash_list([string_dash__gt_symbol("install_dash_expander"),make_dash_list([unquote_splice(make_dash_list([string_dash__gt_symbol("quote"),make_dash_list([keyword,_emptylst])])),make_dash_list([make_dash_macro(pattern,body),_emptylst])])])),e);}
)(car(sig),cdr(sig),cddr(form));}
)(cadr(form));}
);var make_dash_macro = function(pattern,body){
return (function(x,e){
return unquote_splice(make_dash_list([string_dash__gt_symbol("lambda"),make_dash_list([unquote_splice(make_dash_list([x,make_dash_list([e,_emptylst])])),make_dash_list([unquote_splice(make_dash_list([e,make_dash_list([unquote_splice(make_dash_list([string_dash__gt_symbol("let"),make_dash_list([destructure(pattern,unquote_splice(make_dash_list([string_dash__gt_symbol("cdr"),make_dash_list([x,_emptylst])])),unquote_splice(_emptylst)),make_dash_list([{ please_splice: true, data: body },_emptylst])])])),make_dash_list([e,_emptylst])])])),_emptylst])])]))}
)(gensym(),gensym());}
;var destructure = function(pattern,access,bindings){
return (function() {if(null_p_(pattern)) { return (function(){
return bindings}
)();} else { return (function() {if(eq_p_(car(pattern),string_dash__gt_symbol("."))) { return (function(){
return cons(unquote_splice(make_dash_list([cadr(pattern),make_dash_list([access,_emptylst])])),bindings);}
)();} else { return (function(){
return cons(unquote_splice(make_dash_list([car(pattern),make_dash_list([unquote_splice(make_dash_list([string_dash__gt_symbol("car"),make_dash_list([access,_emptylst])])),_emptylst])])),destructure(cdr(pattern),unquote_splice(make_dash_list([string_dash__gt_symbol("cdr"),make_dash_list([access,_emptylst])])),bindings));}
)();}})();
}})();
}
;install_dash_expander(string_dash__gt_symbol("lambda"),function(form,e){
return unquote_splice(make_dash_list([string_dash__gt_symbol("lambda"),make_dash_list([car(cdr(form)),make_dash_list([{ please_splice: true, data: map(function(subform){
return e(subform,e);}
,cdr(cdr(form))) },_emptylst])])]))}
);install_dash_expander(string_dash__gt_symbol("cond"),function(form,e){
return (function() {if(null_p_(cdr(form))) { return false} else { return (function(forms){
return (function(f){
return (function() {if(eq_p_(car(f),string_dash__gt_symbol("else"))) { return unquote_splice(make_dash_list([string_dash__gt_symbol("begin"),make_dash_list([{ please_splice: true, data: map(function(s){
return e(s,e);}
,cdr(f)) },_emptylst])]))} else { return (function(){
return unquote_splice(make_dash_list([string_dash__gt_symbol("if"),make_dash_list([e(car(f),e),make_dash_list([unquote_splice(make_dash_list([string_dash__gt_symbol("begin"),make_dash_list([{ please_splice: true, data: map(function(s){
return e(s,e);}
,cdr(f)) },_emptylst])])),make_dash_list([e(unquote_splice(make_dash_list([string_dash__gt_symbol("cond"),make_dash_list([{ please_splice: true, data: cdr(forms) },_emptylst])])),e),_emptylst])])])]))}
)();}})();
}
)(car(forms));}
)(cdr(form));}})();
}
);install_dash_expander(string_dash__gt_symbol("begin"),function(form,e){
return e(unquote_splice(make_dash_list([unquote_splice(make_dash_list([string_dash__gt_symbol("lambda"),make_dash_list([unquote_splice(_emptylst),make_dash_list([{ please_splice: true, data: cdr(form) },_emptylst])])])),_emptylst])),e);}
);install_dash_expander(string_dash__gt_symbol("define"),function(form,e){
return (function(sig){
return (function() {if(list_p_(sig)) { return (function(){
return e(unquote_splice(make_dash_list([string_dash__gt_symbol("set"),make_dash_list([car(sig),make_dash_list([unquote_splice(make_dash_list([string_dash__gt_symbol("lambda"),make_dash_list([cdr(sig),make_dash_list([{ please_splice: true, data: cddr(form) },_emptylst])])])),_emptylst])])])),e);}
)();} else { return (function() {if(symbol_p_(sig)) { return (function(){
return e(unquote_splice(make_dash_list([string_dash__gt_symbol("set"),make_dash_list([sig,make_dash_list([caddr(form),_emptylst])])])),e);}
)();} else { return (function(){
throw(("define requires a list"+" or symbol to operate on"));}
)();}})();
}})();
}
)(cadr(form));}
);install_dash_expander(string_dash__gt_symbol("let"),function(form,e){
return (function(forms,body){
return e(unquote_splice(make_dash_list([unquote_splice(make_dash_list([string_dash__gt_symbol("lambda"),make_dash_list([map(car,forms),make_dash_list([{ please_splice: true, data: body },_emptylst])])])),make_dash_list([{ please_splice: true, data: map(cadr,forms) },_emptylst])])),e);}
)(cadr(form),cddr(form));}
);install_dash_expander(string_dash__gt_symbol("quote"),function(form,e){
return (function(src){
return (function() {if(symbol_p_(src)) { return (function(){
return unquote_splice(make_dash_list([string_dash__gt_symbol("quote"),make_dash_list([src,_emptylst])]))}
)();} else { return (function() {if(literal_p_(src)) { return (function(){
return src}
)();} else { return (function() {if(list_p_(src)) { return (function(){
return cons(string_dash__gt_symbol("list"),map(function(el){
return e(unquote_splice(make_dash_list([string_dash__gt_symbol("quote"),make_dash_list([el,_emptylst])])),e);}
,src));}
)();} else { return (function(){
throw(("invalid type of expression: "+inspect(src)));}
)();}})();
}})();
}})();
}
)(cadr(form));}
);install_dash_expander(string_dash__gt_symbol("quasiquote"),function(form,e){
return (function(src){
return (function() {if(symbol_p_(src)) { return (function(){
return unquote_splice(make_dash_list([string_dash__gt_symbol("quote"),make_dash_list([src,_emptylst])]))}
)();} else { return (function() {if(literal_p_(src)) { return (function(){
return src}
)();} else { return (function() {if(list_p_(src)) { return (function(){
return (function() {if(eq_p_(car(src),string_dash__gt_symbol("unquote"))) { return e(cadr(src),e);} else { return unquote_dash_splice_dash_expand(src,e);}})();
}
)();} else { return (function(){
throw(("invalid type of expression: "+inspect(src)));}
)();}})();
}})();
}})();
}
)(cadr(form));}
);install_dash_expander(string_dash__gt_symbol("and"),function(form,e){
return (function() {if(null_p_(cdr(form))) { return true} else { return (function(expr,rest){
return unquote_splice(make_dash_list([string_dash__gt_symbol("if"),make_dash_list([expr,make_dash_list([e(cons(string_dash__gt_symbol("and"),rest),e),make_dash_list([false,_emptylst])])])]))}
)(cadr(form),cddr(form));}})();
}
);var unquote_dash_splice_dash_expand = function(lst,e){
var list_dash_push = function(lst,item){
return (function() {if(null_p_(item)) { return lst} else { return cons(cons(string_dash__gt_symbol("list"),reverse(item)),lst);}})();
}
;var quote_dash_splice = function(lst,lst_dash_acc,acc){
return (function() {if(null_p_(lst)) { return list_dash_push(lst_dash_acc,acc);} else { return (function(el){
return (function() {if((list_p_(el)&&eq_p_(car(el),string_dash__gt_symbol("unquote_dash_splicing")))) { return (function(src){
return quote_dash_splice(cdr(lst),cons(e(src,e),list_dash_push(lst_dash_acc,acc)),unquote_splice(_emptylst));}
)((function() {if(literal_p_(cadr(el))) { return unquote_splice(make_dash_list([string_dash__gt_symbol("list"),make_dash_list([cadr(el),_emptylst])]))} else { return cadr(el);}})()
);} else { return quote_dash_splice(cdr(lst),lst_dash_acc,cons(e(unquote_splice(make_dash_list([string_dash__gt_symbol("quasiquote"),make_dash_list([el,_emptylst])])),e),acc));}})();
}
)(car(lst));}})();
}
;return (function(res){
return (function() {if(eq_p_(length(res),1)) { return car(res);} else { return cons(string_dash__gt_symbol("list_dash_append"),reverse(res));}})();
}
)(quote_dash_splice(lst,unquote_splice(_emptylst),unquote_splice(_emptylst)));}
;var assert = function(cnd,msg){
return (function() {if(not(cnd)) { throw(msg);}})();
}
;var read = function(src){
return reader(grammar,src,unquote_splice_vec([]));}
;var parse = function(form,generator){
var expr_p_ = vector_dash_to_dash_list(Array.prototype.slice.call(arguments, 2));
return (function(expr_p_,_per_parse){
var parse_dash_literal = function(form){
return (function() {if(number_p_(form)) { return (function(){
return generator.write_dash_number(form,not(expr_p_));}
)();} else { return (function() {if(string_p_(form)) { return (function(){
return generator.write_dash_string(form,not(expr_p_));}
)();} else { return (function() {if(boolean_p_(form)) { return (function(){
return generator.write_dash_boolean(form,not(expr_p_));}
)();} else { return (function() {if(null_p_(form)) { return (function(){
return generator.write_dash_empty_dash_list(form,not(expr_p_));}
)();} else { return (function(){
throw(("Invalid literal: "+inspect(form)));}
)();}})();
}})();
}})();
}})();
}
;var parse_dash_set = function(form){
assert(not(expr_p_),("set{!} cannot be an expression: "+_dash__gt_string(form)));assert(symbol_p_(cadr(form)),"set{!} expects a symbol to operate on");return ((function() {if(eq_p_(car(form),string_dash__gt_symbol("set"))) { return generator.write_dash_set} else { return generator.write_dash_set_excl_}})()
)(cadr(form),caddr(form),_per_parse);}
;var parse_dash_if = function(form){
assert((length(form)>2),("`if` has no branches: "+inspect(form)));return generator.write_dash_if(cadr(form),caddr(form),expr_p_,_per_parse,(function() {if(null_p_(cdddr(form))) { return false} else { return cadddr(form);}})()
);}
;var parse_dash_lambda = function(form){
assert((null_p_(cadr(form))||list_p_(cadr(form))||symbol_p_(cadr(form))),"lambda expects a list or symbol for arguments");return (function(args){
return generator.write_dash_lambda(args,cddr(form),expr_p_,_per_parse);}
)(cadr(form));}
;var parse_dash_func_dash_call = function(form){
return (function(func){
assert((symbol_p_(func)||list_p_(func)),("operator is not a procedure: "+_dash__gt_string(func)));return generator.write_dash_func_dash_call(func,cdr(form),expr_p_,_per_parse);}
)(car(form));}
;var parse_dash_quoted = function(form){
return (function(src){
return (function() {if(symbol_p_(src)) { return (function(){
return generator.write_dash_symbol(src,not(expr_p_));}
)();} else { return (function() {if(literal_p_(src)) { return (function(){
return parse_dash_literal(src);}
)();} else { return (function(){
throw(("unexpected type of object in quote, "+"literal expected: "+inspect(form)));}
)();}})();
}})();
}
)(cadr(form));}
;var parse_dash_list = function(form){
return (function() {if((eq_p_(car(form),string_dash__gt_symbol("set_excl_"))||eq_p_(car(form),string_dash__gt_symbol("set")))) { return (function(){
return parse_dash_set(form);}
)();} else { return (function() {if(eq_p_(car(form),string_dash__gt_symbol("if"))) { return (function(){
return parse_dash_if(form);}
)();} else { return (function() {if(eq_p_(car(form),string_dash__gt_symbol("lambda"))) { return (function(){
return parse_dash_lambda(form);}
)();} else { return (function() {if(eq_p_(car(form),string_dash__gt_symbol("quote"))) { return (function(){
return parse_dash_quoted(form);}
)();} else { return (function(){
return parse_dash_func_dash_call(form);}
)();}})();
}})();
}})();
}})();
}
;return (function() {if(symbol_p_(form)) { return (function(){
return generator.write_dash_term(form);}
)();} else { return (function() {if(literal_p_(form)) { return (function(){
return parse_dash_literal(form);}
)();} else { return (function() {if(list_p_(form)) { return (function(){
return parse_dash_list(form);}
)();} else { return (function() {if(vector_p_(form)) { return (function(){
return generator.write_dash_vector(form,true);}
)();} else { return (function() {if(hash_p_(form)) { return (function(){
return generator.write_dash_hash(form,true);}
)();} else { return (function(){
throw(("Unkown thing: "+form));}
)();}})();
}})();
}})();
}})();
}})();
}
)(opt(expr_p_,false),function(form){
var expr_p_ = vector_dash_to_dash_list(Array.prototype.slice.call(arguments, 1));
return parse(form,generator,opt(expr_p_,false));}
);}
;var compile = function(src,generator){
return (function(f){
generator.write_dash_runtime("js");(function(lmb){
return (function() {if(not(eq_p_(car(lmb),string_dash__gt_symbol("lambda")))) { throw("WAT");} else { return for_dash_each(function(form){
return parse(form,generator);}
,cddr(lmb));}})();
}
)(car(f));return generator.get_dash_code();}
)(expand(read(src)));}
;module.exports = unquote_splice_map({});module.exports.read = read;module.exports.expand = expand;module.exports.parse = parse;module.exports.compile = compile;
