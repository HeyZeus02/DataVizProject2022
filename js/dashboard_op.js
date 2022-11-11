function state_pie_chart_op() {



    let width = 300;
    let height = 300;
    let radius = Math.min(width, height) / 2 - 10;



    // Create pie Layout Generator
    let pie = d3.pie();

    // Set each slice to 2%
    pie.value(function (d) {
        return 2;
    });

    //let sort_data = Array.prototype.push.apply(visited_highpoints,high_points);
    
    //console.log(sort_data);
    let pieData = pie(high_points.sort((a, b) => b.Visited - a.Visited));

    // Create Arc Generator
    let arc = d3.arc();

    // Set outer and inner Radius
    arc.outerRadius(radius);
    arc.innerRadius(100);


    // Create a group element:
    let groups = d3.select('#state_pie_chart_op')
        .selectAll("g")
        .data(pieData)
        .join("g");

    // Append the Slice
    groups.append("path")
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")")
        .attr("d", arc)
        .style("fill", d => d.data.Date == 'Invalid Date' ? 'grey' : 'darkgray')
        .attr('stroke', 'black');

    let state_text = visited_highpoints.length+'/50'
    
    d3.select('#state_pie_chart_op')
        .append('g')
        .attr("transform", "translate(" + width / 2 + "," + (height / 2 - 10) + ")")
        .append('text')
        .text(state_text)
        .attr('text-anchor','middle')
        .attr('font-size', '20px');

    d3.select('#state_pie_chart_op')
        .append('g')
        .attr("transform", "translate(" + width / 2 + "," + (height / 2 + 10) + ")")
        .append('text')
        .text('Highpoints Visited')
        .attr('text-anchor','middle')
        .attr('font-size', '20px');   


    


}



function elevation_pie_chart_op() {

    let width = 300;
    let height = 300;
    let radius = Math.min(width, height) / 2 - 10;



    // Create pie Layout Generator
    let pie = d3.pie();

    // Set each slice to 2%
    pie.value(function (d) {
        return d.Elevation;
    });

    //let sort_data = Array.prototype.push.apply(visited_highpoints,high_points);
    
    //console.log(sort_data);
    let pieData = pie(high_points.sort((a, b) => b.Visited - a.Visited));

    // Create Arc Generator
    let arc = d3.arc();

    // Set outer and inner Radius
    arc.outerRadius(radius);
    arc.innerRadius(100);


    // Create a group element:
    let groups = d3.select('#elevation_pie_chart_op')
        .selectAll("g")
        .data(pieData)
        .join("g");

    // Append the Slice
    groups.append("path")
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")")
        .attr("d", arc)
        .style("fill", d => d.data.Date == 'Invalid Date' ? 'grey' : 'darkgray')
        .attr('stroke', 'black');

    let state_text = visited_highpoints.length+'/50'
    
    d3.select('#elevation_pie_chart_op')
        .append('g')
        .attr("transform", "translate(" + width / 2 + "," + (height / 2 - 10) + ")")
        .append('text')
        .text(state_text)
        .attr('text-anchor','middle')
        .attr('font-size', '20px');

    d3.select('#elevation_pie_chart_op')
        .append('g')
        .attr("transform", "translate(" + width / 2 + "," + (height / 2 + 10) + ")")
        .append('text')
        .text('Elevation Climbed')
        .attr('text-anchor','middle')
        .attr('font-size', '20px');   


}
