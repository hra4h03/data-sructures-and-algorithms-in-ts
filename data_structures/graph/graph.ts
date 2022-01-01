import { GraphEdge } from "./graph-edge";
import { GraphVertex } from "./graph-vertex";

export type Serializable = { toString(): string };

export class Graph<T extends Serializable> {
  public edges: Record<string, GraphEdge<T>>;
  public vertices: Record<string, GraphVertex<T>>;

  constructor() {
    this.edges = {};
    this.vertices = {};
  }

  addVertex(vertex: GraphVertex<T>) {
    this.vertices[vertex.getKey()] = vertex;

    return this;
  }

  removeVertex(vertex: GraphVertex<T>) {
    delete this.vertices[vertex.getKey()];

    vertex.getNeighbors().forEach((neighbor) => {
      const edgeKey = GraphEdge.generateKey(vertex, neighbor);

      neighbor.removeAdjacentVertex(vertex);
      delete this.edges[edgeKey];
    });
  }

  addEdge(edge: GraphEdge<T>) {
    if (edge.isDirected) {
      edge.startVertex.addAdjacentVertex(edge.endVertex);
    } else {
      edge.endVertex.addAdjacentVertex(edge.startVertex);
      edge.startVertex.addAdjacentVertex(edge.endVertex);
    }

    this.addVertex(edge.startVertex);
    this.addVertex(edge.endVertex);

    this.edges[edge.getKey()] = edge;

    return this;
  }

  removeEdge(edge: GraphEdge<T>) {
    if (edge.isDirected) {
      edge.startVertex.removeAdjacentVertex(edge.endVertex);
    } else {
      edge.endVertex.removeAdjacentVertex(edge.startVertex);
      edge.startVertex.removeAdjacentVertex(edge.endVertex);
    }

    delete this.edges[edge.getKey()];
  }

  getEdge(startVertex: GraphVertex<T>, endVertex: GraphVertex<T>) {
    const edgeKey = GraphEdge.generateKey(startVertex, endVertex);
    if (this.edges[edgeKey]) return this.edges[edgeKey];

    const reversedEdgeKey = GraphEdge.generateKey(endVertex, startVertex);
    if (this.edges[reversedEdgeKey]) return this.edges[reversedEdgeKey];
  }

  getAllEdges() {
    return Object.values(this.edges);
  }

  getAllVertices() {
    return Object.values(this.vertices);
  }

  maxDegree() {
    const vertices = this.getAllVertices();

    let maxDegree = vertices[0].getNeighbors().length;
    for (let i = 0; i < vertices.length; i++) {
      const degree = vertices[i].getNeighbors().length;
      if (degree > maxDegree) maxDegree = degree;
    }

    return maxDegree;
  }

  minDegree() {
    const vertices = this.getAllVertices();

    let minDegree = vertices[0];
    for (let i = 0; i < vertices.length; i++) {
      const degree = vertices[i].getNeighbors().length;
      if (degree < minDegree.getNeighbors().length) minDegree = vertices[i];
    }

    return minDegree;
  }

  complement() {
    const graphComplement = new Graph<T>();

    this.getAllVertices().forEach((vertex) => {
      const newVertex = new GraphVertex(vertex.value);
      graphComplement.addVertex(newVertex);
    });

    const vertices = graphComplement.getAllVertices();

    for (let i = 0; i < vertices.length; i++) {
      for (let j = i + 1; j < vertices.length; j++) {
        const edgeKeyLeftRight = GraphEdge.generateKey(
          vertices[i],
          vertices[j]
        );
        const edgeKeyRightLeft = GraphEdge.generateKey(
          vertices[j],
          vertices[i]
        );

        if (!this.edges[edgeKeyRightLeft] && !this.edges[edgeKeyLeftRight]) {
          const edge = new GraphEdge(vertices[i], vertices[j]);
          graphComplement.addEdge(edge);
        }
      }
    }

    return graphComplement;
  }

  maxIndependentSet() {
    const vertices = this.getAllVertices();
    vertices.sort((a, b) => a.neighborsCount() - b.neighborsCount());

    const independentSet: Record<string, GraphVertex<T>> = {};
    const notAllowedVertices: Record<string, boolean> = {};

    for (let i = 0; i < vertices.length; i++) {
      const vertex = vertices[i];

      if (notAllowedVertices[vertex.getKey()]) continue;

      independentSet[vertex.getKey()] = vertex;
      notAllowedVertices[vertex.getKey()] = true;

      vertex.getNeighbors().forEach((neighbor) => {
        notAllowedVertices[neighbor.getKey()] = true;
      });
    }

    return independentSet;
  }

  maxClique() {
    const graphComplement = this.complement();
    return this.maxIndependentSet.call(graphComplement);
  }
}

const graph = new Graph();

const $1 = new GraphVertex(1);
const $2 = new GraphVertex(2);
const $3 = new GraphVertex(3);
const $4 = new GraphVertex(4);
const $5 = new GraphVertex(5);

const $1_$5 = new GraphEdge($1, $5);
const $2_$5 = new GraphEdge($2, $5);
const $2_$1 = new GraphEdge($2, $1);
const $3_$4 = new GraphEdge($3, $4);

const $2_$4 = new GraphEdge($2, $4);
const $1_$4 = new GraphEdge($1, $4);
const $5_$4 = new GraphEdge($5, $4);

graph
  .addEdge($1_$5)
  .addEdge($2_$5)
  .addEdge($2_$1)
  .addEdge($3_$4)
  .addEdge($2_$4)
  .addEdge($1_$4)
  .addEdge($5_$4);

console.dir(graph.maxClique());
