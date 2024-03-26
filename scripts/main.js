import {ScreenPixelPosition, initialMapSetup} from "./modules/map.js";
import {userPosition, setupLocation, convertWorldToPercent} from "./modules/location.js";

function setupMainPage(){
  initialMapSetup();
  setupLocation();
}

document.addEventListener("DOMContentLoaded", setupMainPage);

export {};
