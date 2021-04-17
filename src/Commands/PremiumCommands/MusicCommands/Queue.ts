import { Message, MessageEmbed } from 'discord.js';
import BotCore from '../../../Structure/BotCore';
import Command from '../../../Structure/Command';

module.exports = class extends Command {
  constructor(client: BotCore) {
    super(client, 'queue', {
      description: 'Shows the current queue',
      usage: '%pqueue',
      category: 'Music Commands',
      isPremium: true,
    });
  }

  async run(message: Message, args: string[], client: BotCore): Promise<any> {
    const player = client.manager.get(message.guild.id);
    if (!player) return message.reply('There is no Queue for this guild.');

    const queue = player.queue;
    const embed = new MessageEmbed().setAuthor(`Queue for ${message.guild.name}`);

    // change for the amount of tracks per page
    const multiple = 10;
    const page = args.length && Number(args[0]) ? Number(args[0]) : 1;

    const end = page * multiple;
    const start = end - multiple;

    const tracks = queue.slice(start, end);

    if (queue.current) embed.addField('Current', `[${queue.current.title}](${queue.current.uri})`);

    if (!tracks.length) embed.setDescription(`No tracks in ${page > 1 ? `page ${page}` : 'the queue'}.`);
    else embed.setDescription(tracks.map((track, i) => `${start + ++i} - [${track.title}](${track.uri})`).join('\n'));

    const maxPages = Math.ceil(queue.length / multiple);

    embed.setFooter(`Page ${page > maxPages ? maxPages : page} of ${maxPages}`);

    return message.reply(embed);
  }
};
