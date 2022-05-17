import { Compare } from "../../helpers/comparator";
import { KDTree } from "./kdTree";

describe("K dimentional Tree", () => {
  let kdTree: KDTree<number>;
  const compare: Compare<number> = (a, b) => {
    if (a > b) return 1;
    if (a < b) return -1;
    return 0;
  };

  beforeEach(() => {
    kdTree = new KDTree(2, compare);
  });

  it("should not accept point from different dimention", () => {
    const addWrongDimentions = () => kdTree.insert([2]);
    const containsWrongDimentions = () => kdTree.contains([2]);
    const removeWrongDimentions = () => kdTree.remove([2]);
    const searchWrongDimentions = () => kdTree.search([2]);

    expect(addWrongDimentions).toThrow();
    expect(containsWrongDimentions).toThrow();
    expect(removeWrongDimentions).toThrow();
    expect(searchWrongDimentions).toThrow();
  });

  it("should insert node correctly", () => {
    kdTree.insert([3, 4]);

    expect(kdTree.height).toEqual(1);
    expect(kdTree.contains([3, 4])).toBe(true);
    expect(kdTree.search([3, 4])?.value).toEqual([3, 4]);

    kdTree.insert([2, 5]);

    expect(kdTree.height).toEqual(2);
    expect(kdTree.contains([2, 5])).toBe(true);
    expect(kdTree.search([2, 5])?.value).toEqual([2, 5]);

    kdTree.insert([2, 6]);
    kdTree.insert([4, 4]);

    expect(kdTree.search([3, 4])?.getLeft()?.value).toEqual([2, 5]);
    expect(kdTree.search([2, 5])?.getRight()?.value).toEqual([2, 6]);
    expect(kdTree.search([3, 4])?.getRight()?.value).toEqual([4, 4]);

    expect(kdTree.height).toBe(3);
  });
});
