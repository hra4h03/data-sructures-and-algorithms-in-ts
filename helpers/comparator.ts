export type Compare<T> = (a: T, b: T) => 0 | 1 | -1;

export class Comparator<T> {
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
