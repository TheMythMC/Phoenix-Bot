import Prefix from '../Prefix';
import Player from 'phoenix-slothpixel/Player';

class BedwarsLevel extends Prefix<String> {
  constructor() {
    super({
      DefaultName: 'Bw Stars',
      id: 'BEDWARS_LEVEL',
    });
  }

  run(player: Player): String {
    return player.stats.BedWars.level.toString() || '0';
  }
}

module.exports = BedwarsLevel;
