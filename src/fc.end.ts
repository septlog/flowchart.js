import { graph, mxgraph, parent } from '.';
import BaseNode from './fc.base';
import { Chart, Token } from './fc.parse';
import OperationNode from './fs.operation';

class EndNode extends OperationNode {
  constructor(token: Token, chart: Chart) {
    super(
      token,
      chart,
      null,
      'rounded=1;arcSize=50;spacingLeft=5;spacingRight=5',
    );
  }
}
export default EndNode;
