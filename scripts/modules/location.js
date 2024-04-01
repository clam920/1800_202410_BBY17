/*
  Top-left corner(Intersection of Willingdon and Canada Way)
  https://www.google.com/maps/@49.2545877,-123.0068186,17z?entry=ttu
  Bottom-right corner(Intersection of Wayburne Drive and Deer Lake Parkway)
  https://www.google.com/maps/@49.2425018,-122.998416,17.52z?entry=ttu
*/

import { ScreenPixelPosition } from "./map.js";

/**
 * Holds the range of geolocation positions we want to use.
 * @type {Array<Number>}
 */
const geoBoundaries = {
  /**@type {Number} */
  minX:-123.0068186,
  /**@type {Number} */
  maxX:-122.998416,
  /**@type {Number} */
  minY: 49.2425018,
  /**@type {Number} */
  maxY:49.2545877
}

/**
 * Converts from GeoLocation to a percent X/Y of the screen.
 * This will let us position the user based on the percent of the map size.
 * @param {GeolocationPosition} position 
 * @returns {Array<Number, Number>}
 */
function convertWorldToPercent(position) {

  let userLong = position.coords.longitude;
  let userLat = position.coords.latitude;
  let retval = {x: 50, y: 50};

  let maxX = geoBoundaries.maxX;
  let minX = geoBoundaries.minX;
  let maxY = geoBoundaries.maxY;
  let minY = geoBoundaries.minY;

  // Math.abs((usePos - Min)/(Min - Max)) * 100
  if (
      userLat < maxY
      && userLat > minY
      && userLong < maxX
      && userLong > minX
    ) {
    console.log("User is inside campus");
    let userLongPercent = Math.abs((userLong - maxX) / (minX - maxX)) * 100;
    let userLatPercent = Math.abs((userLat - maxY) / (minY - maxY)) * 100;
    retval =  { x: userLongPercent, y: userLatPercent };
  } else {
    console.warn("User is outside campus!")
  }
  return retval;
};

/**
 * Currently not used; will update later with more useful attributes for tracking user location.
 * All constructor overloads will calculate the other types of user positions (approximate geolocation, Screen position, screen percent) given one type.
 */
class UserPosition {

  /**
   * The users current geoposition.
   * @type {GeolocationPosition}
   */
  geolocation;

  /**
   * The users location on screen in pixels.
   * @type {ScreenPixelPosition}
   */
  pixelLocation;

    /**
   * Private function to calculate the pixel position when the geoposition us updated.
   */
  static #calculatePixel(geolocation) {
    console.log(geolocation);
    let percents = convertWorldToPercent(geolocation);
    console.log(percents);
    //TODO: Change this to SVG height and width.
    let pixelLocation = new ScreenPixelPosition(
      screen.width / percents.x,
      screen.height / percents.y
    );
    return pixelLocation;
  }

  /**
   * Constructs based on the given information.
   * If given an array with 2 numbers, it will assign those to x and y for pixelLocation. 
   * @param {GeolocationPosition | ScreenPixelPosition | Array<Number>} location the users current location.
   */
  constructor(location) {
    if (location instanceof GeolocationPosition) {
      console.log("Geolocation given");
      this.geolocation = location;
      this.pixelLocation = UserPosition.#calculatePixel(location);
    } else if (location instanceof ScreenPixelPosition) {
      this.pixelLocation = location;
    } else if (location instanceof Array) {
      if (location.length < 2) {
        this.pixelLocation = new ScreenPixelPosition(location[0], location[1]);
      } else {
        console.warn("Given location array was shorter than 2!" + location);
        this.pixelLocation = new ScreenPixelPosition(0, 0);
      }
    } else {
      console.error("Invalid constructor given for location! \n" 
        + typeof(location));
    }return this;
  };
}

/** @type {UserPosition} */
var userPos;

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
    console.log("Updating location");
    //logs current position to the console
    //console.log(position);
    userPosition = position;
    userPos = new UserPosition(position);
    console.log(userPos.pixelLocation.x);
  }, null, positionOptions);
}

export { userPosition, setupLocation, convertWorldToPercent }