// navigator.geolocation.watchPosition(position => {
//   console.log(position);
// });

var mapArea;
$('#mapArea').load('./images/map/SVG/VectorTrace.svg', function () {
  document.getElementById('Layer_2').childNodes.forEach(child => {
    if (child.nodeName == 'defs') {
      child.remove();
    }    
  })
}).on("pointerdown", function(e){
  console.log(e);
}).on("pointerup", function(e){
  console.log(e);
});


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
}

async function displayFoundItems(){
  try {
    const results = await search("31");
    const displayArea = document.getElementById("displayRoomName");
    let newHtml = "";
    results.forEach(item => {
      newHtml += `<p>${item.data().name}</p>`; 
    });
    displayArea.innerHTML = newHtml;
  } catch (error) {
    console.log(`Caught error when displaying found items: ${error}`);
  }
}
displayFoundItems();