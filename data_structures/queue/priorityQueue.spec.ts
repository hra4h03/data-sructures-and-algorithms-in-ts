import { PriorityQueue } from "./priorityQueue";
describe("Priority Queue", () => {
  let priorityQueue: PriorityQueue<string>;

  beforeEach(() => {
    priorityQueue = new PriorityQueue();
  });

  it("should be empty", () => {
    expect(priorityQueue.isEmpty()).toBeTruthy();
  });

  it("should be not empty after adding", () => {
    priorityQueue.add("a", 4);

    expect(priorityQueue.isEmpty()).toBeFalsy();
  });

  it("should be empty after adding and popping", () => {
    priorityQueue.add("a", 4);
    priorityQueue.pop();

    expect(priorityQueue.isEmpty()).toBeTruthy();
  });

  it("should return right size", () => {
    expect(priorityQueue.size()).toBe(0);

    priorityQueue.add("a", 4);

    expect(priorityQueue.size()).toBe(1);

    priorityQueue.add("b", 4);

    expect(priorityQueue.size()).toBe(2);

    priorityQueue.pop();

    expect(priorityQueue.size()).toBe(1);
  });

  it("should return last priority", () => {
    priorityQueue.add("a", 4);

    expect(priorityQueue.getPriority("a")).toBe(4);

    priorityQueue.add("a", 5);

    expect(priorityQueue.getPriority("a")).toBe(5);
  });

  it("should return element with highest priority", () => {
    priorityQueue.add("a", 4);
    priorityQueue.add("b", 3);
    priorityQueue.add("c", 2);
    priorityQueue.add("d", 1);

    expect(priorityQueue.pop()).toBe("a");
    expect(priorityQueue.pop()).toBe("b");
    expect(priorityQueue.pop()).toBe("c");
    expect(priorityQueue.pop()).toBe("d");
  });

  it("should throw error if popping from empty queue", () => {
    function popFromEmptyQueue() {
      priorityQueue.pop();
    }

    expect(popFromEmptyQueue).toThrowError(
      new Error("Cannot pop an element from empty heap.")
    );
  });
});
