
var width = 400;
var height = 400;

var canvas;
var ctx;

function render_dash_clear() {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, width, height);
    return "ok";
}

function render_dash_box(color, x, y, width, height) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, width, height);
}

document.addEventListener('DOMContentLoaded', function() {
    canvas = document.getElementById('canvas');
    canvas.width = width;
    canvas.height = height;

    ctx = canvas.getContext('2d');
});