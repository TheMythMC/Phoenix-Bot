import mineflayer from "mineflayer";
import { IPremiumLinkData } from "../Schemas/PremiumLinkData";
import mainBot from "../Bot";
import Util from "../utils/Util";
import MineflayerCommandManager from "./Mineflayer/MineflayerCommandManager";

export default class MineflayerManager {
  bot: mainBot;
  MineCraftBots: Map<string, mineflayer.Bot>;
  constructor(bot: mainBot, guilds: IPremiumLinkData[]) {
    new MineflayerCommandManager().loadCommands(
      this,
      "./Mineflayer/Commands/**/*.js"
    );
    this.bot = bot;
    this.MineCraftBots = new Map();
    guilds.forEach(async (guild) => {
      if (
        mainBot.getBot().GuildManager.isPremium(guild.id) &&
        guild.ServerID &&
        guild.isBotOnline &&
        guild.BotUsername &&
        guild.BotPassword
      ) {
        this.MineCraftBots.set(guild.ServerID, this.createBot(guild));
      }
    });
  }

  getMCBots() {
    return this.MineCraftBots;
  }
  createBot(guildData) {
    let bot = mineflayer.createBot({
      username: guildData.BotUsername,
      password: guildData.BotPassword,
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
      Util.wait(500);
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
      "guildChat",
      (
        _globalRank: string,
        name: string,
        _guildRank: string,
        message: string
      ) => {
        if (message.startsWith("!")) {
          new MineflayerCommandManager().runCommand(
            message.substring(1, message.length),
            name,
            this,
            mainBot.getBot().CoreBot
          );
        }
      }
    );

    return bot;
  }
}
