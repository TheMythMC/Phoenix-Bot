const mongoose = require("mongoose");

const RoleSchema = new mongoose.Schema({
    DiscordRoleID: String,
    RoleTemplate: String,
    Params: []
})


const GEXPSchema = new mongoose.Schema({
    RoleName: String,
    MinExp: Number
})

const schema = new mongoose.Schema({
    ServerID: String,
    Roles: [RoleSchema],
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
    Roles: [],
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