
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

(struct_field name: (ident) @variable.other.member)
(struct_decl name: (ident) @type)

"let" @keyword.storage.type
"static" @keyword.storage.modifier
"if" @keyword.control.conditional
"else" @keyword.control.conditional
"while" @keyword.control.repeat
"for" @keyword.control.repeat
"return" @keyword.control.return
"continue" @keyword.control
"break" @keyword.control
"struct" @keyword.storage.type
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
