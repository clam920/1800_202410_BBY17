// navigator.geolocation.watchPosition(position => {
//   console.log(position);
// });

var mapArea = $('#mapArea');
mapArea.load('./images/map/SVG/BCITMap.svg', cleanMapData).on("pointerdown", function(e){
  console.log(e);
}).on("pointerup", function(e){
  console.log(e);
});

function cleanMapData(){
  document.getElementById('Layer_2').childNodes.forEach(child => {
    if (child.nodeName == 'defs') {
      child.remove();
    }    
  })
}

var mapData = db.collection("classrooms");
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