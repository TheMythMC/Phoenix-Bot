import mongoose from "mongoose";
import ttl from "mongoose-ttl";

export interface IOAuth extends mongoose.Document {
  SessionID: string;
  AccessToken: string;
  RefreshToken: string;
  ExpireTime: number;
}

const Default = {
  SessionID: "",
  AccessToken: "",
  RefreshToken: "",
  ExpireTime: 0,
};

export const schema = new mongoose.Schema({
  SessionID: String,
  AccessToken: String,
  RefreshToken: String,
  ExpireTime: Number,
});

schema.plugin(ttl, { ttl: 1000 * 60 * 60 * 24 * 30 });

const model = mongoose.model<IOAuth>("DiscordOAuthData", schema);

export function createDefault(SessionID, AccessToken, RefreshToken, expiresIn) {
  let obj: any = {};

  Object.assign(obj, Default);
  obj.SessionID = SessionID;
  obj.AccessToken = AccessToken;
  obj.RefreshToken = RefreshToken;
  obj.ExpireTime = Date.now() + expiresIn * 1000;

  return new model(obj);
}

export default model;
