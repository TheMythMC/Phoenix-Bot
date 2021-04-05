import BotCore from "./Structure/BotCore";
import GuildManager from "./Structure/GuildManager";
import DatabaseHandler from "./handlers/DatabaseHandler";
import LinkManager from "./Structure/LinkManager";
import UUIDManager from "./Structure/UUIDManager";
import Server from "./express/Server";
import DiscordAPIUserCache from "./Structure/DiscordAPIUserCache";
import EventEmmiter from "events";
import MineflayerManager from "./Structure/MineflayerManager";
import PremiumLinkData from "./Schemas/PremiumLinkData";

export default class Bot {
  static instance: Bot;
  EventEmmiter: EventEmmiter;
  CoreBot: BotCore;
  DiscordAPIUserCache: DiscordAPIUserCache;
  LinkManager: LinkManager;
  GuildManager: GuildManager;
  UUIDManager: UUIDManager;
  WebServer: Server;
  DatabaseHandler: DatabaseHandler;
  MineflayerManager: MineflayerManager;
  constructor() {
    Bot.instance = this;
    this.CoreBot = new BotCore(this, {
      token: process.env.BOT_TOKEN,
      defaultPrefix: "!",
    });
    this.EventEmmiter = new EventEmmiter();
    this.DiscordAPIUserCache = new DiscordAPIUserCache();
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
      async () => {
        console.log("Database is connected. ");
        console.log("Loading mineflayer bots...");
        this.loadMineflayerBots();
      }
    );
    this.CoreBot.start();
  }

  async loadMineflayerBots() {
    const data = await PremiumLinkData.find().exec();

    this.MineflayerManager = new MineflayerManager(this, data);
  }
}
