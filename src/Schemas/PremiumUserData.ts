import mongoose from "mongoose";

type PrefixStatus = "BEDWARS_LEVEL" | "SKYWARS_LEVEL" | "BEDWARS_COINS" | "SKYWARS_COINS" | "SKYBLOCK_COINS"; // add for even more support for games
type PrefixTypes = { [key in PrefixStatus]: string };

export interface IPremiumUserData extends mongoose.Document {
  DiscordID: string;
  CustomPrefixData: PrefixTypes;
}

export const schema = new mongoose.Schema({
  DiscordID: String,
  CustomPrefixData: {
    name: String,
    values: String,
  },
});

const model = mongoose.model<IPremiumUserData>("PremiumUserData", schema);
const Default = {
  DiscordID: "",
  CustomPrefixData: {},
};
export const createDefault = (DiscordID: string) => {
  let obj = {} as IPremiumUserData;

  Object.assign(obj, Default);
  obj.DiscordID = DiscordID;
  return new model(obj);
};

export default model;
