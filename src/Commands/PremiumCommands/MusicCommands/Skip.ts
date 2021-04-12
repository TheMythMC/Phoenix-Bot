import { Message } from "discord.js";
import BotCore from "../../../Structure/BotCore";
import Command from "../../../Structure/Command";

module.exports = class extends Command {
  constructor(client: BotCore) {
    super(client, "skip", {
      description: "Skips the current track",
      usage: "%pskip",
      category: "Music Commands",
      isPremium: true,
    });
  }

  async run(message: Message, args: string[], client: BotCore): Promise<any> {
    const player = client.manager.get(message.guild.id);
    if (!player) return message.reply("There is no player for this guild.");

    const { channel } = message.member.voice;
    if (!channel) return message.reply("You need to join a voice channel.");
    if (channel.id !== player.voiceChannel) return message.reply("You're not in the same voice channel.");

    if (!player.queue.current) return message.reply("There is no music playing.");

    const { title } = player.queue.current;

    player.stop();
    return message.reply(`${title} was skipped.`);
  }
};
