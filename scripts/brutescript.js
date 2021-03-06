

var best_distance = 999999999,
    best_path = [],
    count = 1;

var distance_map = adj_matrix;

var test_list = [4,3,2,1];


var swap = function (array, pos1, pos2)
{
  var temp = array[pos1];
  array[pos1] = array[pos2];
  array[pos2] = temp;
};

/*
Takes in a list of cities in path order, calculates the total sum of distances between each
of the locations, then performs a check on that distance agaisnt the best distance
found. If the new distance is better, it will update the best_distance and best_path
variables to the new path results.
*/

function brute_total_distance(working_list)
{
  console.log(working_list);
  var city_list = working_list.slice();
  var distance = distance_map[0][city_list[0]];
  for(var i = 0; i < city_list.length-1; i++)
  {
    distance += distance_map[city_list[i]][city_list[i+1]];
  }
  distance += distance_map[city_list[((city_list.length)-1)]][0];
  count++;
  if(distance < best_distance)
    {
      console.log("BEST", city_list, best_path, distance);
      best_distance = distance;
      best_path = city_list.slice();
      best_path.push(0);
      best_path.unshift(0);
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
  if (n === 1)
  {
    output(city_array);
  }
  else
  {
    for (var i = 1; i <= n; i += 1) {
      brute_force_path(city_array, output, n-1);
      if (n % 2)
      {
        var j = 1;
      }
      else
      {
        var j = i;
      }
      swap(city_array, j-1, n-1);
    }
  }
};


//Prints out the path table in HTML
function print_route_table(best_path)
{
  text = "<table class='table table-bordered'><tr><th>From</th>th>To</th><th>Travel Cost</th></tr>";
  for (var i = 0; i < best_path.length-1; i++)
  {
    text += "<tr><td>" + city_names[best_path[i]] + "</td>";
    text += "<td>" + city_names[best_path[i+1]] + "</td></li>";
    text += "<td>" + distance_map[i][i+1] + "</td></li>";
  }
  text += "</table>"
  msg.innerHTML = text;
};


//Creates a list of random cities to visit, not used in demo
function make_list_random(num1)
{
  var list = [];
  for(var i = 0; i < num1; )
  {
    var x = Math.floor(Math.random() * adj_matrix_size); ;
    if (!list.includes(x))
    {
      list.push(x);
      i++;
    }
  }
  console.log(list);
  test_list = list;
}

//Generate a non-random list of i cities
function make_list(num1)
{
  var list = [];
  for(var i = 0; i < num1; i++) list.push(i+1);
  test_list = list;
}

function brute_main()
{
  var num1 = parseInt(document.getElementById("nneighbor").value);
  var size = adj_matrix_size;

  if (num1 > size || num1 < 1)
  {
    var error = "Number cannot be bigger than: " + size + " OR Less than 1!"
    document.getElementById("demo").innerHTML = error;
  }

  else{

    var msg = document.getElementById("demo");
    console.log("Start here");
    var t0 = performance.now();
    best_distance = 999999999;
    make_list(num1);
    brute_force_path(test_list, brute_total_distance);
    var t1 = performance.now();
    console.log("Best Distance: ");
    console.log(best_distance);
    console.log("Best Path: ");
    console.log(best_path);
    text = "<table class='table table-bordered'><thead><tr><th>From</th><th>To</th><th>Travel Cost</th></tr></thead>";
    for (var i = 0; i < best_path.length-1; i++)
    {
      text += "<tr><td>" + city_names[best_path[i]] + "</td>";
      text += "<td>" + city_names[best_path[i+1]] + "</td></li>";
      text += "<td>" + distance_map[best_path[i]][best_path[i+1]] + "</td></li>";
    }
    text += "</table>"
    text += "<table class='table table-bordered'><tr><th>Total Distance</th><th>Time to Compute (milliseconds)</th></tr>";
    text += "<tr><td>" + best_distance + "</td>";
    text += "<td>" + Number((t1-t0).toFixed(5)); + "</td></li>";
    msg.innerHTML = text;
  }
};
