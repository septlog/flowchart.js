import FlowChart from './flowchart.chart';
import BaseNode from './fc.base';
import { graph, mxgraph, parent } from '.';
import ConditionNode from './fc.condition';
import { Token } from './fc.parse';
import { LoopNode } from './fc.loop';

class OperationNode extends BaseNode {
  constructor(token: Token) {
    super(token);
    let vertex = graph.insertVertex(parent, null, token.text, 0, 0, 10, 10);
    this.vertex = vertex;
    graph.updateCellSize(vertex, true);
  }
  /**
   * 设置下一个节点，并在 chart 中加入该节点
   * @param next 下一个节点
   * @returns next
   */
  then(nextNode: BaseNode) {
    this.nextNode = nextNode;
    if (!this.visited) {
      nextNode.vertex.geometry.x =
        this.vertex.geometry.x +
        this.vertex.geometry.width / 2 -
        nextNode.vertex.geometry.width / 2;
      nextNode.vertex.geometry.y =
        this.vertex.geometry.y + this.vertex.geometry.height + 40;
      this.visited = true;
      if (this.loopNode) {
        this.loopNode.updateDepth();
      }

      let edge = graph.insertEdge(
        parent,
        null,
        '',
        this.vertex,
        nextNode.vertex,
      );

      if (nextNode.layer < this.layer + 1) {
        nextNode.layer = this.layer + 1;
        nextNode.loopNode = this.loopNode;
        nextNode.vertex.geometry.y =
          this.vertex.geometry.y + this.vertex.geometry.height + 40;
        edge.geometry.points = [
          new mxgraph.mxPoint(
            this.vertex.geometry.x + this.vertex.geometry.width / 2,
            this.vertex.geometry.y + this.vertex.geometry.height,
          ),
          new mxgraph.mxPoint(
            this.vertex.geometry.x + this.vertex.geometry.width / 2,
            this.vertex.geometry.y + this.vertex.geometry.height + 20,
          ),
          new mxgraph.mxPoint(
            nextNode.vertex.geometry.x + nextNode.vertex.geometry.width / 2,
            nextNode.vertex.geometry.y + nextNode.vertex.geometry.height - 20,
          ),
          new mxgraph.mxPoint(
            nextNode.vertex.geometry.x + nextNode.vertex.geometry.width / 2,
            nextNode.vertex.geometry.y + nextNode.vertex.geometry.height,
          ),
        ];
      }
    }
  }

  back(nextNode: LoopNode) {
    let edge = graph.insertEdge(parent, null, '', this.vertex, nextNode.vertex);
    edge.geometry.points = [
      new mxgraph.mxPoint(
        this.geometry.x,
        this.geometry.y + this.geometry.height / 2,
      ),
      new mxgraph.mxPoint(
        this.geometry.x - 50,
        this.geometry.y + this.geometry.height / 2,
      ),

      new mxgraph.mxPoint(
        this.geometry.x - 50,
        nextNode.geometry.y + nextNode.geometry.height / 2,
      ),
      new mxgraph.mxPoint(
        nextNode.geometry.x,
        nextNode.geometry.y + nextNode.geometry.height / 2,
      ),
    ];
  }
}

export default OperationNode;
