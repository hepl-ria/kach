/* leny/kach
 *
 * /src/controllers/terminals/destroy.js - Delete terminal controller
 *
 * coded by leny@flatLand!
 * started at 18/11/2016
 */

import { ObjectID } from "mongodb";
import { send, error } from "../../core/utils/api";
import getTerminals from "../../models/terminals";

export default function( oRequest, oResponse ) {

    let oTerminalID;

    try {
        oTerminalID = new ObjectID( oRequest.params.id );
    } catch ( oError ) {
        return error( oRequest, oResponse, new Error( "Invalid ID!" ), 400 );
    }

    getTerminals()
        .deleteOne( {
            "_id": oTerminalID,
        } )
        .then( ( { deletedCount } ) => {
            if ( deletedCount === 1 ) {
                return send( oRequest, oResponse, null, 204 );
            }

            return error( oRequest, oResponse, "Unknown deletion error", 500 );
        } )
        .catch( ( oError ) => error( oRequest, oResponse, oError ) );

}
