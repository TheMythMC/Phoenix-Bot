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

// NOT IMPLEMENTED
async function getGuildDataByID(id) {
    return await Hypixel(`guilds/id/${id}`, slothpixelURL || 'https://api.slothpixel.net/api'); // TODO: yo myth please implement this :D
}

module.exports = { getGuildDataByName, getGuildDataByPlayer, getPlayerData }