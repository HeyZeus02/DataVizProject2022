function lp_map() {  
   

    // Set up the map projection
    const projection = d3.geoAlbersUsa().scale(1300).translate([487.5, 305])
    


    // Set the projection to the path  
    let path = d3.geoPath()
        .projection(projection);
    
   // Add each state to the map
    d3.select("#summary_map_lp").select('#states').selectAll("path")
        .data(mapData.features)
        .join("path")
        .attr("d", path)
        .attr("id", d => d.id)        
        .attr('class','state')
        .attr('stroke', 'black')
        .attr('fill', 'white');
    
    // Add each highpoint to the map
    d3.select("#summary_map_lp").select('#highpoints')
        .selectAll('circle')
        .data(high_points)
        .join('circle')
        .attr("cx", d => projection([d.X, d.Y])[0])
        .attr("cy", d => projection([d.X, d.Y])[1])
        .attr("r", '5')
        .style("fill", "black");


} // End of lp_map