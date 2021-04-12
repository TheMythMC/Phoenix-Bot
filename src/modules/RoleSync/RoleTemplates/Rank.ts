import * as HypixelAPI from '../../../Structure/HypixelAPI';

const Rank = async (uuid, guildID, cache, params) => {
  const rank = params[0];
  if (!rank) return;

  if (!cache.guilds) cache.players = [];

  try {
    const f = cache?.players.find((p) => p.uuid === uuid);
    let player = f || (await HypixelAPI.getPlayerData(uuid));

    if (!player || !player.rank) return false;

    if (player.rank === rank) {
      if (!f) cache.players.push(player);
      return true;
    }
  } catch (err) {
    return false;
  }
};

module.exports = Rank;
