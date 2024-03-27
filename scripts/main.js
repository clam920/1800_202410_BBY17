import {ScreenPixelPosition, setupMap} from "./modules/map.js";
import {userPosition, setupLocation, convertWorldToPercent} from "./modules/location.js";

function setupMainPage(){
  setupMap();
  setupLocation();
}

document.addEventListener("DOMContentLoaded", setupMainPage);

//we need to have an export to use an import, so this satisfies that requirement
export {};
