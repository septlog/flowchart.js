import { graph, mxgraph, parent } from '.';
import BaseNode from './fc.base';
import { Chart, Token } from './fc.parse';
import OperationNode from './fs.operation';

class EndNode extends OperationNode {}
export default EndNode;
