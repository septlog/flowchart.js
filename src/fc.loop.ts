import { Chart, Token } from './fc.parse';
import BaseNode from './fc.base';
import { graph, mxgraph, parent } from './';
import ConditionNode from './fc.condition';
class LoopNode extends BaseNode {
  yesNode: BaseNode;
  noNode: BaseNode;
  width: number = 1;
  yesVisited: boolean = false;
  noVisited: boolean = false;
  noNodeRow: number = 1;
  endRow: number = 0;
  loops = 1;

  rights = 1;

  rrrr: number = 0;

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
      'shape=rhombus;overflow=hidden;spacing=10',
    );
    this.vertex = vertex;
    graph.updateCellSize(vertex, true);
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
      nextNode.condNode = this.condNode;
      if (!nextNode.placed) {
        nextNode.placed = true;

        this.noNode.row = this.noNodeRow;
        this.noNode.col = this.col;

        this.updateRow(this.noNode.row);

        nextNode.geometry.x =
          this.geometry.x +
          this.geometry.width / 2 -
          nextNode.geometry.width / 2;

        if (this.condNode) {
          this.condNode.conds++;
        }
      } else {
        this.noNode.row = this.noNodeRow;
        this.updateRow(this.noNode.row);
        this.notOk = true;
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

  down(num: number) {
    this.row += num;
    this.updateRow(this.row);
    if (this.yesNode) {
      this.yesNode.down(num);
    }
    if (this.noNode) {
      this.noNode.down(num);
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

  setX2(num: number) {
    this.geometry.x = num;
    if (this.yesNode) {
      this.yesNode.setX2(
        this.geometry.x +
          this.geometry.width / 2 -
          this.yesNode.geometry.width / 2,
      );
    }
    if (this.noNode) {
      if (this.noNode.col === this.col) {
        this.noNode.setX2(
          this.geometry.x +
            this.geometry.width / 2 -
            this.noNode.geometry.width / 2,
        );
      }
    }
  }
}
export { LoopNode };
