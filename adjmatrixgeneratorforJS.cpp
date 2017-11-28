#include <iostream>
#include <stdlib.h>

const int SIZE = 370;

using namespace std;

int main(){

  int adjmatrix[SIZE][SIZE];
  int temp;

  for (int i = 0; i < SIZE; i++){
    for(int j = 0; j < i; j++){
      temp = rand() % 200;
      adjmatrix[i][j] = temp;
      adjmatrix[j][i] = temp;
    }
  }

  for(int i = 0; i < SIZE; i++){
    adjmatrix[i][i] = 0;
  }

  cout << "[" << endl;

  for(int i = 0; i < SIZE; i++){
    cout << "[";
    for(int j = 0; j < SIZE; j++){
        cout << adjmatrix[i][j];
        if(j != SIZE - 1){
          cout << ", ";
        }
    }
    if (i != SIZE - 1){
      cout << "]," << endl;
    }
    else{
      cout << "]";
    }
  }

  cout << endl << "]";
  return 0;
}
