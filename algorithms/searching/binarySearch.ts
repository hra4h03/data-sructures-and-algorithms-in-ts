export function binarySearch(array: number[], value: number) {
  let start = 0;
  let end = array.length;
  let middle = Math.floor((start + end) / 2);

  while (start < end) {
    if (value === array[middle]) return true;
    if (value > array[middle]) start = middle;
    if (value < array[middle]) end = middle;

    let nextMiddle = Math.floor((start + end) / 2);
    if (nextMiddle === middle) return false;
    middle = nextMiddle;
  }

  return false;
}

function binarySearchRecursive(
  array: number[],
  start: number,
  end: number,
  middle: number,
  value: number
): boolean {
  if (array[middle] === value) return true;
  if (start >= end) return false;
  if (value < array[middle]) {
    const nextMiddleIndex = Math.ceil((start + middle) / 2);
    return binarySearchRecursive(array, start, middle, nextMiddleIndex, value);
  } else {
    const nextMiddleIndex = Math.floor((middle + end) / 2);
    return binarySearchRecursive(array, middle, end, nextMiddleIndex, value);
  }
}
