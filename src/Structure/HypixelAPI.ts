import Hypixel from "phoenix-slothpixel";
import Guild from "phoenix-slothpixel/typings/Guild";
import Player from "phoenix-slothpixel/typings/Player";
const slothpixelURL = process.env.SLOTHPIXEL_URL;
const backupSlothpixelURL = "https://api.slothpixel.me/api";

export async function getPlayerData(playerName: string): Promise<Player> {
  return await Hypixel.playerStats(playerName, slothpixelURL)
}

export async function getGuildDataByName(guildName): Promise<Guild> {
  return await Hypixel.guildStatsByName(guildName, slothpixelURL)
}

export async function getGuildDataByPlayer(playerName): Promise<Guild> {
  return await Hypixel.guildStatsByPlayer(playerName, slothpixelURL)
}

export async function getGuildDataByID(id): Promise<Guild> {
  return await Hypixel.guildStatsByID(id, slothpixelURL);
}
