import { DoubleLinkedListNode } from "./doubleLinkedListNode";

type ForEachCallback<T> = (
  value: T,
  index: number,
  node: DoubleLinkedListNode<T>
) => void;
type FindCallback<T> = (
  value: T,
  index: number,
  node: DoubleLinkedListNode<T>
) => boolean;

export class DoubleLinkedList<T> {
  constructor(
    public head?: DoubleLinkedListNode<T>,
    public tail?: DoubleLinkedListNode<T>
  ) {}

  append(node: DoubleLinkedListNode<T>) {
    if (this.head === undefined || this.tail === undefined) {
      this.tail = node;
      this.head = node;
      return this;
    }

    this.tail.next = node;
    node.prev = this.tail;
    this.tail = this.tail.next;
    return this;
  }

  forEach(callback: ForEachCallback<T>) {
    let currentNode = this.head;
    let index = 0;

    while (currentNode) {
      callback(currentNode.value, index, currentNode);
      currentNode = currentNode.next;
      index++;
    }
  }

  find(callback: FindCallback<T>) {
    let currentNode = this.head;
    let index = 0;

    while (currentNode) {
      if (callback(currentNode.value, index, currentNode) === true) {
        return currentNode.value;
      }
      currentNode = currentNode.next;
      index++;
    }
  }

  contains(value: T) {
    return !!this.find((nodeValue) => nodeValue === value);
  }

  delete(node: DoubleLinkedList<T>): this;
  delete(value: T): this;
  delete(value: T | DoubleLinkedList<T>) {
    if (value instanceof DoubleLinkedListNode) {
      value.removeSelf();
      return this;
    }

    if (this.head === undefined) {
      throw new Error("Cannot delete element from empty list.");
    }

    if (value === this.head.value) {
      this.head = this.head.next;
      return this;
    }

    let currentNode = this.head.next;

    while (currentNode) {
      if (currentNode.value === value) {
        currentNode.removeSelf();
        return this;
      }

      currentNode = currentNode.next;
    }

    return this;
  }
}
