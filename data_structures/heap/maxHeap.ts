import { Heap } from "./heap";

export class MaxHeap<T> extends Heap<T> {
  isCorrectOrder(first: T, second: T): boolean {
    return this.comparator.greaterThanOrEqual(first, second);
  }
}
