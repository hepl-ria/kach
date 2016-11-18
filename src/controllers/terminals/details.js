/* leny/kach
 *
 * /src/controllers/terminals/details.js - Controller for terminal details
 *
 * coded by leny@flatLand!
 * started at 28/10/2016
 */

import getTerminals from "../../models/terminals";
import { send, error } from "../../core/utils/api";
import { ObjectID } from "mongodb";
import distance from "jeyo-distans";

import checkPosition from "../../core/utils/position";

export default function( oRequest, oResponse ) {

    let sTerminalID = ( oRequest.params.id || "" ).trim(),
        oCurrentPosition;

    if ( !sTerminalID ) {
        error( oRequest, oResponse, "Invalid ID!", 400 );
    }

    oCurrentPosition = checkPosition( +oRequest.query.latitude, +oRequest.query.longitude );

    getTerminals()
        .findOne( {
            "_id": new ObjectID( sTerminalID ),
            "deleted_at": null,
        } )
        .then( ( oTerminal ) => {
            if ( !oTerminal ) {
                return error( oRequest, oResponse, "Unknown Terminal", 404 );
            }

            let { _id, bank, latitude, longitude, address, empty } = oTerminal,
                oCleanTerminal;

            oCleanTerminal = {
                "id": _id,
                "empty": !!empty,
                bank, latitude, longitude, address,
            };

            if ( oCurrentPosition ) {
                oCleanTerminal.distance = distance( oCurrentPosition, oCleanTerminal ) * 1000;
            }

            send( oRequest, oResponse, oCleanTerminal );
        } )
        .catch( ( oError ) => error( oRequest, oResponse, oError ) );
}
