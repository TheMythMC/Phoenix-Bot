const Hypixel = require('phoenix-slothpixel');
const slothpixelURL = process.env.SLOTHPIXEL_URL;

async function getPlayerData(playerName) {
    return await Hypixel(`players/${playerName}`, slothpixelURL || 'http://localhost:5000/api');
}

async function getGuildDataByName(guildName) {

    return await Hypixel(`guilds/name/${guildName}`, slothpixelURL || 'http://localhost:5000/api');
}

async function getGuildDataByPlayer(playerName) {
    return await Hypixel(`guilds/${playerName}`, slothpixelURL || 'http://localhost:5000/api');
}

module.exports = { getGuildDataByName, getGuildDataByPlayer, getPlayerData }