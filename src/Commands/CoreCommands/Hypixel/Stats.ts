import { Message } from 'discord.js';
import BotCore from '../../../Structure/BotCore';
import Command from '../../../Structure/Command';
import aliases from './gameAliases.json';
import * as HypixelAPI from '../../../Structure/HypixelAPI';
import { sendCustomMessage, sendErrorMessage } from '../../../utils/MessageUtils';
import Player from 'phoenix-slothpixel/Player';
import Phoenix_Slothpixel from 'phoenix-slothpixel';

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
      let keys = Object.keys(aliases);
      keys.forEach(async (game) => {
        if (game === minigame) {
          try
            {
              await this.parseStats(minigame, await HypixelAPI.getPlayerData(playername));
            } catch (e) {
              return sendErrorMessage(message.channel, e.message);
            }
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
            try
            {
              await this.parseStats(minigame, await HypixelAPI.getPlayerData(playername));
            } catch (e) {
              return sendErrorMessage(message.channel, e.message);
            }
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
      this.parseStats(minigame, await HypixelAPI.getPlayerData(playername));
    }
  }

  async parseStats(game: string, data: Player) {
    switch (game) {
      case 'all': {
        this.msg = `
        **LEVEL**: ${data.level}\n
        **TOTAL KILLS**: ${data.total_kills}\n
        **TOTAL WINS**: ${data.total_wins}\n
        `;
      }
    }
  }
};
