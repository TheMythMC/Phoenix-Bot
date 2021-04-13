import { Message } from "discord.js";
import BotCore from "../../../Structure/BotCore";
import Command from "../../../Structure/Command";
import { Bot } from "mineflayer";
import { sendErrorMessage, sendSuccessMessage } from "../../../utils/MessageUtils";
import PremiumUtils from "../../../utils/PremiumUtils";
import MineflayerBot from "../../../Structure/MineflayerBot";

module.exports = class extends Command {
  constructor(client: BotCore) {
    super(client, "invite", {
      description: "Sends an invite link to a player",
      usage: "%pinvite <player name>",
      category: "Minecraft Commands",
      isPremium: true,
    });
  }

  async run(message: Message, args: string[], client: BotCore): Promise<any> {
    try {
      if (!args[0]) return sendErrorMessage(message.channel, "No player provided to invite!");
      let mcBot: Bot = PremiumUtils.getMinecraftBotFromGuild(message.guild.id).bot;
      mcBot.chat(`\/g invite ${args[0]}`);
      sendSuccessMessage(message.channel, `Successfully invited ${args[0]} to the guild.`);
    } catch (err) {
      sendErrorMessage(
        message.channel,
        `An error occurred while trying to invite. This may occur due to the bot not being started or invalid bot credentials. `
      );
    }
  }
};
