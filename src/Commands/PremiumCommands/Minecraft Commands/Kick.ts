import { Message } from 'discord.js';
import BotCore from '../../../Structure/BotCore';
import Command from '../../../Structure/Command';
import Util from '../../../utils/Util';
import { Bot } from 'mineflayer';
import {
  sendErrorMessage,
  sendSuccessMessage,
} from '../../../utils/MessageUtils';
import PremiumUtils from '../../../utils/PremiumUtils';

module.exports = class Kick extends Command {
  constructor(client: BotCore) {
    super(client, 'kick', {
      description: 'Kicks a player from the guild',
      usage: '%pkick <Player Name>',
      category: 'Minecraft Commands',
      requiredPerms: ['ADMINISTRATOR'],
      isPremium: true,
    });
  }

  async run(message: Message, args: string[], client: BotCore) {
    try {
      if (!args[0])
        return sendErrorMessage(message.channel, 'No player provided to kick!');
      let mcBot: Bot = PremiumUtils.getMinecraftBotFromGuild(message.guild.id)
        .bot;
      mcBot.chat(`\/kick ${args[0]}`);
      sendSuccessMessage(message.channel, `Kicked ${args[0]}`);
    } catch (err) {
      sendErrorMessage(
        message.channel,
        'An error occurred while trying to kick. This may occur due to the bot not being started or invalid bot credentials. '
      );
    }
  }
};
