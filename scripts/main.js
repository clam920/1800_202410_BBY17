var mapArea = $('#mapArea');
var map;
var mapData = db.collection("classrooms");

let pointerDown = true;

function ScreenPixelPosition(x, y){
  this.x = x;
  this.y = y;
}

let offset = new ScreenPixelPosition(0, 0);

mapArea.load('./images/map/SVG/BCITMap.svg', cleanMapData).on("pointerdown pointerup", toggleMoveMapEventListener);

function toggleMoveMapEventListener(e){
  if (pointerDown) {
    let startPos = getPointerPosition(e);
    mapArea.on("pointermove", function(e){
      let currentPos = getPointerPosition(e)
      let offset = new ScreenPixelPosition(
        currentPos.x - startPos.x,
        currentPos.y - startPos.y
        );
        /*
        Apparently transforms are stored in 2/3d array.
        https://zellwk.com/blog/css-translate-values-in-javascript/ was a huge help in figuring this out.
        */
        let currentTransform = window.getComputedStyle(map)['transform'].match(/[-\d]+/gm);
        currentTransform = convertTransformStyleToInt(currentTransform);
        map.setAttribute('transform', `translate(${currentTransform[4] + offset.x}, ${currentTransform[5] + offset.y})`)
      // map.style.top = offset.y + "px";
      // map.style.left = offset.x + "px";
      //console.log(offset);
      startPos = currentPos;
    });
  } else {
    mapArea.off("pointermove");
  }
  pointerDown = !pointerDown;
}

/**
 * 
 * @param {PointerEvent} e a Pointer Event 
 * @returns {ScreenPixelPosition}
 */
function getPointerPosition(e){
  return new ScreenPixelPosition(e.originalEvent.screenX, e.originalEvent.screenY);
}

/**
 * Converts the array of a Transform Style, and converts it to an array of Ints.
 * @param {Array<String>} arr 
 * @returns {Array<Number>} The given string array, converted to ints.
 */
function convertTransformStyleToInt(arr){
  let retArr = []
  arr.forEach(value => {
    retArr.push(parseInt(value));
  })
  return retArr;
}

function cleanMapData(){
  map = document.getElementById('Layer_2');
  map.childNodes.forEach(child => {
    if (child.nodeName == 'defs') {
      child.remove();
    }    
  })
  map.setAttribute('transform', 'translate(0, 0)');
}

mapData.onSnapshot(
  snapshot => { mapData = snapshot},
  error => { console.log(`Encountered FS error: ${error}`)}
);

/**
 * Searches the database for any names matching the given string.
 * @param {String} searchTerm 
 * @returns {Array<QueryDocumentSnapshot>} 
 */
async function search(searchTerm) {
  try {
    let locationArray = [];
    const currentMapData = await mapData.get();
    currentMapData.forEach(item => {
        let name = item.data().name;
        if (name.includes(searchTerm)) {
          locationArray.push(item);
        }
      });
      return locationArray;
  } catch (error) {
    console.error(`Encountered error reading mapData ${error}`);
    return [];
  }
};

/**
 * Displays each of the found items in the array.
 * Currently just a placeholder, but feel free to modify it as need be.
 * @param {Array<QueryDocumentSnapshot>} foundItemArray An array from Firebase of all things that match the string we searched for.
 */
async function displayFoundItems(foundItemArray){
  try {
    //Use the below line if you want to test the code and see what it outputs.
    //foundItemArray = await search("31");

    //Currently just a div slapped onto the main page. The room names all pop up on the bottom of the screen.
    const displayArea = document.getElementById("displayRoomName");
    let newHtml = "";
    foundItemArray.forEach(item => {
      newHtml += `<p>${item.data().name}</p>`; 
    });
    displayArea.innerHTML = newHtml;
  } catch (error) {
    console.log(`Caught error when displaying found items: ${error}`);
  }
};