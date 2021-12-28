interface TrieNode extends Record<string, TrieNode> {}

export class Trie {
  private root: TrieNode;

  constructor() {
    this.root = {
      "*": {},
    };
  }

  addWord(word: string) {
    const charList = Array.from(word);

    let trie = this.root["*"];

    for (let i = 0; i < charList.length; i++) {
      const char = charList[i];
      if (char in trie) {
        trie = trie[char];
      } else {
        this.addUniqueWord(trie, charList.slice(i));
        break;
      }
    }
  }

  private addUniqueWord(trieNode: TrieNode, charList: string[]) {
    let currentTrie = trieNode;

    charList.forEach((char) => {
      currentTrie[char] = {};
      currentTrie = currentTrie[char];
    });

    currentTrie["*"] = {};
  }

  getCompletion(incompleteWord: string) {
    const charList = Array.from(incompleteWord);
    let trie = this.root["*"];

    for (let i = 0; i < charList.length; i++) {
      const char = charList[i];
      if (char in trie) {
        trie = trie[char];
      } else return [];
    }

    return Object.keys(trie);
  }
}
