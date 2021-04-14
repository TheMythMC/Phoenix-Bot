import mongoose from 'mongoose';

// this is the server pack
export interface IPremiumLinkData extends mongoose.Document {
  // Discord owner Snowflake
  DiscordID: string;
  // Discord server Snowflake
  ServerID: string;
  // UTC time of expire
  ExpireDate: number;
  // Username of Minecraft Bot
  BotUsername: string;
  // Password of MinecraftBot
  BotPassword: string;
  // Authentication of Minecraft Bot
  BotAuth: string;
  // Log channel Snowflake
  LogChannel: string;
  // String of prefix for Minecraft Bot
  MCPrefix: string;
  // If server has logging enabled
  Logging: boolean;
  // Boolean to see if the bot is online
  isBotOnline: boolean;
  // To see if bot should start automatically
  botAutoRun: boolean;
  // Role ID for staff pings (eg. when there's an invite request, etc)
  StaffRole: string;
  // If bot is allowed to ping staff
  StaffPing: boolean;
  // if server wants to enforce a custom prefix to every user
  EnforceCustomPrefix: boolean;
  // the custom prefix the server wants to display for each user; If it's an empty string, it'll disallow any prefixes; MUST have EnforceCustomPrefix enabled to work
  ServerPrefixType: string;
  // server current prefix name; If empty or undefined, will default to default prefix
  ServerPrefixTemplate: string;
}

export const schema = new mongoose.Schema({
  DiscordID: String,
  ServerID: String,
  ExpireDate: Number,
  BotUsername: String,
  BotPassword: String,
  BotAuth: String,
  LogChannel: String,
  MCPrefix: String,
  Logging: Boolean,
  isBotOnline: Boolean,
  botAutoRun: Boolean,
  StaffRole: String,
  StaffPing: Boolean,
  EnforceCustomPrefix: Boolean,
  ServerPrefixType: String,
  ServerPrefixTemplate: String,
});

const model = mongoose.model<IPremiumLinkData>('PremiumLinkData', schema);
const Default = {
  DiscordID: '',
  ServerID: '',
  ExpireDate: 0,
  BotUsername: '',
  BotPassword: '',
  BotAuth: 'mojang',
  LogChannel: '',
  MCPrefix: '!',
  Logging: false,
  isBotOnline: false,
  botAutoRun: false,
  StaffRole: '',
  StaffPing: true,
  EnforceCustomPrefix: false,
  ServerPrefixType: '',
  ServerPrefixTemplate: '',
};
export const createDefault = (DiscordID: string, ServerID: string, ExpireDate: number) => {
  let obj = {} as IPremiumLinkData;

  Object.assign(obj, Default);
  obj.DiscordID = DiscordID;
  obj.ServerID = ServerID;
  obj.ExpireDate = ExpireDate;
  return new model(obj);
};

export default model;
