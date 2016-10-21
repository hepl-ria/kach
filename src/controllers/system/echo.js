/* leny/kach
 *
 * /src/controllers/system/echo.js - Controller for system echo
 *
 * coded by leny@flatLand!
 * started at 21/10/2016
 */

export default function( oRequest, oResponse ) {
    let sEcho = oRequest.query.echo || "hello, world!";

    oResponse.send( {
        "url": oRequest.url,
        "timestamp": Date.now(),
        "data": sEcho,
        "error": false,
    } );
}
