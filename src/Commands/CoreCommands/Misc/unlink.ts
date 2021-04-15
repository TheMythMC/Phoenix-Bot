import Command from '../../../Structure/Command';
import MinecraftLinkData from '../../../Schemas/MinecraftLinkData';
import { sendErrorMessage, sendSuccessMessage } from '../../../utils/MessageUtils';
import { Message } from 'discord.js';
import BotCore from '../../../Structure/BotCore';

class Unlink extends Command {
  constructor(client) {
    super(client, 'unlink', {
      aliases: [],
      description: 'Unlinks discord from a minecraft player',
      category: 'Misc',
      usage: '%punlink',
      requiredPerms: [],
    });
  }

  async run(message: Message, _args: string[], client: BotCore) {
    const existingLink = client.Bot.LinkManager.getDataByDiscord(message.member.id);

    if (!existingLink) return sendErrorMessage(message.channel, 'You are not linked to any minecraft account. ');

    await MinecraftLinkData.deleteMany({ DiscordID: message.member.id })
      .then(async () => {
        await client.Bot.LinkManager.removeDiscordFromCache(message.member.id);
        return sendSuccessMessage(message.channel, 'Successfully unlinked minecraft account from discord. ');
      })
      .catch((err) => {
        return sendErrorMessage(message.channel, 'An error occurred while unlinking your account. ');
      });
  }
}

module.exports = Unlink;
