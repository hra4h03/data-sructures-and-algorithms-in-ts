import { Compare, Comparator } from "../../helpers/comparator";
import { KDTreeNode } from "./kdTreeNode";

export class KDTree<T> {
  protected root?: KDTreeNode<T>;
  protected comparator: Comparator<T>;

  constructor(public dimentions: number, private compare: Compare<T>) {
    this.comparator = new Comparator(compare);
  }

  get height() {
    return this.root?.height || 0;
  }

  insert(value: T[]) {
    this.validatePoint(value);

    if (!this.root) {
      this.root = new KDTreeNode(value, this.compare);
      return this.root;
    }

    return this.root.insert(value);
  }

  contains(value: T[]) {
    this.validatePoint(value);

    if (!this.root) return false;
    return this.root.contains(value);
  }

  search(value: T[]) {
    this.validatePoint(value);
    return this.root?.search(value);
  }

  findClosest(value: T[]) {
    this.validatePoint(value);
    return this.root?.findClosest(value);
  }

  remove(value: T[]) {
    this.validatePoint(value);
    return this.root?.remove(value);
  }

  [Symbol.toStringTag]() {
    return this.root;
  }

  private validatePoint(value: T[]) {
    if (value.length !== this.dimentions) {
      throw new Error(`Wrong point for ${this.dimentions} dimention KDTree`);
    }
  }
}
