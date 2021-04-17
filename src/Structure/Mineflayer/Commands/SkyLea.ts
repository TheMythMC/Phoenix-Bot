import MineflayerCommand from '../MineflayerCommand';
import BotCore from '../../BotCore';
import MineflayerBot from '../../MineflayerBot';
import * as MojangAPI from '../../MojangAPI';

module.exports = class extends MineflayerCommand {
    constructor(discordBot: BotCore, minecraftBot: MineflayerBot) {
        super(discordBot, 'skylea', {
            description: 'Fetches a skylea profile in game',
            usage: '%pskylea <player name>'
        });
    }
    async run (args: string[], mcBot: MineflayerBot, _discBot: BotCore, playerName: string) {
        let url = `https://sky.shiiyu.moe/stats/${args[0]}/`;
        if(MojangAPI.getByName(args[0])) {
            mcBot.bot.chat(`${playerName}, ${url}`);
        } else {
            mcBot.bot.chat(`This player does not exist.`);
        }
    }
};