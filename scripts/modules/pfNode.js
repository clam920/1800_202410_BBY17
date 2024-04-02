import { mapSVG } from "/scripts/modules/map.js";
import {
  userPosition,
  setupLocation,
  convertGeoToMap,
} from "/scripts/modules/location.js";

const listNode = [
  [
    "SE12_320", 
    4, 
    0, 
    4, 
    { x: 49.250200, y: -123.00200}//1
  ],

  [
    "Stairs Top",
    4,
    1,
    3,
    { x: 49.250075, y: -123.002 }, //2
  ],

  [
    "Bridge",
    5,
    2,
    3,
    { x: 49.25005376612112, y: -123.00173465751207 }, //3
  ],

  [
    "Stairs Bottom",
    4,
    2,
    2,
    { x: 49.250075, y: -123.0019 }, //4
  ],

  [
    "Stairs Top Inside",
    5,
    3,
    2,
    { x: 49.250058580920445, y: -123.00255809566634 }, //5
  ],

  [
    "OutsideNode",
    4,
    2,
    3,
    { x: 49.249999, y: -123.0012 }, //6
  ],

  [
    "Stairs Bottom Inside",
    5,
    4,
    1,
    { x: 49.250058580920445, y: -123.00255809566634 }, //7
  ],

  [
    "SW05_1840",
    4,
    0,
    4,
    { x: 49.25005, y: -123.0011 }, //8
  ],
];

class pfNode {
  /**
   *
   * @param {*} data
   * @param {Number} f
   * @param {Number} g
   * @param {Number} h
   * @param {Number} x
   * @param {Number} y
   */
  constructor(data, f, g, h, x, y) {
    this.data = data;
    /**@type {Number} */
    this.f = f;

    /**@type {Number} */
    this.g = g;

    /**@type {Number} */
    this.h;

    /**@type {Boolean} */
    this.visited = false;

    /**@type {Boolean} */
    this.closed = false;

    /**@type {pfNode} */
    this.parent = null;

    /**@type {Array<Number>} */
    this.pos = { x, y };
  }
}
var astar = {
  init: function (list) {
    let grid = [
      [1, 2],
      [3, 4],
      [5, 6],
      [7, 8],
    ];
    let counter = 0;
    for (var x = 0; x < grid.length; x++) {
      for (var i = 0; i < grid[i].length; i++) {
        grid[x][i] = new pfNode(
          list[counter][0],
          list[counter][1],
          list[counter][2],
          list[counter][3],
          list[counter][4].x,
          list[counter][4].y
        );
        counter++;
      }
    }
    return grid;
  },
  checkList: function (end) {
    for (var i = 0; i < listNode.length; i++) {
      if (listNode[i][0] == end) {
        return true;
      }
    }
    return false;
  },
  //Search function of the nearby nodes.
  search: await function (destination) {
    // console.log(grid);

    var grid = astar.init(listNode);
    if (!astar.checkList(destination)) {
      return null;
    }

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
        // console.log("destination reached");
        var curr = currentNode;
        var ret = [];
        while (curr.parent) {
          ret.push(curr);
          curr = curr.parent;
        }
        x;
        ret.push(start);
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
  showNode: function (grid) {
    // console.log(grid);

    if (grid == null) {
      alert("Destination does not exist");
      return null;
    }

    var newGroup = document.createElementNS("http://www.w3.org/2000/svg", "g");

    newGroup.setAttribute("id", "nodes");
    var maplocal = [];
    for (let i = 0; i < grid.length; i++) {
      var x = grid[i].pos.x;
      var y = grid[i].pos.y;
      var fakeGeo = {
        coords: {
          longitude: y,
          latitude: x,
        },
      };

      maplocal.push(convertGeoToMap(fakeGeo));
      var newNode = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "circle"
      );
      newNode.setAttribute("fill", "black");
      newNode.setAttribute("class", "pathfindingNode");
      newNode.setAttribute("cx", maplocal[i].x);
      newNode.setAttribute("cy", maplocal[i].y);
      newNode.setAttribute("r", 1);
      newGroup.append(newNode);
      // console.log(mapSVG);
      if (i >= 1) {
        var newLine = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "line"
        );
        newLine.setAttribute("x1", maplocal[i - 1].x);
        newLine.setAttribute("y1", maplocal[i - 1].y);
        newLine.setAttribute("x2", maplocal[i].x);
        newLine.setAttribute("y2", maplocal[i].y);
        newLine.setAttribute("style", "stroke:red;stroke-width:1");
        newLine.setAttribute("class", "pathfindingLine");
        newGroup.append(newLine);
      }
    }
    mapSVG.append(newGroup);
  },
};

export { astar, listNode };
