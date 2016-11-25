/* leny/kach
 *
 * /src/controllers/terminals/list.js - Controller for terminals list
 *
 * coded by leny@flatLand!
 * started at 27/10/2016
 */

import getTerminals from "../../models/terminals";
import { send, error } from "../../core/utils/api";
import distance from "jeyo-distans";
import checkPosition from "../../core/utils/position";

const ARC_KILOMETER = 0.009259, // 1 décimale de lat/lng vaut X km.
    DEFAULT_RADIUS = 1,
    MAX_RADIUS = 10;

export default function( oRequest, oResponse ) {

    let oCurrentPosition = checkPosition( +oRequest.query.latitude, +oRequest.query.longitude ),
        iSearchRadius = +oRequest.query.radius;

    if ( !oCurrentPosition ) {
        return error( oRequest, oResponse, "Invalid position!", 400 );
    }

    // check & cap radius
    ( isNaN( iSearchRadius ) ) && ( iSearchRadius = DEFAULT_RADIUS );
    ( iSearchRadius < DEFAULT_RADIUS ) && ( iSearchRadius = DEFAULT_RADIUS );
    ( iSearchRadius > MAX_RADIUS ) && ( iSearchRadius = MAX_RADIUS );

    iSearchRadius *= ARC_KILOMETER; // convert radius from kilometer to arc

    getTerminals()
        .find( {
            "latitude": {
                "$gt": oCurrentPosition.latitude - iSearchRadius,
                "$lt": oCurrentPosition.latitude + iSearchRadius,
            },
            "longitude": {
                "$gt": oCurrentPosition.longitude - iSearchRadius,
                "$lt": oCurrentPosition.longitude + iSearchRadius,
            },
            "deleted_at": null,
        } )
        .toArray()
        .then( ( aTerminals = [] ) => {
            let aCleanTerminals,
                aTerminalsToReset = [];

            // clean empty state on terminals, clean useless properties AND compute distance
            aCleanTerminals = aTerminals.map( ( { _id, bank, latitude, longitude, address, empty, updated_at } ) => {
                let bEmptyState = empty;

                if ( Date.now() - ( new Date( updated_at ) ).getTime() > 24 * 3600 * 1000 && bEmptyState ) {
                    bEmptyState = false;
                    aTerminalsToReset.push( _id );
                }

                return {
                    "id": _id,
                    "empty": bEmptyState,
                    "distance": distance( oCurrentPosition, { latitude, longitude } ) * 1000,
                    bank, latitude, longitude, address,
                };
            } );

            getTerminals()
                .update( {
                    "_id": { "$in": aTerminalsToReset }
                }, {
                    "$set": { "empty": false, "updated_at": new Date() }
                } );

            // sort by distance
            aCleanTerminals.sort( ( oTerminalOne, oTerminalTwo ) => oTerminalOne.distance - oTerminalTwo.distance );

            send( oRequest, oResponse, aCleanTerminals );
        } )
        .catch( ( oError ) => error( oRequest, oResponse, oError ) );
}
