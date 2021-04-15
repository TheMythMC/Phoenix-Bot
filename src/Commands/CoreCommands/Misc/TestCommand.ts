import { Message } from 'discord.js';
import SyncPrefix from '../../../modules/PrefixSync/PrefixSync';
import PrefixSync from '../../../modules/PrefixSync/PrefixSync';
import UserData, { createDefault, PrefixTypes } from '../../../Schemas/UserData';
import BotCore from '../../../Structure/BotCore';
import Command from '../../../Structure/Command';
import { sendErrorMessage } from '../../../utils/MessageUtils';

class TestCommand extends Command {
  constructor(client) {
    super(client, 'testcommand', {
      aliases: [],
      description: 'Test Command to see if bot is working',
      category: 'Misc',
      usage: '%pTestCommand',
      requiredPerms: [],
    });
  }

  async run(message: Message, _args: string[], _client: BotCore) {
    message.channel.send('Yes, I work :confused:');
  }
}
6;
module.exports = TestCommand;
