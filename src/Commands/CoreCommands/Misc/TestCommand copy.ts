import { Message } from 'discord.js';
import BotCore from '../../../Structure/BotCore';
import Command from '../../../Structure/Command';

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
