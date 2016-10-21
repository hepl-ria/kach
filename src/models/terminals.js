/* leny/kach
 *
 * /src/models/terminals.js - Model for terminals
 *
 * coded by leny@flatLand!
 * started at 21/10/2016
 */

import { db } from "../core/mongodb";

let oTerminals = db.collection( "terminals" );

export default oTerminals;
