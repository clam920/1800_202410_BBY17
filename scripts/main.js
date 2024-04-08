import { ScreenPixelPosition, setupMap } from "./modules/map.js";
import { setupLocation } from "./modules/location.js";
import { astar, listNode } from "./modules/pfNode.js";

var aStar;

async function setupMainPage() {
  await setupMap();
  setupLocation();
  aStar = astar;
  console.log("Running V0.15");
}

document.addEventListener("DOMContentLoaded", setupMainPage);
