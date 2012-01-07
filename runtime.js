
function make_symbol(str) {
    return str;
}

function map(func, arr) {
    var r = [];
    for(var i=0; i<arr.length; i++) {
        r.push(func(arr[i]));
    }
    return r;
}

function for_each(func, arr) {
    for(var i=0; i<arr.length; i++) {
        func(arr[i]);
    }    
}

function print(msg) {
    console.log(msg);
}