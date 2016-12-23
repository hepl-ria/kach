/* leny/kach
 *
 * /static/modules/components/terminals-list.js - Terminals list Vue component
 *
 * coded by leny@flatLand!
 * started at 23/12/2016
 */

import Vue from "vue";
import reqwest from "reqwest";

const GEOLOCATION_OPTIONS = { "enableHighAccuracy": true };

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
                    <strong>Error:</strong>
                    {{ error.message }}
                </p>
            </div>
            <ul v-if="loaded">
                <li v-for="elt in terminals">
                    <router-link :to="'/' + elt.id">
                        <strong>{{ banks[ elt.bank ].name }}</strong>
                        <address>{{ elt.address }}</address>
                        <span class="distance">{{ elt.distance }}m</span>
                    </router-link>
                </li>
            </ul>
        </div>
    `,
    mounted() {
        // NOTE: this needs some serious refactor!
        this.getAllBanks( this.updateTerminals );
    },
    "methods": {
        getAllBanks( fNext ) {
            reqwest( {
                "url": "/banks",
                "method": "get",
                "data": {
                    "country": "BE",
                },
                "success": ( { data } ) => {
                    for ( let oBank of data ) {
                        this.banks[ oBank.id ] = oBank;
                    }
                    fNext();
                },
                "error": this.showError,
            } );
        },
        updateTerminals() {
            // 1. get user's position
            navigator.geolocation.getCurrentPosition( this.geoSuccess, this.showError, GEOLOCATION_OPTIONS );
        },
        geoSuccess( { coords } ) {
            console.log( "position:", coords );
            // 2. get terminals at position
            reqwest( {
                "url": "/terminals",
                "method": "get",
                "data": {
                    "latitude": coords.latitude,
                    "longitude": coords.longitude,
                },
                "success": this.ajaxSuccess,
                "error": this.showError,
            } );
        },
        ajaxSuccess( oResponse ) {
            console.log( "response:", oResponse );
            this.loaded = true;
            this.terminals = oResponse.data;
        },
        showError( oError ) {
            this.loaded = true;
            this.error = oError;
        },
    },
} );

export default oTerminalsList;
