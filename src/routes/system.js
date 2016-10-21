/* leny/kach
 *
 * /src/routes/system.js - System routes
 *
 * coded by leny@flatLand!
 * started at 21/10/2016
 */

import { Router } from "express";

import sysPingController from "../controllers/system/ping";

let oRouter = new Router();

oRouter.get( "/sys/ping", sysPingController );
// oRouter.get( "/sys/echo" );
// oRouter.get( "/sys/error" );

export default oRouter;
