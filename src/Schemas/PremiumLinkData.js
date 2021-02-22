const mongoose = require("mongoose");

const guildSchema = new mongoose.Schema({
    GuildID: String,
    ExpireDate: Number
});

const schema = new mongoose.Schema({
    DiscordID: String,
    GuildIDs: [guildSchema]
});

module.exports = mongoose.model("PremiumLinkData", schema);