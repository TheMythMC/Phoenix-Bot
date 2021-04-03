import Command from "../../Structure/Command";
const { sendErrorMessage, sendCustomMessage, sendSuccessMessage } = require("../../utils/MessageUtils");
const { getBot } = require("../../Bot");

module.exports = class extends Command {
  constructor(client) {
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
