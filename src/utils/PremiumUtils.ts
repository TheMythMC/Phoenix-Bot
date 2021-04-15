/*
 * Added so that git doesnt crap itself whenever we make changes to @Utils.ts
 */
import Bot from '../Bot';
import PremiumLinkData from '../Schemas/PremiumLinkData';
import PremiumUserData from '../Schemas/PremiumUserData';

export default class PremiumUtils {
  static getMinecraftBotFromGuild(guildID: string) {
    return Bot.instance.MineflayerManager.getMCBots().get(guildID);
  }

  static async isUserPremium(userID: string) {
    return await PremiumUserData.exists({ DiscordID: userID });
  }

  static async isGuildPremium(guildID: string) {
    return await PremiumLinkData.exists({ DiscordID: guildID });
  }
}
