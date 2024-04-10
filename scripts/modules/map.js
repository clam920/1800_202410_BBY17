import { userOnCampus } from "./location.js";
import { log } from "./logging.js";
import { ScreenPixelPosition } from "./classes.js";

/**@type {HTMLElement} */
var mapArea;
/**@type {SVGGraphicsElement} */
var mapSVG;
/**@type {SVGGraphicsElement} */
var userIcon;

/**@type {ScreenPixelPosition} */
var offset;
/**@type {ScreenPixelPosition} */
var center;

/**@type {DOMMatrix} */
var mapMatrix = [1, 0, 0, 1, 0, 0];

/** @type {ScreenPixelPosition} */
const actualMapSize = new ScreenPixelPosition(0, 0);

/** @type {ScreenPixelPosition} */
const originalMapSize = new ScreenPixelPosition(0, 0);

/** @type {boolean} */
var followUser = false;

/**
 * Planning to use this to control the map panning; we'll see how it turns out.
 * Not really MVP, tbf, but I wanna leave it here just in case.
 */
/**@type {Array[Number]} */
var boundaries = {
  minX: 0,
  minY: 0,
  maxX: 0,
  maxY: 0,
};

const evCache = [];
let prevDiff = -1;

/**
 * Gets the x/y coordinate of the pointer of the screen.
 * @param {PointerEvent} e a Pointer Event
 * @returns {ScreenPixelPosition}
 */
function getPointerPosition(e) {
  //console.log(e);
  return new ScreenPixelPosition(
    e.clientX * mapMatrix[0],
    e.clientY * mapMatrix[3]
  );
}

/**
 * Adds the new pointer to the cache so other pointer handlers can track it.
 * @param {PointerEvent} e
 */
function pointerdownHandler(e) {
  e.preventDefault();
  if (evCache.length == 0) {
    offset = getPointerPosition(e);
    offset.x -= mapMatrix[4] / mapMatrix[0];
    offset.y -= mapMatrix[5] / mapMatrix[3];
  }
  evCache.push(e);
  log("pointerDown", e);
}

/**
 * This function implements a 2-pointer horizontal pinch/zoom gesture.
 *
 * If the distance between the two pointers has increased (zoom in),
 * the target element's background is changed to "pink" and if the
 * distance is decreasing (zoom out), the color is changed to "lightblue".
 *
 * This function sets the target element's border to "dashed" to visually
 * indicate the pointer's target received a move event.
 * @param {PointerEvent} e
 * @returns
 */
function pointermoveHandler(e) {
  log("pointerMove", e);
  e.preventDefault();
  // Check if pointerdown has been fired already or not.
  if (evCache.length == 0) {
    return;
  }

  // Find this event in the cache and update its record with this event
  const index = evCache.findIndex(
    (cachedEv) => cachedEv.pointerId === e.pointerId
  );
  let lastEv = evCache[index];
  evCache[index] = e;

  // If two pointers are down, check for pinch gestures
  if (evCache.length === 2) {
    // Calculate the distance between the two pointers
    const curDiff = Math.abs(evCache[0].clientX - evCache[1].clientX);
    if (
      (evCache[0].movementX > 0 && evCache[1].movementX > 0) ||
      (evCache[0].movementY > 0 && evCache[1].movementY > 0)
    ) {
      return;
      //console.log("Moving in same direction");
    } else if (prevDiff > 0.5) {
      if (curDiff > prevDiff) {
        zoomMap(1.01);
        // The distance between the two pointers has increased
        log("Pinch moving OUT -> Zoom in", e);
      }
      if (curDiff < prevDiff) {
        zoomMap(0.99);
        // The distance between the two pointers has decreased
        log("Pinch moving IN -> Zoom out", e);
      }
    }

    // Cache the distance for the next move event
    prevDiff = curDiff;
  } else {
    if (lastEv == null) {
      return;
    }
    //pan the map
    let delta = new ScreenPixelPosition(
      e.clientX - lastEv.clientX,
      e.clientY - lastEv.clientY
    );
    panMap(delta);
  }
}

/**
 * Wheel events are when 2 pointers are moved at the same time on a laptop
 * or a mouse wheel is used.
 * Checks if its a zoom or pan movement and acts accordingly.
 * @param {WheelEvent} e
 */
function wheelHandler(e) {
  e.preventDefault();

  offset = getPointerPosition(e);
  setMapOffset();
  if (Number.isInteger(e.deltaY) && Number.isInteger(e.deltaX)) {
    let delta = new ScreenPixelPosition(e.wheelDeltaX, e.wheelDeltaY);
    panMap(delta);
  } else {
    // console.log(e);
    let scale;
    if (e.deltaY < 0) {
      scale = 1.01;
    } else {
      scale = 0.99;
    }
    zoomMap(scale);
  }
  //console.log(e);
}

/**
 * Removes a pointer from the cache and checks if it needs to reset the diff tracker
 * @param {PointerEvent} e
 */
function pointerupHandler(e) {
  log(e.type, e);
  // Remove this pointer from the cache
  removeEvent(e);

  // If the number of pointers down is less than two then reset diff tracker
  if (evCache.length < 2) {
    prevDiff = -1;
  }
}

/**
 * Removes an event from the cache since we dont need to track it
 * @param {PointerEvent} e
 */
function removeEvent(e) {
  // Remove this event from the target's cache
  const index = evCache.findIndex(
    (cachedEv) => cachedEv.pointerId === e.pointerId
  );
  evCache.splice(index, 1);
}

/**
 * Moves the map based on the given information
 * @param {ScreenPixelPosition} delta the amount to move
 */
function panMap(delta) {
  mapMatrix[4] += delta.x * mapMatrix[0];
  mapMatrix[5] += delta.y * mapMatrix[3];

  updateMapMatrix();
}

/**
 * Adjusts the scale in the map matrix when we recieve a zoom command
 * @param {Number} scale
 */
function zoomMap(scale) {
  [0, 3].forEach((i) => {
    mapMatrix[i] *= scale;
  });

  //TODO: CB - The center changes based on the scale
  // so I need to write some logic to check that.
  mapMatrix[4] += (1 - scale) * center.x;
  mapMatrix[5] += (1 - scale) * center.y;
  updateMapMatrix();
  setActualMapSize();
}

/**
 * Handles starting the pointer tracking and calculating the offset for the movements
 */
function setMapOffset() {
  // Apparently transforms are stored in 2/3d array.
  // https://zellwk.com/blog/css-translate-values-in-javascript/ was a huge help in figuring this out.
  offset.x -= mapMatrix[4] / mapMatrix[0];
  offset.y -= mapMatrix[5] / mapMatrix[3];
}

/**
 * Updates the in the SVG with the matrix in this file
 */
function updateMapMatrix() {
  var newMatrix = "matrix(" + mapMatrix.join(" ") + ")";
  mapSVG.setAttributeNS(null, "transform", newMatrix);
}

/**
 * Saves the original size, for use later.
 */
function setOriginalMapSize() {
  let arr = mapSVG.getAttribute("viewBox").split(" ");
  arr.forEach((val, index, fromArr) => {
    fromArr[index] = parseFloat(val);
  });
  originalMapSize.x = arr[2];
  originalMapSize.y = arr[3];
}

/**
 * Updates the actual map size, given the scale of the map.
 */
function setActualMapSize() {
  let bBox = mapSVG.getBBox();
  actualMapSize.x = bBox.width * mapMatrix[0];
  actualMapSize.y = bBox.height * mapMatrix[3];
}
/**
 * Creates the user icon for us to show on the map.
 */
function makeUserIcon() {
  var newGroup = document.createElementNS("http://www.w3.org/2000/svg", "g");
  var newNode = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "circle"
  );
  newNode.id = "userIcon";
  newNode.setAttribute("id", "userIcon");
  newNode.setAttribute("cx", "-100");
  newNode.setAttribute("cy", "-100");
  newNode.setAttribute("r", 3);
  newGroup.append(newNode);
  mapSVG.append(newGroup);
  userIcon = document.getElementById("userIcon");
}

/**
 * Moves the user icon to the given position
 * @param {ScreenPixelPosition} position
 */
function moveUserIcon(position) {
  if (position == null) {
    return;
  }

  //console.log(position.x, position.y);
  userIcon.setAttributeNS(null, "cx", position.x);
  userIcon.setAttributeNS(null, "cy", position.y);
  if (followUser) {
    snapToUser();
  }
}

/**
 * Snaps the center of the map to the given location.
 * @param {ScreenPixelPosition} pos
 */
function snapToLocation(pos) {
  // console.log(pos);
  //CB: We divide by 2 so its in the center of the screen
  /* CB: I needed logic for if the user if on the left or right side of the map.
  if theyre on the left, we want a positive pan,
  if they're on the right we need a negative pan.
  */
  if (pos.x <= center.x) {
    mapMatrix[4] = -pos.x / 2;
  } else {
    mapMatrix[4] = pos.x / 2;
  }
  mapMatrix[5] = -pos.y / mapMatrix[3];
  console.log(center.x);

  console.log("snapping to ", mapMatrix[4], mapMatrix[5]);
  updateMapMatrix();
}

/**
 * Centers the user on the screen
 */
function snapToUser() {
  //console.log(userOnCampus);
  if (!userOnCampus) {
    console.log("user is not on campus");
    return;
  }
  let pos = new ScreenPixelPosition(
    parseFloat(userIcon.getAttribute("cx")),
    parseFloat(userIcon.getAttribute("cy"))
  );

  // console.log("user position:", pos);
  snapToLocation(pos);
}

/**
 * loads the SVG from the server at the given location
 * @param {String} path the file path
 * @returns {HTMLElement} the SVG
 */
async function loadSVG(path) {
  const file = await fetch(path);
  const parser = new DOMParser();

  let data = await file.text();
  data = parser.parseFromString(data, "text/html").body;
  return data;
}

/**
 * loads the follow icon for display on the screen.
 */
function loadFollowIcon() {
  var newNode = document.createElement("span");
  newNode.setAttribute("id", "followUserIcon");
  newNode.setAttribute(
    "class",
    "material-symbols-outlined position-absolute end-0 translate-middle-x"
  );
  newNode.innerText = "mode_standby";
  mapArea.append(newNode);
  document
    .getElementById("followUserIcon")
    .addEventListener("click", snapToUser);
}

function setDefaultVariables() {
  offset = new ScreenPixelPosition(0, 0);
  setActualMapSize();
  setOriginalMapSize();
  //Sets the starting position of the map on the screen to be more in-campus
  mapMatrix[4] = originalMapSize.x / 2;
  mapMatrix[5] = -originalMapSize.y / 8;
  updateMapMatrix();

  //var viewbox = mapSVG.getAttributeNS(null, "viewBox").split(" ");
  center = new ScreenPixelPosition(
    originalMapSize.x / 2,
    originalMapSize.y / 2
  );
}

function initializeListeners() {
  mapArea.addEventListener("pointerdown", pointerdownHandler);
  mapArea.addEventListener("pointermove", pointermoveHandler);
  mapArea.addEventListener("wheel", wheelHandler);

  //these all mean "stop processing", so we can give them the same handler
  let stops = ["pointerup", "pointercancel", "pointerout", "pointerleave"];
  stops.forEach((ev) => {
    mapArea.addEventListener(ev, pointerupHandler);
  });

  let touches = ["touchstart", "touchmove", "touchend"];
  touches.forEach((ev) => {
    mapArea.addEventListener(ev, function (e) {
      e.preventDefault();
    });
  });
}

/**
 * Loads the map and enables the panning/zooming.
 * Should be run in the main.js, or before you intend to display/use the map.
 */
async function setupMap() {
  let data = await loadSVG("./images/map/SVG/BCITMap.svg");
  data = cleanMapSVG(data);

  mapArea = document.getElementById("mapArea");
  mapArea.innerHTML = data.outerHTML;
  mapSVG = document.getElementById("Layer_2");

  setDefaultVariables();

  loadFollowIcon();
  makeUserIcon();

  initializeListeners();
}

/**
 * Removes the defs from the svg, so we can control it.
 * @param {HTMLElement} mapData
 * @return {SVGGraphicsElement}
 */
function cleanMapSVG(mapData) {
  //get the SVG layer from the data
  let svgLayer = mapData.children[0];

  // Search for defs, an svg section that adds styles.
  // We want to use our styles so we need to get rid of it.
  for (let i = 0; i < svgLayer.childNodes.length; i++) {
    let found = false;

    let currentNode = svgLayer.childNodes[i];
    //console.log(currentNode);
    if (currentNode.nodeName == "defs") {
      //console.log(currentNode.childNodes);
      let currentChildren = currentNode.childNodes;
      //We do need the clipPath so we can use the layer mask
      //So we search for it and move it outside the defs.
      for (let n = 0; n < currentChildren.length; n++) {
        if (currentChildren[n].nodeName == "clipPath") {
          currentNode.before(currentChildren[n]);
          found = true;
          break;
        }
      }
      if (found) {
        svgLayer.removeChild(currentNode);
        break;
      }
    }
  }

  return mapData;
}

export {
  ScreenPixelPosition,
  mapSVG,
  mapArea,
  actualMapSize,
  originalMapSize,
  mapMatrix,
  snapToLocation,
  setupMap,
  moveUserIcon,
  zoomMap,
};
