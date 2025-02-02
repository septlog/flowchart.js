import { parse } from './fc.parse';
//两层循环
import ll from './test/ll.txt';
import ll2 from './test/ll2.txt';
// if loop else if else if ...
import clcccc from './test/clcccc.txt';
//if loop else if loop else if ...
import clclccc from './test/clclccc.txt';
import clclclcc from './test/clclclcc.txt';
//多层if嵌套
import cccceccc from './test/cccceccc.txt';
import cccceccc2 from './test/cccceccc2.txt';
import cccecc from './test/cccecc.txt';

import lcc from './test/lcc.txt';
import llllcc from './test/llllcc.txt';
import llllcc2 from './test/llllcc2.txt';
//四层循环
import llll from './test/llll.txt';
import llll2 from './test/llll2.txt';

import s1 from './test/s1.txt';

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
mxgraph.mxGraphHandler.guidesEnabled = true;
mxgraph.mxEdgeHandler.snapToTerminals = true;

new mxgraph.mxRubberband(graph);

let style = graph.stylesheet.getDefaultEdgeStyle();
style[mxgraph.mxConstants.STYLE_FONTCOLOR] = 'black';
style[mxgraph.mxConstants.STYLE_LABEL_BACKGROUNDCOLOR] = 'white';
style[mxgraph.mxConstants.STYLE_STROKECOLOR] = 'black';
// style[mxgraph.mxConstants.STYLE_ROUNDED] = true;
graph.getStylesheet().getDefaultEdgeStyle()['edgeStyle'] =
  'orthogonalEdgeStyle';
style = graph.stylesheet.getDefaultVertexStyle();
style[mxgraph.mxConstants.STYLE_FONTCOLOR] = 'black';
style[mxgraph.mxConstants.STYLE_STROKECOLOR] = 'black';
style[mxgraph.mxConstants.STYLE_FILLCOLOR] = 'white';

let parent = graph.getDefaultParent();

class BoxShape extends mxgraph.mxCylinder {
  redrawPath(path, x, y, w, h, isForeground) {
    let x1 = 0 - 1;
    let x2 = h / 2;
    let x3 = w - h / 2;
    let x4 = w + 1;

    let y1 = 0;
    let y2 = h / 2;
    let y3 = h;

    path.moveTo(x1, y2);
    path.lineTo(x2, y1);
    path.lineTo(x3, y1);
    path.lineTo(x4, y2);
    path.lineTo(x3, y3);
    path.lineTo(x2, y3);
    path.lineTo(x1, y2);
    path.close();
  }
}

mxgraph.mxCellRenderer.registerShape('box', BoxShape);

let str = clclccc;

let textarea = document.querySelector('textarea');

textarea.addEventListener('input', (e: any) => {
  div.replaceChildren();
  str = e.target.value;
  graph = new mxgraph.mxGraph(div);

  graph.edgeLabelsMovable = false;
  graph.gridEnabled = true;
  graph.setAllowDanglingEdges(false);
  graph.setDisconnectOnMove(false);

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

  let { x, y, width, height } = graph.view.graphBounds;

  graph.view.setTranslate(0.5 - x, 0.5 - y);
});

textarea.value = str;

textarea.dispatchEvent(new Event('input'));

let b1 = document.getElementById('b1');
let b2 = document.getElementById('b2');
let b3 = document.getElementById('b3');
let b4 = document.getElementById('b4');
let b5 = document.getElementById('b5');
let b6 = document.getElementById('b6');
let b7 = document.getElementById('b7');
let b8 = document.getElementById('b8');
let b9 = document.getElementById('b9');
let b10 = document.getElementById('b10');
let b11 = document.getElementById('b11');
let b12 = document.getElementById('b12');
let b13 = document.getElementById('b13');
let b14 = document.getElementById('b14');

b3.addEventListener('click', () => {
  textarea.value = ll;
  textarea.dispatchEvent(new Event('input'));
});
b10.addEventListener('click', () => {
  textarea.value = ll2;
  textarea.dispatchEvent(new Event('input'));
});

b4.addEventListener('click', () => {
  textarea.value = llll;
  textarea.dispatchEvent(new Event('input'));
});

b11.addEventListener('click', () => {
  textarea.value = lcc;
  textarea.dispatchEvent(new Event('input'));
});

b5.addEventListener('click', () => {
  textarea.value = llllcc;
  textarea.dispatchEvent(new Event('input'));
});

b12.addEventListener('click', () => {
  textarea.value = llllcc2;
  textarea.dispatchEvent(new Event('input'));
});

b1.addEventListener('click', () => {
  textarea.value = cccecc;
  textarea.dispatchEvent(new Event('input'));
});
b2.addEventListener('click', () => {
  textarea.value = cccceccc2;
  textarea.dispatchEvent(new Event('input'));
});
b6.addEventListener('click', () => {
  textarea.value = cccceccc;
  textarea.dispatchEvent(new Event('input'));
});

b7.addEventListener('click', () => {
  textarea.value = clcccc;
  textarea.dispatchEvent(new Event('input'));
});

b8.addEventListener('click', () => {
  textarea.value = clclccc;
  textarea.dispatchEvent(new Event('input'));
});
b13.addEventListener('click', () => {
  textarea.value = clclclcc;
  textarea.dispatchEvent(new Event('input'));
});
b9.addEventListener('click', () => {
  textarea.value = llll2;
  textarea.dispatchEvent(new Event('input'));
});

b14.addEventListener('click', () => {
  textarea.value = s1;
  textarea.dispatchEvent(new Event('input'));
});
export { graph, parent };
