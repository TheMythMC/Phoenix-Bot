import Player from "phoenix-slothpixel/Player";
import Prefix from "../Prefix";

class BedwarsLevel extends Prefix<String> {
  constructor() {
    super({
      DefaultName: 'Bedwars Level',
      id: 'BEDWARS_LEVEL',
    });
  }

  run(player) {
    return player.stats.BedWars.level || '0';
  }
}

module.exports = BedwarsLevel;
