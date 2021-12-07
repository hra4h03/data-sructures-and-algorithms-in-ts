export class BinaryTreeNode<T> {
  constructor(
    public value: T,
    public left?: BinaryTreeNode<T>,
    public right?: BinaryTreeNode<T>
  ) {}
}
