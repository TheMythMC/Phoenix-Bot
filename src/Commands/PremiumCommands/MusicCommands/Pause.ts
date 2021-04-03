import { Message } from 'discord.js';
import BotCore from '../../../Structure/BotCore'
import Command from '../../../Structure/Command'

module.exports = class extends Command {
    constructor (client: BotCore) {
        super (client, 'pause', {
            description: "Pauses the current track",
            usage: "%ppause",
            category: "Music Commands"
        });
    }

    async run(message: Message, _args: string[], client: BotCore): Promise<any> {
        const player = client.manager.get(message.guild.id);
        if (!player) return message.reply("There is no track playing.");

        const { channel } = message.member.voice;
    
        if (!channel) return message.reply("You need to join a voice channel.");
        if (channel.id !== player.voiceChannel) return message.reply("You're not in the same voice channel.");
        if (player.paused) return message.reply("The player is already paused.");

        player.pause(true);
        return message.reply("paused the player.");
    }
}
