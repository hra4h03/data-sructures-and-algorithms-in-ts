import { PriorityQueue } from "./../../../data_structures/queue/priorityQueue";
import { GraphEdge } from "./../../../data_structures/graph/graph-edge";
import { Graph } from "./../../../data_structures/graph/graph";

export function minimumSpanningTreeKruskal(graph: Graph<number>) {
  const edges = graph.getAllEdges();

  const smallestEdge = edges.reduce((currentSmallest, edge) => {
    return edge.weight < currentSmallest.weight ? edge : currentSmallest;
  });

  const visitedVertices: Record<string, true> = {};
  const minimumSpanningTree: Record<string, GraphEdge<number>> = {};

  const queue = new PriorityQueue<GraphEdge<number>>();
  queue.add(smallestEdge);

  while (!queue.isEmpty()) {
    const currentEdge = queue.pop();

    if (
      !visitedVertices[currentEdge.endVertex.getKey()] ||
      !visitedVertices[currentEdge.startVertex.getKey()]
    ) {
      minimumSpanningTree[currentEdge.getKey()] = currentEdge;
      visitedVertices[currentEdge.endVertex.getKey()] = true;
      visitedVertices[currentEdge.startVertex.getKey()] = true;
    }
  }

  return minimumSpanningTree;
}
