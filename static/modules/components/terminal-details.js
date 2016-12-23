/* leny/kach
 *
 * /static/modules/components/terminal-details.js - Terminal details vue component
 *
 * coded by leny@flatLand!
 * started at 23/12/2016
 */

import Vue from "vue";
import reqwest from "reqwest";

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
            <div class="loading" v-if="!loaded">
                <p>loading…</p>
            </div>
            <div class="error" v-if="loaded && error">
                <p>
                    <strong>Error:</strong>
                    {{ error.message }}
                </p>
            </div>
            <div v-if="loaded">
                <h2>Détails d'un terminal</h2>
                <p>(ici on devrait afficher le nom de la banque :D )</p>
                <address>{{ terminal.address }}</address>
            </div>
            <router-link to="/">&lsaquo; retour</router-link>
        </div>
    `,
    mounted() {
        console.log( "Détails d'un terminal:", this.$route.params.id );
        // NOTE: needs refactor!
        reqwest( {
            "url": `/terminals/${ this.$route.params.id }`,
            "method": "get",
            "data": {},
            "error": ( oError ) => {
                this.loaded = true;
                this.error = oError.message;
            },
            "success": ( oResponse ) => {
                console.log( oResponse );
                this.loaded = true;
                this.terminal = oResponse.data;
            }
        } );
    }
} );

export default oTerminalDetails;
