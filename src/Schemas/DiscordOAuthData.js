const mongoose = require("mongoose");
const ttl = require("mongoose-ttl"); 

const GeneralSchema = new mongoose.Schema({
    SessionID: String, 
    AccessToken: String, 
    RefreshToken: String, 
    ExpireTime: Number
});

GeneralSchema.plugin(ttl, { ttl: 1000*60*60*24*30 }); 

module.exports.Model = mongoose.model("DiscordOAuthData", GeneralSchema);
const Default = {
    SessionID: "", 
    AccessToken: "", 
    RefreshToken: "", 
    ExpireTime: 0
}
module.exports.createDefault = (SessionID, AccessToken, RefreshToken, expiresIn) => {
    let obj = {};

    Object.assign(obj, Default);
    obj.SessionID = SessionID;
    obj.AccessToken = AccessToken; 
    obj.RefreshToken = RefreshToken; 
    obj.ExpireTime = Date.now() + (expiresIn * 1000)
    return new module.exports.Model(obj);
}