const mongoose = require("mongoose");

const RoleSchema = new mongoose.Schema({
    Name: String,
    EXPReq: Number
})

const schema = new mongoose.Schema({
    ServerID: String,
    Roles: [RoleSchema],
    GuildID: String,
    GuildBotUUID: String,
    GuildBotAPIKey: String,
    Prefix: String
});

module.exports.Model = mongoose.model("GuildData", schema);
const Default = {
    ServerID: "",
    Roles: [],
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