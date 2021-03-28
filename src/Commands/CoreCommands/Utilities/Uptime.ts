import { Client, Message } from 'discord.js';
import Command from '../../../Structure/Command'
import { sendCustomMessage } from '../../../utils/MessageUtils';
import ms from 'ms';

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
    
    async run (message: Message, _args: string[], client: Client) {
        sendCustomMessage(message.channel, "PURPLE", `\`${ms(client.uptime, {long: true})}\``, "Uptime", undefined);
    }
}