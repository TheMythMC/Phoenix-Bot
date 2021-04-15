import mongoose from 'mongoose';

type PremiumType = 'User' | 'Server'; // Note: Whoever redeems server gets both user and server

export interface IPendingPremium extends mongoose.Document {
  Key: string;
  type: PremiumType;
}

export const schema = new mongoose.Schema({
  Key: String,
  type: String,
});

const model = mongoose.model<IPendingPremium>('PendingPremiumData', schema);
const Default = {
  Key: '',
  type: 'User',
};
export const createDefault = (key, type) => {
  let obj: any = {} as IPendingPremium;

  Object.assign(obj, Default);
  obj.Key = key;
  obj.type = type;
  return new model(obj);
};

export default model;
