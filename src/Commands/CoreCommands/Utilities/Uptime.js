const command = require('../../../Structure/Command');
const { sendCustomMessage } = require('../../../utils/MessageUtils');
const ms = require('ms');

module.exports = class extends command {
    constructor(client) {
		super(client, 'uptime', {
			aliases: ['up'],
			description: 'Shows the uptime of the bot',
			category: 'Utils',
			usage: '%puptime',
			requiredPerms: []
		});
	}
    
    async run(message, _args, client) {
        sendCustomMessage(message.channel, "PURPLE", `\`${ms(client.uptime, {long: true})}\``, "Uptime");
    }
}