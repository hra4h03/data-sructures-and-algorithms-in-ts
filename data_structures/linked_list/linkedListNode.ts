export class LinkedListNode<T> {
  constructor(public value: T, public next?: LinkedListNode<T>) {}
}

export class DoubleLinkedListNode<T> {
  constructor(
    public value: T,
    public next?: DoubleLinkedListNode<T>,
    public prev?: DoubleLinkedListNode<T>
  ) {}
}
