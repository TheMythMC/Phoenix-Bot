import { Message } from 'discord.js';
import BotCore from '../../../Structure/BotCore';
import Command from '../../../Structure/Command';
import PremiumUtils from '../../../utils/PremiumUtils';

module.exports = class extends Command {
  constructor(client: BotCore) {
    super(client, 'shutdown', {
      description: 'Completely shuts down the bot',
      usage: '%pshutdown',
      category: 'Util',
      requireBotOwner: true,
    });
  }

  async run(message: Message, _args: string[], client: BotCore) {
      await message.channel.send('Bot is shuttting down...');
      await PremiumUtils.shutDown();
  }
};
