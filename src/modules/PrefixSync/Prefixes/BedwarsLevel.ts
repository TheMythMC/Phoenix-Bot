import Player from "phoenix-slothpixel/Player";
import Prefix from "../Prefix";

class BedwarsLevel extends Prefix<String> {
  constructor() {
    super({
      DefaultName: "Bedwars Level: %s",
      id: "BEDWARS_LEVEL",
    });
  }

  run(player: Player) {
    return player.stats.BedWars.level.toString() || "0";
  }
}

module.exports = BedwarsLevel;
