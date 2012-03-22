var __args = process.argv.slice(2);var width = 400;
var height = 400;
var ctx = false;
var render_dash_clear = (function() {var env = {};ctx.fillStyle = "black";
return ctx.fillRect(0,0,width,height);
});
var render_dash_box = (function(color,x,y,width,height){
var env = {};env["color"] = color;env["x"] = x;env["y"] = y;env["width"] = width;env["height"] = height;ctx.fillStyle = color;
return ctx.fillRect(x,y,width,height);
});
document.addEventListener("DOMContentLoaded",(function() {var env = {};((function() {var env = {};var o1 = (function(canvas){
var env = {};env["canvas"] = canvas;canvas.width = width;
canvas.height = height;
ctx = canvas.getContext("2d");
});
var o2 = document.getElementById("canvas");
return o1(o2);
}))();
var rand = Math.random;
var rand_dash_int = (function() {var env = {};return (rand() * 150);
});
var render_dash_rand = (function(x,y,width,height){
var env = {};env["x"] = x;env["y"] = y;env["width"] = width;env["height"] = height;return render_dash_box("green",x,y,width,height);
});
var render_dash_n = (function(n,i){
var env = {};env["n"] = n;env["i"] = i;return (function() {if((i < n)) {return ((function() {var env = {};render_dash_rand(rand_dash_int(),rand_dash_int(),rand_dash_int(),rand_dash_int());
return render_dash_n(n,(i + 1));
}))();
} else {return false;
}})()
;
});
var render = (function() {var env = {};render_dash_clear();
render_dash_n(50,0);
return setTimeout(render,10);
});
return render();
}));

