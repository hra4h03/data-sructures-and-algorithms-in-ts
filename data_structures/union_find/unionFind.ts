export class UnionFind {
  private readonly parents: Array<number> = [];
  private readonly rank: Array<number> = [];

  constructor(size: number) {
    if (size <= 0) {
      throw new Error(`Invalid size ${size}, must be greater than 0`);
    }

    if (Math.round(size) !== size) {
      throw new Error(`Invalid size ${size}, size must be int`);
    }

    this.parents = new Array(size).fill(null).map((_, i) => i);
    this.rank = new Array(size).fill(1);
  }

  public find(node: number): number {
    if (node >= this.parents.length)
      throw new Error(`Out of bound node index ${node}`);

    if (this.parents[node] !== node) {
      return this.find(this.parents[node]);
    }

    return this.parents[node];
  }

  public union(firstNode: number, secondNode: number): boolean {
    const firstRoot = this.find(firstNode);
    const secondRoot = this.find(secondNode);

    if (firstRoot === secondRoot) return false;

    if (this.rank[firstRoot] >= this.rank[secondRoot]) {
      this.parents[secondRoot] = firstRoot;
      this.rank[firstRoot] += this.rank[secondRoot];
    } else {
      this.parents[firstRoot] = secondRoot;
      this.rank[secondRoot] += this.rank[firstRoot];
    }

    return true;
  }
}
