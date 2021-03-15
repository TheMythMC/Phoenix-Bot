const Command = require("../../../Structure/Command");
const GuildData = require("../../../Schemas/GuildData");
const PremiumLinkData = require("../../../Schemas/PremiumLinkData");

const { sendCustomMessage, createSuccessMessage } = require("../../../utils/MessageUtils"); 

class UnloadServerCache extends Command {
    constructor(client) {
        super(client, "unloadservercache", {
            aliases: [],
            description: "Unloads ALL server cache",
            category: "Misc",
            usage: `%punloadservercache`,
            requiredPerms: [], 
            requireBotOwner: true
        });
    }

    async run(message, args, client) {

        let msg = await sendCustomMessage(message.channel, "BLUE", "Unloading all guild data...", "Unload"); 

        client.Bot.GuildManager.unloadGuilds(); 
            msg.edit(createSuccessMessage("Guild cache successfully unloaded. ")); 
    }
}

module.exports = UnloadServerCache;