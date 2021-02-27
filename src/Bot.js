const discord = require("discord.js");
const BotCore = require("./Structure/BotCore");
const GuildManager = require("./Structure/GuildManager");
const DatabaseHandler = require("./handlers/DatabaseHandler");

class Bot {
    constructor() {
        this.CoreBot = new BotCore(this, {
            token: process.env.BOT_TOKEN,
            prefix: "!"
        });
        this.GuildManager = new GuildManager(this);
        this.DatabaseHandler = new DatabaseHandler(process.env.DB_URI, {}, async () => {
            console.log("Database is connected. ");
            console.log("Loading guilds...");
            await this.GuildManager.loadGuilds();
        });

        this.CoreBot.start();
    }
}

module.exports = Bot;