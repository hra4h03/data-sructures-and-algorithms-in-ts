import { LinkedList } from "./linkedList";

describe("linked list", () => {
  let linkedList: LinkedList<number>;

  beforeEach(() => {
    linkedList = new LinkedList();
  });

  it("should find node", () => {
    linkedList.append(1);
    linkedList.append(2);
    linkedList.append(3);

    const callback = jest.fn((value) => value === 3);

    expect(linkedList.find(callback)).toBe(3);
    expect(callback.mock.calls.length).toBe(3);

    expect(callback.mock.calls[0][0]).toBe(1);
    expect(callback.mock.calls[1][0]).toBe(2);
    expect(callback.mock.calls[2][0]).toBe(3);
  });

  it("should traverse list in order", () => {
    linkedList.append(1);
    linkedList.append(2);
    linkedList.append(3);
    linkedList.append(4);

    const callback = jest.fn((value, index) => {});
    linkedList.forEach(callback);

    expect(callback.mock.calls.length).toBe(4);

    expect(callback.mock.calls[0][0]).toBe(1);
    expect(callback.mock.calls[0][1]).toBe(0);

    expect(callback.mock.calls[1][0]).toBe(2);
    expect(callback.mock.calls[1][1]).toBe(1);

    expect(callback.mock.calls[2][0]).toBe(3);
    expect(callback.mock.calls[2][1]).toBe(2);

    expect(callback.mock.calls[3][0]).toBe(4);
    expect(callback.mock.calls[3][1]).toBe(3);
  });

  it("should delete node", () => {
    linkedList.append(1);
    linkedList.append(2);
    linkedList.append(3);
    linkedList.append(4);

    linkedList.delete(1);

    expect(linkedList.contains(1)).toBeFalsy();

    expect(linkedList.contains(2)).toBeTruthy();
    expect(linkedList.contains(3)).toBeTruthy();
    expect(linkedList.contains(4)).toBeTruthy();

    linkedList.delete(2);
    linkedList.delete(3);
    linkedList.delete(4);

    expect(linkedList.contains(2)).toBeFalsy();
    expect(linkedList.contains(3)).toBeFalsy();
    expect(linkedList.contains(4)).toBeFalsy();

    const removeFromEmptyList = () => linkedList.delete(1);

    expect(removeFromEmptyList).rejects;
  });
});
