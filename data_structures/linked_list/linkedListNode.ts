export class LinkedListNode<T> {
  constructor(public value: T, public next: LinkedListNode<T> | null = null) {}
}

export class DoubleLinkedListNode<T> {
  constructor(
    public value: T,
    public next: DoubleLinkedListNode<T> | null = null,
    public prev: DoubleLinkedListNode<T> | null = null
  ) {}
}
