function gen_bar_chart() {

    let MARGIN = 20;
    let CHART_WIDTH = 800
    let CHART_HEIGHT = 400

    //let years_visited = Array.from(new Set(visited_highpoints.map(d =>d.Year)));
    
    year_elevations = d3.rollup(visited_highpoints, v => d3.sum(v, d => d.Elevation), d => d.Year);

    
    year_elevations = Array.from(year_elevations, ([year, cum_elevation]) => ({
        year: year,
        cum_elevation: cum_elevation 
        }));

    let yearly_mean = d3.sum(year_elevations, d => d.cum_elevation)/(d3.max(year_elevations.map(item => item.year)) - d3.min(year_elevations.map(item => item.year)));
    let finish_year = parseInt((total_elevation-feet_climbed)/yearly_mean + d3.max(year_elevations.map(item => item.year)));
    let mean_line_data = {'yearly_mean': yearly_mean, 'finish_year': finish_year};

    d3.select('#stats_g_op')
        .select('#by_elevation_average')
        .text(mean_line_data.yearly_mean.toFixed(2));

    d3.select('#stats_g_op')
        .select('#by_elevation_average_year')
        .text(mean_line_data.finish_year);    

    
    visited_highpoints = visited_highpoints.sort((a, b) => a.Year - b.Year);
    let c_y = visited_highpoints[0].Year;
    visited_highpoints[0].y_value = visited_highpoints[0].Elevation;


    for (let i = 1; i< visited_highpoints.length; i++) {
        if (visited_highpoints[i].Year == c_y){
            visited_highpoints[i].y_value = visited_highpoints[i-1].y_value + visited_highpoints[i].Elevation

        }
        else {
            c_y = visited_highpoints[i].Year;
            visited_highpoints[i].y_value = visited_highpoints[i].Elevation
        }

    }



    

    // Create an xScale for the chart
    let num_ticks = d3.max(year_elevations.map(item => item.year)) - d3.min(year_elevations.map(item => item.year))+ 2;


    bar_xScale = d3
        .scaleLinear()
        .domain([d3.min(year_elevations.map(item => item.year)) - 1, d3.max (year_elevations.map(item => item.year)) + 1])
        .range([MARGIN+ MARGIN + MARGIN , CHART_WIDTH-MARGIN]);
      
    // Create an yScale for the chart
    bar_yScale = d3
        .scaleLinear()
        .domain([0, d3.max(year_elevations.map(item => item.cum_elevation))]).nice()
        .range([CHART_HEIGHT - MARGIN - MARGIN, MARGIN]);

    // Add the X Axis to the g element in the SVG
    d3.select('#b_x-axis')
        .attr('transform', `translate(0,${CHART_HEIGHT - MARGIN*2})`)
        .call(d3.axisBottom(bar_xScale)
            .tickFormat(d3.format("y"))
            .ticks(num_ticks));

    // Add the Y Axis to the g element in the SVG 
    d3.select('#b_y-axis')
        .call(d3.axisLeft(bar_yScale))
        .attr('transform', `translate(${MARGIN+MARGIN+MARGIN}, ${0})`);

    d3.select('#barchart_per_year_op')
        .select('#mean_line')
        .selectAll('line')
        .data([mean_line_data])
        .join('line')
        .attr("x1", MARGIN*3)
        .attr("y1", bar_yScale(yearly_mean))
        .attr("x2", CHART_WIDTH - MARGIN)
        .attr("y2", bar_yScale(yearly_mean))
        .attr('stroke-width', '3px')
        .attr('stroke', 'grey');


    d3.select('#barchart_per_year_op')
      .select('#elevations')
      .selectAll('rect')
      .data(visited_highpoints)
      .join('rect')
      .attr("x", d => bar_xScale(d.Year) - ((CHART_WIDTH-MARGIN)/num_ticks - 6)/2  )
      .attr("y", d => bar_yScale(d.y_value))
      .attr("width", (CHART_WIDTH-MARGIN)/num_ticks - 6 )
      .attr("height", d => CHART_HEIGHT - bar_yScale(d.Elevation) -MARGIN -MARGIN)
    //   .attr('fill', 'white')
    //   .attr('stroke','black');
      .attr('class', 'op_elev_blocks');

    d3.select('#barchart_per_year_op')
        .select('#elevations')
        .selectAll('rect').on('mouseover', barchart_tooltip);

    d3.select('#barchart_per_year_op')
        .select('#mean_line')
        .selectAll('line').on('mouseover', meanline_tooltip);

    function meanline_tooltip() {
    

    // Unhide and position the tooltip. change the first line of text and color to match the given circle
    d3.select('#tooltip')
        .classed('hidden', false)
        .style('left', event.pageX +5 + 'px')
        .style('top', event.pageY+ 5 + 'px')
        .style('border-color', 'black')
        .select('#p_state')
        .text('Mean Elevation per Year:');

    // Change the 2nd line of text to match the hovered circle
    d3.select('#tooltip')
        .select('#p_peak')
        .text(mean_line_data.yearly_mean.toFixed(2) + ' ft');

    d3.select('#barchart_per_year_op')
        .select('#mean_line')
        .selectAll('line')
        .on('mouseout', function(d){

        // Hide the tooltip
        d3.select('#tooltip').classed('hidden',true);
        });
    }




    d3.select('.tooltiptext')
        .style('visibility', 'hidden');

    d3.select('#barchart_per_year_op')
        .select('#b_x-axis')
        .selectAll('g')
        .on('mouseover', show_elevation);

    function show_elevation(){
        let cy = this.__data__
        let ce;
        console.log(cy);
        if (year_elevations.map(d => d.year).includes(cy)){
            ce = year_elevations.filter(d => d.year == cy)[0].cum_elevation
        }
        else{ ce = 0}
        console.log(ce)
        let rect_bound = document.getElementById("barchart_per_year_op").getBoundingClientRect();

        d3.select('.tooltiptext')
            .text(ce + ' ft')
            .style('visibility', 'visible')


        d3.select('.tooltip')
        .style('left', rect_bound.left + bar_xScale(this.__data__) + 'px')
        .style('top', rect_bound.top + window.scrollY + bar_yScale(CHART_HEIGHT + ce)  + 'px')

        d3.select('#barchart_per_year_op')
            .select('#b_x-axis')
            .selectAll('g')
            .on('mouseout', function() {
                d3.select('.tooltiptext')
                .style('visibility', 'hidden')
                console.log('mouse')
            })
    }
    


        


        



}