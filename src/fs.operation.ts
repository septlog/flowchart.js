import BaseNode from './fc.base';
import { graph, mxgraph, parent } from '.';
import ConditionNode from './fc.condition';
import { Chart, Token } from './fc.parse';
import { LoopNode } from './fc.loop';

class OperationNode extends BaseNode {
  isBack: boolean;
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
      nextNode.loopNode = this.loopNode;
      nextNode.condNode = this.condNode;
      this.nextNode = nextNode;

      if (!nextNode.placed) {
        nextNode.placed = true;
        nextNode.vertex.geometry.x =
          this.vertex.geometry.x +
          this.vertex.geometry.width / 2 -
          nextNode.vertex.geometry.width / 2;
        nextNode.vertex.geometry.y =
          this.vertex.geometry.y + this.vertex.geometry.height + 40;
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
        nextNode.layer = this.layer + 1;
        this.chart.updateYLayer(nextNode.layer, nextNode.geometry.height);
      } else {
        if (nextNode.layer < this.layer + 1) {
          if (nextNode instanceof OperationNode) {
            nextNode.down(1);
          }
          this.edge = graph.insertEdge(
            parent,
            null,
            '',
            this.vertex,
            nextNode.vertex,
          );
          this.edge.geometry.points = [
            new mxgraph.mxPoint(
              this.geometry.x + this.geometry.width / 2,
              this.geometry.y + this.geometry.height,
            ),
            new mxgraph.mxPoint(
              this.geometry.x + this.geometry.width / 2,
              nextNode.geometry.y - 20,
            ),

            new mxgraph.mxPoint(
              nextNode.geometry.x + nextNode.geometry.width / 2,
              nextNode.geometry.y - 20,
            ),
            new mxgraph.mxPoint(
              nextNode.geometry.x + nextNode.geometry.width / 2,
              nextNode.geometry.y,
            ),
          ];
        } else {
          this.edge = graph.insertEdge(
            parent,
            null,
            '',
            this.vertex,
            nextNode.vertex,
          );
          this.edge.geometry.points = [
            new mxgraph.mxPoint(
              this.geometry.x + this.geometry.width / 2,
              this.geometry.y + this.geometry.height,
            ),
            new mxgraph.mxPoint(
              this.geometry.x + this.geometry.width / 2,
              nextNode.geometry.y - 20,
            ),

            new mxgraph.mxPoint(
              nextNode.geometry.x + nextNode.geometry.width / 2,
              nextNode.geometry.y - 20,
            ),
            new mxgraph.mxPoint(
              nextNode.geometry.x + nextNode.geometry.width / 2,
              nextNode.geometry.y,
            ),
          ];
        }
      }
    }
  }

  back(nextNode: LoopNode) {
    this.isBack = true;
    this.backNode = nextNode;
    if (!this.visited) {
      this.visited = true;
      let edge = graph.insertEdge(
        parent,
        null,
        '',
        this.vertex,
        nextNode.vertex,
      );

      this.edge = edge;
      this.updateBackEdge();
    }
  }

  /**
   * 当前节点以及其下面的节点都往下走一层
   * @param num 层数
   */
  down(num: number) {
    this.layer += num;
    this.geometry.y += 60;
    this.chart.updateYLayer(this.layer, this.geometry.height);

    if (this.isBack) {
      this.updateBackEdge();
    }
    if (this.nextNode instanceof OperationNode) {
      this.nextNode.down(num);
    }
  }

  updateBackEdge() {
    // if (this.loopNode.noNode) {
    //   this.loopNode.noNode.layer = this.layer + 1;
    // }
    this.backNode.noNodeLayer = this.layer + 1;
    console.log(this.backNode.noNodeLayer);
    this.edge.geometry.points = [
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
        this.edge.target.geometry.y + 20,
      ),
      new mxgraph.mxPoint(
        this.edge.target.geometry.x + this.edge.target.geometry.width / 2,
        this.edge.target.geometry.y - 20,
      ),
      new mxgraph.mxPoint(
        this.edge.target.geometry.x + this.edge.target.geometry.width / 2,
        this.edge.target.geometry.y,
      ),
    ];
  }
}

export default OperationNode;
