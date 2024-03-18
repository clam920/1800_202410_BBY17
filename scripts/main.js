// navigator.geolocation.watchPosition(position => {
//   console.log(position);
// });

$('#mapArea').load('./images/map/SVG/VectorTrace.svg', function () {
  document.getElementById('Layer_2').childNodes.forEach(child => {
    if (child.nodeName == 'defs') {
      child.remove();
    }    
  })
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


// // write SE12 classrooms into firebase.
// function writeSE12Class() {

//   var classroomsRef = db.collection("classrooms");

//   // classroomsRef.add({
//   //   code: "SE12_101Q",
//   //   name: "SE12 101",
//   //   building: "SE12",
//   //   level: "1",
//   //   details: "Class",
//   //   lat: 0.00,
//   //   lng: 0.00,
//   //   last_updated: firebase.firestore.Timestamp.fromDate(new Date("March 17, 2024"))
//   // });
//   // classroomsRef.add({
//   //   code: "SE12_103",
//   //   name: "SE12 103",
//   //   building: "SE12",
//   //   level: "1",
//   //   details: "Lab-Media",
//   //   lat: 0.00,
//   //   lng: 0.00,
//   //   last_updated: firebase.firestore.Timestamp.fromDate(new Date("March 17, 2024"))
//   // });
//   // classroomsRef.add({
//   //   code: "SE12_301",
//   //   name: "SE12 301",
//   //   building: "SE12",
//   //   level: "3",
//   //   details: "Class",
//   //   lat: 0.00,
//   //   lng: 0.00,
//   //   last_updated: firebase.firestore.Timestamp.fromDate(new Date("March 17, 2024"))
//   // });
//   // classroomsRef.add({
//   //   code: "SE12_302",
//   //   name: "SE12 302",
//   //   building: "SE12",
//   //   level: "3",
//   //   details: "Class",
//   //   lat: 0.00,
//   //   lng: 0.00,
//   //   last_updated: firebase.firestore.Timestamp.fromDate(new Date("March 17, 2024"))
//   // });
//   // classroomsRef.add({
//   //   code: "SE12_303",
//   //   name: "SE12 303",
//   //   building: "SE12",
//   //   level: "3",
//   //   details: "Lab-Computer",
//   //   lat: 0.00,
//   //   lng: 0.00,
//   //   last_updated: firebase.firestore.Timestamp.fromDate(new Date("March 17, 2024"))
//   // });
//   // classroomsRef.add({
//   //   code: "SE12_306",
//   //   name: "SE12 306",
//   //   building: "SE12",
//   //   level: "3",
//   //   details: "Lab-Computer",
//   //   lat: 0.00,
//   //   lng: 0.00,
//   //   last_updated: firebase.firestore.Timestamp.fromDate(new Date("March 17, 2024"))
//   // });
//   // classroomsRef.add({
//   //   code: "SE12_307",
//   //   name: "SE12 307",
//   //   building: "SE12",
//   //   level: "3",
//   //   details: "Class",
//   //   lat: 0.00,
//   //   lng: 0.00,
//   //   last_updated: firebase.firestore.Timestamp.fromDate(new Date("March 17, 2024"))
//   // });
//   // classroomsRef.add({
//   //   code: "SE12_308",
//   //   name: "SE12 308",
//   //   building: "SE12",
//   //   level: "3",
//   //   details: "Lab-Computer",
//   //   lat: 0.00,
//   //   lng: 0.00,
//   //   last_updated: firebase.firestore.Timestamp.fromDate(new Date("March 17, 2024"))
//   // });
//   // classroomsRef.add({
//   //   code: "SE12_309",
//   //   name: "SE12 309",
//   //   building: "SE12",
//   //   level: "3",
//   //   details: "Class",
//   //   lat: 0.00,
//   //   lng: 0.00,
//   //   last_updated: firebase.firestore.Timestamp.fromDate(new Date("March 17, 2024"))
//   // });
//   // classroomsRef.add({
//   //   code: "SE12_310",
//   //   name: "SE12 310",
//   //   building: "SE12",
//   //   level: "3",
//   //   details: "Lab-Computer",
//   //   lat: 0.00,
//   //   lng: 0.00,
//   //   last_updated: firebase.firestore.Timestamp.fromDate(new Date("March 17, 2024"))
//   // });
//   // classroomsRef.add({
//   //   code: "SE12_311",
//   //   name: "SE12 311",
//   //   building: "SE12",
//   //   level: "3",
//   //   details: "Lab-Computer",
//   //   lat: 0.00,
//   //   lng: 0.00,
//   //   last_updated: firebase.firestore.Timestamp.fromDate(new Date("March 17, 2024"))
//   // });
//   // classroomsRef.add({
//   //   code: "SE12_312",
//   //   name: "SE12 312",
//   //   building: "SE12",
//   //   level: "3",
//   //   details: "Class",
//   //   lat: 0.00,
//   //   lng: 0.00,
//   //   last_updated: firebase.firestore.Timestamp.fromDate(new Date("March 17, 2024"))
//   // });
//   // classroomsRef.add({
//   //   code: "SE12_313",
//   //   name: "SE12 313",
//   //   building: "SE12",
//   //   level: "3",
//   //   details: "Class",
//   //   lat: 0.00,
//   //   lng: 0.00,
//   //   last_updated: firebase.firestore.Timestamp.fromDate(new Date("March 17, 2024"))
//   // });
//   // classroomsRef.add({
//   //   code: "SE12_318",
//   //   name: "SE12 318",
//   //   building: "SE12",
//   //   level: "3",
//   //   details: "Lab-Computer",
//   //   lat: 0.00,
//   //   lng: 0.00,
//   //   last_updated: firebase.firestore.Timestamp.fromDate(new Date("March 17, 2024"))
//   // });
//   // classroomsRef.add({
//   //   code: "SE12_319",
//   //   name: "SE12 319",
//   //   building: "SE12",
//   //   level: "3",
//   //   details: "Lab-Computer",
//   //   lat: 0.00,
//   //   lng: 0.00,
//   //   last_updated: firebase.firestore.Timestamp.fromDate(new Date("March 17, 2024"))
//   // });
//   // classroomsRef.add({
//   //   code: "SE12_320",
//   //   name: "SE12 320",
//   //   building: "SE12",
//   //   level: "3",
//   //   details: "Lab-Computer",
//   //   lat: 0.00,
//   //   lng: 0.00,
//   //   last_updated: firebase.firestore.Timestamp.fromDate(new Date("March 17, 2024"))
//   // });
//   // classroomsRef.add({
//   //   code: "SE12_321",
//   //   name: "SE12 321",
//   //   building: "SE12",
//   //   level: "3",
//   //   details: "Lab-Computer",
//   //   lat: 0.00,
//   //   lng: 0.00,
//   //   last_updated: firebase.firestore.Timestamp.fromDate(new Date("March 17, 2024"))
//   // });

//   // classroomsRef.add({
//   //   code: "SE12_322",
//   //   name: "SE12 322",
//   //   building: "SE12",
//   //   level: "3",
//   //   details: "Lab-Computer",
//   //   lat: 0.00,
//   //   lng: 0.00,
//   //   last_updated: firebase.firestore.Timestamp.fromDate(new Date("March 17, 2024"))
//   // });
//   // classroomsRef.add({
//   //   code: "SE12_323",
//   //   name: "SE12 323",
//   //   building: "SE12",
//   //   level: "3",
//   //   details: "Lab-Computer",
//   //   lat: 0.00,
//   //   lng: 0.00,
//   //   last_updated: firebase.firestore.Timestamp.fromDate(new Date("March 17, 2024"))
//   // });
//   // classroomsRef.add({
//   //   code: "SE12_324",
//   //   name: "SE12 324",
//   //   building: "SE12",
//   //   level: "3",
//   //   details: "Lab-Computer",
//   //   lat: 0.00,
//   //   lng: 0.00,
//   //   last_updated: firebase.firestore.Timestamp.fromDate(new Date("March 17, 2024"))
//   // });
//   // classroomsRef.add({
//   //   code: "SE12_325",
//   //   name: "SE12 325",
//   //   building: "SE12",
//   //   level: "3",
//   //   details: "Lab-Computer",
//   //   lat: 0.00,
//   //   lng: 0.00,
//   //   last_updated: firebase.firestore.Timestamp.fromDate(new Date("March 17, 2024"))
//   // });
//   // classroomsRef.add({
//   //   code: "SE12_326",
//   //   name: "SE12 326",
//   //   building: "SE12",
//   //   level: "3",
//   //   details: "Lab-Computer",
//   //   lat: 0.00,
//   //   lng: 0.00,
//   //   last_updated: firebase.firestore.Timestamp.fromDate(new Date("March 17, 2024"))
//   // });
//   // classroomsRef.add({
//   //   code: "SE12_327",
//   //   name: "SE12 327",
//   //   building: "SE12",
//   //   level: "3",
//   //   details: "Lab-Computer",
//   //   lat: 0.00,
//   //   lng: 0.00,
//   //   last_updated: firebase.firestore.Timestamp.fromDate(new Date("March 17, 2024"))
//   // });
//   classroomsRef.add({
//     code: "SE12_401",
//     name: "SE12 401",
//     building: "SE12",
//     level: "4",
//     details: "Lab-Life Science",
//     lat: 0.00,
//     lng: 0.00,
//     last_updated: firebase.firestore.FieldValue.serverTimestamp()
//   });

//   classroomsRef.add({
//     code: "SE12_402",
//     name: "SE12 402",
//     building: "SE12",
//     level: "4",
//     details: "Lab-Life Science",
//     lat: 0.00,
//     lng: 0.00,
//     last_updated: firebase.firestore.FieldValue.serverTimestamp()
//   });
//   classroomsRef.add({
//     code: "SE12_403",
//     name: "SE12 403",
//     building: "SE12",
//     level: "4",
//     details: "Lab-Life Science",
//     lat: 0.00,
//     lng: 0.00,
//     last_updated: firebase.firestore.FieldValue.serverTimestamp()
//   });
//   classroomsRef.add({
//     code: "SE12_404",
//     name: "SE12 404",
//     building: "SE12",
//     level: "4",
//     details: "Lab-Life Science",
//     lat: 0.00,
//     lng: 0.00,
//     last_updated: firebase.firestore.FieldValue.serverTimestamp()
//   });
//   classroomsRef.add({
//     code: "SE12_406",
//     name: "SE12 406",
//     building: "SE12",
//     level: "4",
//     details: "Lab-Life Science",
//     lat: 0.00,
//     lng: 0.00,
//     last_updated: firebase.firestore.FieldValue.serverTimestamp()
//   });
//   classroomsRef.add({
//     code: "SE12_407",
//     name: "SE12 407",
//     building: "SE12",
//     level: "4",
//     details: "Lab-Life Science",
//     lat: 0.00,
//     lng: 0.00,
//     last_updated: firebase.firestore.FieldValue.serverTimestamp()
//   });
//   classroomsRef.add({
//     code: "SE12_412",
//     name: "SE12 412",
//     building: "SE12",
//     level: "4",
//     details: "Lab-Life Science",
//     lat: 0.00,
//     lng: 0.00,
//     last_updated: firebase.firestore.FieldValue.serverTimestamp()
//   });
//   classroomsRef.add({
//     code: "SE12_413",
//     name: "SE12 413",
//     building: "SE12",
//     level: "4",
//     details: "Lab-Life Science",
//     lat: 0.00,
//     lng: 0.00,
//     last_updated: firebase.firestore.FieldValue.serverTimestamp()
//   });
//   classroomsRef.add({
//     code: "SE12_414",
//     name: "SE12 414",
//     building: "SE12",
//     level: "4",
//     details: "Lab-Life Science",
//     lat: 0.00,
//     lng: 0.00,
//     last_updated: firebase.firestore.FieldValue.serverTimestamp()
//   });
//   classroomsRef.add({
//     code: "SE12_415",
//     name: "SE12 415",
//     building: "SE12",
//     level: "4",
//     details: "Lab-Life Science",
//     lat: 0.00,
//     lng: 0.00,
//     last_updated: firebase.firestore.FieldValue.serverTimestamp()
//   });
//   classroomsRef.add({
//     code: "SE12_416",
//     name: "SE12 416",
//     building: "SE12",
//     level: "4",
//     details: "Lab-Life Science",
//     lat: 0.00,
//     lng: 0.00,
//     last_updated: firebase.firestore.FieldValue.serverTimestamp()
//   });
//   classroomsRef.add({
//     code: "SE12_417",
//     name: "SE12 417",
//     building: "SE12",
//     level: "4",
//     details: "Lab-Life Science",
//     lat: 0.00,
//     lng: 0.00,
//     last_updated: firebase.firestore.FieldValue.serverTimestamp()
//   });
// }

