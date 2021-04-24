import { Message } from 'discord.js';
import BotCore from '../../../Structure/BotCore';
import Command from '../../../Structure/Command';
import PremiumUserData, {
  createDefault,
} from '../../../Schemas/PremiumUserData';
import {
  sendErrorMessage,
  sendSuccessMessage,
} from '../../../utils/MessageUtils';

module.exports = class extends Command {
  constructor(client: BotCore) {
    super(client, 'registerpremiumuser', {
      description: 'Makes you premium!!!',
      usage: '%pvolume',
      category: 'Misc',
      requireBotOwner: true,
    });
  }

  async run(message: Message, args: string[], client: BotCore): Promise<any> {
    const member = message.member;

    const fUser = await PremiumUserData.findOne({
      DiscordID: member.id,
    }).exec();
    if (fUser)
      return sendErrorMessage(
        message.channel,
        'You are already a premium user. '
      );

    const user = createDefault(member.id);
    user
      .save()
      .then(() => {
        sendSuccessMessage(
          message.channel,
          `Successfully registered you as a premium user!`
        );
      })
      .catch((err) => {
        sendErrorMessage(message.channel, `An error occurred: ${err.message}`);
      });
  }
};
