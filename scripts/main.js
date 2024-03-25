var mapArea = $('#mapArea');
var map;
var mapData = db.collection("classrooms");

let pointerDown = false;

function ScreenPixelPosition(x, y) {
  this.x = x;
  this.y = y;
}
var mapText;
let mapMatrix = [1, 0, 0, 1, 0, 0];
let offset = new ScreenPixelPosition(0, 0);

$.get('./images/map/SVG/BCITMap.svg').done(function (data) {
  data = data.firstChild;
  data.childNodes.forEach(child => {
    if (child.nodeName == 'defs') {
      data.removeChild(child);
    }
  });
  mapText = $(data).children()[0];
  console.log(mapText);
});

mapArea.load('./images/map/SVG/BCITMap.svg', initialMapSetup)
  .on("pointerdown pointerup", toggleMoveMapEventListener)
  .on("pointerleave", function(){
    console.log("Pointer has left map area.");
    if (pointerDown){
      mapArea.off("pointermove");
    }
  });

function toggleMoveMapEventListener(e) {
  pointerDown = !pointerDown;
  if (pointerDown) {
    let startPos = getPointerPosition(e);
    mapArea.on("pointermove", function (e) {
      let currentPos = getPointerPosition(e)
      let offset = new ScreenPixelPosition(
        currentPos.x - startPos.x,
        currentPos.y - startPos.y
      );
      /*
      Apparently transforms are stored in 2/3d array.
      https://zellwk.com/blog/css-translate-values-in-javascript/ was a huge help in figuring this out.
      */
      let viewBox = map.getAttributeNS(null, "viewBox").split(" ");
      //center will be used for zooming later.
      let center = new ScreenPixelPosition(
        parseFloat(viewBox[2]) / 2,
        parseFloat(viewBox[3]) / 2
      );
      newMatrix = panMap(offset.x, offset.y);
      map.setAttributeNS(null, "transform", newMatrix);
      startPos = currentPos;
    });
    // .on("pointerleave", function(e) {
    //   mapArea.off("pointermove");
    //   pointerDown = !pointerDown;
    // })
  } else {
    mapArea.off("pointermove");
  }
}

/**
 * Updates the maps transform when a PointerEvent happens
 * @param {PointerEvent} e Should have the startPos included inside the data. 
 */
function updateMapTransform(e) {

}

/**
 * Creates a new array, as if you had panned the map.
 * @param {Number} dx the amount we are panning in the X
 * @param {Number} dy the amount we are panning the in Y
 * @returns {Array<Number>} The new map array
 */
function panMap(dx, dy) {
  mapMatrix[4] += dx;
  mapMatrix[5] += dy;

  return "matrix(" + mapMatrix.join(' ') + ")";
}

/**
 * 
 * @param {PointerEvent} e a Pointer Event 
 * @returns {ScreenPixelPosition}
 */
function getPointerPosition(e) {
  return new ScreenPixelPosition(e.originalEvent.screenX, e.originalEvent.screenY);
}

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
}

function initialMapSetup() {
  map = document.getElementById('Layer_2');
  map.childNodes.forEach(child => {
    if (child.nodeName == 'defs') {
      child.remove();
    }
  });

  map.setAttribute('x', '0');
  map.setAttribute('y', '0');
  map.setAttribute('transform', 'translate(0, 0)');
}

mapData.onSnapshot(
  snapshot => { mapData = snapshot },
  error => { console.log(`Encountered FS error: ${error}`) }
);

