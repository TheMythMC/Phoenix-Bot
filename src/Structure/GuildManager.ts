import Guild from './Guild';
import GuildData from '../Schemas/GuildData';
import PremiumLinkData from '../Schemas/PremiumLinkData';

export default class GuildManager {
  guilds: any[];
  bot: any;
  constructor(bot) {
    // holds guild data for guilds
    this.guilds = [];
    this.bot = bot;
  }

  unloadGuilds() {
    this.guilds = [];
  }

  async isPremium(guildID) {
    return await PremiumLinkData.exists({ ServerID: guildID });
  }

  addGuild(doc) {
    let guild = new Guild(doc);
    this.guilds.push(guild);
    return guild;
  }

  async getGuild(guildID): Promise<Guild> {
    const foundGuild = this._getGuildFromCache(guildID);
    if (foundGuild) return foundGuild;

    const guild = await GuildData.findOne({ ServerID: guildID });
    if (guild) {
      this.addGuild(guild);
      return this._getGuildFromCache(guildID);
    }
  }

  _getGuildFromCache(guildID) {
    return this.guilds.find((guild) => guild.id === guildID);
  }

  async updateGuild(guildID) {
    const guildData = await GuildData.find({ ServerID: guildID });
    let guild: any = await this.getGuild(guildID);
    if (!guild) return;

    guild.data = guildData;
    if (await PremiumLinkData.exists({ ServerID: guild.ServerID })) {
      guild.premium = true;
      return;
    }
    guild.premium = false;
  }
}

module.exports = GuildManager;
