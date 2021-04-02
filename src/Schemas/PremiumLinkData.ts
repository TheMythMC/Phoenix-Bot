import mongoose from "mongoose";

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
  botAutoRun: Boolean,
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
  botAutoRun: false,
};
export const createDefault = (
  DiscordID: string,
  ServerID: string,
  ExpireDate: number,
  BotUsername: string,
  BotPassword: string,
  BotAuth: string,
  LogChannel: string,
  MCPrefix: string,
  Logging: boolean
) => {
  let obj = {} as IPremiumLinkData;

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
