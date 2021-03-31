import BotCore from "../BotCore";
import { Bot } from "mineflayer";

export default class MineflayerCommand {
  name: string;
  aliases: string[];
  description: string;
  usage: string;
  requiredPerms: string[];
  minecraftBot: Bot;
  discordBot: BotCore;
  constructor(
    discordBot: BotCore,
    minecraftBot: Bot,
    name: string,
    options: IMineflayerCommand = {} as IMineflayerCommand
  ) {
    this.minecraftBot = minecraftBot;
    this.discordBot = discordBot;
    this.name = name;
    this.aliases = options.aliases || [];
    this.description = options.description || "No description provided";
    this.usage = options.usage || "No usage provided";
    this.requiredPerms = options.requiredPerms || [];
  }

  async run(args: string[], mcBot: Bot, discBot: BotCore, playerName: string) {
    throw new Error("Must specify run method");
  }
}

interface IMineflayerCommand {
  aliases: string[];
  description: string;
  usage: string;
  requiredPerms: string[];
}
