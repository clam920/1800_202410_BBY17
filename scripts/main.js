import {ScreenPixelPosition, setupMap} from "./modules/map.js";
import {userPosition, setupLocation, convertWorldToPercent} from "./modules/location.js";

function setupMainPage(){
  setupMap();
  setupLocation();
}

document.addEventListener("DOMContentLoaded", setupMainPage);

export {};
