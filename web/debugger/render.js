var __args = process.argv.slice(2);var vm = require("./vm");var width = 400;
var height = 400;
var ctx = false;
var render_dash_clear = (function() {ctx["fillStyle"] = "black";
return ctx["fillRect"](0,0,width,height);
});
var render_dash_box = (function(color,x,y,width,height){
ctx["fillStyle"] = color;
return ctx["fillRect"](x,y,width,height);
});
var profile_dash_start = 0;
var profile_dash_avg = 0;
var profile_dash_count = 0;
var timer_dash_start = (function() {var d = new Date();
profile_dash_start = d["getTime"]();
});
var timer_dash_end = (function() {var d = new Date();
var t = (d["getTime"]() - profile_dash_start);
profile_dash_count = (profile_dash_count + 1);
profile_dash_avg = (((profile_dash_avg * (profile_dash_count - 1)) + t) / profile_dash_count);
return console["log"]("timer:",t,"avg:",profile_dash_avg);
});
document["addEventListener"]("DOMContentLoaded",(function() {((function() {var o1 = (function(canvas){
canvas["width"] = width;
canvas["height"] = height;
ctx = canvas["getContext"]("2d");
});
var o2 = document["getElementById"]("canvas");
return o1(o2);
}))();
vm["install-primitives"](dict("\uFDD1render-clear",render_dash_clear,"\uFDD1render-box",render_dash_box,"\uFDD1rand",Math["random"],"\uFDD1timer-start",timer_dash_start,"\uFDD1timer-end",timer_dash_end));
return vm["run"](list("\uFDD1begin",list("\uFDD1define",list("\uFDD1rand-int"),list("\uFDD1*",list("\uFDD1rand"),150)),list("\uFDD1define",list("\uFDD1render-rand","\uFDD1x","\uFDD1y","\uFDD1width","\uFDD1height"),list("\uFDD1break"),list("\uFDD1render-box","green","\uFDD1x","\uFDD1y","\uFDD1width","\uFDD1height")),list("\uFDD1define",list("\uFDD1render-n","\uFDD1n","\uFDD1i"),list("\uFDD1if",list("\uFDD1<","\uFDD1i","\uFDD1n"),list("\uFDD1begin",list("\uFDD1render-rand",list("\uFDD1rand-int"),list("\uFDD1rand-int"),list("\uFDD1rand-int"),list("\uFDD1rand-int")),list("\uFDD1render-n","\uFDD1n",list("\uFDD1+","\uFDD1i",1))))),list("\uFDD1define",list("\uFDD1render"),list("\uFDD1render-clear"),list("\uFDD1render-n",50,0),list("\uFDD1next"),list("\uFDD1render")),list("\uFDD1render")));
}));

