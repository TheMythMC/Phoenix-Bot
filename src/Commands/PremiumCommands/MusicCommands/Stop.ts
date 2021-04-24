import { Message } from 'discord.js';
import BotCore from '../../../Structure/BotCore';
import Command from '../../../Structure/Command';

module.exports = class extends Command {
  constructor(client: BotCore) {
    super(client, 'stop', {
      description: 'Stops the current track',
      usage: '%pstop',
      category: 'Music Commands',
      isPremium: true,
    });
  }

  async run(message: Message, args: string[], client: BotCore): Promise<any> {
    const player = client.manager.get(message.guild.id);
    if (!player) return message.reply('There is no player for this guild.');

    const { channel } = message.member.voice;

    if (!channel) return message.reply('You need to join a voice channel.');
    if (channel.id !== player.voiceChannel)
      return message.reply('You\'re not in the same voice channel.');

    player.destroy();
    return message.reply('Destroyed the player.');
  }
};
