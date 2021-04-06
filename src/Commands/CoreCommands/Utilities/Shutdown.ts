import { Message } from 'discord.js';
import BotCore from '../../../Structure/BotCore';
import Command from '../../../Structure/Command';

module.exports = class extends Command {
    constructor(client: BotCore)  {
        super (client, 'shutdown', {
            description: 'Completely shuts down the bot',
            usage: '%pshutdown',
            category: 'Util'
        });
    }

    async run(message: Message, _args: string[], client: BotCore) {
        try {
            message.channel.send("Bot is shuttting down...").then( () => {
                client.destroy();
                process.exit(0);
            });
        } catch (e) {
            console.log(e.message)
        }
    }
}