import { ScreenPixelPosition, setupMap } from "./modules/map.js";
import { userPosition, setupLocation, convertGeoToMap } from "./modules/location.js";
import { astar, listNode } from "./modules/pfNode.js";

var aStar;
async function setupMainPage() {
  await setupMap();
  setupLocation();
  aStar = astar;

  
  // console.log(astar.search(listNode));
  // astar.showNode(astar.search(listNode));
}

document.addEventListener("DOMContentLoaded", setupMainPage);

//we need to have an export to use an import, so this satisfies that requirement
export { };
