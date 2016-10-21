/* leny/kach
 *
 * /src/core/utils/api.js - API utils
 *
 * coded by leny@flatLand!
 * started at 21/10/2016
 */

let fSend, fError;

fSend = function( oRequest, oResponse, oData = {}, iStatus = 200 ) {
    oResponse.status( iStatus ).json( {
        "url": `[${ oRequest.method }] ${ oRequest.url }`,
        "timestamp": Date.now(),
        "data": oData,
        "error": false,
    } );
};

fError = function( oRequest, oResponse, oError, iStatus = 500 ) {
    oResponse.status( iStatus ).json( {
        "url": `[${ oRequest.method }] ${ oRequest.url }`,
        "timestamp": Date.now(),
        "data": null,
        "error": oError,
    } );
};

export {
    fSend as send,
    fError as error,
};
