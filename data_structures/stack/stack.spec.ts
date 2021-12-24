import { Stack } from "./stack";

describe("Stack", () => {
  let stack: Stack<number>;

  beforeEach(() => {
    stack = new Stack();
  });

  it("should be empty", () => {
    expect(stack.isEmpty()).toBe(true);
  });

  it("should not be empty after push", () => {
    stack.push(1);

    expect(stack.isEmpty()).toBeFalsy();
  });

  it("should return same value after pop", () => {
    let number = 1;

    stack.push(number);

    expect(stack.pop()).toBe(number);
  });

  it("should be empty after push and pop", () => {
    stack.push(1);
    stack.pop();

    expect(stack.isEmpty()).toBeTruthy();
  });

  it("should return last pushed", () => {
    stack.push(1);
    stack.push(2);
    stack.push(3);
    stack.push(4);

    expect(stack.pop()).toBe(4);
    expect(stack.pop()).toBe(3);
    expect(stack.pop()).toBe(2);
    expect(stack.pop()).toBe(1);
  });
});
