import { Compare, Comparator } from "./../../helpers/comparator";
import { BinaryTreeNode } from "./binaryTreeNode";

export class BinaryTree<T> {
  root?: BinaryTreeNode<T>;
  comparator: Comparator<T>;

  constructor(compare: Compare<T>) {
    this.comparator = new Comparator(compare);
  }

  insert(value: T) {
    if (!this.root) {
      this.root = new BinaryTreeNode(value, this.comparator);
      return;
    }

    this.root.insert(value);
  }

  contains(value: T) {
    if (!this.root) return false;
    return this.root.contains(value);
  }
}
