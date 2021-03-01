const Hypixel = require('phoenix-slothpixel');

async function getPlayerData(playerName) {
    return await Hypixel(`players/${playerName}`, 'http://localhost:5000/api');
}

async function getGuildData(guildName) {
    return await Hypixel(`guilds/name/${guildName}`, 'https://localhost:5000/api')
}

module.exports = { getGuildData, getPlayerData }