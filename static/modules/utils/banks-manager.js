/* leny/kach
 *
 * /static/modules/utils/banks-manager.js - Banks manager utility
 *
 * coded by leny@flatLand!
 * started at 23/12/2016
 */

import reqwest from "reqwest";
import Promise from "bluebird";

// NOTE: the goal here is to have a function, which can be called with or without a BankID, and will fetch banks from server, caching it in a variable, to avoid reloading all over again

let oBanks = {};

export default function( sBankId = null ) {
    if ( sBankId && oBanks[ sBankId ] ) {
        return oBanks[ sBankId ];
    }
    return reqwest( {
        "url": "/banks",
        "method": "get",
        "data": {
            "country": "BE", // NOTE: it's hardcoded. Not really good.
        },
    } )
        .then( ( oResponse ) => {
            for ( let oBank of oResponse.data ) {
                oBanks[ oBank.id ] = oBank;
            }
            return oBanks[ sBankId ] || null;
        } );
}
