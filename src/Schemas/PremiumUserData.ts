import mongoose from 'mongoose';

export interface IPremiumUserData extends mongoose.Document {
  DiscordID: string;
  CustomPrefixData: [
    {
      PrefixType: string;
      CustomPrefix: string;
    }
  ];
}

export const schema = new mongoose.Schema({
  DiscordID: String,
  CustomPrefixData: [
    {
      PrefixType: String,
      CustomPrefix: String,
    },
  ],
});

const model = mongoose.model<IPremiumUserData>('PremiumUserData', schema);
const Default = {
  DiscordID: '',
  CustomPrefixData: [],
};
export const createDefault = (DiscordID: string) => {
  let obj = {} as IPremiumUserData;

  Object.assign(obj, Default);
  obj.DiscordID = DiscordID;
  return new model(obj);
};

export default model;
