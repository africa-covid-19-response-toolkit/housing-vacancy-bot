/**
 * 
 * 
 * Keyboard.js
 * 
 * 
 */

const Extra = require('telegraf/extra');
const Markup = require('telegraf/markup');

const Strings = require("./Strings");



class Keyboard {
    constructor() {
    }


    mainKeyboard() {
        return Markup.keyboard([
            [Strings.kb_str_update, Strings.kb_str_register],
            [Strings.kb_str_about]
        ])
        .oneTime()
        .resize()
        .extra();
    }


    gpsKeyboard() {
        return Extra.markup((markup) => {
            return markup.resize()
                .keyboard([
                    markup.locationRequestButton(Strings.kb_str_gps),
                    Strings.kb_str_cancel
                ]);
        });
    }



    cancelKeyboard() {
        return Markup.keyboard([
            [Strings.kb_str_cancel]
        ])
        .oneTime()
        .resize()
        .extra();
    }

}



module.exports.Keyboard = Keyboard;