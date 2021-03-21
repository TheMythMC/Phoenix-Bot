module.exports = class MineflayerCommand {
    constructor(discordBot, minecraftBot, name, options = {}) {
        this.bot = bot;
        this.name = name;
        this.aliases = options.aliases || [];
        this.description = options.description || "No description provided";
        this.usage = options.usage || "No usage provided";
        this.requiredPerms = options.requiredPerms || [];
    }

    async run(args, client) {
        throw new Error('Must specify run method');
    }
}