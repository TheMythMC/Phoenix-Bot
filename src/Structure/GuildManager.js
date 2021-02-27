const Guild = require("./Guild");
const GuildData = require("../Schemas/GuildData");
const PremiumLinkData = require("../Schemas/PremiumLinkData");


class GuildManager {
    constructor(bot) {
        // holds guild data for guilds
        this.guilds = [];
        this.bot = bot;
    }

    async loadGuilds() {
        const all = await GuildData.Model.find();

        for (let guild of all) {
            let g = this.addGuild(guild);

            console.log(guild.ServerID);

            if (await PremiumLinkData.Model.exists({ServerID: guild.ServerID})) {
                g.premium = true;
            }
        }

        console.log(this.guilds);
    }

    addGuild(doc, isPremium = false) {
        let guild = new Guild(doc, isPremium);
        this.guilds.push(guild);
        return guild;
    }

    getGuild(guildID) {
        return this.guilds.find(guild => guild.id === guildID);
    }

    async updateGuild(guildID) {
        const guildData = await GuildData.Model.find({ServerID: guildID});
        let guild = this.getGuild(guildID);
        if (!guild) return;

        guild.data = guildData;
        if (await PremiumLinkData.Model.exists({ServerID: guild.ServerID})) {
            guild.premium = true;
            return;
        }
        guild.premium = false;
    }
}

module.exports = GuildManager;