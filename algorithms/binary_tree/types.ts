import { BinaryTreeNode } from "../../data_structures/binary_tree/binaryTreeNode";

export interface BinaryTreeTraversalCallbacks<T> {
  onNodeEnter: (treeNode: BinaryTreeNode<T>) => void;
}
