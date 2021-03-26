const mineflayer = require('mineflayer');
const mainBot = require('../Bot')
const MineflayerCommandManager = require('./Mineflayer/MineflayerCommandManager')

export default class MineflayerManager {
    MineCraftBots: Map<Number, any>;
    constructor(guilds) {
        new MineflayerCommandManager().loadCommands(this, './Mineflayer/Commands/**/*.js');
        this.MineCraftBots = new Map();
        guilds.each(async (guild) => {
            if (mainBot.getBot().GuildManager.isPremium(guild.id) || !(guild.id === null) || !(guild.id === undefined)) {
                this.MineCraftBots.set(guild.id, this.createBot(mainBot.getBot().GuildManager.getGuild(guild.id)))
            }
        });
    }

    

    getMCBots() {
        return this.MineCraftBots;
    }
    createBot(guildData) {
        let realGuildData = (guildData).data;
        let bot = mineflayer.createBot({
            username: realGuildData.BotUsername,
            password: realGuildData.BotPassword,
            auth: guildData.BotAuth,
            version: '1.8.9',
            host: 'buyphoenix.hypixel.net',
            port: '25565'
        });

        bot.on('error', (err) => {
            console.log(err);
        });

        bot.on('end', () => { 
            this.createBot(guildData); 
        });
        
        bot.chatAddPattern(/(\[.+\]) (.+) \[(.+)\]: (.+)/, 'guildChat')

        bot.on('guildChat', (_globalRank, name, _guildRank, message) => {
            if(message.startsWith('!')) {
                MineflayerCommandManager.runCommand(message.subString(1, message.length), name, bot, mainBot.getBot().CoreBot);
            }
        });

        return bot;
    }
}
module.exports = MineflayerManager;