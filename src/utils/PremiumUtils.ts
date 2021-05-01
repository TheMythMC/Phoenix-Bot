/*
 * Added so that git doesnt crap itself whenever we make changes to @Utils.ts
 */
import Util from './Util';
import Bot from '../Bot';
import PremiumLinkData from '../Schemas/PremiumLinkData';
import PremiumUserData from '../Schemas/PremiumUserData';
import childProcess from 'child_process';

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

  static async removeAllMCBots() {
    await Bot.instance.MineflayerManager.MineCraftBots.forEach( async (bot) => {
      console.log(`Removed ${bot.bot.username}`);
      await bot._removeBot();
    });
  }

  static async shutDown() {
    this.removeAllMCBots();
    await Util.wait(2500);
    Bot.instance.CoreBot.destroy();
    if (process.platform === 'win32') {
      childProcess.exec('taskkill /f /im java.exe');
    } else {
      childProcess.exec('killall java');
    }
    process.exit(0);
  }
}
