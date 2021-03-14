// noinspection JSUnusedLocalSymbols
module.exports = class Command {
    constructor(client, name, options = {}) {
        this.client = client
        this.name = name;
        this.aliases = options.aliases || [];
        this.description = options.description || "No description provided";
        this.category = options.category || "Misc";
        this.usage = options.usage || "No usage provided";
        this.requiredPerms = options.requiredPerms || [];
        this.requireBotOwner = options.requireBotOwner || false; 
    }
//eslint-disable-next-line
    async run(message, args, client) {
        throw new Error(`Command ${this.name} doesnt provide a run method`);
    }

    getUsage(prefix) {
        return this.usage.replace(/%p/g, prefix);
    }
}