const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    Key: String
});

module.exports.Model = mongoose.model("PremiumLinkData", schema);
const Default = {
    Key: ""
}
module.exports.createDefault = (key) => {
    let obj = {};

    Object.assign(obj, Default);
    obj.Key = key;
    return new module.exports.Model(obj);
}