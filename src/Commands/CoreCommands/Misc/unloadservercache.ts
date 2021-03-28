import Command from '../../../Structure/Command'
import GuildData from "../../../Schemas/GuildData";
import PremiumLinkData from "../../../Schemas/PremiumLinkData";

<<<<<<< HEAD
import MessageUtils from '../../../utils/MessageUtils'
=======
import { sendCustomMessage, createSuccessMessage } from "../../../utils/MessageUtils"; 
>>>>>>> 54c786afe523ba13f42c5f6e3dfdc3416d5e456a

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

<<<<<<< HEAD
        let msg = await MessageUtils.sendCustomMessage(message.channel, "BLUE", "Unloading all guild data...", "Unload", undefined); 
=======
        let msg = await sendCustomMessage(message.channel, "BLUE", "Unloading all guild data...", "Unload", undefined); 
>>>>>>> 54c786afe523ba13f42c5f6e3dfdc3416d5e456a

        client.Bot.GuildManager.unloadGuilds(); 
            msg.edit(MessageUtils.createSuccessMessage("Guild cache successfully unloaded. ")); 
    }
}

module.exports = UnloadServerCache;