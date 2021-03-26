const Command = require('../../Structure/Command');
const messageutil = require('../../utils/MessageUtils');

module.exports = class extends Command {
    constructor(client) {
        super(client, 'help', {
            aliases: ['h'],
            description: "Displays this message",
            category: "Core",
            usage: `%phelp [command]`,
            requiredPerms: []
        });
    }
    async run(message, args, client) {

        const cmd = args[0]; 

        let foundCommand; 

            for (let [k, command] of client.commands) {
                if (!cmd) break;  
                if (command.name.toLowerCase() === cmd.toLowerCase() || command.aliases.includes(cmd.toLowerCase())) {
                    foundCommand = command; 
                    break; 
                }
            }



        if (cmd && foundCommand) {

            let toSend = `\n\t**COMMAND:**: ${foundCommand.name}\n\t**ALIASES:** ${foundCommand.aliases.join(", ") || "None"}\n\t**USAGE:** ${foundCommand.getUsage(await client.getPrefix(message.guild))}\n\t**DESCRIPTION:** ${foundCommand.description}`; 

             return messageutil.sendCustomMessage(message.channel, "PURPLE", toSend, `Help: ${cmd}`); 
        }

        let cmdText = ""; 

        for(let [k, command] of client.commands) {
            cmdText = cmdText + `\n${command.name}`; 
        }

        return messageutil.sendCustomMessage(message.channel, "PURPLE", cmdText, "Commands");
    }
}