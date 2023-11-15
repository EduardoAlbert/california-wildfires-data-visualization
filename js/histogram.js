var margin = { top: 10, right: 30, bottom: 30, left: 40 },
    width = 760 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

var svgHistogram = d3
    .select("#histogram")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

d3.csv("./data/fires_by_year.csv", function (data) {
    var x = d3.scaleLinear().domain([2012, 2020]).range([0, width]);

    svgHistogram
        .append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x).tickFormat(d3.format("d")));

    var histogram = d3
        .histogram()
        .value(function (d) {
            return d.year;
        })
        .domain(x.domain())
        .thresholds(x.ticks(70));

    var bins = histogram(data);

    var y = d3.scaleLinear().range([height, 0]);
    y.domain([
        0,
        d3.max(bins, function (d) {
            return d.length;
        }) + 50,
    ]);
    svgHistogram.append("g").call(d3.axisLeft(y));

    var tooltip = d3
        .select("#histogram")
        .append("div")
        .style("opacity", 0)
        .attr("class", "tooltip")
        .style("background-color", "white")
        .style("border", "solid")
        .style("border-width", "1px")
        .style("border-radius", "5px")
        .style("padding", "10px");

    var showTooltip = function (d) {
        tooltip.transition().duration(100).style("opacity", 1);
        tooltip
            .html("Total: " + d.length)
            .style("left", d3.mouse(this)[0] + 20 + "px")
            .style("top", d3.mouse(this)[1] + "px");
    };
    var moveTooltip = function (d) {
        tooltip
            .style("left", d3.mouse(this)[0] + 20 + "px")
            .style("top", d3.mouse(this)[1] + "px");
    };

    var hideTooltip = function (d) {
        tooltip.transition().duration(100).style("opacity", 0);
    };

    svgHistogram
        .selectAll("rect")
        .data(bins)
        .enter()
        .append("rect")
        .attr("x", 1)
        .attr("transform", function (d) {
            return "translate(" + x(d.x0) + "," + y(d.length) + ")";
        })
        .attr("width", function (d) {
            return x(d.x1) - x(d.x0) - 1;
        })
        .attr("height", function (d) {
            return height - y(d.length);
        })
        .style("fill", "darkOrange")

        .on("mouseover", showTooltip)
        .on("mousemove", moveTooltip)
        .on("mouseleave", hideTooltip);
});
