// import Hypixel from 'phoenix-slothpixel';
import fetch from 'node-fetch';
import Guild from 'phoenix-slothpixel/Guild';
import Player from 'phoenix-slothpixel/Player';

const slothpixelURL = process.env.SLOTHPIXEL_URL || 'https://api.slothpixel.me/api/';

export async function getPlayerData(playerName: string): Promise<Player> {
  // return await Hypixel.playerStats(playerName, `${slothpixelURL}players/`);
  return (await (await fetch(`${slothpixelURL}players/${playerName}`)).json()) as Player;
}

export async function getGuildDataByName(guildName: string): Promise<Guild> {
  // return await Hypixel.guildStatsByName(
  //   guildName.replace(' ', '+'),
  //   `${slothpixelURL}guilds/name/`
  // );
  return (await (await fetch(`${slothpixelURL}guilds/name/${guildName}`)).json()) as Guild;
}

export async function getGuildDataByPlayer(playerName: string): Promise<Guild> {
  // return await Hypixel.guildStatsByPlayer(
  //   playerName,
  //   `${slothpixelURL}guilds/`
  // );
  return (await (await fetch(`${slothpixelURL}guilds/${playerName}`)).json()) as Guild;
}

export async function getGuildDataByID(id: string): Promise<Guild> {
  // return await Hypixel.guildStatsByID(id, `${slothpixelURL}guilds/id/`);
  return (await (await fetch(`${slothpixelURL}guilds/id/${id}`)).json()) as Guild;
}
