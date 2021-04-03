import { Message } from 'discord.js';
import BotCore from '../../../Structure/BotCore';
import Command from '../../../Structure/Command';
import Util from '../../../utils/Util'
import { Bot } from 'mineflayer';
import { sendSuccessMessage } from '../../../utils/MessageUtils';
import PremiumUtils from '../../../utils/PremiumUtils';

module.exports = class Kick extends Command {
    constructor(client: BotCore) {
        super(client, 'kick', {
            description: 'Kicks a player from the guild',
            usage: '%pkick <Player Name>',
            category: 'Minecraft Commands',
            requiredPerms: ['ADMINISTRATOR']
        });
    }

    async run(message: Message, args: string[], client: BotCore) {
        let mcBot: Bot = PremiumUtils.getMinecraftBotFromGuild(message.guild.id).bot;
        mcBot.chat(`\/kick ${args[0]}`);
        sendSuccessMessage(message.channel, `Kicked ${args[0]}`)
    }
}