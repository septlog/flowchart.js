import { parse } from './fc.parse';
let mxgraph = require('mxgraph')({
  mxBasePath: './src',
  mxLoadResources: false,
  mxLoadStylesheets: true,
});
export { mxgraph };

let div = document.getElementById('chart');
let graph = new mxgraph.mxGraph(div);

graph.edgeLabelsMovable = false;
graph.gridEnabled = true;
graph.setAllowDanglingEdges(false);
graph.setDisconnectOnMove(false);
// graph.cellsSelectable = true;
// graph.autoSizeCells = true;
// mxgraph.mxText.textWidthPadding = 30;
mxgraph.mxGraphHandler.guidesEnabled = true;
// mxgraph.mxEdgeHandler.snapToTerminals = true;

new mxgraph.mxRubberband(graph);

let style = graph.stylesheet.getDefaultEdgeStyle();
style[mxgraph.mxConstants.STYLE_FONTCOLOR] = 'black';
style[mxgraph.mxConstants.STYLE_LABEL_BACKGROUNDCOLOR] = 'white';
style[mxgraph.mxConstants.STYLE_STROKECOLOR] = 'black';
graph.getStylesheet().getDefaultEdgeStyle()['edgeStyle'] =
  'orthogonalEdgeStyle';
style = graph.stylesheet.getDefaultVertexStyle();
style[mxgraph.mxConstants.STYLE_FONTCOLOR] = 'black';
style[mxgraph.mxConstants.STYLE_STROKECOLOR] = 'black';
style[mxgraph.mxConstants.STYLE_FILLCOLOR] = 'white';

let parent = graph.getDefaultParent();

export { graph, parent };

// let str = `st=>start: Start|past:>http://www.google.com[blank]
//   e=>end: End:>http://www.google.com
//   op1=>operation: My Operation|past
//   op2=>operation: Stuff|current
//   cond=>condition: Yes or No?|approved:>http://www.google.com
//   c2=>condition: Good idea|rejected
//   st(left)->op1->op2->cond
//   cond(yes, bottom)->c2
//   c2(no)->e`;
// let str = `st25=>start: start main
// op26=>operation: 调用函数 printf
// op27=>operation: 调用函数 printf
// op28=>operation: 调用函数 interrupt_initial
// op29=>operation: 调用函数 timer_set_and_start_timer
// cond30=>condition: if ( interrupt_hook ( ( void * ) & interrupt_timer_irq , 6 ) ) {
// op31=>operation: 调用函数 printf
// cond35=>condition: if ( interrupt_hook ( ( void * ) & interrupt_can1_rxd_isr , 4 ) ) {
// op36=>operation: 调用函数 printf
// cond40=>condition: if ( interrupt_hook ( ( void * ) & interrupt_can2_rxd_isr , 5 ) ) {
// op41=>operation: 调用函数 printf
// op45=>operation: 调用函数 printf
// op46=>operation: 调用函数 CAN_init
// op47=>operation: 调用函数 printf
// op48=>operation: 调用函数 printf
// cond49=>condition: while ( 1 ) {
// cond50=>condition: if ( can_send_status == 2 ) {
// op51=>operation: 赋值 frame
// op53=>operation: 调用函数 printf
// op54=>operation: 调用函数 printf
// op55=>operation: 调用函数 printf
// op56=>operation: 调用函数 printf
// cond57=>condition: for ( i = 1 ; i < frame . dlc ; i ++ ) {
// op58=>operation: 调用函数 printf
// op60=>operation: 调用函数 printf
// op64=>operation: 调用函数 printf
// cond66=>condition: while ( 1 )
// op67=>operation: ;
// cond69=>condition: for ( ; ; )
// op70=>operation: 调用函数 CAN_dispatch_transmit_CANMessages
// op72=>operation: 调用函数 CAN_dispatch_receive_CANMessages
// op74=>operation: return 0 ;
// e76=>end: end main
// op43=>operation: 调用函数 printf
// op38=>operation: 调用函数 printf
// op33=>operation: 调用函数 printf

// st25->op26
// op26->op27
// op27->op28
// op28->op29
// op29->cond30
// cond30->
// cond30->
// cond30(yes)->op31
// op31->cond35
// cond35->
// cond35->
// cond35(yes)->op36
// op36->cond40
// cond40->
// cond40->
// cond40(yes)->op41
// op41->op45
// op45->op46
// op46->op47
// op47->op48
// op48->cond49
// cond49->
// cond49->
// cond49(yes)->cond50
// cond50->
// cond50->
// cond50(yes)->op51
// op51->op53
// op53->op54
// op54->op55
// op55->op56
// op56->cond57
// cond57->
// cond57->
// cond57(yes)->op58
// op58->cond57
// cond57(no)->op60
// op60->cond49
// cond50(no)->cond49
// cond49(no)->op64
// op64->cond66
// cond66->
// cond66->
// cond66(yes)->op67
// op67->cond66
// cond66(no)->cond69
// cond69->
// cond69->
// cond69(yes)->op70
// op70->op72
// op72->cond69
// cond69(no)->op74
// op74->e76
// op74->e76
// cond40(no)->op43
// op43->op45
// cond35(no)->op38
// op38->cond40
// cond30(no)->op33
// op33->cond35
// `;
let str = `
st=>start: 开始
loop1=>loop: i<10
loop1end=>operation: i++
cond1=>condition: 条件1
cond2=>condition: 条件2
op1=>operation: 语句1语句1语句1语句1语句1语句1语句1语句1语句1语句1
op2=>operation: 语句2
语句2
语句2
语句2
语句2
op3=>operation: 语句3
op4=>operation: 语句4
op5=>operation: 语句5
st->loop1
loop1(yes)->cond1
loop1(no)->op4
cond1(yes)->op1
cond1(no)->cond2
cond2(yes)->op2
cond2(no)->op3
op1->op5
op2->op5
op3->op5
op5->loop1end
loop1end->loop1
`;
// let str = `
// st=>start: 开始
// loop1=>loop: i<10
// loop2=>loop: j<10
// loop1end=>operation: i++
// cond1=>condition: 条件1
// cond2=>condition: 条件2
// op1=>operation: 语句1
// op2=>operation: 语句2
// op3=>operation: 语句3
// op4=>operation: 语句4
// op5=>operation: 语句5
// st->op1
// op1->op2
// op2->op3
// op3->op4
// op4->op5
// `;
let chart = parse(str);

chart.drawSVG(div);
graph.center();
// st24=>start: start main
// op25=>operation: 调用函数 printf
// op26=>operation: 调用函数 printf
// op27=>operation: 调用函数 interrupt_initial
// op28=>operation: 调用函数 timer_set_and_start_timer
// cond29=>condition: if ( interrupt_hook ( ( void * ) & interrupt_timer_irq , 6 ) ) {
// op30=>operation: 调用函数 printf
// cond34=>condition: if ( interrupt_hook ( ( void * ) & interrupt_can1_rxd_isr , 4 ) ) {
// op35=>operation: 调用函数 printf
// cond39=>condition: if ( interrupt_hook ( ( void * ) & interrupt_can2_rxd_isr , 5 ) ) {
// op40=>operation: 调用函数 printf
// op44=>operation: 调用函数 printf
// op45=>operation: 调用函数 CAN_init
// op46=>operation: 调用函数 printf
// op47=>operation: 调用函数 printf
// cond48=>condition: while ( 1 ) {
// cond49=>condition: if ( can_send_status == 2 ) {
// op50=>operation: 赋值 frame
// op52=>operation: 调用函数 printf
// op53=>operation: 调用函数 printf
// op54=>operation: 调用函数 printf
// op55=>operation: 调用函数 printf
// cond56=>condition: for ( i = 1 ; i < frame . dlc ; i ++ ) {
// op57=>operation: 调用函数 printf
// op59=>operation: 调用函数 printf
// op63=>operation: 调用函数 printf
// cond65=>condition: while ( 1 ) ;
// cond67=>condition: for ( ; ; )
// op68=>operation: 调用函数 CAN_dispatch_transmit_CANMessages
// op70=>operation: 调用函数 CAN_dispatch_receive_CANMessages
// op72=>operation: return 0 ;
// e74=>end: end main
// op42=>operation: 调用函数 printf
// op37=>operation: 调用函数 printf
// op32=>operation: 调用函数 printf

// st24->op25
// op25->op26
// op26->op27
// op27->op28
// op28->cond29
// cond29->
// cond29->
// cond29(yes)->op30
// op30->cond34
// cond34->
// cond34->
// cond34(yes)->op35
// op35->cond39
// cond39->
// cond39->
// cond39(yes)->op40
// op40->op44
// op44->op45
// op45->op46
// op46->op47
// op47->cond48
// cond48->
// cond48->
// cond48(yes)->cond49
// cond49->
// cond49->
// cond49(yes)->op50
// op50->op52
// op52->op53
// op53->op54
// op54->op55
// op55->cond56
// cond56->
// cond56->
// cond56(yes)->op57
// op57->cond56
// cond56(no)->op59
// op59->cond48
// cond49(no)->cond48
// cond48(no)->op63
// op63->cond65
// cond65->
// cond65->
// cond65(yes)->cond65
// cond65(no)->cond67
// cond67->
// cond67->
// cond67(yes)->op68
// op68->op70
// op70->cond67
// cond67(no)->op72
// op72->e74
// cond39(no)->op42
// op42->op44
// cond34(no)->op37
// op37->cond39
// cond29(no)->op32
// op32->cond34
