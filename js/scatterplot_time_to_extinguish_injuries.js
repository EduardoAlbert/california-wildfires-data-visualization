var marginScatter3 = { top: 10, right: 30, bottom: 40, left: 60 },
    widthScatter3 = 860 - marginScatter3.left - marginScatter3.right,
    heightScatter3 = 400 - marginScatter3.top - marginScatter3.bottom;

var svgScatter3 = d3
    .select("#scatter3")
    .append("svg")
    .attr("width", widthScatter3 + marginScatter3.left + marginScatter3.right)
    .attr("height", heightScatter3 + marginScatter3.top + marginScatter3.bottom)
    .append("g")
    .attr(
        "transform",
        "translate(" + marginScatter3.left + "," + marginScatter3.top + ")"
    );

d3.csv("./data/time_to_extinguish_injuries.csv", function (data) {
    var x = d3
        .scaleLinear()
        .domain([
            0,
            d3.max(data, function (d) {
                return +d.TimeToExtinguish;
            }),
        ])
        .range([0, widthScatter3]);
    var xAxis = svgScatter3
        .append("g")
        .attr("transform", "translate(0," + heightScatter3 + ")")
        .call(d3.axisBottom(x));

    var y = d3
        .scaleLinear()
        .domain([
            0,
            d3.max(data, function (d) {
                return +d.Injuries;
            }),
        ])
        .range([heightScatter3, 0]);
    svgScatter3.append("g").call(d3.axisLeft(y));

    svgScatter3
        .append("text")
        .attr("text-anchor", "end")
        .attr("x", widthScatter3 / 2 + marginScatter3.left)
        .attr("y", heightScatter3 + marginScatter3.top + 25)
        .text("Tempo para extinguir (em minutos)");

    svgScatter3
        .append("text")
        .attr("text-anchor", "end")
        .attr("transform", "rotate(-90)")
        .attr("y", -marginScatter3.left + 20)
        .attr("x", -marginScatter3.top - heightScatter3 / 2 + 30)
        .text("Pessoas feridas");

    var tooltip = d3
        .select("#scatter3")
        .append("div")
        .style("opacity", 0)
        .attr("class", "tooltip")
        .style("background-color", "white")
        .style("border", "solid")
        .style("border-width", "1px")
        .style("border-radius", "5px")
        .style("padding", "10px");

    var mouseover = function (d) {
        tooltip.style("opacity", 1);
    };

    var mousemove = function (d) {
        tooltip
            .html("Valor exato de tempo para extinguir: " + d.TimeToExtinguish)
            .style("left", d3.mouse(this)[0] + 90 + "px")
            .style("top", d3.mouse(this)[1] + "px");
    };

    var mouseleave = function (d) {
        tooltip.transition().duration(200).style("opacity", 0);
    };

    svgScatter3
        .append("g")
        .selectAll("dot")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", function (d) {
            return x(d.TimeToExtinguish);
        })
        .attr("cy", function (d) {
            return y(d.Injuries);
        })
        .attr("r", 5)
        .style("fill", "darkOrange")
        .style("opacity", 0.3)
        .style("stroke", "white")
        .on("mouseover", mouseover)
        .on("mousemove", mousemove)
        .on("mouseleave", mouseleave);

    function updatePlot() {
        xlim = this.value;

        x.domain([0, xlim]);
        xAxis.transition().duration(1000).call(d3.axisBottom(x));

        svgScatter3
            .selectAll("circle")
            .data(data)
            .transition()
            .duration(1000)
            .attr("cx", function (d) {
                return x(d.TimeToExtinguish);
            })
            .attr("cy", function (d) {
                return y(d.Injuries);
            });
    }

    d3.select("#buttonXlim3").on("input", updatePlot);
});
