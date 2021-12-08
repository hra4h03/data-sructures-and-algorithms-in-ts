import { LinkedList } from "../linked_list/linkedList";

type HashTableNode<T> = {
  key: string;
  value: T;
};

export class HashTable<T> {
  static constructTable = <T>(size: number) =>
    new Array(size).fill(null).map(() => new LinkedList<HashTableNode<T>>());

  private table: LinkedList<HashTableNode<T>>[];
  private numberOfElements: number;
  private resizeThreshold: number;

  constructor(tableSize = 64, resizeThreshold = 0.5) {
    this.table = HashTable.constructTable(tableSize);
    this.numberOfElements = 0;
    this.resizeThreshold = resizeThreshold;
  }

  get loadFactor() {
    return this.numberOfElements / this.table.length;
  }

  resize() {
    const newTableSize = this.table.length * 2;
    const newHashTable = new HashTable<T>(newTableSize);

    for (const linkedList of this.table) {
      linkedList.forEach((node) => {
        newHashTable.set(node.key, node.value);
      });
    }

    this.table = newHashTable.table;
  }

  hash(key: string) {
    let hash = 0;
    for (const char of key) {
      hash += char.charCodeAt(0);
    }

    return hash % this.table.length;
  }

  set(key: string, value: T) {
    this.numberOfElements++;
    if (this.loadFactor > this.resizeThreshold) this.resize();

    const index = this.hash(key);
    console.log(index);

    const newNode: HashTableNode<T> = { key, value };
    this.table[index].append(newNode);
  }

  get(key: string) {
    const index = this.hash(key);
    const node = this.table[index].find((node) => node.key === key);

    if (!node) return null;
    return node.value;
  }
}
