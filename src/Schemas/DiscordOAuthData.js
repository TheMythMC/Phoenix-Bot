const mongoose = require("mongoose");

const GeneralSchema = new mongoose.Schema({
    SessionID: String, 
    AccessToken: String, 
    RefreshToken: String
});

module.exports.Model = mongoose.model("DiscordOAuthData", GeneralSchema);
module.exports.GEXPSchema = GEXPSchema;
module.exports.RoleSchema = RoleSchema;
const Default = {
    SessionID: "", 
    AccessToken: "", 
    ResfreshToken: ""
}
module.exports.createDefault = (ServerID, prefix = "!") => {
    let obj = {};

    Object.assign(obj, Default);
    obj.ServerID = ServerID;
    obj.Prefix = prefix; 
    return new module.exports.Model(obj);
}