/**
 * 
 * 
 * 
 * CommandHandler.js
 * 
 * 
 * 
 */


class CommandHandler {
   constructor(flow) {
       this.flow = flow;
   }


   start() {
       this.flow.start((ctx) => {
           ctx.flow.enter("greet");
       });
   }


   
}



module.exports.CommandHandler = CommandHandler;

