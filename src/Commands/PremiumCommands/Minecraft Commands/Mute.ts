import { Message } from 'discord.js';
import BotCore from '../../../Structure/BotCore';
import Command from '../../../Structure/Command';
import mineflayer from 'mineflayer'
import { sendSuccessMessage } from '../../../utils/MessageUtils';

module.exports = class Mute extends Command {
    constructor(client: BotCore) {
        super(client, 'mute', {
            description: 'Be able to mute people in your guild from discord',
            usage: '%pmute <player name> <mute time>',
            category: 'Minecraft Commands'
        });
    }

    async run(message: Message, args: string[], client: BotCore) {
        let mcBot: mineflayer.Bot = client.Bot.MineflayerManager.getMCBots().get(message.guild.id);
        mcBot.chat(`\/mute ${args[0]} ${args[1]}`);
        sendSuccessMessage(message.channel, `Muted ${args[0]} for ${args[1]}`);
    }
}