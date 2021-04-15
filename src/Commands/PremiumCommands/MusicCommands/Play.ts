import Command from '../../../Structure/Command';
import BotCore from '../../../Structure/BotCore';
import { Message } from 'discord.js';
import { Player, SearchResult } from 'erela.js';

module.exports = class extends Command {
  constructor(client: BotCore) {
    super(client, 'play', {
      description: 'Plays music from a track',
      category: 'Music Commands',
      usage: '%pplay <Song name>',
      aliases: ['p'],
      isPremium: true,
    });
  }

  async run(message: Message, args: string[], client: BotCore): Promise<any> {
    const { channel } = message.member.voice;

    if (!channel) return message.reply('You need to join a voice channel.');
    if (!args.length) return message.reply('You need to give me a URL or a search term.');

    const player: Player = client.manager.create({
      guild: message.guild.id,
      voiceChannel: channel.id,
      textChannel: message.channel.id,
    });

    if (player.state !== 'CONNECTED') player.connect();

    if (player.state === 'CONNECTED' && player.voiceChannel !== message.member.voice.channel.id)
      message.reply('You must be in the same voice channel as the bot to add music.');

    const search = args.join(' ');
    let res: SearchResult;

    try {
      res = await player.search(search, message.author);
      if (res.loadType === 'LOAD_FAILED') {
        if (!player.queue.current) player.destroy();
        throw res.exception;
      }
    } catch (err) {
      return message.reply(`There was an error while searching: ${err.message}`);
    }

    switch (res.loadType) {
      case 'NO_MATCHES':
        if (!player.queue.current) player.destroy();
        return message.reply('There were no results found.');
      case 'TRACK_LOADED':
        player.queue.add(res.tracks[0]);

        if (!player.playing && !player.paused && !player.queue.size) player.play();
        return message.reply(`Queuing \`${res.tracks[0].title}\`.`);
      case 'PLAYLIST_LOADED':
        player.queue.add(res.tracks);

        if (!player.playing && !player.paused && player.queue.totalSize === res.tracks.length) player.play();
        return message.reply(`Queuing playlist \`${res.playlist.name}\` with ${res.tracks.length} tracks.`);
      case 'SEARCH_RESULT':
        let max = 5,
          collected,
          filter = (m) => m.author.id === message.author.id && /^(\d+|end)$/i.test(m.content);
        if (res.tracks.length < max) max = res.tracks.length;

        const results = res.tracks
          .slice(0, max)
          .map((track, index) => `${++index} - \`${track.title}\``)
          .join('\n');

        message.channel.send(results);

        try {
          collected = await message.channel.awaitMessages(filter, { max: 1, time: 30e3, errors: ['time'] });
        } catch (e) {
          if (!player.queue.current) player.destroy();
          return message.reply('You didn\'t provide a selection.');
        }

        const first = collected.first().content;

        if (first.toLowerCase() === 'end') {
          if (!player.queue.current) player.destroy();
          return message.channel.send('Cancelled selection.');
        }

        const index = Number(first) - 1;
        if (index < 0 || index > max - 1)
          return message.reply(`The number you provided too small or too big (1-${max}).`);

        const track = res.tracks[index];
        player.queue.add(track);

        if (!player.playing && !player.paused && !player.queue.size) player.play();
        return message.reply(`Queuing \`${track.title}\`.`);
    }
  }
};
