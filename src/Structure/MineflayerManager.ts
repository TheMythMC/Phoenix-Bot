import { IPremiumLinkData } from "../Schemas/PremiumLinkData";
import Bot from "../Bot";
import MineflayerCommandManager from "./Mineflayer/MineflayerCommandManager";
import MineflayerBot from "./MineflayerBot";

const joinMessages: string[] = [
  "%n just joined the server - glhf!",
  "%n just joined. Everyone, look busy!",
  "%n just joined. Can I get a heal?",
  "%n joined your party.",
  "%n joined. You must construct additional pylons.",
  "Ermagherd. %n is here.",
  "Welcome, %n. Stay awhile and listen.",
  "Welcome, %n. We were expecting you ;)",
  "Welcome, %n. We hope you brought pizza.",
  "Welcome %n. Leave your weapons by the door.",
  "A wild %n appeared.",
  "Swoooosh. %n just landed.",
  "Brace yourselves. %n just joined the guild.",
  "%n just joined. Hide your bananas.",
  "%n just arrived. Seems OP - please nerf.",
  "%n just slid into the guild.",
  "A %n has spawned in the server.",
  "Big %n showed up!",
  "Where’s %n? In the guild!",
  "%n hopped into the server. Kangaroo!!",
  "%n just showed up. Hold my beer.",
  "Challenger approaching - %n has appeared!",
  "It's a bird! It's a plane! Nevermind, it's just %n.",
  "It's %n! Praise the sun! [T]/",
  "Never gonna give %n up. Never gonna let %n down.",
  "Ha! %n has joined! You activated my trap card!",
  "Cheers, love! %n's here!",
  "Hey! Listen! %n has joined!",
  "We've been expecting you %n.",
  "It's dangerous to go alone, take %n!",
  "%n has joined the server! It's super effective!",
  "Cheers, love! %n is here!",
  "%n is here, as the prophecy foretold.",
  "%n has arrived. Party's over.",
  "Ready player %n",
  "%n is here to kick butt and chew bubblegum. And %n is all out of gum.",
  "Hello. Is it %n you're looking for?",
  "%n has joined. Stay a while and listen!",
  "Roses are red, violets are blue, %n joined this guild with you",
];

export default class MineflayerManager {
  bot: Bot;
  MineCraftBots: Map<string, MineflayerBot>;
  constructor(bot: Bot, guilds: IPremiumLinkData[]) {
    new MineflayerCommandManager().loadCommands(this, "./Mineflayer/Commands/**/*.js");
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
    return new MineflayerBot(this.bot, this, guildData, {
      username: guildData.BotUsername,
      password: guildData.BotPassword,
      // @ts-ignore
      auth: guildData.BotAuth,
      version: "1.8.9",
      host: "buyphoenix.hypixel.net",
      port: 25565,
    });
  }
}
