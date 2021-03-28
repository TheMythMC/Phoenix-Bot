import Command from '../../../Structure/Command'
import MinecraftLinkData from '../../../Schemas/MinecraftLinkData'
import { sendCustomMessage, createErrorMessage, createCustomEmbed } from '../../../utils/MessageUtils' 
import { Message } from 'discord.js';
import BotCore from '../../../Structure/BotCore';

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

    async run(message: Message, args: string[], client: BotCore) {
        let mode = args[0]; 
        let time = args[1] || 7; 

        const msg = await sendCustomMessage(message.channel, "BLUE", "Checking gexp...", "GEXP", undefined); 

        const guild = await client.Bot.GuildManager.getGuild(message.guild.id); 
        const res = await checkGexp(client, guild, time); 
        if (!res || Object.keys(res).length === 0) return msg.edit(createErrorMessage("Guild not linked!")); 

        let text = ""; 

        let i = 0; 

        for (let data of res) {
            if (mode === "failed" && guild.data.GEXPWhitelist.includes(data.Rank)) continue; 
            if ((data.Passed || data.isNew) && mode === "failed") continue; 
            if (!data.Passed && !guild.data.GEXPWhitelist.includes(data.Rank) && mode === "passed" && !data.isNew) continue; 
            text += `\n\t${i+1}. \`${data.Name}\` (${data.Rank}) - ${data.Gexp}${mode === "passed" || mode === "failed" ? "" : (` - ${data.Passed ? "<:approve:813433528964481045>" : (data.isNew ? "<:early:821022017607958546>" : "<:Deny:813433562052165653>")}`)}`; 
            i++; 
        }

        if (!text) text = "No users. "; 

        msg.edit(createCustomEmbed("GREEN", text, "GEXP", "", mode === "failed" || mode === "passed" ? {} : {
            name: "Key Value", 
            value: `<:approve:813433528964481045> = Enough Gexp\n<:Deny:813433562052165653> = Not Enough Gexp${guild.data.PardonNewGEXPMembers ? `\n<:early:821022017607958546> = In guild for less than 7 days` : ""}`
        })); 
    }
}

module.exports = CheckGexp;