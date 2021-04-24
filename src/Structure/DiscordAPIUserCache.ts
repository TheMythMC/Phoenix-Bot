import fetch from 'node-fetch';

export default class DiscordAPIUserCache {
  cache: Object;
  constructor() {
    this.cache = {};
  }

  async getDiscordData(accessToken: string) {
    if (this.cache[accessToken]) return this.cache[accessToken]; // cache has the data
    const req = await fetch('http://discordapp.com/api/users/@me', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (req.status != 200) return;

    const data = await req.json();

    this.cache[accessToken] = data;

    return data;
  }
}
