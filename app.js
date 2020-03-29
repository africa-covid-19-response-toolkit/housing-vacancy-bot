const Telegraf = require('telegraf');
const TelegrafFlow = require('telegraf-flow');
require("custom-env").env("secrets");

const flow = new TelegrafFlow();

const { Scenes } = require("./src/Scenes");
const { CommandHandler } = require("./src/CommandHandler");
const { Hear } = require("./src/Hear");


// bot
const bot = new Telegraf(process.env.BOT_TOKEN);

// commandHandler
const commandHandler = new CommandHandler(flow);

// Hear
const hear = new Hear(flow);


console.log("==> Bot Started...");


// commands
commandHandler.start();

// Hear
hear.hear();





// register
flow.register(new Scenes().greeterScene());
flow.register(new Scenes().updateScene());
flow.register(new Scenes().registerScene());
flow.register(new Scenes().getGeoCode());
flow.register(new Scenes().locByName());
flow.register(new Scenes().typePlaceScene());
flow.register(new Scenes().totalCapacityScene());
flow.register(new Scenes().currentOccScene());



bot.use(Telegraf.session())
bot.use(flow.middleware())


// bot.telegram.setWebhook("https://.herokuapp.com/" + process.env.BOT_TOKEN);
// bot.startWebhook('/' + process.env.BOT_TOKEN, null, process.env.PORT)

bot.launch()