import { Message } from 'discord.js';
import SyncPrefix from '../../../modules/PrefixSync/PrefixSync';
import PrefixSync from '../../../modules/PrefixSync/PrefixSync';
import UserData, {
  createDefault,
  PrefixTypes,
} from '../../../Schemas/UserData';
import BotCore from '../../../Structure/BotCore';
import Command from '../../../Structure/Command';
import {
  sendErrorMessage,
  sendSuccessMessage,
} from '../../../utils/MessageUtils';

class SetPrefix extends Command {
  constructor(client) {
    super(client, 'setprefix', {
      aliases: [],
      description: 'Sets prefix',
      category: 'Misc',
      usage: '%psetprefix {prefix}',
      requiredPerms: [],
    });
  }

  async run(message: Message, _args: string[], _client: BotCore) {
    try {
      let user = await UserData.findOne({ UserID: message.member.id }).exec();
      if (!user)
        throw new Error(
          `No user data found. Please try to relink by doing \`${await _client.Bot.getPrefix(
            message.member.guild
          )}unlink\` and \`${await _client.Bot.getPrefix(
            message.member.guild
          )}link\`. `
        ); // this will happen only VERY rarely
      let p = await SyncPrefix(message.member, _client.Bot, user, _args[0]);
      user.PrefixType = _args[0];
      user.save();
      await message.member.setNickname(p);
      sendSuccessMessage(
        message.channel,
        `Set your prefix to: \`${_args[0]}\`. `
      );
      // spawn an async process that handles updating prefix in all the other servers
      _client.guilds.cache.forEach(async (guild) => {
        const m = guild.member(message.member.id);

        if (m) {
          try {
            // requires testing but 80% sure it works
            let nick = await SyncPrefix(m, _client.Bot, user, _args[0]);

            await m.setNickname(nick);
          } catch (err) {} // catches EVERYTHING cuz we dont care if anything happens outside the current server
        }
      });
    } catch (err) {
      console.log(err);

      return sendErrorMessage(
        message.channel,
        `An error occurred when attempting to save prefix: ${err.message}`
      );
    }
  }
}
6;
module.exports = SetPrefix;
