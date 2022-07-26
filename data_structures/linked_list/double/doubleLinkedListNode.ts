export class DoubleLinkedListNode<T> {
  constructor(
    public value: T,
    public next?: DoubleLinkedListNode<T>,
    public prev?: DoubleLinkedListNode<T>
  ) {}

  removeSelf() {
    const prev = this.prev;
    const next = this.next;

    this.next = undefined;
    this.prev = undefined;
    if (prev) prev.next = next;
    if (next) next.prev = prev;
  }
}
