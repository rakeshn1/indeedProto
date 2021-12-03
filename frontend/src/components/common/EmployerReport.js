import React, { useEffect } from "react";
import * as d3 from "d3";

function PieChart(props) {
    const { data, outerRadius, innerRadius } = props;
    const margin = {
        top: 50,
        right: 50,
        bottom: 50,
        left: 50,
    };
    const width = 2 * outerRadius + margin.left + margin.right;
    const height = 2 * outerRadius + margin.top + margin.bottom;

    const colorScale = d3
        .scaleSequential()
        .interpolator(d3.interpolateCool)
        .domain([0, data.length]);
        
    useEffect(() => {
        drawChart();
    }, [data]);

    function drawChart() {
        d3.select("#pie-container").select("svg").remove();

        // Create new svg
        const svg = d3
            .select("#pie-container")
            .append("svg")
            .attr("width", width)
            .attr("height", height)
            .append("g")
            .attr("transform", `translate(${width / 2}, ${height / 2})`);
        svg.append("circle").attr("cx", 200).attr("cy", 130).attr("r", 6).style("fill", "#69b3a2")
        svg.append("circle").attr("cx", 200).attr("cy", 160).attr("r", 6).style("fill", "#404080")
        svg.append("circle").attr("cx", 200).attr("cy", 130).attr("r", 6).style("fill", "#777777")
        svg.append("circle").attr("cx", 200).attr("cy", 160).attr("r", 6).style("fill", "#404080")
        svg.append("circle").attr("cx", 200).attr("cy", 130).attr("r", 6).style("fill", "#69b3a2")
        svg.append("circle").attr("cx", 200).attr("cy", 160).attr("r", 6).style("fill", "#404080")
        svg.append("text").attr("x", 220).attr("y", 130).text("variable A").style("font-size", "15px").attr("alignment-baseline", "middle")
        svg.append("text").attr("x", 220).attr("y", 160).text("variable B").style("font-size", "15px").attr("alignment-baseline", "middle")
        svg.append("text").attr("x", 220).attr("y", 130).text("variable D").style("font-size", "15px").attr("alignment-baseline", "middle")
        svg.append("text").attr("x", 220).attr("y", 160).text("variable E").style("font-size", "15px").attr("alignment-baseline", "middle")
        svg.append("text").attr("x", 220).attr("y", 130).text("variable F").style("font-size", "15px").attr("alignment-baseline", "middle")
        svg.append("text").attr("x", 220).attr("y", 160).text("variable G").style("font-size", "15px").attr("alignment-baseline", "middle")
        const arcGenerator = d3
            .arc()
            .innerRadius(innerRadius)
            .outerRadius(outerRadius);

        const pieGenerator = d3
            .pie()
            .padAngle(0)
            .value((d) => d.value);

        const arc = svg.selectAll().data(pieGenerator(data)).enter();

        // Append arcs
        arc
            .append("path")
            .attr("d", arcGenerator)
            .style("fill", (_, i) => colorScale(i))
            .style("stroke", "#ffffff")
            .style("stroke-width", 0);

        // Append text labels
        arc
            .append("text")
            .attr("text-anchor", "middle")
            .attr("alignment-baseline", "middle")
            .style("fill", (_, i) => colorScale())
            .attr("transform", (d) => {
                const [x, y] = arcGenerator.centroid(d);
                return `translate(${x}, ${y})`;
            });
    }

    return <div id="pie-container" />;
}

export default PieChart;
