import BotCore from "./Structure/BotCore"
const GuildManager = require("./Structure/GuildManager");
const DatabaseHandler = require("./handlers/DatabaseHandler");
const LinkManager = require("./Structure/LinkManager"); 
const UUIDManager = require("./Structure/UUIDManager"); 
const Server = require("./express/Server"); 
const MineflayerManager = require('./Structure/MineflayerManager');

export default class Bot {
  static bot: Bot;
  CoreBot: BotCore;
  LinkManager: any;
  GuildManager: any;
  UUIDManager: any;
  WebServer: any;
  DatabaseHandler: any;
  MineflayerManager: any;
    constructor() {
        Bot.bot = this; 
        this.CoreBot = new BotCore(this, {
            token: process.env.BOT_TOKEN, 
            defaultPrefix: "!"
        });
        this.LinkManager = new LinkManager(this); 
        this.GuildManager = new GuildManager(this);
        this.UUIDManager = new UUIDManager(this); 
        this.WebServer = new Server(this, 4000);
        this.DatabaseHandler = new DatabaseHandler(process.env.DB_URI, {
          useNewUrlParser: true,
          useUnifiedTopology: true
        }, () => {
            console.log("Database is connected.");
        });
        this.CoreBot.start();
        // Commented for now, need to test if it works without mineflayer attached
        // this.MineflayerManager = new MineflayerManager(this.CoreBot.guilds.cache);
    }
  static getBot() {
    return this.bot; 
  }
}