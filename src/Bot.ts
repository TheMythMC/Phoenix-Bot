import BotCore from "./Structure/BotCore";
import GuildManager from "./Structure/GuildManager";
import DatabaseHandler from "./handlers/DatabaseHandler";
import LinkManager from "./Structure/LinkManager";
import UUIDManager from "./Structure/UUIDManager";
import Server from "./express/Server";
import MineflayerManager from "./Structure/MineflayerManager";
const PremiumLinkData = require("./Schemas/PremiumLinkData");
import EventEmmiter from "events";

export default class Bot {
  static bot: Bot;
  EventEmmiter: EventEmmiter;
  CoreBot: BotCore;
  LinkManager: LinkManager;
  GuildManager: GuildManager;
  UUIDManager: UUIDManager;
  WebServer: Server;
  DatabaseHandler: DatabaseHandler;
  MineflayerManager: MineflayerManager;
  constructor() {
    Bot.bot = this;
    this.EventEmmiter = new EventEmmiter();
    this.CoreBot = new BotCore(this, {
      token: process.env.BOT_TOKEN,
      defaultPrefix: "!",
    });
    this.LinkManager = new LinkManager(/*this*/);
    this.GuildManager = new GuildManager(this);
    this.UUIDManager = new UUIDManager(/*this*/);
    this.WebServer = new Server(this, 4000);
    this.DatabaseHandler = new DatabaseHandler(
      process.env.DB_URI,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
      () => {
        console.log("Database is connected.");
        console.log("Loading mineflayer bots... ");
        this.loadMineflayerBots();
      }
    );
    this.CoreBot.start();
    // Commented for now, need to test if it works without mineflayer attached
    // this.MineflayerManager = new MineflayerManager(this, this.CoreBot.guilds.cache);
  }

  async loadMineflayerBots() {
    const data = await PremiumLinkData.Model.find().exec(); // get all PREMIUM bots

    // this.MineflayerManager = new MineflayerManager(data);

    console.log(data);
  }

  static getBot() {
    return this.bot;
  }
}
