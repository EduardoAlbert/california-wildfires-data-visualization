var marginScatter = { top: 10, right: 30, bottom: 40, left: 60 },
    widthScatter = 860 - marginScatter.left - marginScatter.right,
    heightScatter = 400 - marginScatter.top - marginScatter.bottom;

var svgScatter = d3
    .select("#scatter")
    .append("svg")
    .attr("width", widthScatter + marginScatter.left + marginScatter.right)
    .attr("height", heightScatter + marginScatter.top + marginScatter.bottom)
    .append("g")
    .attr(
        "transform",
        "translate(" + marginScatter.left + "," + marginScatter.top + ")"
    );

d3.csv("./data/acres_burned_injuries.csv", function (data) {
    var x = d3
        .scaleLinear()
        .domain([
            0,
            d3.max(data, function (d) {
                return +d.AcresBurned;
            }),
        ])
        .range([0, widthScatter]);
    var xAxis = svgScatter
        .append("g")
        .attr("transform", "translate(0," + heightScatter + ")")
        .call(d3.axisBottom(x));

    var y = d3
        .scaleLinear()
        .domain([
            0,
            d3.max(data, function (d) {
                return +d.Injuries;
            }),
        ])
        .range([heightScatter, 0]);
    svgScatter.append("g").call(d3.axisLeft(y));

    svgScatter
        .append("text")
        .attr("text-anchor", "end")
        .attr("x", widthScatter / 2 + marginScatter.left)
        .attr("y", heightScatter + marginScatter.top + 25)
        .text("Área queimada (em acres)");

    svgScatter
        .append("text")
        .attr("text-anchor", "end")
        .attr("transform", "rotate(-90)")
        .attr("y", -marginScatter.left + 20)
        .attr("x", -marginScatter.top - heightScatter / 2 + 30)
        .text("Pessoas feridas");

    var tooltip = d3
        .select("#scatter")
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
            .html("Valor exato da área queimada: " + d.AcresBurned)
            .style("left", d3.mouse(this)[0] + 90 + "px")
            .style("top", d3.mouse(this)[1] + "px");
    };

    var mouseleave = function (d) {
        tooltip.transition().duration(200).style("opacity", 0);
    };

    svgScatter
        .append("g")
        .selectAll("dot")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", function (d) {
            return x(d.AcresBurned);
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

        svgScatter
            .selectAll("circle")
            .data(data)
            .transition()
            .duration(1000)
            .attr("cx", function (d) {
                return x(d.AcresBurned);
            })
            .attr("cy", function (d) {
                return y(d.Injuries);
            });
    }

    d3.select("#buttonXlim").on("input", updatePlot);
});
