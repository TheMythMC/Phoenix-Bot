import { Message } from 'discord.js';
import BotCore from '../../../Structure/BotCore';
import Command from '../../../Structure/Command';
import { Bot } from 'mineflayer'
import { sendSuccessMessage } from '../../../utils/MessageUtils';
import PremiumUtils from '../../../utils/PremiumUtils';
import MineflayerBot from '../../../Structure/MineflayerBot';

module.exports = class extends Command {
    constructor(client: BotCore) {
        super (
            client,
            'invite',
            {
                description: 'Sends an invite link to a player',
                usage: '%pinvite <player name>',
                category: 'Minecraft Commands'
            }
        );
    }

    async run(message: Message, args: string[], client: BotCore): Promise<any> {
        let mcBot: Bot = PremiumUtils.getMinecraftBotFromGuild(message.guild.id).bot;
        if (mcBot == null) {
            return message.channel.send('There isn\'t a minecraft Bot linked with this guild. Please contact the admins of project phoenix if you think this is an issue');
        }
        mcBot.chat(`\/g invite ${args[0]}`);
        sendSuccessMessage(message.channel, `Successfully invited ${args[0]} to the guild.`)
    }
}