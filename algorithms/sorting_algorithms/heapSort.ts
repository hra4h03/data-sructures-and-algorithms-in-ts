import { MinHeap } from "../../data_structures/heap/minHeap";
import { Compare } from "../../helpers/comparator";

export function heapSort(array: number[]) {
  const compare: Compare<number> = (a, b) => {
    if (a > b) return 1;
    if (a < b) return -1;
    return 0;
  };

  const heap = new MinHeap(compare);
  // or
  // const heap = new MaxHeap(compare);

  array.forEach((element) => heap.insert(element));
  const sortedArray = array.map(() => heap.pop());

  return sortedArray;
}
