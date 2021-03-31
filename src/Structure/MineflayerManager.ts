import mineflayer from "mineflayer";
import { Document } from "mongoose";
import mainBot from "../Bot";
import { IPremiumLinkData } from "../Schemas/PremiumLinkData";
import Util from "../utils/Util";
import MineflayerCommandManager from "./Mineflayer/MineflayerCommandManager";

export default class MineflayerManager {
  MineCraftBots: Map<string, mineflayer.Bot>;
  constructor(guilds: IPremiumLinkData[]) {
    new MineflayerCommandManager().loadCommands(
      this,
      "./Mineflayer/Commands/**/*.js"
    );
    this.MineCraftBots = new Map();
    guilds.forEach(async (guild) => {
      if (
        mainBot.getBot().GuildManager.isPremium(guild.id) &&
        !(guild.ServerID === null) &&
        !(guild.ServerID === undefined)
      ) {
        this.MineCraftBots.set(
          guild.id,
          this.createBot(mainBot.getBot().GuildManager.getGuild(guild.id))
        );
      }
    });
  }

  getMCBots() {
    return this.MineCraftBots;
  }
  createBot(guildData) {
    let realGuildData = guildData.data;
    let bot = mineflayer.createBot({
      username: realGuildData.BotUsername,
      password: realGuildData.BotPassword,
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

    bot.on("end", () => {
      this.MineCraftBots.set(guildData.GuildID, this.createBot(guildData));
    });

    // @ts-ignore
    bot.on("guildChat", (_globalRank: string, name: string, _guildRank: string, message: string) => {
      if (message.startsWith("!")) {
        new MineflayerCommandManager().runCommand(
          message.substring(1, message.length),
          name,
          this,
          mainBot.getBot().CoreBot
        );
      }
    });

    return bot;
  }
}
module.exports = MineflayerManager;
