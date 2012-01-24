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
    if(!lst.length || lst.length != 2 || lst[1].length === undefined) {
        return lst;
    }

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
);;var term = capture(repeated(any(not_char(("()[]'"+space_char)))),function(buf,s){
return ast.node(ast.TERM,make_symbol(buf));}
);;var elements = function(lst){
var quoting = function(rule){
var capt = function(buf,node){
return (function(special){
return (function(q){
return ast.node(ast.LIST,null,vector(q,node));}
)(ast.node(ast.TERM,make_symbol(special)));}
)((function() {if(equal_p_(buf.substring(0,2),",@")) { return (function(){
return "unquote-splicing"}
)();} else { return (function() {if(equal_p_(buf.charAt(0),",")) { return (function(){
return "unquote"}
)();} else { return (function() {if(equal_p_(buf.charAt(0),"'")) { return (function(){
return "quote"}
)();} else { return (function() {if(equal_p_(buf.charAt(0),"`")) { return (function(){
return "quasiquote"}
)();} else { return false}})()
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
return all(any(before(char("("),function(state){
return ast.node(ast.LIST);}
),before(char("["),function(state){
return ast.node(ast.VECTOR);}
)),optional(repeated(any(space,comment,after(elements(lst),function(parent,child){
return ast.add_child(parent,child);}
)))),any(char(")"),char("]")));}
);;return repeated(any(space,comment,after(elements(lst),function(root,child){
return ast.node(ast.ROOT,null,root.children.concat(vector(child)));}
)));}
;module.exports = grammar;
