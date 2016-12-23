/* leny/kach
 *
 * /static/modules/components/terminal-details.js - Terminal details vue component
 *
 * coded by leny@flatLand!
 * started at 23/12/2016
 */

import Vue from "vue";
import reqwest from "reqwest";
import getBank from "../../utils/banks-manager.js";
import getLocation from "../../utils/location-manager.js";

let oTerminalDetails = Vue.component( "terminal-details", {
    "data": function() {
        return {
            "loaded": false,
            "terminal": {},
            "error": null,
        };
    },
    "template": `
        <div class="terminal-details">
            <router-link to="/">&lsaquo; retour</router-link>
            <div class="loading" v-if="!loaded">
                <p>loading…</p>
            </div>
            <div class="error" v-if="loaded && error">
                <p>
                    <strong>Error:</strong> {{ error }}
                </p>
            </div>
            <div v-if="loaded">
                <h2>{{ terminal.bank ? terminal.bank.name : "Unknown" }}</h2>
                <address>{{ terminal.address }}</address>
                <p>{{ terminal.distance }}m</p>
            </div>
        </div>
    `,
    mounted() {
        return getBank()
            .then( () => this.fetchInfos( this.$route.params.id ) )
            .catch( this.showError );
    },
    "methods": {
        fetchInfos( sTerminalId ) {
            return getLocation()
                .then( ( { coords } ) => {
                    return reqwest( {
                        "url": `/terminals/${ sTerminalId }`,
                        "method": "get",
                        "data": {
                            "latitude": coords.latitude,
                            "longitude": coords.longitude,
                        },
                    } );
                } )
                .then( ( oResponse ) => {
                    let oTerminal = oResponse.data;

                    this.loaded = true;
                    oTerminal.bank = getBank( oTerminal.bank );
                    this.terminal = oTerminal;
                } )
                .catch( this.showError );
        },
        showError( { message } ) {
            this.loaded = true;
            this.error = message;
        },
    },
} );

export default oTerminalDetails;
