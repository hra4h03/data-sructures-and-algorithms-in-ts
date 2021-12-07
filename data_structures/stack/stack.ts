export class Stack<T> {
  dynamicArray = new DynamicArray<T>();

  pop() {
    return this.dynamicArray.pop();
  }

  push(value: T) {
    return this.dynamicArray.push(value);
  }

  isEmpty() {
    return !this.dynamicArray.isEmpty();
  }

  peek() {
    return this.dynamicArray.peek();
  }
}
