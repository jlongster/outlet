var util = require('util');

function make_symbol(str) {
    return {
        str: str,
        symbol: true
    };
}

function map(func, lst) {
    if(null_p_(lst)) {
        return [];
    }
    else {
        return cons(func(car(lst)),
                    map(func, cdr(lst)));
    }
}

function for_each(func, lst) {
    if(!null_p_(lst)) {
        func(car(lst));
        for_each(func, cdr(lst));
    }
}

function vector_map(func, vec) {
    var res = [];

    for(var i=0, len=vec.length; i<len; i++) {
        res.push(func(vec[i]));
    }

    return res;
}

function vector_for_each(func, vec) {
    for(var i=0, len=vec.length; i<len; i++) {
        func(vec[i]);
    }
}

function display(msg) {
    console.log(msg);
}

function pp(obj) {
    display(inspect(obj));
}

function inspect(obj) {
    return util.inspect(obj, null, 10);
}

function not(v) {
    return (typeof(v) != 'number' &&
            !v);
}

function eq_p_(v1, v2) {
    if(symbol_p_(v1) && symbol_p_(v2)) {
        return v1.str == v2.str;
    }

    return v1 == v2;
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
        var good = true;
        for(var i=0, len=v1.length; i<len; i++) {
            if(!equal_p_(v1[i], v2[i])) {
                good = false;
            }
        }
        return good;
    }
    else if(symbol_p_(v1) && symbol_p_(v2)) {
        return v1.str == v2.str;
    }
    return v1 == v2;
}

function null_p_(arr) {
    return arr.length !== undefined && arr.length == 0;
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

function make_list(arr) {
    arr.list = true;
    return arr;
}

function vector_to_list(vec) {
    function l(v, i) {
        if(i < v.length) {
            return cons(v[i], l(v, i+1));
        }
        else {
            return [];
        }
    }

    return l(vec, 0);
}

function list_to_vector(lst) {
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

function vector_ref(arr, i) {
    return arr[i];
}

function vector_set_excl_(arr, i, v) {
    arr[i] = v;
}

function vector_concat(arr1, arr2) {
    return arr1.concat(arr2);
}

function vector() {
    return Array.prototype.slice.call(arguments);
}

function vector_push(vec, val) {
    vec.push(val);
}

function object() {
    return {};
}

function object_ref(obj, key) {
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

function __gt_string(obj) {
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
            map(function(obj) { return __gt_string(obj); },
                obj).join(' ') +
            ')';
    }
    else if(vector_p_(obj)) {
        return '[' +
            vector_map(function(obj) { return __gt_string(obj); },
                       obj).join(' ') +
            ']';
    }
}

function list_append(lst1, lst2) {
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

function unquote_splice(lst) {
    // if(!lst.length || lst.length != 2 || lst[1].length === undefined) {
    //     return lst;
    // }

    if(null_p_(lst)) {
        return [];
    }
    else {
        var elem = car(lst);
        var rest = unquote_splice(cdr(lst));

        if(elem.please_splice) {
            return list_append(unquote_splice(elem.data),
                               rest);
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
            ret = ret.concat(obj.data);
        }
        else {
            ret.push(obj);
        }
    }

    return ret;
}