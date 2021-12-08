import { Heap } from "./heap";

export class MaxHeap extends Heap {
  constructor() {
    super((parent, child) => {
      return parent > child;
    });
  }
}
