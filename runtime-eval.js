// needed for eval because it needs access to the compiler to compile
// the expression and evaluate it inline to be in the right context.
var __compiler = require("./compiler");
var __generator = require("./backends/js");
var read = __compiler.read;
var pretty = __compiler.pretty;
