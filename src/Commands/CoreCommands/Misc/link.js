const Command = require("../../../Structure/Command");

const MinecraftLinkData = require("../../../Schemas/MinecraftLinkData"); 

const { sendErrorMessage, sendSuccessMessage } = require("../../../utils/MessageUtils"); 

const RoleSync = require("../../../RoleSync/RoleSync"); 

 class Link extends Command {
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

    async run(message, args, client) {
        const ign = args[0]; 
        if (!ign) return sendErrorMessage(message.channel, "Invalid IGN. "); 

        let plr; 
        
        try {
            plr = await require("../../../Structure/HypixelAPI").getPlayerData(ign); 
        } catch(err) {
            return sendErrorMessage(message.channel, "Invalid Player. "); 
        }
        
        const discord = message.author.tag;  

        let links; 

        try {
            links = plr.links.DISCORD;
        } catch (err) {
            return sendErrorMessage(message.channel, "Error: The specified player does not have discord linked!");
        }

        const existingLink = await MinecraftLinkData.Model.findOne({ MinecraftUUID: plr.uuid });

        if (existingLink) {
            if (existingLink.DiscordID !== message.member.id) return sendErrorMessage(message.channel, "This minecraft account has already been linked to another discord account. "); 

            if (existingLink.DiscordID === message.member.id/*same data*/) return sendErrorMessage(message.channel, `The discord, \`${links}\` is already linked to \`${plr.username}\`. `); 

        }

        if (discord !== links) return sendErrorMessage(message.channel, `Please change your ingame discord from \`${links}\` to \`${discord}\`. `); 

        if (await MinecraftLinkData.Model.findOne({DiscordID: message.member.id})) return sendErrorMessage(message.channel, client.parsePrefix(message.guild.id, `You are already linked to a minecraft account. Please \`%punlink\` to change your linked account. `)); 
        
        const newData = new MinecraftLinkData.Model({
            DiscordID: message.member.id, 
            MinecraftUUID: plr.uuid
        }); 

        newData.save()
            .then(() => {
                sendSuccessMessage(message.channel, `Your discord has successfully been linked with \`${plr.username}\`. ` ); 

                RoleSync(message.member, plr.uuid, client.Bot.GuildManager.getGuild(message.guild.id)?.data.RoleLinks); 
            })
            .catch((err) => {
                sendErrorMessage(message.channel, "An error occurred while attempting to save the data. "); 
            }) 
    }
}

module.exports = Link;