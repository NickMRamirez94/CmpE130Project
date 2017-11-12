#include <iostream>

const int SIZE = 5;
const int INFINITE = 999999999;

using namespace std;

class graph{
public:
  graph(); //default constructor
  void printGraph();
  void findMST();
private:
  int cities[SIZE][SIZE]; //adj matrix representation of graph. Holds weights
  int city_names[SIZE]; //holds string names of city
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
  };

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

/*
MAIN FUNCTION HERE
*/

int main(){

  graph G;

  return 0;
}
