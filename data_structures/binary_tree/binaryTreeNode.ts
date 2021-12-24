import { Comparator } from "./../../helpers/comparator";

export class BinaryTreeNode<T> {
  public left?: BinaryTreeNode<T>;
  public right?: BinaryTreeNode<T>;
  public parent?: BinaryTreeNode<T>;

  constructor(public value: T | undefined, public comparator: Comparator<T>) {}

  get height() {
    return Math.max(this.rightHeight, this.leftHeight);
  }

  get rightHeight(): number {
    if (!this.right?.height) return 1;
    return this.right.height + 1;
  }

  get leftHeight(): number {
    if (!this.left?.height) return 1;
    return this.left.height + 1;
  }

  setLeft(node?: BinaryTreeNode<T>) {
    this.left = node;
  }

  setRight(node?: BinaryTreeNode<T>) {
    this.right = node;
  }

  setParent(node?: BinaryTreeNode<T>) {
    this.parent = node;
  }

  setValue(value?: T) {
    this.value = value;
  }

  insert(value: T): void {
    if (!this.value) {
      return this.setValue(value);
    }

    const newNode = new BinaryTreeNode(value, this.comparator);
    this.insertNode(newNode);
  }

  contains(value: T): boolean {
    if (!this.value) return false;

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

  remove(value: T) {
    const nodeToRemove = this.search(value);
    if (!nodeToRemove) throw new Error(`No node found with value ${value}`);

    const parent = nodeToRemove.parent;

    if (!nodeToRemove.left && !nodeToRemove.right) {
      if (parent) {
        parent.removeChild(nodeToRemove.value!);
      } else {
        nodeToRemove.setValue(undefined);
      }
    }

    if (nodeToRemove.right && !nodeToRemove.left) {
      if (parent) {
        const rightNode = nodeToRemove.right;
        parent.replaceChild(nodeToRemove, rightNode);
      }
    }

    if (nodeToRemove.left && !nodeToRemove.right) {
      if (parent) {
        const leftNode = nodeToRemove.left;
        parent.replaceChild(nodeToRemove, leftNode);
      }
    }

    if (nodeToRemove.left && nodeToRemove.right) {
      if (parent) {
        const rightNode = nodeToRemove.right;
        const leftNode = nodeToRemove.left;

        parent.replaceChild(nodeToRemove, rightNode);
        rightNode.insertNode(leftNode);
      }
    }
  }

  search(value: T): BinaryTreeNode<T> | undefined {
    if (!this.value) return undefined;

    if (this.comparator.equal(value, this.value)) {
      return this;
    }

    if (this.comparator.greaterThan(value, this.value)) {
      if (!this.right) return undefined;
      return this.right.search(value);
    }

    if (this.comparator.lessThan(value, this.value)) {
      if (!this.left) return undefined;
      return this.left.search(value);
    }
  }

  removeChild(value: T) {
    if (this.right?.value && this.comparator.equal(this.right.value, value)) {
      this.setRight(undefined);
    }

    if (this.left?.value && this.comparator.equal(this.left.value, value)) {
      this.setLeft(undefined);
    }
  }

  private replaceChild(child: BinaryTreeNode<T>, node: BinaryTreeNode<T>) {
    if (
      child.value &&
      this.right?.value &&
      this.comparator.equal(this.right.value, child.value)
    ) {
      this.setRight(node);
      node.setParent(this);
    }

    if (
      child.value &&
      this.left?.value &&
      this.comparator.equal(this.left.value, child.value)
    ) {
      this.setLeft(node);
      node.setParent(this);
    }
  }

  private insertNode(node: BinaryTreeNode<T>): void {
    if (!this.value || !node.value) {
      return;
    }

    if (this.comparator.greaterThan(node.value, this.value)) {
      if (this.right) return this.right.insertNode(node);

      this.right = node;
      this.right.setParent(this);
    }

    if (this.comparator.lessThanOrEqual(node.value, this.value)) {
      if (this.left) return this.left.insertNode(node);

      this.left = node;
      this.left.setParent(this);
    }
  }
}
