import { RaphaelElement, RaphaelSet } from 'raphael';
import ConditionNode from './fc.condition';
import { Chart, Token } from './fc.parse';
import { LoopNode } from './fc.loop';

class BaseNode {
  chart: Chart;
  symbolType: string;
  text: RaphaelElement<'SVG' | 'VML', Element | SVGTextElement>;
  width: number;
  height: number;
  vertex;
  visited: boolean = false;
  placed: boolean = false;
  nextNode: BaseNode;
  prev: BaseNode[] = [];
  edge;
  token: Token;
  loopNode: LoopNode;
  condNode: ConditionNode;

  get geometry() {
    return this.vertex.geometry;
  }
  /**
   * 层数
   */
  layer: number = 1;

  constructor(token: Token, chart: Chart) {
    this.token = token;
    this.chart = chart;
  }
}

export default BaseNode;
