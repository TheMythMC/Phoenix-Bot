import { Player } from "../SlothpixelAPITypes/Player";

export interface IPrefixOptions {
  DefaultName?: string;
  id: string;
  RequiredKeywords?: string[];
}

export default abstract class Prefix<T> {
  defaultName: string;
  id: string;
  requiredKeywords: string[];
  constructor(options: IPrefixOptions) {
    this.id = options.id;
    this.requiredKeywords = options.RequiredKeywords || [];
    this.defaultName = options.DefaultName || "%s";
  }

  abstract run(player: Player): T;
}
