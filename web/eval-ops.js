var __args = process.argv.slice(2);var self_dash_evaluating_p_ = literal_p_;
var variable_p_ = symbol_p_;
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
var text_dash_of_dash_quotation = (function(expr){
return cadr(expr);
});
var begin_dash_actions = (function(expr){
return cdr(expr);
});
var make_dash_lambda = (function(args,body){
return cons(string_dash__gt_symbol("lambda"),cons(args,body));
});
var definition_dash_variable = (function(expr){
return (function() {if(symbol_p_(cadr(expr))) {return cadr(expr);
} else {return caadr(expr);
}})()
;
});
var definition_dash_value = (function(expr){
return (function() {if(symbol_p_(cadr(expr))) {return caddr(expr);
} else {return make_dash_lambda(cdadr(expr),cddr(expr));
}})()
;
});
var last_dash_exp_p_ = (function(expr){
return null_p_(cdr(expr));
});
var true_p_ = (function(expr){
return (function() {if(expr) {return true;
} else {return false;
}})()
;
});
var make_dash_procedure = (function(args,body,env){
return list(string_dash__gt_symbol("procedure"),args,body,env);
});
var compound_dash_procedure_p_ = (function(expr){
return eq_p_(car(expr),string_dash__gt_symbol("procedure"));
});
var procedure_dash_args = cadr;
var procedure_dash_body = caddr;
var procedure_dash_env = (function(proc){
return car(cdddr(proc));
});
var no_dash_operands_p_ = null_p_;
var last_dash_operand_p_ = (function(expr){
return null_p_(cdr(expr));
});
var adjoin_dash_arg = (function(arg,arglist){
return list_dash_append(arglist,list(arg));
});
var primitive_dash_procedures = dict(string_dash__gt_symbol("car"),car,string_dash__gt_symbol("cdr"),cdr,string_dash__gt_symbol("cons"),cons,string_dash__gt_symbol("list"),list,string_dash__gt_symbol("null_p_"),null_p_,string_dash__gt_symbol("pp"),pp,string_dash__gt_symbol("+"),(function(x,y){
return (x + y);
}),string_dash__gt_symbol("_dash_"),(function(x,y){
return (x - y);
}),string_dash__gt_symbol("*"),(function(x,y){
return (x * y);
}),string_dash__gt_symbol("_gt_"),(function(x,y){
return (x > y);
}),string_dash__gt_symbol("_eq__eq_"),_eq__eq_,string_dash__gt_symbol("render_dash_clear"),render_dash_clear,string_dash__gt_symbol("render_dash_box"),render_dash_box,string_dash__gt_symbol("rand"),(function() {return Math.random();
}));
var primitive_dash_procedure_dash_names = (function() {return keys(primitive_dash_procedures);
});
var primitive_dash_procedure_dash_objects = (function() {return map((function(el){
return list(string_dash__gt_symbol("primitive"),el);
}),vals(primitive_dash_procedures));
});
var primitive_dash_procedure_p_ = (function(proc){
return eq_p_(car(proc),string_dash__gt_symbol("primitive"));
});
var primitive_dash_implementation = cadr;
var apply_dash_primitive_dash_procedure = (function(proc,args){
return apply(primitive_dash_implementation(proc),args);
});
var make_dash_frame = (function(vars,vals){
return zip(vars,vals);
});
var extend_dash_environment = (function(vars,vals,base_dash_env){
return (function() {if(_eq__eq_(length(vars),length(vals))) {return cons(make_dash_frame(vars,vals),base_dash_env);
} else {return (function() {if((length(vars) < length(vals))) {throw("too many arguments supplied");
} else {throw("too few arguments supplied");
}})()
;
}})()
;
});
var enclosing_dash_environment = cdr;
var first_dash_frame = car;
var empty_dash_environment = _emptylst;
var setup_dash_environment = (function() {return extend_dash_environment(primitive_dash_procedure_dash_names(),primitive_dash_procedure_dash_objects(),empty_dash_environment);
});
var global_dash_environment = setup_dash_environment();
var find_dash_frame_dash_with_dash_var = (function(varr,env){
return (function() {if(_eq_(env,empty_dash_environment)) {return false;
} else {return ((function() {var o1 = (function(frame){
return (function() {if(in_dash_list_p_(keys(frame),varr)) {return frame;
} else {return find_dash_frame_dash_with_dash_var(varr,enclosing_dash_environment(env));
}})()
;
});
var o2 = first_dash_frame(env);
return o1(o2);
}))();
}})()
;
});
var lookup_dash_variable_dash_value = (function(varr,env){
return ((function() {var o3 = (function(frame){
return (function() {if(frame) {return dict_dash_ref(frame,varr);
} else {return string_dash__gt_symbol("unbound_dash_variable");
}})()
;
});
var o4 = find_dash_frame_dash_with_dash_var(varr,env);
return o3(o4);
}))();
});
var set_dash_variable_dash_value_excl_ = (function(varr,val,env){
return ((function() {var o5 = (function(frame){
return (function() {if(frame) {return dict_dash_put_excl_(frame,varr,val);
} else {return string_dash__gt_symbol("unbound_dash_variable");
}})()
;
});
var o6 = find_dash_frame_dash_with_dash_var(varr,env);
return o5(o6);
}))();
});
var define_dash_variable_excl_ = (function(varr,val,env){
return dict_dash_put_excl_(first_dash_frame(env),varr,val);
});
var begin_p_ = (function(expr){
return eq_p_(car(expr),string_dash__gt_symbol("begin"));
});
var assignment_p_ = (function(expr){
return eq_p_(car(expr),string_dash__gt_symbol("set_excl_"));
});
var quoted_p_ = (function(expr){
return eq_p_(car(expr),string_dash__gt_symbol("quote"));
});
var definition_p_ = (function(expr){
return eq_p_(car(expr),string_dash__gt_symbol("define"));
});
var if_p_ = (function(expr){
return eq_p_(car(expr),string_dash__gt_symbol("if"));
});
var lambda_p_ = (function(expr){
return eq_p_(car(expr),string_dash__gt_symbol("lambda"));
});
var application_p_ = list_p_;
var ops = dict(string_dash__gt_symbol("self_dash_evaluating_p_"),self_dash_evaluating_p_,string_dash__gt_symbol("variable_p_"),variable_p_,string_dash__gt_symbol("quoted_p_"),quoted_p_,string_dash__gt_symbol("assignment_p_"),assignment_p_,string_dash__gt_symbol("definition_p_"),definition_p_,string_dash__gt_symbol("if_p_"),if_p_,string_dash__gt_symbol("lambda_p_"),lambda_p_,string_dash__gt_symbol("begin_p_"),begin_p_,string_dash__gt_symbol("application_p_"),application_p_,string_dash__gt_symbol("lookup_dash_variable_dash_value"),lookup_dash_variable_dash_value,string_dash__gt_symbol("make_dash_procedure"),make_dash_procedure,string_dash__gt_symbol("no_dash_operands_p_"),no_dash_operands_p_,string_dash__gt_symbol("last_dash_operand_p_"),last_dash_operand_p_,string_dash__gt_symbol("adjoin_dash_arg"),adjoin_dash_arg,string_dash__gt_symbol("text_dash_of_dash_quotation"),text_dash_of_dash_quotation,string_dash__gt_symbol("primitive_dash_procedure_p_"),primitive_dash_procedure_p_,string_dash__gt_symbol("compound_dash_procedure_p_"),compound_dash_procedure_p_,string_dash__gt_symbol("procedure_dash_env"),procedure_dash_env,string_dash__gt_symbol("procedure_dash_args"),procedure_dash_args,string_dash__gt_symbol("procedure_dash_body"),procedure_dash_body,string_dash__gt_symbol("last_dash_exp_p_"),last_dash_exp_p_,string_dash__gt_symbol("true_p_"),true_p_,string_dash__gt_symbol("define_dash_variable_excl_"),define_dash_variable_excl_,string_dash__gt_symbol("apply_dash_primitive_dash_procedure"),apply_dash_primitive_dash_procedure,string_dash__gt_symbol("begin_dash_actions"),begin_dash_actions,string_dash__gt_symbol("set_dash_variable_dash_value_excl_"),set_dash_variable_dash_value_excl_,string_dash__gt_symbol("definition_dash_value"),definition_dash_value,string_dash__gt_symbol("definition_dash_variable"),definition_dash_variable,string_dash__gt_symbol("extend_dash_environment"),extend_dash_environment,string_dash__gt_symbol("get_dash_global_dash_environment"),(function() {return global_dash_environment;
}),string_dash__gt_symbol("print_dash_output"),(function(val){
return pp(val);
}),string_dash__gt_symbol("breakpoint_p_"),(function(expr){
return _eq_(car(expr),string_dash__gt_symbol("break"));
}),string_dash__gt_symbol("next_p_"),(function(expr){
return _eq_(car(expr),string_dash__gt_symbol("next"));
}),string_dash__gt_symbol("car"),car,string_dash__gt_symbol("cdr"),cdr,string_dash__gt_symbol("cadr"),cadr,string_dash__gt_symbol("cddr"),cddr);

