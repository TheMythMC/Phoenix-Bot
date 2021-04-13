import mongoose from 'mongoose';

export const PrefixTypes = [
  'NONE',
  'BEDWARS_LEVEL',
  'SKYWARS_LEVEL',
  'BEDWARS_COINS',
  'SKYWARS_COINS',
  'SKYBLOCK_COINS',
  'HYPIXEL_LEVEL'
];

export interface IUserData extends mongoose.Document {
  UserID: string;
  PrefixType: string;
}

const Default = {
  UserID: '',
  PrefixType: '',
};

export const schema = new mongoose.Schema({
  UserID: String,
  PrefixType: String,
});

const model = mongoose.model<IUserData>('UserData', schema);

export function createDefault(UserID: string) {
  let obj = {} as IUserData;

  Object.assign(obj, Default);
  obj.UserID = UserID;

  return new model(obj);
}

export default model;
