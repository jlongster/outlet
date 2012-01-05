// https://raw.github.com/oleganza/iovm2/master/ecma-engine/Parser.js

var Parser = function(grammar)
{
  var toArray = function(args) {
    var arr = []
    for (var i = 0; i < args.length; i++) arr.push(args[i])
    return arr
  }
  
  // The Y Combinator
  var Y = function (gen) {
    return (function(f) {return f(f)})(
      function(f) {
        return gen(function() {return f(f).apply(null, arguments)})
      }
    )
  }
  
  var Optional = function(func)
  {
    return function(text, state) {
      return func(text, state) || [text, state]
    }
  }
  
  var EOF = function(text, state) { // matches the end of the text
    return (text == "" ? [text, state] : null)
  }
  
  var Terminator = function(text, state) { // terminates scanner (possibly in the middle of the text)
    return ["", state]
  }
  
  var Char = function(alphabet)
  {
    return function(text, state) {
      return ((text.length > 0 && alphabet.indexOf(text.charAt(0)) > -1) ? [text.substr(1), state] : null)
    }
  }
  
  var NotChar = function(alphabet)
  {
    return function(text, state) {
      return ((text.length > 0 && alphabet.indexOf(text.charAt(0)) == -1) ? [text.substr(1), state] : null)
    }
  }
  
  var Any = function()
  {
    var args = toArray(arguments)
    return function(text, state) {
      var r = null
      for (var i in args)
      {
        r = args[i](text, state)
        if (r) 
        {
          return r
        }
      }
      return null
    }
  }
  
  var All = function()
  {
    var args = toArray(arguments)
    return function(text, state) {
      var r = null
      for (var i in args)
      {
        r = args[i](text, state)
        if (!r) return r
        text  = r[0]
        state = r[1]
      }
      return [text, state]
    }
  }
  
  // hook: function(buffer, state) { return state }
  var Capture = function(func, hook)
  {
    return function(text, state)
    {
      var r = func(text, state)
      if (r) {
        var t = r[0]
        var s = r[1]
        return [t, hook(text.substr(0, text.length - t.length), s)]
      }
      return r
    }
  }

  // hook: function(state1) { return state2 }
  var Before = function(func, hook)
  {
    return function(text, state) {
      return func(text, hook(state))
    }
  }
  
  // hook: function(state1, state2) { return state3 }
  var After = function(func, hook)
  {
    return function(text, state) {
      var r = func(text, state)
      return r && [r[0], hook(state, r[1])]
    }
  }
  
  return grammar(All, Any, Capture, Char, NotChar, Optional, Y, EOF, Terminator, Before, After)
}

var Parse = function(parser, text, state)
{
  var r = parser(text, state)
  return r && r[1]
}

module.exports = {
    Parse: Parse,
    Parser: Parser
};
