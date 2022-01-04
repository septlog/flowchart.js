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
  col: number = 1;
  /**
   * 层数
   */
  row: number = 1;

  get geometry() {
    return this.vertex.geometry;
  }

  constructor(token: Token, chart: Chart) {
    this.token = token;
    this.chart = chart;
  }
}

export default BaseNode;
