function state_pie_chart_op() {

    // let data = [
    //     {
    //         os: "Android",
    //         share: 82.8
    //     },
    //     {
    //         os: "iOS",
    //         share: 13.9
    //     },
    //     {
    //         os: "Win",
    //         share: 2.6
    //     },
    //     {
    //         os: "BB",
    //         share: 2.6
    //     },
    //     {
    //         os: "",
    //         share: 0.3
    //     }
    // ];

    let width = 300;
    let height = 300;
    let radius = Math.min(width, height) / 2 - 10;

    // d3.select("#state_pie_chart_op")
    //     .append("g")
    //     .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    // A color scale for each of the slices
    let color = d3.scaleOrdinal()
        .range(['#b3e2cd',
            '#fdcdac',
            '#cbd5e8',
            '#f4cae4',
            '#e6f5c9']);

    // This creates a pie layout generator; if you give it a data set, it will
    // figure out the needed angles in order to draw a pie
    let pie = d3.pie();

    // Here we tell the pie generator which attribute
    // of the object to use for the layout
    pie.value(function (d) {
        return 2;
    });


    // Now that we've set up our generator, let's give it our data:
    let pieData = pie(high_points);
    // We'll log it to the console to see how it transformed the data:
    console.log('pieData:', pieData);

    // To make SVG pie slices, we still need more information - for that,
    // we'll create an arc generator, that takes the computed pie data, and
    // produces SVG path strings
    let arc = d3.arc();

    // Let's tell it how large we want it
    arc.outerRadius(radius);
    // We also need to give it an inner radius...
    arc.innerRadius(0);
    // If you change that number, it will give us donut slices instead of pie slices!


    // Let's test the arc generator, by giving it the first pie slice:
    console.log('first arc:', arc(pieData[0]));


    // We'll want a path and a text label for each slice, so first, we'll
    // create a group element:
    let groups = d3.select('#state_pie_chart_op')
        .selectAll("g")
        .data(pieData)
        .join("g");

    // Add the path, and use the arc generator to convert the pie data to
    // an SVG shape
    groups.append("path")
        .data(pieData)
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")")
        .attr("d", arc)
        // While we're at it, let's set the color of the slice using our color scale
       // .style("fill", d.Date == 'undefined date' ? 'grey' : 'blue')
        .attr('stroke', 'black');

        console.log(groups.data())

    // Now let's add a label
    groups.append("text")
    .attr('transform', `translate(100, 100)`)
        .text(d => d.data.State)
        // We need to move the label to the middle of the slice. Our arc generator
        // is smart enough to know how to do this. Notice that arc.centroid gives us the center of the visible wedge. 
        //.attr("transform", d => "translate(" + arc.centroid(d) + ")")
        // Finally some extra text styling to make it look nice:
        .attr("dy", ".35em")
        .style("text-anchor", "middle")
        .style("font-size", "10px");


}

function elevation_pie_chart_op() {



}
