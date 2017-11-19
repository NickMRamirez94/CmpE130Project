//adj matrix representation of graph. Holds weights and is static
//this will be updated to include the graph that is in adjmatrixforJS.txt
var cities = [
              [0,5,7,1,8],
              [5,0,6,4,8],
              [7,6,0,2,7],
              [1,4,2,0,6],
              [8,8,7,6,0]
              ];
//holds string names of city
var city_names = ["Los Angeles", "Anaheim", "San Francisco", "San Jose", "Sacramento"];


function findNearestNeighbor(){
  var visited[SIZE];
  //holds city order
  var order[SIZE+2];

  //Initialize all to false
  for (var i = 0; i < SIZE; i++){
    visited.push(false);
  }
  var min = 99999999;

  var min_index = 0;
  var order_index = 0;
  var temp_min_index;

  //initialize
  order[order_index++] = 0;
  visited[0] = true;

  for(int i = 0; i < SIZE; i++)
  {
    temp_min_index = min_index;
    min = 999999999;
    for(var j = 0; j < SIZE; j++){
      if ((cities[j][min_index] != 0) && (cities[j][min_index] < min) && (visited[j] == false)){
        min = cities[j][min_index];
        temp_min_index = j;
      }
    }

    min_index = temp_min_index;
    visited[min_index] = true;
    order[order_index++] = min_index;
  }

  order[--order_index] = 0;

}
