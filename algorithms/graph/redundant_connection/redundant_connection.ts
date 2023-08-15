import { UnionFind } from "../../../data_structures/union_find/unionFind";

export function getRedundantConnection(connections: Array<[number, number]>) {
  const unionFind = new UnionFind(connections.length);
  const redundantConnections: Array<[number, number]> = [];

  connections.forEach(([firstNode, secondNode]) => {
    const unioned = unionFind.union(firstNode, secondNode);
    if (!unioned) redundantConnections.push([firstNode, secondNode]);
  });

  return redundantConnections;
}
