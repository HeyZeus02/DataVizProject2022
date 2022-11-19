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


function highlight_table() {
    
   

    // Select the hovered over state
    let state_name = this.__data__.properties.name



    d3.select(`#${state_name}_tr`)
        .style('background-color', 'black');

    //When not on in state
    d3.select("#summary_map_lp")
        .select('#states')
        .selectAll("path")
        .on('mouseout', function(d){

            let state_name = this.__data__.properties.name


        d3.select(`#${state_name}_tr`)
        .style('background-color', 'rgba(255, 255, 255, .8)');

        });
        
  
   
}// end of highlight_table

function highlight_states() {
   

    // Select the hovered over state
    let row_state = this.id.replace('_tr','')




    d3.select('#states')
    .select(`#${row_state}`)
        .style('fill', 'rgba(0, 0, 0, .1)');

    //When not on row
    d3.selectAll("tr")
        .on('mouseout', function(d){

            let row_state = this.id.replace('_tr','')


        d3.select(`#${row_state}`)
        .style('fill', 'rgba(255, 255, 255, .8)');

        });
        
  
   
}// end of highlight_states

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
        
  
   
}// 


   

//     // Select the hovered over state
//     let mean_data = this.__data__;

//     console.log('hello');

//     // change the line width
//     d3.select(this)
//         .attr('stroke','red')
//         .attr('stroke-width', '3px');

//     // Unhide and position the tooltip. change the first line of text and color to match the given circle
//     d3.select('#tooltip')
//         .classed('hidden', false)
//         .style('left', event.pageX +5 + 'px')
//         .style('top', event.pageY+ 5 + 'px')
//         .style('border-color', 'black')
//         .select('#p_state')
//         .text('Mean Line');

//     // Change the 2nd line of text to match the hovered circle
//     d3.select('#tooltip')
//         .select('#p_peak')
//         .text(`${this} Feet per Year`);

//     // Change the third line of text to match the hovered circle
//     d3.select('#tooltip')
//         .select('#p_elevation')
//         .text(`At this rate, expected completion in the year ${this}`);




//     // When not on circle put the tool tip and circle back to the way before
//     d3.select('#barchart_per_year_op')
//         .select('#mean_line')
//         .selectAll('line')
//         .on('mouseout', function(d){

//             // Change the line weight of circle back
//             d3.select(this).attr('stroke-width', '1px');

//             // Hide the tooltip
//             d3.select('#tooltip').classed('hidden',true);

//         });
        
  
   
// }// 


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

//     let svg = document.getElementById('barchart_per_year_op');
//     let pt = svg.createSVGPoint();
//     pt.x = screenXPosWithinSVG;
//     pt.y = screenYPosWithinSVG;


// // Transform it back to SVG coordinate space
//     let  svgCoord = pt.matrixTransform(svg.getCTM().inverse());

// // Place tooltip at (svgCoord.x, svgCoord.y)

//     let MARGIN = 20;
//     let barchart_element = document.getElementById("b_x-axis"); // barchart element
//     let x_bounding = barchart_element.getBoundingClientRect(); // bounding rectangle of barchart svg
//     let bound_left = x_bounding.x; // position of barchart svg
//     let bound_top = x_bounding.y; //position of barchart svg

//     console.log(bound_left);

//     console.log(d3.select(this).style('left'));




//     // Select the hovered over year
//     let year_selection = d3.select(this).select('text').data()[0];
//     console.log(year_selection);
//     let elevation_selection = year_elevations.filter(d => d.year === year_selection);
//     if (elevation_selection.length == 0){
//         elevation_selection = 0;
//     }
//     else {
//          elevation_selection = elevation_selection[0].cum_elevation;
//         }
//     console.log(elevation_selection);
//     // change the line width of the circle
//     d3.select(this)
//         .attr('font', '3px');

//     // Unhide and position the tooltip. change the first line of text and color to match the given circle
//     d3.select('.tooltip_arrow')
//         .classed('hidden', false)
//         .style('left', bound_left + 'px')
//         .style('top', bound_top + 'px');
//         // .style('left', bound_left + MARGIN*3 + bar_xScale(year_selection)  + 'px')
//         // .style('top', bound_top + (MARGIN + bar_yScale(elevation_selection)) + 'px')


//     d3.select('#tooltiptext')
//         .text(year_selection);

//     // // Change the 2nd line of text to match the hovered circle
//     // d3.select('#tooltip')
//     //     .select('#p_peak')
//     //     .text();

//     // // Change the third line of text to match the hovered circle
//     // d3.select('#tooltip')
//     //     .select('#p_elevation')
//     //     .text();




//     // When not on circle put the tool tip and circle back to the way before
//     d3.select('#barchart_per_year_op')
//         .select('#elevations')
//         .selectAll('rect')
//         .on('mouseout', function(d){

//             // Change the line weight of circle back
//             d3.select(this).attr('stroke-width', '1px');

//             // Hide the tooltip
//             d3.select('#tooltip').classed('hidden',true);

//         });

}