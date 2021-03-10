const Command = require('../../Structure/Command');
const messageutil = require('../../utils/MessageUtils');

module.exports = class extends Command {
    constructor(client) {
        super(client, 'help', {
            aliases: ['h'],
            description: "Displays this message",
            category: "Core",
            usage: `%phelp`,
            requiredPerms: []
        });
    }
    run(message) {
        let tosend = '';
        for(command in this.client.commands) {
            tosend = tosend + `\n**COMMAND:**: ${command.name}\n\t**USE:** ${command.usage}\n\t**DESCRIPTION:** ${command.description}`
            console.log('thing')
        }

        messageutil.sendCustomMessage(message.channel, "PURPLE", tosend, "Help");

    }
}