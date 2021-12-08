type BTreeNodeInput = {
  degree: number;
  parent?: BTreeNode;
};

export class BTreeNode {
  keyCount: number;
  childCount: number;
  parent?: BTreeNode;
  children: (BTreeNode | null)[];
  keys: number[];

  constructor({ degree, parent }: BTreeNodeInput) {
    this.keyCount = degree - 1;
    this.childCount = degree;

    this.parent = parent;

    this.children = new Array(this.childCount).fill(null);

    this.keys = new Array(this.keyCount).fill(null);
  }

  firstKey() {
    return this.keys[0];
  }

  getParent() {
    return this.parent;
  }

  isLeaf() {
    return this.children[0] === null;
  }

  isEmpty() {
    return this.keys[0] === null;
  }

  isFull() {
    return this.keys[this.keys.length - 1] !== null;
  }

  insertKey(value: number) {
    console.assert(!this.isFull());

    for (let i = 0; i < this.keyCount; i++) {
      const key = this.keys[i];
      if (key === null) {
        this.keys[i] = value;
        break;
      }

      if (key > value) {
        this.keys[i] = value;
        value = key;
      }
    }

    return this;
  }

  insertChild(btreeNode: BTreeNode) {
    let insertIndex = 0;
    while (
      insertIndex < this.keyCount &&
      this.keys[insertIndex] !== null &&
      btreeNode.firstKey() > this.keys[insertIndex]
    ) {
      insertIndex++;
    }

    this.children[insertIndex] = btreeNode;
  }
}
