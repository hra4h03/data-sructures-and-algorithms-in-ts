import { LinkedListNode } from "./linkedListNode";

type ForEachCallback<T> = (node: T, index: number) => void;
type FindCallback<T> = (node: T, index: number) => boolean;

export class LinkedList<T> {
  constructor(
    private head?: LinkedListNode<T>,
    private tail?: LinkedListNode<T>
  ) {}

  append(value: T) {
    const node = new LinkedListNode<T>(value);

    if (this.head === undefined || this.tail === undefined) {
      this.tail = node;
      this.head = node;
      return this;
    }

    this.tail.next = node;
    this.tail = this.tail.next;
    return this;
  }

  forEach(callback: ForEachCallback<T>) {
    let currentNode = this.head;
    let index = 0;

    while (currentNode) {
      callback(currentNode.value, index);
      currentNode = currentNode.next;
      index++;
    }
  }

  find(callback: FindCallback<T>) {
    let currentNode = this.head;
    let index = 0;

    while (currentNode) {
      if (callback(currentNode.value, index) === true) {
        return currentNode.value;
      }
      currentNode = currentNode.next;
      index++;
    }
  }

  contains(value: T) {
    return !!this.find((nodeValue) => nodeValue === value);
  }

  delete(value: T) {
    if (this.head === undefined) {
      throw new Error("Cannot delete element from empty list.");
    }

    if (value === this.head.value) {
      this.head = this.head.next;
      return this;
    }

    let prevNode = this.head;
    let currentNode = this.head.next;

    while (currentNode) {
      if (currentNode.value === value) {
        prevNode.next = currentNode.next;
        return this;
      }

      prevNode = currentNode;
      currentNode = currentNode.next;
    }

    return this;
  }
}
