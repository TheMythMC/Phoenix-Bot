import { Message } from 'discord.js';
import BotCore from '../../../Structure/BotCore';
import Command from '../../../Structure/Command'
const GuildData = require("../../../Schemas/GuildData");
const PremiumLinkData = require("../../../Schemas/PremiumLinkData");

export default class RegisterGuild extends Command {
    constructor(client) {
        super(client, "registerguild", {
            aliases: [],
            description: "Registers guild in db",
            category: "Misc",
            usage: `%pregisterguild`,
            requiredPerms: [], 
            requireBotOwner: true
        });
    }

    async run(message: Message, _args: string[], client: BotCore): Promise<any> {

        if (await GuildData.Model.exists({ServerID: message.guild.id})) return message.reply("Guild already exists in database. ");
        let doc = GuildData.createDefault(message.guild.id);
        doc.save();

        client.Bot.GuildManager.addGuild(doc);

        message.reply("Registered Guild!");

        if (await PremiumLinkData.Model.exists({ServerID: message.guild.id})) {
            (await client.Bot.GuildManager.getGuild(message.guild.id)).premium = true;
            message.reply("This guild is Premium!");
        } else {
            message.reply("This guild is not premium. Consider buying premium as it will unlock many more features which are very useful towards your guild. For more info, visit phoenix.dev/premium!")
        }
    }
}

module.exports = RegisterGuild;