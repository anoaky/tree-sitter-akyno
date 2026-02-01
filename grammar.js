/**
 * @file Akyno grammar for tree-sitter
 * @author Anokhi Suresh
 * @license MIT
 */

/// <reference types="tree-sitter-cli/dsl" />
// @ts-check

export default grammar({
  name: "akyno",

  rules: {
    // TODO: add the actual grammar rules
    source_file: $ => "hello"
  }
});
