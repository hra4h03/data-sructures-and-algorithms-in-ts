import { Compare } from "./../../helpers/comparator";
import { MinHeap } from "../heap/minHeap";

export class PriorityQueue<T> {
  private heap: MinHeap<T>;
  private priorities: Map<T, number>;

  constructor() {
    const compare: Compare<T> = (first, second) => {
      const firstPriority = this.priorities.get(first)!;
      const secondPriority = this.priorities.get(second)!;

      if (firstPriority < secondPriority) return 1;
      if (firstPriority > secondPriority) return -1;
      return 0;
    };

    this.heap = new MinHeap(compare);
    this.priorities = new Map();
  }

  isEmpty(): boolean {
    return this.heap.isEmpty();
  }

  size() {
    return this.heap.size();
  }

  getPriority(item: T): number {
    const priority = this.priorities.get(item);
    return priority ?? 0;
  }

  add(item: T, priority = 1) {
    this.priorities.set(item, priority);
    this.heap.insert(item);
  }

  peek(): T {
    return this.heap.peek();
  }

  pop(): T {
    const node = this.heap.pop();
    this.priorities.delete(node);

    return node;
  }
}
