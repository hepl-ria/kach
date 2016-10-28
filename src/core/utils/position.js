/* leny/kach
 *
 * /src/core/utils/position.js - Position checker utility
 *
 * coded by leny@flatLand!
 * started at 27/10/2016
 */

export default function( iLatitude, iLongitude ) {
    if ( isNaN( iLatitude ) || isNaN( iLongitude ) ) {
        return false;
    }

    if ( iLatitude < -90 || iLatitude > 90 ) {
        return false;
    }

    if ( iLongitude < -180 || iLongitude > 180 ) {
        return false;
    }

    return {
        "latitude": iLatitude,
        "longitude": iLongitude,
    };
}
