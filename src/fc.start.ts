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
      nextNode.row++;
      if (!nextNode.placed) {
        nextNode.placed = true;
        nextNode.vertex.geometry.x =
          this.vertex.geometry.x +
          this.vertex.geometry.width / 2 -
          nextNode.vertex.geometry.width / 2;
        nextNode.vertex.geometry.y =
          this.vertex.geometry.y + this.vertex.geometry.height + 40;
        // this.edge = graph.insertEdge(
        //   parent,
        //   null,
        //   '',
        //   this.vertex,
        //   nextNode.vertex,
        // );
        this.chart.updateYLayer(nextNode.row, nextNode.geometry.height);
      }
    }
  }
}

export default StartNode;
