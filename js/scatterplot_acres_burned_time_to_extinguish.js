var marginScatter2 = { top: 10, right: 30, bottom: 40, left: 70 },
    widthScatter2 = 860 - marginScatter2.left - marginScatter2.right,
    heightScatter2 = 400 - marginScatter2.top - marginScatter2.bottom;

var svgScatter2 = d3
    .select("#scatter2")
    .append("svg")
    .attr("width", widthScatter2 + marginScatter2.left + marginScatter2.right)
    .attr("height", heightScatter2 + marginScatter2.top + marginScatter2.bottom)
    .append("g")
    .attr(
        "transform",
        "translate(" + marginScatter2.left + "," + marginScatter2.top + ")"
    );

d3.csv("./data/acres_burned_time_to_extinguish.csv", function (data) {
    var x = d3
        .scaleLinear()
        .domain([
            0,
            d3.max(data, function (d) {
                return +d.AcresBurned;
            }),
        ])
        .range([0, widthScatter2]);
    var xAxis = svgScatter2
        .append("g")
        .attr("transform", "translate(0," + heightScatter2 + ")")
        .call(d3.axisBottom(x));

    var y = d3
        .scaleLinear()
        .domain([
            0,
            d3.max(data, function (d) {
                return +d.TimeToExtinguish;
            }),
        ])
        .range([heightScatter2, 0]);
    var yAxis = svgScatter2.append("g").call(d3.axisLeft(y));

    svgScatter2
        .append("text")
        .attr("text-anchor", "end")
        .attr("x", widthScatter / 2 + marginScatter.left)
        .attr("y", heightScatter + marginScatter.top + 25)
        .text("Área queimada (em acres)");

    svgScatter2
        .append("text")
        .attr("text-anchor", "end")
        .attr("transform", "rotate(-90)")
        .attr("y", -marginScatter2.left + 15)
        .attr("x", -marginScatter2.top - heightScatter2 / 2 + 160)
        .text("Tempo para extinguir (em minutos)");

    var tooltip = d3
        .select("#scatter2")
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

    svgScatter2
        .append("g")
        .selectAll("dot")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", function (d) {
            return x(d.AcresBurned);
        })
        .attr("cy", function (d) {
            return y(d.TimeToExtinguish);
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

        svgScatter2
            .selectAll("circle")
            .data(data)
            .transition()
            .duration(1000)
            .attr("cx", function (d) {
                return x(d.AcresBurned);
            })
            .attr("cy", function (d) {
                return y(d.TimeToExtinguish);
            });
    }

    function updateYPlot() {
        ylim = this.value;

        y.domain([0, ylim]);
        yAxis.transition().duration(1000).call(d3.axisLeft(y));

        svgScatter2
            .selectAll("circle")
            .data(data)
            .transition()
            .duration(1000)
            .attr("cx", function (d) {
                return x(d.AcresBurned);
            })
            .attr("cy", function (d) {
                return y(d.TimeToExtinguish);
            });
    }

    d3.select("#buttonXlim2").on("input", updatePlot);
    d3.select("#buttonYlim2").on("input", updateYPlot);
});
