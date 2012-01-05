var compiler = require('./compiler');
var js_generator = require('./compiler-js');

module.exports = {
    compile: function(src) {
        return compiler.compile(src, js_generator());
    }
};
