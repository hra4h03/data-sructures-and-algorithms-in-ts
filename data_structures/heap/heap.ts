import { Comparator } from "./../../helpers/comparator";
import { Compare } from "../../helpers/comparator";

export abstract class Heap<T> {
  container: T[];
  comparator: Comparator<T>;

  constructor(compare: Compare<T>) {
    this.container = [];
    this.comparator = new Comparator(compare);
  }

  isEmpty() {
    return this.container.length === 0;
  }

  peek() {
    return this.container[0];
  }

  pop() {
    if (this.isEmpty()) {
      throw new Error("Cannot pop an element from empty heap.");
    }

    const headIndex = 0;

    const lastElement = this.container.pop()!;
    const firstElement = this.container[headIndex];

    this.container[headIndex] = lastElement;
    this.heapifyDown(headIndex);

    return firstElement;
  }

  insert(value: T) {
    this.container.push(value);
    this.heapifyUp(this.container.length - 1);
  }

  getParentIndex(index: number) {
    return Math.floor(index / 2);
  }

  getParent(index: number) {
    return this.container[this.getParentIndex(index)];
  }

  getLeftChildIndex(index: number) {
    return index * 2;
  }

  getLeftChild(index: number) {
    return this.container[this.getLeftChildIndex(index)];
  }

  getRightChildIndex(index: number) {
    return index * 2 + 1;
  }

  getRightChild(index: number) {
    return this.container[this.getRightChildIndex(index)];
  }

  isCorrectOrder(first: T, second: T): boolean {
    throw new Error("Please implement this method.");
  }

  private heapifyUp(index: number) {
    const parentIndex = this.getParentIndex(index);
    const parent = this.container[parentIndex];
    const child = this.container[index];

    if (this.isCorrectOrder(parent, child)) {
      this.swap(parentIndex, index);
      this.heapifyUp(parentIndex);
    }
  }

  private heapifyDown(index: number) {
    const leftChildIndex = this.getLeftChildIndex(index);
    const rightChildIndex = this.getRightChildIndex(index);

    const parent = this.container[index];
    const minimumChild = [
      this.container[leftChildIndex],
      this.container[rightChildIndex],
    ].sort(this.comparator.compare)[0];

    const minimumChildIndex = (() => {
      const leftChild = this.getLeftChild(index);
      const rightChild = this.getRightChild(index);

      if (this.comparator.equal(minimumChild, leftChild)) return leftChildIndex;
      if (this.comparator.equal(minimumChild, rightChild))
        return rightChildIndex;
      throw new Error();
    })();

    if (this.isCorrectOrder(parent, minimumChild)) {
      this.swap(minimumChildIndex, index);
      this.heapifyDown(minimumChildIndex);
    }
  }

  private swap(firstIndex: number, secondIndex: number) {
    [this.container[firstIndex], this.container[secondIndex]] = [
      this.container[secondIndex],
      this.container[firstIndex],
    ];
  }
}
