
(comment) @comment

(int) @constant.numeric.integer
(char) @constant.char
(string) @string

(type) @type
(type/base_type) @type.builtin


(fn_decl name: (ident) @function)
(fn_defn name: (ident) @function)
(call_fn fn: (ident) @function)

(fn_param name: (ident) @variable.parameter)

"let" @keyword.storage.type
"static" @keyword.storage.modifier
"if" @keyword.control.conditional
"else" @keyword.control.conditional
"while" @keyword.control.repeat
"return" @keyword.control.return
"continue" @keyword.control
"break" @keyword.control
"+" @operator
"-" @operator
"/" @operator
"%" @operator
"*" @operator
"&" @operator
":=" @operator
"<" @operator
">" @operator
"<=" @operator
">=" @operator
"||" @operator
"&&" @operator
