const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    IsPremium: Boolean,
    ServerID: String,
    Roles: [
        {
            Name: String,
            EXPReq: Number
        }
    ],
    GuildID: String,
    GuildBotUUID: String,
    GuildBotAPIKey: String,
    Prefix: String
});

module.exports = mongoose.model("GuildData", schema);