var util = require('util');

function make_symbol(str) {
    return str;
}

function map(func, arr) {
    var r = [];
    for(var i=0; i<arr.length; i++) {
        r.push(func(arr[i]));
    }
    return r;
}

function for_each(func, arr) {
    for(var i=0; i<arr.length; i++) {
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

module.exports = {
    make_symbol: make_symbol,
    map: map,
    for_each: for_each,
    display: display,
    pp: pp,
    inspect: inspect,
    eqp: eqp,
    equalp: equalp,
    nullp: nullp,
    car: car,
    cdr: cdr,
    vector_ref: vector_ref,
    vector_set_excl: vector_set_excl,
    vector_concat: vector_concat,
    vector: vector,
    object: object,
    object_ref: object_ref
};
