import { Comparator } from "./../../helpers/comparator";

export class BinaryTreeNode<T> {
  public left?: BinaryTreeNode<T>;
  public right?: BinaryTreeNode<T>;

  constructor(public value: T, public comparator: Comparator<T>) {}

  insert(value: T) {
    if (this.comparator.greaterThan(value, this.value)) {
      if (this.right) this.right.insert(value);
      else this.right = new BinaryTreeNode(value, this.comparator);
    }

    if (this.comparator.lessThanOrEqual(value, this.value)) {
      if (this.left) this.left.insert(value);
      else this.right = new BinaryTreeNode(value, this.comparator);
    }
  }

  contains(value: T): boolean {
    if (this.comparator.equal(value, this.value)) {
      return true;
    }

    if (this.comparator.lessThan(value, this.value)) {
      if (!this.left) return false;
      return this.left.contains(value);
    }

    if (this.comparator.greaterThan(value, this.value)) {
      if (!this.right) return false;
      return this.right.contains(value);
    }

    return false;
  }
}
