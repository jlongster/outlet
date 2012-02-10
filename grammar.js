var util = require('util');

var _emptylst = [];

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
        for(var i=0, len=v1.length; i<len; i++) {
            if(!equal_p_(v1[i], v2[i])) {
                return false;
            }
        }
        return true;
    }
    else if(map_p_(v1) && map_p_(v2)) {
        for(var k in v1) {
            if(!equal_p_(v1[k], v2[k])) {
                return false;
            }
        }
        return true;
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

function hash_map() {
    var keyvals = Array.prototype.slice.call(arguments);
    var res = {};

    for(var i=0, len=keyvals.length; i<len; i+=2) {
        var key = keyvals[i];

        // Ignore this, it's only to support the compiler for now...
        if(key.children &&
           key.children.length > 0 &&
           key.children[0].data &&
           key.children[0].data.str &&
           key.children[0].data.str == 'quote') {
            key = key.children[1].data.str;
        }
        else if(key.str) {
            key = key.str;
        }

        res[key] = keyvals[i+1];
    }

    return res;
}

function hash_map_map(func, m) {
    var res = {};
    for(var k in m) {
        res[k] = func(m[k]);
    }
    return res;
}

function hash_map_to_vec(obj) {
    var res = [];
    for(var k in obj) {
        res.push(vector_to_list([make_symbol('quote'), make_symbol(k)]));
        res.push(obj[k]);
    }
    return res;
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

function map_p_(obj) {
    return obj && typeof obj == 'object' && obj.length === undefined;
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
    else if(map_p_(obj)) {
        var res = [];
        for(var k in obj) {
            res.push(k + ': ' + util.inspect(obj[k], null, 10));
        }
        return '{' + res.join(', ') + '}';
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
            if(!list_p_(elem.data) && !null_p_(elem.data)) {
                throw ("Lists can only splice lists, unexpected object: " +
                       __gt_string(elem.data));
            }

            // do we need to unquote_splice elem.data?
            return list_append(elem.data, rest);
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
            if(!vector_p_(obj.data)) {
                throw ("Vectors can only splice vectors, unexpected object: " +
                       obj.data);
            }
            ret = ret.concat(obj.data);
        }
        else {
            ret.push(obj);
        }
    }

    return ret;
}

function unquote_splice_map(obj) {
    // this is expensive, but I don't really care. this will all be
    // rewritten soon enough anyway.
    var res = {};

    for(var k in obj) {
        var prop = obj[k];
        if(prop && prop.please_splice) {
            if(!map_p_(prop.data)) {
                throw ("Maps can only splice maps, unexpected object: " +
                       prop.data);
            }

            for(j in prop.data) {
                res[j] = prop.data[j];
            }
        }
        else if(k != '__unquote_splicing') {
            res[k] = prop;
        }
    }

    return res;
}






// updated

function for_dash_each(func, lst) {
    if(!null_p_(lst)) {
        func(car(lst));
        for_each(func, cdr(lst));
    }
}

function make_dash_vector(i) {
    return new Array(i);
}

function vector_dash_map(func, vec) {
    var res = [];

    for(var i=0, len=vec.length; i<len; i++) {
        res.push(func(vec[i]));
    }

    return res;
}

function vector_dash_for_dash_each(func, vec) {
    for(var i=0, len=vec.length; i<len; i++) {
        func(vec[i]);
    }
}


function make_dash_list(arr) {
    arr.list = true;
    return arr;
}

function vector_dash_to_dash_list(vec) {
    function l(v, i) {
        if(i < v.length) {
            return cons(v[i], l(v, i+1));
        }
        else {
            return _emptylst;
        }
    }

    return l(vec, 0);
}

function list_dash_to_dash_vector(lst) {
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

function vector_dash_ref(arr, i) {
    return arr[i];
}

function vector_dash_set_excl_(arr, i, v) {
    arr[i] = v;
}

function vector_dash_concat(arr1, arr2) {
    return arr1.concat(arr2);
}

function vector() {
    return Array.prototype.slice.call(arguments);
}

function vector_dash_push(vec, val) {
    vec.push(val);
}

function hash_dash_map() {
    var keyvals = Array.prototype.slice.call(arguments);
    var res = {};

    for(var i=0, len=keyvals.length; i<len; i+=2) {
        var key = keyvals[i];

        // Ignore this, it's only to support the compiler for now...
        if(key.children &&
           key.children.length > 0 &&
           key.children[0].data &&
           key.children[0].data.str &&
           key.children[0].data.str == 'quote') {
            key = key.children[1].data.str;
        }
        else if(key.str) {
            key = key.str;
        }

        res[key] = keyvals[i+1];
    }

    return res;
}

function hash_dash_map_dash_map(func, m) {
    var res = {};
    for(var k in m) {
        res[k] = func(m[k]);
    }
    return res;
}

function hash_dash_map_dash_to_dash_vec(obj) {
    var res = [];
    for(var k in obj) {
        res.push(vector_to_list([make_symbol('quote'), make_symbol(k)]));
        res.push(obj[k]);
    }
    return res;
}

function object_dash_ref(obj, key) {
    return obj[key];
}


function _dash__gt_string(obj) {
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
    else if(map_p_(obj)) {
        var res = [];
        for(var k in obj) {
            res.push(k + ': ' + util.inspect(obj[k], null, 10));
        }
        return '{' + res.join(', ') + '}';
    }
}

function list_dash_append(lst1, lst2) {
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

function string_dash__gt_symbol(str) {
    return {
        str: str,
        symbol: true
    };
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
);;var raw_term = capture(repeated(any(not_char(("{}()[]'"+space_char)))),function(buf,s){
return ast.node(ast.TERM,make_symbol(buf));}
);;var raw_keyword = capture(all(char(":"),raw_term),function(buf,node){
return (function(q){
return ast.node(ast.LIST,null,vector(q,node));}
)(ast.node(ast.TERM,make_symbol("quote")));}
);;var term = any(raw_keyword,raw_term);;var elements = function(lst){
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
return all(any(before(char("{"),function(state){
return ast.node(ast.MAP);}
),before(char("("),function(state){
return ast.node(ast.LIST);}
),before(char("["),function(state){
return ast.node(ast.VECTOR);}
)),optional(repeated(any(space,comment,after(elements(lst),function(parent,child){
return ast.add_child(parent,child);}
)))),any(char("}"),char(")"),char("]")));}
);;return repeated(any(space,comment,after(elements(lst),function(root,child){
return ast.node(ast.ROOT,null,root.children.concat(vector(child)));}
)));}
;module.exports = grammar;
