const ky = require('ky-universal');

function UUIDToName(uuid) {
    return ky.post(`https://api.mojang.com/user/profile/${uuid}`).json().name;
}

function nameToUUID(name) {
    return ky.post(`https://api.mojang.com/users/profiles/minecraft/${name}`).json().id;
}

module.exports = {
    nameToUUID, UUIDToName,
};