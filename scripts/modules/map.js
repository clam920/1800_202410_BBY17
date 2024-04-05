import { userOnCampus } from "./location.js";
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
}

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

/**
 * Handles extracting the pointers location and passing it off to the StartMapMove process.
 * @param {PointerEvent} e
 */
function startPointer(e) {
  e.preventDefault();

  offset = getPointerPosition(e);
  processStartMapMove();
}

/**
 * Handles extracting the touch information from the device and passing it off to the StartMapMove process.
 * @param {TouchEvent} e
 */
function startTouch(e) {
  if (e.touches.length < 2) {
    return;
  }
  e.preventDefault();
  let originalTouch = e.touches[1];
  // console.log(e);
  setBoundaries();

  offset = getPointerPosition(originalTouch);
  processStartMapMove();
}

/**
 * Handles starting the pointer tracking and calculating the offset for the movements
 */
function processStartMapMove() {
  // Apparently transforms are stored in 2/3d array.
  // https://zellwk.com/blog/css-translate-values-in-javascript/ was a huge help in figuring this out.
  offset.x -= mapMatrix[4] / mapMatrix[0];
  offset.y -= mapMatrix[5] / mapMatrix[3];

  //add the event listener for updating the maps position
  mapArea.addEventListener("pointermove", drag);

  //Add the event listeners for stopping the map updates.
  ["pointerup", "pointerleave"].forEach((e) =>
    mapArea.addEventListener(e, stopDrag)
  );
}

/**
 * Pans the map based on how much the user has moved.
 * @param {PointerEvent} e
 */
function drag(e) {
  let coords = getPointerPosition(e);

  mapMatrix[4] = (coords.x - offset.x) * mapMatrix[0];
  mapMatrix[5] = (coords.y - offset.y) * mapMatrix[3];
  updateMapMatrix();
}

/**
 * Removes the event listener for pointer move, leave and up.
 */
function stopDrag() {
  ["pointermove", "pointerleave", "pointerup"].forEach((e) =>
    mapArea.removeEventListener(e, drag)
  );
}

/**
 * Adjusts the scale in the map matrix when we recieve a zoom command
 * @param {PointerEvent} e
 */
function zoom(e) {
  e.preventDefault();
  let scale;
  if (e.deltaY < 0) {
    scale = 1.01;
  } else {
    scale = 0.99;
  }
  for (var i = 0; i < 4; i++) {
    mapMatrix[i] *= scale;
  }

  //TODO: CB - The center changes based on the scale
  // so I need to write some logic to check that.
  mapMatrix[4] += (1 - scale) * center.x;
  mapMatrix[5] += (1 - scale) * center.y;
  updateMapMatrix();
  setActualMapSize();
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
 * Gets the x/y coordinate of the pointer of the screen.
 * @param {PointerEvent} e a Pointer Event
 * @returns {ScreenPixelPosition}
 */
function getPointerPosition(e) {
  return new ScreenPixelPosition(e.clientX, e.clientY);
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
  newNode.setAttribute("r", 2);
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
  //CB: We divide by 2 so its in the center of the screen
  /* CB: I needed logic for if the user if on the left or right side of the map.
  if theyre on the left, we want a positive pan,
  if they're on the right we need a negative pan.
  */
  if (pos.x <= center.x) {
    mapMatrix[4] = pos.x / 2;
  } else {
    mapMatrix[4] = -pos.x / 2;
  }
  mapMatrix[5] = -pos.y / mapMatrix[3];

  console.log("snapping to ", mapMatrix[4], mapMatrix[5]);
  updateMapMatrix();
}

/**
 * Centers the user on the screen
 */
function snapToUser() {
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

/**
 * Loads the map and enables the panning/zooming.
 * Should be run in the main.js, or before you intend to display/use the map.
 */
async function setupMap() {
  let data = await loadSVG("./images/map/SVG/BCITMap.svg");
  data = cleanMapSVG(data);

  mapArea = document.getElementById("mapArea");
  mapArea.innerHTML = data.outerHTML;
  mapArea.addEventListener("wheel", zoom);
  mapSVG = document.getElementById("Layer_2");

  offset = new ScreenPixelPosition(0, 0);

  setActualMapSize();
  setOriginalMapSize();

  //Sets the starting position of the map on the screen to be more in-campus
  mapMatrix[5] = -originalMapSize.y / 4;
  updateMapMatrix();

  //var viewbox = mapSVG.getAttributeNS(null, "viewBox").split(" ");
  center = new ScreenPixelPosition(
    originalMapSize.x / 2,
    originalMapSize.y / 2
  );
  loadFollowIcon();
  makeUserIcon();
  let deviceType = navigator.userAgent;

  //If we detect a mobile device
  if (
    deviceType.match(/Android|Mobile|iPhone/gm) != null
    //  && navigator.maxTouchPoints > 0
  ) {
    console.warn("Mobile device detected!");
    mapArea.addEventListener("touchstart", startTouch);
    // let rootTouch;
    // mapArea.addEventListener("touchmove", function (e) {
    //   console.warn("Touch move!");
    //   console.log(e);
    //   console.warn(
    //     e.touches[0].clientX - rootTouch.x,
    //     e.touches[0].clientY - rootTouch.y
    //   );
    // });
  } else {
    mapArea.addEventListener("pointerdown", startPointer);
  }
}

/**
 * Removes the defs from the svg, so we can control it.
 * @param {HTMLElement} mapData
 * @return {SVGGraphicsElement}
 */
function cleanMapSVG(mapData) {
  //get the SVG layer from the data
  let svgLayer = mapData.children[0];

  //Get rid of the defs
  svgLayer.childNodes.forEach((child) => {
    if (child.nodeName == "defs") {
      child.remove();
    }
  });

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
};
