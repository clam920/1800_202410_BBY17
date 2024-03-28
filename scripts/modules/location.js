/*
  Top-left corner(Intersection of Willingdon and Canada Way)
  https://www.google.com/maps/@49.2545877,-123.0068186,17z?entry=ttu
  Bottom-right corner(Intersection of Wayburne Drive and Deer Lake Parkway)
  https://www.google.com/maps/@49.2425018,-122.998416,17.52z?entry=ttu
*/

/**
 * Currently not used; will update later with more useful attributes for tracking user location.
 * All constructor overloads will calculate the other types of user positions (approximate geolocation, Screen position, screen percent) given one type.
 */
class UserPosition {

  /**
   * The users current geoposition.
   * @type {GeolocationPosition}
   */
  geolocation

  /**
   * Constructs based on the given Geolocation 
   * @param {GeolocationPosition} location Can also be a ScreenPixelPosition, or an array where the first 2 indexes are the x and Y positions.
   */
  constructor(location) {
    this.geolocation = geolocation;
  };
}

/**@type {GeolocationPosition} */
var userPosition;

/** @type {PositionOptions} */
const positionOptions = {
  enableHighAccuracy: true
}

/**
 * Starts tracking the user location, and sets a watcher for position updates.
 */
function setupLocation() {
  //CB: Useful information on how Geolocation works:
  //https://w3c.github.io/geolocation-api/#dom-geolocationposition

  //uses navigator to get the geolocation
  //Watch position does it constantly instead of just once
  navigator.geolocation.watchPosition(position => {
    //logs current position to the console
    //console.log(position);
    userPosition = position;
  }, null, positionOptions);
}

/**
 * Converts from GeoLocation to a percent X/Y of the screen.
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
    return { x: userLongPercent, y: userLatPercent };
  }
  return
};

export { userPosition, setupLocation, convertWorldToPercent }