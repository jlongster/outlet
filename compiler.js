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

function fold(func, acc, lst) {
    if(null_p_(lst)) {
        return acc;
    }
    else {
        return fold(func, func(car(lst), acc), cdr(lst));
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

function vector_dash_length(vec) {
    return vec.length;
}

function display(msg) {
    __util.print(msg);
}

function pp(obj) {
    display(inspect(obj) + '\n');
}

function inspect(obj) {
    return __util.inspect(obj, null, 50);
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
    else if(dict_p_(v1) && dict_p_(v2)) {
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
    return (arr &&
            arr.length !== undefined &&
            arr.length === 1 &&
            arr[0] === null);
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

function dict() {
    var keyvals = Array.prototype.slice.call(arguments);
    var res = {};

    for(var i=0, len=keyvals.length; i<len; i+=2) {
        var key = keyvals[i];

        if(key.str) {
            key = key.str;
        }

        res[key] = keyvals[i+1];
    }

    return res;
}

var hash_dash_map = dict;


function dict_dash_map(func, dict) {
    var res = {};
    for(var k in dict) {
        res[k] = func(dict[k]);
    }
    return res;
}

var hash_dash_map_dash_map = dict_dash_map;

function hash_dash_map_dash_to_dash_vec(obj) {
    var res = [];
    for(var k in obj) {
        res.push(vector_to_list([string_dash__gt_symbol('quote'),
                                 string_dash__gt_symbol(k)]));
        res.push(obj[k]);
    }
    return res;
}

function dict_dash_to_dash_list(dict) {
    var res = [];
    for(var k in dict) {
        res.push(string_dash__gt_symbol(k));
        res.push(dict[k]);
    }
    return vector_dash_to_dash_list(res);
}

function keys(dict) {
    var res = [];
    for(var k in dict) {
        res.push(k);
    }
    return vector_dash_to_dash_list(res);
}

function vals(dict) {
    var res = [];
    for(var k in dict) {
        res.push(dict[k]);
    }
    return vector_dash_to_dash_list(res);
}

function zip(keys, vals) {
    var obj = {};
    for(var i=0, len=keys.length; i<len; i++) {
        obj[keys[i]] = vals[i];
    }
    return obj;
}

function object_dash_ref(obj, key) {
    return obj[key];
}

function number_p_(obj) {
    return typeof obj == 'number';
}

function symbol_p_(obj) {
    return obj && obj.str != undefined && obj.symbol != undefined;
}

function string_p_(obj) {
    return typeof obj == 'string';
}

function boolean_p_(obj) {
    return obj === true || obj === false;
}

function list_p_(obj) {
    return !!obj && obj.list !== undefined;
}

function vector_p_(obj) {
    var v = (obj && typeof obj == 'object' && obj.length !== undefined);
    return !list_p_(obj) && !null_p_(obj) && v;
}

function dict_p_(obj) {
    var d = (obj && typeof obj == 'object' && obj.length === undefined);
    return !symbol_p_(obj) && d;
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
    else if(dict_p_(obj)) {
        var res = [];
        for(var k in obj) {
            res.push(k + ': ' + __util.inspect(obj[k], null, 10));
        }
        return '{' + res.join(', ') + '}';
    }
    else if(null_p_(obj)) {
        return '()';
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
            if(!dict_p_(prop.data)) {
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
((function() {var util = require("util");var fs = require("fs");var reader = require("./parser");var grammar = require("./grammar");var js = require("./backends/js");var _gensym = 0;
var gensym = (function() {_gensym = (_gensym + 1);
return string_dash__gt_symbol(("o" + _gensym));
});
var literal_p_ = (function(x){
return (number_p_(x) || string_p_(x) || boolean_p_(x) || null_p_(x));
});
var application_p_ = (function(form){
return (list_p_(form) && not(expander_p_(car(form))));
});
var ref = (function(obj,name){
return object_dash_ref(obj,symbol_dash__gt_string(name));
});
var put_excl_ = vector_dash_set_excl_;
var opt = (function(arg,def){
return (function() {if(null_p_(arg)) {return def;
} else {return car(arg);
}})()
;
});
var _str = "";
var disp = (function(str){
_str = (_str + str);
});
var new_dash_string = (function() {_str = "";
});
var pretty = (function(obj){
var i = vector_dash_to_dash_list(Array.prototype.slice.call(arguments, 1));
var pad = (function(n){
return vector_dash_for_dash_each((function(_){
return disp(" ");
}),make_dash_vector(n));
});
var space = (function(obj){
return (function() {if((literal_p_(obj) || symbol_p_(obj))) {return ((function() {return vector_dash_length(_dash__gt_string(obj));
}))();
} else {return (function() {if(list_p_(obj)) {return ((function() {return (length(obj) + 1 + fold((function(el,acc){
return (acc + space(el));
}),0,obj));
}))();
} else {return (function() {if(dict_p_(obj)) {return ((function() {return space(dict_dash_to_dash_list(obj));
}))();
} else {return (function() {if(vector_p_(obj)) {return ((function() {return space(vector_dash_to_dash_list(obj));
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
((function(i){
return (function() {if((symbol_p_(obj) || literal_p_(obj))) {return ((function() {return disp(_dash__gt_string(obj));
}))();
} else {return (function() {if(list_p_(obj)) {return ((function() {return ((function(node,childr,sp){
disp("(");
pretty(node,(i + 1));
for_dash_each((function(item){
(function() {if(sp) {return ((function() {disp("\n");
return pad(i);
}))();
} else {return disp(" ");
}})()
;
return pretty(item,(i + 1));
}),childr);
return disp(")");
}))(car(obj),cdr(obj),(space(obj) > 30));
}))();
} else {return false;
}})()
;
}})()
;
}))((function() {if(null_p_(i)) {return 1;
} else {return car(i);
}})()
);
return _str;
});
var symbol_dash__gt_string = (function(sym){
return sym.str;
});
var assert = (function(cnd,msg){
return (function() {if(not(cnd)) {throw(msg);
} else {return false;
}})()
;
});
var _expanders_ = dict();
var expander_dash_function = (function(name){
return ref(_expanders_,name);
});
var install_dash_expander = (function(name,func){
return put_excl_(_expanders_,symbol_dash__gt_string(name),func);
});
var expander_p_ = (function(name){
return not(eq_p_(ref(_expanders_,name),undefined));
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
return initial_dash_expander(form,(function(form,e){
return ((function(e1){
return e1(form,e1);
}))((function(x,e2){
return (function() {if(not((i < n))) {return x;
} else {return ((function() {i = (i + 1);
return e(x,e2);
}))();
}})()
;
}));
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
return eval(compile(list_dash_append(list(string_dash__gt_symbol("lambda"),arg_dash_names),((function(o1){
return (function() {if(vector_p_(o1)) {return vector_dash_to_dash_list(o1);
} else {return o1;
}})()
;
}))(body)),macro_dash_generator.make_dash_fresh()));
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
return eval(compile(list(string_dash__gt_symbol("lambda"),list(x,e),list(e,list_dash_append(list(string_dash__gt_symbol("let"),destructure(pattern,list(string_dash__gt_symbol("cdr"),x),_emptylst)),((function(o2){
return (function() {if(vector_p_(o2)) {return vector_dash_to_dash_list(o2);
} else {return o2;
}})()
;
}))(body)),e)),macro_dash_generator.make_dash_fresh()));
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
} else {return ((function() {throw(string_dash_append("define requires a list"," or symbol to operate on"));
}))();
}})()
;
}})()
;
}))(cadr(form));
}));
install_dash_expander(string_dash__gt_symbol("let"),(function(form,e){
return ((function(forms,body){
return e(list_dash_append(list(list_dash_append(list(string_dash__gt_symbol("lambda"),map(car,forms)),((function(o9){
return (function() {if(vector_p_(o9)) {return vector_dash_to_dash_list(o9);
} else {return o9;
}})()
;
}))(body))),((function(o10){
return (function() {if(vector_p_(o10)) {return vector_dash_to_dash_list(o10);
} else {return o10;
}})()
;
}))(map(cadr,forms))),e);
}))(cadr(form),cddr(form));
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
} else {return ((function() {throw(string_dash_append("invalid type of expression: ",inspect(src)));
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
} else {return (function() {if(vector_p_(src)) {return ((function() {return list(string_dash__gt_symbol("list_dash_to_dash_vector"),unquote_dash_splice_dash_expand(vector_dash_to_dash_list(src),e));
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
} else {return ((function() {throw(string_dash_append("invalid type of expression: ",inspect(src)));
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
install_dash_expander(string_dash__gt_symbol("eval_dash_outlet"),(function(form,e){
return list(string_dash__gt_symbol("eval"),list(string_dash__gt_symbol("__compiler.compile"),e(cadr(form),e),list(string_dash__gt_symbol("__generator"))));
}));
var _natives_ = dict();
var native_dash_function = (function(name){
return ref(_natives_,name);
});
var install_dash_native = (function(name,func,validator){
return put_excl_(_natives_,symbol_dash__gt_string(name),(function(form,gen,expr_p_,parse){
validator(form);
return ref(gen,func)(cdr(form),expr_p_,parse);
}));
});
var native_p_ = (function(name){
return not(eq_p_(ref(_natives_,name)),undefined);
});
var verify_dash_not_dash_single = (function(form){
return assert((length(form) > 1),string_dash_append("form requires at least one operand:",inspect(form)));
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
return assert((list_p_(el) && eq_p_(length(el),2)),string_dash_append("require needs a list of ","2 element lists: ",inspect(el)));
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
} else {return ((function() {throw(string_dash_append("Invalid literal: ",inspect(form)));
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
assert(not(expr_p_),string_dash_append("set{!} cannot be an expression: ",_dash__gt_string(form)));
assert(symbol_p_(cadr(form)),"set{!} expects a symbol to operate on");
return (function() {if(eq_p_(car(form),string_dash__gt_symbol("set"))) {return generator.write_dash_set;
} else {return generator.write_dash_set_excl_;
}})()
(cadr(form),caddr(form),_per_parse);
});
var parse_dash_if = (function(form){
assert((length(form) > 2),string_dash_append("`if` has no branches: ",inspect(form)));
return generator.write_dash_if(cadr(form),caddr(form),expr_p_,_per_parse,(function() {if(null_p_(cdddr(form))) {return false;
} else {return cadddr(form);
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
assert((symbol_p_(func) || list_p_(func)),string_dash_append("operator is not a procedure: ",_dash__gt_string(func)));
return generator.write_dash_func_dash_call(func,cdr(form),expr_p_,_per_parse);
}))(car(form));
});
var parse_dash_quoted = (function(form){
return ((function(src){
return (function() {if(symbol_p_(src)) {return ((function() {return generator.write_dash_symbol(src,not(expr_p_));
}))();
} else {return (function() {if(literal_p_(src)) {return ((function() {return parse_dash_literal(src);
}))();
} else {return ((function() {throw(string_dash_append("unexpected type of object in quote, ","literal expected: ",inspect(form)));
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
}))(dict_dash_to_dash_list(dict),0);
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
} else {return ((function() {throw(string_dash_append("Unkown thing: ",form));
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
return ((function(f){
parse(f,generator);
return generator.get_dash_code();
}))(expand((function() {if(string_p_(src)) {return read(src);
} else {return src;
}})()
));
});
module.exports = dict(string_dash__gt_symbol("read"),read,string_dash__gt_symbol("expand"),expand,string_dash__gt_symbol("parse"),parse,string_dash__gt_symbol("compile"),compile,string_dash__gt_symbol("install_dash_expander"),install_dash_expander,string_dash__gt_symbol("expand_dash_once"),expand_dash_once,string_dash__gt_symbol("expand_dash_nth"),expand_dash_nth,string_dash__gt_symbol("pretty"),pretty,string_dash__gt_symbol("expander_p_"),expander_p_,string_dash__gt_symbol("expander_dash_function"),expander_dash_function,string_dash__gt_symbol("literal_p_"),literal_p_,string_dash__gt_symbol("set_dash_macro_dash_generator"),(function(g){
return (function() {if(not(macro_dash_generator)) {macro_dash_generator = g;
} else {return false;
}})()
;
}),string_dash__gt_symbol("new_dash_string"),new_dash_string);
}))();

