import mongoose from "mongoose";

export interface IPendingPremium extends mongoose.Document {
  Key: string;
}

export const schema = new mongoose.Schema({
  Key: String,
});

const model = mongoose.model<IPendingPremium>("PendingPremiumData", schema);
const Default = {
  Key: "",
};
export const createDefault = (key) => {
  let obj: any = {};

  Object.assign(obj, Default);
  obj.Key = key;
  return new model(obj);
};

export default model;
