/* leny/kach
 *
 * /src/models/banks.js - Model for banks
 *
 * coded by leny@flatLand!
 * started at 21/10/2016
 */

import { db } from "../core/mongodb";

let oBanks = db.collection( "banks" );

export default oBanks;
