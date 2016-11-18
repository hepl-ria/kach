/* leny/kach
 *
 * /src/controllers/terminals/create.js - Create terminal controller
 *
 * coded by leny@flatLand!
 * started at 18/11/2016
 */

import Promise from "bluebird";
import { ObjectID } from "mongodb";

import getTerminals from "../../models/terminals";
import getBanks from "../../models/banks";
import { send, error } from "../../core/utils/api";
import checkPosition from "../../core/utils/position";

export default function( oRequest, oResponse ) {

    const POST = oRequest.body;

    let iLatitude = +POST.latitude,
        iLongitude = +POST.longitude,
        sBankID = ( POST.bank || "" ).trim(),
        sAddress = ( POST.address || "" ).trim(),
        oPosition = checkPosition( iLatitude, iLongitude ),
        oTerminal, fCheckBank, fCreateTerminal;

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

    fCheckBank = () => {
        let oBankID;

        if ( !sBankID ) {
            return Promise.resolve( false );
        }

        try {
            oBankID = new ObjectID( sBankID );
        } catch( oError ) {
            return Promise.reject( new Error( "Invalid Bank ID!" ) );
        }

        return getBanks()
            .findOne( {
                "_id": oBankID,
            } )
            .then( ( oBank ) => {
                if ( oBank ) {
                    return Promise.resolve( true );
                }

                return Promise.reject( new Error( "Unknown Bank!" ) );
            } );
    };

    fCreateTerminal = ( bHasBank ) => {
        if ( bHasBank ) {
            oTerminal.bank = new ObjectID( sBankID );
        }

        return getTerminals().insertOne( oTerminal );
    };

    fCheckBank()
        .then( fCreateTerminal )
        .then( () => {
            send( oRequest, oResponse, oTerminal, 201 );
        } )
        .catch( ( oError ) => error( oRequest, oResponse, oError ) );

}
