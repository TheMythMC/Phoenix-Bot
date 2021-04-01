import mongoose from "mongoose";

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
  ServerID: String;
  RoleLinks: [IRole];
  GEXPData: [IGEXP];
  GEXPWhitelist: [String];
  PardonNewGEXPMembers: Boolean;
  GuildID: String;
  Prefix: String;
  BotUsername: String;
  BotPassword: String;
  BotAuth: String;
}

export const schema = new mongoose.Schema({
  ServerID: String,
  RoleLinks: [RoleSchema],
  GEXPData: [GEXPSchema],
  GEXPWhitelist: [String],
  PardonNewGEXPMembers: Boolean,
  GuildID: String,
  Prefix: String,
  BotUsername: String,
  BotPassword: String,
  BotAuth: String,
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
};

export const createDefault = (ServerID: string, prefix = "!") => {
  let obj = {} as IGuildData;

  Object.assign(obj, Default);
  obj.ServerID = ServerID;
  obj.Prefix = prefix;
  return new model(obj);
};

export default model;
