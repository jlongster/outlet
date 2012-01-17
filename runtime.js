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
    return util.inspect(obj);
}

function eqp(v1, v2) {
    return v1 == v2;
}

function equalp(v1, v2) {
    return v1 == v2;
}

function nullp(arr) {
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

function vector_set_excl(arr, i, v) {
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

function numberp(obj) {
    return typeof obj == 'number';
}

function symbolp(obj) {
    return (obj.str && obj.symbol);
}

function stringp(obj) {
    return typeof obj == 'string';
}

function pairp(obj) {
    return obj.length;
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
