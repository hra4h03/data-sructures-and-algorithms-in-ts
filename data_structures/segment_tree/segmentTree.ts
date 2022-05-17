import { Comparator } from "../../helpers/comparator";
import { isPowerOfTwo, nextPowerOfTwo } from "../../helpers/power";

export class SegmentTree<T> {
  segmentTree: T[];

  constructor(private inputArray: T[], protected comparator: Comparator<T>) {
    this.segmentTree = this.constructSegmentTree();
    this.buildSegmentTree();
  }

  rangeQuery(start: number, end: number) {}

  private constructSegmentTree() {
    const nextPower = nextPowerOfTwo(this.inputArray.length);
    const segmentTreeLength = 2 * nextPower - 1;

    return Array(segmentTreeLength).fill(null);
  }

  private buildSegmentTree() {
    for (let j = 0, i = this.inputArray.length - 1; i > 0; i--, j++) {
      this.segmentTree[this.segmentTree.length - 1 - j] = this.inputArray[i];
    }
  }

  private getParentIndex(idx: number) {
    return Math.floor((idx - 1) / 2);
  }

  private getRightChildIndex(idx: number) {
    return idx * 2 + 2;
  }

  private getLeftChildIndex(idx: number) {
    return idx * 2 + 1;
  }
}
