import mongoose from "mongoose";
import discord from "discord.js";

export interface IRole {
  DiscordRoleID: String;
  RoleTemplate: string;
  Params: Array<string>;
}

interface IGEXP {
  RoleName: string;
  MinExp: string;
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
  BotUsername: string;
  BotPassword: string;
  BotAuth: string;
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
  DashboardRoles: [String],
  DashboardPerms: [String],
});

const model = mongoose.model<IGuildData>("GuildData", schema);
const Default = {
  ServerID: "",
  RoleLinks: [],
  GEXPData: [],
  GEXPWhitelist: [],
  PardonNewGEXPMembers: false,
  GuildID: "",
  GuildBotUUID: "",
  GuildBotAPIKey: "",
  Prefix: "!",
  DashboardRoles: [],
  DashboardPerms: [],
};

export const createDefault = (ServerID: string, prefix = "!") => {
  let obj = {} as IGuildData;

  Object.assign(obj, Default);
  obj.ServerID = ServerID;
  obj.Prefix = prefix;
  return new model(obj);
};

export default model;
