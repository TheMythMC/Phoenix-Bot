import BotCore from "../../Structure/BotCore";
import Command from "../../Structure/Command";
import { sendErrorMessage, sendCustomMessage, sendSuccessMessage } from "../../utils/MessageUtils";

module.exports = class extends Command {
  constructor(client: BotCore) {
    super(client, "logChannel", {
      category: "Premium",
      usage: "%plogChannel <channel ID>",
      requiredPerms: ["ADMINISTRATOR"],
      aliases: [],
      description: "Set the channel for your bot to use",
      requireBotOwner: false,
    });
  }

  async run(message, args, client) {
    try {
      BigInt(args[0]);
    } catch {
      return sendErrorMessage(message.channel, "Must have a valid id");
    }
    if (args[0].length === 18) {
      sendSuccessMessage(message.channel, `Successfully added log channel <#${args[0]}>`);
    }
  }
};
