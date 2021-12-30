import Raphael, { RaphaelPaper } from 'raphael';
import { defaultOptions } from './flowchart.defaults';
import BaseNode from './fc.base';

class FlowChart {
  paper: RaphaelPaper<'SVG' | 'VML'>;
  options: any;
  nodes: BaseNode[];
  lines: any[];
  start: BaseNode;
  maxXFromLine: any;
  minXFromSymbols: any;
  constructor(container, options = {}) {
    this.nodes = [];
    this.lines = [];
    this.start = null;
  }
  handle(node: BaseNode) {
    if (this.nodes.indexOf(node) <= -1) {
      this.nodes.push(node);
    }

    return node;
  }
  startWith(node: BaseNode) {
    this.start = node;
    return this.handle(node);
  }
  render() {}
  clean() {
    if (this.paper) {
      let paperDom = this.paper.canvas;
      paperDom.parentNode && paperDom.parentNode.removeChild(paperDom);
    }
  }
}

export default FlowChart;
