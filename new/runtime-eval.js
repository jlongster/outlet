// needed for eval because it needs access to the compiler to compile
// the expression and evaluate it inline to be in the right context.
var compiler = require("./compiler");
var read = compiler.read;
