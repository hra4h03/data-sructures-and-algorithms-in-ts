import { Compare } from "./../../helpers/comparator";
import { Heap } from "./heap";

export class MinHeap<T> extends Heap<T> {
  constructor(compare: Compare<T>) {
    super(compare);
  }

  isCorrectOrder(first: T, second: T): boolean {
    return this.comparator.lessThanOrEqual(first, second);
  }
}
