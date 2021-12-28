import { Trie } from "./trie";
describe("trie", () => {
  let trie: Trie;

  beforeEach(() => {
    trie = new Trie();
  });

  it("should autocomplete", () => {
    trie.addWord("hello");

    expect(trie.getCompletion("h")).toEqual(["e"]);
    expect(trie.getCompletion("he")).toEqual(["l"]);
    expect(trie.getCompletion("hel")).toEqual(["l"]);
    expect(trie.getCompletion("hell")).toEqual(["o"]);
  });

  it("should autocomplete many words", () => {
    trie.addWord("hello");
    trie.addWord("human");
    trie.addWord("helicopter");
    trie.addWord("hemoglobin");

    expect(trie.getCompletion("h")).toEqual(["e", "u"]);
    expect(trie.getCompletion("he")).toEqual(["l", "m"]);
    expect(trie.getCompletion("hel")).toEqual(["l", "i"]);
    expect(trie.getCompletion("hell")).toEqual(["o"]);
  });

  it("should be empty if no autocomplete", () => {
    trie.addWord("hello");

    expect(trie.getCompletion("h")).toEqual(["e"]);
    expect(trie.getCompletion("he")).toEqual(["l"]);
    expect(trie.getCompletion("hey")).toEqual([]);
  });

  it("should show if it is also end", () => {
    trie.addWord("hey");

    expect(trie.getCompletion("h")).toEqual(["e"]);
    expect(trie.getCompletion("he")).toEqual(["y"]);
    expect(trie.getCompletion("hey")).toEqual(["*"]);
  });
});
