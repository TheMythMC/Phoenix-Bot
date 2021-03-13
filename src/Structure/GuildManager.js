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

            if (await PremiumLinkData.Model.exists({ServerID: guild.ServerID})) {
                g.premium = true;
            }
        }
    }

    addGuild(doc, isPremium = false) {
        let guild = new Guild(doc, isPremium);
        this.guilds.push(guild);
        return guild;
    }

    async getGuild(guildID) {
        const foundGuild = this.guilds.find(guild => guild.id === guildID);
        if (foundGuild) return foundGuild; 

        const guild = await GuildData.Model.find({ ServerID: guildID }); 
        if (guild) {
            this.guilds.push(guild); 
            return guild; 
        } 
    }

    async updateGuild(guildID) {
        const guildData = await GuildData.Model.find({ServerID: guildID});
        let guild = await this.getGuild(guildID);
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