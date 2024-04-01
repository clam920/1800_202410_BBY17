import { ScreenPixelPosition, setupMap } from "./modules/map.js";
import { userPosition, setupLocation, convertGeoToMap } from "./modules/location.js";
import { astar } from "./modules/pfNode.js";

var aStar;
function setupMainPage() {
  setupMap();
  setupLocation();
  aStar = astar;
  aStar.init;
  console.log(aStar.search(
    [
      [
        "Classroom 1", 3, 0, 3, [0, 0]
      ],
      [
        "Outside1", 4, 1, 3, [0, 1]
      ],
      [
        "Outside2", 3, 1, 2, [0, 2]
      ],
      ["Outside3", 3, 2, 1, [1, 2]
      ],
      [
        "Outside4", 3, 2, 1, [2, 2]
      ],
      [
        "Outside5", 3, 3, 0, [3, 2]
      ]
    ]
  ));
}


/**TODO
 * 1) Event listener for User Click on Suggestion box INSIDE MAIN
 * 1a) On click, query the database for the document with a matching **name** 
 * 1b) get the **code** from the document
 * 1c) pass the **code** to A* as the end location.
 */

document.addEventListener("DOMContentLoaded", setupMainPage);




//we need to have an export to use an import, so this satisfies that requirement
export { };
