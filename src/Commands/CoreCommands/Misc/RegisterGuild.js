const Command = require("../../../Structure/Command");
const GuildData = require("../../../Schemas/GuildData");

class RegisterGuild extends Command {
    constructor(client) {
        super(client, "registerguild", {
            aliases: [],
            description: "Registers guild in db",
            category: "Misc",
            usage: `%pRegisterGuild`,
            requiredPerms: []
        });
    }

    async run(message, args, client) {
        let doc = GuildData.createDefault(message.guild.id);
        doc.save();

        client.Bot.GuildManager.addGuild(doc);

        message.reply("Registered Guild!");
    }
}

module.exports = RegisterGuild;