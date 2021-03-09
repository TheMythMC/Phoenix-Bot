const Command = require("../../../Structure/Command");

const MinecraftLinkData = require("../../../Schemas/MinecraftLinkData"); 

const { sendErrorMessage, sendSuccessMessage } = require("../../../utils/MessageUtils"); 

 class Unlink extends Command {
    constructor(client) {
        super(client, "unlink", {
            aliases: [],
            description: "Unlinks discord from a minecraft player",
            category: "Misc",
            usage: `%punlink`,
            requiredPerms: []
        });
    }

    async run(message, args, client) {

        const existingLink = await MinecraftLinkData.Model.findOne({ DiscordID: message.member.id });

        if (!existingLink) return sendErrorMessage(message.channel, "You are not linked to any discord account. "); 

        await MinecraftLinkData.Model.deleteMany({ DiscordID: message.member.id })
            .then(() => {
                return sendSuccessMessage(message.channel, `Successfully unlinked minecraft account from discord. `); 
            })
            .catch(err => {
                return sendErrorMessage(message.channel, "An error occurred while unlinking your account. "); 
            })
    }
}

module.exports = Unlink;