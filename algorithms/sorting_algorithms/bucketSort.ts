function minmaxNormalization(array: number[]): number[] {
  const max = Math.max(...array);

  return array.map((num) => num / max);
}

export function bucketSort(array: number[]): number[] {
  const bucket: number[][] = [];

  for (let i = 0; i < array.length; i++) {
    const bucketIndex = Math.floor(array[i] * array.length);

    if (!bucket[bucketIndex]) bucket[bucketIndex] = [];
    bucket[bucketIndex].push(array[i]);
  }

  for (let i = 0; i < bucket.length; i++) {
    if (!bucket[i]) continue;
    bucket[i].sort((a, b) => a - b); // This can be any arbitrary sorting algorithm.
  }

  const result: number[] = [];

  for (let i = 0; i < bucket.length; i++) {
    if (!bucket[i]) continue;
    for (let j = 0; j < bucket[i].length; j++) {
      result.push(bucket[i][j]);
    }
  }

  return result;
}

const array = [0.42, 0.32, 0.33, 0.52, 0.37, 0.47, 0.51];
console.log(bucketSort(minmaxNormalization(array)));
