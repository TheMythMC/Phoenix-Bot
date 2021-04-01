import mineflayer from "mineflayer";
import { IPremiumLinkData } from "../Schemas/PremiumLinkData";
import Bot from "../Bot";
import MineflayerCommandManager from "./Mineflayer/MineflayerCommandManager";
import { Channel, TextChannel } from "discord.js";

export default class MineflayerManager {
  bot: Bot;
  MineCraftBots: Map<string, mineflayer.Bot>;
  constructor(bot: Bot, guilds: IPremiumLinkData[]) {
    new MineflayerCommandManager().loadCommands(
      this,
      "./Mineflayer/Commands/**/*.js"
    );
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
        console.log(`Set mineflayer bot for guild ${bot.CoreBot.guilds.cache.get(guild.ServerID).name}`)
        this.MineCraftBots.set(guild.ServerID, this.createBot(guild));
      }
    });
  }

  getMCBots() {
    return this.MineCraftBots;
  }
  createBot(guildData: IPremiumLinkData) {
    let bot = mineflayer.createBot({
      username: guildData.BotUsername,
      password: guildData.BotPassword,
      // @ts-ignore
      auth: guildData.BotAuth,
      version: "1.8.9",
      host: "buyphoenix.hypixel.net",
      port: 25565,
    });

    bot.chatAddPattern(/(\[.+\]) (.+) \[(.+)\]: (.+)/, "guildChat");

    bot.on("error", (err) => {
      console.log(err);
    });

    bot.on("spawn", () => {
      bot.chat("/achat §c"); // send to limbo
    });

    bot.on("kicked", (reason, isLoggedIn) => {
      if (!isLoggedIn) {
        // error on joining
        this.bot.EventEmmiter.emit("botJoinFailed", [reason]);
        this.MineCraftBots.delete(guildData.ServerID); // remove the bot
        return;
      }
      this.MineCraftBots.set(guildData.ServerID, this.createBot(guildData));
    });

    // bot.on("end", () => {
    //   this.MineCraftBots.set(guildData.ServerID, this.createBot(guildData));
    // });

    bot.on(
      // @ts-ignore
      "guildChat", async (
        _globalRank: string,
        name: string,
        _guildRank: string,
        message: string
      ) => {
        if (message.startsWith(guildData.MCPrefix) && name.toLowerCase() === bot.username.toLowerCase()) {
          new MineflayerCommandManager().runCommand(
            message.substring(guildData.MCPrefix.length, message.length),
            name,
            this,
            Bot.getBot().CoreBot
          );
        }
        if(guildData.Logging) {
          let tempLogChannel: Channel = await this.bot.CoreBot.channels.fetch(guildData.LogChannel) || null;

          if(tempLogChannel === null) 
            bot.chat("The log channel has an invalid ID. Please contact guild administrators if this issue isn\'t resolved");

          // Checks if its text (should always be, will throw error)
          if (tempLogChannel.isText()) {
            let logChannel: TextChannel = tempLogChannel as TextChannel;
            logChannel.send(`\`${name}: ${message}\``);
          } else {
            bot.chat("The log channel has an invalid ID or is a Voice Channel. Please contact guild staff/the guild master.")
          }
        }
      }
    );

    return bot;
  }
}
