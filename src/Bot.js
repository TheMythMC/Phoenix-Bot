const discord = require("discord.js");
const BotCore = require("./Structure/BotCore");

class Bot {
    constructor() {
        this.CoreBot = new BotCore(this, {
            token: process.env.BOT_TOKEN,
            prefix: "!"
        });

        this.CoreBot.start();
    }
}

module.exports = Bot;