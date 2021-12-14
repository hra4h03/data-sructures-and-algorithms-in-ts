type Partition = (array: number[], lowest: number, highest: number) => number;

const swap = <T>(array: T[], i: number, j: number) => {
  const temp = array[i];
  array[i] = array[j];
  array[j] = temp;
};

const partition: Partition = (array, lowest, highest) => {
  let pivot = array[highest];
  let i = lowest - 1;

  for (let j = lowest; j < highest; j++) {
    if (array[j] < pivot) {
      i++;
      swap(array, i, j);
    }
  }

  swap(array, i + 1, highest);

  return i + 1;
};

const quickSortRecursion = (
  array: number[],
  lowest: number,
  highest: number
) => {
  if (lowest < highest) {
    const pivotIndex = partition(array, lowest, highest);

    quickSortRecursion(array, lowest, pivotIndex - 1);
    quickSortRecursion(array, pivotIndex + 1, highest);
  }
};

export function quickSort(array: number[]): number[] {
  quickSortRecursion(array, 0, array.length - 1);
  return array;
}

console.log(quickSort([0, 2, 7, 6, 1, 3, 5]));
