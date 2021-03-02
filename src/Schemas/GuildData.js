const mongoose = require("mongoose");

const RoleSchema = new mongoose.Schema({
    DiscordRoleID: String, // The role ID of the discord role
    RoleTemplate: String, /*
    * template of the role may include:
    * Name(Parameters)
    * Owner()
    * Admin()
    * Moderator()
    * Helper()
    * Youtuber()
    * MVP++()
    * MVP+()
    * MVP()
    * VIP+()
    * VIP()
    * GuildRole(RoleName)
    */
    Params: [] // parameters
})


const GEXPSchema = new mongoose.Schema({
    RoleName: String, // guild role name as shown in the API
    MinExp: Number // minimum exp needed to gain
})

const schema = new mongoose.Schema({
    ServerID: String,
    RoleLinks: [RoleSchema],
    GEXPData: [GEXPSchema],
    GuildID: String,
    GuildBotUUID: String,
    GuildBotAPIKey: String,
    Prefix: String
});


module.exports.Model = mongoose.model("GuildData", schema);
module.exports.GEXPSchema = GEXPSchema;
module.exports.RoleSchema = RoleSchema;
const Default = {
    ServerID: "",
    RoleLinks: [],
    GEXPData: [],
    GuildID: "",
    GuildBotUUID: "",
    GuildBotAPIKey: "",
    Prefix: "!"
}
module.exports.createDefault = (ServerID) => {
    let obj = {};

    Object.assign(obj, Default);
    obj.ServerID = ServerID;
    return new module.exports.Model(obj);
}