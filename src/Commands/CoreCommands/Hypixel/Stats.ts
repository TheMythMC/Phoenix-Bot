import { Message } from 'discord.js';
import BotCore from '../../../Structure/BotCore';
import Command from '../../../Structure/Command';
import aliases from './gameAliases.json';
import * as HypixelAPI from '../../../Structure/HypixelAPI';
import { sendCustomMessage, sendErrorMessage } from '../../../utils/MessageUtils';

module.exports = class extends Command {
  msg: string;
  constructor(client: BotCore) {
    super(client, 'stats', {
      description: 'Shows stats for a player in games or overall',
      category: 'Hypixel',
      usage: '%pstats <Playername> <Game Name>',
    });
    this.msg;
  }

  async run(message: Message, args: string[], client: BotCore) {
    let [playername, ...splitted] = args;

    let minigame = splitted.length > 0 ? splitted.join(' ') : 'all';

    let playerData: any = await HypixelAPI.getPlayerData(playername);
    if (!playerData) return sendErrorMessage(message.channel, 'Please input a valid player name.');

    if (minigame != 'all') {
      await Object.keys(aliases.games).forEach(async (game) => {
        if (game === minigame) {
          await this.parseStats(minigame, playerData);
          return sendCustomMessage(
            message.channel,
            'BLUE',
            this.msg,
            `Stats for ${playerData.username} in ${game}`,
            ''
          );
        }
        aliases.games[game].forEach(async (alias) => {
          if (alias === minigame) {
            await this.parseStats(minigame, HypixelAPI.getPlayerData(playername));
            return sendCustomMessage(
              message.channel,
              'BLUE',
              this.msg,
              `Stats for ${playerData.username} in ${game}`,
              ''
            );
          }
        });
      });
    } else {
      this.parseStats(minigame, HypixelAPI.getPlayerData(playername));
    }
  }

  async parseStats(game: string, data: any) {
    switch (game) {
      case 'all': {
      }
    }
  }
};
