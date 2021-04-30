import Hypixel from 'phoenix-slothpixel';
import Guild from 'phoenix-slothpixel/Guild';
import Player from 'phoenix-slothpixel/Player';

let slothpixelURL = 'https://api.slothpixel.me/api/';

export function initialize() {
  slothpixelURL = process.env.SLOTHPIXEL_URL || 'https://api.slothpixel.me/api/';
}

export async function getPlayerData(playerName: string): Promise<Player> {
  return await Hypixel.playerStats(playerName, `${slothpixelURL}players/`);
}

export async function getGuildDataByName(guildName: string): Promise<Guild> {
  return await Hypixel.guildStatsByName(guildName.replace(' ', '+'), `${slothpixelURL}guilds/name/`);
}

export async function getGuildDataByPlayer(playerName: string): Promise<Guild> {
  return await Hypixel.guildStatsByPlayer(playerName, `${slothpixelURL}guilds/`);
}

export async function getGuildDataByID(id: string): Promise<Guild> {
  return await Hypixel.guildStatsByID(id, `${slothpixelURL}guilds/id/`);
}
