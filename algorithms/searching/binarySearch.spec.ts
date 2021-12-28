import { binarySearch } from "./binarySearch";

describe("binary search", () => {
  it("should find by value", () => {
    let array = [1, 2, 3, 4, 5];
    expect(binarySearch(array, 5)).toBeTruthy();
  });

  it("should return false if does not exists", () => {
    let array = [1, 2, 3, 4, 5];
    expect(binarySearch(array, 3.5)).toBeFalsy();
  });
});
