// function state_tooltip() {
   

//     // Select the hovered over state
//     let state_data = this.__data__;

//     // change the line width of the circle
//     d3.select(this)
//         .attr('stroke-width', '3px');

//     // Unhide and position the tooltip. change the first line of text and color to match the given circle
//     d3.select('#tooltip')
//         .classed('hidden', false)
//         .style('left', event.clientX+5 + 'px')
//         .style('top', event.clientY+ 5 + 'px')
//         .style('border-color', 'black')
//         .select('#p_state')
//         .text(state_data.State);

//     // Change the 2nd line of text to match the hovered circle
//     d3.select('#tooltip')
//         .select('#p_peak')
//         .text(state_data.Peak);

//     // Change the third line of text to match the hovered circle
//     d3.select('#tooltip')
//         .select('#p_elevation')
//         .text(state_data.Elevation);




//     // When not on circle put the tool tip and circle back to the way before
//     d3.select("#summary_map_lp")
//         .select('#states')
//         .selectAll("path")
//         .on('mouseout', function(d){

//             // Change the line weight of circle back
//             d3.select(this).attr('stroke-width', '1px');

//             // Hide the tooltip
//             d3.select('#tooltip').classed('hidden',true);

//         });
        
  
   
// }// end of mouseover_tooltip


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

    console.log(row_state);


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