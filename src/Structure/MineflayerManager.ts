import { IPremiumLinkData } from "../Schemas/PremiumLinkData";
import Bot from "../Bot";
import MineflayerCommandManager from "./Mineflayer/MineflayerCommandManager";
import MineflayerBot from "./MineflayerBot";

export default class MineflayerManager {
  bot: Bot;
  MineCraftBots: Map<string, MineflayerBot>;
  constructor(bot: Bot, guilds: IPremiumLinkData[]) {
    this.bot = bot;
    this.MineCraftBots = new Map();
    guilds.forEach(async (guild) => {
      if (
        Bot.getBot().GuildManager.isPremium(guild.id) &&
        guild.ServerID &&
        guild.isBotOnline &&
        guild.BotUsername &&
        guild.BotPassword
      ) {
        console.log(`Created mineflayer bot for guild ${bot.CoreBot.guilds.cache.get(guild.ServerID).name}`);
        this.MineCraftBots.set(guild.ServerID, this.createBot(guild));
      }
    });
  }

  getMCBots() {
    return this.MineCraftBots;
  }
  createBot(guildData: IPremiumLinkData): MineflayerBot {
    let bot =  new MineflayerBot(this.bot, this, guildData, {
      username: guildData.BotUsername,
      password: guildData.BotPassword,
      // @ts-ignore
      auth: guildData.BotAuth,
      version: "1.8.9",
      host: "buyphoenix.hypixel.net",
      port: 25565,
    });
    new MineflayerCommandManager().loadCommands(bot, './Mineflayer/Commands/**/*.ts', this.bot.CoreBot);
    return bot;
  }
}
