// needed for eval because it needs access to the compiler to compile
// the expression and evaluate it inline to be in the right context.
var compiler = require("./compiler");
var create_generator = compiler.create_generator;
var parse = compiler.parse;
var _read = compiler.read;
var nodify = compiler.nodify;
var sourcify = compiler.sourcify;

var compiler_js = require("./compiler-js");
compiler.set_generator(compiler_js());

function read(str) {
    return sourcify(_read(str).children[0]);
}
