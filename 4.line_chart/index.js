import * as d3 from 'd3';
import mockData from './mock-data';

const margin = { top: 10, right: 10, bottom: 20, left: 50 };
const [svgChartWidth, svgChartHeight] = [900, 400];
const [chartWidth, chartHeight] = [svgChartWidth - margin.left - margin.right, svgChartHeight - margin.top - margin.bottom];

// 构造数据
const data = (() => {
    let arr = [];
    for (let i in mockData.bpi) {
        arr.push({
            date: new Date(i),
            value: +mockData.bpi[i]
        })
    }
    return arr;
})();

const xScale = d3.scaleTime()
    .domain(d3.extent(data, d => d.date))
    .range([0, chartWidth]);

const yScale = d3.scaleLinear()
    .domain(d3.extent(data, d => d.value))
    .range([chartHeight, 0]);

const xAxis = d3.axisBottom()
    .scale(xScale);

var yAxis = d3.axisLeft()
    .scale(yScale);

const svg = d3.select("svg")
    .attr('width', svgChartWidth)
    .attr('height', svgChartHeight)

svg.append("g")
    .attr("transform", `translate(${[margin.left, svgChartHeight - margin.bottom]})`)
    .call(xAxis);

svg.append("g")
    .attr("transform", `translate(${[margin.left, margin.top]})`)
    .call(yAxis)
    .append("text")
    .attr("fill", "#000")
    .attr("transform", "rotate(-90)")
    .attr("y", 6)
    .attr("dy", "0.71em")
    .attr("text-anchor", "end")
    .text("Price ($)");

const line = d3.line()
    .x(d => xScale(d.date))
    .y(d => yScale(d.value));

svg.append('g')
    .attr('width', chartWidth)
    .attr('height', chartHeight)
    .attr("transform", `translate(${[margin.left, margin.top]})`)
    .append("path")
    .datum(data)
    .attr("fill", "none")
    .attr("stroke", "steelblue")
    .attr("stroke-linejoin", "round")
    .attr("stroke-linecap", "round")
    .attr("stroke-width", 1.5)
    .attr('d', line);

