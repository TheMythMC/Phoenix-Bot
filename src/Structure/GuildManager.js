const Guild = require("./Guild");

class GuildManager {
    constructor(bot) {
        // holds guild data for guilds
        this.guilds = [];
        this.bot = bot;
    }

    async loadGuilds() {

    }

    addGuild(doc, isPremium = false) {
        let guild = new Guild(doc, isPremium);
        this.guilds.push(guild);
    }

    getGuild(guildID) {
        return this.guilds.find(guild => guild.id === guildID);
    }
}

module.exports = GuildManager;