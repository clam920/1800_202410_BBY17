import { mapSVG } from "/scripts/modules/map.js";
import { userPosition, convertGeoToMap } from "/scripts/modules/location.js";

const listNode = [
  [
    "SE12_320",
    4,
    0,
    4,
    { x: 49.2502, y: -123.002 }, //1
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
    { x: 49.2503, y: -123.002}, //3
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
    { x: 49.2503, y: -123.0011 }, //5
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
    { x: 49.25025, y: -123.0011 }, //7
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
  //this function intializes the list into a 2d array
  init: function (list) {
    //this is what the 2d array should look like on a grid
    let grid = [
      [1, 2],
      [3, 4],
      [5, 6],
      [7, 8],
    ];
    let counter = 0;
    //loops through the grid so it can be initalized to each index of the list
    for (var x = 0; x < grid.length; x++) {
      for (var i = 0; i < grid[i].length; i++) {
        //we make a list of pf nodes because it can hold all the important information that we need to calculate the best route
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
  /**
   * checks if the destination is within our system of nodes.
   * @param {pfNode} end
   * @returns
   */
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

    //loops through untill openList is empty
    while (openList != null) {
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
        //this loops backwards from the destination getting its parent node that we determined is the best route
        while (curr.parent) {
          ret.push(curr);
          curr = curr.parent;
        }
        ret.push(start);
        return ret.reverse();
      }

      // move currentNode from open to closed, process each of its neighbors
      openList = astar.removeGraphNode(currentNode, openList);
      closedList.push(currentNode);

      var neighbors = astar.neighbors(grid, currentNode);

      //loops through the neighbour nodes and gives them a f value so we can see if which neighbour is the best node to go to
      for (var i = 0; i < neighbors.length; i++) {
        var neighbor = neighbors[i];
        var fScore = currentNode.f;
        var gScoreIsBest = false;
        if (fScore <= neighbor.f) {
          gScoreIsBest = true;
        }
        //sets the current node to as the parent to the neighbor with the best f value so we can reverse the node in the future
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

  //this one gives returns a list of the nodes that are a neighbour of the current node
  neighbors: function (grid, node) {
    var ret = [];
    var x = 1;
    var y = 1;

    //sets the x and y values to the correct i and j value since i am using a 2d array
    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid[i].length; j++) {
        if (grid[i][j] == node) {
          x = i;
          y = j;
        }
      }
    }

    //this all checks which ones are the nighbour of the current node
    //this one checks for if its to the left of the node
    if (grid[x - 1] && grid[x - 1][y]) {
      ret.push(grid[x - 1][y]);
    }
    //it checks all the surrounding nodes around it and only appends to the back if its not null
    //this one checks to the right of the node
    if (grid[x + 1] && grid[x + 1][y]) {
      ret.push(grid[x + 1][y]);
    }
    //this one checks above
    if (grid[x][y - 1] && grid[x][y - 1]) {
      ret.push(grid[x][y - 1]);
    }
    //this one checks below
    if (grid[x][y + 1] && grid[x][y + 1]) {
      ret.push(grid[x][y + 1]);
    }
    return ret;
  },

  //checks if the given node exists in the given list
  findGraphNode: function (neighbour, list) {
    for (let i = 0; i < list.length; i++) {
      if (neighbour == list[i]) {
        return true;
      }
    }
    return false;
  },

  //removes the current node from open list
  removeGraphNode: function (currentNode, openList) {
    //loops through the openList
    for (let i = 0; i < openList.length; i++) {
      //if the any node equals openList we splice it aka delete it fromt he list
      if (openList[i] == currentNode) {
        currentNode.visited = true;
        openList.splice(i, 1);
        break;
      }
    }
    return openList;
  },

  //shows all the nodes in the system
  showNode: function (grid) {
    if (grid == null) {
      alert("Destination does not exist");
      return null;
    }

    var newGroup = document.createElementNS("http://www.w3.org/2000/svg", "g");

    newGroup.setAttribute("id", "nodes");
    var maplocal = [];
    for (let i = 0; i < grid.length; i++) {
      var x = grid[i][4].x;
      var y = grid[i][4].y;
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
      if (i == 0) {
        newNode.setAttribute("fill", "green");
      } else if (i == 7) {
        newNode.setAttribute("fill", "red");
      } else {
        newNode.setAttribute("fill", "black");
      }
      newNode.setAttribute("class", "pathfindingNode");
      newNode.setAttribute("cx", maplocal[i].x);
      newNode.setAttribute("cy", maplocal[i].y);
      newNode.setAttribute("r", 1);
      newGroup.append(newNode);
    }
    mapSVG.append(newGroup);
  },
  showPath: function (grid) {
    console.log(grid);

    //Checks if the room asked for is within the current node ssytem.
    if (grid == null) {
      alert("Destination does not exist");
      return null;
    }

    //Displays the destination popup.
    astar.destinationPopup();

    document
      .getElementById("pathButton")
      .addEventListener("click", function () {
        //Creatses the group element so lines can be drawn
        var newGroup = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "g"
        );

        newGroup.setAttribute("id", "nodes");
        var maplocal = [];
        //loops through the given nodes
        for (let i = 0; i < grid.length; i++) {
          var x = grid[i].pos.x;
          var y = grid[i].pos.y;
          var fakeGeo = {
            coords: {
              longitude: y,
              latitude: x,
            },
          };

          //creates the svg element circle
          maplocal.push(convertGeoToMap(fakeGeo));
          var newNode = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "circle"
          );
          //sets attributes to the circle svg and sets them to the correct relative map location
          newNode.setAttribute("class", "pathfindingNode");
          newNode.setAttribute("cx", maplocal[i].x);
          newNode.setAttribute("cy", maplocal[i].y);
          newNode.setAttribute("r", 1);
          newGroup.append(newNode);
          // console.log(mapSVG);

          //this draws the lines so they
          //we do greater than one because we need to connect the dots
          //so the total ammount of lines are less than total ammount of dots
          if (i >= 1) {
            var newLine = document.createElementNS(
              "http://www.w3.org/2000/svg",
              "line"
            );
            //sets the line attributes so it can be connected properly
            newLine.setAttribute("x1", maplocal[i - 1].x);
            newLine.setAttribute("y1", maplocal[i - 1].y);
            newLine.setAttribute("x2", maplocal[i].x);
            newLine.setAttribute("y2", maplocal[i].y);
            newLine.setAttribute("class", "pathfindingLine");
            newGroup.append(newLine);
          }
        }
        mapSVG.append(newGroup);
        document.getElementById("destinationPopup").remove();
      });
  },
  destinationPopup: function () {
    //Const of the html that im inserting after selecting the room we are navigating to
    const html =
      "<div id = 'destinationPopup'><p>Is this your destination?<button type='button' id = 'pathButton'>Path to</p></div>";

    document.querySelector("#mapArea").insertAdjacentHTML("afterend", html);
  },
};

export { astar, listNode };
