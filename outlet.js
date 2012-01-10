var compiler = require('./compiler');
var js_generator = require('./compiler-js');
var lua_generator = require('./compiler-lua');

module.exports = {
    compile: function(src, target) {
        var gen;
        if(target == 'lua') {
            gen = lua_generator();
        }
        else {
            gen = js_generator();
        }

        gen.write_runtime(target);
        return compiler.compile(src, gen);
    }
};
