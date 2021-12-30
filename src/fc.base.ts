import { RaphaelElement, RaphaelSet } from 'raphael';
import FlowChart from './flowchart.chart';
import { drawLine } from './flowchart.functions';
import ConditionNode from './fc.condition';
import { Token } from './fc.parse';
import { LoopNode } from './fc.loop';
class BaseNode {
  chart: FlowChart;
  symbolType: string;
  text: RaphaelElement<'SVG' | 'VML', Element | SVGTextElement>;
  width: number;
  height: number;
  vertex;
  visited: boolean = false;
  nextNode: BaseNode;
  prev: BaseNode[] = [];
  edge;
  token: Token;
  loopNode: LoopNode;

  get geometry() {
    return this.vertex.geometry;
  }
  /**
   * 层数
   */
  layer: number = 1;
  constructor(token: Token) {
    this.token = token;
  }
  /* Gets the attribute based on Flowstate, Symbol-Name and default, first found wins */
  getAttr(attName) {
    if (!this.chart) {
      return undefined;
    }
    return this.chart.options && this.chart.options[attName];
  }
}

export default BaseNode;
