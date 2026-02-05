(fn_defn) @local.scope
(for) @local.scope
(block) @local.scope

(fn_param name: (ident) @local.definition.variable.parameter)
(for pattern: (range_pattern name: (ident) @local.definition))

(ident) @local.reference
