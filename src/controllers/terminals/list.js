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
            let aCleanTerminals;

            // clean useless properties AND compute distance
            aCleanTerminals = aTerminals.map( ( { _id, bank, latitude, longitude, address, empty } ) => ( {
                "id": _id,
                "empty": !!empty,
                "distance": distance( oCurrentPosition, { latitude, longitude } ) * 1000,
                bank, latitude, longitude, address,
            } ) );

            // sort by distance
            aCleanTerminals.sort( ( oTerminalOne, oTerminalTwo ) => oTerminalOne.distance - oTerminalTwo.distance );

            send( oRequest, oResponse, aCleanTerminals );
        } )
        .catch( ( oError ) => error( oRequest, oResponse, oError ) );
}
