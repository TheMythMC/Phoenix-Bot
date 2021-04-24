import { GuildMember, User } from 'discord.js';
import Bot from '../../Bot';
import UserData, { IUserData } from '../../Schemas/UserData';
import { getPlayerData } from '../../Structure/HypixelAPI';
import Prefix from './Prefix';
import PrefixesStore from './PrefixesStore';
import PremiumUtils from '../../utils/PremiumUtils';
import PremiumLinkData from '../../Schemas/PremiumLinkData';
import PremiumUserData from '../../Schemas/PremiumUserData';

export default async function SyncPrefix(
  guildMember: GuildMember,
  Client: Bot,
  userData: IUserData,
  testPrefixType?: string
) {
  // testPrefixType is for checking if a certain prefix will work with a user
  // NOTE: Please run this with try catch statements
  const { MinecraftUUID } = await Client.LinkManager.getDataByDiscord(
    guildMember.id
  );

  if (!MinecraftUUID) {
    throw new Error(
      `You are not linked to any minecraft account. Please use \`${await Client.getPrefix(
        guildMember.guild
      )}link\` to link your account. `
    );
  }
  console.log(MinecraftUUID);

  const playerData = await getPlayerData(MinecraftUUID);

  if (!playerData)
    throw new Error(`The player you were linked to no longer exists. `); // this will rarely happen

  const prefixType = testPrefixType || userData.PrefixType;

  if (!prefixType) return;

  const prefix = PrefixesStore[prefixType];

  if (!prefix && prefixType !== 'NONE') throw new Error('Invalid prefix. ');

  const res = prefixType === 'NONE' ? undefined : await prefix.run(playerData); // if an error occurs, itll just float up and eventually be caught

  const generatedPrefix = await generatePrefix(
    prefix,
    guildMember,
    res,
    playerData,
    Client
  );
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
  let guildPrefixTemplate;
  let userPrefixTemplate;
  let newPrefix = prefix;
  let newGenValue = prefixGenValue;
  if (PremiumUtils.isGuildPremium(user.guild.id)) {
    const gData = await PremiumLinkData.findOne({
      ServerID: user.guild.id,
    }).exec();
    if (gData.EnforceCustomPrefix) {
      guildPrefixTemplate = gData.ServerPrefixTemplate || '%p: %s';
      console.log(guildPrefixTemplate);
      newPrefix = PrefixesStore[gData.ServerPrefixType] || prefix;
      newGenValue = newPrefix.run(plrData);
    }
  }

  if (PremiumUtils.isUserPremium(user.id)) {
    const uData = await UserData.findOne({ UserID: user.id }).exec();
    const pUData = await PremiumUserData.findOne({ DiscordID: user.id }).exec();

    userPrefixTemplate =
      uData?.PrefixType === 'NONE' || uData?.PrefixType === ''
        ? undefined
        : pUData.CustomPrefixData.find(
            (e) =>
              e.PrefixType === uData?.PrefixType ||
              e.PrefixType === newPrefix.id
          )?.CustomPrefix;
  }

  if (!guild) return '';
  return `[${newPrefix.generatePrefix(
    newGenValue,
    guildPrefixTemplate,
    userPrefixTemplate
  )}] ${plrData.username}`;
}
