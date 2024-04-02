import { ScreenPixelPosition, setupMap } from "./modules/map.js";
import { setupLocation } from "./modules/location.js";
import { astar, listNode } from "./modules/pfNode.js";

var aStar;

async function setupMainPage() {
  await setupMap();
  setupLocation();
  aStar = astar;
}

document.addEventListener("DOMContentLoaded", setupMainPage);

//we need to have an export to use an import, so this satisfies that requirement
export {};
