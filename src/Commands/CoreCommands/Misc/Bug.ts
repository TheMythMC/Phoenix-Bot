import { Message } from 'discord.js';
import BotCore from '../../../Structure/BotCore';
import Command from '../../../Structure/Command';
import { sendCustomMessage } from '../../../utils/MessageUtils';

module.exports = class extends Command {
  constructor(client: BotCore) {
    super(client, 'bug', {
      description: 'Run this command if you found a bug!',
      category: 'Misc',
      usage: '%pbug',
    });
  }

  async run(message: Message, _args: string[], _client: BotCore) {
    sendCustomMessage(
      message.channel,
      'BLUE',
      'Report it here: https://github.com/PhoenixBotMC/core/issues',
      'Found a bug?',
      ''
    );
  }
};
