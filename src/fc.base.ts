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
  edge;
  token: Token;
  loopNode: LoopNode;
  condNode: ConditionNode;
  condNodes: ConditionNode[] = [];
  col: number = 1;
  /**
   * 层数
   */
  row: number = 1;

  lineLength: number = 40;

  notOk: boolean = false;
  w: number = 0;
  ww: number = 0;
  l: number = 0;
  ll: number = 0;

  moved: boolean = false;

  topNode: BaseNode;
  bottomNode: BaseNode;

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

  setX2(num: number) {}

  setX3(number: number) {}

  setX4(diff: number) {
    if (this.topNode && !this.topNode.moved) {
      this.topNode.geometry.x += diff;
      this.topNode.ww += diff;
      this.topNode.ll += diff;
      this.topNode.w += diff;
      this.topNode.l += diff;
      this.topNode.setX4(diff);
    }
  }

  setXX(diff: number) {}
  setY(num: number) {
    this.geometry.y = num;
  }

  drawLine() {}

  downTo(num: number) {}

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
}

export default BaseNode;
