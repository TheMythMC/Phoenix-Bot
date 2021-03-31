import Command from "../../../Structure/Command";

import {
  sendCustomMessage,
  createSuccessMessage,
} from "../../../utils/MessageUtils";
import { Message } from "discord.js";
import BotCore from "../../../Structure/BotCore";

class UnloadServerCache extends Command {
  constructor(client) {
    super(client, "unloadservercache", {
      aliases: [],
      description: "Unloads ALL server cache",
      category: "Misc",
      usage: `%punloadservercache`,
      requiredPerms: [],
      requireBotOwner: true,
    });
  }
  async run(message: Message, _args: string[], client: BotCore) {
    let msg = await sendCustomMessage(
      message.channel,
      "BLUE",
      "Unloading all guild data...",
      "Unload",
      undefined
    );

    client.Bot.GuildManager.unloadGuilds();
    msg.edit(createSuccessMessage("Guild cache successfully unloaded. "));
  }
}

module.exports = UnloadServerCache;
