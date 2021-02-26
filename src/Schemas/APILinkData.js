const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    DiscordID: String,
    APIKey: String
});

module.exports.Model = mongoose.model("APILinkData", schema);
const Default = {
    DiscordID: "",
    APIKey: ""
}
module.exports.createDefault = (DiscordID, APIKey) => {
    let obj = {};

    Object.assign(obj, Default);
    obj.DiscordID = DiscordID;
    obj.APIKey = APIKey;
    return new module.exports.Model(obj);
}