const TelegrafFlow = require('telegraf-flow');
const { Scene } = TelegrafFlow;
const Extra = require('telegraf/extra');

const { Keyboard } = require("./Keyboard");
const Strings = require("./Strings");

 class Scenes {
     constructor() {
         this.keyboard = new Keyboard();
     }


     greeterScene() {
         const greet = new Scene("greet");

         greet.enter((ctx) => {
             let fname = (ctx.from.first_name != undefined) ? ctx.from.first_name : ctx.from.username;

             ctx.reply(`Hello ${fname}`, this.keyboard.mainKeyboard());
             


             // leave
             ctx.flow.leave();
         });
         greet.leave((ctx) => {});


         return greet;
     }


     updateScene() {

        let update = new Scene("updateScene");


        update.enter((ctx) => {
            ctx.reply(Strings.reply_current_occ, this.keyboard.cancelKeyboard());
        });


        update.on("message", (ctx) => {

            let msg = ctx.message.text;


            if (msg !== null) {
                ctx.reply(msg + "\n\n *it will be sent to the server later*", this.keyboard.mainKeyboard());

                ctx.flow.leave();
            } else {
                ctx.reply(Strings.invalid_msg);

                // re-enter
                ctx.flow.enter("updateScene", ctx.flow.state);
            }

        });


        update.leave((ctx) => {});


        return update;

     }


     registerScene() {

        let register = new Scene("registerScene");


        register.enter((ctx) => {
            ctx.reply(Strings.reply_enter_hotel_name, this.keyboard.cancelKeyboard())
        });


        register.on("message", (ctx) => {

            let msg = ctx.message.text;


            if (msg !== null) {
                ctx.flow.state.hotel_name = msg;

                ctx.flow.enter("getGeoCode", ctx.flow.state);
            } else {
                ctx.reply(Strings.invalid_msg);

                // re-enter
                ctx.flow.enter("registerScene", ctx.flow.state);
            }

        });


        register.leave((ctx) => {});


        return register;


     }


     getGeoCode() {

        let getGeo = new Scene("getGeoCode");


        getGeo.enter((ctx) => {
            ctx.reply(Strings.reply_gps, this.keyboard.gpsKeyboard());
        });


        getGeo.on("location", (ctx) => {

            let loc = ctx.message.location;

            if (loc != undefined) {
                // save to state

                ctx.flow.state.lat = loc.latitude;
                ctx.flow.state.long = loc.longitude;

                ctx.flow.enter("locByName", ctx.flow.state);
            } else {
                ctx.reply(Strings.invalid_msg);
                
                ctx.flow.enter("getGeoCode", ctx.flow.state);
            }

        });

        getGeo.leave((ctx) => {});

        return getGeo;

     }


     locByName() {

        let locName = new Scene("locByName");


        locName.enter((ctx) => {
            ctx.reply(Strings.reply_loc_name, this.keyboard.cancelKeyboard())
        });


        locName.on("message", (ctx) => {

            let msg = ctx.message.text;


            if (msg !== null) {
                ctx.flow.state.loc_name = msg;

                ctx.flow.enter("typePlaceScene", ctx.flow.state);
            } else {
                ctx.reply(Strings.invalid_msg);

                // re-enter
                ctx.flow.enter("locByName", ctx.flow.state);
            }

        });


        locName.leave((ctx) => {});


        return locName;

     }



     typePlaceScene() {

        let typePlace = new Scene("typePlaceScene");


        typePlace.enter((ctx) => {
            ctx.reply(Strings.reply_type_place, this.keyboard.cancelKeyboard())
        });


        typePlace.on("message", (ctx) => {

            let msg = ctx.message.text;


            if (msg !== null) {
                ctx.flow.state.type_place = msg;

                ctx.flow.enter("totalCapacityScene", ctx.flow.state);
            } else {
                ctx.reply(Strings.invalid_msg);

                // re-enter
                ctx.flow.enter("typePlaceScene", ctx.flow.state);
            }

        });


        typePlace.leave((ctx) => {});


        return typePlace;

     }


     totalCapacityScene() {
        let totalCap = new Scene("totalCapacityScene");


        totalCap.enter((ctx) => {
            ctx.reply(Strings.reply_total_cap, this.keyboard.cancelKeyboard())
        });


        totalCap.on("message", (ctx) => {

            let msg = ctx.message.text;


            if (msg !== null) {
                ctx.flow.state.total_cap = msg;

                ctx.flow.enter("currentOccScene", ctx.flow.state);
            } else {
                ctx.reply(Strings.invalid_msg);

                // re-enter
                ctx.flow.enter("totalCapacityScene", ctx.flow.state);
            }

        });


        totalCap.leave((ctx) => {});


        return totalCap;

     }


     currentOccScene() {


        let currentOcc = new Scene("currentOccScene");


        currentOcc.enter((ctx) => {
            ctx.reply(Strings.reply_current_occ, this.keyboard.cancelKeyboard())
        });


        currentOcc.on("message", (ctx) => {

            let msg = ctx.message.text;


            if (msg !== null) {
                ctx.flow.state.total_cap = msg;

                // ctx.flow.enter("currentOccScene", ctx.flow.state);
                ctx.reply(ctx.flow.state);
                ctx.flow.leave();
            } else {
                ctx.reply(Strings.invalid_msg);

                // re-enter
                ctx.flow.enter("currentOccScene", ctx.flow.state);
            }

        });


        currentOcc.leave((ctx) => {});


        return currentOcc;

     }

}


module.exports.Scenes = Scenes;



