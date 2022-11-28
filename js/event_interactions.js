function completed_states() {
    let state_name;
    let state_peak;
    let state_elevation;
    let state_status;
    let class_name = this.className.animVal;
    
   
    function stringify(num) {
        return num.toString().padStart(2, '0');
      }
      
      function formatDate(date) {
        return [          
          stringify(date.getMonth() + 1),
          stringify(date.getDate()),
          date.getFullYear(),
        ].join('-');
      }
    console.log(class_name);
    if (class_name == 'state'){
    // Select the hovered over state
        state_name = this.__data__.properties.name;
        state_peak = this.__data__.properties.Peak;
        state_elevation = this.__data__.properties.Elevation + ' Feet';
        state_status = this.__data__.properties.visited == 0 ? 'Not yet visited' : 'Visited on ' + formatDate(new Date(this.__data__.properties.Date));
        
    }

    else if (class_name == 'pc_1_slices' || class_name == 'pc_2_slices'){
        console.log(this.__data__.data)
        state_name = this.__data__.data.State;
        state_peak = this.__data__.data.Peak;
        state_elevation = this.__data__.data.Elevation + ' Feet';
        state_status = this.__data__.data.Visited == 0 ? 'Not yet visited' : 'Visited on ' + formatDate(new Date(this.__data__.data.Date));

        console.log(state_name);
    }



    // Change the line of all states back to 1
    d3.select('#completed_map_op')
        .select('#states')
        .selectAll('path')
        .attr('stroke-width', '1px');

    // Change the stroke of all slices in first piechart back to 1
        d3.selectAll('.pc_1_slices')
        .attr('stroke-width', '1px');

     // Change the stroke of all slices in second piechart back to 1
        d3.selectAll('.pc_2_slices')
        .attr('stroke-width', '1px');

    // change the line width of the state pie_chart
    d3.select('#completed_map_op')
        .select('#states')
        .select('#' + state_name.replace(' ',''))
        .attr('stroke-width', '3px')

    // change the line width of the state pie_chart
    d3.selectAll('.pc_1_slices_g')
      .select('#' + state_name.replace(' ',''))
      .attr('stroke-width', '3px')

    // change the line width of the state pie_chart
        d3.selectAll('.pc_2_slices_g')
        .select('#' + state_name.replace(' ',''))
        .attr('stroke-width', '3px')
    

    // Change the 2nd line of text to match the hovered circle
    d3.select('#state_output_op')
        .select('#state')
        .text(state_name);

    // Change the 2nd line of text to match the hovered circle
        d3.select('#state_output_op')
        .select('#high_point')
        .text(state_peak);

    // Change the third line of text to match the hovered circle
    d3.select('#state_output_op')
        .select('#elevation')
        .text(state_elevation);


    // Change the fourth line of text to match the hovered state
    d3.select('#state_output_op')
        .select('#status')
        .text(state_status);





        
  
   
}// end of completed_states




function barchart_tooltip() {

   

    // Select the hovered over state
    let state_data = this.__data__;

    // change the line width of the circle
    d3.select(this)
        .attr('stroke-width', '3px');

    // Unhide and position the tooltip. change the first line of text and color to match the given circle
    d3.select('#tooltip')
        .classed('hidden', false)
        .style('left', event.pageX +5 + 'px')
        .style('top', event.pageY+ 5 + 'px')
        .style('border-color', 'black')
        .select('#p_state')
        .text(state_data.State);

    // Change the 2nd line of text to match the hovered circle
    d3.select('#tooltip')
        .select('#p_peak')
        .text(state_data.Peak);

    // Change the third line of text to match the hovered circle
    d3.select('#tooltip')
        .select('#p_elevation')
        .text(state_data.Elevation + ' feet');




    // When not on circle put the tool tip and circle back to the way before
    d3.select('#barchart_per_year_op')
        .select('#elevations')
        .selectAll('rect')
        .on('mouseout', function(d){

            // Change the line weight of circle back
            d3.select(this).attr('stroke-width', '1px');

            // Hide the tooltip
            d3.select('#tooltip').classed('hidden',true);

        });
        
  
   
}

function year_tooltip() {

    d3.select('#barchart_per_year_op')
        .selectAll('div')
        .data([{'year': 2014, 'elevation': 5000}])
        .join('div')
        .attr('width', 100)
        .attr('height', 100)
        .attr('x', bar_xScale(2014))
        .attr('y', bar_yScale(5000))
        .attr('class','tooltip_arrow')
        .text('hhhh')
        .append('span')
        .attr('class','tooltiptext')
        .text('5000');



}

function update_landing_page_info(){

    if (this.id != '') {
        // Calculate the values to fill the selected highpoint info box on the landing page
        let state_name = this.id.replace('_tr','')
        state_name = state_name.replace('_',' ')
        let state_peak = high_points.filter(x => x.State == state_name)[0].Peak
        let state_elevation = high_points.filter(x => x.State == state_name)[0].Elevation +' ft'
        let state_wiki = high_points.filter(x => x.State == state_name)[0].Wiki

        // Set the stroke width of all the states back to 1 px
        d3.select("#summary_map_lp")
            .select('#states')
            .selectAll("path")
            .attr('class', 'unselected')

        // Set the stroke width of all table rows back to nothing
        d3.select("#predictionTableBody")
            .selectAll("tr")
            .attr('class', 'table_unselected');
            // .style('background-color', 'transparent');




        d3.select("#" + state_name.replace(' ','_') + "_tr")
            // .style('background-color', 'rgba(255, 255, 255, .8)');
            .attr('class', 'table_selected')


        // Set the stroke width of  the current state to 3px
        d3.select("#summary_map_lp")
            .select('#states')
            .select("#" + state_name.replace(' ','_'))
            .attr('stroke-width', '3px')
            .attr('class', 'selected');





        // Set the state to be selected state in selected highpoint info box
        d3.select('#high_point_info_lp')
            .select('#state')
            .text(state_name);

        // Set the elevation to be selected state in selected highpoint info box
        d3.select('#high_point_info_lp')
            .select('#high_point')
            .text(state_peak);

        // Set the elevation to be selected state in selected highpoint info box
        d3.select('#high_point_info_lp')
            .select('#elevation')
            .text(state_elevation);

        // Set the correct wikipedia link
        d3.select('#high_point_info_lp')
                .select('#wiki_link')
                .attr('href',state_wiki)
                .text('Wiki Entry');
    }

}

