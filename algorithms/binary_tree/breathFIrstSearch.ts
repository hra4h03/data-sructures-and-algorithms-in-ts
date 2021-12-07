import { BinaryTreeNode } from "../../data_structures/binary_tree/binaryTreeNode";
import { BinaryTreeTraversalCallbacks } from "./types";

export function breathFirstSearch<T>(
  binaryTreeRoot: BinaryTreeNode<T>,
  callbacks: BinaryTreeTraversalCallbacks<T>
) {
  const queue = [binaryTreeRoot];

  while (queue.length > 0) {
    const binaryTreeNode = queue.shift()!;

    callbacks.onNodeEnter && callbacks.onNodeEnter(binaryTreeNode);

    if (binaryTreeNode.left) queue.push(binaryTreeNode.left);
    if (binaryTreeNode.right) queue.push(binaryTreeNode.right);
  }
}
