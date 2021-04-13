import { Message } from 'discord.js';
import SyncPrefix from '../../../modules/PrefixSync/PrefixSync';
import PrefixSync from '../../../modules/PrefixSync/PrefixSync';
import UserData, { createDefault, PrefixTypes } from '../../../Schemas/UserData';
import BotCore from '../../../Structure/BotCore';
import Command from '../../../Structure/Command';
import { sendErrorMessage, sendSuccessMessage } from '../../../utils/MessageUtils';

class SetPrefix extends Command {
  constructor(client) {
    super(client, 'setprefix', {
      aliases: [],
      description: 'Sets prefix',
      category: 'Misc',
      usage: `%psetprefix {prefix}`,
      requiredPerms: [],
    });
  }

  async run(message: Message, _args: string[], _client: BotCore) {
    try {
      let p = await SyncPrefix(message.member, _client.Bot, _args[0]);
      let user = await UserData.findOne({ UserID: message.member.id }).exec();
      if (!user) throw new Error('No user data defined. '); // this will happen only VERY rarely
      if (!PrefixTypes.includes(_args[0])) throw new Error('Invalid prefix type. ');
      user.PrefixType = _args[0];
      user.save();
      await message.member.setNickname(p);
      sendSuccessMessage(message.channel, `Set your prefix to: \`${_args[0]}\`. `);
    } catch (err) {
      return sendErrorMessage(message.channel, `An error occurred when attempting to save prefix: ${err.message}`);
    }
  }
}
6;
module.exports = SetPrefix;
