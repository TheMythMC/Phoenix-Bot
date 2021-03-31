import Command from "../../../Structure/Command";

import {
  sendCustomMessage,
  createErrorMessage,
  createSuccessMessage,
} from "../../../utils/MessageUtils";
import { Message } from "discord.js";
import BotCore from "../../../Structure/BotCore";

class ReloadServerCache extends Command {
  constructor(client) {
    super(client, "reloadservercache", {
      aliases: [],
      description: "Reloads the server cache for a server",
      category: "Misc",
      usage: `%preloadservercache [server id]`,
      requiredPerms: [],
      requireBotOwner: true,
    });
  }

  async run(message: Message, args: string[], client: BotCore) {
    let id = args[0] || message.guild.id;

    let msg = await sendCustomMessage(
      message.channel,
      "BLUE",
      "reloading guild data...",
      "Reload",
      undefined
    );

    const guildData = await client.Bot.GuildManager.getGuild(id);

    if (!guildData)
      return msg.edit(createErrorMessage("No guild found with id. "));

    client.Bot.GuildManager.updateGuild(id)
      .then(async () => {
        msg.edit(
          createSuccessMessage(
            `Guild cache for \`${id}\` successfully reloaded. `
          )
        );
      })
      .catch((err) => {
        msg.edit(
          createErrorMessage(
            `There was an error when reloading guild cache: ${err.message}`
          )
        );
      });
  }
}

module.exports = ReloadServerCache;
