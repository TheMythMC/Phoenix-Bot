import { Client } from 'discord.js';
import Command from '../../../Structure/Command'
import MessageUtils from '../../../utils/MessageUtils'
const ms = require('ms');

module.exports = class extends Command {
    constructor(client) {
		super(client, 'uptime', {
			aliases: ['up'],
			description: 'Shows the uptime of the bot',
			category: 'Utils',
			usage: '%puptime',
			requiredPerms: []
		});
	}
    
    async run(message, _args: string[], client: Client) {
        MessageUtils.sendCustomMessage(message.channel, "PURPLE", `\`${ms(client.uptime, {long: true})}\``, "Uptime", null);
    }
}