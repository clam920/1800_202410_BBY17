/*
  Top-left corner(Intersection of Willingdon and Canada Way)
  https://www.google.com/maps/@49.2545877,-123.0068186,17z?entry=ttu
  Bottom-right corner(Intersection of Wayburne Drive and Deer Lake Parkway)
  https://www.google.com/maps/@49.2425018,-122.998416,17.52z?entry=ttu
*/

var userPosition;
const positionOptions = {
  enableHighAccuracy: true
}
//Function to get the current location using geo location
function setupLocation() {
  //CB: Useful information on how Geolocation works:
  //https://w3c.github.io/geolocation-api/#dom-geolocationposition

  //uses navigator to get the geolocation
  //Watch position does it constantly instead of just once
  navigator.geolocation.watchPosition(position => {
    console.log(position);
    //logs current position to the console
    userPosition = position;
    convertWorldToPercent(position);
  }, null, PositionOptions);
}

/**
 * Converts from GeoLocation to a percent X/Y of the campus.
 * This will let us position the user based on the percent of the map size.
 * @param {GeolocationPosition} position 
 * @returns {Array<Number, Number>}
 */
function convertWorldToPercent(position) {
  //Get width/height of the area we're working in
  let minX = -123.0068186;
  let maxX = -122.998416;
  let minY = 49.2425018;
  let maxY = 49.2545877;

  let userLong = position.coords.longitude;
  let userLat = position.coords.latitude;

  // Math.abs((usePos - Min)/(Min - Max)) * 100
  if (position.coords.latitude < maxY
    && position.coords.latitude > minY
    && position.coords.longitude < maxX
    && position.coords.longitude > minX) {
    console.log("USer is inside campus");
    let userLongPercent = Math.abs((userLong - maxX) / (minX - maxX)) * 100;
    let userLatPercent = Math.abs((userLat - maxY) / (minY - maxY)) * 100;
    return {x: userLongPercent, y:userLatPercent};
  }
  return 
};

export {userPosition, setupLocation, convertWorldToPercent}