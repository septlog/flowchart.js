import { graph, mxgraph, parent } from '.';

import { RaphaelPath } from 'raphael';
import BaseNode from './fc.base';
import { Chart, Token } from './fc.parse';

class ConditionNode extends BaseNode {
  textMargin: any;

  yesNode: BaseNode;
  noNode: BaseNode;
  yesVisited: boolean = false;
  noVisited: boolean = false;
  constructor(token: Token, chart: Chart) {
    super(token, chart);
    let vertex = graph.insertVertex(
      parent,
      null,
      token.text,
      0,
      0,
      0,
      0,
      'shape=rhombus',
    );
    this.vertex = vertex;
    graph.updateCellSize(vertex, true);
  }

  yes(nextNode: BaseNode) {
    this.yesNode = nextNode;

    if (!this.yesVisited) {
      this.yesVisited = true;
      nextNode.condNode = this;
      nextNode.loopNode = this.loopNode;
      // 如果没有被放置
      if (!nextNode.placed) {
        nextNode.placed = true;
        nextNode.vertex.geometry.x =
          this.vertex.geometry.x +
          this.vertex.geometry.width / 2 -
          nextNode.vertex.geometry.width / 2;
        nextNode.vertex.geometry.y =
          this.vertex.geometry.y + this.vertex.geometry.height + 40;
        let edge = graph.insertEdge(
          parent,
          null,
          '是',
          this.vertex,
          nextNode.vertex,
        );
        nextNode.layer = this.layer + 1;
        this.chart.updateYLayer(nextNode.layer, nextNode.geometry.height);
      }

      if (this.loopNode) {
        this.loopNode.updateDepth();
        nextNode.loopNode = this.loopNode;
      }
    }
  }
  no(nextNode: BaseNode) {
    this.noNode = nextNode;
    nextNode.loopNode = this.loopNode;
    if (nextNode.layer < this.layer + 1) {
      nextNode.layer = this.layer + 1;
    }

    if (!this.noVisited) {
      this.noVisited = true;
      nextNode.condNode = this;
      nextNode.loopNode = this.loopNode;
      if (!nextNode.placed) {
        nextNode.placed = true;
        nextNode.vertex.geometry.x =
          this.vertex.geometry.x + this.vertex.geometry.width + 50;
        nextNode.vertex.geometry.y =
          this.vertex.geometry.y + this.vertex.geometry.height + 40;
        let edge = graph.insertEdge(
          parent,
          null,
          '否',
          this.vertex,
          nextNode.vertex,
        );
        nextNode.layer = this.layer + 1;
        this.chart.updateYLayer(nextNode.layer, nextNode.geometry.height);
      }

      if (this.loopNode) {
        this.loopNode.updateWidth();
        nextNode.loopNode = this.loopNode;
      }
    }
  }

  down() {
    this.yesNode.layer = this.layer + 1;
  }
}

export default ConditionNode;
