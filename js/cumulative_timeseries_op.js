function make_timeseries(){
    let MARGIN = 20;
    let CHART_WIDTH = 800
    let CHART_HEIGHT = 400

        // Create an xScale for the chart
        xScale = d3
            .scaleTime()
            .domain(d3.extent(visited_highpoints.map(item => new Date(item.Date))))
            .range([MARGIN, CHART_WIDTH-MARGIN]);
      
        // Create an yScale for the chart
        yScale = d3
            .scaleLinear()
            .domain(d3.extent(visited_highpoints.map(item => item.Cum_Elevation)))
            .range([CHART_HEIGHT - MARGIN - MARGIN, MARGIN]);

        // Add the X Axis to the g element in the SVG
        d3.select('#e_x-axis')
            .attr('transform', `translate(0,${CHART_HEIGHT - MARGIN})`)
            .call(d3.axisBottom(xScale)
                .tickFormat(d3.timeFormat("%b %Y"))); 
    
        // Add the Y Axis to the g element in the SVG 
        d3.select('#e_y-axis')
            .call(d3.axisLeft(yScale))
            .attr('transform', `translate(${MARGIN}, ${MARGIN})`);


        d3.select('#elevations')
            .selectAll('circle')
            .data(visited_highpoints)
            .join('circle')
            .attr('cx', d => xScale(d.Date))
            .attr('cy', d => yScale(d.Cum_Elevation))
            .attr('r', 5)
            .attr('fill', 'black');

}