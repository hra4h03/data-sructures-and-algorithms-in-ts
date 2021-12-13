import { Heap } from "./heap";

export class MinHeap<T> extends Heap<T> {
  isCorrectOrder(first: T, second: T): boolean {
    return this.comparator.lessThanOrEqual(first, second);
  }
}
