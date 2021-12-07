class FixedSizeArray<T> extends Array<T> {}

class DynamicArray<T> {
  private count: number;
  private size: number;
  private array: FixedSizeArray<T>;

  constructor() {
    this.count = 0;
    this.size = 1;
    this.array = new FixedSizeArray(this.size);
  }

  isEmpty() {
    return this.count === 0;
  }

  peek() {
    return this.array[this.count];
  }

  push(data: T) {
    if (this.size === this.count) {
      this.increaseSize();
    }

    this.array[this.count] = data;
    this.count++;

    return data;
  }

  insert(index: number, data: T) {
    if (this.size === this.count) {
      this.increaseSize();
    }

    for (let i = this.count - 1; i >= index; i--) {
      this.array[i + 1] = this.array[i];
    }

    this.array[index] = data;
    this.count++;

    return data;
  }

  pop() {
    if (this.count <= 0) {
      throw new Error("Cannot pop from an empty array.");
    }

    const value = this.array[this.count - 1];
    delete this.array[this.count - 1];
    this.count--;

    return value;
  }

  private increaseSize() {
    const tempFixedArray = new FixedSizeArray<T>(this.size * 2);
    for (let i = 0; i < this.size; i++) {
      tempFixedArray[i] = this.array[i];
    }

    this.array = tempFixedArray;
    this.size *= 2;
  }
}
