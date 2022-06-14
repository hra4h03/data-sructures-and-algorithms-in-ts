import { kapsackProblemByTabulation } from "./tabulation";

describe("Knapsack problem", () => {
  it("should work for empty strings", () => {
    expect(kapsackProblemByTabulation("", "a")).toBe(1);
  });

  it("should work in equal cases", () => {
    expect(kapsackProblemByTabulation("see", "see")).toBe(0);
  });

  it("should work with large strings", () => {
    let s1 = "see the cat out";
    let s2 = "the cat out see";

    console.log(s1, s2);

    expect(kapsackProblemByTabulation(s1, s2)).toBe(8);
  });
});
