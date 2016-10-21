/* leny/kack
 *
 * /src/controllers/banks/list.js - Controllers for banks list
 *
 * coded by leny@flatLand!
 * started at 21/10/2016
 */

import getBanks from "../../models/banks";
import { send, error } from "../../core/utils/api";

export default function( oRequest, oResponse ) {

    let sCountryCode = ( oRequest.params.country || "" ).toUpperCase();

    getBanks()
        .find( {
            "country": sCountryCode,
        } )
        .toArray()
        .then( ( aBanks ) => {
            // TODO: filter banks output
            send( oRequest, oResponse, aBanks );
        } )
        .catch( ( oError ) => error( oRequest, oResponse, oError ) );
}
