import { Message } from 'discord.js';
import BotCore from '../../Structure/BotCore';
import Command from '../../Structure/Command';
import { sendCustomMessage } from '../../utils/MessageUtils';
import Util from '../../utils/Util';

module.exports = class extends Command {
  constructor(client: BotCore) {
    super(client, 'help', {
      aliases: ['h'],
      description: 'Displays this message',
      category: 'Core',
      usage: '%phelp [command]',
      requiredPerms: [],
    });
  }
  async run(message: Message, args: string[], client: BotCore) {
    const cmd = args[0];

    let foundCommand: Command;

    for (let [k, command] of client.commands) {
      if (!cmd) break;
      if (command.name.toLowerCase() === cmd.toLowerCase() || command.aliases.includes(cmd.toLowerCase())) {
        foundCommand = command;
        break;
      }
    }

    if (cmd && foundCommand) {
      let toSend = `\n\t**COMMAND:**: ${foundCommand.name}\n\t**ALIASES:** ${
        foundCommand.aliases.join(', ') || 'None'
      }\n\t**USAGE:** ${foundCommand.getUsage(await client.Bot.getPrefix(message.guild))}\n\t**DESCRIPTION:** ${
        foundCommand.description
      }`;

      return sendCustomMessage(message.channel, 'PURPLE', toSend, `Help: ${cmd}`, undefined);
    }

    let cmdText = '';

    for (let [k, command] of client.commands) {
      if (Util.isCommandAllowed(message.member, command)) cmdText = cmdText + `\n${command.name}`;
    }

    return sendCustomMessage(message.channel, 'PURPLE', cmdText, 'Commands', undefined);
  }
};
