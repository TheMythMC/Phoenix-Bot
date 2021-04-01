export default class Guild {
  data: any;
  constructor(data) {
    this.data = data;
  }

  get id() {
    return this.data.ServerID;
  }
}
