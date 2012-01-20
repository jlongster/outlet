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

var ast = require("./ast");
var grammar = function(all,any,capture,char,not_char,optional,Y,eof,terminator,before,after){
var repeated = function(rule){
return Y(function(seq){
return any(all(rule,seq),rule);}
);}
;var space_char = " \n\t\r";var space = repeated(char(space_char));;var comment = all(optional(space),char(";"),repeated(not_char("\n")),space);;var number = capture(all(optional(char("-")),repeated(char("1234567890")),optional(all(char("."),repeated(char("1234567890"))))),function(text,state){
return ast.node(ast.NUMBER,text);}
);;var boolean = capture(any(all(char("#"),char("f")),all(char("#"),char("t"))),function(text,state){
return ast.node(ast.BOOLEAN,(function() {if(equal_p_(text,"#f")) { return false} else { return true}})()
);}
);;var string = (function(capt,capt_node,capt_special,init){
var content = any(capt_special(all(char("\\"),not_char(""))),capt(not_char("\"")));;return init(all(char("\""),capt_node(optional(repeated(content))),char("\"")));}
)(function(rule){
return capture(rule,function(buf,state){
return (state+buf)}
);}
,function(rule){
return capture(rule,function(str,state){
return ast.node(ast.STRING,state);}
);}
,function(rule){
return capture(rule,function(str,state){
return (state+(function() {if(equal_p_(str,"\\n")) { return (function(){
return "\n"}
)();} else { return (function() {if(equal_p_(str,"\\t")) { return (function(){
return "\t"}
)();} else { return (function() {if(equal_p_(str,"\\r")) { return (function(){
return "\r"}
)();} else { return (function(){
return str.charAt(1);}
)();}})()
}})()
}})()
)}
);}
,function(rule){
return before(rule,function(state){
return ""}
);}
);;var term = capture(repeated(any(not_char(("()'"+space_char)))),function(buf,s){
return ast.node(ast.TERM,make_symbol(buf));}
);;var elements = function(lst){
var quoting = function(rule){
var capt = function(buf,node){
return (function(special){
return (function(q){
return ast.node(ast.LIST,null,unquote_splice([q,node]));}
)(ast.node(ast.TERM,make_symbol(special)));}
)((function() {if(equal_p_(buf.substring(0,2),",@")) { return (function(){
return "unquote-splicing"}
)();} else { return (function() {if(equal_p_(buf.charAt(0),",")) { return (function(){
return "unquote"}
)();} else { return (function() {if(equal_p_(buf.charAt(0),"'")) { return (function(){
return "quote"}
)();} else { return (function() {if(equal_p_(buf.charAt(0),"`")) { return (function(){
return "quasiquote"}
)();}})()
}})()
}})()
}})()
);}
;return Y(function(q){
return capture(all(any(char("'"),char("`"),all(char(","),char("@")),char(",")),any(q,rule)),capt);}
);}
;return (function(rule){
return any(quoting(rule),rule);}
)(any(lst,number,string,boolean,term));}
;var lst = Y(function(lst){
return before(all(char("("),optional(repeated(any(space,comment,after(elements(lst),function(parent,child){
return ast.add_child(parent,child);}
)))),char(")")),function(state){
return ast.node(ast.LIST);}
);}
);;return repeated(any(space,comment,after(elements(lst),function(root,child){
return ast.node(ast.ROOT,null,root.children.concat(unquote_splice([child])));}
)));}
;module.exports = grammar;
