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

function print(msg) {
    console.log(msg);
}

function inspect(obj) {
    return util.inspect(obj);
}

function nullp(arr) {
    return obj.length && obj.length == 0;
}

function car(arr) {
    return arr[0];
}

function cdr(arr) {
    return arr.slice(1);
}