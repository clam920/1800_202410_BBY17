/**@type {HTMLElement} */
var mapArea;
/**@type {HTMLElement} */
var mapSVG;
/**@type {ScreenPixelPosition} */
var startPos;

var mapMatrix = [1, 0, 0, 1, 0, 0];

/**
 * Represents the position of an item on the screen.
 * @param {Number} x The x-coordinate of the item
 * @param {Number} y the y-coordinate of the item
 */
class ScreenPixelPosition {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
};

/**
 * Collects the pointers current position, and enables the listeners for pointer up, leave, and move.
 * @param {PointerEvent} e 
 */
function enablePointerTracking(e) {
  // console.log(e);
  //Reset the start position
  startPos = getPointerPosition(e);

  //add the event listener for updating the maps position
  mapArea.addEventListener("pointermove", calculatePointerMovement);

  //Add the event listeners for stopping the map updates.
  ["pointerup", "pointerleave"].forEach(e => mapArea.addEventListener(e, disablePointerTracking));
};

/**
 * Calculates how much the pointer has moved since we last checked.
 * @param {PointerEvent} e 
 */
function calculatePointerMovement(e) {
  let currentPos = getPointerPosition(e)
  let offset = new ScreenPixelPosition(
    currentPos.x - startPos.x,
    currentPos.y - startPos.y
  );
  /*
  Apparently transforms are stored in 2/3d array.
  https://zellwk.com/blog/css-translate-values-in-javascript/ was a huge help in figuring this out.
  */
  panMap(offset.x, offset.y);
  startPos = currentPos;
};

/**
 * Removes the event listener for pointer move, leave and up.
 */
function disablePointerTracking() {
  ["pointermove", "pointerleave", "pointerup"].forEach(e =>
    mapArea.removeEventListener(e, calculatePointerMovement));
};

/**
 * Adjusts the maps matrix by the given number of pixels.
 * @param {Number} dx the amount we are panning in the X
 * @param {Number} dy the amount we are panning the in Y
 */
function panMap(dx, dy) {
  mapMatrix[4] += dx;
  mapMatrix[5] += dy;
  var newMatrix = "matrix(" + mapMatrix.join(' ') + ")";
  mapSVG.setAttributeNS(null, "transform", newMatrix);
};

/**
 * Gets the x/y coordinate of the pointer of the screen.
 * @param {PointerEvent} e a Pointer Event 
 * @returns {ScreenPixelPosition}
 */
function getPointerPosition(e) {
  return new ScreenPixelPosition(e.screenX, e.screenY);
};

/**
 * Converts the array of a Transform Style, and converts it to an array of Ints.
 * When we get the array from an SVG, its held in strings, so this is useful :)
 * @param {Array<String>} arr 
 * @returns {Array<Number>} The given string array, converted to ints.
 */
function convertTransformStyleToInt(arr) {
  let retArr = []
  arr.forEach(value => {
    retArr.push(parseInt(value));
  })
  return retArr;
};

/**
 * Loads the map and enables the panning/zooming.
 * Should be run in the main.js, or before you intend to display/use the map.
 */
async function setupMap() {
  mapArea = document.getElementById("mapArea");
  const file = await fetch("./images/map/SVG/BCITMap.svg");
  const parser = new DOMParser();
  let data = await file.text();
  data = parser.parseFromString(data, "text/html").body;
  data = cleanMapSVG(data);
  
  mapArea.innerHTML = data.innerHTML;
  setupMapSVG();

  mapArea.addEventListener("pointerdown", enablePointerTracking);
  //Testing zoom functionality for later.
  // mapArea.setAttribute("viewBox", [0, 0, visualViewport.width, visualViewport.height]);
  // console.log(mapArea.getAttribute("viewBox"));
  //mapArea.addEventListener("wheel", (e) => { console.log(e) });
  // let viewBox = mapSVG.getAttributeNS(null, "viewBox").split(" ");
  // //center will be used for zooming later.
  // let center = new ScreenPixelPosition(
  //   parseFloat(viewBox[2]) / 2,
  //   parseFloat(viewBox[3]) / 2
  // );
};

/**
 * Removes the defs from the svg, so we can control it.
 * @param {HTMLElement} mapData 
 * @return {SVGElement}
 */
function cleanMapSVG(mapData) {
  mapData.childNodes.forEach(child => {
    //console.log(child);
    if (child.nodeName == 'defs') {
      child.remove();
    }
  });
  //Create new parent to hold the SVG elements
  let svgChild = document.createElementNS("http://www.w3.org/2000/svg", "svg");

  //add Layer_2 as an ID of svgChild

  //Extra everything under Layer_2 of Data

  //insert as children as svgChild

  //return svgChild
  return mapData;
}

/**
 * Sets the initial matrix for the mapSVG, 
 * and sets up the reference to the map DOM
 */
function setupMapSVG() {
  mapSVG = document.getElementById('Layer_2');
  mapSVG.setAttribute('x', '0');
  mapSVG.setAttribute('y', '0');
  mapSVG.setAttribute('transform', 'translate(0, 0)');
}

export { ScreenPixelPosition, mapSVG, mapArea, setupMap };