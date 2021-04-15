import { Message, PermissionResolvable } from 'discord.js';
import BotCore from './BotCore';

// noinspection JSUnusedLocalSymbols
export default class Command {
  client: BotCore;
  name: string;
  aliases: string[];
  description: string;
  category: string;
  usage: string;
  requiredPerms: PermissionResolvable[];
  requireBotOwner: boolean;
  isPremium: boolean;
  constructor(client: BotCore, name: string, options = {} as ICommand) {
    this.client = client;
    this.name = name;
    this.aliases = options.aliases || [];
    this.description = options.description || 'No description provided';
    this.category = options.category || 'Misc';
    this.usage = options.usage || 'No usage provided';
    this.requiredPerms = options.requiredPerms || [];
    this.requireBotOwner = options.requireBotOwner || false;
    this.isPremium = options.isPremium || false;
  }
  //eslint-disable-next-line
  async run(message: Message, args: string[], client: BotCore) {
    throw new Error(`Command ${this.name} doesnt provide a run method`);
  }

  getUsage(prefix) {
    return this.usage.replace(/%p/g, prefix);
  }
}

interface ICommand {
  aliases?: string[];
  description: string;
  category: string;
  usage: string;
  requiredPerms?: PermissionResolvable[];
  requireBotOwner?: boolean;
  isPremium?: boolean;
}
