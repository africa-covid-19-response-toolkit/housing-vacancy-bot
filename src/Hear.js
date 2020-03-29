/**
 * 
 * 
 * Hear.js
 * 
 * 
 */

const Strings = require("./Strings");
const { Keyboard } = require("./Keyboard");


class Hear {
    constructor(ctx) {
        this.ctx = ctx;
        this.keyboard = new Keyboard();
    }


    hear() {

        this.ctx.hears(Strings.kb_str_update, (ctx) => {
           ctx.flow.enter("updateScene");
        });


        this.ctx.hears(Strings.kb_str_register, (ctx) => {
            ctx.flow.enter("registerScene");
        })


        this.ctx.hears(Strings.kb_str_cancel, (ctx) => {
            ctx.flow.leave();

            ctx.reply("Cancelled!", this.keyboard.mainKeyboard());
        });


    }
}


module.exports.Hear = Hear;