import StartNode from './fc.start';
import EndNode from './fc.end';
import OperationNode from './fs.operation';
import ConditionNode from './fc.condition';
import BaseNode from './fc.base';
import { LoopNode } from './fc.loop';
import { graph, parent, mxgraph } from '.';

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
  rows: number = 1;
  cols: number = 1;

  rowMap: Map<any, any> = new Map();
  colMap: Map<any, any> = new Map();
  constructor() {
    this.tokens = {};
    this.nodes = {};
  }
  drawSVG() {
    this.constructChart(this.start);

    for (let nodeName in this.nodes) {
      let node = this.nodes[nodeName];
      if (node instanceof OperationNode) {
        let nextNode = node.nextNode;
        if (nextNode && nextNode.row < node.row + 1) {
          nextNode.down(node.row + 1 - nextNode.row);
        }
      }
    }

    for (let nodeName in this.nodes) {
      let node = this.nodes[nodeName];

      let h = this.rowMap.get(node.row);
      if (h) {
        if (node.geometry.height > h) {
          this.rowMap.set(node.row, node.geometry.height);
        }
      } else {
        this.rowMap.set(node.row, node.geometry.height);
      }

      let w = this.colMap.get(node.col);
      if (w) {
        if (node.leftMost < w) {
          this.colMap.set(node.col, node.leftMost);
        }
      } else {
        this.colMap.set(node.col, node.leftMost);
      }
    }
    for (let nodeName in this.nodes) {
      let node = this.nodes[nodeName];

      // if (node.token.text === '语句9') {
      //   debugger;
      // }
      if (node.notOk) {
        // node.nextNode
        let idx = 0;
        // for (let cd of node.condNodes) {
        //   if (cd.col === node.nextNode.col) {
        //     cd.endRow = node.nextNode.row;
        //     idx = node.condNodes.indexOf(cd);
        //     break;
        //   }
        // }
        for (let i = 0; i < node.condNodes.length; i++) {
          let cd = node.condNodes[i];
          cd.endRow = node.nextNode.row;
        }

        // for (let i = 0; i < idx; i++) {
        //   let cd = node.condNodes[i];
        //   cd.endRow = node.nextNode.row;
        // }
      }
    }

    console.log(this.nodes);
    console.log(this);

    for (let i = 1; i <= this.rows; i++) {
      let nodes = this.findRowNodes(i);

      for (let node of nodes) {
        let topNodes = this.findRowNodes(node.row - 1);
        for (let topNode of topNodes) {
          if (this.intersectY(topNode, node)) {
            node.setY(
              topNode.geometry.y + topNode.geometry.height + node.lineLength,
            );
          }
        }
      }
    }

    for (let i = 1; i <= this.cols; i++) {
      let nodes = this.findColNodes(i);
      for (let node of nodes) {
        let leftNodes = this.findColNodes(node.col - 1);

        if (node.condNodes.length > 0) {
          leftNodes = leftNodes.filter((leftNode) => {
            return (
              leftNode.row > node.condNode.row &&
              leftNode.row < node.condNode.endRow
            );
          });
        }
        for (let leftNode of leftNodes) {
          if (this.intersectX(leftNode, node)) {
            node.setX(
              leftNode.geometry.x + leftNode.geometry.width + node.lineLength,
            );

            if (node.condNode) {
            }
          }
        }
      }
    }

    for (let nodeName in this.nodes) {
      let node = this.nodes[nodeName];

      if (node instanceof LoopNode) {
        node.drawLine();
        let w = 0;

        for (let i = node.row; i <= node.endRow; i++) {
          let childRowNodes = this.findRowNodes(i);
          for (let childRowNode of childRowNodes) {
            // if (childRowNode.col === node.width) {
            if (childRowNode.geometry.x + childRowNode.geometry.width > w) {
              w = childRowNode.geometry.x + childRowNode.geometry.width;
            }
            // }
          }
        }

        if (w + 20 * node.rights > node.geometry.x + node.geometry.width) {
          w += 20 * node.rights;
        } else {
          w = node.geometry.x + node.geometry.width + 20;
        }

        let edge = graph.insertEdge(
          parent,
          null,
          '',
          node.vertex,
          node.noNode.vertex,
        );

        edge.geometry.points = [
          new mxgraph.mxPoint(
            node.geometry.x + node.geometry.width,
            node.geometry.y + node.geometry.height / 2,
          ),
          new mxgraph.mxPoint(w, node.geometry.y + node.geometry.height / 2),
          new mxgraph.mxPoint(w, node.noNode.geometry.y - 20),
          new mxgraph.mxPoint(
            node.noNode.geometry.x + node.noNode.geometry.width / 2,
            node.noNode.geometry.y - 20,
          ),
          new mxgraph.mxPoint(
            node.noNode.geometry.x + node.noNode.geometry.width / 2,
            node.noNode.geometry.y,
          ),
        ];
      } else if (node instanceof OperationNode) {
        // node.drawLine();

        if (node.backNode) {
          node.drawLine();
          let w = node.geometry.x;

          for (let i = node.loopNode.row; i <= node.row; i++) {
            let childRowNodes = this.findRowNodes(i);
            for (let childRowNode of childRowNodes) {
              if (childRowNode.col === node.col) {
                if (childRowNode.geometry.x < w) {
                  w = childRowNode.geometry.x;
                }
              }
            }
          }

          let edge = graph.insertEdge(
            parent,
            null,
            '',
            node.vertex,
            node.backNode.vertex,
          );
          edge.geometry.points = [
            new mxgraph.mxPoint(
              node.leftMost,
              node.geometry.y + node.geometry.height / 2,
            ),
            new mxgraph.mxPoint(
              w - 20 * node.backNode.loops,
              node.geometry.y + node.geometry.height / 2,
            ),

            new mxgraph.mxPoint(
              w - 20 * node.backNode.loops,
              edge.target.geometry.y + 20,
            ),
            new mxgraph.mxPoint(
              edge.target.geometry.x + edge.target.geometry.width / 2,
              edge.target.geometry.y - 20,
            ),
            new mxgraph.mxPoint(
              edge.target.geometry.x + edge.target.geometry.width / 2,
              edge.target.geometry.y,
            ),
          ];

          if (node.backNode.loopNode) {
            node.backNode.loopNode.updateLoops();
          }
        } else {
          node.drawLine();
        }
      } else if (node instanceof ConditionNode) {
        node.drawLine();
      } else {
        node.drawLine();
      }
    }
  }
  constructChart(token: Token) {
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
          if (nextNode === loopNode) {
            node.back(nextNode);
          } else {
            node.then(nextNode);
            this.constructChart(token.next);
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

  findColNodes(x: number): BaseNode[] {
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
    if (rightNode.geometry.x <= leftNode.geometry.x + leftNode.geometry.width) {
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
    let line = lines[i].trim();

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
