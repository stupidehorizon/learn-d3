import * as d3 from 'd3';

const data = [4, 8, 15, 16, 23, 42, 89, 20, 10,4, 8];
const margin = {top: 10, right: 10, bottom: 20, left: 20};
const [chartWidth, chartHeight] = [300, 200];
const [gWidth, gHeight] = [chartWidth - margin.left - margin.right, chartHeight - margin.top - margin.bottom];
const barWidth = gWidth/(data.length);
const barPadding = 5;

const xScale = d3.scaleLinear()
    .domain([1, data.length])
    .range([0, chartWidth]);

const yScale = d3.scaleLinear()
    .domain([0, d3.max(data)])
    .range([0, chartHeight]);

const xAxis = d3.axisBottom()
    .scale(xScale);

var yAxis = d3.axisLeft()
    .scale(yScale);

const svg = d3.select("svg");

svg.append("g")
    .attr("transform", `translate(${[margin.left, margin.top]})`)
    .call(yAxis);

svg.append("g")
    .attr("transform", `translate(${[margin.left, chartHeight - margin.bottom]})`)
    .call(xAxis);

svg
  .attr('width', chartWidth)
  .attr('height', chartHeight)
  .append('g')
  .attr('width', gWidth)
  .attr('height', gHeight)
  .attr("transform", `translate(${[margin.left, margin.top]})`)
  .selectAll("rect")
  .data(data)
  .enter()
  .append("rect")
  .attr("width", barWidth - barPadding)
  .attr("height", d => d)
  .attr('transform', (d, i) => (
    `translate(${[barWidth * i, gHeight - d]})`
  ))
  .transition()
  .duration(750);
