const Hypixel = require('phoenix-slothpixel');
const slothpixelURL = process.env.SLOTHPIXEL_URL;

async function getPlayerData(playerName) {
    return await Hypixel(`players/${playerName}`, slothpixelURL || process.env.SLOTHPIXEL_URL);
}

async function getGuildDataByName(guildName) {

    return await Hypixel(`guilds/name/${guildName}`, slothpixelURL || process.env.SLOTHPIXEL_URL);
}

async function getGuildDataByPlayer(playerName) {
    return await Hypixel(`guilds/${playerName}`, slothpixelURL || process.env.SLOTHPIXEL_URL);
}

module.exports = { getGuildDataByName, getGuildDataByPlayer, getPlayerData }