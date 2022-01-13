import BaseNode from './fc.base';
import { graph, mxgraph, parent } from '.';
import ConditionNode from './fc.condition';
import { Chart, Token } from './fc.parse';
import { LoopNode } from './fc.loop';

class OperationNode extends BaseNode {
  isBack: boolean;
  nextNode: BaseNode;
  backNode: LoopNode;
  constructor(token: Token, chart: Chart) {
    super(token, chart);
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
    if (!this.visited) {
      this.visited = true;

      this.nextNode = nextNode;

      if (!nextNode.placed) {
        nextNode.placed = true;

        nextNode.loopNode = this.loopNode;

        nextNode.condNode = this.condNode;
        nextNode.condNodes = this.condNodes;

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
      } else {
        this.notOk = true;
      }
    }
  }

  back(nextNode: LoopNode) {
    this.isBack = true;
    this.backNode = nextNode;
    if (!this.visited) {
      this.visited = true;

      this.backNode.noNodeRow = this.row + 1;
      this.backNode.endRow = this.row;
    }
  }

  down(num: number): void {
    this.row += num;
    this.updateRow(this.row);
    if (this.nextNode) {
      this.nextNode.down(num);
    }

    if (this.backNode) {
      if (this.backNode.noNode) {
        this.backNode.noNode.down(num);
        this.backNode.noNodeRow += num;
        this.backNode.endRow = this.row;
        this.updateRow(this.backNode.noNodeRow);
      }
    }
  }

  drawLine() {
    if (this.nextNode) {
      if (this.nextNode.col === this.col) {
        let edge = graph.insertEdge(
          parent,
          null,
          '',
          this.vertex,
          this.nextNode.vertex,
        );
      } else {
        let edge = graph.insertEdge(
          parent,
          null,
          '',
          this.vertex,
          this.nextNode.vertex,
        );

        edge.geometry.points = [
          new mxgraph.mxPoint(
            this.geometry.x + this.geometry.width / 2,
            this.geometry.y + this.geometry.height,
          ),
          new mxgraph.mxPoint(
            this.geometry.x + this.geometry.width / 2,
            this.nextNode.geometry.y - 20,
          ),
          new mxgraph.mxPoint(
            this.nextNode.geometry.x + this.nextNode.geometry.width / 2,
            this.nextNode.geometry.y - 20,
          ),
          new mxgraph.mxPoint(
            this.nextNode.geometry.x + this.nextNode.geometry.width / 2,
            this.nextNode.geometry.y,
          ),
        ];
      }
    }
  }

  setX2(num: number) {
    this.geometry.x = num;
    if (this.nextNode && this.nextNode.col === this.col) {
      this.nextNode.setX2(
        this.geometry.x +
          this.geometry.width / 2 -
          this.nextNode.geometry.width / 2,
      );
    }
  }
}

export default OperationNode;
