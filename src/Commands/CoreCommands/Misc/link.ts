import Command from '../../../Structure/Command';

import MinecraftLinkData from "../../../Schemas/MinecraftLinkData"

import { sendErrorMessage, sendSuccessMessage } from "../../../utils/MessageUtils"; 

import RoleSync from "../../../RoleSync/RoleSync"; 

export default class Link extends Command {
    constructor(client) {
        super(client, "link", {
            aliases: [],
            description: "Links discord to a minecraft player",
            category: "Misc",
            usage: `%plink <ign>
                    To link: Go into lobby > Right click Player Head > Social Media > Discord > Enter your Discord`,
            requiredPerms: []
        });
    }

    async run(message, args, client): Promise<any> {
        const ign = args[0]; 
        if (!ign) return sendErrorMessage(message.channel, "Invalid IGN. "); 

        let plr; 
        
        try {
            plr = await require("../../../Structure/HypixelAPI").getPlayerData(ign); 
        } catch(err) {
            return sendErrorMessage(message.channel, "Invalid Player or error contacting API. "); 
        }
        
        const discord = message.author.tag;  

        let links; 

        try {
            links = plr.links.DISCORD;
        } catch (err) {
            return sendErrorMessage(message.channel, "Error: The specified player does not have discord linked!");
        }

        if (await client.Bot.LinkManager.getDataByDiscord(message.member.id)) return sendErrorMessage(message.channel, await client.parsePrefix(message.guild.id, `You are already linked to a minecraft account. Please \`%punlink\` to change your linked account. `)); 

        const existingLink = await client.Bot.LinkManager.getDataByUUID(plr.uuid); 

        if (existingLink) {
            if (existingLink.DiscordID !== message.member.id) return sendErrorMessage(message.channel, "This minecraft account has already been linked to another discord account. "); 

            if (existingLink.DiscordID === message.member.id/*same data*/) return sendErrorMessage(message.channel, `The discord, \`${links}\` is already linked to \`${plr.username}\`. `); 
        }

        if (discord !== links) return sendErrorMessage(message.channel, `Please change your ingame discord from \`${links}\` to \`${discord}\`. `);
        
        const newData = new MinecraftLinkData.Model({
            DiscordID: message.member.id, 
            MinecraftUUID: plr.uuid
        }); 

        newData.save()
            .then(async () => {
                RoleSync(message.member, plr.uuid, (await client.Bot.GuildManager.getGuild(message.guild.id))?.data.RoleLinks); 
                await client.Bot.LinkManager.addCache(newData); 

                sendSuccessMessage(message.channel, `Your discord has successfully been linked with \`${plr.username}\`. ` ); 
            })
            .catch((err) => {
                sendErrorMessage(message.channel, "An error occurred while attempting to save the data, please try again later. "); 
            }) 
    }
}
module.exports = Link;