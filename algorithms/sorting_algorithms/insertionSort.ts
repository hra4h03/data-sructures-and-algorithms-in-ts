export function insertionSort(
  array: number[],
  start = 0,
  end = array.length
): number[] {
  for (let i = start; i < end; i++) {
    let element = array[i];
    let j = i - 1;

    while (j >= 0 && array[j] > element) {
      array[j + 1] = array[j];
      j--;
    }

    array[j + 1] = element;
  }

  return array;
}

let array = [1, 56, 2, 245, 2, 52, 34, 23, 67, 346];
console.log(insertionSort(array));
