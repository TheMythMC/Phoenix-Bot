const Command = require('../../Structure/Command.js');
const { sendCustomMessage } = require('../../utils/MessageUtils')
const slothpixel = require('phoenix-slothpixel')
const aliases = require('./gameAliases.json')

let messageToSend = '';

module.exports = class StatsCommand extends Command {
    constructor(client) {
        super(client, "stats", {
            aliases: [],
            descrition: "Shows the stats of another player",
            category: "Hypixel",
            usage: "%pstats <Game Name> <Player Name>",
            requiredPerms: []
        });
    }
    // eslint-disable-next-line no-unused-vars
    async run(message, _client, args) {
        let messageToSend;
        const data = await slothpixel(`players/${args[1]}`, 'localhost:5000/api');
        
        for (let game in aliases) {
            if (args[0] == game) {
                parseStats(game, data);
            } else {
                for(let alias in game) {
                    if(args[0] == alias) {
                        parseStats(game, data);
                    }
                }
            }
        }
        if(messageToSend == null) {
            sendCustomMessage(message.channel, "RED", "Error, cannot retreive data.");
        }

        sendCustomMessage(message.channel, "PURPLE", messageToSend);
    }
}

function parseStats(game, data) {
    switch(game) {
        case 'arcade': {
            let coins = data.arcade.coins;
            let wins = data.arcade.wins;
            messageToSend = `${coins}  ${wins}`;
            break;
        }
        
        case 'arena': {
            let dataEndpoint = data.arena;

            let coins = dataEndpoint.coins;
            let keys = dataEndpoint.keys;
            let wins = dataEndpoint.gamemodes.one_v_one.wins + dataEndpoint.gamemodes.two_v_two.wins + dataEndpoint.gamemodes.four_v_four.wins;
            let kills = dataEndpoint.gamemodes.one_v_one.kills + dataEndpoint.gamemodes.two_v_two.kills + dataEndpoint.gamemodes.four_v_four.kills;
            let deaths = dataEndpoint.gamemodes.one_v_one.deaths + dataEndpoint.gamemodes.two_v_two.deaths + dataEndpoint.gamemodes.four_v_four.deaths;
            let kdr = kills / deaths;
            let wlr = wins / deaths
            let winstreak = Math.max(dataEndpoint.gamemodes.four_v_four.winstreak, dataEndpoint.gamemodes.two_v_two.winstreak, dataEndpoint.gamemodes.one_v_one.winstreak);
            messageToSend = `**COINS**: ${coins.toLocaleString()}
            \n**KEYS**: ${keys.toLocaleString()}
            \n**WINS**: ${wins}
            \n**KILLS**: ${kills}
            \n**DEATHS**: ${deaths}
            \n**KDR**: ${kdr}
            \n**WLR**: ${wlr}
            \n**WINSTREAK**: ${winstreak}`;
        }

    }
    return messageToSend;
}