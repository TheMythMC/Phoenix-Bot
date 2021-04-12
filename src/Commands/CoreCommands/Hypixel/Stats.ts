import { Message } from "discord.js";
import BotCore from "../../../Structure/BotCore";
import Command from "../../../Structure/Command";
import aliases from "./gameAliases.json";
import * as HypixelAPI from "../../../Structure/HypixelAPI";
import { sendCustomMessage, sendErrorMessage } from "../../../utils/MessageUtils";
import Player from "phoenix-slothpixel/Player";

module.exports = class extends Command {
  msg: string;
  constructor(client: BotCore) {
    super(client, "stats", {
      description: "Shows stats for a player in games or overall",
      category: "Hypixel",
      usage: "%pstats <Playername> <Game Name>",
    });
    this.msg;
  }

  async run(message: Message, args: string[], client: BotCore) {
    let [playername, ...splitted] = args;

    let minigame = splitted.length > 0 ? splitted.join(" ") : "all";

    let playerData: any = await HypixelAPI.getPlayerData(playername);
    if (!playerData) return sendErrorMessage(message.channel, "Please input a valid player name.");

    if (minigame != "all") {
      let keys = Object.keys(aliases);
      await keys.forEach(async (game) => {
        if (game === minigame) {
          await this.parseStats(minigame, playerData);
          return sendCustomMessage(
            message.channel,
            "BLUE",
            this.msg,
            `Stats for ${playerData.username} in ${game}`,
            ""
          );
        }
        aliases.games[game].forEach(async (alias: string) => {
          if (alias === minigame) {
            await this.parseStats(minigame, await HypixelAPI.getPlayerData(playername));
            return sendCustomMessage(
              message.channel,
              "BLUE",
              this.msg,
              `Stats for ${playerData.username} in ${game}`,
              ""
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
      case "all": {
      }
    }
  }
};
