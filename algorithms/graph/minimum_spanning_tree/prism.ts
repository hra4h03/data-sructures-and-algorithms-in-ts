import { GraphEdge } from "./../../../data_structures/graph/graph-edge";
import { Graph } from "./../../../data_structures/graph/graph";

export function minimumSpanningTreePrism(graph: Graph<number>) {
  const edges = graph.getAllEdges();
  edges.sort((edge1, edge2) => edge1.weight - edge2.weight);

  const visitedVertices: Record<string, true> = {};
  const minimumSpanningTree: Record<string, GraphEdge<number>> = {};

  while (edges.length > 0) {
    const smallestEdge = edges.pop()!;

    if (
      !visitedVertices[smallestEdge.endVertex.getKey()] ||
      !visitedVertices[smallestEdge.startVertex.getKey()]
    ) {
      minimumSpanningTree[smallestEdge.getKey()] = smallestEdge;
      visitedVertices[smallestEdge.endVertex.getKey()] = true;
      visitedVertices[smallestEdge.startVertex.getKey()] = true;
    }
  }

  return minimumSpanningTree;
}
