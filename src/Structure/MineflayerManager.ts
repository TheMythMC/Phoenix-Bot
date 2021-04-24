import { IPremiumLinkData } from '../Schemas/PremiumLinkData';
import Bot from '../Bot';
import MineflayerCommandManager from './Mineflayer/MineflayerCommandManager';
import MineflayerBot from './MineflayerBot';
import MineflayerCommand from './Mineflayer/MineflayerCommand';

export default class MineflayerManager {
  bot: Bot;
  MineCraftBots: Map<string, MineflayerBot>;
  CommandCache: Map<string, MineflayerCommand>;
  AliasesCache: Map<string, string>;
  constructor(bot: Bot, guilds: IPremiumLinkData[]) {
    this.bot = bot;
    this.MineCraftBots = new Map();
    let ca = MineflayerCommandManager.loadCommand(
      './Mineflayer/Commands/**/*.ts',
      this.bot.CoreBot
    );
    this.CommandCache = ca.commands;
    this.AliasesCache = ca.aliases;
    guilds.forEach(async (guild) => {
      if (
        Bot.instance.GuildManager.isPremium(guild.id) &&
        guild.ServerID &&
        guild.isBotOnline &&
        guild.BotUsername &&
        guild.BotPassword
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

  createBot(guildData: IPremiumLinkData): MineflayerBot {
    let bot = new MineflayerBot(this.bot, this, guildData, {
      username: guildData.BotUsername,
      password: guildData.BotPassword,
      // @ts-ignore
      auth: guildData.BotAuth,
      version: '1.8.9',
      host: 'buyphoenix.hypixel.net',
      port: 25565,
    });
    return bot;
  }

  startBot(guildData: IPremiumLinkData) {
    const botFound = this.MineCraftBots.get(guildData.ServerID);

    if (botFound) {
      if (!botFound.status) {
        this.MineCraftBots.delete(guildData.ServerID); // let go of the bot if its not started; this probs isnt needed but JUST IN CASE
      } else return;
    }

    this.MineCraftBots.set(guildData.ServerID, this.createBot(guildData));
  }
}
