class pfNode{
  constructor(data, f , g , h , x, y){
      this.f = f;
      this.g = g;
      this.h;
      this.visited = false;
      this.closed = false;
      this.parent = null;
      
      this.pos =[x,y]

  
      this.data=data;
      this.right =  null;
      this.left = null;
  }   
}
var astar = {
init: function(list) {
  let grid = [[1,2],
              [3,4],
              [5,6]];
  let counter = 0; 
  for(var x = 0; x < 3 ; x++){
    for(var i = 0 ; i < 2 ; i++){
      grid[x][i] = (new pfNode(list[counter][0] , list[counter][1] , list[counter][2], list[counter][3],list[counter][4][0], list[counter][4][1]));
      counter++;
    }
  }
    return grid;
  },
  //Search function of the nearby nodes.
  search: function(grid) {
    grid = astar.init(grid);
    start = grid[0][0];
    end = grid[grid.length-1][1];
    var openList   = [];
    var closedList = [];
    openList.push(start);
    
    
    while(openList != null) {
      console.log(openList);
      // Grab the lowest f(x) to process next
      var lowInd = 0;
      for(var i=0; i<openList.length; i++) {
        if(openList[i].f < openList[lowInd].f) {
          lowInd = i;
        }
      }
      var currentNode = openList[lowInd];
   
        // End case -- result has been found, return the traced path
        if(currentNode == end ) {
          var curr = currentNode;
          var ret = [];
          while(curr.parent) {
            ret.push(curr);
            curr = curr.parent;
          }
          return ret.reverse();
        }
        // Normal case -- move currentNode from open to closed, process each of its neighbors
        openList = astar.removeGraphNode(currentNode, openList);
        console.log(openList);

        closedList.push(currentNode);
        
        var neighbors = astar.neighbors(grid, currentNode);

        for(var i= 0; i<neighbors.length;i++) {
          var neighbor = neighbors[i];
          if(astar.findGraphNode(neighbor, closedList)) {
            // not a valid node to process, skip to next neighbor
            continue;
          }
   
          // g score is the shortest distance from start to current node, we need to check if
          //   the path we have arrived at this neighbor is the shortest one we have seen yet
          var gScore = currentNode.g + 1  ; // 1 is the distance from a node to it's neighbor
          var gScoreIsBest = false;
          // if(!astar.findGraphNode(neighbor, openList)) {
          //   // This the the first time we have arrived at this node, it must be the best
          //   // Also, we need to take the h (heuristic) score since we haven't done so yet
          //   gScoreIsBest = true;
            
          //   neighbor.h = astar.heuristic(neighbor.pos, end.pos);

          //   openList.push(neighbor);
          // }
          if(gScore < neighbor.g) {
            gScoreIsBest = true;
          }
   
          if(gScoreIsBest) {
            neighbor.parent = currentNode;
            neighbor.g = gScore;
            neighbor.f = neighbor.g + neighbor.h;
            neighbor.debug = "F: " + neighbor.f + "<br />G: " + neighbor.g + "<br />H: " + neighbor.h;
          }
        }
      }
   
      // No result was found -- empty array signifies failure to find path
      return [];
    },
    heuristic: function(pos0, pos1) {
      // This is the Manhattan distance
      console.log(pos1);
      var d1 = Math.abs (pos1[0] - pos0[0]);
      var d2 = Math.abs (pos1[1] - pos0[1]);
      return d1 + d2;
    },
    neighbors: function(grid, node) {
      var ret = [];
      var x = 1;
      var y = 1;
      
      for(let i = 0 ; i < grid.length ; i++){
        for(let j = 0; j < grid[i].length; j++){
          if(grid[i][j] == node){
            x=i;
            y=j;
          }
        }
      }     
      if(grid[x-1] && grid[x-1][y]) {
        ret.push(grid[x-1][y]);
      }
      if(grid[x+1] && grid[x+1][y]) {
        ret.push(grid[x+1][y]);
      }
      if(grid[x][y-1] && grid[x][y-1]) {
        ret.push(grid[x][y-1]);
      }
      if(grid[x][y+1] && grid[x][y+1]) {
        ret.push(grid[x][y+1]);
      }
      return ret;
    },

    findGraphNode: function(neighbour, list){
        for(let i  = 0 ; i < list.length; i++){
          if(neighbour == list[i]){
            return true;
          }
        }
        return false;
    },

    removeGraphNode: function(currentNode, openList){
      for(let i = 0; i<openList.length; i++){
        if(openList == currentNode){


          openList.splice(i,1);
        }
      }

    },
    showNode: function(x,y){


    }
  };

astar.search([["Classroom 1",6,0,6,[0,0]],["Outside1",6,1,5, [0,1]],["Outside2",6,2,4,[0,2]],["Outside3",6,3,3,[1,2]],["Outside4",6,4,2,[2,2]],["Outside5",6,5,1,[3,2]]]);
