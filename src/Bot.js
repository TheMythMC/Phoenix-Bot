const BotCore = require("./Structure/BotCore");
const GuildManager = require("./Structure/GuildManager");
const DatabaseHandler = require("./handlers/DatabaseHandler");
const LinkManager = require("./Structure/LinkManager"); 
const UUIDManager = require("./Structure/UUIDManager"); 

class Bot {
    constructor() {
        Bot.bot = this; 
        this.CoreBot = new BotCore(this, {
            token: process.env.BOT_TOKEN, 
            defaultPrefix: "!"
        });
        this.LinkManager = new LinkManager(this); 
        this.GuildManager = new GuildManager(this);
        this.UUIDManager = new UUIDManager(this); 
        this.DatabaseHandler = new DatabaseHandler(process.env.DB_URI, {
          useNewUrlParser: true,
          useUnifiedTopology: true
        }, async () => {
            console.log("Database is connected. ");
        });
        this.CoreBot.start();
    }
  static getBot() {
    return this.bot; 
  }
}

module.exports = Bot