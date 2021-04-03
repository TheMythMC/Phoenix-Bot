import mineflayer, { BotOptions } from "mineflayer";
import Bot from "../Bot";
import { IPremiumLinkData } from "../Schemas/PremiumLinkData";
import MineflayerManager from "./MineflayerManager";
import { Channel, TextChannel } from "discord.js";
import MineflayerCommandManager from "./Mineflayer/MineflayerCommandManager";

export default class MineflayerBot {
  premiumData: IPremiumLinkData;
  bot: mineflayer.Bot;
  Client: Bot;
  manager: MineflayerManager;
  options: BotOptions;
  constructor(bot: Bot, manager: MineflayerManager, data: IPremiumLinkData, options: BotOptions) {
    this.bot = mineflayer.createBot(options);
    this.premiumData = data;
    this.options = options;
    this.Client = bot;
    this.manager = manager;
    this.setupBot();
  }

  setupBot() {
    this.bot.chatAddPattern(/(\[.+\]) (.+) \[(.+)\]: (.+)/, "guildChat");

    this.bot.on("error", (err) => {
      console.log(err);
    });

    this.bot.on("spawn", () => {
      this.bot.chat("/achat §c"); // send to limbo
    });

    this.bot.on("kicked", (reason, isLoggedIn) => {
      if (!isLoggedIn) {
        // error on joining
        this.Client.EventEmmiter.emit("botJoinFailed", [this.premiumData.ServerID, reason]);
        this.manager.MineCraftBots.delete(this.premiumData.ServerID); // remove the bot
        return;
      }
      this.manager.MineCraftBots.set(
        this.premiumData.ServerID,
        new MineflayerBot(this.Client, this.manager, this.premiumData, this.options)
      );
    });

    // bot.on("end", () => {
    //   this.MineCraftBots.set(guildData.ServerID, this.createBot(guildData));
    // });

    this.bot.on(
      // @ts-ignore
      "guildChat",
      async (_globalRank: string, name: string, _guildRank: string, message: string) => {
        if (message.startsWith(this.premiumData.MCPrefix) && name.toLowerCase() === this.bot.username.toLowerCase()) {
          new MineflayerCommandManager().runCommand(
            message.substring(this.premiumData.MCPrefix.length, message.length),
            name,
            this.manager,
            Bot.getBot().CoreBot
          );
        }
        if (this.premiumData.Logging) {
          let tempLogChannel: Channel = (await this.Client.CoreBot.channels.fetch(this.premiumData.LogChannel)) || null;

          if (tempLogChannel === null)
            this.bot.chat(
              "The log channel has an invalid ID. Please contact guild administrators if this issue isn't resolved"
            );

          // Checks if its text (should always be, will throw error)
          if (tempLogChannel.isText()) {
            let logChannel: TextChannel = tempLogChannel as TextChannel;
            logChannel.send(`\`${name}: ${message}\``);
          } else {
            this.bot.chat(
              "The log channel has an invalid ID or is a Voice Channel. Please contact guild staff/the guild master."
            );
          }
        }
      }
    );
  }

  set status(s: boolean) {
    this.Client.EventEmmiter.emit("botStatusChanged", [this.premiumData.ServerID, s]);
    this.premiumData.isBotOnline = s;
    this.premiumData.save();
  }
}
