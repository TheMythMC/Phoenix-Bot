const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    DiscordID: String,
    ServerID: String,
    ExpireDate: Number,
    BotUsername: String,
    BotPassword: String,
    BotAuth: String,
    BotAuth: String,
    LogChannel: Number
});

module.exports.Model = mongoose.model("PremiumLinkData", schema);
const Default = {
    DiscordID: "",
    ServerID: "",
    ExpireDate: 0,
    BotUsername: "",
    BotPassword: "",
    BotAuth: "mojang",
    LogChannel: ""
}
module.exports.createDefault = (DiscordID, ServerID, ExpireDate, BotUsername, BotPassword, BotAuth, LogChannel) => {
    let obj = {};

    Object.assign(obj, Default);
    obj.DiscordID = DiscordID;
    obj.ServerID = ServerID;
    obj.ExpireDate = ExpireDate;
    obj.BotUsername = BotUsername;
    obj.BotPassword = BotPassword;
    obj.BotAuth = BotAuth;
    obj.LogChannel = LogChannel;
    return new module.exports.Model(obj);
}