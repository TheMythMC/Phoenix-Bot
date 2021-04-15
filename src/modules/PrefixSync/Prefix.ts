import { User } from 'discord.js';
import Player from 'phoenix-slothpixel/Player';

export interface IPrefixOptions {
  DefaultName?: string;
  id: string;
  RequiredKeywords?: string[];
}

export default abstract class Prefix<T> {
  defaultName: string;
  id: string;
  requiredKeywords: string[];
  static DEFAULT_TEMPLATE = '%p: %s';
  constructor(options: IPrefixOptions) {
    this.id = options.id;
    this.requiredKeywords = options.RequiredKeywords || [];
    this.defaultName = options.DefaultName || 'Prefix';
  }

  abstract run(player: Player): T;

  generatePrefix(prefixGenValue: string, guildPrefixTemplate?: string, userPrefixTemplate?: string) {
    // goes from max importance to lowest importance
    if (guildPrefixTemplate)
      return guildPrefixTemplate.replaceAll('%p', this.defaultName).replaceAll('%s', prefixGenValue);
    if (userPrefixTemplate)
      return userPrefixTemplate.replaceAll('%p', this.defaultName).replaceAll('%s', prefixGenValue);

    return Prefix.DEFAULT_TEMPLATE.replaceAll('%p', this.defaultName).replaceAll('%s', prefixGenValue);
  }
}
