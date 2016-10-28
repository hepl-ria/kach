/* leny/kach
 *
 * /src/controllers/banks/list.js - Controllers for banks list
 *
 * coded by leny@flatLand!
 * started at 21/10/2016
 */

import getBanks from "../../models/banks";
import { send, error } from "../../core/utils/api";

export default function( oRequest, oResponse ) {

    let sCountryCode = ( oRequest.query.country || "" ).toUpperCase();

    if ( !sCountryCode ) {
        error( oRequest, oResponse, "Mandatory country query params not found!", 400 );
    }

    getBanks()
        .find( {
            "country": sCountryCode,
        } )
        .toArray()
        .then( ( aBanks ) => {
            let aParsedBanks;

            aParsedBanks = aBanks.filter( ( { deleted_at } ) => !deleted_at );
            aParsedBanks = aParsedBanks.map( ( { _id, country, color, name, icon, url } ) => ( {
                "id": _id,
                country, color, name, icon, url,
            } ) );

            send( oRequest, oResponse, aParsedBanks );
        } )
        .catch( ( oError ) => error( oRequest, oResponse, oError ) );
}
