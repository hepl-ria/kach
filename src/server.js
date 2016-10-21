/* leny/kach
 *
 * /src/server.js - main entry point
 *
 * coded by leny@flatLand!
 * started at 21/10/2016
 */

import { init as initDB } from "./core/mongodb";
import { init as initExpress } from "./core/express";

const APP_PORT = 12345;

initDB()
    .then( () => initExpress( APP_PORT ) );
