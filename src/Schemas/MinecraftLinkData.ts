import mongoose from 'mongoose';

export interface IMinecraftLink extends mongoose.Document {
  DiscordID: string;
  MinecraftUUID: string;
}

export const schema = new mongoose.Schema({
  DiscordID: String,
  MinecraftUUID: String,
});

const model = mongoose.model<IMinecraftLink>('MinecraftLinkData', schema);
const Default = {
  DiscordID: '',
  MinecraftUUID: '',
};
export const createDefault = (DiscordID: string, MinecraftUUID: string) => {
  let obj = {} as IMinecraftLink;

  Object.assign(obj, Default);
  obj.DiscordID = DiscordID;
  obj.MinecraftUUID = MinecraftUUID;
  return new model(obj);
};

export default model;
