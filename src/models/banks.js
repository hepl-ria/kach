/* leny/kach
 *
 * /src/models/banks.js - Model for banks
 *
 * coded by leny@flatLand!
 * started at 21/10/2016
 */

// TODO: refactor this (init models from db connexion)

import { db } from "../core/mongodb";

export default function() {
    return db.collection( "banks" );
}
