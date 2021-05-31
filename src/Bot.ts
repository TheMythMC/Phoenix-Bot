import BotCore from './Structure/BotCore';
import GuildManager from './Structure/GuildManager';
import DatabaseHandler from './handlers/DatabaseHandler';
import LinkManager from './Structure/LinkManager';
import UUIDManager from './Structure/UUIDManager';
import Server from './express/Server';
import DiscordAPIUserCache from './Structure/DiscordAPIUserCache';
import MineflayerManager from './Structure/MineflayerManager';
import EventEmitter from 'events';
import GuildData, { createDefault } from './Schemas/GuildData';
import { initialize } from './Structure/HypixelAPI';
import Util from './utils/Util';

export default class Bot {
  static instance: Bot;
  CoreBot: BotCore;
  DiscordAPIUserCache: DiscordAPIUserCache;
  LinkManager: LinkManager;
  GuildManager: GuildManager;
  UUIDManager: UUIDManager;
  WebServer: Server;
  DatabaseHandler: DatabaseHandler;
  MineflayerManager: MineflayerManager;
  EventEmitter: EventEmitter;
  constructor() {
    initialize();
    Bot.instance = this;
    this.CoreBot = new BotCore(this, {
      token: process.env.BOT_TOKEN,
      defaultPrefix: '!',
    });
    this.EventEmitter = new EventEmitter();
    this.DiscordAPIUserCache = new DiscordAPIUserCache();
    this.LinkManager = new LinkManager();
    this.GuildManager = new GuildManager(this);
    this.UUIDManager = new UUIDManager();
    this.WebServer = new Server(
      this,
      Util.normalizePort(process.env.PORT) || 4000
    );
    this.DatabaseHandler = new DatabaseHandler(
      process.env.DB_URI,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
      async () => {
        console.log('Loading mineflayer bots...');
        this.loadMineflayerBots();
      }
    );
    this.CoreBot.start();
  }

  async loadMineflayerBots() {
    const data = await GuildData.find().exec();

    this.MineflayerManager = new MineflayerManager(this, data);
  }
  async getPrefix(guild) {
    // Commented for test  bot
    // return (
    //   (await this.GuildManager.getGuild(guild.id))?.data?.Prefix ||
    //   (await this.GuildManager.getGuild(guild))?.data?.Prefix ||
    //   '!'
    // );
    return '!!'
  }

  async parsePrefix(guildID, text: string) {
    return text.replace(/%p/g, await this.getPrefix(guildID));
  }
}
