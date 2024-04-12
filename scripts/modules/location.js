/*
  Top-left corner(Intersection of Willingdon and Canada Way)
  https://www.google.com/maps/@49.2545877,-123.0068186,17z?entry=ttu
  Bottom-right corner(Intersection of Wayburne Drive and Deer Lake Parkway)
  https://www.google.com/maps/@49.2425018,-122.998416,17.52z?entry=ttu
*/

import { moveUserIcon, originalMapSize } from "./map.js";
import { ScreenPixelPosition } from "./map.js";

/**
 * Holds the range of geolocation positions we want to use.
 * @type {Array<Number>}
 */
const geoBoundaries = {
  /*
  CB: The top left is definitely way more accurate
    The bottom right i'm less certain of, since its a but tough to tell.
  */
  //Top-Left: 49.25483856825791, -123.00474666490439
  //Bottom-Right: 49.24152068410627, -122.99792396244739
  //49.254849523821335, -123.00480142555578
  //49.241552240505605, -122.99787155786976

  /**@type {Number} */
  maxX: -123.00480142555578,
  //maxX: -123.00353594360816,
  //minX: -123.0068186,
  /**@type {Number} */
  minX: -122.99787155786976,
  //minX: -122.99793923302757,
  /**@type {Number} */
  minY: 49.24165,
  /**@type {Number} */
  maxY: 49.25483856825791,
};

/** @type {boolean} */
var userOnCampus = false;
/** Checks if the given location is on campus
 * @returns {boolean}
 */
function isGeoOnCampus(long, lat) {
  return (
    lat < geoBoundaries.maxY &&
    lat > geoBoundaries.minY &&
    long > geoBoundaries.maxX &&
    long < geoBoundaries.minX
  );
}

/**
 * Takes a given geolocation and converts it to a pixel location within the map.
 * @param {GeolocationPosition} position
 * @returns {ScreenPixelPosition}
 */
function convertGeoToMap(position) {
  let retval = null;
  let percents = convertGeoToPercent(position);
  if (percents.x < 0 || percents.y < 0) {
    console.error("Given location is not on campus!");
  } else {
    // console.log("Percents:", percents);
    // console.log("Matrix X Y:", mapMatrix[0], mapMatrix[3]);
    retval = new ScreenPixelPosition(
      originalMapSize.x * percents.x,
      originalMapSize.y * percents.y
    );
    // console.warn("user geo on map:", retval);
  }
  return retval;
}

/**
 * Converts from GeoLocation to a percent X/Y of the map.
 * This will let us position the user based on the percent of the map size.
 * @param {GeolocationPosition} position
 * @returns {Array<Number, Number>}
 */
function convertGeoToPercent(position) {
  let userLong = position.coords.longitude;
  let userLat = position.coords.latitude;
  let retval = { x: -1, y: -1 };

  // Math.abs((usePos - Min)/(Min - Max)) * 100
  if (isGeoOnCampus(userLong, userLat)) {
    // console.log("User is inside campus");
    // console.log("User location:", userLong, userLat);
    let userLongPercent = Math.abs(
      (userLong - geoBoundaries.maxX) /
        (geoBoundaries.minX - geoBoundaries.maxX)
    );
    let userLatPercent = Math.abs(
      (userLat - geoBoundaries.maxY) / (geoBoundaries.minY - geoBoundaries.maxY)
    );
    retval = { x: userLongPercent, y: userLatPercent };
  } else {
    console.warn("User is outside campus!", position);
  }
  return retval;
}

/**@type {GeolocationPosition} */
var userPosition;

/** @type {PositionOptions} */
const positionOptions = {
  enableHighAccuracy: true,
};

/**
 * Starts tracking the user location, and sets a watcher for position updates.
 */
function setupLocation() {
  //CB: Useful information on how Geolocation works:
  //https://w3c.github.io/geolocation-api/#dom-geolocationposition

  //uses navigator to get the geolocation
  //Watch position does it constantly instead of just once
  navigator.geolocation.watchPosition(
    (position) => {
      userPosition = position;
      userOnCampus = isGeoOnCampus(
        userPosition.coords.longitude,
        userPosition.coords.latitude
      );
      let mapUserPosition = convertGeoToMap(userPosition);
      moveUserIcon(mapUserPosition);
    },
    null,
    positionOptions
  );
}

export { userPosition, userOnCampus, setupLocation, convertGeoToMap };
