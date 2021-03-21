const { glob } = require('glob-promise');
const mineflayer = require('mineflayer');
const mainBot = require('../Bot')

module.exports = class MineflayerManager {
    constructor(guilds) {
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
    createBot(guildData){
        let realGuildData = (guildData).data;
        const bot = mineflayer.createBot({
            username: realGuildData.BotUsername,
            password: realGuildData.BotPassword,
            auth: guildData.BotAuth,
            version: '1.8.9',
            host: 'buyphoenix.hypixel.net',
            port: '25565'
        });

        bot.on('error', () => {
            console.log(err);
        });

        bot.on('end', () => { 
            this.createBot(guildData); 
        });
        
        bot.chatAddPattern(/(\[.+\]) (.+) \[(.+)\]: (.+)/, 'guildChat')

        bot.on('guildChat', (_globalRank, name, _guildRank, message) => {
            
        });
        return bot;
    }
}