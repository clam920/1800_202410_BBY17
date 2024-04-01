import { ScreenPixelPosition, setupMap } from "./modules/map.js";
import { userPosition, setupLocation, convertGeoToMap } from "./modules/location.js";
import { astar, listNode } from "./modules/pfNode.js";

var aStar;
async function setupMainPage() {
  await setupMap();
  setupLocation();
  aStar = astar;

  
  // console.log(astar.search(listNode));
  astar.showNode(astar.search(listNode));
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
