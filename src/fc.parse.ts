import StartNode from './fc.start';
import EndNode from './fc.end';
import OperationNode from './fs.operation';
import ConditionNode from './fc.condition';
import BaseNode from './fc.base';
import { LoopNode } from './fc.loop';
import { graph } from '.';

export interface IChart {
  start: Token;
  tokens: {
    [key: string]: Token;
  };
  nodes: {
    [key: string]: any;
  };
  [key: string]: any;
}

export interface Token {
  name: string;
  tokenType: string;
  text: string;
  params: any;
  yes?: any;
  no?: any;
  next?: any;
  direction_next?: any;
}

export class Chart implements IChart {
  tokens = null;
  start = null;
  nodes: { [key: string]: BaseNode } = null;
  diagram = null;
  constructor() {
    this.tokens = {};
    this.nodes = {};
    this.diagram = null;
  }
  drawSVG(container: HTMLElement, options?: any) {
    if (this.diagram) {
      this.diagram.clean();
    }
    this.constructChart(this.start);

    for (let nodeName in this.nodes) {
      let node = this.nodes[nodeName];
      if (node instanceof LoopNode) {
        // node.updateNoNode();
      }
    }

    for (let nodeName in this.nodes) {
      let node = this.nodes[nodeName];
      // if (node.col > 1) {
      //   let leftNodes = this.findColNodes(node.col - 1);

      //   for (let leftNode of leftNodes) {
      //     if (this.intersectX(leftNode, node)) {
      //       node.setX(
      //         leftNode.geometry.x + leftNode.geometry.width + node.lineLength,
      //       );
      //     }
      //   }
      // }

      // if (node.row > 1) {
      //   let topNodes = this.findRowNodes(node.row - 1);
      //   for (let topNode of topNodes) {
      //     if (this.intersectY(topNode, node)) {
      //       console.log('intersectY');
      //       node.setY(
      //         topNode.geometry.y + topNode.geometry.height + node.lineLength,
      //       );
      //     }
      //   }
      // }
    }

    console.log(this.nodes);

    // for (let nodeName in this.nodes) {
    //   let node = this.nodes[nodeName];
    //   node.drawLine();
    // }
  }
  constructChart(token: Token, prevNode?: BaseNode, prevToken?: Token) {
    let node = this.getNode(token);
    if (node instanceof StartNode) {
      let nextNode = this.getNode(token.next);
      node.then(nextNode);
      this.constructChart(token.next);
    } else if (node instanceof OperationNode) {
      if (token.next) {
        let nextNode = this.getNode(token.next);

        if (nextNode instanceof LoopNode) {
          let loopNode = node.loopNode;
          while (loopNode) {
            if (nextNode === loopNode) {
              node.back(nextNode);
              break;
            }
            loopNode = loopNode.loopNode;
          }
        } else {
          node.then(nextNode);
          this.constructChart(token.next);
        }
      }
    } else if (node instanceof ConditionNode) {
      if (token.yes) {
        let yesNode = this.getNode(token.yes);
        node.yes(yesNode);
        this.constructChart(token.yes);
      }
      if (token.no) {
        let noNode = this.getNode(token.no);
        node.no(noNode);

        this.constructChart(token.no);
      }
    } else if (node instanceof LoopNode) {
      if (token.yes) {
        let yesNode = this.getNode(token.yes);
        node.yes(yesNode);
        this.constructChart(token.yes);
      }
      if (token.no) {
        let noNode = this.getNode(token.no);
        node.no(noNode);
        this.constructChart(token.no);
      }
    }
  }
  getNode(token: Token): BaseNode {
    if (this.nodes[token.name]) {
      return this.nodes[token.name];
    }

    switch (token.tokenType) {
      case 'start':
        this.nodes[token.name] = new StartNode(token, this);
        break;
      case 'operation':
        this.nodes[token.name] = new OperationNode(token, this);
        break;
      case 'condition':
        this.nodes[token.name] = new ConditionNode(token, this);
        break;
      case 'end':
        this.nodes[token.name] = new EndNode(token, this);
        break;
      case 'loop':
        this.nodes[token.name] = new LoopNode(token, this);
        break;
    }

    return this.nodes[token.name];
  }

  findNode(x: number, y: number) {
    for (let nodeName in this.nodes) {
      let node = this.nodes[nodeName];

      // console.log(nodeName, node.row, node.col);
      if (node.row === y && node.col === x) {
        return node;
      }
    }
  }

  findColNodes(x: number) {
    let nodes = [];
    for (let nodeName in this.nodes) {
      let node = this.nodes[nodeName];

      if (node.col === x) {
        nodes.push(node);
      }
    }
    return nodes;
  }

  findRowNodes(y: number) {
    let nodes = [];
    for (let nodeName in this.nodes) {
      let node = this.nodes[nodeName];

      if (node.row === y) {
        nodes.push(node);
      }
    }
    return nodes;
  }

  intersectX(leftNode: BaseNode, rightNode: BaseNode) {
    if (rightNode.geometry.x < leftNode.geometry.x + leftNode.geometry.width) {
      return true;
    }
  }
  intersectY(topNode: BaseNode, bottomNode: BaseNode) {
    if (bottomNode.geometry.y < topNode.geometry.y + topNode.geometry.height) {
      return true;
    }
  }

  updateLoopNoNode() {
    for (let nodeName in this.nodes) {
      let node = this.nodes[nodeName];
    }
  }
}
function parse(input) {
  input = input || '';
  input = input.trim();

  let chart = new Chart();

  let lines: string[] = input.split(/\r?\n/).map((line) => {
    return line.trim();
  });

  // 多行文字拼接
  for (let l = 1, len = lines.length; l < len; ) {
    let currentLine = lines[l];

    if (currentLine.indexOf('->') < 0 && currentLine.indexOf('=>') < 0) {
      lines[l - 1] += '\n' + currentLine;
      lines.splice(l, 1);
      len--;
    } else {
      l++;
    }
  }
  for (let i = 0; i < lines.length; i++) {
    let line = lines[i];

    if (line.indexOf('=>') != -1) {
      let parts = line.split('=>');
      let token = {
        name: parts[0],
        tokenType: parts[1],
        text: null,
        params: {},
      };

      // 提取 tokenType 和 text
      if (parts[1].indexOf(': ') >= 0) {
        let sub = parts[1].split(': ');
        token.tokenType = sub.shift();
        token.text = sub.join(': ');
      }

      chart.tokens[token.name] = token;
    } else if (line.indexOf('->') >= 0) {
      let rawTokens = line.split('->');
      for (let j = 0; j < rawTokens.length; j++) {
        let rawToken = rawTokens[j];

        let next = getNextPath(rawToken);
        let token = getToken(rawToken);

        let direction = null;
        if (next.indexOf(',') >= 0) {
          let condOpt = next.split(',');
          next = condOpt[0];
          direction = condOpt[1].trim();
        }

        if (!chart.start) {
          chart.start = token;
        }

        if (j + 1 < rawTokens.length) {
          let rawToken = rawTokens[j + 1];
          token[next] = getToken(rawToken);
          token['direction_' + next] = direction;
        }
      }
    }
  }
  return chart;

  function getToken(rawToken: string) {
    let startIndex = rawToken.indexOf('(') + 1;
    let endIndex = rawToken.indexOf(')');

    if (startIndex >= 0 && endIndex >= 0) {
      return chart.tokens[rawToken.substring(0, startIndex - 1)];
    }
    return chart.tokens[rawToken];
  }

  /**
   *
   * @param rawToken token
   * @returns next is '${direction}' or 'next ${direction}' or 'next'
   */
  function getNextPath(rawToken) {
    let next = 'next';
    let startIndex = rawToken.indexOf('(') + 1;
    let endIndex = rawToken.indexOf(')');
    if (startIndex >= 0 && endIndex >= 0) {
      next = rawToken.substring(startIndex, endIndex);
      if (next.indexOf(',') < 0) {
        if (next !== 'yes' && next !== 'no') {
          next = 'next, ' + next;
        }
      }
    }
    return next;
  }
}

export { parse };
