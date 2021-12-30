import { graph, mxgraph, parent } from '.';
import FlowChart from './flowchart.chart';
import BaseNode from './fc.base';
import { Token } from './fc.parse';

class EndNode extends BaseNode {
  constructor(token: Token) {
    super(token);
    let vertex = graph.insertVertex(
      parent,
      null,
      '结束',
      0,
      0,
      10,
      10,
      'fillColor=white;strokeColor=black',
    );
    this.vertex = vertex;
    console.log(vertex);
    graph.updateCellSize(vertex, true);

    let bottomMostCell = graph.intersects(
      graph.view.getState(this.vertex),
      this.vertex.x,
      this.vertex.y,
    );
    console.log(bottomMostCell);
  }
}
export default EndNode;
