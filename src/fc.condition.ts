import { graph, mxgraph, parent } from '.';

import BaseNode from './fc.base';
import { Chart, Token } from './fc.parse';

class ConditionNode extends BaseNode {
  textMargin: any;

  yesNode: BaseNode;
  noNode: BaseNode;
  yesVisited: boolean = false;
  noVisited: boolean = false;

  conds: number = 1;
  endRow: number = 0;
  constructor(token: Token, chart: Chart) {
    super(token, chart);
    let vertex = graph.insertVertex(
      parent,
      null,
      token.text,
      0,
      0,
      0,
      0,
      'shape=rhombus;spacing=10',
    );
    this.vertex = vertex;
    graph.updateCellSize(vertex, true);
  }

  yes(nextNode: BaseNode) {
    this.yesNode = nextNode;

    if (!this.yesVisited) {
      this.yesVisited = true;

      // 如果没有被放置
      if (!nextNode.placed) {
        nextNode.placed = true;

        nextNode.condNode = this;
        nextNode.loopNode = this.loopNode;

        // nextNode.condNodes = this.condNodes;
        nextNode.condNodes = [...this.condNodes, this];

        nextNode.row = this.row + 1;
        nextNode.col = this.col;

        this.updateRow(nextNode.row);
        this.updateCol(nextNode.col);

        nextNode.vertex.geometry.x =
          this.vertex.geometry.x +
          this.vertex.geometry.width / 2 -
          nextNode.vertex.geometry.width / 2;
        nextNode.vertex.geometry.y =
          this.vertex.geometry.y +
          this.vertex.geometry.height +
          this.lineLength;
      }

      if (this.loopNode) {
        nextNode.loopNode = this.loopNode;
      }
    }
  }
  no(nextNode: BaseNode) {
    if (!this.noVisited) {
      this.noVisited = true;
      this.noNode = nextNode;

      if (nextNode.row < this.row + 1) {
        nextNode.row = this.row + 1;
      }
      this.updateCols();
      if (!nextNode.placed) {
        nextNode.placed = true;

        nextNode.loopNode = this.loopNode;
        nextNode.condNode = this;
        nextNode.condNodes = [...this.condNodes, this];

        nextNode.row = this.row + 1;
        nextNode.col = this.col + 1;

        this.updateRow(nextNode.row);
        this.updateCol(nextNode.col);

        if (this.loopNode) {
          this.loopNode.width++;
        }

        nextNode.geometry.x =
          this.geometry.x + this.geometry.width + this.lineLength;
        nextNode.geometry.y =
          this.geometry.y + this.geometry.height + this.lineLength;
      }

      if (this.loopNode) {
        nextNode.loopNode = this.loopNode;
        this.loopNode.rights++;
        this.loopNode.updateRights();
      }
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
      this.noNode.setX2(
        this.geometry.x + this.geometry.width + this.lineLength,
      );
    }
  }

  down(num: number) {
    this.row += num;
    // this.yesNode.row = this.row + 1;
    this.updateRow(this.row);
    if (this.yesNode) {
      this.yesNode.down(num);
    }
    if (this.noNode) {
      this.noNode.down(num);
    }
  }

  drawLine(): void {
    if (this.yesNode) {
      graph.insertEdge(parent, null, '', this.vertex, this.yesNode.vertex);
    }

    if (this.noNode) {
      let edge = graph.insertEdge(
        parent,
        null,
        '',
        this.vertex,
        this.noNode.vertex,
      );

      edge.geometry.points = [
        new mxgraph.mxPoint(
          this.geometry.x + this.geometry.width,
          this.geometry.y + this.geometry.height / 2,
        ),
        new mxgraph.mxPoint(
          this.noNode.geometry.x + this.noNode.geometry.width / 2,
          this.geometry.y + this.geometry.height / 2,
        ),
        new mxgraph.mxPoint(
          this.noNode.geometry.x + this.noNode.geometry.width / 2,
          this.noNode.geometry.y,
        ),
      ];
    }
  }

  updateCols() {
    if (this.condNode) {
      if (this.condNode.conds < this.conds + 1) {
        this.condNode.conds = this.conds + 1;
        this.condNode.updateCols();
      }
    }
  }

  updateConds() {
    this.conds++;
    if (this.condNode) {
      this.condNode.updateConds();
    }
  }

  updateEndRow() {}
}

export default ConditionNode;
