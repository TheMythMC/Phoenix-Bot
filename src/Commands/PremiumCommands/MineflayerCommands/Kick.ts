import { Message } from 'discord.js';
import BotCore from '../../../Structure/BotCore';
import Command from '../../../Structure/Command';
import Util from '../../../utils/Util'
import { Bot } from 'mineflayer';
import { sendSuccessMessage } from '../../../utils/MessageUtils';

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
        let mcBot: Bot = Util.getMinecraftBotForGuild(message.guild.id);
        mcBot.chat(`\/kick ${args[0]}`);
        sendSuccessMessage(message.channel, `Successfully kicked ${args[0]}`)
    }
}