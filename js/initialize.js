function read_in_user_data() {
    d3.select('#input_upload').on('change', handleFileSelect, false);
  }
  
  function handleFileSelect(event) {
    const reader = new FileReader()
    reader.onload = handleFileLoad;
    reader.readAsText(event.target.files[0])
  }
  
  function handleFileLoad(event) {
    let input_text = event.target.result;
    let line_splits = input_text.split(/\r?\n/);
    let text = '['
    for (let i = 0; i<51; i++){
       text = text + `,{"state" : "${line_splits[i].split(/\r?,/)[0]}", "peak": "${line_splits[i].split(/\r?,/)[1]}", "date" : "${line_splits[i].split(/\r?,/)[2]}" }`;
    }
    
    text = text.replace(',{"state" : "State", "peak": "High Point", "date" : "Date" },','');
    text = text + ']';
    let user_input = JSON.parse(text);

    for (i of user_input){
    i.date = new Date(i.date);
    }

    high_points = high_points.sort((a, b) => a.State.localeCompare(b.State));
    user_input = user_input.sort((a, b) => a.state.localeCompare(b.state));

    
    console.log(user_input);

    for (let i = 0; i<high_points.length; i++){
        high_points[i].Date = user_input[i].date;
    }



    visited_highpoints = high_points.filter(d => d.Date != 'Invalid Date');


    // Calculate cumulative ascent
    visited_highpoints = visited_highpoints.sort((a, b) => a.Date - b.Date);
    visited_highpoints[0].Cum_Elevation = visited_highpoints[0].Elevation

    for (let i = 1; i<visited_highpoints.length; i++){
        visited_highpoints[i].Cum_Elevation = visited_highpoints[i-1].Cum_Elevation + visited_highpoints[i].Elevation;
    }


    console.log(visited_highpoints);

    make_timeseries();
    state_pie_chart_op();
    
  }