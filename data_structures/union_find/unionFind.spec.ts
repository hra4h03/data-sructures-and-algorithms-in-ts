import { UnionFind } from "./unionFind";

describe("Union Find", () => {
  let unionFind: UnionFind;

  beforeEach(() => {
    unionFind = new UnionFind(10);
  });

  describe("Input validation", () => {
    it("should throw error if negative or 0 size given", () => {
      const sizes = [0, -12, -4];
      function createNegativeSizeUnionFind(n: number) {
        new UnionFind(n);
      }

      sizes.forEach((size) => {
        expect(() => createNegativeSizeUnionFind(size)).toThrowError(
          new Error(`Invalid size ${size}, must be greater than 0`)
        );
      });
    });

    it("should throw error if floating size given", () => {
      const sizes = [0.5, 6.75, 4.2];
      function createFloatingSizeUnionFind(n: number) {
        new UnionFind(n);
      }

      sizes.forEach((size) => {
        expect(() => createFloatingSizeUnionFind(size)).toThrowError(
          new Error(`Invalid size ${size}, size must be int`)
        );
      });
    });

    it("should throw error if bigger index", () => {
      const bigIndex = 12;
      function findBigIndex() {
        unionFind.find(bigIndex);
      }

      expect(findBigIndex).toThrowError(
        new Error(`Out of bound node index ${bigIndex}`)
      );
    });
  });

  describe("Functionality", () => {
    it("node should be root of itself at first", () => {
      const nodes = new Array(10).fill(null).map((_, i) => i);

      nodes.forEach((node) => {
        expect(unionFind.find(node)).toBe(node);
      });
    });

    it("should change the find result abter union", () => {
      unionFind.union(1, 2);
      unionFind.union(5, 8);

      expect(unionFind.find(2)).toBe(1);
      expect(unionFind.find(8)).toBe(5);
    });

    it("should union small ranking root to the bigger one", () => {
      // two nodes in 1 root
      unionFind.union(1, 2);
      unionFind.union(1, 3);
      // one node in 5 root
      unionFind.union(5, 6);

      unionFind.union(5, 1);

      expect(unionFind.find(1)).toBe(1);
      expect(unionFind.find(5)).toBe(1);
    });

    it("should return false if same node", () => {
      unionFind.union(1, 2);
      unionFind.union(1, 3);

      expect(unionFind.union(2, 3)).toBe(false);
    });
  });
});
