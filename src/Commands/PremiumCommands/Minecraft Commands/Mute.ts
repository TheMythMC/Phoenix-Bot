import { Message } from "discord.js";
import BotCore from "../../../Structure/BotCore";
import Command from "../../../Structure/Command";
import { Bot } from "mineflayer";
import { sendErrorMessage, sendSuccessMessage } from "../../../utils/MessageUtils";

module.exports = class Mute extends Command {
  constructor(client: BotCore) {
    super(client, "mute", {
      description: "Be able to mute people in your guild from discord",
      usage: "%pmute <player name> <mute time>",
      category: "Minecraft Commands",
      isPremium: true,
    });
  }

  async run(message: Message, args: string[], client: BotCore) {
    try {
      if (!args[0]) return sendErrorMessage(message.channel, "No player provided to mute!");
      let mcBot: Bot = client.Bot.MineflayerManager.getMCBots().get(message.guild.id).bot;
      mcBot.chat(`\/mute ${args[0]} ${args[1]}`);
      sendSuccessMessage(message.channel, `Muted ${args[0]} for ${args[1]}`);
    } catch (err) {
      sendErrorMessage(
        message.channel,
        `An error occurred while trying to mute. This may occur due to the bot not being started or invalid bot credentials. `
      );
    }
  }
};
