
var slots = new Array(10000);
var slot_ptr = 0;
for(var i=0; i<slots.length; i++) {
    slots[i] = new Array(3);
}

var initial_env = slots[slot_ptr++];
initial_env[0] = false;
initial_env[1] = [];
initial_env[2] = [null];

var _envs = {};
_envs[string_dash__gt_symbol('initial')] = initial_env;

function lookup_variable(env, var_) {
    var slot, vars;

    while(env) {
        slot = _envs[env];
        vars = slot[1];
        for(var i=0, len=vars.length; i<len; i++) {
            if(vars[i] == var_) {
                // Add one because args is an actual arguments object, and
                // the first argument is the continuation
                return slot[2][i+1];
            }
        }
        env = slot[0];
    }

    throw new Error("undefined variable: " + var_);
}

function set_variable(env, var_, val) {
    var slot, vars;

    while(env) {
        slot = _envs[env];
        vars = slot[1];
        for(var i=0, len=vars.length; i<len; i++) {
            if(vars[i] == var_) {
                // Add one because args is an actual arguments object, and
                // the first argument is the continuation
                slot[2][i+1] = val;
            }
        }
        env = slot[0];
    }

    throw new Error("undefined variable: " + var_);
}

function define_variable(env, var_, val) {
    var slot = _envs[env];
    slot[1].push(var_);
    slot[2].push(val);
    return env;
}

function extend_environment(name, env, vars, args) {
    var slot = slots[slot_ptr++];
    _envs[name] = slot;
    slot[0] = env;
    slot[1] = vars;
    slot[2] = args;
    return name;
}
