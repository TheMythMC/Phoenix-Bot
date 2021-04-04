import MineflayerManager from '../../MineflayerManager';
import MineflayerCommand from '../MineflayerCommand';
import BotCore from '../../BotCore';
import ky from 'ky-universal'
import MineflayerBot from '../../MineflayerBot';

module.exports = class extends MineflayerCommand {
    constructor(discordBot: BotCore, minecraftBot: MineflayerBot) {
        super(discordBot, minecraftBot, 'skylea', {
            description: 'Fetches a skylea profile in game',
            usage: '%pskylea <player name>'
        });
    }
    async run (args: string[], mcBot: MineflayerBot, _discBot: BotCore, playerName: string) {
        let url = `https://sky.shiiyu.moe/stats/${args[0]}/`;
        if(await ky.get(url)) {
            mcBot.bot.chat(`${playerName}, ${url}`);
        } else {
            mcBot.bot.chat(`This player either has no profiles or does not exist.`)
        }
    }
}