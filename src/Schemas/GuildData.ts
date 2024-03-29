import mongoose from 'mongoose';
import discord from 'discord.js';

export interface IRole {
  DiscordRoleID: string;
  RoleTemplate: string;
  Params: Array<string>;
}

interface IGEXP {
  RoleName: string;
  MinExp: number;
}

const RoleSchema = new mongoose.Schema({
  DiscordRoleID: String, // The role ID of the discord role
  RoleTemplate: String,
  Params: [String], // parameters
});

const GEXPSchema = new mongoose.Schema({
  RoleName: String, // guild role name as shown in the API
  MinExp: Number, // minimum exp needed to gain
});

export interface IGuildData extends mongoose.Document {
  ServerID: string;
  RoleLinks: [IRole];
  GEXPData: [IGEXP];
  GEXPWhitelist: string[];
  PardonNewGEXPMembers: Boolean;
  GuildID: string;
  Prefix: string;
  GuildBotUUID: String;
  GuildBotPassword: String;
  GuildBotAuth: 'microsoft' | 'mojang';
  LogChannel: String;
  MCPrefix: String;
  Logging: Boolean;
  isBotOnline: Boolean;
  botAutoRun: Boolean;
  StaffRole: String;
  StaffPing: Boolean;
  EnforceCustomPrefix: Boolean;
  ServerPrefixType: String;
  ServerPrefixTemplate: String;
  DashboardRoles: Array<string>;
  DashboardPerms: Array<discord.PermissionResolvable>;
}

export const schema = new mongoose.Schema({
  ServerID: String,
  RoleLinks: [RoleSchema],
  GEXPData: [GEXPSchema],
  GEXPWhitelist: [String],
  PardonNewGEXPMembers: Boolean,
  GuildID: String,
  Prefix: String,
  GuildBotUUID: String,
  GuildBotPassword: String,
  GuildBotAuth: String,
  DashboardRoles: [String],
  DashboardPerms: [String],
  EnforceCustomPrefix: Boolean,
  ServerPrefixType: String,
  LogChannel: String,
  MCPrefix: String,
  Logging: Boolean,
  isBotOnline: Boolean,
  botAutoRun: Boolean,
  StaffRole: String,
  StaffPing: Boolean,
});

const model = mongoose.model<IGuildData>('GuildData', schema);
const Default = {
  ServerID: '',
  RoleLinks: [],
  GEXPData: [],
  GEXPWhitelist: [],
  PardonNewGEXPMembers: false,
  GuildID: '',
  GuildBotUUID: '',
  GuildBotPassword: '',
  GuildBotAPIKey: '',
  GuildBotAuth: 'mojang',
  Prefix: '!',
  DashboardRoles: [],
  DashboardPerms: [],
  EnforceCustomPrefix: false,
  ServerPrefixType: '',
  LogChannel: '',
  MCPrefix: '!',
  Logging: false,
  isBotOnline: false,
  botAutoRun: true,
  StaffRole: '',
  StaffPing: true,
};

export const createDefault = (
  ServerID: string,
  prefix = '!',
  GuildBotUUID: String = '',
  GuildBotPassword: String = '',
  BotAuth: 'microsoft' | 'mojang' = 'microsoft',
  LogChannel: String = '',
  MCPrefix: String = '!',
  Logging: Boolean = true,
  isBotOnline: Boolean = false,
  botAutoRun: Boolean = true,
  StaffRole: String = '',
  StaffPing: Boolean = true
) => {
  let obj = {} as IGuildData;

  Object.assign(obj, Default);
  obj.ServerID = ServerID;
  obj.Prefix = prefix;
  obj.GuildBotUUID = GuildBotUUID;
  obj.GuildBotAuth = BotAuth;
  obj.GuildBotPassword = GuildBotPassword;
  obj.LogChannel = LogChannel;
  obj.MCPrefix = MCPrefix;
  obj.Logging = Logging;
  obj.isBotOnline = isBotOnline;
  obj.botAutoRun = botAutoRun;
  obj.StaffRole = StaffRole;
  obj.StaffPing = StaffPing;
  return new model(obj);
};

export default model;
