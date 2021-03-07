const Hypixel = require('phoenix-slothpixel');

async function getPlayerData(playerName) {
    return await Hypixel(`players/${playerName}`, 'http://localhost:5000/api');
}

async function getGuildDataByName(guildName) {
    return await Hypixel(`guilds/name/${guildName}`, 'http://localhost:5000/api')
}

async function getGuildDataByPlayer(playerName) {
    return await Hypixel(`guilds/${playerName}`, 'http://localhost:5000/api')
}

module.exports = { getGuildDataByName, getGuildDataByPlayer, getPlayerData }