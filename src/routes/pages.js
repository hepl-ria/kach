/* leny/kach
 *
 * /src/routes/pages.js - Pages routes
 *
 * coded by leny@flatLand!
 * started at 25/11/2016
 */

import { Router } from "express";

import homepageController from "../controllers/pages/home";

let oRouter = new Router();

oRouter.get( "/", homepageController );

export default oRouter;
