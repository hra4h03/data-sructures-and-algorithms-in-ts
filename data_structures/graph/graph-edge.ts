import { Serializable } from "./graph";
import { GraphVertex } from "./graph-vertex";

export class GraphEdge<T extends Serializable> {
  static generateKey<T extends Serializable>(
    startVertex: GraphVertex<T>,
    endVertex: GraphVertex<T>
  ) {
    return `${startVertex.getKey()}-${endVertex.getKey()}`;
  }

  private key: string;
  constructor(
    public startVertex: GraphVertex<T>,
    public endVertex: GraphVertex<T>,
    public weight = 1,
    public isDirected = false
  ) {
    this.key = GraphEdge.generateKey(this.startVertex, this.endVertex);
  }

  getKey() {
    return this.key;
  }
}
