import { Compare, Comparator } from "./../../helpers/comparator";
import { BinaryTreeNode } from "./binaryTreeNode";

export class BinaryTree<T> {
  protected root?: BinaryTreeNode<T>;
  protected comparator: Comparator<T>;

  constructor(private compare: Compare<T>) {
    this.comparator = new Comparator(compare);
  }

  get height() {
    return this.root?.height || 0;
  }

  insert(value: T) {
    if (!this.root) {
      this.root = new BinaryTreeNode(value, this.compare);
      return;
    }

    this.root.insert(value);
  }

  contains(value: T) {
    if (!this.root) return false;
    return this.root.contains(value);
  }

  search(value: T) {
    return this.root?.search(value);
  }

  remove(value: T) {
    return this.root?.remove(value);
  }
}
