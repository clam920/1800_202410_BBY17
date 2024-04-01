import { ScreenPixelPosition, setupMap } from "./modules/map.js";
import { userPosition, setupLocation, convertGeoToMap } from "./modules/location.js";
import { astar } from "./modules/pfNode.js";

var aStar;
async function setupMainPage() {
  await setupMap();
  setupLocation();
  aStar = astar;

  console.log(aStar.search(
    [
      [
        "SE12 320", 4, 0, 4, [49.249874,-123.0016506]//1
      ],

      [
        "Stairs Top", 4, 1, 3, [49.249811, -123.001768]//2
      ],

      [
        "Bridge", 5, 2, 3, [49.25005376612112, -123.00173465751207]//3
      ],

      [
        "Stairs Bottom", 4, 2, 2, [49.249811, -123.001768]//4
      ],

      [
        "Stairs Top Inside", 5, 3, 2, [49.250058580920445, -123.00255809566634]//5
      ],

      [
        "OutsideNode",4,2,3,[49.24958619143382, -123.00236754406244]//6
      ],

      [
        "Stairs Bottom Inside", 5,4,1, [49.250058580920445, -123.00255809566634]
      ],

      [
        "Sw05 1840", 4, 0, 4, [49.24975437222892, -123.00254803738308]
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
