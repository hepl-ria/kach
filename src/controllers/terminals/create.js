/* leny/kach
 *
 * /src/controllers/terminals/create.js - Create terminal controller
 *
 * coded by leny@flatLand!
 * started at 18/11/2016
 */

import { ObjectID } from "mongodb";

import getTerminals from "../../models/terminals";
import { checkBank } from "../../models/banks";
import { send, error } from "../../core/utils/api";
import checkPosition from "../../core/utils/position";

export default function( oRequest, oResponse ) {

    const POST = oRequest.body;

    let iLatitude = +POST.latitude,
        iLongitude = +POST.longitude,
        sBankID = ( POST.bank || "" ).trim(),
        sAddress = ( POST.address || "" ).trim(),
        oPosition = checkPosition( iLatitude, iLongitude ),
        oTerminal, fCreateTerminal;

    if ( !oPosition ) {
        return error( oRequest, oResponse, "Invalid position", 400 );
    }

    oTerminal = {
        "latitude": oPosition.latitude,
        "longitude": oPosition.longitude,
        "created_at": new Date(),
        "updated_at": new Date(),
    };

    sAddress && ( oTerminal.address = sAddress );

    fCreateTerminal = ( bHasBank ) => {
        if ( bHasBank ) {
            oTerminal.bank = new ObjectID( sBankID );
        }

        return getTerminals().insertOne( oTerminal );
    };

    checkBank( sBankID )
        .then( fCreateTerminal )
        .then( () => {
            send( oRequest, oResponse, {
                "id": oTerminal._id,
                "address": oTerminal.address || null,
                "bank": oTerminal.bank || null,
                "latitude": oTerminal.latitude,
                "longitude": oTerminal.longitude,
            }, 201 );
        } )
        .catch( ( oError ) => error( oRequest, oResponse, oError ) );

}
