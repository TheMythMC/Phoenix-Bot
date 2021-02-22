const discord = require("discord.js");
const BotCore = require("./Structure/BotCore");
const GuildManager = require("./Structure/GuildManager");

class Bot {
    constructor() {
        this.CoreBot = new BotCore(this, {
            token: process.env.BOT_TOKEN,
            prefix: "!"
        });
        this.GuildManager = new GuildManager(this);

        this.CoreBot.start();
    }
}

module.exports = Bot;