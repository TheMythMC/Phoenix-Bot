import { Message } from 'discord.js';
import BotCore from '../../../Structure/BotCore';
import Command from '../../../Structure/Command';

module.exports = class extends Command {
    constructor (client: BotCore) {
        super (client, 'shutdown', {
            category: '',
            requireBotOwner: true,
            usage: '',
            description: 'Completely shuts off the bot',
        });
    }

    async run(message: Message, args, client: BotCore) {
        try {
            await message.channel.send("Bot is shutting down...");
            process.exit(0);
        } catch (e) {
            message.channel.send(`Errored: ${e.message}`)
        }
    }
}