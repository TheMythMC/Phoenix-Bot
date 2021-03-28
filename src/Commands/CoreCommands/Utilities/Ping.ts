import Command from '../../../Structure/Command'
<<<<<<< HEAD
import MessageUtils from '../../../utils/MessageUtils'
=======
import { createCustomEmbed } from '../../../utils/MessageUtils';
>>>>>>> 54c786afe523ba13f42c5f6e3dfdc3416d5e456a

module.exports = class extends Command {
    constructor(client) {
		super(client, 'ping', {
			aliases: ['pi'],
			description: 'Shows the ping of the bot',
			category: 'Utilities',
			usage: '%pping',
			requiredPerms: []
		});
	}
    async run (message, _args, client) {
        const msg = await message.channel.send("Pong!");

        const latency = msg.createdTimestamp - message.createdTimestamp;
        const choices = ['Did bananas push to production... again? :unamused:', 'We all know its you, not the bot, :confused:', 'Why are you checking this, our bot works perfectly, YOU are the issue! :innocent:',
    'The Phoenix Devs are perfect, there is no reason to run this command :rolling_eyes:'];
        let response = choices[Math.floor(Math.random() * choices.length)];

<<<<<<< HEAD
        await msg.edit(MessageUtils.createCustomEmbed("PURPLE", `${response} - Bot Latency: \`${latency}ms\`, 
=======
        await msg.edit(createCustomEmbed("PURPLE", `${response} - Bot Latency: \`${latency}ms\`, 
>>>>>>> 54c786afe523ba13f42c5f6e3dfdc3416d5e456a
        API Latency: \`${Math.round(client.ws.ping)}ms\``, 'Ping', undefined))
    }
}