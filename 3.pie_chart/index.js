import * as d3 from 'd3';

const data = [
    {"platform": "Android", "percentage": 40.11},
    {"platform": "Windows", "percentage": 36.69},
    {"platform": "iOS", "percentage": 13.06}
];

const [chartWidth, chartHeight] = [300, 300];
const chartPadding = 10;
const radius = Math.min(chartWidth, chartHeight) / 2;

// 设置画布宽高
const svg = d3.select('svg')
    .attr('width', chartWidth)
    .attr('height', chartHeight)
    .append('g')
    .attr('transform', `translate(${[radius, radius]})`)

// 初始化饼图数据
const pie = d3.pie().value(d => d.percentage)(data);

// 创建圆弧路径
const arc = d3.arc()
    .innerRadius(0)
    .outerRadius(radius - chartPadding)

const colorScale = d3.scaleOrdinal()
    .range(['red', 'blue', 'green', 'orange', 'purple'])

// 开始绘制路径
const path = svg.selectAll('path')
    .data(pie)
    .enter()
    .append('path')
    .attr('d', arc)
    .style('fill', (d, i) => colorScale(i))
    .style('fill-opacity', '0.3')
    .style('stroke', (d, i) => colorScale(i))
    .style('stroke-width', '3px')

// label
const textLabels = svg.selectAll('text')
    .data(pie)
    .enter()
    .append('text')
    .attr("text-anchor", "middle")
    .attr('transform', d => `translate(${arc.centroid(d)})`)
    .text(d => `${d.data.platform}: ${d.data.percentage}%`);



