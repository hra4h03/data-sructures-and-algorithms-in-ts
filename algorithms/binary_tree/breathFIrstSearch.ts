import { BinaryTreeNode } from "../../data_structures/binary_tree/binaryTreeNode";
import { Queue } from "../../data_structures/queue/queue";
import { BinaryTreeTraversalCallbacks } from "./types";

export function breathFirstSearch<T>(
  binaryTreeRoot: BinaryTreeNode<T>,
  callbacks: BinaryTreeTraversalCallbacks<T>
) {
  const queue = new Queue<BinaryTreeNode<T>>();
  queue.enqueue(binaryTreeRoot);

  while (!queue.isEmpty()) {
    const binaryTreeNode = queue.dequeue()!;

    callbacks.onNodeEnter && callbacks.onNodeEnter(binaryTreeNode);

    if (binaryTreeNode.left) queue.enqueue(binaryTreeNode.left);
    if (binaryTreeNode.right) queue.enqueue(binaryTreeNode.right);
  }
}
