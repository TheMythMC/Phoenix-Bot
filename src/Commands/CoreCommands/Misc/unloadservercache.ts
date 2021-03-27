import Command from '../../../Structure/Command'
const GuildData = require("../../../Schemas/GuildData");
const PremiumLinkData = require("../../../Schemas/PremiumLinkData");

import MessageUtils from '../../../utils/MessageUtils'

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

        let msg = await MessageUtils.sendCustomMessage(message.channel, "BLUE", "Unloading all guild data...", "Unload", undefined); 

        client.Bot.GuildManager.unloadGuilds(); 
            msg.edit(MessageUtils.createSuccessMessage("Guild cache successfully unloaded. ")); 
    }
}

module.exports = UnloadServerCache;