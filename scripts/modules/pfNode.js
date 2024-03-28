class pfNode {
  constructor(data, f, g, h, x, y) {
    this.data = data;
    this.f = f;
    this.g = g;
    this.h;
    this.visited = false;
    this.parent = null;

    this.pos = [x, y]


    this.right = null;
    this.left = null;
  }
}
var astar = {
  init: function (list) {
    let grid = [
      [1, 2],
      [3, 4],
      [5, 6]];
    let counter = 0;
    for (var x = 0; x < grid.length; x++) {
      for (var i = 0; i < grid[i].length; i++) {
        grid[x][i] = (new pfNode(list[counter][0], list[counter][1], list[counter][2], list[counter][3], list[counter][4][0], list[counter][4][1]));
        counter++;
      }
    }
    return grid;
  },
  //Search function of the nearby nodes.
  search: async function (grid) {
    console.log(grid);
    grid = astar.init(grid);

    var start = grid[0][0];
    var end = grid[grid.length - 1][1];
    var openList = [];
    var closedList = [];

    //Give open list the full list of the nodes in a 1d format
    for (let i = 0; i < grid.length; i++) {
      for (var x = 0; x < grid[i].length; x++) {
        openList.push(grid[i][x]);
      }
    }
    var test;


    while (openList != null) {

      // Grab the lowest f(x) to process next
      var lowInd = 0;
      for (var i = 0; i < openList.length; i++) {
        if (openList[i].f < openList[lowInd].f) {
          lowInd = i;
        }
      }
      var currentNode = openList[lowInd];


      // result has been found, return the traced path
      if (currentNode == end) {
        console.log("destination reached");
        var curr = currentNode;
        var ret = [];
        while (curr.parent) {
          ret.push(curr);
          curr = curr.parent;
        }
        return ret.reverse();
      }

      // move currentNode from open to closed, process each of its neighbors
      openList = astar.removeGraphNode(currentNode, openList);
      closedList.push(currentNode);

      var neighbors = astar.neighbors(grid, currentNode);

      for (var i = 0; i < neighbors.length; i++) {
        var neighbor = neighbors[i];
        var fScore = currentNode.f;
        var gScoreIsBest = false;
        if (fScore <= neighbor.f) {
          gScoreIsBest = true;
        }


        if (gScoreIsBest && neighbor.visited == false) {
          neighbor.parent = currentNode;
        }
      }
    }

    // empty array signifies failure to find path
    return [];
  },
  // We do not need a function because we will be hard coding in the function
  // heuristic: function (pos0, pos1) {
  //   // This is the Manhattan distance
  //   var d1 = Math.abs(pos1[0] - pos0[0]);
  //   var d2 = Math.abs(pos1[1] - pos0[1]);
  //   return d1 + d2;
  // },
  neighbors: function (grid, node) {
    var ret = [];
    var x = 1;
    var y = 1;

    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid[i].length; j++) {
        if (grid[i][j] == node) {
          x = i;
          y = j;
        }
      }
    }
    if (grid[x - 1] && grid[x - 1][y]) {
      ret.push(grid[x - 1][y]);
    }
    if (grid[x + 1] && grid[x + 1][y]) {
      ret.push(grid[x + 1][y]);
    }
    if (grid[x][y - 1] && grid[x][y - 1]) {
      ret.push(grid[x][y - 1]);
    }
    if (grid[x][y + 1] && grid[x][y + 1]) {
      ret.push(grid[x][y + 1]);
    }
    return ret;
  },

  findGraphNode: function (neighbour, list) {
    for (let i = 0; i < list.length; i++) {
      if (neighbour == list[i]) {
        return true;
      }
    }
    return false;
  },

  removeGraphNode: function (currentNode, openList) {
    for (let i = 0; i < openList.length; i++) {
      if (openList[i] == currentNode) {
        currentNode.visited = true;
        openList.splice(i, 1);
        break;
      }
    }
    return openList;

  },
  showNode: function (x, y) {


  }
};

export { astar }


