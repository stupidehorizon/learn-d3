import * as d3 from 'd3';

const data = [4, 8, 15, 16, 23, 42, 89, 20, 10, 4, 8];
const margin = { top: 10, right: 10, bottom: 20, left: 20 };
const [svgChartWidth, svgChartHeight] = [300, 200];
const [chartWidth, chartHeight] = [svgChartWidth - margin.left - margin.right, svgChartHeight - margin.top - margin.bottom];
const barWidth = chartWidth / (data.length);
const barPadding = 5;

const xScale = d3.scaleLinear()
    .domain([0, data.length - 1])
    .range([0, chartWidth]);

const yScale = d3.scaleLinear()
    .domain([0, d3.max(data)])
    .range([chartHeight, 0]);

const xAxis = d3.axisBottom()
    .scale(xScale);

var yAxis = d3.axisLeft()
    .scale(yScale);

const svg = d3.select("svg")
    .attr('width', svgChartWidth + 'px' )
    .attr('height', svgChartHeight + 'px')

svg.append("g")
    .attr("transform", `translate(${[margin.left, svgChartHeight - margin.bottom]})`)
    .call(xAxis);

svg.append("g")
    .attr("transform", `translate(${[margin.left, margin.top]})`)
    .call(yAxis);

svg.append('g')
    .attr('width', chartWidth + 'px')
    .attr('height', chartHeight + 'px')
    .attr("transform", `translate(${[margin.left, margin.top]})`)
    .selectAll("rect")
    .data(data)
    .enter()
    .append("rect")
    .attr("width", barWidth - barPadding  + 'px')
    .attr("height", d => chartHeight - yScale(d))
    .attr("transform", (d, i) => `translate(${[xScale(i), yScale(d)]}), scale(1)`)

