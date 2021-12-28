type CountingSort = (array: number[]) => number[];

const countingSort: CountingSort = (unsortedArray) => {
  const max = Math.max(...unsortedArray);
  const min = Math.min(...unsortedArray);

  const uniqueElementCount = new Array<number>(max - min + 1).fill(0);

  for (let i = 0; i < unsortedArray.length; i++) {
    const element = unsortedArray[i];
    uniqueElementCount[element]++;
  }

  for (let k = 1; k < uniqueElementCount.length; k++) {
    const count = Number(uniqueElementCount[k]);
    const previousCount = Number(uniqueElementCount[k - 1]);
    uniqueElementCount[k] = count + previousCount;
  }

  const sortedArray = new Array<number>(unsortedArray.length).fill(NaN);

  for (let i = unsortedArray.length - 1; i >= 0; i--) {
    const element = unsortedArray[i];
    uniqueElementCount[element]--;
    const elementSortedIndex = uniqueElementCount[element];
    sortedArray[elementSortedIndex] = element;
  }

  return sortedArray;
};

const array = [2, 1, 3, 4, 7, 8, 2, 1, 1, 2, 4, 7, 5, 6, 6];
console.log(countingSort(array));
