import Bot from '../../Bot';
import MinecraftLinkData from '../../Schemas/MinecraftLinkData';
import UserData from '../../Schemas/UserData';
import { getPlayerData } from '../../Structure/HypixelAPI';
import PrefixSync from './PrefixSync';

export function start(client: Bot): NodeJS.Timeout {
  return setInterval(async () => {
    await run(client);
  }, 1000 * 60 * 60 * 10);
}

export async function run(client: Bot) {
  const data = await MinecraftLinkData.find({}).exec();
  const guilds = client.CoreBot.guilds.cache;

  for (const user of data) {
    const id = user.DiscordID;
    const pData = await getPlayerData(user.MinecraftUUID);
    const userData = await UserData.findOne({ UserID: id }).exec();

    if (!userData) continue;

    await guilds.forEach(async (guild) => {
      const member = guild.member(id);
      if (!member) return;

      if (member && member.manageable) {
        try {
          const nick = await PrefixSync(member, client, userData, pData);

          member.setNickname(nick);
        } catch (err) {}
      }
    });
  }
}
