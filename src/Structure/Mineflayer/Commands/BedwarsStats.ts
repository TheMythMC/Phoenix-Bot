import BotCore from '../../BotCore';
import MineflayerBot from '../../MineflayerBot';
import MineflayerCommand from '../MineflayerCommand';
import { getPlayerData } from '../../HypixelAPI';

module.exports = class extends MineflayerCommand {
  constructor(discordBot: BotCore) {
    super(discordBot, 'bedwarsstats', {
      description: 'Gets the relevent bedwars stats for a player',
      aliases: ['statsbw', 'bwstats'],
      usage: '%pbedwarsStats <playername>',
    });
  }

  async run(
    args: string[],
    mfBot: MineflayerBot,
    _discBot: BotCore,
    playerName: string
  ): Promise<any> {
    let mcBot = mfBot.bot;

    let player = await getPlayerData(args[0]);
    if (!player)
      return mcBot.chat(`Player ${args[0]} not found`);
    
    mcBot.chat(`${playerName}, BW Level: ${player.stats.BedWars.level}, FKDR: ${player.stats.BedWars.final_k_d}, W/L: ${player.stats.BedWars.w_l}`);
  }
};
