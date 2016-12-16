/* leny/kach
 *
 * /static/modules/main.js - Main entry file
 *
 * coded by leny@flatLand!
 * started at 09/12/2016
 */

import Vue from "vue";

let oApp = new Vue( {
    "template": `
        <div class="box">
            <p>{{ message }}</p>
            <ul>
                <li v-for="cat in cats">
                    <strong>{{ cat.name }}</strong>
                    <span>( {{ cat.age }} )</span>
                </li>
            </ul>
            <p v-if="secret">I'm a cat person!</p>
            <button v-on:click="revealSecret">{{ reveal.value }}</button>
        </div>
    `,
    "data": {
        "message": "Hey from Vue!",
        "secret": false,
        "cats": [
            { "name": "Skitty", "age": 6 },
            { "name": "Pixel", "age": 4 },
        ],
        "reveal": {
            "show": "Reveal my secrets!",
            "hide": "Hide my secrets!",
            "value": "Reveal my secrets!",
        },
    },
    "methods": {
        "revealSecret": function() {
            this.secret = !this.secret;
            this.reveal.value = this.secret ? this.reveal.hide : this.reveal.show;
        },
    },
} );

oApp.$mount( "#app" );
