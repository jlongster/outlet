var util = require('util');

var ROOT = -1;
var TERM = 0;
var STRING = 1;
var NUMBER = 2;
var LIST = 3;

function node(type, data, children) {
    return {
        type: type,
        data: data,
        children: children || []
    };
}

function add_child(parent, child) {
    if(child) {
        return node(parent.type,
                    parent.data,
                    parent.children.concat([child]));
    }
    return parent;
}

function type_str(type) {
    switch(type) {
        case ROOT: return 'root';
        case TERM: return 'term';
        case STRING: return 'string';
        case NUMBER: return 'number';
        case LIST: return 'list';
    }
    return 'unknown';
}

function pretty_print(ast, indent) {
    indent = indent || 0;

    function puts(str) {
        var pad = (new Array(indent+1)).join('-');
        if(indent > 0) {
            pad += ' ';
        }

        util.puts(pad + str);
    }

    var data = '';
    if(ast.data) {
        data = ': ' + util.inspect(ast.data);
    }

    if(ast === undefined || ast === null) {
        puts('NULL');
    }
    else {
        puts(type_str(ast.type) + data);    
    }
    
    for(var i=0; i<ast.children.length; i++) {
        pretty_print(ast.children[i], indent+2);
    }
}

module.exports = {
    ROOT: ROOT,
    TERM: TERM,
    NUMBER: NUMBER,
    STRING: STRING,
    LIST: LIST,

    node: node,
    add_child: add_child,
    pretty_print: pretty_print
};