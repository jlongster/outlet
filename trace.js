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
((function() {var compiler = require("./compiler");compiler.install_dash_expander(string_dash__gt_symbol("trace_dash_source"),(function(form,e){
var trace_dash_expander = (function(src,e){
return (function(x,e1){
return (function() {if((list_p_(x) && subexpression_p_(x,src))) {return list(string_dash__gt_symbol("trace.trace_dash_form"),e(list(string_dash__gt_symbol("quote"),x),e),list(string_dash__gt_symbol("lambda"),_emptylst,e(x,e1)));
} else {return e(x,e1);
}})()
;
});
});
var subexpression_p_ = (function(form,src){
return (equal_p_(form,src) || (list_p_(src) && (subexpression_p_(form,car(src)) || subexpression_p_(form,cdr(src)))));
});
return ((function(e1){
return e1(cadr(form),e1);
}))(trace_dash_expander(cadr(form),e));
}));
var level = 0;
var trace_dash_form = (function(src,k){
compiler.new_dash_string();
pr(string_dash_append(pad(level,"-"),compiler.pretty(src),"\n"));
level = (level + 1);
return ((function(value){
level = (level - 1);
compiler.new_dash_string();
pr(string_dash_append(pad(level,">"),"RESULT: ",compiler.pretty(value),"\n"));
return value;
}))(k());
});
var pad = (function(n,s){
return ((function(v){
return ((function(s){
return (function() {if((n > 0)) {return string_dash_append(s," ");
} else {return s;
}})()
;
}))(v.join(""));
}))(vector_dash_map((function(_){
return s;
}),make_dash_vector((n * 2))));
});
var pr = false;
pr = display;
var set_dash_prompt = (function(func){
pr = func;
});
module.exports = dict(string_dash__gt_symbol("trace_dash_form"),trace_dash_form,string_dash__gt_symbol("set_dash_prompt"),set_dash_prompt);
}))();

