import { Message } from 'discord.js';
import { run } from '../../../modules/PrefixSync/PrefixSyncService';
import BotCore from '../../../Structure/BotCore';
import Command from '../../../Structure/Command';

class TestCommand extends Command {
  constructor(client) {
    super(client, 'testupdateprefix', {
      aliases: [],
      description: 'Test Command to see if bot is working',
      category: 'Misc',
      usage: '%pTestCommand',
      requiredPerms: [],
      requireBotOwner: true,
    });
  }

  async run(message: Message, _args: string[], _client: BotCore) {
    await run(_client.Bot);
  }
}
module.exports = TestCommand;
