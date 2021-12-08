import { LinkedListNode } from "./../linked_list/linkedListNode";
import { LinkedList } from "./../linked_list/linkedList";

export class Queue<T> {
  linkedList = new LinkedList<T>();

  dequeue() {
    if (!this.linkedList.head) {
      throw new Error("Cannot dequeue empty queue.");
    }

    const removingHead = this.linkedList.head;
    this.linkedList.delete(this.linkedList.head);

    return removingHead.value;
  }

  enqueue(value: T) {
    this.linkedList.append(value);
  }

  isEmpty() {
    return !this.linkedList.head;
  }

  peek() {
    return this.linkedList.head?.value;
  }
}
