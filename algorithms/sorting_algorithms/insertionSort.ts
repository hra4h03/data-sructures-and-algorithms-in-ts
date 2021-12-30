export function insertionSort(array: number[]): number[] {
  for (let i = 1; i < array.length; i++) {
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
