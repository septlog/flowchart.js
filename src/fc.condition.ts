import { graph, mxgraph, parent } from '.';

import { RaphaelPath } from 'raphael';
import FlowChart from './flowchart.chart';
import BaseNode from './fc.base';
import { drawPath } from './flowchart.functions';
import { Token } from './fc.parse';

class ConditionNode extends BaseNode {
  textMargin: any;

  yesNode: BaseNode;
  noNode: BaseNode;
  yesVisited: boolean = false;
  noVisited: boolean = false;
  constructor(token: Token) {
    super(token);
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
    console.log(vertex);
    graph.updateCellSize(vertex, true);
  }

  yes(nextNode: BaseNode) {
    this.yesNode = nextNode;
    if (nextNode.layer < this.layer + 1) {
      nextNode.layer = this.layer + 1;
    }

    if (!this.yesVisited) {
      this.yesVisited = true;
      nextNode.vertex.geometry.x =
        this.vertex.geometry.x +
        this.vertex.geometry.width / 2 -
        nextNode.vertex.geometry.width / 2;
      nextNode.vertex.geometry.y =
        this.vertex.geometry.y + this.vertex.geometry.height + 40;

      if (this.loopNode) {
        this.loopNode.updateDepth();
        nextNode.loopNode = this.loopNode;
      }
    }

    let edge = graph.insertEdge(
      parent,
      null,
      '是',
      this.vertex,
      nextNode.vertex,
    );
  }
  no(nextNode: BaseNode) {
    this.noNode = nextNode;
    nextNode.loopNode = this.loopNode;
    if (nextNode.layer < this.layer + 1) {
      nextNode.layer = this.layer + 1;
    }

    if (!this.noVisited) {
      this.noVisited = true;
      nextNode.vertex.geometry.x =
        this.vertex.geometry.x + this.vertex.geometry.width + 50;
      nextNode.vertex.geometry.y =
        this.vertex.geometry.y + this.vertex.geometry.height + 40;

      if (this.loopNode) {
        this.loopNode.updateWidth();
        nextNode.loopNode = this.loopNode;
      }

      let edge = graph.insertEdge(
        parent,
        null,
        '否',
        this.vertex,
        nextNode.vertex,
      );
    }
  }
}

export default ConditionNode;
