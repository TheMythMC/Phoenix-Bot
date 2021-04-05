/*
 * Added so that git doesnt crap itself whenever we make changes to @Utils.ts
 */
import Bot from "../Bot";

export default class PremiumUtils {
  static getMinecraftBotFromGuild(guildID: string) {
    return Bot.instance.MineflayerManager.getMCBots().get(guildID);
  }
}
