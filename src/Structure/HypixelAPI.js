const Hypixel = require('phoenix-slothpixel');
const slothpixelURL = process.env.SLOTHPIXEL_URL;

async function getPlayerData(playerName) {
    return await Hypixel(`players/${playerName}`, slothpixelURL);
}

async function getGuildDataByName(guildName) {

    return await Hypixel(`guilds/name/${guildName}`, slothpixelURL);
}

async function getGuildDataByPlayer(playerName) {
    return await Hypixel(`guilds/${playerName}`, slothpixelURL);
}

// NOT IMPLEMENTED
async function getGuildDataByID(id) {
    return await Hypixel(`guilds/id/${id}`, slothpixelURL); // TODO: yo myth please implement this :D
}

module.exports = { getGuildDataByName, getGuildDataByPlayer, getPlayerData }