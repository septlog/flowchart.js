import { Chart, Token } from './fc.parse';
import BaseNode from './fc.base';
import { graph, mxgraph, parent } from './';
import ConditionNode from './fc.condition';
class LoopNode extends BaseNode {
  yesNode: BaseNode;
  noNode: BaseNode;
  depth: number = 2;
  width: number = 1;
  yesVisited: boolean = false;
  noVisited: boolean = false;
  noNodeRow: number = 1;

  constructor(token: Token, chart: Chart) {
    super(token, chart);
    let vertex = graph.insertVertex(
      parent,
      null,
      token.text,
      0,
      0,
      10,
      10,
      'shape=rhombus',
    );
    this.vertex = vertex;
    graph.updateCellSize(vertex, true);
    let geo = graph.getModel().getGeometry(this.vertex);
    geo.x = 0;
    geo.y = 0;
    graph.getModel().setGeometry(this.vertex, geo);
  }

  yes(nextNode: BaseNode) {
    this.yesNode = nextNode;
    // nextNode.prev = this;

    if (nextNode.row < this.row + 1) {
      nextNode.row = this.row + 1;
    }

    if (!this.yesVisited) {
      this.yesVisited = true;
      nextNode.loopNode = this;

      if (!nextNode.placed) {
        nextNode.placed = true;

        nextNode.row = this.row + 1;
        nextNode.col = this.col;

        nextNode.geometry.x =
          this.geometry.x +
          this.geometry.width / 2 -
          nextNode.geometry.width / 2;
        nextNode.geometry.y =
          this.geometry.y + this.geometry.height + this.lineLength;
        // let edge = graph.insertEdge(
        //   parent,
        //   null,
        //   '是',
        //   this.vertex,
        //   nextNode.vertex,
        // );
      }
    }
  }
  no(nextNode: BaseNode) {
    this.noNode = nextNode;

    if (!this.noVisited) {
      this.noVisited = true;
      nextNode.loopNode = this;
      if (!nextNode.placed) {
        nextNode.placed = true;

        this.noNode.row = this.noNodeRow;

        // nextNode.geometry.y =
        //   this.geometry.y +
        //   this.geometry.height / 2 -
        //   nextNode.geometry.height / 2;

        // nextNode.geometry.y =
        //   this.geometry.y + this.geometry.height + this.depth * 60;

        nextNode.geometry.x =
          this.geometry.x +
          this.geometry.width / 2 -
          nextNode.geometry.width / 2;
      }
    }
  }

  updateNoNode() {}

  drawLine(): void {
    if (this.yesNode) {
      graph.insertEdge(parent, null, '', this.vertex, this.yesNode.vertex);
    }
  }
}
export { LoopNode };
