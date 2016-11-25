/* leny/kach
 *
 * /src/controllers/terminals/update.js - Controller for terminal update
 *
 * coded by leny@flatLand!
 * started at 25/11/2016
 */

import { ObjectID } from "mongodb";

import getTerminals from "../../models/terminals";
import { checkBank } from "../../models/banks";
import { send, error } from "../../core/utils/api";
import distance from "jeyo-distans";
import checkPosition from "../../core/utils/position";

const MAX_MOVE_DISTANCE = 0.1; // in km

export default function( oRequest, oResponse ) {

    // 1. get values

    const POST = oRequest.body;

    let oTerminalID,
        sAddress = ( POST.address || "" ).trim(),
        bEmpty = !!POST.empty,
        iLatitude = POST.latitude,
        iLongitude = POST.longitude,
        sBankID = ( POST.bank || "" ).trim(),
        oPosition, aModifications = [];

    try {
        oTerminalID = new ObjectID( oRequest.params.id );
    } catch( oError ) {
        return error( oRequest, oResponse, new Error( "Invalid ID!" ), 400 );
    }

    // 2. check if terminal exists

    getTerminals()
        .findOne( {
            "_id": oTerminalID,
        } )
        .then( ( oTerminal ) => {
            if ( !oTerminal ) {
                return error( oRequest, oResponse, new Error( "Unknown Terminal" ), 404 );
            }


            // 3. check values

            // 3a. check position
            if ( iLatitude != null && iLongitude != null ) {
                oPosition = checkPosition( +iLatitude, +iLongitude );
                if ( !oPosition ) {
                    return error( oRequest, oResponse, new Error( "Invalid position" ), 400 );
                }

                // if position ≠ old position, check move distance
                if ( oTerminal.latitude !== oPosition.latitude || oTerminal.longitude !== oPosition.longitude ) {
                    if ( distance( oPosition, oTerminal ) > MAX_MOVE_DISTANCE ) {
                        return error( oRequest, oResponse, new Error( "Movement is too big" ), 400 );
                    }
                    oTerminal.latitude = oPosition.latitude;
                    oTerminal.longitude = oPosition.longitude;
                    aModifications.push( "latitude", "longitude" );
                }
            }

            // 3b. check address
            if ( sAddress ) {
                oTerminal.address = sAddress;
                aModifications.push( "address" );
            }

            // 3c. check empty
            if ( bEmpty ) {
                oTerminal.empty = true;
                aModifications.push( "empty" );
            }

            // 3d. if bank changes, check bank
            return checkBank( sBankID ).then( ( bHasBank ) => {
                let oModificationsToApply = {};

                if ( bHasBank ) {
                    oTerminal.bank = new ObjectID( sBankID );
                    aModifications.push( "bank" );
                }

                if ( aModifications.length === 0 ) {
                    return error( oRequest, oResponse, new Error( "No changes" ), 400 );
                }

                aModifications.forEach( ( sPropertyName ) => {
                    oModificationsToApply[ sPropertyName ] = oTerminal[ sPropertyName ];
                } );

                oModificationsToApply.updated_at = new Date();

                return getTerminals()
                    .updateOne( {
                        "_id": oTerminal._id,
                    }, {
                        "$set": oModificationsToApply,
                    } )
                    .then( ( { matchedCount, modifiedCount } ) => {
                        if ( matchedCount !== 1 || modifiedCount !== 1 ) {
                            return error( oRequest, oResponse, new Error( "Unknown save error" ), 500 );
                        }

                        return send( oRequest, oResponse, null, 204 );
                    } );
            } );
        } )
        .catch( ( oError ) => error( oRequest, oResponse, oError ) );

    // 4. apply modifications
}
