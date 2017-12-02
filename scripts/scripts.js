function findNearestNeighbor(){

  var num1 = parseInt(document.getElementById("nneighbor").value);
  var size = adj_matrix_size;

  if (num1 > size || num1 < 1){
    var error = "Number cannot be bigger than: " + size + " OR Less than 1!"
    document.getElementById("demo").innerHTML = error;
  }

  else{

    var msg = document.getElementById("demo");

    var cities = adj_matrix;

    //holds string names of city

    var visited = [];

    //holds city order
    var order = [];

    var cost = [];

    var t0 = performance.now();

    //Initialize all to false
    for (var i = 0; i < num1; i++){
      visited.push(false);
    }
    var min = 99999999;

    var min_index = 0;
    var order_index = 0;
    var temp_min_index;
    var text;

    //initialize
    order[order_index++] = 0;
    visited[0] = true;

    for(var i = 0; i < num1; i++)
    {
      temp_min_index = min_index;
      min = 999999999;
      for(var j = 0; j < num1; j++){
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

    cost[0] = 0;

    for (var i = 1; i < num1 + 1; i++){
      cost [i] = cities[order[i-i]][order[i]];
    }

    var t1 = performance.now();

    cost[num1] = cost[num1-1] + cities[order[num1-1]][order[0]];

    text = "<table class='table table-bordered'><thead><tr><th>From</th><th>To</th><th>Travel Cost</th></tr></thead>";
    for (var i = 0; i < num1; i++){
      text += "<tr><td>" + city_names[order[i]] + "</td><td>" + city_names[order[i+1]] + "</td>";
      text += "<td>" + cost[i+1] + "</td></li>";
    }
    text += "</table>";

    var sum = 0;
    for (var i = 0; i < num1; i++){
      sum += cost[i];
    }

    text += "<table class='table table-bordered'><tr><th>Total Distance</th><th>Time to Compute (milliseconds)</th></tr>"
    text += "<tr><td>" + sum + "</td><td>" + Number((t1-t0).toFixed(5)); + "</td></tr>";
    text += "</table>";

    msg.innerHTML = text;
  }
}
