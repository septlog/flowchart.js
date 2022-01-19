import { graph, mxgraph, parent } from '.';
import { Chart, Token } from './fc.parse';
import BaseNode from './fc.base';
import OperationNode from './fs.operation';
class StartNode extends OperationNode {
  constructor(token: Token, chart: Chart) {
    super(token, chart, 'box', 'spacingLeft=5;spacingRight=5');
  }
}

export default StartNode;
