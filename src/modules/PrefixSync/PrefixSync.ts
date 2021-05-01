import { GuildMember } from 'discord.js';
import Bot from '../../Bot';
import { IUserData } from '../../Schemas/UserData';
import { getPlayerData } from '../../Structure/HypixelAPI';
import PremiumUtils from '../../utils/PremiumUtils';
import Prefix from './Prefix';
import PrefixesStore from './PrefixesStore';
import PremiumLinkData from '../../Schemas/PremiumLinkData';
import UserData from '../../Schemas/UserData';
import PremiumUserData from '../../Schemas/PremiumUserData';

export default async function SyncPrefix(
  guildMember: GuildMember,
  Client: Bot,
  userData: IUserData,
  pData?,
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

  const playerData = pData || (await getPlayerData(MinecraftUUID));

  if (!playerData) throw new Error('The player you were linked to no longer exists. '); // this will rarely (if ever) happen

  const prefixType = testPrefixType || userData.PrefixType || 'NONE';

  if (!prefixType) return;

  const prefix = PrefixesStore[prefixType];

  if (prefixType === 'NONE') return playerData.username;

  if (!prefix) throw new Error('Invalid prefix. ');

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
  let guildPrefixTemplate: string;
  let userPrefixTemplate: string;
  let newPrefix = prefix;
  let newGenValue = prefixGenValue;
  if (PremiumUtils.isGuildPremium(user.guild.id)) {
    const gData = await PremiumLinkData.findOne({
      ServerID: user.guild.id,
    }).exec();
    if (gData.EnforceCustomPrefix) {
      guildPrefixTemplate = gData.ServerPrefixTemplate || '%p: %s';
      newPrefix = PrefixesStore[gData.ServerPrefixType] || prefix;
      newGenValue = newPrefix.run(plrData);
    }
  }

  if (PremiumUtils.isUserPremium(user.id)) {
    const uData = await UserData.findOne({ DiscordID: user.id }).exec();
    const pUData = await PremiumUserData.findOne({ DiscordID: user.id }).exec();

    userPrefixTemplate =
      uData?.PrefixType === 'NONE' || uData?.PrefixType === ''
        ? undefined
        : pUData.CustomPrefixData.find((e) => e.PrefixType === uData?.PrefixType || e.PrefixType === newPrefix.id)
            ?.CustomPrefix;
  }

  if (!guild) return '';
  return `[${newPrefix.generatePrefix(newGenValue, guildPrefixTemplate, userPrefixTemplate)}] ${plrData.username}`;
}
