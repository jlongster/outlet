
function make_symbol(str)
   return str
end

function map(func, arr)
   local t2 = {}
   for i,v in ipairs(arr) do t2[i] = func(v) end
   return t2
end

function for_each(func, arr)
   for i,v in ipairs(arr) do
      func(v)
   end
end

function print(msg)
   io.write(msg)
end