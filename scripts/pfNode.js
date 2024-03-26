class pfNode{
    constructor(data, f , g , h , x, y){
        this.f = f;
        this.g = g;
        this.h = h;
        this.visited = false;
        this.closed = false;
        this.parent = null;
        this.pos =[x,y]

    
        this.data=data;
        this.next = null;
    }   
}
class List{
    constructor(){
        this.head = null;
        this.tail = null;
        this.length = 0;
    }
    add(data, f , g , h , cost){
        const newNode = new pfNode(data, f , g , h , cost);
        if(!this.head){
            this.head = newNode;
            this.tail = newNode;
        } else{
            this.tail.next = newNode;
            this.tail = newNode;
        }
        this.length++;
        return this;
    }
    printAll(){
        let current = this.head;
        while(current){
            console.log(current.data);
            console.log("Cost to get to current node + heuristics: " + current.f);
            console.log("Cost to get to current node: " + current.g);
            console.log("Heuristics: " + current.h);
            console.log("Position: " + current.pos);

            current = current.next;
        }
    }
}



var astar = {
    init: function(list) {
        let newlist = new List();
        for(var x = 0; x < list.length ; x++){   
            newlist.add(list[x][0] , list[x][1] , list[x][2], list[x][3]);
            
        }
        return newlist;
        newlist.printAll();
    },
    //Search function of the nearby nodes.
    search: function(grid) {
        var list = astar.init(grid);
        start = list.start;
        end = list.end; 
     
        var openList = grid;
        var closedList = new List;
        openList.push(start);
     
        while(openList.length > 0) {
     
          // Grab the lowest f(x) to process next
          var lowInd = 0;
          for(var i= 0; i<openList.length; i++) {
            if(openList.f < openList.f) { 
                lowInd = i; 
            }
          }
          var currentNode = list.head;
     
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
          openList.removeGraphNode(currentNode);
          closedList.push(currentNode);
          var neighbors = astar.neighbors(grid, currentNode);
     
          for(var i= 0; i<neighbors.length;i++) {
            var neighbor = neighbors[i];
            if(closedList.findGraphNode(neighbor) || neighbor.isWall()) {
              // not a valid node to process, skip to next neighbor
              continue;
            }
     
            // g score is the shortest distance from start to current node, we need to check if
            //   the path we have arrived at this neighbor is the shortest one we have seen yet
            var gScore = currentNode.g + 1; // 1 is the distance from a node to it's neighbor
            var gScoreIsBest = false;
     
     
            if(!openList.findGraphNode(neighbor)) {
              // This the the first time we have arrived at this node, it must be the best
              // Also, we need to take the h (heuristic) score since we haven't done so yet
     
              gScoreIsBest = true;
              neighbor.h = astar.heuristic(neighbor.pos, end.pos);
              openList.push(neighbor);
            }
            else if(gScore < neighbor.g) {
              // We have already seen the node, but last time it had a worse g (distance from start)
              gScoreIsBest = true;
            }
     
            if(gScoreIsBest) {
              // Found an optimal (so far) path to this node.   Store info on how we got here and
              //  just how good it really is...
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
        var d1 = Math.abs (pos1.x - pos0.x);
        var d2 = Math.abs (pos1.y - pos0.y);
        return d1 + d2;
      },
      neighbors: function(grid, node) {
        var ret = [];
        var x = node.pos.x;
        var y = node.pos.y;
     
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
      }
    };
astar.search([["Classroom 1",6,0,6,[0,0]],["Outside",6,1,5, [0,1]],["Outside",6,2,4,[0,2]],["Outside",6,3,3[1,2]],["Outside",6,4,2,[2,2]],["Outside",6,5,1,[3,2]]]);
