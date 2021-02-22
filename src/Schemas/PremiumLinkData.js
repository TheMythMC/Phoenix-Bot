const mongoose = require("mongoose");

const guildSchema = new mongoose.Schema({
    GuildID: String,
    ExpireDate: Number
});

const schema = new mongoose.Schema({
    DiscordID: String,
    GuildIDs: [guildSchema]
});

module.exports.Model = mongoose.model("PremiumLinkData", schema);
const Default = {
    DiscordID: "",
    GuildIDs: []
}
module.exports.createDefault = (DiscordID) => {
    let obj = {};

    Object.assign(obj, Default);
    obj.DiscordID = DiscordID;
    return new module.exports.Model(obj);
}