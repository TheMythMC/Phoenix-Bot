import { GuildMember } from "discord.js";
import Bot from "../Bot";
import UserData from "../Schemas/UserData";
import { getPlayerData } from "../Structure/HypixelAPI";
import PrefixesStore from "./PrefixesStore";

export default async function SyncPrefix(guildMember: GuildMember, Client: Bot) {
  // NOTE: Please run this with try catch statements
  // TODO: test this.
  const uuid = await Client.LinkManager.getDataByDiscord(guildMember.id);
  if (!uuid)
    throw new Error(
      `You are not linked to any minecraft account. Please use \`${await Client.CoreBot.getPrefix(
        guildMember.guild
      )}link\` to link your account. `
    );
  const playerData = await getPlayerData(uuid);
  if (!playerData) throw new Error(`The player you were linked to no longer exists. `); // this will rarely happen

  // get the preferred prefix of the user
  const userData = await UserData.findOne({ UserID: guildMember.id }).exec();

  if (!userData)
    throw new Error(
      `No user data found. Please try to relink by doing \`${await Client.CoreBot.getPrefix(
        guildMember.guild
      )}unlink\` and \`${await Client.CoreBot.getPrefix(guildMember.guild)}link\`. `
    ); // TODO: Note: Still need to add userdata when linking. Unlinking and relinking will likely fix issue by adding user data.

  const prefixType = userData.PrefixType;

  if (!prefixType) return;

  const prefix = PrefixesStore[prefixType];
  if (!prefix) throw new Error(`Invalid prefix. `);

  const res = await prefix.run(playerData); // if an error occurs, itll just float up and eventually be caught

  return res;
}
