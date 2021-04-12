import { GuildMember, User } from 'discord.js';
import Bot from '../../Bot';
import MinecraftLinkData from '../../Schemas/MinecraftLinkData';
import { createDefault } from '../../Schemas/UserData';
import RoleSync from '../RoleSync/RoleSync';
import { getPlayerData } from '../../Structure/HypixelAPI';

export default async function verify(member: GuildMember, ign: string, client: Bot) {
  if (!ign) throw new Error('Invalid IGN. ');

  let plr;

  try {
    plr = await getPlayerData(ign);
  } catch (err) {
    throw new Error('Invalid Player or error contacting API. ');
  }

  const discord = member.user.tag;

  let links;

  try {
    links = plr.links.DISCORD;
  } catch (err) {
    throw new Error('Error: The specified player does not have discord linked!');
  }

  if (await client.LinkManager.getDataByDiscord(member.id))
    throw new Error(
      await client.parsePrefix(
        member.id,
        `You are already linked to a minecraft account. Please \`%punlink\` to change your linked account. `
      )
    );

  const existingLink = await client.LinkManager.getDataByUUID(plr.uuid);

  if (existingLink) {
    if (existingLink.DiscordID !== member.id)
      throw new Error('This minecraft account has already been linked to another discord account. ');

    if (existingLink.DiscordID === member.id /*same data*/)
      throw new Error(`The discord, \`${links}\` is already linked to \`${plr.username}\`. `);
  }

  if (discord !== links) throw new Error(`Please change your ingame discord from \`${links}\` to \`${discord}\`. `);

  const newData = new MinecraftLinkData({
    DiscordID: member.id,
    MinecraftUUID: plr.uuid,
  });

  newData.save().then(async () => {
    // updateUser(member, plr.uuid, client);
    globalUpdateUser(member.user, plr.uuid, client); // asynchronously update the user GLOBALLY
    await client.LinkManager.addCache(newData);

    const uData = createDefault(member.id);

    uData.save().catch((err) => {
      throw new Error(`An error occurred while attempting to save the data: ${err.message}`);
    });
  });

  return `Your discord has successfully been linked with \`${plr.username}\`.`;
}

export async function globalUpdateUser(user: User, uuid, client: Bot) {
  client.CoreBot.guilds.cache.forEach((guild) => {
    const m = guild.member(user.id);

    if (m) {
      updateUser(m, uuid, client);
    }
  });
}

export async function updateUser(member: GuildMember, uuid, client: Bot) {
  try {
    RoleSync(member, uuid, (await client.GuildManager.getGuild(member.guild.id))?.data.RoleLinks);
  } catch (err) {}
}
