import BotCore from '../../Structure/BotCore';
import Guild from '../../Structure/Guild';
import * as HypixelAPI from '../../Structure/HypixelAPI';

export default async (
  client: BotCore,
  g: Guild,
  guildCheckDays: number | string = 7
) => {
  if (!g || !g.data?.GuildID) return {};
  const data = await g.data.GEXPData;

  // get data for guild
  const guildData = await HypixelAPI.getGuildDataByName(g.data.GuildID); // TODO: replace with getGuildDataByID, pretend g.data.GuildID is guild name for now

  let res: _res[] = [];

  // please optimize this looks so ugly i hate it but idk how to optimize  - Banana
  for (let member of guildData.members) {
    let gexp: any = 0;
    const xpHistory = Object.values(member.exp_history);

    let realGuildCheckDays: number =
      typeof guildCheckDays == 'string'
        ? Number.parseInt(guildCheckDays)
        : guildCheckDays;

    for (let i = 0; i < realGuildCheckDays; i++) {
      // standard for loop cuz of the guildCheckDays
      if (xpHistory[i] === undefined) break;
      gexp += xpHistory[i];
    }

    let roleReq = data.find((d) => d.RoleName === member.rank);
    if (!roleReq)
      roleReq = {
        RoleName: member.rank,
        MinExp: 0,
      };

    res.push({
      Rank: roleReq.RoleName,
      Gexp: gexp,
      Passed: gexp >= roleReq.MinExp,
      isNew:
        member.joined >= new Date().getTime() - 7 * 24 * 60 * 60 * 1000 &&
        g.data.PardonNewGEXPMembers,
      Name: await client.Bot.UUIDManager.getUserByUUID(member.uuid),
      UUID: member.uuid,
    });
  }

  res.sort((a, b) => b.Gexp - a.Gexp);

  return res;
};
interface _res {
  Rank: string;
  Gexp: number;
  Passed: boolean;
  isNew: boolean;
  Name: string;
  UUID: string;
}
