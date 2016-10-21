/* leny/kach
 *
 * /src/controllers/system/ping.js - Controller for system ping
 *
 * coded by leny@flatLand!
 * started at 21/10/2016
 */

export default function( oRequest, oResponse ) {
    oResponse.json( {
        "url": oRequest.url,
        "timestamp": Date.now(),
        "data": true,
        "error": false,
    } );
}
