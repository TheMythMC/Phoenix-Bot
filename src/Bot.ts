import BotCore from "./Structure/BotCore";
import GuildManager from "./Structure/GuildManager";
import DatabaseHandler from "./handlers/DatabaseHandler";
import LinkManager from "./Structure/LinkManager";
import UUIDManager from "./Structure/UUIDManager";
import Server from "./express/Server";
import DiscordAPIUserCache from "./Structure/DiscordAPIUserCache";

export default class Bot {
  static instance: Bot;
  CoreBot: BotCore;
  DiscordAPIUserCache: DiscordAPIUserCache;
  LinkManager: LinkManager;
  GuildManager: GuildManager;
  UUIDManager: UUIDManager;
  WebServer: Server;
  DatabaseHandler: DatabaseHandler;
  constructor() {
    Bot.instance = this;
    this.CoreBot = new BotCore(this, {
      token: process.env.BOT_TOKEN,
      defaultPrefix: "!",
    });
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
      }
    );
    this.CoreBot.start();
  }

  async getPrefix(guild) {
    return (
      (await this.GuildManager.getGuild(guild.id))?.data?.Prefix ||
      (await this.GuildManager.getGuild(guild))?.data?.Prefix ||
      "!"
    );
  }

  async parsePrefix(guildID, text) {
    return text.replace(/%p/g, await this.getPrefix(guildID));
  }
}
