## 使用 svg 构造简单柱状图

### 本地启动
`cd 2.svg_bar_chart`
`yarn global add parcel`
`parcel index.html`

### 预览
![image](https://raw.githubusercontent.com/stupidehorizon/learn-d3/master/img/2.1.png)

### 踩坑

I have find the proble is i used xSale by scaleLinear

```js
const xScale = d3.scaleLinear()
    .domain([0, data.length - 1])
    .range([0, chartWidth]);  // wrong

// i use the x scale to transform the bar rect, the last line.
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
    .attr("transform", (d, i) => `translate(${[xScale(i), yScale(d)]})`)
```
and the right version should be
```
const xScale = d3.scaleLinear()
    .domain([0, data.length - 1])
    .range([0, chartWidth - barWidth]); // right
```