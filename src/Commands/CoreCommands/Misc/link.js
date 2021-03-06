const Command = require("../../../Structure/Command");

const MinecraftLinkData = require("../../../Schemas/MinecraftLinkData"); 

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
        if (!ign) return message.channel.send("Invalid IGN. "); 

        const plr = require("../../../Structure/HypixelAPI").getPlayerData(ign); 

        if (!plr) return message.channel.send("Invalid IGN. "); 
    }
}

module.exports = Link;