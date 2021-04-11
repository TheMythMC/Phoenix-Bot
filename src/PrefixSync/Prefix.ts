import { Player } from "../SlothpixelAPITypes/Player";

export interface IPrefixOptions {
  DefaultName?: string;
  id: string;
}

export default abstract class Prefix<T> {
  defaultName: string;
  id: string;
  constructor(options: IPrefixOptions) {
    this.id = options.id;
    this.defaultName = options.DefaultName || "No Name";
  }

  abstract run(player: Player): T;
}
