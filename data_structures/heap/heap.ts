type CheckOrderFunction<T> = (parent: T, child: T) => boolean;

export abstract class Heap {
  container: number[];

  constructor(private checkOrder: CheckOrderFunction<number>) {
    this.container = [];
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

  insert(value: number) {
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

  private heapifyUp(index: number) {
    const parentIndex = this.getParentIndex(index);
    const parent = this.container[parentIndex];
    const child = this.container[index];

    if (this.checkOrder(parent, child)) {
      this.swap(parentIndex, index);
      this.heapifyUp(parentIndex);
    }
  }

  private heapifyDown(index: number) {
    const leftChildIndex = this.getLeftChildIndex(index);
    const rightChildIndex = this.getRightChildIndex(index);

    const parent = this.container[index];
    const minimumChild = Math.min(
      this.container[leftChildIndex],
      this.container[rightChildIndex]
    );

    const minimumChildIndex = (() => {
      const leftChild = this.getLeftChild(index);
      const rightChild = this.getRightChild(index);

      if (minimumChild === leftChild) return leftChildIndex;
      if (minimumChild === rightChild) return rightChildIndex;
      throw new Error();
    })();

    if (this.checkOrder(parent, minimumChild)) {
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
