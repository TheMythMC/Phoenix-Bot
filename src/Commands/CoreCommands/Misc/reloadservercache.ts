import Command from '../../../Structure/Command'
<<<<<<< HEAD
import MessageUtils from '../../../utils/MessageUtils';
const GuildData = require("../../../Schemas/GuildData");
const PremiumLinkData = require("../../../Schemas/PremiumLinkData");

=======
import GuildData from "../../../Schemas/GuildData";
import PremiumLinkData from "../../../Schemas/PremiumLinkData";

import { sendCustomMessage, createErrorMessage, createSuccessMessage } from "../../../utils/MessageUtils"; 

>>>>>>> 54c786afe523ba13f42c5f6e3dfdc3416d5e456a
class ReloadServerCache extends Command {
    constructor(client) {
        super(client, "reloadservercache", {
            aliases: [],
            description: "Reloads the server cache for a server",
            category: "Misc",
            usage: `%preloadservercache [server id]`,
            requiredPerms: [], 
            requireBotOwner: true
        });
    }

    async run(message, args, client): Promise<any> {

        let id = args[0] || message.guild.id; 

<<<<<<< HEAD
        let msg = await MessageUtils.sendCustomMessage(message.channel, "BLUE", "reloading guild data...", "Reload", undefined); 
=======
        let msg = await sendCustomMessage(message.channel, "BLUE", "reloading guild data...", "Reload", undefined); 
>>>>>>> 54c786afe523ba13f42c5f6e3dfdc3416d5e456a

        const guildData = await client.Bot.GuildManager.getGuild(id); 

        if (!guildData) return msg.edit(MessageUtils.createErrorMessage("No guild found with id. ")); 

        client.Bot.GuildManager.updateGuild(id).then(async () => {
            msg.edit(MessageUtils.createSuccessMessage(`Guild cache for \`${id}\` successfully reloaded. `)); 

        })
        .catch(err => {
            msg.edit(MessageUtils.createErrorMessage(`There was an error when reloading guild cache: ${err.message}`)); 
        })
    }
}

module.exports = ReloadServerCache;