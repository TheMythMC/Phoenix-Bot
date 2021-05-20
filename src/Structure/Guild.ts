import { IGuildData } from '../Schemas/GuildData';

export default class Guild {
  data: IGuildData;
  constructor(data: IGuildData) {
    this.data = data;
  }

  get id() {
    return this.data.ServerID;
  }
}
