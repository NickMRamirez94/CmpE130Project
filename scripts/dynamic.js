var msg = document.getElementById("demo");
var cities = [
              [0,5,7,1,8],
              [5,0,6,4,8],
              [7,6,0,2,7],
              [1,4,2,0,6],
              [8,8,7,6,0]
              ];
//holds string names of city
var city_names = ["Los Angeles", "Anaheim", "San Francisco", "San Jose", "Sacramento"];

var size = 5;

var visited = [];

//holds city order
var order = [];
var order_counter = 0;

var cost = [];

var t1 = 0;
var t2 = 0;
var total_time = 0;

function dynamic(){
  t0 = performance.now();
  var num1 = parseInt(document.getElementById("nneighbor").value);

  if (num1 > size || num1 < 1){
    var error = "Number cannot be bigger than: " + size + " OR Less than 1!"
    document.getElementById("demo").innerHTML = error;
  }

  else{
    //initialize visited array
    for(var i = 0; i < num1; i++){
      visited[i] = false;
    }
    dynamicHelper(0);
    t1 = performance.now();
    total_time = t1 = t0;

    var text;
    text = "<table style='width:75%'><tr><th>From</th><th>To</th><th>Travel Cost</th></tr>";
    for (var i = 0; i < num1; i++){
      text += "<tr><td>" + city_names[order[i]] + "</td><td>" + city_names[order[i+1]] + "</td>";
      text += "<td>" + cost[i+1] + "</td></li>";
    }
    text += "</table>"

    console.log(total_time);

    text += "<table style='width:60%'><tr><th>Total Distance</th><th>Time to Compute (milliseconds)</th></tr>"
    text += "<tr><td>" + cost[num1] + "</td><td>" + Number((total_time).toFixed(10)); + "</td></tr>"
    text += "</table>"

    msg.innerHTML = text;
  }
}

function least(c)
{
    var nc=999;
    var min=999;

    for(var i=0;i < size;i++)
    {
        if((cities[c][i]!=0)&&(visited[i]==false))
            if(cities[c][i] < min)
            {
                min=cities[c][i];
                nc=i;
            }
    }

    if(min!=999){
      cost[order_counter] = min;
    }
    return nc;
}

function dynamicHelper(city)
{

    var ncity;

    visited[city]=true;

    order[order_counter++] = city;

    ncity=least(city);

    console.log("Next City: ");
    console.log(ncity);

    //visited all cities so tack on starting city
    if(ncity==999)
    {
        ncity=0;
        order[order_counter] = ncity;
        cost[order_counter] = cities[order[order_counter-1]][order[order_counter]];

        return;
    }
    else{
      dynamicHelper(ncity);
    }
}
