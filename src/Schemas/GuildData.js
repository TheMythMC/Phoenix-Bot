const mongoose = require("mongoose");

const RoleSchema = new mongoose.Schema({
    Name: String,
    EXPReq: Number
})

const schema = new mongoose.Schema({
    IsPremium: Boolean,
    ServerID: String,
    Roles: [RoleSchema],
    GuildID: String,
    GuildBotUUID: String,
    GuildBotAPIKey: String,
    Prefix: String
});

module.exports = mongoose.model("GuildData", schema);