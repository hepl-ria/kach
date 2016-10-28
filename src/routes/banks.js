/* leny/kach
 *
 * /src/routes/banks.js - API Routes for banks
 *
 * coded by leny@flatLand!
 * started at 21/10/2016
 */

import { Router } from "express";
import listBanksController from "../controllers/banks/list";

let oRouter = new Router();

oRouter.get( "/banks", listBanksController );

export default oRouter;
