const BotCore = require("./Structure/BotCore");
const GuildManager = require("./Structure/GuildManager");
const DatabaseHandler = require("./handlers/DatabaseHandler");
const LinkManager = require("./Structure/LinkManager"); 

class Bot {
    constructor() {
        Bot.bot = this; 
        this.CoreBot = new BotCore(this, {
            token: process.env.BOT_TOKEN, 
            defaultPrefix: "!"
        });
        this.LinkManager = new LinkManager(this); 
        this.GuildManager = new GuildManager(this);
        this.DatabaseHandler = new DatabaseHandler(process.env.DB_URI, {}, async () => {
            console.log("Database is connected. ");
            console.log("Loading guilds...");
            await this.GuildManager.loadGuilds();
        });
        this.CoreBot.start();
    }

  static getBot() {
    return this.bot; 
  }
}

module.exports = Bot;