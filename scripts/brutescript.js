

var best_distance = 999999999,
    best_path = new Array();
    current_cities = new Array();

var distance_map =[
                  [0,5,7,1,8],
                  [5,0,6,4,8],
                  [7,6,0,2,7],
                  [1,4,2,0,6],
                  [8,8,7,6,0]
                  ];

var test_list = [1,2,3,4,5];
var city_names = ["Los Angeles", "Anaheim", "San Francisco", "San Jose", "Sacramento"];

function brute_total_distance(city_list)
{
  var distance = distance_map[0][city_list[0]];
  for(var i = 0; i < city_list.length-1; i++)
  {
    distance += distance_map[city_list[i]][city_list[i+1]];
  }
  distance += distance_map[city_list[city_list.length-1]][0];
  return distance;
}

function brute_force_path(best_path, best_distance, current_cities, remaining_cities)
{

    if(remaining_cities.length === 0)
    {
      if(brute_total_distance(current_cities) < best_distance)
      {
        best_distance = brute_total_distance(current_cities);
        best_path = current_cities;
      }
    }
    else
    {
      for(var i = 0; i < remaining_cities.length; i++)
      {
        var temp_current = current_cities;
        var temp_remaining = remaining_cities;
        temp_current.push(temp_remaining[i]);
        temp_remaining.splice(i,1);
        brute_force_path(best_path, best_distance, temp_current, temp_remaining);
      }
    }
  }

  brute_force_path(best_path, best_distance, 0, test_list);
  console.log("Best Distance: ");
  console.log(best_distance);
  console.log("\nBest Path: ");
  console.log(best_path);

