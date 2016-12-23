/* leny/kach
 *
 * /static/modules/utils/location-manager.js - Location manager
 *
 * coded by leny@flatLand!
 * started at 23/12/2016
 */

// NOTE: see this as a Christmas Gift ;)
// The following code is a bit tricky. The idea is to have a function that we can call and will returns the current user's location, with a Promise, and… fast. So the following code will keep the last position for 60 seconds, as cache.

import Promise from "bluebird";

const DEFAULT_OPTIONS = { "enableHighAccuracy": true },
    TTL = 60 * 1000; // 60s

let oLastPosition;

export default function( oOptions = {} ) {
    if ( oLastPosition && Date.now() - oLastPosition.timestamp < TTL ) {
        return Promise.resolve( oLastPosition );
    }

    return new Promise( function( fResolve, fReject ) { // eslint-disable-line prefer-arrow-callback
        navigator.geolocation.getCurrentPosition( ( oPosition ) => fResolve( oLastPosition = oPosition ), fReject, Object.assign( {}, DEFAULT_OPTIONS, oOptions ) );
    } );
}
