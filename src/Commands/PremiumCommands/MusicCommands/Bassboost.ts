import { Message } from 'discord.js';
import BotCore from '../../../Structure/BotCore';
import Command from '../../../Structure/Command';

module.exports = class extends Command {
  constructor(client: BotCore) {
    super(client, 'bassboost', {
      description: 'Bassboosts the current track',
      usage: '%pbassboost <none | low | medium | high>',
      category: 'Music Commands',
      isPremium: true,
    });
  }

  async run(message: Message, args: string[], client: BotCore): Promise<any> {
    const levels = {
      none: 0.0,
      low: 0.1,
      medium: 0.15,
      high: 0.25,
    };

    const player = client.manager.get(message.guild.id);
    if (!player) return message.reply('there is no player for this guild.');

    const { channel } = message.member.voice;

    if (!channel) return message.reply('you need to join a voice channel.');
    if (channel.id !== player.voiceChannel)
      return message.reply('you\'re not in the same voice channel.');

    let level = 'none';
    if (args.length && args[0].toLowerCase() in levels)
      level = args[0].toLowerCase();

    const bands = new Array(3)
      .fill(null)
      .map((_, i) => ({ band: i, gain: levels[level] }));

    player.setEQ(...bands);

    return message.reply(`set the bassboost level to ${level}`);
  }
};
