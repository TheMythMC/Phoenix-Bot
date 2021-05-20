import { IGuildData } from '../Schemas/GuildData';
import Bot from '../Bot';
import MineflayerCommandManager from './Mineflayer/MineflayerCommandManager';
import MineflayerBot from './MineflayerBot';
import MineflayerCommand from './Mineflayer/MineflayerCommand';
import Util from '../utils/Util';

export default class MineflayerManager {
  bot: Bot;
  MineCraftBots: Map<string, MineflayerBot>;
  CommandCache: Map<string, MineflayerCommand>;
  AliasesCache: Map<string, string>;
  constructor(bot: Bot, guilds: IGuildData[]) {
    this.bot = bot;
    this.MineCraftBots = new Map();
    let ca = MineflayerCommandManager.loadCommand(
      './Mineflayer/Commands',
      this.bot.CoreBot
    );
    this.CommandCache = ca.commands;
    this.AliasesCache = ca.aliases;
    
    Util.wait(1000);
    guilds.forEach(async (guild) => {
      if (
        Bot.instance.GuildManager.isPremium(guild.ServerID) &&
        guild.ServerID &&
        !guild.isBotOnline &&
        guild.GuildBotUUID &&
        guild.GuildBotPassword
      ) {
        console.log(
          `Created mineflayer bot for guild ${
            bot.CoreBot.guilds.cache.get(guild.ServerID).name
          }`
        );
        this.MineCraftBots.set(guild.ServerID, this.createBot(guild));
      }
    });
  }

  getMCBots() {
    return this.MineCraftBots;
  }

  createBot(guildData: IGuildData): MineflayerBot {
    return new MineflayerBot(this.bot, this, guildData, {
      username: guildData.GuildBotUUID.toString(),
      password: guildData.GuildBotPassword.toString(),
      auth: guildData.GuildBotAuth,
      version: '1.8.9',
      host: 'us.hypixel.net',
      port: 25565,
      colorsEnabled: false,
      keepAlive: true
    });
  }
  

  startBot(guildData: IGuildData) {
    const botFound = this.MineCraftBots.get(guildData.ServerID);

    if (botFound) {
      if (!botFound.status) {
        this.MineCraftBots.delete(guildData.ServerID); // let go of the bot if its not started; this probs isnt needed but JUST IN CASE
      } else return;
    }

    this.MineCraftBots.set(guildData.ServerID, this.createBot(guildData));
  }
}
