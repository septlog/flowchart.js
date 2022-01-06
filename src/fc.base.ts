import ConditionNode from './fc.condition';
import { Chart, Token } from './fc.parse';
import { LoopNode } from './fc.loop';
class BaseNode {
  chart: Chart;
  symbolType: string;
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

  lineLength: number = 40;

  get geometry() {
    return this.vertex.geometry;
  }

  get rightMost() {
    return this.geometry.x + this.geometry.width;
  }

  get leftMost() {
    return this.geometry.x;
  }

  get topMost() {
    return this.geometry.y;
  }

  get bottomMost() {
    return this.geometry.y + this.geometry.height;
  }

  // get rightMiddle() {
  //   return this.geometry.x + this.geometry.width;
  // }

  // get leftMiddle() {}

  // get topMiddle() {}

  // get bottomMiddle() {}

  constructor(token: Token, chart: Chart) {
    this.token = token;
    this.chart = chart;
  }

  setX(num: number) {
    this.geometry.x = num;
  }

  setY(num: number) {}

  drawLine() {}

  updateRow(row: number) {
    if (row > this.chart.rows) {
      this.chart.rows = row;
    }
  }
  updateCol(col: number) {
    if (col > this.chart.cols) {
      this.chart.cols = col;
    }
  }

  addNode() {}
}

export default BaseNode;
