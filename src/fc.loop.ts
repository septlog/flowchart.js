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
  noNodeLayer: number = 1;

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
    console.log(vertex);
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
        nextNode.geometry.y = this.geometry.y + this.geometry.height + 40;
        // let edge = graph.insertEdge(
        //   parent,
        //   null,
        //   '是',
        //   this.vertex,
        //   nextNode.vertex,
        // );
        this.chart.updateYLayer(nextNode.row, nextNode.geometry.height);
      }
      if (this.loopNode) {
        this.loopNode.updateDepth();
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

        this.noNode.row = this.noNodeLayer;

        nextNode.geometry.x = this.geometry.x + this.geometry.width + 50;
        nextNode.geometry.y =
          this.geometry.y +
          this.geometry.height / 2 -
          nextNode.geometry.height / 2;

        nextNode.geometry.y =
          this.geometry.y + this.geometry.height + this.depth * 60;

        nextNode.geometry.x =
          this.geometry.x +
          this.geometry.width / 2 -
          nextNode.geometry.width / 2;
        // let edge = graph.insertEdge(
        //   parent,
        //   null,
        //   '否',
        //   this.vertex,
        //   nextNode.vertex,
        // );
        // edge.geometry.points = [
        //   new mxgraph.mxPoint(
        //     this.geometry.x + this.geometry.width,
        //     this.geometry.y + this.geometry.height / 2,
        //   ),
        //   new mxgraph.mxPoint(
        //     this.geometry.x + this.geometry.width + this.width * 80,
        //     this.geometry.y + this.geometry.height / 2,
        //   ),
        //   new mxgraph.mxPoint(
        //     this.geometry.x + this.geometry.width + this.width * 80,
        //     nextNode.geometry.y - 20,
        //   ),
        //   new mxgraph.mxPoint(
        //     nextNode.geometry.x + nextNode.geometry.width / 2,
        //     nextNode.geometry.y - 20,
        //   ),
        //   new mxgraph.mxPoint(
        //     nextNode.geometry.x + nextNode.geometry.width / 2,
        //     nextNode.geometry.y,
        //   ),
        // ];
        this.chart.updateYLayer(nextNode.row, nextNode.geometry.height);
      }
    }
  }

  updateDepth() {
    this.depth++;
    if (this.loopNode) {
      this.loopNode.updateDepth();
    }
  }

  updateWidth() {
    this.width++;
    if (this.loopNode) {
      this.loopNode.updateWidth();
    }
  }
}
export { LoopNode };
