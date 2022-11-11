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

        let line_data =[];

        for (let i = 0; i<visited_highpoints.length; i++){
            if (i == 0){
                line_data.push({Date: visited_highpoints[i].Date, Cum_Elevation:0, odd:false, mountain_top: visited_highpoints[i].Cum_Elevation});
                line_data.push({Date: visited_highpoints[i].Date, Cum_Elevation: visited_highpoints[i].Cum_Elevation, odd: true, mountain_bottom:0});
            }
            else {
                console.log(i);
                line_data.push({Date: visited_highpoints[i].Date , Cum_Elevation: visited_highpoints[i-1].Cum_Elevation, odd: false, mountain_top: visited_highpoints[i].Cum_Elevation});
                line_data.push({Date: visited_highpoints[i].Date , Cum_Elevation: visited_highpoints[i].Cum_Elevation, odd: true, mountain_bottom: visited_highpoints[i-1].Cum_Elevation});
            }
        }

        console.log(line_data)
        let m_width = 10;

            // Generate the line using D3 that will define the path element
        let lineGenerator = d3
            .line()
            .x((line_data) => xScale(line_data.Date))
            .y((line_data) => yScale(line_data.Cum_Elevation) + MARGIN);


        d3.select('#elevation_timeseries_op').select('#elevations')
            .selectAll('line')
            .data(line_data)
            .join('line')
            .attr('x1', d => d.odd == true ? xScale(d.Date) + m_width : xScale(d.Date) - m_width)
            .attr('y1', d => d.odd == true ? yScale(d.mountain_bottom)+MARGIN : yScale(d.Cum_Elevation)+MARGIN  )
            .attr('x2', d => xScale(d.Date))
            .attr('y2', d =>d.odd == true ?  yScale(d.Cum_Elevation)+MARGIN : yScale(d.mountain_top)+MARGIN)
            .attr('stroke-width', '2px')
            .attr('stroke', 'black');
        
        d3.select('#elevation_timeseries_op').select('#lines')
            .append('path')
            .datum(line_data)
            .attr('d', lineGenerator)
            .attr('stroke','black')
            .attr('fill', 'none');

            d3.select('#elevation_timeseries_op').select('#labels')
            .selectAll('text')
            .data(visited_highpoints)
            .join('text')
            .text(d => d.Peak +', ' + d.Abreviation)
            .attr('text-anchor', d => xScale(d.Date)-m_width > 200 ? 'end' : 'start')
            .attr('x', d => xScale(d.Date)-m_width > 200 ? xScale(d.Date)-m_width : xScale(d.Date)+m_width)
            .attr('y', d => yScale(d.Cum_Elevation - d.Elevation/2)+ MARGIN + 5);


}
