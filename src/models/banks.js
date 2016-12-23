/* leny/kach
 *
 * /src/models/banks.js - Model for banks
 *
 * coded by leny@flatLand!
 * started at 21/10/2016
 */

import Promise from "bluebird";
import { db } from "../core/mongodb";
import { ObjectID } from "mongodb";

let fCheckBank;

fCheckBank = function( sBankID ) {
    let oBankID;

    if ( !sBankID ) {
        return Promise.resolve( false );
    }

    try {
        oBankID = new ObjectID( sBankID );
    } catch ( oError ) {
        return Promise.reject( new Error( "Invalid Bank ID!" ) );
    }

    return db.collection( "banks" )
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

export default function() {
    return db.collection( "banks" );
}

export {
    fCheckBank as checkBank,
};
