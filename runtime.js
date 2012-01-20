var util = require('util');

function make_symbol(str) {
    return {
        str: str,
        symbol: true
    };
}

function map(func, arr) {
    var r = [];
    for(var i = 0, len = arr.length; i < len; i++) {
        r.push(func(arr[i]));
    }
    return r;
}

function for_each(func, arr) {
    for(var i = 0, len = arr.length; i < len; i++) {
        func(arr[i]);
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

function eq_p_(v1, v2) {
    if(symbol_p_(v1) && symbol_p_(v2)) {
        return v1.str == v2.str;
    }

    return v1 == v2;
}

function equal_p_(v1, v2) {
    if(pair_p_(v1) && pair_p_(v2)) {
        var good = true;        
        for(var i=0, len=v1.length; i<len; i++) {
            good = good && equal_p_(v1[i], v2[i]);
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
    // this is NOT a correct representation for pairs, but will do for
    // now
    if(v2.length) {
        return [v1].concat(v2);
    }
    else {
        return [v1, v2];
    }
}

function car(arr) {
    return arr[0];
}

function cdr(arr) {
    return arr.slice(1);
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

function vector(v) {
    return [v];
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

function pair_p_(obj) {
    return obj && typeof obj != 'string' && obj.length;
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
    else if(pair_p_(obj)) {
        return '(' + 
            map(function(obj) { return __gt_string(obj); },
                obj).join(' ') +
            ')';
    }
}

function unquote_splice(arr) {
    var res = [], i = 0, len = arr.length, elem;

    while(i < len) {
        elem = arr[i];
        if(elem.please_splice) {
            res = res.concat(unquote_splice(elem.data));
        }
        else {
            res.push(elem);
        }

        i++;
    }

    return res;
}
