const Command = require('../../Structure/Command.js');
const { sendCustomMessage } = require('../../utils/MessageUtils')
const slothpixel = require('phoenix-slothpixel')
const aliases = require('./gamesAliases.json');

// Used because uhhhh, Java script 

let messageToSend = '';

module.exports = class StatsCommand extends Command {
    constructor(client) {
        super(client, "stats", {
            aliases: [],
            descrition: "Shows the stats of another player",
            category: "Hypixel",
            usage: "%pstats <Player Name> <Game Name>",
            requiredPerms: []
        });
    }
    // eslint-disable-next-line no-unused-vars
    async run(message, _client, args) {
        let messageToSend;
        const data = await slothpixel(`players/${args[0]}`, 'localhost:5000/api');
        if(args[1]){
            for (let game in aliases) {
                if (args[1] == game) {
                 await parseStats(game.toLowerCase(), data);
                } else {
                    for(let alias in game) {
                        if(args[1] == alias) {
                            await parseStats(game.toLowerCase(), data);
                        }
                    }
                }
            }
        } else {
            await parseStats('all', data)
        }
        if(messageToSend == null) {
            sendCustomMessage(message.channel, "RED", "Error, cannot retreive data.");
        }

        sendCustomMessage(message.channel, "PURPLE", messageToSend, `$`);
    }

}

parseStats(game, data) {
    switch(game) {
        case 'arcade': {
            let coins = data.Arcade.coins;
            let wins = data.Arcade.wins;
            messageToSend = `**COINS: ${coins}\n**WINS**: ${wins}`;
            break;
        }
        
        case 'arena': {
            let dataEndpoint = data.Arena;

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
            \n**WINS**: ${wins.toLocaleString()}
            \n**KILLS**: ${kills.toLocaleString()}
            \n**DEATHS**: ${deaths.toLocaleString()}
            \n**KDR**: ${kdr}
            \n**WLR**: ${wlr}
            \n**WINSTREAK**: ${winstreak}`;
            break;
        }
        case 'warlords': {
            let dataEndpoint = data.Warlords;

            let coins = dataEndpoint.coins;
            let kills = dataEndpoint.kills;
            let deaths = dataEndpoint.deaths;
            let wins = dataEndpoint.wins;
            let kdr = (kills / deaths);
            let wlr = (wins / deaths);
            messageToSend = `**COINS**: ${coins.toLocaleString()}
            \n**WINS**: ${wins.toLocaleString()}
            \n**KILLS**: ${kills.toLocaleString()}
            \n**DEATHS**: ${deaths.toLocaleString()}
            \n**KDR**: ${kdr}
            \n**WLR**: ${wlr}`;
            break;
        }
        case 'bedwars': {
            let dataEndpoint = data.BedWars;

            let coins = dataEndpoint.coins.toLocaleString();
            let level = dataEndpoint.level.toLocaleString();
            let wins = dataEndpoint.wins.toLocaleString();
            let final_kills = dataEndpoint.final_kills.toLocaleString();
            let winstreak = dataEndpoint.winstreak.toLocaleString();
            let fkdr = dataEndpoint.final_k_d.toLocaleString();
            let wlr = dataEndpoint.w_l.toLocaleString();
            messageToSend = `
            **LEVEL**: ${level}\n
            **WINS**: ${wins}\n
            **FINAL KILLS**: ${final_kills}\n
            **FKDR**: ${fkdr}\n
            **
            `
        }


    }
    return messageToSend;
}
