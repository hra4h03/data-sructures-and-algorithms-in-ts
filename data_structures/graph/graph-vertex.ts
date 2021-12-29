import { Serializable } from "./graph";

export class GraphVertex<T extends Serializable> {
  private adjacentVertices: Record<string, GraphVertex<T>>;

  constructor(public value: T) {
    this.adjacentVertices = {};
  }

  isAdjacentTo(vertex: GraphVertex<T>) {
    return vertex.getKey() in this.adjacentVertices;
  }

  addAdjacentVertex(vertex: GraphVertex<T>) {
    this.adjacentVertices[vertex.getKey()] = vertex;
  }

  removeAdjacentVertex(vertex: GraphVertex<T>) {
    delete this.adjacentVertices[vertex.getKey()];
  }

  getNeighbors() {
    return Object.values(this.adjacentVertices);
  }

  neighborsCount() {
    return this.getNeighbors().length;
  }

  getKey() {
    return this.value.toString();
  }
}
