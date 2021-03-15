const Command = require("../../../Structure/Command");

const MinecraftLinkData = require("../../../Schemas/MinecraftLinkData"); 

const { sendErrorMessage, sendCustomMessage } = require("../../../utils/MessageUtils"); 

const checkGexp = require("../../../GEXPChecker/CheckGEXP"); 

 class CheckGexp extends Command {
    constructor(client) {
        super(client, "checkgexp", {
            aliases: ["cxp"],
            description: "Checks the Gexp of the guild",
            category: "Misc",
            usage: `%pcheckgexp [all|passed|failed] [days]`,
            requiredPerms: []
        });
    }

    async run(message, args, client) {
        let mode = args[0]; 
        let time = args[1] || 7; 
        const guild = await client.Bot.GuildManager.getGuild(message.guild.id); 
        const res = await checkGexp(client, guild, time); 
        if (!res) return sendErrorMessage("Guild not linked!"); 

        let text = ""; 

        let i = 0; 

        for (let data of res) {
            if (mode === "failed" && guild.data.GEXPWhitelist.includes(data.Rank)) continue; 
            if ((data.Passed || data.isNew) && mode === "failed") continue; 
            if (!data.Passed && !guild.data.GEXPWhitelist.includes(data.Rank) && mode === "passed" && !data.isNew) continue; 
            text += `\n\t${i+1}. \`${data.Name}\` (${data.Rank}) - ${data.Gexp}${mode === "passed" || mode === "failed" ? "" : (` - ${data.Passed ? "Enough Gexp" : (data.isNew ? "In guild for less than 7 days" : "Not enough Gexp")}`)}`; 
            i++; 
        }

        if (!text) text = "No users. "; 

        sendCustomMessage(message.channel, "GREEN", text, "GEXP"); 
    }
}

module.exports = CheckGexp;