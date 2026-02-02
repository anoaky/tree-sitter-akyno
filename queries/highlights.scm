"let" @keyword.storage.type
"if" @keyword.control.conditional
"else" @keyword.control.conditional
"while" @keyword.control.repeat
"return" @keyword.control.return
"continue" @keyword.control
"break" @keyword.control

(comment) @comment

(int) @constant.numeric.integer
(char) @constant.char
(string) @string

(type) @type
(type/base_type) @type.builtin
