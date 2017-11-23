

var best_distance = 999999999,
    best_path = [],
    blank_cities = [];

var distance_map =[
                  [0,5,7,1,8],
                  [5,0,6,4,8],
                  [7,6,0,2,7],
                  [1,4,2,0,6],
                  [8,8,7,6,0]
                  ];

var test_list = [1,2,3,4];
var city_names = ["Los Angeles", "Anaheim", "San Francisco", "San Jose", "Sacramento"];

var swap = function (array, pos1, pos2) 
{
  var temp = array[pos1];
  array[pos1] = array[pos2];
  array[pos2] = temp;
};

function brute_total_distance(city_list)
{
  console.log(city_list);
  var distance = distance_map[0][city_list[0]];
  for(var i = 0; i < city_list.length-1; i++)
  {
    distance += distance_map[city_list[i]][city_list[i+1]];
  }
  distance += distance_map[(city_list.length)-1][0];
  if(distance < best_distance)
    {
      best_distance = distance;
      best_path = city_list;
      best_path.push(0);
    }
};

/*
This creates all possible permutations of the given array using the 
Heap's algorthim found at
https://en.wikipedia.org/wiki/Heap's_algorithm
*/

function brute_force_path(city_array, output, n)
{  
 n = n || city_array.length;
  if (n === 1) {
    output(city_array);
  } else {
    for (var i = 1; i <= n; i += 1) {
      brute_force_path(city_array, output, n - 1);
      if (n % 2) {
        var j = 1;
      } else {
        var j = i;
      }
      swap(city_array, j - 1, n - 1);
    }
  }
};


  console.log("Start here");
  brute_force_path(test_list, brute_total_distance);
  console.log("Best Distance: ");
  console.log(best_distance);
  console.log("Best Path: ");
  console.log(best_path);

