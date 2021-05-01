import { GuildMember } from 'discord.js';
import { IRole } from '../../Schemas/GuildData';

// im too lazy to make registration system so im just resorting to this
const roleMethods = {
  GuildRank: require('./RoleTemplates/GuildRank'),
  Rank: require('./RoleTemplates/Rank'),
  GuildRole: require('./RoleTemplates/GuildRole'),
};

export default async (member: GuildMember, uuid: string, roleLinks: Array<IRole> = []) => {
  const guild = member.guild;

  const cache = {}; // will be rewritten every run to avoid old data

  const roleData = {};

  for (const roleLink of roleLinks) {
    let meth = roleMethods[roleLink.RoleTemplate];

    if (!meth) continue;

    const res = await meth(uuid, member.guild.id, cache, roleLink.Params);

    roleData[roleLink.DiscordRoleID] = res;

    const role = await guild.roles.fetch(roleLink.DiscordRoleID);

    if (!role) continue;

    if (res) {
      await member.roles.add(role); // throws error; make it silently be caught higher up (not here)
    } else {
      await member.roles.remove(role);
    }
  }
};

module.exports.RoleMethods = roleMethods;
