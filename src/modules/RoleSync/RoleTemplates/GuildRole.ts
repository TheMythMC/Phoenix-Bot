import * as HypixelAPI from '../../../Structure/HypixelAPI';

const GuildRole = async (uuid, guildID, cache, params) => {
  if (!cache.guilds) cache.guilds = [];

  try {
    const f = cache?.guilds.find((g) => g.id === guildID || g.name === guildID);
    let guildData = f || (await HypixelAPI.getGuildDataByName(guildID));

    if (!guildData) return false;

    if (guildData.members.find((m) => m.uuid === uuid)) {
      if (!f) cache.guilds.push(guildData);
      return true;
    }
    return false;
  } catch (err) {
    return false;
  }
};

module.exports = GuildRole;
