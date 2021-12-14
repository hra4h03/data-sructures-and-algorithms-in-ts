import { BinaryTreeNode } from "./../../data_structures/binary_tree/binaryTreeNode";
import { PriorityQueue } from "../../data_structures/queue/priorityQueue";
import { Stack } from "../../data_structures/stack/stack";

function counter(data: string) {
  const counts: Record<string, number> = {};

  for (let i = 0; i < data.length; i++) {
    const element = data[i];
    counts[element] = element in counts ? counts[element] + 1 : 1;
  }

  return counts;
}

function constructCompressedTable(root: BinaryTreeNode<string>) {
  const compressedTable: Record<string, string> = {};

  type StackNode = {
    treeNode: BinaryTreeNode<string>;
    encoding: string;
  };

  const stack = new Stack<StackNode>();
  stack.push({
    treeNode: root,
    encoding: "",
  });

  while (!stack.isEmpty()) {
    const { treeNode, encoding } = stack.pop();

    if (treeNode.left) {
      const leftStackNode = {
        treeNode: treeNode.left,
        encoding: encoding + "0",
      };

      stack.push(leftStackNode);
    } else {
      compressedTable[treeNode.value] = encoding;
    }

    if (treeNode.right) {
      const rightStackNode = {
        treeNode: treeNode.right,
        encoding: encoding + "1",
      };

      stack.push(rightStackNode);
    } else {
      compressedTable[treeNode.value] = encoding;
    }
  }

  return compressedTable;
}

type HuffmanEncoding = (data: string) => {
  encoded: string;
  node: BinaryTreeNode<string>;
};

export const huffmanEncoding: HuffmanEncoding = (data) => {
  const charCounts = counter(data);
  const charPriority = new PriorityQueue<BinaryTreeNode<string>>();

  for (const [char, count] of Object.entries(charCounts)) {
    const charNode = new BinaryTreeNode(char);
    charPriority.add(charNode, count);
  }

  while (charPriority.size() > 1) {
    const firstLessFrequentNode = charPriority.pop();
    const secondLessFrequentNode = charPriority.pop();

    const combinedPriority =
      charPriority.getPriority(firstLessFrequentNode) +
      charPriority.getPriority(secondLessFrequentNode);

    const combinedCharNode = new BinaryTreeNode("");
    combinedCharNode.left = firstLessFrequentNode;
    combinedCharNode.right = secondLessFrequentNode;

    charPriority.add(combinedCharNode, combinedPriority);
  }

  const root = charPriority.pop();
  const encodedCharTable = constructCompressedTable(root);

  let encoded = "";
  console.log(charCounts, encodedCharTable);
  for (const char in charCounts) {
    encoded += encodedCharTable[char];
  }

  return { encoded, node: root };
};

export function huffmanDecoding(
  encoded: string,
  encodingTreeRoot: BinaryTreeNode<string>
) {
  let decoded = "";

  function getChar(currentEncodingTreeNode: BinaryTreeNode<string>, index = 0) {
    if (index > encoded.length) return;

    if (!currentEncodingTreeNode.left || !currentEncodingTreeNode.right) {
      decoded += currentEncodingTreeNode.value;
      getChar(encodingTreeRoot, index);
      return;
    }

    if (encoded[index] === "0") {
      getChar(currentEncodingTreeNode.left, index + 1);
      return;
    }

    if (encoded[index] === "1") {
      getChar(currentEncodingTreeNode.right, index + 1);
      return;
    }
  }

  getChar(encodingTreeRoot);

  return decoded;
}

const { encoded, node: encodingTree } = huffmanEncoding("lorem");
const decoded = huffmanDecoding(encoded, encodingTree);

console.log(encoded, decoded);
