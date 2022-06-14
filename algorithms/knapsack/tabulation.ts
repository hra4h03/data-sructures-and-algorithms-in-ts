export function kapsackProblemByTabulation(string1: string, string2: string) {
  // the matrix for keeping track of the minimum changes required,
  // initialized by zeroes.
  const dp: number[][] = new Array(string1.length + 1)
    .fill(0)
    .map((_) => new Array(string2.length + 1).fill(0));

  for (let i = 0; i <= string1.length; i++) {
    for (let j = 0; j <= string2.length; j++) {
      if (i === 0 || j === 0) {
        dp[i][j] = i + j;
      } else if (string1[i] === string2[j]) {
        dp[i][j] = dp[i - 1][j - 1];
      } else {
        dp[i][j] = 1 + Math.min(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }

  console.table(dp);

  return dp[string1.length][string2.length];
}
