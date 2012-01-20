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
return (function() {if(equal_p_(text,"")) { return unquote_splice([text,state])} else { return null}})()
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
return (function() {if(((text.length>0)&&eq_p_(alphabet.indexOf(text.charAt(0)),-1))) { return unquote_splice([text.substr(1),state])} else { return null}})()
}
}
;var any = function() {
var args = Array.prototype.slice.call(arguments);
return function(text,state){
var run = function(lst){
return (function() {if(null_p_(lst)) { return null} else { return (function(r){
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
return (function() {if(null_p_(lst)) { return r} else { return (function(r){
return (function() {if(not(r)) { return null} else { return run(cdr(lst),r);}})()
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
