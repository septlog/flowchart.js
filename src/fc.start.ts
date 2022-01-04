import { graph, mxgraph, parent } from '.';
import { Chart, Token } from './fc.parse';
import BaseNode from './fc.base';
class StartNode extends BaseNode {
  constructor(token: Token, chart: Chart) {
    super(token, chart);
    let vertex = graph.insertVertex(parent, null, '开始', 0, 0, 10, 10);
    this.vertex = vertex;
    graph.updateCellSize(vertex, true);
    let geo = graph.getModel().getGeometry(this.vertex);
    geo.x = 0;
    geo.y = 0;
    graph.getModel().setGeometry(this.vertex, geo);
  }
  /**
   * 设置下一个节点，并在 chart 中加入该节点
   * @param next 下一个节点
   * @returns next
   */
  then(nextNode: BaseNode) {
    this.nextNode = nextNode;

    if (!this.visited) {
      this.visited = true;

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
}

export default StartNode;
