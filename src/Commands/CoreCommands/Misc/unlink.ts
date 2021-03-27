import Command from '../../../Structure/Command'
const MinecraftLinkData = require('../../../Schemas/MinecraftLinkData')

import MessageUtils from '../../../utils/MessageUtils' 

 class Unlink extends Command {
    constructor(client) {
        super(client, "unlink", {
            aliases: [],
            description: "Unlinks discord from a minecraft player",
            category: "Misc",
            usage: `%punlink`,
            requiredPerms: [],
            requireBotOwner: false
        });
    }

    async run(message, args, client) {

        const existingLink = client.Bot.LinkManager.getDataByDiscord(message.member.id); 

        if (!existingLink) return MessageUtils.sendErrorMessage(message.channel, "You are not linked to any discord account. "); 

        await MinecraftLinkData.Model.deleteMany({ DiscordID: message.member.id })
            .then(async () => {
                await client.Bot.LinkManager.removeDiscordFromCache(message.member.id); 
                return MessageUtils.sendSuccessMessage(message.channel, `Successfully unlinked minecraft account from discord. `); 
            })
            .catch(err => {
                return MessageUtils.sendErrorMessage(message.channel, "An error occurred while unlinking your account. "); 
            })
    }
}

module.exports = Unlink;