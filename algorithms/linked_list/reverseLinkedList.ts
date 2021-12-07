import { LinkedList } from "./../../data_structures/linked_list/linkedList";

export function reverseLinkedList<T>(linkedList: LinkedList<T>) {
  let previousNode = undefined;
  let currentNode = linkedList.head;

  while (currentNode) {
    let nextNode = currentNode.next;
    currentNode.next = previousNode;
    previousNode = currentNode;
    currentNode = nextNode;
  }

  linkedList.head = previousNode;
  return linkedList;
}
