export type Compare<T> = (a: T, b: T) => 0 | 1 | -1;

export class Comparator<T = number> {
  static defaultCompare(a: number, b: number) {
    if (a > b) return 1;
    if (a < b) return -1;
    return 0;
  }

  constructor(public compare: Compare<T>) {}

  equal(first: T, second: T) {
    return this.compare(first, second) === 0;
  }

  lessThan(first: T, second: T) {
    return this.compare(first, second) === -1;
  }

  greaterThan(first: T, second: T) {
    return this.compare(first, second) === 1;
  }

  greaterThanOrEqual(first: T, second: T) {
    return this.greaterThan(first, second) || this.equal(first, second);
  }

  lessThanOrEqual(first: T, second: T) {
    return this.lessThan(first, second) || this.equal(first, second);
  }
}
