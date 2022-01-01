import { GraphVertex } from "../../../data_structures/graph/graph-vertex";
import { PriorityQueue } from "../../../data_structures/queue/priorityQueue";
import { Graph } from "./../../../data_structures/graph/graph";

export function singleShortestPathDijkstra(
  graph: Graph<number>,
  startVertex: GraphVertex<number>
) {
  const distances: Record<string, number> = {};
  const backtracking: Record<string, GraphVertex<number>> = {};
  const visited: Record<string, true> = {};

  const queue = new PriorityQueue<GraphVertex<number>>();
  queue.add(startVertex, 0);
  distances[startVertex.getKey()] = 0;

  while (!queue.isEmpty()) {
    const currentVertex = queue.pop();

    if (!visited[currentVertex.getKey()]) {
      currentVertex.getNeighbors().forEach((neighbor) => {
        const edge = graph.getEdge(currentVertex, neighbor)!;

        const weightToReachNeighbor =
          distances[currentVertex.getKey()] + edge.weight;

        if (
          !distances[neighbor.getKey()] ||
          weightToReachNeighbor < distances[neighbor.getKey()]
        ) {
          distances[neighbor.getKey()] = weightToReachNeighbor;

          backtracking[neighbor.getKey()] = currentVertex;
          queue.add(neighbor, weightToReachNeighbor);
        }
      });
    }

    visited[currentVertex.getKey()] = true;
  }

  return {
    distances,
    backtracking,
  };
}
