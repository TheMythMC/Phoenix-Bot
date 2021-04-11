import Command from "../../../Structure/Command";
import MinecraftLinkData from "../../../Schemas/MinecraftLinkData";
import { sendErrorMessage, sendSuccessMessage } from "../../../utils/MessageUtils";
import RoleSync from "../../../modules/RoleSync/RoleSync";
import { Message } from "discord.js";
import BotCore from "../../../Structure/BotCore";
import UserData, { createDefault } from "../../../Schemas/UserData";
import verify from "../../../modules/verify/verify";

export default class Link extends Command {
  constructor(client) {
    super(client, "link", {
      aliases: [],
      description: "Links discord to a minecraft player",
      category: "Misc",
      usage: `%plink <ign>
                    To link: Go into lobby > Right click Player Head > Social Media > Discord > Enter your Discord`,
      requiredPerms: [],
    });
  }

  async run(message: Message, args: string[], client: BotCore) {
    let ign = args[0];
    if (!ign) return sendErrorMessage(message.channel, "Invalid IGN. ");
    try {
      sendSuccessMessage(message.channel, verify(message.member, ign, client.Bot));
    } catch (err) {
      sendErrorMessage(message.channel, err.message);
    }
  }
}
module.exports = Link;
