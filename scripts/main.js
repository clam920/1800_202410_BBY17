import { ScreenPixelPosition, setupMap } from "./modules/map.js";
import { userPosition, setupLocation, convertWorldToPercent } from "./modules/location.js";
import { astar } from "./modules/pfNode.js";

function setupMainPage() {
  setupMap();
  setupLocation();
}

document.addEventListener("DOMContentLoaded", setupMainPage);
console.log(astar.search([["Classroom 1", 3, 0, 3, [0, 0]], ["Outside1", 4, 1, 3, [0, 1]], ["Outside2", 3, 1, 2, [0, 2]], ["Outside3", 3, 2, 1, [1, 2]], ["Outside4", 3, 2, 1, [2, 2]], ["Outside5", 3, 3, 0, [3, 2]]]));

//we need to have an export to use an import, so this satisfies that requirement
export { };
