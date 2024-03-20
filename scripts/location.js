var userPosition;
//Function to get the current locaition using geo location
function getLocation() {
  //Checks if the content is loaded first before giving location
  document.addEventListener("DOMContentLoaded", function () {
    //CB: Useful information on how Geolocation works:
    //https://w3c.github.io/geolocation-api/#dom-geolocationposition

    //uses navigator to get the geolocation
    //Watch position does it constantly instead of just once
    navigator.geolocation.watchPosition(position => {
      console.log(position);
      //logs current position to the console
      userPosition = position;
      testUserVsWorld(position);
    });
  });
}

getLocation();

function convertWorldToPercent(userPos) {
  //Get width/height of the area we're working in
  let minX = -123.0068186;
  let maxX = -122.998416;
  let minY = 49.2425018;
  let maxY = 49.2545877;

  let userLong = userPos.coords.longitude;
  let userLat = userPos.coords.latitude;

  // Math.abs((usePos - Min)/(Min - Max)) * 100
  if (userPos.coords.latitude < maxY
    && userPos.coords.latitude > minY
    && userPos.coords.longitude < maxX
    && userPos.coords.longitude > minX) {
    console.log("USer is inside campus");
  }

  let userLongPercent = Math.abs((userLong - minX)/(minX - maxX)) * 100;
  let userLatPercent = Math.abs((userLat - maxY)/(minY - maxY)) * 100;
  console.log(userLongPercent, userLatPercent);
};
/*
  Top-left corner(Intersection of Willingdom and Canada Way)
  https://www.google.com/maps/@49.2545877,-123.0068186,17z?entry=ttu
  Bottom-right corner(Intersection of wayburne Drive and Deer Lake Parkway)
  https://www.google.com/maps/@49.2425018,-122.998416,17.52z?entry=ttu
*/
// //Get width/height of the area we're working in
// let minX = -123.0068186;
// let maxX = -122.998416;
// let minY = 49.2425018;
// let maxY = 49.2545877;

// let diffX = maxX - minX;
// let diffY = maxY - minY;

// console.log(userPosition);

// //Convert the width and height of the area to 