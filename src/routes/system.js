/* leny/kach
 *
 * /src/routes/system.js - System routes
 *
 * coded by leny@flatLand!
 * started at 21/10/2016
 */

import { Router } from "express";

import sysPingController from "../controllers/system/ping";
import sysEchoController from "../controllers/system/echo";
import sysErrorController from "../controllers/system/error";

let oRouter = new Router();

oRouter.get( "/sys/ping", sysPingController );
oRouter.get( "/sys/echo", sysEchoController );
oRouter.get( "/sys/error", sysErrorController );

export default oRouter;
