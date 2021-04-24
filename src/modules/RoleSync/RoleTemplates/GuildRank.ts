import * as HypixelAPI from '../../../Structure/HypixelAPI';

const GuildRank = async (uuid, guildID, cache, params) => {
  const role = params[0];
  if (!role) return;

  if (!cache.guilds) cache.guilds = [];

  try {
    const f = cache?.guilds.find((g) => g.id === guildID || g.name === guildID);
    let guildData = f || (await HypixelAPI.getGuildDataByName(guildID));

    if (!guildData) return false;

    const member = guildData.members.find(
      (m) => m.rank === role && m.uuid === uuid
    );
    if (member) {
      if (!f) cache.guilds.push(guildData);
      return true;
    }
  } catch (err) {
    return false;
  }

  return false;
};

module.exports = GuildRank;
