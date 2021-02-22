const discord = require("discord.js");
const BotCore = require("./Structure/BotCore");

class Bot {
    constructor() {
        this.CoreBot = new BotCore({
            token: process.env.BOT_TOKEN
        });
    }
}

module.exports = Bot;