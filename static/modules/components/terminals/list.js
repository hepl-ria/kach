/* leny/kach
 *
 * /static/modules/components/terminals/list.js - Terminals list Vue component
 *
 * coded by leny@flatLand!
 * started at 23/12/2016
 */

import Vue from "vue";
import reqwest from "reqwest";

import getLocation from "../../utils/location-manager.js";
import getBank from "../../utils/banks-manager.js";

let oTerminalsList = Vue.component( "terminals-list", {
    "data": function() {
        return {
            "loaded": false,
            "terminals": [],
            "error": null,
            "banks": {},
        };
    },
    "template": `
        <div class="terminals-list">
            <div class="loading" v-if="!loaded">
                <p>loading…</p>
            </div>
            <div class="error" v-if="loaded && error">
                <p>
                    <strong>Error:</strong> {{ error }}
                </p>
            </div>
            <ul v-if="loaded">
                <li v-for="elt in terminals">
                    <router-link :to="'/' + elt.id">
                        <strong>{{ elt.bank ? elt.bank.name : "Unknown" }}</strong>
                        <address>{{ elt.address }}</address>
                        <span class="distance">{{ elt.distance }}m</span>
                    </router-link>
                </li>
            </ul>
        </div>
    `,
    mounted() {
        return getBank()
            .then( this.updatePosition )
            .catch( this.showError );
    },
    "methods": {
        updatePosition() {
            // 1. get user's position
            return getLocation()
                .then( ( { coords } ) => {
                    // 2. get terminals at position
                    return reqwest( {
                        "url": "/terminals",
                        "method": "get",
                        "data": {
                            "latitude": coords.latitude,
                            "longitude": coords.longitude,
                        },
                    } );
                } )
                .then( ( oResponse ) => {
                    // 3. update local data (vue will refresh the DOM)
                    this.loaded = true;
                    // NOTE: for each terminal in data, we will replace the "bank" property (the id of the bank) by the getBank result (the data of the bank)
                    this.terminals = oResponse.data.map( ( oTerminal ) => {
                        oTerminal.bank = getBank( oTerminal.bank );
                        return oTerminal;
                    } );
                } )
                .catch( this.showError );
        },
        showError( { message } ) {
            this.loaded = true;
            this.error = message;
        },
    },
} );

export default oTerminalsList;
