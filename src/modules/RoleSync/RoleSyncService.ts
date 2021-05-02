import Bot from '../../Bot';
import GuildData, { IGuildData } from '../../Schemas/GuildData';
import MinecraftLinkData from '../../Schemas/MinecraftLinkData';
import UserData from '../../Schemas/UserData';
import RoleSync from './RoleSync';

export function start(client: Bot): NodeJS.Timeout {
  return setInterval(async () => {
    await run(client);
  }, 1000 * 60 * 60 * 4);
}

export async function run(client: Bot) {
  const data = await MinecraftLinkData.find({}).exec();
  const guilds = client.CoreBot.guilds.cache;

  for (const user of data) {
    const id = user.DiscordID;
    const gCache = {}; // optimizations so we don't receive a massive ddos attack every single time we do this

    const userData = await UserData.findOne({ UserID: id }).exec();

    if (!userData) continue;

    await guilds.forEach(async (guild) => {
      // requires testing to see if cache works
      const member = guild.member(id);
      if (!member) return;

      let gData: IGuildData;
      if (gCache[guild.id]) {
        gData = gCache[guild.id];
      } else {
        gData = await GuildData.findOne({ ServerID: guild.id }).exec();
        if (!gData) return;
        gCache[guild.id] = gData;
      }

      console.log('GDATA');
      console.log(gData);
      console.log(gCache);

      if (member) {
        try {
          await RoleSync(member, user.MinecraftUUID, gData.RoleLinks);
        } catch (err) {}
      }
    });
  }
}
