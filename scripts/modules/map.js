var mapArea = $('#mapArea');
var mapSVG;
var mapText;
let mapMatrix = [1, 0, 0, 1, 0, 0];
let pointerDown = false;

/**
 * Represents the position of an item on the screen.
 * @param {The x-coordinate of the item} x 
 * @param {the y-coordinate of the item} y 
 */
class ScreenPixelPosition {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
};
function toggleMoveMap(e) {
  pointerDown = !pointerDown;
  if (pointerDown) {
    enablePointerTracking(e);
  } else {
    disablePointerTracking();
  }
};

/**
 * 
 * @param {PointerEvent} e 
 */
function enablePointerTracking(e) {
  let startPos = getPointerPosition(e);
  mapArea.on("pointermove", function (e) {
    let currentPos = getPointerPosition(e)
    let offset = new ScreenPixelPosition(
      currentPos.x - startPos.x,
      currentPos.y - startPos.y
    )
    /*
    Apparently transforms are stored in 2/3d array.
    https://zellwk.com/blog/css-translate-values-in-javascript/ was a huge help in figuring this out.
    */
    let viewBox = mapSVG.getAttributeNS(null, "viewBox").split(" ");
    //center will be used for zooming later.
    let center = new ScreenPixelPosition(
      parseFloat(viewBox[2]) / 2,
      parseFloat(viewBox[3]) / 2
    );
    panMap(offset.x, offset.y);
    startPos = currentPos;
  })
    .on("pointerup pointerleave", disablePointerTracking);
};

function disablePointerTracking() {
  mapArea.off("pointermove pointerleave pointerup");
  pointerDown = false;
};

/**
 * Creates a new array and pans the map.
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
  return new ScreenPixelPosition(e.originalEvent.screenX, e.originalEvent.screenY);
};

/**
 * Converts the array of a Transform Style, and converts it to an array of Ints.
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
 */
function setupMap() {
  mapArea.load('./images/map/SVG/BCITMap.svg', cleanMapData)
    .on("pointerdown", toggleMoveMap);
};

function setupMapSVG() {
  mapSVG = document.getElementById('Layer_2');
  mapSVG.childNodes.forEach(child => {
    if (child.nodeName == 'defs') {
      child.remove();
    }
  });

  mapSVG.setAttribute('x', '0');
  mapSVG.setAttribute('y', '0');
  mapSVG.setAttribute('transform', 'translate(0, 0)');
}

function cleanMapData() {
  $.get('./images/map/SVG/BCITMap.svg').done(async function (data) {
    data = data.firstChild;
    await data.childNodes.forEach(child => {
      if (child.nodeName == 'defs') {
        data.removeChild(child);
      }
    });
    mapText = await $(data).children()[0];
  });
  setupMapSVG();
}

export { ScreenPixelPosition, mapSVG, mapArea, mapText, setupMap };