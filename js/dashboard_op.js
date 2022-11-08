function state_pie_chart_op() {


    let pie_data =high_points.map(item => ({
        state: item.State,
        elevation: item.Elevation,
        value: 2.0,
        date: item.Date}));

    pie_data = pie_data.sort((a,b)=>{a.date - b.date});
    console.log(pie_data);
        


    let state_pie = d3.pie()
        .value(function(d) {return d.value; })

    //let data_ready = state_pie(d3.entries(pie_data))

    d3.select('#state_pie_chart_op')
        .select('#chart')
        .data(pie_data)
        .join('path')
        .attr('d', d3.arc()
            .innerRadius(0)
            .outerRadius(140))
        .attr("fill", function(d){
                if (d.Date != 'Invalid Date'){
                    return 'white'
                }
                else {return 'grey'}
            })
        .attr('stroke','black')

    

    
    // console.log('first arc:', arc(pie_data[0]));
    // d3.select('#state_pie_chart_op')
    //     .select('#label')
    //     .append("path")
    //     .attr("d", arc)
    //     .style("fill", function(d){
    //         if (d.Date != undefined){
    //             return 'white'
    //         }
    //         else {return 'grey'}
    //     })
    //     .append('text')
    //     .text(d => d.State);






}

function elevation_pie_chart_op() {



}
