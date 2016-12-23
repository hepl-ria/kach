/* leny/kach
 *
 * /static/modules/main.js - Main entry file
 *
 * coded by leny@flatLand!
 * started at 09/12/2016
 */

import Vue from "vue";
import VueRouter from "vue-router";

Vue.use( VueRouter );

import TerminalsList from "./components/terminals-list";
import TerminalDetails from "./components/terminal-details";

let oRouter = new VueRouter( {
    "routes": [
        { "path": "/", "component": TerminalsList },
        { "path": "/:id", "component": TerminalDetails },
    ],
} );

let oApp = new Vue( {
    "template": `
        <div class="wrapper">
            <header>
                <h1>kach</h1>
            </header>
            <router-view></router-view>
            <footer>
                <a href="https://github.com/hepl-ria/kach">hepl-ria/kach</a>
            </footer>
        </div>
    `,
    "router": oRouter,
} );

oApp.$mount( "#app" );
