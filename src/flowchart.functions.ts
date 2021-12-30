import { RaphaelPath, RaphaelTextAnchorType } from 'raphael';
import FlowChart from './flowchart.chart';

function drawPath(chart: FlowChart, location, points): RaphaelPath {
  let path = `M${location.x},${location.y}`;
  for (let i = 0; i < points.length; i++) {
    path += ` L${points[i].x},${points[i].y}`;
  }
  let raphaelPath: RaphaelPath = chart.paper.path(path);
  raphaelPath.attr('stroke', chart.options['element-color']);
  raphaelPath.attr('stroke-width', chart.options['line-width']);

  let font = chart.options.font;
  let fontF = chart.options['font-family'];
  let fontW = chart.options['font-weight'];

  if (font) raphaelPath.attr({ font: font });
  if (fontF) raphaelPath.attr({ 'font-family': fontF });
  if (fontW) raphaelPath.attr({ 'font-weight': fontW });

  return raphaelPath;
}

function drawLine(chart: FlowChart, from, to, text: string) {
  if (!(to instanceof Array)) {
    to = [to];
  }

  let path = `M${from.x},${from.y}`;
  for (let i = 0; i < to.length; i++) {
    path += ` L${to[i].x},${to[i].y}`;
  }

  let line = chart.paper.path(path);
  line.attr({
    stroke: chart.options['line-color'],
    'stroke-width': chart.options['line-width'],
    'arrow-end': chart.options['arrow-end'],
  });

  let font = chart.options.font;
  let fontF = chart.options['font-family'];
  let fontW = chart.options['font-weight'];

  if (font) line.attr({ font: font });
  if (fontF) line.attr({ 'font-family': fontF });
  if (fontW) line.attr({ 'font-weight': fontW });

  if (text) {
    let centerText = false;

    let textPath = chart.paper.text(0, 0, text);
    let textAnchor: RaphaelTextAnchorType = 'start';

    let isHorizontal = false;
    let firstTo = to[0];

    if (from.y === firstTo.y) {
      isHorizontal = true;
    }

    let x = 0;
    let y = 0;

    if (centerText) {
      if (from.x > firstTo.x) {
        x = from.x - (from.x - firstTo.x) / 2;
      } else {
        x = firstTo.x - (firstTo.x - from.x) / 2;
      }

      if (from.y > firstTo.y) {
        y = from.y - (from.y - firstTo.y) / 2;
      } else {
        y = firstTo.y - (firstTo.y - from.y) / 2;
      }

      if (isHorizontal) {
        x -= textPath.getBBox().width / 2;
        y -= chart.options['text-margin'];
      } else {
        x += chart.options['text-margin'];
        y -= textPath.getBBox().height / 2;
      }
    } else {
      x = from.x;
      y = from.y;

      if (isHorizontal) {
        if (from.x > firstTo.x) {
          x -= chart.options['text-margin'] / 2;
          textAnchor = 'end';
        } else {
          x += chart.options['text-margin'] / 2;
        }
        y -= chart.options['text-margin'];
      } else {
        x += chart.options['text-margin'] / 2;
        y += chart.options['text-margin'];
        if (from.y > firstTo.y) {
          y -= chart.options['text-margin'] * 2;
        }
      }
    }

    textPath.attr({
      x,
      y,
      fill: chart.options['font-color'],
      'font-size': chart.options['font-size'],
      'text-anchor': textAnchor,
    });

    if (font) textPath.attr({ font: font });
    if (fontF) textPath.attr({ 'font-family': fontF });
    if (fontW) textPath.attr({ 'font-weight': fontW });
  }

  return line;
}

export { drawPath, drawLine };
