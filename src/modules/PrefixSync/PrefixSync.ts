import { GuildMember, User } from 'discord.js';
import Bot from '../../Bot';
import UserData, { IUserData } from '../../Schemas/UserData';
import { getPlayerData } from '../../Structure/HypixelAPI';
import Prefix from './Prefix';
import PrefixesStore from './PrefixesStore';

export default async function SyncPrefix(
  guildMember: GuildMember,
  Client: Bot,
  userData: IUserData,
  testPrefixType?: string
) {
  // testPrefixType is for checking if a certain prefix will work with a user
  // NOTE: Please run this with try catch statements
  const { MinecraftUUID } = await Client.LinkManager.getDataByDiscord(guildMember.id);

  if (!MinecraftUUID) {
    throw new Error(
      `You are not linked to any minecraft account. Please use \`${await Client.getPrefix(
        guildMember.guild
      )}link\` to link your account. `
    );
  }

  const playerData = await getPlayerData(MinecraftUUID);

  if (!playerData) throw new Error(`The player you were linked to no longer exists. `); // this will rarely happen

  const prefixType = testPrefixType || userData.PrefixType;

  if (!prefixType) return;

  const prefix = PrefixesStore[prefixType];

  if (!prefix && prefixType !== 'NONE') throw new Error('Invalid prefix. ');

  const res = prefixType === 'NONE' ? undefined : await prefix.run(playerData); // if an error occurs, itll just float up and eventually be caught

  const generatedPrefix = await generatePrefix(prefix, guildMember, res, playerData, Client);
  return generatedPrefix;
}

export async function generatePrefix(
  prefix: Prefix<any>,
  user: GuildMember,
  prefixGenValue: any,
  plrData,
  client: Bot
): Promise<string> {
  const guild = await client.GuildManager.getGuild(user.guild.id);
  if (!guild) return '';
  return `[${prefix.generatePrefix(prefixGenValue)}] ${plrData.username}`;
}
