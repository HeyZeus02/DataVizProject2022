let mapData; // This holds json with all the us states in it to be mapped
let high_points; // This has information for each state
let table_data; // This is the data that populates the table
let input_data; // This is the read in csv from the user
let visited_highpoints; // Ths is a filtered list of only highpoints that the user has visited
let path1;
let path2;
let path3;
let total_elevation;
let feet_climbed;
let year_elevations;
let bar_xScale;
let bar_yScale; 


let headerData = [{sorted: false, ascending: false},  // used in sorting the table data
                  {sorted: false, ascending: false},
                  {sorted: false, ascending: false},
                  {sorted: false, ascending: false}];


async function loadData () {
  
  high_points = await d3.csv('data/high_points.csv'); // Load in the csv containing data on each high point
  mapData = await d3.json('data/us-states.json'); // Load in the json containing the state boundaries
  return {high_points, mapData};
}


loadData().then((loadedData) => {
    

    
    console.log(high_points);
    
    for (i in high_points){
        
        high_points[i].X = parseFloat(high_points[i].X ); //parse the data
        high_points[i].Y = parseFloat(high_points[i].Y );
        high_points[i].Elevation = parseFloat(high_points[i].Elevation );
    }

    
    table_data = high_points; // Initializes the table_data to have all the high point information

    // Call the functions
    read_in_user_data();
    create_tabs();
    lp_map();
    lp_table();
    sort_data();

    



    
})


