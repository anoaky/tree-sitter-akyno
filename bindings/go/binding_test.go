package tree_sitter_akyno_test

import (
	"testing"

	tree_sitter "github.com/tree-sitter/go-tree-sitter"
	tree_sitter_akyno "github.com/anoaky/tree-sitter-akyno/bindings/go"
)

func TestCanLoadGrammar(t *testing.T) {
	language := tree_sitter.NewLanguage(tree_sitter_akyno.Language())
	if language == nil {
		t.Errorf("Error loading Akyno grammar")
	}
}
