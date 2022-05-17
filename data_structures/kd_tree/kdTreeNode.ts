import { Comparator, Compare } from "../../helpers/comparator";

export class KDTreeNode<T> {
  public left?: KDTreeNode<T>;
  public right?: KDTreeNode<T>;
  public parent?: KDTreeNode<T>;
  public comparator: Comparator<T>;

  constructor(public value: T[] | undefined, private compare: Compare<T>) {
    this.comparator = new Comparator(compare);
  }

  get height() {
    return Math.max(this.rightHeight, this.leftHeight);
  }

  get depth(): number {
    if (this.parent) return this.parent.depth + 1;
    return 0;
  }

  get currentDimention(): number {
    return this.depth % (this.value as T[]).length;
  }

  get rightHeight(): number {
    if (!this.right?.height) return 1;
    return this.right.height + 1;
  }

  get leftHeight(): number {
    if (!this.left?.height) return 1;
    return this.left.height + 1;
  }

  setLeft(node?: KDTreeNode<T>) {
    this.left = node;
  }

  getRight() {
    return this.right;
  }

  getLeft() {
    return this.left;
  }

  setRight(node?: KDTreeNode<T>) {
    this.right = node;
  }

  setParent(node?: KDTreeNode<T>) {
    this.parent = node;
  }

  setValue(value?: T[]) {
    this.value = value;
  }

  insert(value: T[]): void {
    if (!this.value) {
      return this.setValue(value);
    }

    const newNode = new KDTreeNode(value, this.compare);
    this.insertNode(newNode);
  }

  findClosest(value: T[]) {}

  contains(v: T[]): boolean {
    const value = v as T[];
    if (!this.value) return false;

    if (
      this.comparator.equal(
        value[this.currentDimention],
        this.value[this.currentDimention]
      )
    ) {
      return true;
    }

    if (
      this.comparator.lessThan(
        value[this.currentDimention],
        this.value[this.currentDimention]
      )
    ) {
      if (!this.left) return false;
      return this.left.contains(value);
    }

    if (
      this.comparator.greaterThan(
        value[this.currentDimention],
        this.value[this.currentDimention]
      )
    ) {
      if (!this.right) return false;
      return this.right.contains(value);
    }

    return false;
  }

  remove(value: T[]) {
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

  search(value: T[]): KDTreeNode<T> | undefined {
    if (!this.value) return undefined;

    const isEqual = this.value.every((dimention, axis) =>
      this.comparator.equal(dimention, value[axis])
    );

    if (isEqual) return this;

    if (
      this.comparator.greaterThan(
        value[this.currentDimention],
        this.value[this.currentDimention]
      )
    ) {
      if (!this.right) return undefined;
      return this.right.search(value);
    }

    if (
      this.comparator.lessThan(
        value[this.currentDimention],
        this.value[this.currentDimention]
      )
    ) {
      if (!this.left) return undefined;
      return this.left.search(value);
    }
  }

  removeChild(value: T[]) {
    if (
      this.right?.value &&
      this.comparator.equal(
        value[this.currentDimention],
        this.right.value[this.currentDimention]
      )
    ) {
      this.setRight(undefined);
    }

    if (
      this.left?.value &&
      this.comparator.equal(
        value[this.currentDimention],
        this.left.value[this.currentDimention]
      )
    ) {
      this.setLeft(undefined);
    }
  }

  private replaceChild(child: KDTreeNode<T>, node: KDTreeNode<T>) {
    if (
      child.value &&
      this.right?.value &&
      this.comparator.equal(
        child.value[this.currentDimention],
        this.right.value[this.currentDimention]
      )
    ) {
      this.setRight(node);
      node.setParent(this);
    }

    if (
      child.value &&
      this.left?.value &&
      this.comparator.equal(
        child.value[this.currentDimention],
        this.left.value[this.currentDimention]
      )
    ) {
      this.setLeft(node);
      node.setParent(this);
    }
  }

  private insertNode(node: KDTreeNode<T>): void {
    if (!this.value || !node.value) {
      return;
    }

    if (
      this.comparator.greaterThan(
        node.value[this.currentDimention],
        this.value[this.currentDimention]
      )
    ) {
      if (this.right) return this.right.insertNode(node);

      this.right = node;
      this.right.setParent(this);
    }

    if (
      this.comparator.lessThanOrEqual(
        node.value[this.currentDimention],
        this.value[this.currentDimention]
      )
    ) {
      if (this.left) return this.left.insertNode(node);

      this.left = node;
      this.left.setParent(this);
    }
  }
}
