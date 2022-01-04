import { parse } from './fc.parse';
let mxgraph = require('mxgraph')({
  mxBasePath: './src',
  mxLoadResources: false,
  mxLoadStylesheets: true,
});
export { mxgraph };

let div = document.getElementById('chart');
let graph = new mxgraph.mxGraph(div);

graph.edgeLabelsMovable = false;
graph.gridEnabled = true;
graph.setAllowDanglingEdges(false);
graph.setDisconnectOnMove(false);
// graph.cellsSelectable = true;
// graph.autoSizeCells = true;
// mxgraph.mxText.textWidthPadding = 30;
mxgraph.mxGraphHandler.guidesEnabled = true;
mxgraph.mxEdgeHandler.snapToTerminals = true;

new mxgraph.mxRubberband(graph);

let style = graph.stylesheet.getDefaultEdgeStyle();
style[mxgraph.mxConstants.STYLE_FONTCOLOR] = 'black';
style[mxgraph.mxConstants.STYLE_LABEL_BACKGROUNDCOLOR] = 'white';
style[mxgraph.mxConstants.STYLE_STROKECOLOR] = 'black';
graph.getStylesheet().getDefaultEdgeStyle()['edgeStyle'] =
  'orthogonalEdgeStyle';
style = graph.stylesheet.getDefaultVertexStyle();
style[mxgraph.mxConstants.STYLE_FONTCOLOR] = 'black';
style[mxgraph.mxConstants.STYLE_STROKECOLOR] = 'black';
style[mxgraph.mxConstants.STYLE_FILLCOLOR] = 'white';

let parent = graph.getDefaultParent();

export { graph, parent };

let str = `
st=>start: 开始
loop1=>loop: i<10
loop1end=>operation: i++
cond1=>condition: 条件1
cond2=>condition: 条件2
op1=>operation: 语句1语句1语句1语句1语句1语句1语句1语句1语句1语句1
语句1语句1语句1语句1语句1语句1语句1语句1语句1语句1
语句1语句1语句1语句1语句1语句1语句1语句1语句1语句1
语句1语句1语句1语句1语句1语句1语句1语句1语句1语句1
语句1语句1语句1语句1语句1语句1语句1语句1语句1语句1
语句1语句1语句1语句1语句1语句1语句1语句1语句1语句1
语句1语句1语句1语句1语句1语句1语句1语句1语句1语句1
语句1语句1语句1语句1语句1语句1语句1语句1语句1语句1
语句1语句1语句1语句1语句1语句1语句1语句1语句1语句1
语句1语句1语句1语句1语句1语句1语句1语句1语句1语句1
语句1语句1语句1语句1语句1语句1语句1语句1语句1语句1
语句1语句1语句1语句1语句1语句1语句1语句1语句1语句1
op2=>operation: 语句2
语句2
语句2
语句2
语句2
op3=>operation: 语句3
op4=>operation: 语句4
op5=>operation: 语句5
op6=>operation: 语句6
op7=>operation: 语句7
op8=>operation: 语句8
op9=>operation: 语句9
st->loop1
loop1(yes)->cond1
loop1(no)->op4
cond1(yes)->op1
cond1(no)->cond2
cond2(yes)->op2
cond2(no)->op3
op1->op6
op6->op7
op7->op8
op8->op9
op9->op5
op2->op5
op3->op5
op5->loop1end
loop1end->loop1
`;

let chart = parse(str);

chart.drawSVG(div);
graph.center();
