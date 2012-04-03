var __args = process.argv.slice(2);var vm = require("./vm");var width = 400;
var height = 400;
var ctx = false;
var render_dash_clear = (function() {ctx.fillStyle = "black";
return ctx.fillRect(0,0,width,height);
});
var render_dash_box = (function(color,x,y,width,height){
ctx.fillStyle = color;
return ctx.fillRect(x,y,width,height);
});
document.addEventListener("DOMContentLoaded",(function() {((function() {var o1 = (function(canvas){
canvas.width = width;
canvas.height = height;
ctx = canvas.getContext("2d");
});
var o2 = document.getElementById("canvas");
return o1(o2);
}))();
vm.install_dash_primitives(dict(string_dash__gt_symbol("render_dash_clear"),render_dash_clear,string_dash__gt_symbol("render_dash_box"),render_dash_box,string_dash__gt_symbol("rand"),Math.random));
return vm.run(list(string_dash__gt_symbol("begin"),list(string_dash__gt_symbol("define"),list(string_dash__gt_symbol("render")),list(string_dash__gt_symbol("define"),list(string_dash__gt_symbol("rand_dash_int")),list(string_dash__gt_symbol("*"),list(string_dash__gt_symbol("rand")),150)),list(string_dash__gt_symbol("define"),list(string_dash__gt_symbol("render_dash_rand"),string_dash__gt_symbol("x"),string_dash__gt_symbol("y"),string_dash__gt_symbol("width"),string_dash__gt_symbol("height")),list(string_dash__gt_symbol("render_dash_box"),"green",string_dash__gt_symbol("x"),string_dash__gt_symbol("y"),string_dash__gt_symbol("width"),string_dash__gt_symbol("height"))),list(string_dash__gt_symbol("define"),list(string_dash__gt_symbol("render_dash_n"),string_dash__gt_symbol("n"),string_dash__gt_symbol("i")),list(string_dash__gt_symbol("break")),list(string_dash__gt_symbol("if"),list(string_dash__gt_symbol("_lt_"),string_dash__gt_symbol("i"),string_dash__gt_symbol("n")),list(string_dash__gt_symbol("begin"),list(string_dash__gt_symbol("render_dash_rand"),list(string_dash__gt_symbol("rand_dash_int")),list(string_dash__gt_symbol("rand_dash_int")),list(string_dash__gt_symbol("rand_dash_int")),list(string_dash__gt_symbol("rand_dash_int"))),list(string_dash__gt_symbol("render_dash_n"),string_dash__gt_symbol("n"),list(string_dash__gt_symbol("+"),string_dash__gt_symbol("i"),1))))),list(string_dash__gt_symbol("render_dash_clear")),list(string_dash__gt_symbol("render_dash_n"),50,0),list(string_dash__gt_symbol("next")),list(string_dash__gt_symbol("render"))),list(string_dash__gt_symbol("render"))));
}));

