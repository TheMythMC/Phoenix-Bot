const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    DiscordID: String,
    MinecraftUUID: String
});

module.exports.Model = mongoose.model("MinecraftLinkData", schema);
const Default = {
    DiscordID: "",
    MinecraftUUID: ""
}
module.exports.createDefault = (DiscordID, MinecraftUUID) => {
    let obj = {};

    Object.assign(obj, Default);
    obj.DiscordID = DiscordID;
    obj.MinecraftUUID = MinecraftUUID;
    return new module.exports.Model(obj);
}