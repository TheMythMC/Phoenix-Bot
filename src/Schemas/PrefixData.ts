import mongoose from "mongoose";

type PrefixType = "" | "BEDWARS_LEVEL" | "SKYWARS_LEVEL" | "BEDWARS_COINS" | "SKYWARS_COINS" | "SKYBLOCK_COINS";

export interface IPrefixData extends mongoose.Document {
  UserID: string;
  PrefixType: PrefixType;
}

const Default = {
  UserID: "",
  PrefixType: "",
};

export const schema = new mongoose.Schema({
  UserID: String,
  PrefixType: String,
});

const model = mongoose.model<IPrefixData>("PrefixData", schema);

export function createDefault(UserID: string) {
  let obj = {} as IPrefixData;

  Object.assign(obj, Default);
  obj.UserID = UserID;

  return new model(obj);
}

export default model;
