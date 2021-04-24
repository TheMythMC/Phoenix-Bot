import { Message } from 'discord.js';
import BotCore from '../../../Structure/BotCore';
import Command from '../../../Structure/Command';
import { createCustomEmbed } from '../../../utils/MessageUtils';

module.exports = class extends Command {
  constructor(client) {
    super(client, 'ping', {
      aliases: ['pi'],
      description: 'Shows the ping of the bot',
      category: 'Utilities',
      usage: '%pping',
      requiredPerms: [],
    });
  }
  async run(message: Message, _args: string[], client: BotCore) {
    const msg = await message.channel.send('Pong!');

    const latency = msg.createdTimestamp - message.createdTimestamp;
    const choices = [
      'Did bananas push to production... again? :unamused:',
      'We all know its you, not the bot, :confused:',
      'Why are you checking this, our bot works perfectly, YOU are the issue! :innocent:',
      'The Phoenix Devs are perfect, there is no reason to run this command :rolling_eyes:',
    ];
    let response = choices[Math.floor(Math.random() * choices.length)];

    await msg.edit(
      createCustomEmbed(
        'PURPLE',
        `${response} - Bot Latency: \`${latency}ms\`, 
        API Latency: \`${Math.round(client.ws.ping)}ms\``,
        'Ping',
        undefined
      )
    );
  }
};
