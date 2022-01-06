import { Chart, Token } from './fc.parse';
import BaseNode from './fc.base';
import { graph, mxgraph, parent } from './';
import ConditionNode from './fc.condition';
class LoopNode extends BaseNode {
  yesNode: BaseNode;
  noNode: BaseNode;
  width: number = 1;
  lRange: number = 0;
  rRange: number = 0;
  yesVisited: boolean = false;
  noVisited: boolean = false;
  noNodeRow: number = 1;
  endRow: number = 0;
  loops = 1;

  rights = 1;

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

        this.updateRow(nextNode.row);
        this.updateCol(nextNode.col);

        nextNode.geometry.x =
          this.geometry.x +
          this.geometry.width / 2 -
          nextNode.geometry.width / 2;
        nextNode.geometry.y = this.bottomMost + this.lineLength;
      }
    }
  }
  no(nextNode: BaseNode) {
    this.noNode = nextNode;

    if (!this.noVisited) {
      this.noVisited = true;
      nextNode.loopNode = this.loopNode;
      if (!nextNode.placed) {
        nextNode.placed = true;

        this.noNode.row = this.noNodeRow;

        this.updateRow(this.noNode.row);

        nextNode.geometry.x =
          this.geometry.x +
          this.geometry.width / 2 -
          nextNode.geometry.width / 2;
      }
    }

    this.updateRights();
  }

  updateNoNode() {}

  drawLine(): void {
    if (this.yesNode) {
      graph.insertEdge(parent, null, '', this.vertex, this.yesNode.vertex);
    }
  }

  updateLoops() {
    this.loops += 1;
    if (this.loopNode) {
      this.loopNode.updateLoops();
    }
  }
  updateRights() {
    if (this.loopNode) {
      this.loopNode.rights++;
      this.loopNode.updateRights();
    }
  }
}
export { LoopNode };
