import { BTreeNode } from "./bTreeNode";

export class BTree {
  root: BTreeNode;

  constructor(public degree: number) {
    this.root = this.createBTreeNode();
  }

  add(value: number) {
    this.addRecursive(value, this.root);
  }

  private addRecursive(value: number, currentNode: BTreeNode) {
    if (currentNode.isLeaf() && currentNode.isFull()) {
      this.split(currentNode, value);
      return;
    }

    if (currentNode.isLeaf() && !currentNode.isFull()) {
      currentNode.insertKey(value);
      return;
    }

    for (let i = 0; i < currentNode.keys.length; i++) {
      const key = currentNode.keys[i];

      if (value < key || key === null) {
        const childNode = currentNode.children[i];
        this.addRecursive(value, childNode!);
        return;
      }
    }
  }

  private split(splittingNode: BTreeNode, insertingValue: number) {
    const keys = [...splittingNode.keys, insertingValue].sort((a, b) => a - b);

    const middleIndex = Math.floor(keys.length / 2);
    const selectedKey = keys[middleIndex];

    let parent = splittingNode.getParent();

    if (!parent) {
      parent = this.createBTreeNode();
      this.root = parent;
    }

    if (parent.isFull()) {
      this.split(parent, insertingValue);
      return;
    }

    if (!parent.isFull()) {
      parent.insertKey(selectedKey);

      const leftNode = this.createBTreeNode(parent);
      const leftKeys = keys.slice(0, middleIndex);
      leftKeys.forEach((key) => leftNode.insertKey(key));

      const rightKeys = keys.slice(middleIndex + 1);
      const rightNode = this.createBTreeNode(parent);
      rightKeys.forEach((key) => rightNode.insertKey(key));

      parent.insertChild(leftNode);
      parent.insertChild(rightNode);

      return;
    }
  }

  createBTreeNode(parent?: BTreeNode) {
    return new BTreeNode({ degree: this.degree, parent });
  }
}
