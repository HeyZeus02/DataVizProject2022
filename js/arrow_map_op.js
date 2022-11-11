function gen_arrow_map() {
console.log('i');

        let arrow_data = visited_highpoints;

        for (let i = 0; i<visited_highpoints.length-1; i++){
            arrow_data[i].next_X = visited_highpoints[i+1].X;
            arrow_data[i].next_Y = visited_highpoints[i+1].Y;  
        }

        arrow_data.pop();

        console.log(arrow_data);





        // Set up the map projection
        const projection = d3.geoAlbersUsa().scale(800).translate([400, 200])
    
        // Set the projection to the path  
        let path = d3.geoPath()
            .projection(projection);
        
        // Add each state to the map
        d3.select("#arrow_map_op").select('#states').selectAll("path")
            .data(mapData.features)
            .join("path")
            .attr("d", path)
            .attr("id", d => d.id)        
            .attr('class','state')
            .attr('stroke', 'black')
            .attr('fill', 'white');
        
        // Add each highpoint to the map
        d3.select("#arrow_map_op").select('#highpoints')
            .selectAll('circle')
            .data(high_points)
            .join('circle')
            .attr("cx", d => projection([d.X, d.Y])[0])
            .attr("cy", d => projection([d.X, d.Y])[1])
            .attr("r", '5')
            .style("fill", "black");

        // Add each highpoint to the map
        d3.select("#arrow_map_op").select('#arrows')
            .selectAll('line')
            .data(arrow_data)
            .join('line')
            .attr("x1", d => projection([d.X, d.Y])[0])
            .attr("y1", d => projection([d.X, d.Y])[1])
            .attr("x2", d => projection([d.next_X, d.next_Y])[0])
            .attr("y2", d => projection([d.next_X, d.next_Y])[1])
            .style("stroke", "black");
}