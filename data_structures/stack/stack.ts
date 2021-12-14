import { DynamicArray } from "../dynamic_array/dynamicArray";

export class Stack<T> {
  private dynamicArray = new DynamicArray<T>();

  pop() {
    return this.dynamicArray.pop();
  }

  push(value: T) {
    return this.dynamicArray.push(value);
  }

  isEmpty() {
    return this.dynamicArray.isEmpty();
  }

  peek() {
    return this.dynamicArray.peek();
  }
}
