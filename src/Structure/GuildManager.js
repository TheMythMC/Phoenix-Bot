const Guild = require("./Guild");

class GuildManager {
    constructor(bot) {
        // holds guild data for guilds
        this.guilds = [];
        this.bot = bot;
    }

    async loadGuilds() {

    }

    addGuild(doc) {
        let guild = new Guild(doc);
        this.guilds.push(guild);
    }
}

module.exports = GuildManager;