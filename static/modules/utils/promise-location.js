/* leny/kach
 *
 * /static/modules/utils/promise-location.js - Promised geolocation
 *
 * coded by leny@flatLand!
 * started at 23/12/2016
 */

// NOTE: as we know, navigator.geolocation.getCurrentPosition is a bit crooked.
// We add this little utility to allow us to use it with Promise.
// This should be good to use an external module for it.

import Promise from "bluebird";

const DEFAULT_OPTIONS = { "enableHighAccuracy": true };

export default function( oOptions = {} ) {
    return new Promise( ( fResolve, fError ) => {
        navigator.geolocation.getCurrentPosition( fResolve, fError, Object.assign( {}, DEFAULT_OPTIONS, oOptions ) );
    } );
}
