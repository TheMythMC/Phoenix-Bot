import mongoose from "mongoose";

export interface IPremiumLinkData extends mongoose.Document {
  DiscordID: string;
  ServerID: string;
  ExpireDate: number;
  BotUsername: string;
  BotPassword: string;
  BotAuth: string;
  LogChannel: number;
  MCPrefix: string;
  Logging: boolean;
  isBotOnline: boolean;
}

export const schema = new mongoose.Schema({
  DiscordID: String,
  ServerID: String,
  ExpireDate: Number,
  BotUsername: String,
  BotPassword: String,
  BotAuth: String,
  LogChannel: Number,
  MCPrefix: String,
  Logging: Boolean,
  isBotOnline: Boolean,
});

const model = mongoose.model<IPremiumLinkData>("PremiumLinkData", schema);
const Default = {
  DiscordID: "",
  ServerID: "",
  ExpireDate: 0,
  BotUsername: "",
  BotPassword: "",
  BotAuth: "mojang",
  LogChannel: "",
  MCPrefix: "!",
  Logging: false,
  isBotOnline: false,
};
export const createDefault = (
  DiscordID,
  ServerID,
  ExpireDate,
  BotUsername,
  BotPassword,
  BotAuth,
  LogChannel,
  MCPrefix,
  Logging
) => {
  let obj: any = {};

  Object.assign(obj, Default);
  obj.DiscordID = DiscordID;
  obj.ServerID = ServerID;
  obj.ExpireDate = ExpireDate;
  obj.BotUsername = BotUsername;
  obj.BotPassword = BotPassword;
  obj.BotAuth = BotAuth;
  obj.LogChannel = LogChannel;
  obj.MCPrefix = MCPrefix;
  obj.Logging = Logging;
  return new model(obj);
};

export default model;