const { Client, Collection } = require("discord.js");
const { sendErrorMessage } = require("../utils/MessageUtils");
const Util = require("../utils/Util");
const path = require("path");

class BotCore extends Client {
    constructor(bot, options = {}) {
        super({
            disableMentions: 'everyone'
        });

        this.validate(options);

        this.commands = new Collection();

        this.aliases = new Collection();

        this.Bot = bot;

        this.once('ready', () => {
            console.log(`Logged in as ${this.user.username}!`);
        });

        this.on('message', async (message) => {

            if (!message.guild || message.author.bot) return;

            if (!message.content.startsWith(this.prefix)) return;


            //eslint-disable-next-line no-unused-vars
            const [cmd, ...args] = message.content.slice(this.prefix.length).trim().split(/ +/g);
            const command = this.commands.get(cmd.toLowerCase()) || this.commands.get(this.aliases.get(cmd.toLowerCase()));
            if (command) {
                if (command.requiredPerms) {
                    let isAllowed = true;
                    command.requiredPerms.forEach((perm) => {
                        if (!message.member.hasPermission(perm)) isAllowed = false;
                    });
                    if (!isAllowed) return sendErrorMessage(message.channel, "You are not a high enough role to use this.");
                }
                // noinspection ES6MissingAwait
                command.run(message, args, this);
            }
        })
    }

    validate(options) {
        if (typeof options !== 'object') throw new TypeError('Options must be type of object');

        if (!options.token) throw new Error('You must provide a token for the client');
        this.token = options.token;

        // will migrate prefix to db
        if (!options.prefix) throw new Error('You must provide a prefix for the bot.');

        if (typeof options.prefix !== 'string') throw new TypeError('Prefix should be a string');
        // TODO: databasify prefix
        this.prefix = options.prefix;
    }

    async start(token = this.token) {
        await Util.loadCommands(this, `Commands${path.sep}CoreCommands`);
        await super.login(token);
    }

    getPrefix(guild) {
        // TODO: create GuildManager and stuff
    }
}


module.exports = BotCore;