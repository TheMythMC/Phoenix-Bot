const mongoose = require("mongoose");

const RoleSchema = new mongoose.Schema({
    DiscordRoleID: String, // The role ID of the discord role
    RoleTemplate: String, 
    Params: [] // parameters
})


const GEXPSchema = new mongoose.Schema({
    RoleName: String, // guild role name as shown in the API
    MinExp: Number // minimum exp needed to gain
})

const GeneralSchema = new mongoose.Schema({
    ServerID: String,
    RoleLinks: [RoleSchema],
    GEXPData: [GEXPSchema],
    GEXPWhitelist: [String], 
    GuildID: String,
    GuildBotUUID: String,
    GuildBotAPIKey: String,
    Prefix: String
});


module.exports.Model = mongoose.model("GuildData", GeneralSchema);
module.exports.GEXPSchema = GEXPSchema;
module.exports.RoleSchema = RoleSchema;
const Default = {
    ServerID: "",
    RoleLinks: [],
    GEXPData: [],
    GEXPWhitelist: [], 
    GuildID: "",
    GuildBotUUID: "",
    GuildBotAPIKey: "",
    Prefix: "!"
}
module.exports.createDefault = (ServerID, prefix = "!") => {
    let obj = {};

    Object.assign(obj, Default);
    obj.ServerID = ServerID;
    obj.Prefix = prefix; 
    return new module.exports.Model(obj);
}