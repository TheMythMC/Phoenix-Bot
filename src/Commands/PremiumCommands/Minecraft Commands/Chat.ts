import { Message } from 'discord.js';
import BotCore from '../../../Structure/BotCore';
import Command from '../../../Structure/Command';

module.exports = class extends Command {
    constructor (client: BotCore) {
        super(client, 'chat', {
            description: 'Send a guild chat to your guild.',
            usage: '%pchat <Message>',
            category: 'Minecraft Commands',
            isPremium: true
        });
    }

    async run(message: Message, args: string[], client: BotCore) {
        // TODO: Add checks for bot

        let mineflayerBot = client.Bot.MineflayerManager.MineCraftBots.get(message.guild.id).bot;
        mineflayerBot.chat(`/gc ${args.join(' ')}`);
        message.channel.send(`Sent message \`${args.join(' ')}\``);
    }
};