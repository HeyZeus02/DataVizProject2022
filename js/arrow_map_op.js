function gen_arrow_map() {

        let arrow_data = visited_highpoints;

        for (let i = 0; i<visited_highpoints.length-1; i++){
            arrow_data[i].next_X = visited_highpoints[i+1].X;
            arrow_data[i].next_Y = visited_highpoints[i+1].Y;
            arrow_data[i].next_State = visited_highpoints[i+1].State;  
        }

        let last_state = arrow_data.pop();

        console.log(arrow_data);

        let c_arrow_data = arrow_data.concat(last_state)
        visited_highpoints = c_arrow_data;


        console.log(c_arrow_data);


        // Set up the map projection
        const projection = d3.geoAlbersUsa().scale(1500).translate([600, 400])
    
        // Set the projection to the path  
        let path = d3.geoPath()
            .projection(projection);
        
        // Add each state to the map
        d3.select("#arrow_map_op").select('#states').selectAll("path")
            .data(mapData.features)
            .join("path")
            .attr("d", path)
            .attr("id", d => d.properties.name.replace(' ',''))
            .attr('fill','white')       
            .attr('stroke','black')
            .attr('class','state');



        console.log(arrow_data)
        
        // Add each highpoint to the map
        d3.select("#arrow_map_op").select('#highpoints')
            .selectAll('circle')
            .data(high_points)
            .join('circle')
            .attr("cx", d => projection([d.X, d.Y])[0])
            .attr("cy", d => projection([d.X, d.Y])[1])
            .attr("r", '5')
            .attr('id', d => d.State.replace(' ','') + '_hp')
            .style("fill", function(d,i){
                if (d.State == arrow_data[0].State){return 'blue'}
                else if (d.State === last_state.State){return 'red'}
                else {return 'black'}
            });



        // Add each highpoint to the map
        d3.select("#arrow_map_op").select('#arrows')
            .selectAll('line')
            .data(arrow_data)
            .join('line')
            .attr("x1", d => projection([d.X, d.Y])[0])
            .attr("y1", d => projection([d.X, d.Y])[1])
            .attr("x2", d => projection([d.next_X, d.next_Y])[0])
            .attr("y2", d => projection([d.next_X, d.next_Y])[1])
            .attr("marker-end","url(#arrow)")
            .attr('id', d => d.State.replace(' ','') + '_' + d.next_State.replace(' ',''))
            // .attr('class','arrows');
            .attr('stroke','red')
            .attr('stroke-width', '4px');




            d3.select("#arrow_map_op").select('#arrows')
            .selectAll('line')
            .on('mouseover', highlight_arrows);

            d3.select("#arrow_map_op").select('#states')
            .selectAll('path')
            .on('mouseover', state_arrows);

            


            function highlight_arrows() {
                let selection = this.__data__


                d3.select('#arrow_map_op').selectAll('.state')
                    .attr('opacity', .1)

                d3.select('#arrow_map_op').selectAll('circle')
                    .attr('opacity', .1)

                d3.select('#arrow_map_op').selectAll('line')
                    .attr('opacity', .1)

                d3.select('#arrow_map_op')
                    .select('#' + selection.State.replace(' ',''))
                    .attr('opacity',1);

                d3.select('#arrow_map_op')
                    .select('#' + selection.next_State.replace(' ',''))
                    .attr('opacity',1);

                d3.select('#arrow_map_op')
                    .select('#' + selection.State.replace(' ','') + '_' + selection.next_State.replace(' ',''))
                    .attr('opacity',1)
                    .select('marker-end')
                    .attr('opacity',1);

                d3.select('#arrow_map_op')
                    .select('#' + selection.State.replace(' ','') + '_hp')
                    .attr('opacity',1);

                d3.select('#arrow_map_op')
                    .select('#' + selection.next_State.replace(' ','') + '_hp')
                    .attr('opacity',1);


                    // When not on circle put the tool tip and circle back to the way before
                d3.select("#arrow_map_op").select('#arrows')
                    .selectAll('line')
                    .on('mouseout', function(d){

                    d3.select('#arrow_map_op').selectAll('path')
                        .attr('opacity', 1)
    
                    d3.select('#arrow_map_op').selectAll('circle')
                        .attr('opacity', 1)
    
                    d3.select('#arrow_map_op').selectAll('line')
                        .attr('opacity', 1)

    });

    }

    function state_arrows() {
        let selection = this.__data__
        let ss = selection.properties.name;
        let state_list = c_arrow_data.map(d => d.State)    
        let position = state_list.indexOf(ss)

        if (state_list.includes(ss)){

            d3.select('#arrow_map_op').selectAll('.state')
                .attr('opacity', .1)

            d3.select('#arrow_map_op').selectAll('circle')
                .attr('opacity', .1)

            d3.select('#arrow_map_op').selectAll('line')
                .attr('opacity', .1)


            // Unobscure Current State    
            d3.select('#arrow_map_op')
                .select('#' + ss.replace(' ',''))
                .attr('opacity',1);

            d3.select('#arrow_map_op')
                .select('#' + ss.replace(' ','') + '_hp')
                .attr('opacity',1);

            // Unobscure Previous State
            if (position != 0) {
                d3.select('#arrow_map_op')
                    .select('#' + state_list[position - 1].replace(' ',''))
                    .attr('opacity',1);

                d3.select('#arrow_map_op')
                    .select('#' + state_list[position - 1].replace(' ','') + '_' + ss.replace(' ',''))
                    .attr('opacity',1)
                    .select('marker-end')
                    .attr('opacity',1);

                d3.select('#arrow_map_op')
                    .select('#' + state_list[position - 1].replace(' ','') + '_hp')
                    .attr('opacity',1);
            }

            // Unobscure Previous State
            if (position != state_list.length - 1) {
                d3.select('#arrow_map_op')
                    .select('#' + state_list[position + 1].replace(' ',''))
                    .attr('opacity',1);

                d3.select('#arrow_map_op')
                    .select('#' + ss.replace(' ','') + '_' + state_list[position + 1].replace(' ',''))
                    .attr('opacity',1)
                    .select('marker-end')
                    .attr('opacity',1);

                d3.select('#arrow_map_op')
                    .select('#' + state_list[position + 1].replace(' ','') + '_hp')
                    .attr('opacity',1);
            }

        }




            // When not on circle put the tool tip and circle back to the way before
        d3.select("#arrow_map_op").select('#states')
            .selectAll('path')
            .on('mouseout', function(d){

            d3.select('#arrow_map_op').selectAll('path')
                .attr('opacity', 1)

            d3.select('#arrow_map_op').selectAll('circle')
                .attr('opacity', 1)

            d3.select('#arrow_map_op').selectAll('line')
                .attr('opacity', 1)

});



}


}