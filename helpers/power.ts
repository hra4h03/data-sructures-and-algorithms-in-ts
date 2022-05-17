export function isPowerOfTwo(n: number) {
  return n & (n - 1);
}

export function nextPowerOfTwo(n: number) {
  let i = 1;
  while (i < n) {
    i <<= 1;
  }

  return i;
}

console.log(nextPowerOfTwo(16));
