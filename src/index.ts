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
loop2=>loop: j<20j<20j<20j<20j<20j<20j<20
loop3=>loop: k<30k<30k<30k<30k<30k<30k<30
loop4=>loop: h<5h<5h<5h<5h<5h<5h<5h<5h<5h<5h<5h<5h<5h<5h<5h<5h<5h<5h<5h<5h<5
op1=>operation: 语句1
op2=>operation: 语句2
op3=>operation: 语句3
op4=>operation: 语句4
op9=>operation: ??
op5=>operation: k++
op6=>operation: j++
op7=>operation: i++
op8=>operation: h++
op10=>operation: 语句5
op11=>operation: 语句6
op12=>operation: 语句7
cond1=>condition: 条件A
cond2=>condition: 条件B
loop4(yes)->loop1
loop4(no)->op9
loop1(yes)->op1
loop1(no)->op4
loop2(yes)->op2
loop2(no)->op7
loop3(yes)->op3
loop3(no)->op6
op1->loop2
op2->loop3
op3->cond1
cond1(yes)->op10

cond1(no)->cond2

cond2(yes)->op11

cond2(no)->op12
op12->op5



op10->op5

op11->op5
op5->loop3
op6->loop2
op7->loop1
op4->op8
op8->loop4

`;

let textarea = document.querySelector('textarea');

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

  graph.getModel().beginUpdate();
  chart.drawSVG();
  graph.getModel().endUpdate();

  let cw = graph.container.clientWidth;
  let ch = graph.container.clientHeight;
  let { x, y, width, height } = graph.view.graphBounds;

  let dx = cw - width;
  let dy = ch - height;

  // if (x < 0) {
  //   x--;
  // }
  // if (y < 0) {
  //   y--;
  // }
  // graph.view.setTranslate(Math.ceil(-x), Math.ceil(-y));
  graph.view.setTranslate(Math.floor(dx / 2 - x), Math.floor(dy / 2 - y));
});

textarea.value = str;
// let chart = parse(str);

// chart.drawSVG();
// graph.center();
textarea.dispatchEvent(new Event('input'));

let b1 = document.getElementById('b1');
let b2 = document.getElementById('b2');
let b3 = document.getElementById('b3');
let b4 = document.getElementById('b4');
let b5 = document.getElementById('b5');
let b6 = document.getElementById('b6');
let b7 = document.getElementById('b7');

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

b4.addEventListener('click', () => {
  textarea.value = `cond1=>condition: 条件1
cond2=>condition: 条件2
cond3=>condition: 条件3条件3条件3条件3条件3条件3条件3条件3条件3条件3条件3条件3条件3
cond4=>condition: 条件4
cond5=>condition: 条件5
cond6=>condition: 条件6
条件6
条件6
条件6
条件6
条件6
条件6
条件6
cond7=>condition: 条件7
cond8=>condition: 条件8
cond9=>condition: 条件9

op1=>operation: 语句1
op2=>operation: 语句2
语句2
语句2
语句2
语句2
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
op10=>operation: 语句10
op11=>operation: 语句11
op12=>operation: 语句12
op13=>operation: 语句13


cond1(yes)->op1
cond1(no)->op11
cond2(yes)->op2
cond2(no)->cond9
cond3(yes)->op3
cond3(no)->cond4
cond4(yes)->cond5
cond4(no)->op9
cond5(yes)->op4
cond5(no)->cond8
cond6(yes)->op5
cond6(no)->cond7
cond7(yes)->op6
cond7(no)->op7
cond8(yes)->op8
cond9(yes)->op10

op1->cond2
op2->cond3
op3->op13
op4->cond6
op5->op12
op6->op12
op7->op12
op8->op12
op9->op13
op10->op13
op11->op13
op12->op13
`;
  textarea.dispatchEvent(new Event('input'));
});

b5.addEventListener('click', () => {
  textarea.value = `loop1=>loop: i<10
loop2=>loop: j<20j<20j<20j<20j<20j<20j<20
loop3=>loop: k<30k<30k<30k<30k<30k<30k<30
loop4=>loop: h<5h<5h<5h<5h<5h<5h<5h<5h<5h<5h<5h<5h<5h<5h<5h<5h<5h<5h<5h<5h<5
op1=>operation: 语句1
op2=>operation: 语句2
op3=>operation: 语句3
op4=>operation: 语句4
op9=>operation: ??
op5=>operation: k++
op6=>operation: j++
op7=>operation: i++
op8=>operation: h++
op10=>operation: 语句5
op11=>operation: 语句6
op12=>operation: 语句7
cond1=>condition: 条件A
cond2=>condition: 条件B
loop4(yes)->loop1
loop4(no)->op9
loop1(yes)->op1
loop1(no)->op4
loop2(yes)->op2
loop2(no)->op7
loop3(yes)->op3
loop3(no)->op6
op1->loop2
op2->loop3
op3->cond1
cond1(yes)->op10

cond1(no)->cond2

cond2(yes)->op11

cond2(no)->op12
op12->op5



op10->op5

op11->op5
op5->loop3
op6->loop2
op7->loop1
op4->op8
op8->loop4
`;
  textarea.dispatchEvent(new Event('input'));
});

b6.addEventListener('click', () => {
  textarea.value = `cond1=>condition: 条件1
cond2=>condition: 条件2
cond3=>condition: 条件3条件3条件3条件3条件3条件3条件3条件3条件3条件3条件3条件3条件3
cond4=>condition: 条件4
cond5=>condition: 条件5
cond6=>condition: 条件6
条件6
条件6
条件6
条件6
条件6
条件6
条件6
cond7=>condition: 条件7
cond8=>condition: 条件8
cond9=>condition: 条件9

op1=>operation: 语句1
op2=>operation: 语句2
语句2
语句2
语句2
语句2
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
op10=>operation: 语句10
op11=>operation: 语句11
op12=>operation: 语句12
op13=>operation: 语句13


cond1(yes)->op1
cond1(no)->op11
cond2(yes)->op2
cond2(no)->cond9
cond3(yes)->op3
cond3(no)->cond4
cond4(yes)->cond5
cond4(no)->op9
cond5(yes)->op4
cond5(no)->cond8
cond6(yes)->op5
cond6(no)->cond7
cond7(yes)->op6
cond7(no)->op7
cond8(yes)->op8
cond9(yes)->op10

op1->cond2
op2->cond3
op3->op13
op4->cond6
op5->op12
op6->op12
op7->op12
op8->op12
op9->op13
op10->op13
op11->op13
op12->op13
`;
  textarea.dispatchEvent(new Event('input'));
});

b7.addEventListener('click', () => {
  textarea.value = `cond1=>condition: 1
cond2=>condition: 2
cond3=>condition: 3
cond4=>condition: 4
cond5=>condition: 5
loop1=>loop: i<10
loop2=>loop: j<10
op1=>operation: a()
op2=>operation: a()
op3=>operation: a()
op4=>operation: a()
op5=>operation: a()
op6=>operation: a()
op7=>operation: j++
op8=>operation: i++
op9=>operation: end

cond1(yes)->loop1
cond1(no)->cond2
cond2(yes)->op2
cond2(no)->cond3
cond3(yes)->op3
cond3(no)->cond4
cond4(yes)->op4
cond4(no)->cond5
cond5(yes)->op5
cond5(no)->op6
loop1(yes)->loop2
loop1(no)->op9
loop2(yes)->op1
loop2(no)->op8
op1->op7
op2->op9
op3->op9
op4->op9
op5->op9
op6->op9
op7->loop2
op8->loop1
`;
  textarea.dispatchEvent(new Event('input'));
});

export { graph, parent };
