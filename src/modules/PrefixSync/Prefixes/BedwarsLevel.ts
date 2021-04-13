import Prefix from '../Prefix';

class BedwarsLevel extends Prefix<String> {
  constructor() {
    super({
      DefaultName: 'Bw Stars',
      id: 'BEDWARS_LEVEL',
    });
  }

  run(player) {
    return player.stats.BedWars.level || '0';
  }
}

module.exports = BedwarsLevel;
