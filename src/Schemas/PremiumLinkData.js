const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    DiscordID: String,
    ServerID: String,
    ExpireDate: Number
});

module.exports.Model = mongoose.model("PremiumLinkData", schema);
const Default = {
    DiscordID: "",
    ServerID: "",
    ExpireDate: 0
}
module.exports.createDefault = (DiscordID, ServerID, ExpireDate) => {
    let obj = {};

    Object.assign(obj, Default);
    obj.DiscordID = DiscordID;
    obj.ServerID = ServerID;
    obj.ExpireDate = ExpireDate;
    return new module.exports.Model(obj);
}