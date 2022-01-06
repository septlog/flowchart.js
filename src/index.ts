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

let str = `loop1=>loop: i<10
op1=>operation: 语句1
loop2=>loop: j<20
op2=>operation: j++
op3=>operation: i++
op4=>operation: 语句2
loop1(yes)->op1
op1->loop2
loop2(yes)->op2
op2->loop2
loop2(no)->op3
op3->loop1
loop1(no)->op4
`;

let textarea = document.querySelector('textarea');

// textarea.addEventListener('change', (e: any) => {
//   console.log('object');
// });
// textarea.value = '11 lj';

textarea.addEventListener('input', (e: any) => {
  div.replaceChildren();
  str = e.target.value;
  graph = new mxgraph.mxGraph(div);

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
  parent = graph.getDefaultParent();

  let chart = parse(str);

  chart.drawSVG();
  graph.center();
});

textarea.value = str;
// let chart = parse(str);

// chart.drawSVG();
// graph.center();
textarea.dispatchEvent(new Event('input'));

let b1 = document.getElementById('b1');
let b2 = document.getElementById('b2');
let b3 = document.getElementById('b3');

b1.addEventListener('click', () => {
  textarea.value = `st=>start: 开始
loop1=>loop: i<10
loop1end=>operation: i++
cond1=>condition: 条件1
cond2=>condition: 条件2
op1=>operation: 语句1语句1语句1语句1语句1语句1语句1语句1语句1语句1
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
  textarea.dispatchEvent(new Event('input'));
});

b2.addEventListener('click', () => {
  textarea.value = `op1=>operation: 语句1
op2=>operation: 语句2
op3=>operation: 语句3
op4=>operation: 语句4
op5=>operation: 语句5
op6=>operation: 语句6
op7=>operation: 语句7
cond1=>condition: 条件1
cond2=>condition: 条件2
cond3=>condition: 条件3
cond4=>condition: 条件4
cond1(yes)->op1
cond1(no)->op6
op1->cond2
cond2(yes)->op2
cond2(no)->cond4
cond4(yes)->op5
op2->cond3
cond3(yes)->op3
cond3(no)->op4
op3->op7
op4->op7
op5->op7
op6->op7
`;
  textarea.dispatchEvent(new Event('input'));
});

b3.addEventListener('click', () => {
  textarea.value = `loop1=>loop: i<10
op1=>operation: 语句1
loop2=>loop: j<20
op2=>operation: j++
op3=>operation: i++
op4=>operation: 语句2
loop1(yes)->op1
op1->loop2
loop2(yes)->op2
op2->loop2
loop2(no)->op3
op3->loop1
loop1(no)->op4
`;
  textarea.dispatchEvent(new Event('input'));
});
export { graph, parent };
