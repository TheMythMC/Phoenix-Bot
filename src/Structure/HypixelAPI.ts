const Hypixel = require('phoenix-slothpixel');
const slothpixelURL = process.env.SLOTHPIXEL_URL;
const backupSlothpixelURL = 'https:///api.slothpixel.me/api'

export async function getPlayerData(playerName) {
    return await Hypixel(`players/${playerName}`, slothpixelURL || backupSlothpixelURL);
}

export async function getGuildDataByName(guildName) {
    return await Hypixel(`guilds/name/${guildName}`, slothpixelURL || backupSlothpixelURL);
}

export async function getGuildDataByPlayer(playerName) {
    return await Hypixel(`guilds/${playerName}`, slothpixelURL || backupSlothpixelURL);
}

export async function getGuildDataByID(id) {
    return await Hypixel(`guilds/id/${id}`, slothpixelURL || backupSlothpixelURL); // TODO: yo myth please implement this :D
}

module.exports = { getGuildDataByName, getGuildDataByPlayer, getPlayerData, getGuildDataByID }