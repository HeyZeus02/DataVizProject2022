let mapData;
let high_points;
let table_data;
let input_data;
let visited_highpoints;

let headerData = [{sorted: false, ascending: false},  // used in sorting the table data
                  {sorted: false, ascending: false},
                  {sorted: false, ascending: false},
                  {sorted: false, ascending: false}];


async function loadData () {
  
    high_points = await d3.csv('data/high_points.csv');
  mapData = await d3.json('data/us-states.json');  
  return {high_points, mapData};
}


loadData().then((loadedData) => {
    

    
    console.log(high_points);
    
    for (i in high_points){
        
        high_points[i].X = parseFloat(high_points[i].X );
        high_points[i].Y = parseFloat(high_points[i].Y );
        high_points[i].Elevation = parseFloat(high_points[i].Elevation );
   }

    
    table_data = high_points;
    read_in_user_data()
    lp_map();
    lp_table();
    sort_data();

    
})


