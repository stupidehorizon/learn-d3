import * as d3 from 'd3';
import './style.scss';

const data = [4, 8, 15, 16, 23, 42, 89, 20, 10,4, 8];
const [chartWidth, chartHeight] = [200, 400];
const barWidth = chartWidth/(data.length);

const x = d3.scaleLinear()
    .domain([1, data.length])
    .range([0, chartWidth]);

const y = d3.scaleLinear()
    .domain([0, d3.max(data)])
    .range([0, chartHeight]);

d3.select(".chart")
  .style('width', chartWidth + 'px')
  .style('height', chartHeight + 'px')
  .selectAll("div")
  .data(data)
  .enter().append("div")
  .style("left", function(d, i) { return x(i) + 'px'; })
  .style("width", barWidth + 'px')
  .transition()
  .duration(750)
  .style("height", function(d) { return y(d) + 'px'; })
  .text(function(d) { return d; });
