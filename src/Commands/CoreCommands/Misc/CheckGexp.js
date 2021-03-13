const Command = require("../../../Structure/Command");

const MinecraftLinkData = require("../../../Schemas/MinecraftLinkData"); 

const { sendErrorMessage, sendSuccessMessage, sendCustomMessage } = require("../../../utils/MessageUtils"); 

const checkGexp = require("../../../GEXPChecker/CheckGEXP"); 

 class CheckGexp extends Command {
    constructor(client) {
        super(client, "checkgexp", {
            aliases: ["cxp"],
            description: "Checks the Gexp of the guild",
            category: "Misc",
            usage: `%checkgexp`,
            requiredPerms: []
        });
    }

    async run(message, args, client) {
        const res = await checkGexp(client, message.guild); 
        if (!res) return sendErrorMessage("Guild not linked!"); 

        let text = ""; 

        for (let data of res) {
            text += `\n\t${data.UUID} (${data.Rank}): ${data.Gexp}; ${data.Passed ? "Enough Gexp" : (data.Size >= 7 ? "Not enough Gexp" : "In guild for less than 7 days")}`; 
        }

        sendCustomMessage(message.channel, "GREEN", text, "GEXP"); 
    }
}

module.exports = CheckGexp;