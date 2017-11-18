#include <iostream>
#include <iomanip>

const int SIZE = 5;
const int INFINITE = 999999999;

using namespace std;

/*
MST is actually probably not going to work for this problem the way it is
because it can visit a node more than once. The traveling salesman states that
you only visit a node one time. Look into Christofides Algorithm or a Dynamic
Programming solution.
*/

class graph{
public:
  graph(); //default constructor
  void printGraph();
  void findMST();
  void findNearestNeighbor(); //STILL NEED TO DO
  void findBruteForce(); //STILL NEED TO DO
private:
  //adj matrix representation of graph. Holds weights and is static
  int cities[SIZE][SIZE] = {
                            {0,5,7,1,8},
                            {5,0,6,4,8},
                            {7,6,0,2,7},
                            {1,4,2,0,6},
                            {8,8,7,6,0}
                            };
  //holds string names of city
  string city_names[SIZE] = {"Los Angeles", "Anaheim", "San Francisco", "San Jose", "Sacramento"};
  void printMST(int mst[], int v); //used by findMST to print the MST

  /*returns the index of the minimum value for the vertices that
  need to be checked. The values that need to be checked are the ones that
  are not in the MST. Therefore, we pass the boolean set as well.
  */
  int minValue(int values[], bool set[]);
};

//default constructor. Initialize graph and city names STILL NEED TO DO
graph::graph(){
  //initilize diagonal across matrix
  for(int i = 0; i < SIZE; i++)
    cities[i][i] = 0;

  }

/*
void graph::findNearestNeighbor(){
  int MST[SIZE];
}
*/

void graph::printGraph(){
  //top row format
  cout << "   ";
  for (int i = 0; i < SIZE; i++){
    cout << " 00" << i+1;
  }
  cout << endl;
  //printing separation character '-'
  for(int i = 0; i < SIZE * 5; i++){
    cout << "-";
  }
  cout << endl;
  //printing off the interior
  for (int i = 0; i < SIZE; i++){
    cout << "00" << i+1;
    for(int j = 0; j < SIZE; j++){
      cout << cities[i][j] << " ";
    }
    cout << endl;
  }
}

void graph::printMST(int mst[], int v){

	int sum = 0;

	for(int i = 1; i < SIZE; i++){
		cout << city_names[mst[i]] << " - " << city_names[i] << endl;
		sum += cities[i][mst[i]];
	}

	cout << endl << "TOTAL WEIGHT: " << sum << endl;
}

int graph::minValue(int values[], bool set[]){
	int minimum_ind;
	int minimum = INFINITE;

	for (int i = 0; i < SIZE; i++)
	{
		if((values[i] < minimum) && (set[i] != true)){
			minimum_ind = i;
			minimum = values[i];
		}
	}

	return minimum_ind;
}

/*
the idea here is to use three arrays. One array holds a boolean
value, which tells whether the index element is in the minimum
spanning tree. Another array holds the nodes in the minimum spanning
tree. The last array holds the value of the vertices.
*/
void graph::findMST(){

	bool set[SIZE];	//tells if in MST
	int values[SIZE]; //holdsa values of vertices
	int mst[SIZE]; //holds nodes in minimum spanning tree

	//initialize set array and values to infinite and false
	//since they're not in MST yet
	for(int i = 0; i < SIZE; i++){
		values[i] = INFINITE;
	}
	for (int i = 0; i < SIZE; i++){
		set[i] = false;
	}

	//starts from the first node
	//mark the value of that first node to 0
	mst[0] = -1;
	values[0] = 0;

	for (int i = 0; i < SIZE - 1; i++)
	{
		//will return the minimum value from the set of nodes
		//not set in the MST
		int k = minValue(values, set);

		//add that value to the minimum spanning tree
		set[k] = true;

		//here were going to alter the value of the adjacent vertices
		//of the node that was just added to the MST set. make sure to check
		//that the adjacenct vertex being looked at isn't already in the
		//minimum spanning tree. make sure to only update value if the
		//the value is smaller than the current value of the vertex
		for(int j = 0; j < SIZE; j++)
		{
			if(cities[k][j] && set[j] == false && cities[k][j] < values[j])
			{
				mst[j] = k;
				values[j] = cities[k][j];
			}

		}
	}

	printMST(mst, SIZE);
}

void graph::findNearestNeighbor(){
  //need to fill in

  bool visited[SIZE];
  //holds city order
  int order[SIZE+2];

  //Initialize all to false
  for (int i = 0; i < SIZE; i++){
    visited[i] = false;
  }
  int min = INFINITE;

  int min_index = 0;
  int order_index = 0;
  int temp_min_index;

  //initialize
  order[order_index++] = 0;
  visited[0] = true;

  for(int i = 0; i < SIZE; i++)
  {
    temp_min_index = min_index;
    min = INFINITE;
    for(int j = 0; j < SIZE; j++){
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

  cout << "The order is: ";
  for (int i = 0; i < SIZE + 1; i++){
    cout << city_names[order[i]];
    if (i < SIZE){
      cout << " --> ";
    }
  }

  cout << endl;

}

void graph::findBruteForce(){
  //need to fill in
}

void printMenu(){
  cout << setw(5);
  for(int i = 0; i < 35; i++){
    cout << '-';
  }
  cout << endl << setw(5);
  cout << '|' << setw(17) << "MENU" << setw(17) << '|';
  cout << endl << setw(5);
  for(int i = 0; i < 35; i++){
    cout << '-';
  }
  cout << endl;
  cout << "\n\n     WELCOME TO THE TRAVELING SALESMAN SOLUTION\n";
  cout << "\n\n     Please choose from the following:\n";
  cout << "     " << "1. Solve using Minimum Spanning Tree\n";
  cout << "     " << "2. Solve using a Nearest Neighbor Algorithm\n";
  cout << "     " << "3. Solve using Brute Force *NOT RECOMMENDED*\n";
  cout << "     " << "4. Quit\n";
}

/*
MAIN FUNCTION HERE
*/

int main(){

  graph G;

  int choice = -1;
  do{
    printMenu();
    cin >> choice;
    if (choice < 1 || choice > 4)
    {
      cout << "INVALID CHOICE! PLEASE CHOOSE AGAIN\n";
    }

    switch(choice){
      case 1:
      {
        G.findMST();
        break;
      }
      case 2:
      {
        G.findNearestNeighbor();
        break;
      }
      case 3:
      {
        break;
      }
      case 4:
      {
        cout << "\nGoodbye!\n";
        break;
      }
      default:
      {
        cout << "SORRY INVALID\n";
      }
    }

  }while(choice > 0 && choice < 4);

  return 0;
}
