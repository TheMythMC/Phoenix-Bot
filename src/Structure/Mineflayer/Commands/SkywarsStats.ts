import BotCore from '../../BotCore';
import MineflayerBot from '../../MineflayerBot';
import MineflayerCommand from '../MineflayerCommand';
import { getPlayerData } from '../../HypixelAPI';

module.exports = class extends MineflayerCommand {
  constructor(discordBot: BotCore) {
    super(discordBot, 'skywarsstats', {
      description: 'Gets the relevent bedwars stats for a player',
      aliases: ['statssw', 'swstats'],
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
      return mcBot.chat(`The player, ${args[0]}, doesn\'t exist`);
    
    mcBot.chat(`${playerName}, SW Level: ${player.stats.SkyWars.level}, K/D: ${player.stats.SkyWars.kill_death_ratio}, W/L: ${player.stats.SkyWars.win_loss_ratio}`);
  }
};
