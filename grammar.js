/**
 * @file Akyno grammar for tree-sitter
 * @author Anokhi Suresh
 * @license MIT
 */

/// <reference types="tree-sitter-cli/dsl" />
// @ts-check

export default grammar({
  name: "akyno",

  supertypes: $ => [
    $.literal,
    $.type,
    $.expression,
    $.statement,
  ],

  extras: $ => [
    /\s/,
    $.comment,
  ],

  rules: {
    source_file: $ => repeat(choice(
      $.static_var,
      $.fn_decl,
      $.fn_defn,
    )),
    comment: $ => token(choice(seq('//', /.*/), seq('/*', /[^*]*\*+([^/*][^*]*\*+)*/, '/'))),
    ident: $ => /([a-zA-Z][_a-zA-Z0-9]*|[_][_a-zA-Z0-9]+)/,
    literal: $ => choice($.char, $.int, $.string),
    char: $ => /\'([a-zA-Z0-9\\x20\\x21\\x23-\\x26\\x28-\\x2F\\x3A-\\x40\\x5B\\x5D-\\x60\\x7B-\\x7E\" ]|\\([\"\'ntr]|x[0-9]{2}))\'/,
    int: $ => /[0-9]+/,
    string: $ => /\"([a-zA-Z0-9\\x20\\x21\\x23-\\x26\\x28-\\x2F\\x3A-\\x40\\x5B\\x5D-\\x60\\x7B-\\x7E\' ]|\\([\"\'ntr]|x[0-9]{2}))*\"/,
    // Top-level items
    static_var: $ => seq(
      'static',
      field("name", $.ident),
      optional(field("type", seq(':', $.type))),
      optional(field("value", seq('=', $.literal))),
      ';',
    ),
    fn_param: $ => seq(
      field('name', $.ident),
      ':',
      field('type', $.type),
    ),
    fn_params: $ => seq(
      $.fn_param,
      repeat(
        seq(',', $.fn_param)
      )
    ),
    _fn_sig: $ => seq(
      field('name', $.ident),
      '(',
      field('params', optional($.fn_params)),
      ')',
      ':',
      field('type', $.type),
    ),
    fn_decl: $ => seq(
      $._fn_sig,
      ';',
    ),
    fn_defn: $ => seq(
      $._fn_sig,
      field('block', $.block),
    ),
    // Types
    type: $ => choice(
      $.pointer_type,
      $.array_type,
      $.paren_type,
      $.base_type,
    ),
    paren_type: $ => prec(18, seq('(', $.type, ')')),
    array_type: $ => prec.right(17, seq(
      $.type,
      repeat1(
        seq('[',
            $.int,
            ']'
        )
      )
    )),
    pointer_type: $ => prec.right(15, seq('&', $.type)),
    base_type: $ => prec(20, choice(
      'int',
      'char',
      'void',
      seq('struct', $.ident),
      '_',
    )),
    // Patterns
    range_pattern: $ => seq(
      field('name', $.ident),
      ':',
      choice('[', '('),
      field('start', $.expression),
      ';',
      field('end', $.expression),
      choice(']', ')'),
    ),
    // Statements
    statement: $ => choice(
      $.block,
      $.local_var,
      $.for,
      $.while,
      $.if,
      $.return,
      $.break,
      $.continue,
      $.expr_stmt,
    ),
    block: $ => seq(
      '{',
      repeat($.statement),
      '}',
    ),
    local_var: $ => choice(
      seq(
        'let',
        field('name', $.ident),
        ':',
        field('type', $.type),
        optional(seq('=', field('expr', $.expression))),
        ';'
      ),
      seq(
        'let',
        field('name', $.ident),
        ':=',
        field('expr', $.expression),
        ';',
      ),
    ),
    for: $ => seq(
      'for',
      '(',
      field('pattern', $.range_pattern),
      ')',
      field('stmt', $.statement),
    ),
    while: $ => seq(
      'while',
      '(',
      field('expr', $.expression),
      ')',
      field('stmt', $.statement),
    ),
    if: $ => prec.right(1, seq(
      'if',
      '(',
      field('expr', $.expression),
      ')',
      field('then', $.statement),
      optional(
        seq(
          'else',
          field('else', $.statement),
        )
      )
    )),
    return: $ => seq(
      'return',
      optional(field('expr', $.expression)),
      ';',
    ),
    break: $ => seq(
      'break',
      ';',
    ),
    continue: $ => seq(
      'continue',
      ';',
    ),
    expr_stmt: $ => seq($.expression, ';'),
    // Expressions
    expression: $ => choice(
      $.literal,
      $.ident,
      $.assignment,
      $.logor,
      $.logand,
      $.comparison,
      $.arithmetic_lower,
      $.arithmetic_higher,
      $.typecast,
      $.unary_expression,
      $.array_access,
      $.field_access,
      $.call_fn,
      $.paren_expr,
    ),
    assignment: $ => prec.right(1, seq(
      field('left', $.ident),
      '=',
      field('right', $.expression),
    )),
    logor: $ => prec.left(3, seq($.expression, '||', $.expression)),
    logand: $ => prec.left(5, seq($.expression, '&&', $.expression)),
    eqs: $ => prec.left(7, choice(
      seq($.expression, '==', $.expression),
      seq($.expression, '!=', $.expression),
    )),
    comparison: $ => prec.left(9, choice(
      seq($.expression, '<', $.expression),
      seq($.expression, '>', $.expression),
      seq($.expression, '<=', $.expression),
      seq($.expression, '>=', $.expression),
    )),
    arithmetic_lower: $ => prec.left(11, choice(
      seq($.expression, '+', $.expression),
      seq($.expression, '-', $.expression),
    )),
    arithmetic_higher: $ => prec.left(13, choice(
      seq($.expression, '*', $.expression),
      seq($.expression, '/', $.expression),
      seq($.expression, '%', $.expression),
    )),
    typecast: $ => prec.right(15, seq(
      '(',
      $.type,
      ')',
      $.expression,
    )),
    unary_expression: $ => prec.right(15, choice(
      seq('+', $.expression),
      seq('-', $.expression),
      seq('&', $.expression),
      seq('*', $.expression),
    )),
    array_access: $ => prec.right(17, seq(
      field('arr', $.expression),
      '[',
      field('index', $.expression),
      ']',
    )),
    field_access: $ => prec.right(17, seq(
      field('struct', $.expression),
      '.',
      field('field', $.ident),
    )),
    call_args: $ => seq($.expression, repeat(seq(',', $.expression))),
    call_fn: $ => prec.right(17, seq(
      field('fn', $.ident),
      '(',
      optional(field('args',optional($.call_args))),
      ')',
    )),
    paren_expr: $ => prec(19, seq('(', $.expression, ')')),
  }
});
