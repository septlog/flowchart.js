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
      'shape=rhombus',
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
      // this.updateConds2();
      if (!nextNode.placed) {
        nextNode.placed = true;

        nextNode.loopNode = this.loopNode;
        nextNode.condNode = this;
        nextNode.condNodes = [...this.condNodes, this];

        nextNode.row = this.row + 1;
        nextNode.col = this.col + this.conds;

        this.updateRow(nextNode.row);
        this.updateCol(nextNode.col);

        if (this.loopNode) {
          this.loopNode.width++;
        }

        nextNode.vertex.geometry.x =
          this.vertex.geometry.x + this.vertex.geometry.width + this.lineLength;
        nextNode.vertex.geometry.y =
          this.vertex.geometry.y +
          this.vertex.geometry.height +
          this.lineLength;
      }

      if (this.loopNode) {
        nextNode.loopNode = this.loopNode;
        this.loopNode.rights++;
        this.loopNode.updateRights();
      }
    }
  }

  down() {
    this.yesNode.row = this.row + 1;
  }

  setX(num: number) {
    this.geometry.x = num;
    if (this.yesNode) {
      this.yesNode.setX(
        this.geometry.x +
          this.geometry.width / 2 -
          this.yesNode.geometry.width / 2,
      );
    }
    if (this.noNode) {
      this.noNode.setX(
        this.vertex.geometry.x + this.vertex.geometry.width + this.lineLength,
      );
    }
  }

  setY(num: number) {
    this.geometry.y = num;
    if (this.yesNode) {
      this.yesNode.setY(
        this.geometry.y + this.geometry.height + this.lineLength,
      );
    }
    if (this.noNode) {
      this.noNode.setY(
        this.geometry.y + this.geometry.height + this.lineLength,
      );
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

  updateConds2() {
    if (this.condNode) {
      this.condNode.conds++;
      this.condNode.updateConds();
    }
  }

  updateEndRow() {}
}

export default ConditionNode;
