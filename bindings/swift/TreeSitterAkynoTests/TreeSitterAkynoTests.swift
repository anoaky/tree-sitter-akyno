import XCTest
import SwiftTreeSitter
import TreeSitterAkyno

final class TreeSitterAkynoTests: XCTestCase {
    func testCanLoadGrammar() throws {
        let parser = Parser()
        let language = Language(language: tree_sitter_akyno())
        XCTAssertNoThrow(try parser.setLanguage(language),
                         "Error loading Akyno grammar")
    }
}
