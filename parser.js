var util = require('util');

function make_symbol(str) {
    return {
        str: str,
        symbol: true
    };
}

function map(func, arr) {
    var r = [];
    for(var i=0, len=arr.length; i<len; i++) {
        r.push(func(arr[i]));
    }
    return r;
}

function for_each(func, arr) {
    for(var i=0, len=arr.length; i<len; i++) {
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

    while(i<len) {
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
    cons: cons,
    car: car,
    cdr: cdr,
    vector_ref: vector_ref,
    vector_set_excl: vector_set_excl,
    vector_concat: vector_concat,
    vector: vector,
    object: object,
    object_ref: object_ref,
    numberp: numberp,
    symbolp: symbolp,
    stringp: stringp,
    pairp: pairp,
    unquote_splice: unquote_splice
};

var parser = function(grammar){
var Y = function(gen){
return (function(f){
return f(f);}
)(function(f){
return gen(function() {
var args = Array.prototype.slice.call(arguments);
return (function(ff){
return ff.apply(null,args);}
)(f(f));}
);}
);}
;var optional = function(func){
return function(text,state){
return (func(text,state)||unquote_splice([text,state]))}
}
;var eof = function(text,state){
return (function() {if(equalp(text,"")) { return unquote_splice([text,state])} else { return null}})()
}
;var terminator = function(text,state){
return unquote_splice(["",state])}
;var char = function(alphabet){
return function(text,state){
return (function() {if(((text.length>0)&&(alphabet.indexOf(text.charAt(0))>-1))) { return unquote_splice([text.substr(1),state])} else { return null}})()
}
}
;var not_char = function(alphabet){
return function(text,state){
return (function() {if(((text.length>0)&&eqp(alphabet.indexOf(text.charAt(0)),-1))) { return unquote_splice([text.substr(1),state])} else { return null}})()
}
}
;var any = function() {
var args = Array.prototype.slice.call(arguments);
return function(text,state){
var run = function(lst){
return (function() {if(nullp(lst)) { return null} else { return (function(r){
return (function() {if(r) { return r} else { return run(cdr(lst));}})()
}
)((car(lst))(text,state));}})()
}
;return run(args);}
}
;var all = function() {
var args = Array.prototype.slice.call(arguments);
return function(text,state){
var run = function(lst,r){
return (function() {if(nullp(lst)) { return r} else { return (function(r){
return (function() {if(!r) { return null} else { return run(cdr(lst),r);}})()
}
)((car(lst))(car(r),car(cdr(r))));}})()
}
;return run(args,unquote_splice([text,state]));}
}
;var capture = function(func,hook){
return function(text,state){
return (function(r){
return (function() {if(r) { return (function(t,s){
return unquote_splice([t,hook(text.substr(0,(text.length-t.length)),s)])}
)(car(r),car(cdr(r)));} else { return null}})()
}
)(func(text,state));}
}
;var before = function(func,hook){
return function(text,state){
return func(text,hook(state));}
}
;var after = function(func,hook){
return function(text,state){
return (function(r){
return (function() {if(r) { return unquote_splice([car(r),hook(state,car(cdr(r)))])} else { return null}})()
}
)(func(text,state));}
}
;return grammar(all,any,capture,char,not_char,optional,Y,eof,terminator,before,after);}
;var parse = function(grammar,text,state){
return (function(r){
return (function() {if(r) { return car(cdr(r));} else { return null}})()
}
)((parser(grammar))(text,state));}
;module.exports = parse;
