import BotCore from '../BotCore'

export default class MineflayerCommand {
    bot: any;
    name: any;
    aliases: any;
    description: any;
    usage: any;
    requiredPerms: any;
    minecraftBot: any;
    discordBot: any;
    constructor(discordBot: BotCore, minecraftBot, name, options = {} as IMineflayerCommand) {
        this.minecraftBot = minecraftBot;
        this.discordBot = discordBot;
        this.name = name;
        this.aliases = options.aliases || [];
        this.description = options.description || "No description provided";
        this.usage = options.usage || "No usage provided";
        this.requiredPerms = options.requiredPerms || [];
    }

    async run(args, mcBot, discBot, playerName) {
        throw new Error('Must specify run method');
    }
}
interface IMineflayerCommand {
    aliases: [],
    description,
    usage,
    requiredPerms
}