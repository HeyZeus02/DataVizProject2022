function make_timeseries(){
    let MARGIN = 20;
    let CHART_WIDTH = 800
    let CHART_HEIGHT = 400

        // Create an xScale for the chart
        xScale = d3
            .scaleTime()
            .domain(d3.extent(visited_highpoints.map(item => new Date(item.Date))))
            .range([MARGIN+ MARGIN + MARGIN, CHART_WIDTH-MARGIN])
            .nice();
      
        // Create an yScale for the chart
        yScale = d3
            .scaleLinear()
            .domain([0,d3.max(visited_highpoints.map(item => item.Cum_Elevation))])
            .range([CHART_HEIGHT - MARGIN - MARGIN, MARGIN]);

        // Add the X Axis to the g element in the SVG
        d3.select('#e_x-axis')
            .attr('transform', `translate(0,${CHART_HEIGHT - MARGIN})`)
            .call(d3.axisBottom(xScale)
                .tickFormat(d3.timeFormat("%b %Y"))); 
    
        // Add the Y Axis to the g element in the SVG 
        d3.select('#e_y-axis')
            .call(d3.axisLeft(yScale))
            .attr('transform', `translate(${MARGIN+MARGIN+MARGIN}, ${MARGIN})`);

        // let line_data;
        // line_data[0].Cum_Elevation = 0
        // line_data[0].Date = 

        //     for (let i = 1; i<visited_highpoints; i++){
        //     line_data[i*2] =
        //     line_data[(i*2)+1].Date = visited_highpoints[i].Date;
        //     line_data[(i*2)+1].Cum_Elevation = visited_highpoints[i-1].Cum_Elevation
        // }

            // Generate the line using D3 that will define the path element
        let lineGenerator = d3
            .line()
            .x((visited_highpoints) => xScale(visited_highpoints.Date))
            .y((visited_highpoints) => yScale(visited_highpoints.Cum_Elevation) + MARGIN);


        d3.select('#elevation_timeseries_op').select('#elevations')
            .selectAll('circle')
            .data(visited_highpoints)
            .join('circle')
            .attr('cx', d => xScale(d.Date))
            .attr('cy', d => yScale(d.Cum_Elevation)+MARGIN)
            .attr('r', 5)
            .attr('fill', 'black');
        
        d3.select('#elevation_timeseries_op').select('#lines')
            .append('path')
            .datum(visited_highpoints)
            .attr('d', lineGenerator)
            .attr('stroke','black')
            .attr('fill', 'none');

}
