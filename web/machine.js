var __args = process.argv.slice(2);var __compiler = require('./compiler');
var __generator = require('./backends/js');
var read = __compiler.read;
var fs = require("fs");var make_dash_machine = (function(regs,ops,controller){
return ((function() {var o1 = (function(machine){
for_dash_each((function(reg){
return machine.allocate_dash_register(reg);
}),regs);
machine.install_dash_operations(ops);
machine.install_dash_instruction_dash_sequence(assemble(controller,machine));
return machine;
});
var o2 = make_dash_new_dash_machine();
return o1(o2);
}))();
});
var set_dash_register_dash_contents_excl_ = (function(machine,reg,val){
});
var get_dash_register_dash_contents = (function(machine,reg){
});
var start = (function(machine){
});
var in_dash_list_p_ = (function(lst,val){
return (function() {if(null_p_(lst)) {return ((function() {return false;
}))();
} else {return (function() {if(eq_p_(car(lst),val)) {return ((function() {return true;
}))();
} else {return ((function() {return in_dash_list_p_(cdr(lst),val);
}))();
}})()
;
}})()
;
});
var make_dash_register = (function() {return ((function() {var o3 = (function(contents){
return dict(string_dash__gt_symbol("get"),(function() {return contents;
}),string_dash__gt_symbol("set_excl_"),(function(val){
contents = val;
}));
});
var o4 = string_dash__gt_symbol("_unassigned_");
return o3(o4);
}))();
});
var make_dash_stack = (function() {return ((function() {var o5 = (function(s){
return dict(string_dash__gt_symbol("push"),(function(x){
s = cons(x,s);
}),string_dash__gt_symbol("pop_excl_"),(function() {return (function() {if(null_p_(s)) {throw("pop: empty stack");
} else {return ((function() {var o7 = (function(top){
s = cdr(s);
return top;
});
var o8 = car(s);
return o7(o8);
}))();
}})()
;
}),string_dash__gt_symbol("initialize"),(function() {s = _emptylst;
}));
});
var o6 = _emptylst;
return o5(o6);
}))();
});
var make_dash_new_dash_machine = (function() {return ((function() {var o9 = (function(pc,flag,stack,instruction_dash_sequence,paused,stack_dash_ptr){
return ((function() {var o16 = (function(ops,reg_dash_table){
var allocate_dash_register = (function(name){
return (function() {if(in_dash_list_p_(keys(reg_dash_table),name)) {throw(str("register already defined: ",name));
} else {return dict_dash_put_excl_(reg_dash_table,name,make_dash_register());
}})()
;
});
var lookup_dash_register = (function(name){
return (function() {if(in_dash_list_p_(keys(reg_dash_table),name)) {return dict_dash_ref(reg_dash_table,name);
} else {throw(str("unknown register: ",name));
}})()
;
});
var pause = (function() {paused = true;
});
var print_dash_registers = (function() {return for_dash_each((function(name){
return (function() {if((not(_eq__eq_(name,string_dash__gt_symbol("pc"))) && not(_eq__eq_(name,string_dash__gt_symbol("continue"))))) {return ((function() {var o19 = (function(reg){
return console.log((symbol_dash__gt_string(name) + ": " + util.inspect(reg.get())));
});
var o20 = lookup_dash_register(name);
return o19(o20);
}))();
} else {return false;
}})()
;
}),keys(reg_dash_table));
});
var execute = (function() {return ((function() {var loop = (function() {return ((function() {var o21 = (function(insts){
return (function() {if(null_p_(insts)) {return string_dash__gt_symbol("done");
} else {return ((function() {var o23 = (function(inst){
return (function() {if(not(paused)) {return ((function() {var o25 = (function(proc){
(function() {if(proc) {return proc();
} else {throw(str("invalid exec proc: ",proc));
}})()
;
return vector("__tco_call",(function() {return loop();
}));
});
var o26 = instruction_dash_exec_dash_proc(inst);
return o25(o26);
}))();
} else {return false;
}})()
;
});
var o24 = car(insts);
return o23(o24);
}))();
}})()
;
});
var o22 = pc.get();
return o21(o22);
}))();
});
return trampoline(loop());
}))();
});
return dict(string_dash__gt_symbol("start"),(function() {pc.set_excl_(instruction_dash_sequence);
return execute();
}),string_dash__gt_symbol("install_dash_instruction_dash_sequence"),(function(seq){
instruction_dash_sequence = seq;
}),string_dash__gt_symbol("allocate_dash_register"),allocate_dash_register,string_dash__gt_symbol("get_dash_register"),lookup_dash_register,string_dash__gt_symbol("install_dash_operations"),(function(dct){
ops = dict_dash_merge(ops,dct);
}),string_dash__gt_symbol("stack"),(function() {return stack;
}),string_dash__gt_symbol("operations"),(function() {return ops;
}),string_dash__gt_symbol("registers"),(function() {return keys(reg_dash_table);
}),string_dash__gt_symbol("print_dash_registers"),print_dash_registers,string_dash__gt_symbol("pause"),pause,string_dash__gt_symbol("proceed"),(function() {paused = false;
return execute();
}),string_dash__gt_symbol("on_dash_input"),(function(txt){
return ((function() {var o27 = (function(exp){
(function() {if(eq_p_(car(exp),string_dash__gt_symbol("read_dash_into_dash_reg"))) {return ((function() {var o29 = (function(reg){
return reg.set_excl_(read(txt));
});
var o30 = lookup_dash_register(cadr(exp));
return o29(o30);
}))();
} else {return false;
}})()
;
advance_dash_pc(pc);
stop_dash_stdin();
paused = false;
return execute();
});
var o28 = instruction_dash_text(car(pc.get()));
return o27(o28);
}))();
}));
});
var o17 = dict(string_dash__gt_symbol("initialize_dash_stack"),stack.initialize);
var o18 = dict(string_dash__gt_symbol("flag"),flag,string_dash__gt_symbol("pc"),pc);
return o16(o17,o18);
}))();
});
var o10 = make_dash_register();
var o11 = make_dash_register();
var o12 = make_dash_stack();
var o13 = _emptylst;
var o14 = false;
var o15 = 0;
return o9(o10,o11,o12,o13,o14,o15);
}))();
});
var get_dash_register_dash_contents = (function(machine,name){
return dict_dash_ref(machine.get_dash_register(name),string_dash__gt_symbol("get"))();
});
var set_dash_register_dash_contents_excl_ = (function(machine,name,val){
return dict_dash_ref(machine.get_dash_register(name),string_dash__gt_symbol("set_excl_"))(val);
});
var assemble = (function(controller,machine){
return extract_dash_labels(controller,(function(insts,labels){
update_dash_insts_excl_(insts,labels,machine);
return insts;
}));
});
var extract_dash_labels = (function(text,receive){
return (function() {if(null_p_(text)) {return receive(_emptylst,_emptylst);
} else {return extract_dash_labels(cdr(text),(function(insts,labels){
return ((function() {var o31 = (function(next_dash_inst){
return (function() {if(symbol_p_(next_dash_inst)) {return receive(insts,cons(make_dash_label_dash_entry(next_dash_inst,insts),labels));
} else {return receive(cons(make_dash_instruction(next_dash_inst),insts),labels);
}})()
;
});
var o32 = car(text);
return o31(o32);
}))();
}));
}})()
;
});
var update_dash_insts_excl_ = (function(insts,labels,machine){
return ((function() {var o33 = (function(pc,flag,stack,ops){
for_dash_each((function(inst){
return set_dash_instruction_dash_exec_dash_proc_excl_(inst,make_dash_execution_dash_procedure(instruction_dash_text(inst),labels,machine,pc,flag,stack,ops));
}),insts);
return for_dash_each((function(label){
return ((function() {var o38 = (function(i){
return for_dash_each((function(inst){
set_dash_instruction_dash_label_excl_(inst,label_dash_entry_dash_name(label));
set_dash_instruction_dash_line_dash_number_excl_(inst,i);
i = (i + 1);
}),label_dash_insts(label));
});
var o39 = 0;
return o38(o39);
}))();
}),labels);
});
var o34 = machine.get_dash_register(string_dash__gt_symbol("pc"));
var o35 = machine.get_dash_register(string_dash__gt_symbol("flag"));
var o36 = machine.stack();
var o37 = machine.operations();
return o33(o34,o35,o36,o37);
}))();
});
var make_dash_instruction = (function(text){
return vector(text,_emptylst,false,false);
});
var instruction_dash_text = (function(inst){
return vector_dash_ref(inst,0);
});
var instruction_dash_exec_dash_proc = (function(inst){
return vector_dash_ref(inst,1);
});
var instruction_dash_label = (function(inst){
return vector_dash_ref(inst,2);
});
var instruction_dash_line_dash_number = (function(inst){
return vector_dash_ref(inst,3);
});
var set_dash_instruction_dash_exec_dash_proc_excl_ = (function(inst,proc){
return vector_dash_put_excl_(inst,1,proc);
});
var set_dash_instruction_dash_label_excl_ = (function(inst,label){
return vector_dash_put_excl_(inst,2,label);
});
var set_dash_instruction_dash_line_dash_number_excl_ = (function(inst,n){
return vector_dash_put_excl_(inst,3,n);
});
var make_dash_label_dash_entry = (function(label,insts){
return vector(label,insts);
});
var label_dash_entry_dash_name = (function(label){
return vector_dash_ref(label,0);
});
var label_dash_insts = (function(label){
return vector_dash_ref(label,1);
});
var lookup_dash_label = (function(labels,name){
return ((function() {var o40 = (function(lst){
return (function() {if(lst) {return vector_dash_ref(car(lst),1);
} else {throw(str("undefined label: ",name));
}})()
;
});
var o41 = list_dash_find(labels,name,(function(v){
return vector_dash_ref(v,0);
}));
return o40(o41);
}))();
});
var advance_dash_pc = (function(pc){
return pc.set_excl_(cdr(pc.get()));
});
var make_dash_execution_dash_procedure = (function(inst,labels,machine,pc,flag,stack,ops){
return ((function() {var o42 = (function(top){
return (function() {if(_eq__eq_(top,string_dash__gt_symbol("assign"))) {return ((function() {return make_dash_assign(inst,machine,labels,ops,pc);
}))();
} else {return (function() {if(_eq__eq_(top,string_dash__gt_symbol("test"))) {return ((function() {return make_dash_test(inst,machine,labels,ops,flag,pc);
}))();
} else {return (function() {if(_eq__eq_(top,string_dash__gt_symbol("branch"))) {return ((function() {return make_dash_branch(inst,machine,labels,flag,pc);
}))();
} else {return (function() {if(_eq__eq_(top,string_dash__gt_symbol("goto"))) {return ((function() {return make_dash_goto(inst,machine,labels,pc);
}))();
} else {return (function() {if(_eq__eq_(top,string_dash__gt_symbol("save"))) {return ((function() {return make_dash_save(inst,machine,stack,pc);
}))();
} else {return (function() {if(_eq__eq_(top,string_dash__gt_symbol("restore"))) {return ((function() {return make_dash_restore(inst,machine,stack,pc);
}))();
} else {return (function() {if(_eq__eq_(top,string_dash__gt_symbol("perform"))) {return ((function() {return make_dash_perform(inst,machine,labels,ops,pc);
}))();
} else {return (function() {if(_eq__eq_(top,string_dash__gt_symbol("read_dash_into_dash_reg"))) {return ((function() {return make_dash_read(inst,machine,pc);
}))();
} else {return (function() {if(_eq__eq_(top,string_dash__gt_symbol("break"))) {return ((function() {return make_dash_break(machine,pc);
}))();
} else {return (function() {if(_eq__eq_(top,string_dash__gt_symbol("next"))) {return ((function() {return make_dash_next(machine,pc);
}))();
} else {return false;
}})()
;
}})()
;
}})()
;
}})()
;
}})()
;
}})()
;
}})()
;
}})()
;
}})()
;
}})()
;
});
var o43 = car(inst);
return o42(o43);
}))();
});
var make_dash_assign = (function(inst,machine,labels,ops,pc){
return ((function() {var o44 = (function(target,expr){
return ((function() {var o47 = (function(value_dash_proc){
return (function() {target.set_excl_(value_dash_proc());
return advance_dash_pc(pc);
});
});
var o48 = (function() {if(operation_dash_exp_p_(expr)) {return make_dash_operation_dash_exp(expr,machine,labels,ops);
} else {return make_dash_primitive_dash_exp(car(expr),machine,labels);
}})()
;
return o47(o48);
}))();
});
var o45 = machine.get_dash_register(cadr(inst));
var o46 = cddr(inst);
return o44(o45,o46);
}))();
});
var make_dash_test = (function(inst,machine,labels,ops,flag,pc){
return ((function() {var o49 = (function(condition){
return (function() {if(operation_dash_exp_p_(condition)) {return ((function() {var o51 = (function(condition_dash_proc){
return (function() {flag.set_excl_(condition_dash_proc());
return advance_dash_pc(pc);
});
});
var o52 = make_dash_operation_dash_exp(condition,machine,labels,ops);
return o51(o52);
}))();
} else {throw(str("bad test instruction:",inst));
}})()
;
});
var o50 = cdr(inst);
return o49(o50);
}))();
});
var make_dash_branch = (function(inst,machine,labels,flag,pc){
return ((function() {var o53 = (function(dest){
return (function() {if(label_dash_exp_p_(dest)) {return ((function() {var o55 = (function(insts){
return (function() {return (function() {if(flag.get()) {return pc.set_excl_(insts);
} else {return advance_dash_pc(pc);
}})()
;
});
});
var o56 = lookup_dash_label(labels,label_dash_exp_dash_label(dest));
return o55(o56);
}))();
} else {throw(str("bad branch instruction: ",inst));
}})()
;
});
var o54 = cadr(inst);
return o53(o54);
}))();
});
var make_dash_goto = (function(inst,machine,labels,pc){
return ((function() {var o57 = (function(dest){
return (function() {if(label_dash_exp_p_(dest)) {return ((function() {return ((function() {var o59 = (function(insts){
return (function() {return pc.set_excl_(insts);
});
});
var o60 = lookup_dash_label(labels,label_dash_exp_dash_label(dest));
return o59(o60);
}))();
}))();
} else {return (function() {if(register_dash_exp_p_(dest)) {return ((function() {return ((function() {var o61 = (function(reg){
return (function() {return pc.set_excl_(reg.get());
});
});
var o62 = machine.get_dash_register(register_dash_exp_dash_reg(dest));
return o61(o62);
}))();
}))();
} else {return ((function() {throw(str("bad goto instruction: ",inst));
}))();
}})()
;
}})()
;
});
var o58 = cadr(inst);
return o57(o58);
}))();
});
var make_dash_save = (function(inst,machine,stack,pc){
return ((function() {var o63 = (function(reg){
return (function() {stack.push(reg.get());
return advance_dash_pc(pc);
});
});
var o64 = machine.get_dash_register(cadr(inst));
return o63(o64);
}))();
});
var make_dash_restore = (function(inst,machine,stack,pc){
return ((function() {var o65 = (function(reg){
return (function() {reg.set_excl_(stack.pop_excl_());
return advance_dash_pc(pc);
});
});
var o66 = machine.get_dash_register(cadr(inst));
return o65(o66);
}))();
});
var make_dash_perform = (function(inst,machine,labels,ops,pc){
return ((function() {var o67 = (function(action){
return (function() {if(operation_dash_exp_p_(action)) {return ((function() {var o69 = (function(action_dash_proc){
return (function() {action_dash_proc();
return advance_dash_pc(pc);
});
});
var o70 = make_dash_operation_dash_exp(action,machine,labels,ops);
return o69(o70);
}))();
} else {throw(str("bad perform instruction: ",inst));
}})()
;
});
var o68 = cdr(inst);
return o67(o68);
}))();
});
var make_dash_read = (function(inst,machine,pc){
return ((function() {var o71 = (function(reg){
return (function() {start_dash_stdin(string_dash__gt_symbol("repl"));
return machine.pause();
});
});
var o72 = machine.get_dash_register(cadr(inst));
return o71(o72);
}))();
});
var make_dash_break = (function(machine,pc){
return (function() {advance_dash_pc(pc);
start_dash_stdin(string_dash__gt_symbol("break"));
return machine.pause();
});
});
var make_dash_next = (function(machine,pc){
return (function() {advance_dash_pc(pc);
machine.pause();
return setTimeout((function() {return machine.proceed();
}),1);
});
});
var make_dash_primitive_dash_exp = (function(exp,machine,labels){
return (function() {if(const_dash_exp_p_(exp)) {return ((function() {return ((function() {var o73 = (function(c){
return (function() {return c;
});
});
var o74 = cadr(exp);
return o73(o74);
}))();
}))();
} else {return (function() {if(label_dash_exp_p_(exp)) {return ((function() {return ((function() {var o75 = (function(insts){
return (function() {return insts;
});
});
var o76 = lookup_dash_label(labels,cadr(exp));
return o75(o76);
}))();
}))();
} else {return (function() {if(register_dash_exp_p_(exp)) {return ((function() {return ((function() {var o77 = (function(r){
return (function() {return r.get();
});
});
var o78 = machine.get_dash_register(cadr(exp));
return o77(o78);
}))();
}))();
} else {return ((function() {throw(str("unknown expression type: ",exp));
}))();
}})()
;
}})()
;
}})()
;
});
var label_dash_exp_p_ = (function(exp){
return (list_p_(exp) && _eq__eq_(car(exp),string_dash__gt_symbol("label")));
});
var label_dash_exp_dash_label = (function(exp){
return cadr(exp);
});
var register_dash_exp_p_ = (function(exp){
return (list_p_(exp) && _eq__eq_(car(exp),string_dash__gt_symbol("reg")));
});
var register_dash_exp_dash_reg = (function(exp){
return cadr(exp);
});
var const_dash_exp_p_ = (function(exp){
return (list_p_(exp) && _eq__eq_(car(exp),string_dash__gt_symbol("const")));
});
var const_dash_exp_dash_value = (function(exp){
return cadr(exp);
});
var make_dash_operation_dash_exp = (function(exp,machine,labels,ops){
return ((function() {var o79 = (function(op,aprocs){
return (function() {return apply(op,map((function(p){
return p();
}),aprocs));
});
});
var o80 = lookup_dash_prim(cadar(exp),ops);
var o81 = map((function(e){
return make_dash_primitive_dash_exp(e,machine,labels);
}),cdr(exp));
return o79(o80,o81);
}))();
});
var operation_dash_exp_p_ = (function(exp){
return (list_p_(exp) && eq_p_(car(car(exp)),string_dash__gt_symbol("op")));
});
var lookup_dash_prim = (function(sym,ops){
return ((function() {var o82 = (function(prim){
(function() {if(not(prim)) {throw(str("unknown operation: ",sym));
} else {return false;
}})()
;
return prim;
});
var o83 = dict_dash_ref(ops,sym);
return o82(o83);
}))();
});
var prompt_dash_for_dash_input = (function(msg){
return util.print(msg);
});
var stdin_dash_mode = false;
var start_dash_stdin = (function(mode){
process.stdin.resume();
stdin_dash_mode = mode;
});
var stop_dash_stdin = (function() {return process.stdin.pause();
});
process.stdin.on("data",(function(txt){
return ((function() {var o84 = (function(txt){
return (function() {if(_eq_(stdin_dash_mode,string_dash__gt_symbol("repl"))) {return ((function() {return on_dash_repl_dash_input(txt);
}))();
} else {return (function() {if(_eq_(stdin_dash_mode,string_dash__gt_symbol("break"))) {return ((function() {return on_dash_break_dash_input(txt);
}))();
} else {return false;
}})()
;
}})()
;
});
var o85 = (txt + "");
return o84(o85);
}))();
}));
var prompt_dash_read = (function() {return process.stdin.resume();
});
var continue_dash_machine = (function() {process.stdin.pause();
return current_dash_machine.proceed();
});
var current_dash_machine = false;
var on_dash_repl_dash_input = (function(txt){
return current_dash_machine.on_dash_input(txt);
});
var on_dash_break_dash_input = debugger_dash_handle;
var inspect_dash_var = (function(v){
return (function() {if(compound_dash_procedure_p_(v)) {return ((function() {return ((function() {var o86 = (function(s){
return (function() {if((vector_dash_length(s) < 61)) {return s;
} else {return str(vector_dash_slice(s,0,60),"...)");
}})()
;
});
var o87 = inspect(list_dash_append(list(string_dash__gt_symbol("lambda"),_emptylst),((function() {var o89 = (function(o88){
return (function() {if(vector_p_(o88)) {return vector_dash__gt_list(o88);
} else {return o88;
}})()
;
});
var o90 = procedure_dash_body(v);
return o89(o90);
}))()),true);
return o86(o87);
}))();
}))();
} else {return (function() {if(primitive_dash_procedure_p_(v)) {return ((function() {return "<native-function>";
}))();
} else {return ((function() {return inspect(v);
}))();
}})()
;
}})()
;
});
var inspect_dash_environment = (function() {return ((function() {var o91 = (function(frame){
return fold((function(k,acc){
return ((function() {var o93 = (function(v,v){
return (acc + str(k,": ",v,"\n"));
});
var o94 = dict_dash_ref(frame,k);
var o95 = inspect_dash_var(o94);
return o93(o94,o95);
}))();
}),"",keys(frame));
});
var o92 = first_dash_frame(get_dash_register_dash_contents(current_dash_machine,string_dash__gt_symbol("env")));
return o91(o92);
}))();
});
var debugger_dash_handle = (function(txt){
return ((function() {var o96 = (function(txt){
return (function() {if(_eq_(txt,"v")) {return ((function() {return println(inspect_dash_environment());
}))();
} else {return ((function() {return continue_dash_machine();
}))();
}})()
;
});
var o97 = txt.trim();
return o96(o97);
}))();
});
var feed_dash_asm = (function(src){
return ((function() {var o98 = (function(machine){
current_dash_machine = machine;
});
var o99 = make_dash_machine(list(string_dash__gt_symbol("exp"),string_dash__gt_symbol("env"),string_dash__gt_symbol("val"),string_dash__gt_symbol("continue"),string_dash__gt_symbol("proc"),string_dash__gt_symbol("arg1"),string_dash__gt_symbol("unev"),string_dash__gt_symbol("input")),dict_dash_merge(ops,dict(string_dash__gt_symbol("prompt_dash_for_dash_input"),prompt_dash_for_dash_input,string_dash__gt_symbol("read"),prompt_dash_read)),read(src));
return o98(o99);
}))();
});

