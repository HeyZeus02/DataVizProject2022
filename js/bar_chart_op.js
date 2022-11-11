function gen_bar_chart(){
    let MARGIN = 20;
    let CHART_WIDTH = 800
    let CHART_HEIGHT = 400

    //let years_visited = Array.from(new Set(visited_highpoints.map(d =>d.Year)));
    
    let year_elevations = d3.rollup(visited_highpoints, v => d3.sum(v, d => d.Elevation), d => d.Year)
    
    year_elevations = Array.from(year_elevations, ([year, cum_elevation]) => ({
        year: year,
        cum_elevation: cum_elevation 
      }));
      console.log(year_elevations);

    

    // Create an xScale for the chart
    let bar_xScale = d3
        .scaleLinear()
        .domain(d3.extent(year_elevations.map(item => item.year)))
        .range([MARGIN+ MARGIN + MARGIN, CHART_WIDTH-MARGIN]);
      
        // Create an yScale for the chart
    let bar_yScale = d3
        .scaleLinear()
        .domain([0, d3.max(year_elevations.map(item => item.cum_elevation))])
        .range([CHART_HEIGHT - MARGIN - MARGIN, MARGIN]);

    // Add the X Axis to the g element in the SVG
    d3.select('#b_x-axis')
        .attr('transform', `translate(0,${CHART_HEIGHT - MARGIN})`)
        .call(d3.axisBottom(bar_xScale)
        .tickFormat(d3.format("d"))); 

    // Add the Y Axis to the g element in the SVG 
    d3.select('#b_y-axis')
        .call(d3.axisLeft(bar_yScale))
        .attr('transform', `translate(${MARGIN+MARGIN+MARGIN}, ${MARGIN})`);

    
    d3.select('#barchart_per_year_op')
      .select('#elevations')
      .selectAll('rect')
      .data(year_elevations)
      .join('rect')
      .attr("x", d => bar_xScale(d.year) -10)
      .attr("y", d => bar_yScale(d.cum_elevation) +MARGIN)
      .attr("width", 20)
      .attr("height", d => CHART_HEIGHT - bar_yScale(d.cum_elevation) - MARGIN-MARGIN);


}