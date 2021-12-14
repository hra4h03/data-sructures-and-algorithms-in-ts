const merge = (firstArray: number[], secondArray: number[]): number[] => {
  let firstPointer = 0;
  let secondPointer = 0;

  const mergedArray: number[] = [];

  while (
    firstPointer < firstArray.length &&
    secondPointer < secondArray.length
  ) {
    if (firstArray[firstPointer] > secondArray[secondPointer]) {
      mergedArray.push(secondArray[secondPointer]);
      secondPointer++;
    }

    if (firstArray[firstPointer] < secondArray[secondPointer]) {
      mergedArray.push(firstArray[firstPointer]);
      firstPointer++;
    }

    if (firstArray[firstPointer] === secondArray[secondPointer]) {
      mergedArray.push(firstArray[firstPointer], secondArray[secondPointer]);
      secondPointer++;
      firstPointer++;
    }
  }

  mergedArray.push(
    ...firstArray.slice(firstPointer),
    ...secondArray.slice(secondPointer)
  );

  return mergedArray;
};

export function mergeSort(array: number[]): number[] {
  if (array.length === 1) return array;
  if (array.length === 2) return merge([array[0]], [array[1]]);

  const middleIndex = Math.floor(array.length / 2);
  const firstArray = mergeSort(array.slice(0, middleIndex));
  const secondArray = mergeSort(array.slice(middleIndex));

  return merge(firstArray, secondArray);
}

console.log(mergeSort([1, 3, 5, 2, 4, 6, 8]));
