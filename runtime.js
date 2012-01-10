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

function nullp(arr) {
    return arr.length !== undefined && arr.length == 0;
}

function car(arr) {
    return arr[0];
}

function cdr(arr) {
    return arr.slice(1);
}

module.exports = {
    make_symbol: make_symbol,
    map: map,
    for_each: for_each,
    display: display,
    pp: pp,
    inspect: inspect,
    eqp: eqp,
    nullp: nullp,
    car: car,
    cdr: cdr
}
