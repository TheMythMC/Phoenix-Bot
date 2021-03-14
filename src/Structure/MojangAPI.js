const ky = require('ky-universal');

async function UUIDToName(uuid) {
    return (await ky.get(`https://api.mojang.com/user/profile/${uuid}`).json()).name;
}

async function nameToUUID(name) {
    return (await ky.get(`https://api.mojang.com/users/profiles/minecraft/${name}`).json()).id;
}

module.exports = {
    nameToUUID, UUIDToName,
};