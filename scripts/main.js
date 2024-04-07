import { ScreenPixelPosition, setupMap } from "./modules/map.js";
import { setupLocation } from "./modules/location.js";
import { astar, listNode } from "./modules/pfNode.js";

var aStar;

async function setupMainPage() {
  await setupMap();
  setupLocation();
  aStar = astar;
  console.log("Running V0.12");
}

document.addEventListener("DOMContentLoaded", setupMainPage);

//CB: Some fun code to track **all** events happening in the window.
//Useful for seeing exactly what type of event you want to track!
// Object.keys(window).forEach((key) => {
//   if (/^on/.test(key)) {
//     window.addEventListener(key.slice(2), (event) => {
//       console.log(event);
//     });
//   }
// });
