import { graph, mxgraph, parent } from '.';
import { Chart, Token } from './fc.parse';
import BaseNode from './fc.base';
import OperationNode from './fs.operation';
class StartNode extends OperationNode {}

export default StartNode;
