import { LinkedListNode } from "./linkedListNode";

export class LinkedList<T> {
  constructor(
    public head: LinkedListNode<T> | null,
    public tail: LinkedListNode<T> | null
  ) {}

  append(node: LinkedListNode<T>) {
    if (this.head === null || this.tail === null) {
      this.tail = node;
      this.head = node;
      return this;
    }

    this.tail.next = node;
    this.tail = this.tail.next;
    return this;
  }

  delete(node: LinkedListNode<T>) {
    if (this.head === null) {
      throw new Error("Cannot delete element from empty list.");
    }

    if (node === this.head) {
      this.head = this.head.next;
      return this;
    }

    let prevNode = this.head;
    let currentNode = this.head.next;

    while (currentNode) {
      if (currentNode === node) {
        prevNode.next = currentNode.next;
        return this;
      }

      prevNode = currentNode;
      currentNode = currentNode.next;
    }

    return this;
  }
}
