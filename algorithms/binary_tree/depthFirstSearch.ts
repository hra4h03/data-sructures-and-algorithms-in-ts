import { BinaryTreeTraversalCallbacks } from "./types";
import { BinaryTreeNode } from "./../../data_structures/binary_tree/binaryTreeNode";
import { Stack } from "../../data_structures/stack/stack";

export function depthFirstSearch<T>(
  binaryTreeRoot: BinaryTreeNode<T>,
  callbacks: BinaryTreeTraversalCallbacks<T>
) {
  const stack = new Stack<BinaryTreeNode<T>>();
  stack.push(binaryTreeRoot);

  while (!stack.isEmpty()) {
    const binaryTreeNode = stack.pop()!;

    callbacks.onNodeEnter && callbacks.onNodeEnter(binaryTreeNode);

    if (binaryTreeNode.left) stack.push(binaryTreeNode.left);
    if (binaryTreeNode.right) stack.push(binaryTreeNode.right);
  }
}

export function depthFirstSearchRecursive<T>(
  binaryTreeNode: BinaryTreeNode<T>,
  callbacks: BinaryTreeTraversalCallbacks<T>
) {
  callbacks.onNodeEnter && callbacks.onNodeEnter(binaryTreeNode);

  if (binaryTreeNode.left)
    depthFirstSearchRecursive(binaryTreeNode.left, callbacks);

  if (binaryTreeNode.right)
    depthFirstSearchRecursive(binaryTreeNode.right, callbacks);
}
