import Command from '../../../Structure/Command'
import GuildData from "../../../Schemas/GuildData";
import PremiumLinkData from "../../../Schemas/PremiumLinkData";

import { sendCustomMessage, createSuccessMessage } from "../../../utils/MessageUtils"; 

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

        let msg = await sendCustomMessage(message.channel, "BLUE", "Unloading all guild data...", "Unload", undefined); 

        client.Bot.GuildManager.unloadGuilds(); 
            msg.edit(createSuccessMessage("Guild cache successfully unloaded. ")); 
    }
}

module.exports = UnloadServerCache;