import { Message } from 'discord.js';
import BotCore from '../../Structure/BotCore';
import Command from '../../Structure/Command';
import {
  sendErrorMessage,
  sendCustomMessage,
  sendSuccessMessage,
} from '../../utils/MessageUtils';

module.exports = class extends Command {
  constructor(client: BotCore) {
    super(client, 'logchannel', {
      category: 'Premium',
      usage: '%plogChannel <channel ID>',
      requiredPerms: ['ADMINISTRATOR'],
      aliases: [],
      description: 'Set the channel for your bot to use',
      requireBotOwner: false,
      isPremium: true,
    });
  }

  async run(message: Message, args: string[], _client: BotCore) {
    try {
      BigInt(args[0]);
    } catch {
      return sendErrorMessage(message.channel, 'Must have a valid id');
    }
    if (args[0].length === 18) {
      sendSuccessMessage(
        message.channel,
        `Successfully added log channel <#${args[0]}>`
      );
    }
  }
};
