import { Message } from 'discord.js';
import BotCore from '../../../Structure/BotCore';
import Command from '../../../Structure/Command';

module.exports = class extends Command {
    constructor(client: BotCore) {
        super(client, 'premiumdatabase', {
            isPremium: true,
            description: 'Edits the database for a premium guild',
            aliases: ['pdb'],
            usage: '%ppremiumdatabase <key>',
            category: 'Premium - Guild Commands'
        });
    }

    async run(message: Message, args: string[], client: BotCore) {
        
    }
};