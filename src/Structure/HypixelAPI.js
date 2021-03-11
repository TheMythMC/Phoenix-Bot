const Hypixel = require('phoenix-slothpixel');
const slothpixelURL = process.env.SLOTHPIXEL_URL;

async function getPlayerData(playerName) {
    return await Hypixel(`players/${playerName}`, slothpixelURL || 'https://api.slothpixel.net/api');
}

async function getGuildDataByName(guildName) {
    return await Hypixel(`guilds/name/${guildName}`, slothpixelURL || 'https://api.slothpixel.net/api');
}

async function getGuildDataByPlayer(playerName) {
    return await Hypixel(`guilds/${playerName}`, slothpixelURL || 'https://api.slothpixel.net/api');
}

module.exports = { getGuildDataByName, getGuildDataByPlayer, getPlayerData }