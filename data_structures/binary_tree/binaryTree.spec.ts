import { Compare } from "../../helpers/comparator";
import { BinaryTree } from "./binaryTree";

describe("Binary Tree", () => {
  let binaryTree: BinaryTree<number>;
  const compare: Compare<number> = (a, b) => {
    if (a > b) return 1;
    if (a < b) return -1;
    return 0;
  };

  beforeEach(() => {
    binaryTree = new BinaryTree(compare);
  });

  it("should contain inserted element", () => {
    binaryTree.insert(2);
    binaryTree.insert(3);
    binaryTree.insert(1);
    binaryTree.insert(4);

    expect(binaryTree.contains(2)).toBeTruthy();
    expect(binaryTree.contains(3)).toBeTruthy();
    expect(binaryTree.contains(1)).toBeTruthy();
    expect(binaryTree.contains(4)).toBeTruthy();
  });

  it("should be at the right height", () => {
    binaryTree.insert(2);

    expect(binaryTree.height).toBe(1);

    binaryTree.insert(3);

    expect(binaryTree.height).toBe(2);

    binaryTree.insert(1);

    expect(binaryTree.height).toBe(2);

    binaryTree.insert(4);

    expect(binaryTree.height).toBe(3);
  });

  it("should find only inserted node", () => {
    binaryTree.insert(2);
    binaryTree.insert(3);
    binaryTree.insert(1);
    binaryTree.insert(4);

    expect(binaryTree.search(4)).toBeTruthy();
    expect(binaryTree.search(3)).toBeTruthy();
    expect(binaryTree.search(10)).toBeFalsy();
  });

  describe("removing node", () => {
    it("should not contain after removing leaf node", () => {
      binaryTree.insert(2);
      binaryTree.insert(3);
      binaryTree.insert(1);
      binaryTree.insert(4);

      binaryTree.remove(4);

      expect(binaryTree.contains(4)).toBeFalsy();
    });

    it("should remove root value if only one node", () => {
      binaryTree.insert(2);

      binaryTree.remove(2);

      expect(binaryTree.contains(2)).toBeFalsy();
    });

    it("should not contain node after removing node with only right child", () => {
      binaryTree.insert(2);
      binaryTree.insert(3);
      binaryTree.insert(1);
      binaryTree.insert(4);

      binaryTree.remove(3);

      expect(binaryTree.contains(3)).toBeFalsy();

      expect(binaryTree.contains(4)).toBeTruthy();
      expect(binaryTree.contains(2)).toBeTruthy();
      expect(binaryTree.contains(1)).toBeTruthy();
    });

    it("should not contain node after removing node with only left child", () => {
      binaryTree.insert(2);
      binaryTree.insert(4);
      binaryTree.insert(1);
      binaryTree.insert(3);

      binaryTree.remove(4);

      expect(binaryTree.contains(4)).toBeFalsy();

      expect(binaryTree.contains(3)).toBeTruthy();
      expect(binaryTree.contains(2)).toBeTruthy();
      expect(binaryTree.contains(1)).toBeTruthy();
    });

    it("should not contain node after removing node with two child", () => {
      binaryTree.insert(2);
      binaryTree.insert(5);
      binaryTree.insert(1);
      binaryTree.insert(3);
      binaryTree.insert(6);

      binaryTree.remove(5);

      expect(binaryTree.contains(5)).toBeFalsy();

      expect(binaryTree.contains(2)).toBeTruthy();
      expect(binaryTree.contains(1)).toBeTruthy();
      expect(binaryTree.contains(3)).toBeTruthy();
      expect(binaryTree.contains(6)).toBeTruthy();
    });

    it("should not remove non-existing node", () => {
      binaryTree.insert(2);
      binaryTree.insert(5);
      binaryTree.insert(1);
      binaryTree.insert(3);
      binaryTree.insert(6);

      const removeNonExisting = () => binaryTree.remove(10);

      expect(removeNonExisting).rejects;
    });
  });
});
