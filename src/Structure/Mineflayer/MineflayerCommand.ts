import BotCore from '../BotCore';
import MineflayerBot from '../MineflayerBot';

export default class MineflayerCommand {
  name: string;
  aliases: string[];
  description: string;
  usage: string;
  minecraftBot: MineflayerBot;
  discordBot: BotCore;
  constructor(
    discordBot: BotCore,
    name: string,
    options: IMineflayerCommand = {} as IMineflayerCommand
  ) {
    this.discordBot = discordBot;
    this.name = name;
    this.aliases = options.aliases || [];
    this.description = options.description || 'No description provided';
    this.usage = options.usage || 'No usage provided';
  }

  async run(
    args: string[],
    mcBot: MineflayerBot,
    discBot: BotCore,
    playerName: string
  ) {
    throw new Error('Must specify run method');
  }
}

interface IMineflayerCommand {
  aliases?: string[];
  description: string;
  usage: string;
}
